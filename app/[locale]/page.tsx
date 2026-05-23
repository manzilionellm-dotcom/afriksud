// app/[locale]/page.tsx
// Per-locale homepage. Server-rendered JSON-LD reflects the active locale
// so Google sees the right canonical, language and channel mix. Client
// islands (LanguageProvider, switcher) layer on top.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../lib/url";
import { dict } from "../../components/shared/dict";
import { plans } from "../../components/shared/plans";
import { SITE } from "../../components/shared/site";
import { JsonLd } from "../../lib/seo/jsonld";
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
  ReviewsSection,
  DeviceSection,
  SACities,
  QuickSetup,
  FaqSection,
  FooterSection,
} from "../../components/client/LocalizedSections";
import { ChannelExplorer } from "../../components/client/ChannelExplorer";
import { CountriesSection } from "../../components/client/CountriesSection";
import { InternationalSection } from "../../components/client/InternationalSection";
import { WhatsAppFab } from "../../components/client/WhatsAppFab";
import { PopiaConsentBanner } from "../../components/client/PopiaConsentBanner";
import { SkipLink } from "../../components/client/SkipLink";
import { LocaleSync } from "../../components/client/LocaleSync";
import { StickyHeader } from "../../components/ux/StickyHeader";
import { HeroV2 } from "../../components/ux/HeroV2";
import { PremiumPlanSelector } from "../../components/ux/PremiumPlanSelector";
import { BottomTabBar } from "../../components/ux/BottomTabBar";
import { PriceCheckoutMount } from "../../components/ux/checkout/PriceCheckoutMount";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  const meta = LOCALE_META[locale as Locale];
  return {
    title: "DStv Alternative — 20,000+ Channels from R99",
    description:
      "South Africa's IPTV alternative to DStv — 20,000+ live channels including SuperSport, kykNET and SABC in 4K. Free 24h trial, no card. From R99/mo.",
    alternates: {
      canonical: localeUrl(locale as Locale, "/"),
      languages: hreflangFor("/"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(locale as Locale, "/"),
      locale: meta.ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => LOCALE_META[l].ogLocale
      ),
      title: "DStv Alternative — 20,000+ Channels from R99 | Mzansi Stream",
      description:
        "South Africa's IPTV alternative to DStv — 20,000+ live channels in 4K. From R99/mo.",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function LocaleHome({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();

  const t = dict[locale as Locale];

  const seller = {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.domain,
  };

  const shippingDetails = {
    "@type": "OfferShippingDetails",
    shippingRate: { "@type": "MonetaryAmount", value: "0", currency: SITE.currencyCode },
    shippingDestination: { "@type": "DefinedRegion", addressCountry: "ZA" },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "MIN" },
      transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 10, unitCode: "MIN" },
    },
  };

  const returnPolicy = {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "ZA",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 7,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE.domain}/${locale}/#product`,
    name: "Mzansi Stream — Premium IPTV South Africa",
    brand: { "@id": BRAND_ID },
    manufacturer: { "@id": ORG_ID },
    description:
      "Mzansi Stream — 20,000+ live channels, 100,000+ movies and series, EPG, 4K/UHD. SuperSport, DStv Premiership, Premier League, kykNET, SABC and more. WhatsApp activation in 10 minutes.",
    image: `${SITE.domain}/og-image.jpg`,
    url: localeUrl(locale as Locale, "/"),
    sku: "MZANSI-STREAM-ZA",
    mpn: "MZANSI-2026",
    category: "Streaming / IPTV",
    audience: {
      "@type": "PeopleAudience",
      geographicArea: { "@type": "Country", name: "South Africa" },
    },
    // aggregateRating + review intentionally omitted until HelloPeter
    // Business profile is connected and there are 50+ verified reviews
    // with consent. DO NOT seed with invented data.
    offers: plans.map((p) => ({
      "@type": "Offer",
      "@id": `${SITE.domain}/${locale}/#offer-${p.key}`,
      name: t.planNames[p.key],
      description: `Mzansi Stream ${t.planNames[p.key]} — 20,000+ channels, 4K/UHD, EPG included.`,
      price: String(p.price),
      priceCurrency: SITE.currencyCode,
      priceValidUntil: p.priceValidUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: localeUrl(locale as Locale, "/"),
      seller,
      shippingDetails,
      hasMerchantReturnPolicy: returnPolicy,
    })),
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
      "Mzansi Stream — 20,000+ channels, 4K/UHD, sport, movies and series. Premium streaming for South Africa and the SA diaspora worldwide.",
    foundingDate: "2024",
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
    // `sameAs` intentionally omitted — wa.me is not a canonical social
    // profile per schema.org guidance. Add real X / LinkedIn / YouTube
    // entity URLs here once those profiles exist.
    priceRange: "99-1199 ZAR",
    currenciesAccepted: SITE.currencyCode,
    paymentAccepted:
      "EFT, SnapScan, Zapper, Yoco, Ozow, Capitec Pay, Visa, Mastercard, PayPal, Bitcoin",
  };

  const orgSchema = organizationSchema({ whatsappPhone: SITE.whatsappPhone });
  const siteSchema = websiteSchema();
  const brand = brandSchema();

  // WebPage + Speakable lets Google's voice surfaces and AI Overviews
  // safely quote the H1 + hero lead. We bind it to the actual on-page
  // anchors so the extracted snippet matches what the user sees.
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${localeUrl(locale as Locale, "/")}#webpage`,
    url: localeUrl(locale as Locale, "/"),
    name: "DStv Alternative — Mzansi Stream IPTV South Africa",
    description:
      "South Africa's IPTV alternative to DStv — 20,000+ live channels including SuperSport, kykNET and SABC in 4K. Free 24-hour trial, no card. From R99/month.",
    inLanguage: LOCALE_META[locale as Locale].hreflang,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: `${SITE.domain}/og-image.jpg`,
    datePublished: "2024-09-01",
    dateModified: new Date().toISOString().slice(0, 10),
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
      <JsonLd data={productSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={localBusinessSchema} />

      <LanguageProvider>
        <LocaleSync locale={locale as Locale} />
        <SkipLink />
        <div className="bg" />
        <StickyHeader />

        <main id="main-content">
          <HeroV2 />
          <div className="main">
            <TrialBanner />
            <TrustSection />
          </div>
          <PremiumPlanSelector />
          <div className="main">
            <VODSection />
            <CompareSection />
            <ChannelExplorer />
            <CountriesSection />
            <InternationalSection />
            <DeviceSection />
            <ReviewsSection />
            <SACities />
            <QuickSetup />
            <FaqSection />
          </div>
        </main>

        <FooterSection />

        <WhatsAppFab />
        <BottomTabBar />
        <PopiaConsentBanner />
        <PriceCheckoutMount />
      </LanguageProvider>
    </>
  );
}
