import { clustersPublished } from "../clusters/publication";
import type { Metadata } from "next";
import cities from "./cities.json";
import pillar from "./pillar.json";
import { SITE_URL } from "../../url";

export const AU_LANGUAGES = ["en", "af", "zu"] as const;
export type AuLanguage = (typeof AU_LANGUAGES)[number];
export const AU_SLUGS = ["supersport", "perth", "sydney", "melbourne", "brisbane"] as const;
export type AuSlug = (typeof AU_SLUGS)[number];
export const AU_UPDATED = "2026-10-25";
export const AU_HREFLANG = { en: "en-AU", af: "af-AU", zu: "zu-AU" } as const;
// Owner selected the editorial team. No invented Person or third-party sameAs.
export const AU_VERIFIED_PROFILES: string[] = [];
export const AU_ORG_ID = `${SITE_URL}/#organization`;
export const AU_EDITOR_ID = `${SITE_URL}/#editorial-team`;
export const AU_SOURCES = [
  { name: "DStv Stream — territorial availability", url: "https://www.dstv.com/en-za/help/faqs/services/dstv-app/what-is-the-dstv-stream-app/" },
  { name: "Stan Sport — current price", url: "https://help.stan.com.au/hc/en-us/articles/360002785415-How-much-does-Stan-Sport-cost" },
  { name: "Stan Sport — match schedule", url: "https://www.stan.com.au/sport/schedule" },
  { name: "Tourism Australia — time zones", url: "https://www.australia.com/en/facts-and-planning/about-australia/time-zones.html" },
];
export function isAuSlug(slug: string): slug is AuSlug {
  return (AU_SLUGS as readonly string[]).includes(slug);
}
export function auPath(lang: AuLanguage, slug: AuSlug = "supersport") {
  return `/australia/${lang === "en" ? "" : `${lang}/`}${slug}`;
}
export function auAlternates(slug: AuSlug) {
  return {
    "en-AU": `${SITE_URL}${auPath("en", slug)}`,
    "af-AU": `${SITE_URL}${auPath("af", slug)}`,
    "zu-AU": `${SITE_URL}${auPath("zu", slug)}`,
    "x-default": `${SITE_URL}${auPath("en", slug)}`,
  };
}
export function auContent(lang: AuLanguage, slug: AuSlug) {
  return slug === "supersport" ? pillar[lang] : cities[slug][lang];
}
export function auFaq(lang: AuLanguage) { return pillar[lang].faq; }
export function auMetadata(lang: AuLanguage, slug: AuSlug): Metadata {
  const content = auContent(lang, slug);
  const url = `${SITE_URL}${auPath(lang, slug)}`;
  return {
    title: { absolute: content.title },
    description: content.lead,
    alternates: { canonical: url, languages: auAlternates(slug) },
    robots: { index: clustersPublished, follow: true },
    authors: [{ name: "Mzansi Stream Editorial" }],
    openGraph: { type: "article", title: content.title, description: content.lead,
      url, locale: AU_HREFLANG[lang].replace("-", "_"),
      alternateLocale: AU_LANGUAGES.filter(l => l !== lang).map(l => AU_HREFLANG[l].replace("-", "_")),
      images: [`${SITE_URL}/og-image.jpg`] },
  };
}
