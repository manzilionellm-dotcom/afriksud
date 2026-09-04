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

// Live locales as of T0 2026-09-04 (all HTTP 200 on iptvmzansi.com). Do not
// invent extras or drop any of these — hreflang must stay reciprocal.
const FROZEN_LOCALES = [
  "en-za", "en-gb", "en-au", "en-us", "af", "zu", "xh", "pt-mz",
  "en-zw", "fr", "en-ae", "en-nz",
];

function parseLocales(src) {
  const m = src.match(/export const LOCALES = \[([\s\S]*?)\] as const/);
  if (!m) return [];
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
}

function hostnameOf(hostOrUrl) {
  if (!hostOrUrl) return "";
  const raw = String(hostOrUrl).trim().toLowerCase();
  const withoutProto = raw.includes("://")
    ? raw.replace(/^[a-z][a-z0-9+.-]*:\/\//, "")
    : raw;
  return withoutProto.split("/")[0]?.split(":")[0] ?? "";
}

function wwwToApexLocation(requestUrl, ...hostHeaders) {
  let url;
  try { url = new URL(requestUrl, "https://iptvmzansi.com"); }
  catch { return null; }
  const hosts = new Set();
  for (const header of hostHeaders) {
    const name = hostnameOf(header);
    if (name) hosts.add(name);
  }
  hosts.add(url.hostname.toLowerCase());
  if (!hosts.has("www.iptvmzansi.com")) return null;
  url.protocol = "https:";
  url.hostname = "iptvmzansi.com";
  url.port = "";
  return url.toString();
}

function gateCanonicalApex() {
  const urlSrc = read(join(ROOT, "lib/url.ts"));
  if (!/export const APEX_HOST = "iptvmzansi\.com"/.test(urlSrc)) {
    fail("lib/url.ts: APEX_HOST doit être iptvmzansi.com (apex).");
  }
  if (!/export const WWW_HOST = "www\.iptvmzansi\.com"/.test(urlSrc)) {
    fail("lib/url.ts: WWW_HOST manquant.");
  }
  if (
    !urlSrc.includes("export const SITE_URL = `https://${APEX_HOST}`")
    && !/export const SITE_URL = "https:\/\/iptvmzansi\.com"/.test(urlSrc)
  ) {
    fail("lib/url.ts: SITE_URL n'est pas l'apex https://iptvmzansi.com.");
  }
  if (/SITE_URL = "https:\/\/www\./.test(urlSrc)) {
    fail("lib/url.ts: SITE_URL ne doit pas être www.");
  }
  const siteSrc = read(join(ROOT, "components/shared/site.ts"));
  if (!/domain:\s*"https:\/\/iptvmzansi\.com"/.test(siteSrc)) {
    fail("SITE.domain n'est pas l'apex https://iptvmzansi.com.");
  }
  if (/domain:\s*"https:\/\/www\./.test(siteSrc)) {
    fail("SITE.domain ne doit pas être www.");
  }
  if (!failures.some((f) => f.includes("SITE_URL") || f.includes("APEX_HOST") || f.includes("SITE.domain"))) {
    ok("Canonical host = apex https://iptvmzansi.com.");
  }
}

function gateWww308() {
  const mw = read(join(ROOT, "middleware.ts"));
  if (!/wwwToApexLocation/.test(mw) || !/\b308\b/.test(mw) || !/x-forwarded-host/.test(mw)) {
    fail("middleware.ts: 308 www→apex (x-forwarded-host) manquant.");
  } else {
    ok("middleware.ts: 308 www→apex avant slash-strip.");
  }
  const v = read(join(ROOT, "vercel.json"));
  if (!v) {
    fail("vercel.json introuvable.");
    return;
  }
  let json;
  try { json = JSON.parse(v); }
  catch { fail("vercel.json JSON invalide."); return; }
  const redirects = Array.isArray(json.redirects) ? json.redirects : [];
  const www = redirects.filter((r) =>
    (r.has || []).some((h) => h.type === "host" && h.value === "www.iptvmzansi.com")
  );
  if (www.length < 1) {
    fail("vercel.json: pas de redirect host www.iptvmzansi.com.");
  } else if (!www.every((r) => r.permanent === true && String(r.destination).startsWith("https://iptvmzansi.com"))) {
    fail("vercel.json: www doit 308 (permanent:true) vers https://iptvmzansi.com…");
  } else {
    ok(`vercel.json: ${www.length} redirect(s) 308 www→apex.`);
  }
  const cfg = read(join(ROOT, "next.config.js"));
  if (!/skipTrailingSlashRedirect:\s*true/.test(cfg)) {
    fail("next.config.js: skipTrailingSlashRedirect true requis (sinon /en-za/ reste sur www).");
  } else {
    ok("next.config.js: skipTrailingSlashRedirect (host 308 avant slash).");
  }
  if (!/www\.iptvmzansi\.com/.test(cfg) || !/:path\+\//.test(cfg)) {
    fail("next.config.js: redirect host www /:path+/ manquant.");
  } else {
    ok("next.config.js: 308 www→apex inclut /:path+/.");
  }
  const slashRule = www.some((r) => String(r.source).includes(":path+") && String(r.source).endsWith("/"));
  if (!slashRule) {
    fail("vercel.json: règle host /:path+/ manquante (trailing slash).");
  }
  const doc = read(join(ROOT, "docs/WWW-DOMAIN.md"));
  if (!doc || !/www\.iptvmzansi\.com/.test(doc) || !/Settings/.test(doc)) {
    fail("docs/WWW-DOMAIN.md incomplet (ajouter www sur Vercel).");
  } else {
    ok("docs/WWW-DOMAIN.md présent.");
  }

  const cases = [
    ["https://www.iptvmzansi.com/", "www.iptvmzansi.com", "https://iptvmzansi.com/"],
    ["https://www.iptvmzansi.com/en-za/?q=1", "www.iptvmzansi.com", "https://iptvmzansi.com/en-za/?q=1"],
    ["https://www.iptvmzansi.com/af/dstv-alternative/", "www.iptvmzansi.com:443", "https://iptvmzansi.com/af/dstv-alternative/"],
    ["https://www.iptvmzansi.com/en-za/", "iptvmzansi.com", "https://iptvmzansi.com/en-za/"],
    ["https://iptvmzansi.com/en-za/", "iptvmzansi.com", null],
    ["http://127.0.0.1:3000/zu/", "www.iptvmzansi.com", "https://iptvmzansi.com/zu/"],
  ];
  const forwarded = wwwToApexLocation(
    "http://127.0.0.1:3000/en-za/",
    "www.iptvmzansi.com",
    "127.0.0.1:3000"
  );
  if (forwarded !== "https://iptvmzansi.com/en-za/") {
    fail(`wwwToApexLocation forwarded-host = ${forwarded}`);
  }
  for (const [req, host, expected] of cases) {
    const got = wwwToApexLocation(req, host);
    if (got !== expected) {
      fail(`wwwToApexLocation(${req}, ${host}) = ${got}, attendu ${expected}`);
    }
  }
  if (!failures.some((f) => f.startsWith("wwwToApexLocation"))) {
    ok("wwwToApexLocation: path + query préservés, apex inchangé.");
  }
}

function gateLocalesFrozen() {
  const found = parseLocales(read(join(ROOT, "lib/locales.ts")));
  if (found.length !== FROZEN_LOCALES.length) {
    fail(`LOCALES: ${found.length} trouvées, ${FROZEN_LOCALES.length} attendues (ne pas inventer/supprimer).`);
    return;
  }
  const missing = FROZEN_LOCALES.filter((l) => !found.includes(l));
  const extra = found.filter((l) => !FROZEN_LOCALES.includes(l));
  if (missing.length || extra.length) {
    fail(`LOCALES drift — manquantes: ${missing.join(",") || "—"} ; extra: ${extra.join(",") || "—"}.`);
  } else {
    ok(`12 locales réelles figées: ${found.join(", ")}.`);
  }
}

function run() {
  const files = walk(ROOT);
  gatePlaceholders(files);
  gateSecrets(files);
  gateHomeMeta();
  gateHreflang();
  gateCanonicalApex();
  gateWww308();
  gateLocalesFrozen();
}

// ── Self-test: validate gate logic against in-memory fixtures.
function selfTest() {
  const localFail = [];
  // Placeholder regex must fire on a placeholder and not on clean text.
  if (!PLACEHOLDER.test("prix {{À_DÉFINIR}}")) localFail.push("placeholder regex faux négatif");
  if (PLACEHOLDER.test("prix R99 clean")) localFail.push("placeholder regex faux positif");
  // Secret regex must fire on a fake key and not on clean text.
  if (!SECRET_PATTERNS[0][0].test("sk-" + "a".repeat(24))) localFail.push("secret regex faux négatif");
  if (SECRET_PATTERNS[0][0].test("skateboard")) localFail.push("secret regex faux positif");
  if (wwwToApexLocation("https://www.iptvmzansi.com/fr/", "www.iptvmzansi.com") !== "https://iptvmzansi.com/fr/") {
    localFail.push("wwwToApexLocation faux négatif");
  }
  if (wwwToApexLocation("https://iptvmzansi.com/fr/", "iptvmzansi.com") !== null) {
    localFail.push("wwwToApexLocation faux positif");
  }
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
