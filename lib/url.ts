// lib/url.ts
// Single source of truth for building canonical, hreflang and OG URLs.

import { DEFAULT_LOCALE, LOCALES, LOCALE_META, type Locale } from "./locales";

/** Canonical host. Never `www` — live sitemap, canonicals and hreflang are apex. */
export const APEX_HOST = "iptvmzansi.com";
export const WWW_HOST = "www.iptvmzansi.com";
export const SITE_URL = `https://${APEX_HOST}`;

/** Hostname from a Host header or URL, lowercased, port stripped. */
export function hostnameOf(hostOrUrl: string | null | undefined): string {
  if (!hostOrUrl) return "";
  const raw = hostOrUrl.trim().toLowerCase();
  const withoutProto = raw.includes("://")
    ? raw.replace(/^[a-z][a-z0-9+.-]*:\/\//, "")
    : raw;
  return withoutProto.split("/")[0]?.split(":")[0] ?? "";
}

/**
 * Absolute apex URL for a www request (path + query preserved).
 * Returns null when the request is not for `www.iptvmzansi.com`.
 */
export function wwwToApexLocation(
  requestUrl: string,
  hostHeader?: string | null
): string | null {
  let hostname = hostnameOf(hostHeader);
  if (!hostname) {
    try {
      hostname = new URL(requestUrl).hostname.toLowerCase();
    } catch {
      return null;
    }
  }
  if (hostname !== WWW_HOST) return null;
  const url = new URL(requestUrl, SITE_URL);
  url.protocol = "https:";
  url.hostname = APEX_HOST;
  url.port = "";
  return url.toString();
}

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
