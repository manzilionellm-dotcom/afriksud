// lib/seo/springboks-uk-aliases.ts
// One-hop 308 onto the live London blog (P1 6Q + FAQPage already there).
// `en` is not a locale. Trailing slashes stripped before lookup so
// `/en/iptv-springboks-uk/` does not hop through slash-strip first.

import { LOCALES } from "../locales";

const LOCALE_SET = new Set<string>(LOCALES);

/** Live 200 — do not chain through a trailing slash. */
export const SPRINGBOKS_UK_BLOG_DEST =
  "/en-za/blog/watch-springboks-from-london";

const FIXED_ALIASES: Readonly<Record<string, string>> = {
  "/en/iptv-springboks-uk": SPRINGBOKS_UK_BLOG_DEST,
  "/en/watch-springboks-uk": SPRINGBOKS_UK_BLOG_DEST,
  "/iptv-springboks-uk": SPRINGBOKS_UK_BLOG_DEST,
  "/watch-springboks-uk": SPRINGBOKS_UK_BLOG_DEST,
};

const LOCALE_SLUG = /^(iptv-springboks-uk|watch-springboks-uk)$/;

/** Absolute path (no trailing slash) to 308 to, or null. */
export function springboksUkAliasDestination(pathname: string): string | null {
  const stripped = pathname.replace(/\/+$/, "") || "/";
  const fixed = FIXED_ALIASES[stripped];
  if (fixed) return fixed;
  const m = stripped.match(/^\/([a-z]{2}(?:-[a-z]{2})?)\/([^/]+)$/);
  if (m && LOCALE_SET.has(m[1]) && LOCALE_SLUG.test(m[2])) {
    return SPRINGBOKS_UK_BLOG_DEST;
  }
  return null;
}
