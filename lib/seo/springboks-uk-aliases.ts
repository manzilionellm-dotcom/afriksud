// lib/seo/springboks-uk-aliases.ts
// One-hop 308 map for Seo short slugs. `en` is not a locale — it
// canonicalises to en-za. Trailing slashes are stripped before lookup
// so `/en/iptv-springboks-uk/` does not hop through slash-strip first.

import { LOCALES } from "../locales";

const LOCALE_SET = new Set<string>(LOCALES);

export const SPRINGBOKS_UK_HUB_DEST = "/en-za/iptv-springboks-uk";

const FIXED_ALIASES: Readonly<Record<string, string>> = {
  "/en/iptv-springboks-uk": SPRINGBOKS_UK_HUB_DEST,
  "/en/watch-springboks-uk": SPRINGBOKS_UK_HUB_DEST,
  "/iptv-springboks-uk": SPRINGBOKS_UK_HUB_DEST,
  "/watch-springboks-uk": SPRINGBOKS_UK_HUB_DEST,
};

/** Absolute path (no trailing slash) to 308 to, or null. */
export function springboksUkAliasDestination(pathname: string): string | null {
  const stripped = pathname.replace(/\/+$/, "") || "/";
  const fixed = FIXED_ALIASES[stripped];
  if (fixed) return fixed;
  const m = stripped.match(/^\/([a-z]{2}(?:-[a-z]{2})?)\/watch-springboks-uk$/);
  if (m && LOCALE_SET.has(m[1])) {
    return `/${m[1]}/iptv-springboks-uk`;
  }
  return null;
}
