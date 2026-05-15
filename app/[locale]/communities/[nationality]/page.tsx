// app/[locale]/communities/[nationality]/page.tsx
// Section B.5.2 — Foreign communities living IN South Africa.
// Canonical stays on en-za for these routes per B.5.4: the audience lives
// here, so the SA market locale owns the URL.

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../../lib/url";
import {
  COMMUNITY_SLUGS,
  getCommunity,
} from "../../../../lib/seo/communities";
import { LongformShell } from "../../../../components/client/LongformShell";

type Props = {
  params: Promise<{ locale: string; nationality: string }>;
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    COMMUNITY_SLUGS.map((nationality) => ({ locale, nationality }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, nationality } = await params;
  const data = getCommunity(nationality);
  if (!(LOCALES as readonly string[]).includes(locale) || !data) return {};

  // Per B.5.4, /communities/* canonicalises to en-za regardless of the
  // user's locale prefix — the audience lives in SA.
  const canonical = localeUrl("en-za", `/communities/${nationality}/`);

  return {
    title: data.meta.title,
    description: data.meta.description,
    alternates: {
      canonical,
      languages: hreflangFor(`/communities/${nationality}/`),
    },
    openGraph: {
      type: "article",
      url: canonical,
      locale: LOCALE_META[locale as Locale].ogLocale,
      title: data.meta.title,
      description: data.meta.description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function CommunityPage({ params }: Props) {
  const { locale, nationality } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const data = getCommunity(nationality);
  if (!data) notFound();

  const cityList = data.hubCities.join(", ");
  const channelExamples = data.channels
    .slice(0, 4)
    .map((c) => c.latin || c.native)
    .join(", ");
  const languageList = data.languages.join(", ");

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Mzansi Stream — ${data.demonym} TV in South Africa`,
    description: data.meta.description,
    serviceType: `IPTV for the ${data.demonym} community in South Africa`,
    provider: { "@type": "Organization", name: "Mzansi Stream", url: SITE_URL },
    areaServed: { "@type": "Country", name: "South Africa", addressCountry: "ZA" },
    audience: {
      "@type": "PeopleAudience",
      audienceType: `${data.demonym} community in South Africa`,
      geographicArea: { "@type": "Country", name: "South Africa" },
    },
    url: localeUrl("en-za", `/communities/${nationality}/`),
    knowsAbout: [
      `${data.homeCountry} television`,
      ...data.channels.slice(0, 5).map((c) => c.latin || c.native),
      `${data.demonym} community in South Africa`,
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale as Locale, "/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Communities",
        item: localeUrl(locale as Locale, "/communities/"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${data.demonym} TV`,
        item: localeUrl("en-za", `/communities/${nationality}/`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <LongformShell locale={locale as Locale}>
        <article className="section">
          <header className="longformHeader">
            <p className="longformEyebrow">
              {data.flag} {data.demonym} community · South Africa
            </p>
            <h1>
              {data.demonym} TV in South Africa — Watch {data.homeCountry}{" "}
              Channels
            </h1>
            <p className="longformLead">
              Built for the {data.demonym} community in {cityList}. Watch
              {" "}{channelExamples} and the full {data.homeCountry} TV line-
              up on the device you already own — Smart TV, Firestick,
              iPhone, iPad, Android or PC. {data.demonym} IPTV in South
              Africa for the price of a coffee a week.
            </p>
            <div className="ctaRow">
              <a
                href={`/?ref=Community-${nationality}#offers`}
                className="btnPrimary"
              >
                Start 24h free trial →
              </a>
              <a href="#channels" className="btnSecondary">
                See {data.homeCountry} channels →
              </a>
            </div>
          </header>

          <section className="longformSection" id="channels">
            <h2>{data.homeCountry} channels included</h2>
            <p>
              Featured {data.demonym} TV channels — names shown in their
              original script where applicable:
            </p>
            <ul className="longformList">
              {data.channels.map((c) => (
                <li key={c.native} lang={c.latin ? undefined : "en"}>
                  <span lang="en">{c.native}</span>
                  {c.latin ? <span> — {c.latin}</span> : null}
                </li>
              ))}
            </ul>
            <p>
              Plus 20,000+ international and South African channels in 4K
              and HD on the same subscription, so the household gets
              {" "}{data.homeCountry} TV alongside SuperSport, SABC and
              global content in one M3U feed.
            </p>
          </section>

          <section className="longformSection">
            <h2>{languageList} programming</h2>
            <p>
              Customer support is in English. We welcome WhatsApp messages
              in {languageList} — our team works with translators when
              needed so {data.demonym} customers in {cityList} can be
              served in their language for setup and support questions.
            </p>
          </section>

          <section className="longformSection">
            <h2>
              For the {data.demonym} community in {data.hubCities[0]},{" "}
              {data.hubCities[1] ?? data.hubCities[0]} and{" "}
              {data.hubCities[2] ?? data.hubCities[0]}
            </h2>
            <p>
              {data.demonym} TV in South Africa lands in the same M3U
              playlist as your SA channels. {data.demonym} iptv South
              Africa with no decoder, no contract and no separate dish.
              Works on Vumatel, Openserve, Frogfoot, Octotel, MetroFibre,
              MTN Fibre and Vodacom Fibre across the major SA metros.
            </p>
          </section>

          <section className="longformSection">
            <h2>How to get {data.homeCountry} TV in South Africa</h2>
            <ol className="longformList">
              <li>Message us on WhatsApp with your device + city.</li>
              <li>
                Pick a plan from R99/month (12-month plan equivalent) and
                pay via EFT, SnapScan, Ozow, Capitec Pay, Visa, Mastercard
                or PayPal.
              </li>
              <li>
                Receive your M3U link plus a setup guide. Usually live
                within 10 minutes — and {data.homeCountry} channels show
                up alongside your SA channels in the same player.
              </li>
            </ol>
          </section>

          <section className="longformSection">
            <h2>Related city pages</h2>
            <ul className="longformList">
              {data.hubCities.slice(0, 3).map((city) => {
                const slug = city.toLowerCase().replace(/\s+/g, "-");
                return (
                  <li key={city}>
                    <Link href={`/${locale}/cities/${slug}/`}>
                      IPTV in {city}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href={`/${locale}/dstv-alternative/`}>
                  DStv alternative — 2026 guide
                </Link>
              </li>
            </ul>
          </section>
        </article>
      </LongformShell>
    </>
  );
}
