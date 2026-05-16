// app/sitemap.ts

import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, LOCALES, LOCALE_META } from "../lib/locales";
import { hreflangFor, localeUrl } from "../lib/url";
import { SADC_SLUGS } from "../lib/seo/sadc-countries";
import { SA_CITY_SLUGS } from "../lib/seo/cities";
import { COMPETITOR_SLUGS } from "../lib/seo/competitors";
import { BLOG_SLUGS } from "../lib/seo/blog-posts";
import { LEGAL_SLUGS, LEGAL_TOPICS } from "../lib/seo/legal";
import { SA_LANGUAGE_SLUGS } from "../lib/seo/sa-languages";
import { SA_ABROAD_SLUGS, SA_ABROAD_COUNTRIES } from "../lib/seo/sa-abroad";
import { COMMUNITY_SLUGS } from "../lib/seo/communities";
import { PILLAR_SLUGS } from "../lib/seo/pillars";
import { DEVICE_SLUGS } from "../lib/seo/devices";

type SitemapEntry = MetadataRoute.Sitemap[number];

const lastModified = new Date();

function withAlternates(
  path: string,
  priority: number,
  changeFrequency: SitemapEntry["changeFrequency"] = "weekly"
): SitemapEntry {
  return {
    url: localeUrl(DEFAULT_LOCALE, path),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages: hreflangFor(path) },
  };
}

// Skip indexing the noindex legal pages from the sitemap so Google
// doesn't waste crawl budget on placeholder content.
const indexableLegalSlugs = LEGAL_TOPICS.filter((t) => !t.needsOwnerInput).map(
  (t) => t.slug
);

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: SitemapEntry[] = [];

  // Home — every locale variant gets its own entry, anchored on en-za as canonical.
  entries.push(withAlternates("/", 1.0));
  for (const locale of LOCALES.filter((l) => l !== DEFAULT_LOCALE)) {
    entries.push({
      url: localeUrl(locale, "/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: hreflangFor("/") },
    });
  }

  // Pillar SEO pages.
  entries.push(withAlternates("/dstv-alternative/", 0.95));
  entries.push(withAlternates("/blog/", 0.7, "weekly"));
  entries.push(withAlternates("/referral/", 0.5, "monthly"));
  entries.push(withAlternates("/affiliate/", 0.5, "monthly"));

  // Head-term pillars (best-iptv, firestick, samsung, supersport, etc.)
  for (const slug of PILLAR_SLUGS) {
    entries.push(withAlternates(`/${slug}/`, 0.9, "monthly"));
  }

  // Section hubs / listing pages.
  entries.push(withAlternates("/cities/", 0.8, "monthly"));
  entries.push(withAlternates("/vs/", 0.8, "monthly"));
  entries.push(withAlternates("/sadc/", 0.8, "monthly"));
  entries.push(withAlternates("/sa-abroad/", 0.8, "monthly"));
  entries.push(withAlternates("/communities/", 0.7, "monthly"));
  entries.push(withAlternates("/devices/", 0.8, "monthly"));

  // Device install pages (under /devices/[slug]/ — Hisense, LG, Sony, etc.).
  for (const slug of DEVICE_SLUGS) {
    entries.push(withAlternates(`/devices/${slug}/`, 0.7, "monthly"));
  }

  // SADC countries (8 × default locale anchor with hreflang alternates).
  for (const slug of SADC_SLUGS) {
    entries.push(withAlternates(`/sadc/${slug}/`, 0.85, "monthly"));
  }

  // SA cities.
  for (const slug of SA_CITY_SLUGS) {
    entries.push(withAlternates(`/cities/${slug}/`, 0.75, "monthly"));
  }

  // Versus competitors.
  for (const slug of COMPETITOR_SLUGS) {
    entries.push(withAlternates(`/vs/${slug}/`, 0.8, "monthly"));
  }

  // SA-language landing pages.
  for (const slug of SA_LANGUAGE_SLUGS) {
    entries.push(withAlternates(`/language/${slug}/`, 0.7, "monthly"));
  }

  // Blog posts.
  for (const slug of BLOG_SLUGS) {
    entries.push(withAlternates(`/blog/${slug}/`, 0.6, "monthly"));
  }

  // Legal — only the ones with finalised copy (skip placeholder pages).
  for (const slug of LEGAL_SLUGS) {
    if (!indexableLegalSlugs.includes(slug)) continue;
    entries.push(withAlternates(`/legal/${slug}/`, 0.4, "yearly"));
  }

  // SA diaspora abroad — canonical lives on the preferred locale per
  // country (e.g. /en-gb/sa-abroad/uk/ rather than /en-za/...).
  for (const country of SA_ABROAD_COUNTRIES) {
    void SA_ABROAD_SLUGS; // tree-shake guard
    entries.push({
      url: localeUrl(country.preferredCanonicalLocale, `/sa-abroad/${country.slug}/`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: hreflangFor(`/sa-abroad/${country.slug}/`) },
    });
  }

  // Foreign communities in SA — always canonicalises to en-za.
  for (const slug of COMMUNITY_SLUGS) {
    entries.push(withAlternates(`/communities/${slug}/`, 0.75, "monthly"));
  }

  // Reference: LOCALE_META is wired here purely to validate the helpers
  // resolve every locale — strips out at tree-shake time.
  void LOCALE_META;

  return entries;
}
