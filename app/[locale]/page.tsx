// app/[locale]/page.tsx
// Per-locale homepage. Server-rendered JSON-LD reflects the active locale
// so Google sees the right canonical, language and channel mix. Client
// islands (LanguageProvider, switcher) layer on top.

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale, whatsappForLocale } from "../../lib/locales";
import { isOceaniaMarket, OCEANIA_MARKETS, OCEANIA_PLANS, type OceaniaMarket } from "../../lib/oceania-offer";
import { hreflangFor, localeUrl, ogImagesFor } from "../../lib/url";
import { homeMetaFor, brandedTitle } from "../../lib/seo/home-meta";
import { dict } from "../../components/shared/dict";
import { plans } from "../../components/shared/plans";
import { SITE } from "../../components/shared/site";
import { JsonLd } from "../../lib/seo/jsonld";
import { jsonLdString } from "../../lib/aio";
import {
  BRAND_ID,
  ORG_ID,
  WEBSITE_ID,
  brandSchema,
  organizationSchema,
  websiteSchema,
} from "../../lib/seo/entity";

import { LanguageProvider } from "../../components/client/LanguageProvider";
import {
  TrialBanner,
  TrustSection,
  VODSection,
  CompareSection,
  DeviceSection,
  SACities,
  QuickSetup,
  FaqSection,
  FooterSection,
} from "../../components/client/LocalizedSections";
import { ReviewsSection } from "../../components/client/ReviewsSection";
import { ChannelExplorer } from "../../components/client/ChannelExplorer";
import { CountriesSection } from "../../components/client/CountriesSection";
import { InternationalSection } from "../../components/client/InternationalSection";
import { StickyBottomCta } from "../../components/client/StickyBottomCta";
import { PopiaConsentBanner } from "../../components/client/PopiaConsentBanner";
import { SkipLink } from "../../components/client/SkipLink";
import { LocaleSync } from "../../components/client/LocaleSync";
import { StickyHeader } from "../../components/ux/StickyHeader";
import { HeroV2 } from "../../components/ux/HeroV2";
import { PremiumPlanSelector } from "../../components/ux/PremiumPlanSelector";
import { BottomTabBar } from "../../components/ux/BottomTabBar";
import { PriceCheckoutMount } from "../../components/ux/checkout/PriceCheckoutMount";
import { AioCitationFaq } from "../../components/seo/AioCitationFaq";
import { EnZaTrialCta } from "../../components/seo/EnZaTrialCta";
import { OceaniaOffer } from "../../components/seo/OceaniaOffer";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  const meta = LOCALE_META[locale as Locale];
  const home = homeMetaFor(locale as Locale);
  return {
    title: home.title,
    description: home.description,
    alternates: {
      canonical: localeUrl(locale as Locale, "/"),
      languages: hreflangFor("/"),
    },
    twitter: { card: "summary_large_image", title: brandedTitle(locale as Locale), description: home.description },
    openGraph: {
      type: "website",
      url: localeUrl(locale as Locale, "/"),
      locale: meta.ogLocale,
      ...(isOceaniaMarket(locale) ? { countryName: OCEANIA_MARKETS[locale].country } : {}),
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => LOCALE_META[l].ogLocale
      ),
      title: brandedTitle(locale as Locale),
      description: home.ogDescription ?? home.description,
      // og:image / twitter:image come from app/[locale]/opengraph-image.tsx
      // (native-language card per locale, generated at build time).
    },
  };
}

function OceaniaHome({ market }: { market: OceaniaMarket }) {
  const url = localeUrl(market);
  const home = homeMetaFor(market);
  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: home.title,
    description: home.description,
    url,
    serviceType: "Prepaid IPTV",
    provider: { "@id": ORG_ID },
    brand: { "@id": BRAND_ID },
    areaServed: { "@type": "Country", name: OCEANIA_MARKETS[market].country },
    offers: OCEANIA_PLANS.map((plan) => ({
      "@type": "Offer",
      "@id": `${url}#offer-${plan.id}`,
      name: plan.name,
      description: plan.description,
      price: plan.usd,
      priceCurrency: "USD",
      url,
      seller: { "@id": ORG_ID },
    })),
  };
  const webPage = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: home.title,
    description: home.description,
    inLanguage: LOCALE_META[market].hreflang,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": service["@id"] },
    primaryImageOfPage: { "@type": "ImageObject", url: ogImagesFor(market)[0].url },
  };

  return (
    <>
      <JsonLd data={organizationSchema({ whatsappPhone: whatsappForLocale(market) })} />
      <JsonLd data={brandSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [webPage, service] }} />
      <OceaniaOffer market={market} view="home" />
    </>
  );
}

export default async function LocaleHome({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  if (isOceaniaMarket(locale)) return <OceaniaHome market={locale} />;

  const t = dict[locale as Locale];

  const seller = {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.domain,
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.domain}/${locale}/#service`,
    name: "Mzansi Stream — IPTV subscription",
    serviceType: "IPTV streaming subscription",
    brand: { "@id": BRAND_ID },
    provider: { "@id": ORG_ID },
    description:
      homeMetaFor(locale as Locale).description,
    image: `${SITE.domain}/og-image.jpg`,
    url: localeUrl(locale as Locale, "/"),
    areaServed: { "@type": "Country", name: "South Africa" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Mzansi Stream plans",
      itemListElement: plans.map((p) => ({
        "@type": "Offer",
        "@id": `${SITE.domain}/${locale}/#offer-${p.key}`,
        name: t.planNames[p.key],
        description: `Mzansi Stream ${t.planNames[p.key]} — live channels, 4K/UHD, EPG included.`,
        price: String(p.price),
        priceCurrency: SITE.currencyCode,
        priceValidUntil: p.priceValidUntil,
        availability: "https://schema.org/InStock",
        url: localeUrl(locale as Locale, "/"),
        seller,
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineBusiness",
    "@id": `${SITE.domain}/#business`,
    name: SITE.brand,
    url: SITE.domain,
    logo: `${SITE.domain}/og-image.jpg`,
    image: `${SITE.domain}/og-image.jpg`,
    description:
      "Mzansi Stream — live channels, 4K/UHD, sport, movies and series. Streaming for South Africa and the SA diaspora worldwide.",
    // À CONFIRMER — founding year is not evidenced in this repo. Do not emit foundingDate.
    areaServed: [
      { "@type": "Country", name: "South Africa" },
      { "@type": "Country", name: "Zimbabwe" },
      { "@type": "Country", name: "Botswana" },
      { "@type": "Country", name: "Namibia" },
      { "@type": "Country", name: "Mozambique" },
      { "@type": "Country", name: "Lesotho" },
      { "@type": "Country", name: "Eswatini" },
      { "@type": "Country", name: "Zambia" },
      { "@type": "Country", name: "Malawi" },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "ZA",
      addressRegion: "Gauteng",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: `+${SITE.whatsappPhone}`,
      availableLanguage: [
        "English",
        "Afrikaans",
        "Zulu",
        "Xhosa",
        "Portuguese",
        "French",
      ],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "23:00",
      },
    },
    priceRange: `${plans[0].price}-${plans[plans.length - 1].price} ZAR`,
    currenciesAccepted: SITE.currencyCode,
    paymentAccepted:
      "EFT, SnapScan, Zapper, Yoco, Ozow, Capitec Pay, Visa, Mastercard, PayPal, Bitcoin",
  };

  const orgSchema = organizationSchema({ whatsappPhone: SITE.whatsappPhone });
  const siteSchema = websiteSchema();
  const brand = brandSchema();

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${localeUrl(locale as Locale, "/")}#webpage`,
    url: localeUrl(locale as Locale, "/"),
    name: homeMetaFor(locale as Locale).title,
    description: homeMetaFor(locale as Locale).description,
    inLanguage: LOCALE_META[locale as Locale].hreflang,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: `${SITE.domain}/og-image.jpg`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".heroLead", ".trustStrip"],
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale as Locale, "/") },
      ],
    },
  };

  return (
    <>
      <JsonLd data={orgSchema} />
      <JsonLd data={brand} />
      <JsonLd data={siteSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={serviceSchema} />
      {/* en-za FAQPage + Product (lib/aio.ts) are emitted once, here —
          statically, instead of from a header-dependent root layout.
          Keeping the old homepage FAQPage would duplicate it. */}
      {locale === "en-za" ? (
        <script
          type="application/ld+json"
          id="aio-jsonld"
          dangerouslySetInnerHTML={{ __html: jsonLdString() }}
        />
      ) : (
        <JsonLd data={faqSchema} />
      )}
      <JsonLd data={localBusinessSchema} />

      <LanguageProvider initialLocale={locale as Locale}>
        <LocaleSync locale={locale as Locale} />
        <SkipLink />
        <div className="bg" />
        <StickyHeader />

        <main id="main-content">
          <HeroV2 />
          {locale === "en-za" ? <EnZaTrialCta variant="hero" /> : null}
          <div className="main">
            <TrialBanner />
            <TrustSection />
          </div>
          <PremiumPlanSelector />
          <div className="main">
            <VODSection />
            <CompareSection />
            {locale === "fr" && (
              <nav aria-label="Guides DStv en français" className="diasporaLinks">
                <p className="diasporaLinksTitle">Guides DStv en français</p>
                <ul>
                  <li><Link href="/fr/blog/dstv-afrique-pays-devises">DStv en Afrique selon le pays, le bouquet et la devise</Link></li>
                  <li><Link href="/fr/blog/dstv-en-europe-par-programme">Où retrouver un programme sud-africain en Europe</Link></li>
                </ul>
              </nav>
            )}
            {locale === "en-za" && (
              <nav aria-label="South African viewing guides" className="diasporaLinks">
                <p className="diasporaLinksTitle">Compare your viewing options</p>
                <ul>
                  <li><Link href="/en-za/blog/dstv-price-south-africa">DStv Stream and satellite prices in rand</Link></li>
                  <li><Link href="/en-za/blog/dstv-open-time-2026">DStv Open Time 2026 dates and eligibility</Link></li>
                  <li><Link href="/en-za/blog/sabc-without-dstv">How to watch SABC directly</Link></li>
                </ul>
              </nav>
            )}
            <ChannelExplorer />
            <CountriesSection />
            <InternationalSection />
            <DeviceSection />
            <ReviewsSection />
            <SACities />
            <QuickSetup />
            {locale === "en-za" ? <AioCitationFaq /> : <FaqSection />}
            {locale === "en-za" ? <EnZaTrialCta variant="after-faq" /> : null}
          </div>
        </main>

        <FooterSection />

        <StickyBottomCta />
        <BottomTabBar />
        <PopiaConsentBanner />
        <PriceCheckoutMount />
      </LanguageProvider>
    </>
  );
}
