// lib/seo/jsonld.tsx
// Single safe entry-point for emitting JSON-LD blocks.
//
// Why a helper instead of inlining `dangerouslySetInnerHTML`:
//   1. We always escape `</` -> `<\/`. Without it, a malicious string
//      (e.g. a user-submitted FAQ answer) could break out of the
//      <script> tag and inject HTML. Even with our trusted server-only
//      data the escape is defensive hardening at near-zero cost.
//   2. We also escape U+2028 / U+2029, which are valid in JSON but not
//      in JavaScript string literals — modern crawlers tolerate it, but
//      older validators / strict CSP eval paths choke on them.
//   3. `type=application/ld+json` is enforced in one place so a typo
//      can't ship a payload Google silently ignores.

import * as React from "react";

const SCRIPT_ESCAPE = /<\/(script)/gi;
// Built via String.fromCharCode + RegExp() so the literal source never
// contains U+2028/U+2029 — TS treats those as line terminators inside
// regex/string literals and the file would fail to parse.
const LINE_SEP = new RegExp(String.fromCharCode(0x2028), "g");
const PARA_SEP = new RegExp(String.fromCharCode(0x2029), "g");

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(SCRIPT_ESCAPE, "<\\/$1")
    .replace(LINE_SEP, "\\u2028")
    .replace(PARA_SEP, "\\u2029");
}

export function JsonLd({ data, id }: { data: unknown; id?: string }) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
