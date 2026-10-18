// lib/seo/breadcrumb.ts
// BreadcrumbList builder for pages that sit deeper than the locale home.
// Mirrors the inline convention already used by the city / blog / pillar
// templates (`@id = <canonical>#breadcrumb`, first crumb "Home" → locale
// root) so every deep page emits the same shape.

import type { Locale } from "../locales";
import { localeUrl } from "../url";

export type Crumb = {
  /** Visible label (the page H1 / nav label). */
  name: string;
  /** Path under the locale, e.g. "/blog" or "/legal/refund". */
  path: string;
};

export function breadcrumbSchema(locale: Locale, crumbs: Crumb[]) {
  const last = crumbs[crumbs.length - 1];
  const canonical = localeUrl(locale, last ? last.path : "/");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale, "/") },
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: localeUrl(locale, c.path),
      })),
    ],
  };
}
