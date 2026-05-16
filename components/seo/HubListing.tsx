// components/seo/HubListing.tsx
// Server component. Generic hub-index page used by /cities/, /vs/,
// /sadc/, /sa-abroad/, /communities/ to roll up the programmatic
// leaves into a single browsable URL that Google can crawl and that
// distributes internal link equity to every leaf.

import Link from "next/link";
import { type Locale } from "../../lib/locales";
import { localeUrl, SITE_URL } from "../../lib/url";
import { LongformShell } from "../client/LongformShell";

export type HubItem = {
  /** Path under the locale, e.g. `/cities/johannesburg/`. */
  href: string;
  /** Display label e.g. "Johannesburg". */
  label: string;
  /** Optional eyebrow under the label (region, country, etc.). */
  caption?: string;
};

export function HubListing({
  locale,
  eyebrow,
  h1,
  lead,
  items,
  itemListName,
  basePath,
  intro,
  extraSections,
}: {
  locale: Locale;
  eyebrow: string;
  h1: string;
  lead: string;
  items: HubItem[];
  itemListName: string;
  basePath: string;
  intro?: string[];
  extraSections?: { h2: string; paragraphs: string[] }[];
}) {
  const canonical = localeUrl(locale, basePath);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: itemListName,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      url: `${SITE_URL}/${locale}${it.href}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: localeUrl(locale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: h1,
        item: canonical,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <LongformShell locale={locale}>
        <article className="section">
          <header className="longformHeader">
            <p className="longformEyebrow">{eyebrow}</p>
            <h1>{h1}</h1>
            <p className="longformLead">{lead}</p>
          </header>

          {intro && intro.length ? (
            <section className="longformSection">
              {intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ) : null}

          <section className="longformSection">
            <h2>{itemListName}</h2>
            <ul className="longformList">
              {items.map((it) => (
                <li key={it.href}>
                  <Link href={`/${locale}${it.href}`}>{it.label}</Link>
                  {it.caption ? <span> — {it.caption}</span> : null}
                </li>
              ))}
            </ul>
          </section>

          {extraSections?.map((s) => (
            <section key={s.h2} className="longformSection">
              <h2>{s.h2}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </article>
      </LongformShell>
    </>
  );
}
