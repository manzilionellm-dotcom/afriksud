// app/[locale]/sa-abroad/page.tsx — Hub for SA expat / diaspora pages.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../lib/locales";
import { hreflangForProgrammatic, localeUrl, SITE_URL } from "../../../lib/url";
import { robotsForProgrammatic } from "../../../lib/seo/indexability";
import { SA_ABROAD_COUNTRIES, saAbroadPath } from "../../../lib/seo/sa-abroad";
import Link from "next/link";
import { LongformShell } from "../../../components/client/LongformShell";
import { JsonLd } from "../../../lib/seo/jsonld";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  const title = "South African TV Abroad | Country Guides";
  const description =
    "Find country guides for South African viewers abroad. Check local programme availability, match times, news, radio and device setup.";
  return {
    title,
    description,
    alternates: {
      canonical: localeUrl(locale as Locale, "/sa-abroad"),
      languages: hreflangForProgrammatic(locale as Locale, "/sa-abroad"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(locale as Locale, "/sa-abroad"),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title,
      description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function SaAbroadHub({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const pageLocale = locale as Locale;
  const guides = SA_ABROAD_COUNTRIES.map((c) => ({ name: c.name, href: saAbroadPath(c) }));
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Destination guides",
        numberOfItems: guides.length,
        itemListElement: guides.map((g, i) => ({
          "@type": "ListItem", position: i + 1, name: g.name, url: `${SITE_URL}${g.href}`,
        })),
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(pageLocale) },
          { "@type": "ListItem", position: 2, name: "South African TV abroad", item: localeUrl(pageLocale, "/sa-abroad") },
        ],
      }} />
      <LongformShell locale={pageLocale}>
        <article className="section">
          <header className="longformHeader">
            <h1>South African TV abroad</h1>
            <p className="longformLead">Choose where you watch. The Australian and New Zealand guides list prepaid passes in US dollars. Other destination guides cover local start times, device setup and South African rand prices.</p>
          </header>
          <section className="longformSection">
            <h2>Destination guides</h2>
            <ul className="longformList">
              {guides.map((g) => <li key={g.href}><Link href={g.href}>{g.name}</Link></li>)}
            </ul>
          </section>
          <section className="longformSection">
            <h2>News, sport and moving abroad</h2>
            <ul className="longformList">
              <li><Link href="/en-za/blog/sabc-without-dstv">Find South African news and radio abroad</Link></li>
              <li><Link href="/en-gb/blog/dstv-uk-moving-from-south-africa">Manage your South African DStv account before moving to the UK</Link></li>
              <li><Link href="/en-au/blog/dstv-australia-find-the-broadcaster">Find a match broadcaster and its local start time in Australia</Link></li>
              <li><Link href="/fr/blog/dstv-en-europe-par-programme" hrefLang="fr">Retrouver un programme sud-africain en Europe (en français)</Link></li>
            </ul>
          </section>
        </article>
      </LongformShell>
    </>
  );
}
