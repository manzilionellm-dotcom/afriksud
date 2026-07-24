#!/usr/bin/env node
// scripts/incremental-check.mjs
// Fast per-file check wired to the PostToolUse Edit|Write hook. Only touches
// the file(s) that changed — NEVER a full build (that runs only in QA, Loi #5).
//   - .ts/.tsx  → typecheck the file's project via `tsc --noEmit` is too heavy
//                 per-edit, so we do a cheap syntax + placeholder scan here and
//                 leave full typecheck/build to `pnpm build` in QA.
//   - .md       → flag obvious broken relative links + unresolved placeholders.
// Exit non-zero blocks the edit loop with actionable feedback.

import { readFileSync, existsSync } from "node:fs";
import { extname, dirname, resolve } from "node:path";
import process from "node:process";

const files = (process.argv[2] ?? "")
  .split(/\s+/)
  .map((s) => s.trim())
  .filter(Boolean);

if (!files.length) process.exit(0);

const PLACEHOLDER = /\{\{\s*(À_DÉFINIR|A_DEFINIR|TODO|TBD|PLACEHOLDER)\s*\}\}/;
const errors = [];

for (const f of files) {
  if (!existsSync(f)) continue;
  let txt = "";
  try { txt = readFileSync(f, "utf8"); } catch { continue; }
  const ext = extname(f);

  if (PLACEHOLDER.test(txt)) {
    errors.push(`${f}: placeholder {{À_DÉFINIR}} non résolu.`);
  }

  if (ext === ".ts" || ext === ".tsx" || ext === ".js" || ext === ".jsx" || ext === ".mjs") {
    // Cheap balance check to catch obvious truncation before QA build.
    const opens = (txt.match(/[{([]/g) || []).length;
    const closes = (txt.match(/[})\]]/g) || []).length;
    if (Math.abs(opens - closes) > 0) {
      errors.push(`${f}: déséquilibre parenthèses/accolades (${opens} ouvrantes / ${closes} fermantes) — vérifier avant QA.`);
    }
  }

  if (ext === ".md") {
    // Flag relative links pointing at files that don't exist.
    for (const m of txt.matchAll(/\]\((\.{1,2}\/[^)#\s]+)/g)) {
      const target = resolve(dirname(f), m[1]);
      if (!existsSync(target)) errors.push(`${f}: lien relatif cassé → ${m[1]}`);
    }
  }
}

if (errors.length) {
  console.error("incremental-check:\n - " + errors.join("\n - "));
  process.exit(1);
}
process.exit(0);
