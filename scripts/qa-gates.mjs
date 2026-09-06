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
  if (!/skipTrailingSlashRedirect:\s*true/.test(cfg) || !/skipMiddlewareUrlNormalize:\s*true/.test(cfg)) {
    fail("next.config.js: skipTrailingSlashRedirect + skipMiddlewareUrlNormalize true requis.");
  } else {
    ok("next.config.js: skipTrailingSlashRedirect + skipMiddlewareUrlNormalize.");
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

const SPRINGBOKS_P1_QS = [
  "Can I watch Springboks and URC matches from London without a South African cable subscription?",
  "Will I get every SuperSport-style feed for rugby?",
  "Do time zones / kick-off times work for live matches in the UK?",
  "Can I set this up on a Firestick or Smart TV in the UK?",
  "Is there a 24-hour trial before I pay?",
  "Soft legal — is this “free illegal streams” or 100% cleared for every Springboks game?",
];

function gateSpringboksUkAliases() {
  const faqSrc = read(join(ROOT, "lib/seo/blog-diaspora.ts"));
  if (!/export const SPRINGBOKS_LONDON_P1_FAQ/.test(faqSrc)) {
    fail("SPRINGBOKS_LONDON_P1_FAQ manquant (pack P1 6Q).");
  } else if (!/export const SPRINGBOKS_LONDON_P1_QUESTIONS/.test(faqSrc)) {
    fail("SPRINGBOKS_LONDON_P1_QUESTIONS manquant (lock questions P1).");
  } else if (!/faq:\s*SPRINGBOKS_LONDON_P1_FAQ/.test(faqSrc)) {
    fail("watch-springboks-from-london n'utilise pas le pack P1 6Q.");
  } else if (/"@type"\s*:\s*"AggregateRating"/.test(faqSrc)) {
    fail("blog-diaspora: AggregateRating interdit.");
  } else {
    const londonEnd = faqSrc.indexOf('slug: "iptv-uk-firestick');
    const londonBlock = londonEnd > 0 ? faqSrc.slice(0, londonEnd) : faqSrc;
    const missingQ = SPRINGBOKS_P1_QS.filter((q) => !faqSrc.includes(q));
    if (missingQ.length) {
      fail(`Pack P1 6Q incomplet — questions manquantes: ${missingQ.length}.`);
    } else if ((faqSrc.match(/SPRINGBOKS_LONDON_P1_QUESTIONS\[\d]/g) || []).length !== 6) {
      fail("SPRINGBOKS_LONDON_P1_FAQ doit citer les 6 questions P1.");
    } else if (/mailto:/.test(londonBlock)) {
      fail("watch-springboks-from-london: mailto interdit.");
    } else if (/\b(we |you'll |you )(get|carry|offer|unlock|guarantee|promise) every (supersport|official|match) feed/i.test(londonBlock)) {
      fail("watch-springboks-from-london: promesse every-feed interdite.");
    } else if (!londonBlock.includes("+44 7307 410512") || !londonBlock.includes("wa.me/447307410512")) {
      fail("watch-springboks-from-london: WA +44 7307 410512 / wa.me/447307410512 manquant.");
    } else {
      ok("Pack P1 6Q exact câblé sur le blog London (0 AR, 0 mailto, 0 every-feed).");
    }
    const LOCKED_PREFILL =
      "Hi — London UK. Want SA rugby / Springboks on IPTV + 24h trial (no card). Device:";
    const LOCKED_HREF =
      "https://wa.me/447307410512?text=Hi%20%E2%80%94%20London%20UK.%20Want%20SA%20rugby%20%2F%20Springboks%20on%20IPTV%20%2B%2024h%20trial%20(no%20card).%20Device%3A";
    const postAt = faqSrc.indexOf('slug: "watch-springboks-from-london"');
    const postBlock = postAt >= 0 ? faqSrc.slice(postAt, londonEnd > 0 ? londonEnd : undefined) : "";
    const faqBlockStart = faqSrc.indexOf("export const SPRINGBOKS_LONDON_P1_FAQ");
    const faqBlockEnd = faqSrc.indexOf("export const BLOG_DIASPORA");
    const faqBlock =
      faqBlockStart >= 0 && faqBlockEnd > faqBlockStart
        ? faqSrc.slice(faqBlockStart, faqBlockEnd)
        : "";
    if (!faqSrc.includes(`export const SPRINGBOKS_LONDON_WA_PREFILL`) || !faqSrc.includes(LOCKED_PREFILL)) {
      fail("watch-springboks-from-london: SPRINGBOKS_LONDON_WA_PREFILL character-exact manquant.");
    } else if (!faqSrc.includes(`export const SPRINGBOKS_LONDON_WA_HREF`) || !faqSrc.includes(LOCKED_HREF)) {
      fail("watch-springboks-from-london: SPRINGBOKS_LONDON_WA_HREF character-exact manquant.");
    } else if (encodeURIComponent(LOCKED_PREFILL) !== LOCKED_HREF.split("?text=")[1]) {
      fail("watch-springboks-from-london: encodeURIComponent(prefill) ≠ href locked.");
    } else if (!postBlock.includes("message: SPRINGBOKS_LONDON_WA_PREFILL")) {
      fail("watch-springboks-from-london: CTA message doit être le prefill locked.");
    } else if (/Hi! I/.test(postBlock) || /Hi! I/.test(faqBlock)) {
      fail("watch-springboks-from-london: prefill faible Hi! I… interdit.");
    } else if (/\bM3U\b/.test(postBlock) || /\bM3U\b/.test(faqBlock)) {
      fail("watch-springboks-from-london: M3U public interdit (body/FAQ).");
    } else if (/20,000/.test(postBlock) || /20,000/.test(faqBlock)) {
      fail("watch-springboks-from-london: claim 20,000+ interdit.");
    } else if (/TiviMate|TiViMate/.test(postBlock)) {
      fail("watch-springboks-from-london: TiviMate hors FAQ (lead/HowTo/body).");
    } else if (!/TiviMate/.test(faqBlock)) {
      fail("watch-springboks-from-london: TiviMate doit rester FAQ-only.");
    } else {
      ok("WA prefill locked + soft purge (0 Hi! I, 0 M3U, 0 20,000, TiviMate FAQ-only).");
    }
  }
  const blogTpl = read(join(ROOT, "app/[locale]/blog/[slug]/page.tsx"));
  const faqHelper = read(join(ROOT, "lib/seo/faq-page.ts"));
  if (!/buildFaqPageSchema/.test(blogTpl) || !/reinforce:\s*isSpringboksLondon/.test(blogTpl)) {
    fail("blog template: FAQPage renforcée absente sur watch-springboks-from-london.");
  } else if (!/@id/.test(faqHelper) || !/inLanguage/.test(faqHelper)) {
    fail("faq-page.ts: @id / inLanguage manquants.");
  } else if (!/emitSchema=\{!isSpringboksLondon\}/.test(blogTpl)) {
    fail("blog template: DirectAnswer Question schema doit céder à FAQPage sur London.");
  } else if (!/SPRINGBOKS_LONDON_WA_HREF/.test(blogTpl) || !/softenCatalogClaims=\{isSpringboksLondon\}/.test(blogTpl)) {
    fail("blog template: href locked + softenCatalogClaims absents sur London.");
  } else if (!/waOverride=\{londonWaOverride\}/.test(blogTpl)) {
    fail("blog template: chrome waOverride absent sur London.");
  } else {
    ok("FAQPage London renforcée (@id, inLanguage) — 0 Question DirectAnswer.");
    ok("Blog London: WA href locked + chrome override + perks soft.");
  }
  const hubPage = read(join(ROOT, "app/[locale]/iptv-springboks-uk/page.tsx"));
  if (hubPage) {
    fail("hub iptv-springboks-uk doit être retiré (308 vers le blog).");
  } else {
    ok("Pas de hub 200 /iptv-springboks-uk/ (alias seulement).");
  }
  const sm = read(join(ROOT, "app/sitemap.ts"));
  if (/SPRINGBOKS_UK_HUB_PATH|iptv-springboks-uk/.test(sm)) {
    fail("sitemap: ne pas lister les aliases 308 iptv-springboks-uk.");
  } else {
    ok("sitemap: aliases Springboks UK absents (blog déjà listé).");
  }
  const cfg = read(join(ROOT, "next.config.js"));
  const aliasAt = cfg.indexOf('source: "/en/iptv-springboks-uk"');
  const destAt = cfg.indexOf('destination: "/en-za/blog/watch-springboks-from-london"');
  const cityAt = cfg.indexOf('source: "/iptv-:city"');
  if (aliasAt < 0 || destAt < 0 || cityAt < 0 || aliasAt > cityAt || destAt > cityAt) {
    fail("next.config.js: /en/iptv-springboks-uk → blog London avant /iptv-:city.");
  } else {
    ok("next.config.js: 308 /en/iptv-springboks-uk → blog London.");
  }
  const aliases = read(join(ROOT, "lib/seo/springboks-uk-aliases.ts"));
  if (!/SPRINGBOKS_UK_BLOG_DEST/.test(aliases) || !/watch-springboks-from-london/.test(aliases)) {
    fail("springboks-uk-aliases: dest blog London manquante.");
  }
  const mw = read(join(ROOT, "middleware.ts"));
  if (!/springboksUkAliasDestination/.test(mw)) {
    fail("middleware.ts: springboksUkAliasDestination manquant.");
  } else {
    ok("middleware.ts: 308 aliases Springboks UK avant slash-strip.");
  }

  const vj = read(join(ROOT, "vercel.json"));
  let vjson = null;
  try { vjson = JSON.parse(vj); } catch { /* gateWww308 already fails invalid JSON */ }
  const vRedirs = Array.isArray(vjson?.redirects) ? vjson.redirects : [];
  const edgeAlias = vRedirs.find((r) =>
    r.source === "/en/iptv-springboks-uk"
    && r.destination === "/en-za/blog/watch-springboks-from-london"
    && r.permanent === true
    && !(r.has || []).length
  );
  const edgeWww = vRedirs.find((r) =>
    r.source === "/en/iptv-springboks-uk"
    && String(r.destination) === "https://iptvmzansi.com/en-za/blog/watch-springboks-from-london"
    && r.permanent === true
    && (r.has || []).some((h) => h.type === "host" && h.value === "www.iptvmzansi.com")
  );
  const wwwCatchAt = vRedirs.findIndex((r) =>
    r.source === "/:path*"
    && (r.has || []).some((h) => h.type === "host" && h.value === "www.iptvmzansi.com")
  );
  const wwwAliasAt = vRedirs.findIndex((r) =>
    r.source === "/en/iptv-springboks-uk"
    && (r.has || []).some((h) => h.type === "host" && h.value === "www.iptvmzansi.com")
  );
  if (!edgeAlias || !edgeWww) {
    fail("vercel.json: 308 /en/iptv-springboks-uk → blog London (apex + www 1 hop).");
  } else if (wwwAliasAt < 0 || wwwCatchAt < 0 || wwwAliasAt > wwwCatchAt) {
    fail("vercel.json: www /en/iptv-springboks-uk doit précéder /:path* www→apex.");
  } else {
    ok("vercel.json: 308 edge /en/iptv-springboks-uk → blog London (slash/www).");
  }

  if (read(join(ROOT, "next.config.ts"))) {
    fail("next.config.ts présent — Next 15 peut ignorer next.config.js (308 #19).");
  } else {
    ok("Un seul next.config (js).");
  }

  const aliasPage = read(join(ROOT, "app/en/iptv-springboks-uk/page.tsx"));
  const aliasRoute = read(join(ROOT, "app/en/iptv-springboks-uk/route.ts"));
  if (aliasPage) {
    fail("app/en/iptv-springboks-uk/page.tsx interdit (pas de soft landing).");
  } else if (!aliasRoute || !/NextResponse\.redirect/.test(aliasRoute) || !/,\s*308/.test(aliasRoute)) {
    fail("app/en/iptv-springboks-uk/route.ts doit 308 (pas de HTML).");
  } else if (/<[a-zA-Z]/.test(aliasRoute)) {
    fail("app/en/iptv-springboks-uk/route.ts contient du markup (landing).");
  } else {
    ok("app/en/iptv-springboks-uk = 308 only.");
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
  gateSpringboksUkAliases();
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
