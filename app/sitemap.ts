// app/sitemap.ts

import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, LOCALES, LOCALE_META } from "../lib/locales";

const SITE_URL = "https://iptvmzansi.com";

const buildLocaleUrl = (locale: typeof LOCALES[number]) =>
  locale === DEFAULT_LOCALE ? SITE_URL + "/" : `${SITE_URL}/?lang=${locale}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const alternateLanguages = LOCALES.reduce<Record<string, string>>(
    (acc, locale) => {
      acc[LOCALE_META[locale].hreflang] = buildLocaleUrl(locale);
      return acc;
    },
    { "x-default": buildLocaleUrl(DEFAULT_LOCALE) }
  );

  // Canonical entry: en-ZA (default) with hreflang alternates pointing
  // to the other 11 locales.
  const entries: MetadataRoute.Sitemap = [
    {
      url: buildLocaleUrl(DEFAULT_LOCALE),
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: alternateLanguages },
    },
    // Per-locale entries help discovery in Search Console even though they
    // share the same canonical until `/[locale]/` routes land.
    ...LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((locale) => ({
      url: buildLocaleUrl(locale),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  return entries;
}
