#!/usr/bin/env node
// scripts/qa-gates.mjs
// USINE v8 quality gates. Dependency-free (no transpiler needed): checks are
// performed against source text so this runs in any CI without booting Next.
// Exit 0 = green, exit 1 = red. `--self-test` validates the gate logic itself.
//
// Loi #5: "vert" = exit 0, jamais une opinion. Interdit d'assouplir un check.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const SELF_TEST = process.argv.includes("--self-test");

const failures = [];
const notes = [];
function fail(msg) { failures.push(msg); }
function ok(msg) { notes.push(msg); }

// ── Walk source files (skip build output, deps, VCS, memory).
const SKIP_DIRS = new Set([
  "node_modules", ".next", ".git", ".company", "runs", ".vercel", "public",
]);
const SRC_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".md"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (SRC_EXT.has(extname(name))) out.push(p);
  }
  return out;
}

function read(p) {
  try { return readFileSync(p, "utf8"); } catch { return ""; }
}

// ── GATE 1: no unresolved placeholders in PUBLISHED content.
// Scoped to rendered-content dirs — the QA scripts and LOIS docs legitimately
// document the token itself and must not trip the gate.
const PLACEHOLDER = /\{\{\s*(À_DÉFINIR|A_DEFINIR|TODO|TBD|PLACEHOLDER)\s*\}\}/;
const CONTENT_DIRS = ["/app/", "/content/", "/components/"];
function isContentFile(f) {
  const p = f.replace(/\\/g, "/");
  return CONTENT_DIRS.some((d) => p.includes(d));
}
function gatePlaceholders(files) {
  const hits = files.filter((f) => isContentFile(f) && PLACEHOLDER.test(read(f)));
  if (hits.length) fail(`Placeholders non résolus (contenu publié): ${hits.join(", ")}`);
  else ok("Aucun placeholder {{À_DÉFINIR}} dans le contenu publié.");
}

// ── GATE 1b: no owner-placeholder leaking through RENDERED strings.
// Why this gate exists: `TO_FILL_BY_OWNER` shipped live inside
// `localPriceNote` on 20 diaspora country pages and was printed verbatim in
// the Pricing paragraph — on the very page type that produced a
// Copilot-sourced order. GATE 1 never caught it because it only knows the
// `{{À_DÉFINIR}}` form.
//
// Scope is deliberately the string-literal form only: the token legitimately
// appears in `//` comments and in `<code>TO_FILL_BY_OWNER</code>` JSX where
// the docs describe the token itself. A quoted literal, by contrast, is data
// destined for the page.
//
// `lib/seo/legal.ts` is reported separately, not silently exempted: those
// placeholders hold the legal entity name, CIPC number and Information
// Officer — facts only the owner can supply, that an agent must never invent
// (Loi #3). They stay visible in every run until filled.
const OWNER_PLACEHOLDER_LITERAL = /"[^"\n]*TO_FILL_BY_OWNER[^"\n]*"/;
const LEGAL_DATA_FILE = "lib/seo/legal.ts";
function gateOwnerPlaceholders(files) {
  const rendered = files.filter((f) => {
    const p = f.replace(/\\/g, "/");
    return (isContentFile(p) || p.includes("/lib/seo/")) && !p.endsWith(LEGAL_DATA_FILE);
  });
  const hits = rendered.filter((f) => OWNER_PLACEHOLDER_LITERAL.test(read(f)));
  if (hits.length) {
    fail(`TO_FILL_BY_OWNER dans des chaînes rendues: ${hits.join(", ")}`);
  } else {
    ok("Aucun TO_FILL_BY_OWNER dans les chaînes rendues (hors legal).");
  }
  const legalSrc = read(join(ROOT, LEGAL_DATA_FILE));
  const legalCount = (legalSrc.match(/TO_FILL_BY_OWNER/g) || []).length;
  if (legalCount) {
    ok(`BLOQUÉ OWNER: ${legalCount} placeholders légaux en attente dans ${LEGAL_DATA_FILE} (entité, CIPC, Information Officer). Non inventables — Loi #3.`);
  }
}

// ── GATE 2: no secrets committed (env/GitHub Secrets only — Loi #8).
const SECRET_PATTERNS = [
  [/\bsk-[A-Za-z0-9]{20,}\b/, "clé style OpenAI (sk-…)"],
  [/\bAKIA[0-9A-Z]{16}\b/, "clé AWS (AKIA…)"],
  [/-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/, "clé privée PEM"],
  [/\bghp_[A-Za-z0-9]{36}\b/, "token GitHub (ghp_…)"],
  [/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/, "token Slack (xox…)"],
];
function gateSecrets(files) {
  const hits = [];
  for (const f of files) {
    const txt = read(f);
    for (const [re, label] of SECRET_PATTERNS) {
      if (re.test(txt)) hits.push(`${f} → ${label}`);
    }
  }
  if (hits.length) fail(`Secret(s) potentiel(s) dans le repo: ${hits.join("; ")}`);
  else ok("Aucun secret détecté dans les sources.");
}

// ── GATE 3: homepage titles unique + native per locale (the T1 fix).
function gateHomeMeta() {
  const src = read(join(ROOT, "lib/seo/home-meta.ts"));
  if (!src) { fail("lib/seo/home-meta.ts introuvable."); return; }
  const resolved = [...src.matchAll(/^\s*title:\s*"([^"]+)"/gm)].map((m) => m[1]);
  if (resolved.length < 12) {
    fail(`home-meta: ${resolved.length} titres trouvés, 12 attendus (un par locale).`);
    return;
  }
  const seen = new Map();
  const dups = [];
  for (const t of resolved) {
    seen.set(t, (seen.get(t) ?? 0) + 1);
    if (seen.get(t) === 2) dups.push(t);
  }
  if (dups.length) fail(`Titres homepage dupliqués: ${dups.join(" | ")}`);
  else ok(`${resolved.length} titres homepage uniques.`);
}

// ── GATE 4: hreflang helper emits x-default + self-referential map.
function gateHreflang() {
  const src = read(join(ROOT, "lib/url.ts"));
  if (!src) { fail("lib/url.ts introuvable."); return; }
  if (!/x-default/.test(src)) fail("hreflangFor n'émet pas x-default.");
  else ok("hreflang: x-default présent dans le helper.");
  const localesSrc = read(join(ROOT, "lib/locales.ts"));
  if (!/DEFAULT_LOCALE/.test(localesSrc)) fail("DEFAULT_LOCALE absent de lib/locales.ts.");
}

function run() {
  const files = walk(ROOT);
  gatePlaceholders(files);
  gateOwnerPlaceholders(files);
  gateSecrets(files);
  gateHomeMeta();
  gateHreflang();
}

// ── Self-test: validate gate logic against in-memory fixtures.
function selfTest() {
  const localFail = [];
  // Placeholder regex must fire on a placeholder and not on clean text.
  if (!PLACEHOLDER.test("prix {{À_DÉFINIR}}")) localFail.push("placeholder regex faux négatif");
  if (PLACEHOLDER.test("prix R99 clean")) localFail.push("placeholder regex faux positif");
  // GATE 1b: must fire on a quoted literal, stay silent on comment/JSX forms.
  if (!OWNER_PLACEHOLDER_LITERAL.test('note: "~AU$8 (TO_FILL_BY_OWNER for FX)",')) localFail.push("owner-placeholder regex faux négatif");
  if (OWNER_PLACEHOLDER_LITERAL.test("const SRC = '/v.mp4'; // TO_FILL_BY_OWNER")) localFail.push("owner-placeholder regex faux positif (commentaire)");
  if (OWNER_PLACEHOLDER_LITERAL.test("<code>TO_FILL_BY_OWNER</code>")) localFail.push("owner-placeholder regex faux positif (JSX)");
  // Secret regex must fire on a fake key and not on clean text.
  if (!SECRET_PATTERNS[0][0].test("sk-" + "a".repeat(24))) localFail.push("secret regex faux négatif");
  if (SECRET_PATTERNS[0][0].test("skateboard")) localFail.push("secret regex faux positif");
  if (localFail.length) {
    console.error("SELF-TEST ÉCHOUÉ:\n - " + localFail.join("\n - "));
    process.exit(1);
  }
  console.log("qa-gates --self-test: OK (logique des gates validée).");
  process.exit(0);
}

if (SELF_TEST) selfTest();

run();
for (const n of notes) console.log("  ✓ " + n);
if (failures.length) {
  console.error("\nQA-GATES ROUGE:");
  for (const f of failures) console.error("  ✗ " + f);
  process.exit(1);
}
console.log("\nQA-GATES VERT (exit 0).");
process.exit(0);
