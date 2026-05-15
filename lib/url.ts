// lib/url.ts
// Single source of truth for building canonical, hreflang and OG URLs.

import { DEFAULT_LOCALE, LOCALES, LOCALE_META, type Locale } from "./locales";

export const SITE_URL = "https://iptvmzansi.com";

/** Build the canonical URL for a locale + relative path under that locale. */
export function localeUrl(locale: Locale, path: string = "/"): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  // Trailing slash is preserved if present; default home keeps trailing slash.
  return `${SITE_URL}/${locale}${normalised === "/" ? "/" : normalised}`;
}

/** Build the hreflang alternates map for a path that exists in every locale. */
export function hreflangFor(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const locale of LOCALES) {
    map[LOCALE_META[locale].hreflang] = localeUrl(locale, path);
  }
  map["x-default"] = localeUrl(DEFAULT_LOCALE, path);
  return map;
}

/** Strip the leading `/{locale}` from a URL path. */
export function pathWithoutLocale(pathname: string): string {
  const match = pathname.match(/^\/([a-z]{2}(?:-[a-z]{2})?)(\/.*)?$/i);
  if (!match) return pathname;
  const candidate = match[1].toLowerCase();
  if ((LOCALES as readonly string[]).includes(candidate)) {
    return match[2] || "/";
  }
  return pathname;
}
