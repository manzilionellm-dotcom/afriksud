// app/[locale]/cities/[city]/page.tsx
// 12 SA city pages generated from lib/seo/cities.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../../lib/url";
import { SA_CITY_SLUGS, getSACity } from "../../../../lib/seo/cities";
import { LanguageProvider } from "../../../../components/client/LanguageProvider";
import { HeaderNav } from "../../../../components/client/HeaderNav";
import { FooterSection } from "../../../../components/client/LocalizedSections";
import { WhatsAppFab } from "../../../../components/client/WhatsAppFab";
import { StickyBottomCta } from "../../../../components/client/StickyBottomCta";
import { PopiaConsentBanner } from "../../../../components/client/PopiaConsentBanner";
import { SkipLink } from "../../../../components/client/SkipLink";
import { LocaleSync } from "../../../../components/client/LocaleSync";
type Props = { params: Promise<{ locale: string; city: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SA_CITY_SLUGS.map((city) => ({ locale, city }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city } = await params;
  const data = getSACity(city);
  if (!(LOCALES as readonly string[]).includes(locale) || !data) return {};
  return {
    title: `IPTV ${data.name} 2026 — DStv Alternative, SuperSport 4K | Mzansi Stream`,
    description: `IPTV ${data.name} — 20,000+ channels, SuperSport, kykNET, SABC in 4K. Works on Vumatel, Openserve, Frogfoot. From R99/mo.`,
    alternates: {
      canonical: localeUrl(locale as Locale, `/cities/${city}/`),
      languages: hreflangFor(`/cities/${city}/`),
    },
    openGraph: {
      type: "article",
      url: localeUrl(locale as Locale, `/cities/${city}/`),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title: `IPTV ${data.name} 2026 — DStv Alternative in 4K`,
      description: `Stream 20,000+ channels in ${data.name} from R99/mo. SuperSport, kykNET, SABC in 4K.`,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { locale, city } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const data = getSACity(city);
  if (!data) notFound();

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Mzansi Stream — ${data.name}`,
    description: data.hook,
    areaServed: [
      { "@type": "City", name: data.name, addressRegion: data.region },
      ...data.suburbs.map((s) => ({
        "@type": "City",
        name: s,
        addressRegion: data.region,
      })),
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "ZA",
      addressRegion: data.region,
      addressLocality: data.name,
    },
    url: localeUrl(locale as Locale, `/cities/${city}/`),
    priceRange: "99-1199 ZAR",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale as Locale, "/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cities",
        item: localeUrl(locale as Locale, "/cities/"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.name,
        item: localeUrl(locale as Locale, `/cities/${city}/`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <LanguageProvider>
        <LocaleSync locale={locale as Locale} />
        <SkipLink />
        <div className="bg" />
        <HeaderNav />

        <main className="main longform" id="main-content">
          <article className="section">
            <header className="longformHeader">
              <p className="longformEyebrow">
                {data.region} · {data.population}
              </p>
              <h1>
                IPTV {data.name} 2026 — DStv Alternative, SuperSport, 20,000+
                Channels
              </h1>
              <p className="longformLead">{data.hook}</p>
              <div className="ctaRow">
                <a href="#trial" className="btnPrimary">
                  Free 24h trial →
                </a>
                <a href="#pricing" className="btnSecondary">
                  See plans →
                </a>
              </div>
            </header>

            <section className="longformSection">
              <h2>Optimised for {data.name} fibre</h2>
              <p>
                Mzansi Stream peers at NAPAfrica with CDN edges in
                Johannesburg and Cape Town, so 4K streams cleanly across
                every major SA fibre network: {data.isps.join(", ")}.
              </p>
              <p>
                <strong>Coverage in {data.name}:</strong>{" "}
                {data.suburbs.join(", ")}.
              </p>
            </section>

            <section className="longformSection">
              <h2>Local sport in {data.name}</h2>
              {data.teams.map((t) => (
                <p key={t.sport}>
                  <strong>{t.sport}:</strong> {t.clubs.join(", ")}. Every
                  match in 4K via SuperSport.
                </p>
              ))}
            </section>

            <section className="longformSection">
              <h2>Channel line-up</h2>
              <p>
                Every SuperSport feed (PSL, Variety 1-4, Rugby, Cricket,
                Premier League), kykNET, kykNET & Kie, kykNET Lekker,
                Mzansi Magic, SABC 1/2/3, e.tv, M-Net, 20,000+
                international channels, and 100,000+ movies and series on
                demand.
              </p>
            </section>

            <section className="longformSection" id="pricing">
              <h2>Plans from R99/month — no contract</h2>
              <ul className="longformList">
                <li>1 month — R199</li>
                <li>3 months — R449 (Most popular)</li>
                <li>6 months — R699</li>
                <li>12 months — R1,199 (Best value)</li>
              </ul>
              <p>
                Pay via EFT, Ozow, SnapScan, Zapper, Yoco, Capitec Pay,
                Visa, Mastercard, PayPal or Bitcoin.
              </p>
            </section>

            <section className="longformSection" id="trial">
              <h2>Get started — 10 minutes on WhatsApp</h2>
              <p>
                Message us on WhatsApp, pick a plan, pay, and we send your
                M3U link with a setup guide for your specific device. 24-hour
                free trial, no card.
              </p>
            </section>
          </article>
        </main>

        <FooterSection />
        <WhatsAppFab />
        <StickyBottomCta />
        <PopiaConsentBanner />
      </LanguageProvider>
    </>
  );
}
