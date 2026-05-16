// lib/seo/indexability.ts
// Single source of truth for which locales should be indexed by Googlebot
// on which surfaces. Pages that ship English copy under a non-English
// locale path must `noindex` until real translations land — otherwise
// Google flags them as doorway / thin content and dilutes the EN cluster.

import type { Locale } from "../locales";
import { LOCALES } from "../locales";

/**
 * Locales that ship genuinely translated copy on the localized home page
 * (en-*, plus partially translated af/zu/xh/pt-mz/fr via `dict.ts`).
 * The home page can index every locale because it actually changes copy.
 */
export const HOME_INDEXABLE_LOCALES: ReadonlySet<Locale> = new Set<Locale>(
  LOCALES
);

/**
 * Locales that ship English copy on programmatic pages (cities, sadc,
 * communities, vs, blog, sa-abroad, legal, language, plus pillars).
 * Until the content is translated per locale, only the English variants
 * should be indexed. Everything else stays follow-but-noindex so Google
 * still discovers links without diluting the index.
 */
export const PROGRAMMATIC_INDEXABLE_LOCALES: ReadonlySet<Locale> = new Set<Locale>([
  "en-za",
  "en-gb",
  "en-au",
  "en-us",
  "en-zw",
  "en-ae",
  "en-nz",
]);

/**
 * Returns the `robots` metadata object for a programmatic surface.
 * Use in `generateMetadata` like:
 *   return { ..., robots: robotsForProgrammatic(locale) };
 */
export function robotsForProgrammatic(locale: Locale): {
  index: boolean;
  follow: boolean;
} {
  return {
    index: PROGRAMMATIC_INDEXABLE_LOCALES.has(locale),
    follow: true,
  };
}
