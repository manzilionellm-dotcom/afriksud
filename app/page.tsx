// app/page.tsx
// SERVER COMPONENT — generates all JSON-LD schemas server-side for Google.
// The page is fully indexable. Client components are mounted via islands pattern.

import { dict } from "../components/shared/dict";
import { plans } from "../components/shared/plans";
import { SITE } from "../components/shared/site";

import { LanguageProvider } from "../components/client/LanguageProvider";
import { HeaderNav } from "../components/client/HeaderNav";
import { CinematicIntroController } from "../components/client/CinematicIntroController";
import {
  TopBar,
  Hero,
  TrialBanner,
  TrustSection,
  Offers,
  VODSection,
  CompareSection,
  ReviewsSection,
  DeviceSection,
  SACities,
  QuickSetup,
  FaqSection,
  FooterSection,
} from "../components/client/LocalizedSections";
import { ChannelExplorer } from "../components/client/ChannelExplorer";
import { CountriesSection } from "../components/client/CountriesSection";
import { InternationalSection } from "../components/client/InternationalSection";
import { LeratoChat } from "../components/client/LeratoChat";
import { LiveActivity } from "../components/client/LiveActivity";
import { PWABar } from "../components/client/PWABar";
import { StickyMobileCta } from "../components/client/StickyMobileCta";

export default function Page() {
  // Use English as the canonical version for JSON-LD (best for Google in SA)
  const t = dict[SITE.defaultLocale];

  // ─── JSON-LD SCHEMAS (ALL SERVER-RENDERED) ────────────────────────────────
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
    merchantReturnDays: 1,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE.domain}/#product`,
    name: "Mzansi Stream — Premium IPTV South Africa",
    brand: { "@type": "Brand", name: SITE.brand },
    description:
      "Mzansi Stream — 20,000+ live channels, 100,000+ movies and series, EPG, 4K/UHD. SuperSport, DStv Premiership, Premier League, kykNET, SABC and more. WhatsApp activation in 10 minutes. Compatible with Firestick, Smart TV, iPhone, Android and PC.",
    image: `${SITE.domain}/og-image.jpg`,
    url: SITE.domain,
    sku: "MZANSI-STREAM-ZA",
    mpn: "MZANSI-2026",
    category: "Streaming / IPTV",
    // aggregateRating + review intentionally omitted until HelloPeter
    // Business profile is connected and there are 50+ verified reviews
    // with consent (POPIA + Omnibus). DO NOT seed with invented data.
    offers: plans.map(p => ({
      "@type": "Offer",
      "@id": `${SITE.domain}/#offer-${p.key}`,
      name: t.planNames[p.key],
      description: `Mzansi Stream ${t.planNames[p.key]} — 20,000+ channels, 4K/UHD, EPG included.`,
      price: String(p.price),
      priceCurrency: SITE.currencyCode,
      priceValidUntil: p.priceValidUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: SITE.domain,
      seller,
      shippingDetails,
      hasMerchantReturnPolicy: returnPolicy,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map(f => ({
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
      { "@type": "City", name: "Johannesburg" },
      { "@type": "City", name: "Cape Town" },
      { "@type": "City", name: "Durban" },
      { "@type": "City", name: "Pretoria" },
      { "@type": "City", name: "Gqeberha" },
      { "@type": "City", name: "Bloemfontein" },
      { "@type": "City", name: "East London" },
      { "@type": "City", name: "Polokwane" },
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
      availableLanguage: ["English", "Afrikaans", "Zulu", "Xhosa", "French"],
      contactOption: "https://schema.org/TollFree",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "23:00",
      },
    },
    // aggregateRating intentionally omitted — see note on productSchema.
    sameAs: [`https://wa.me/${SITE.whatsappPhone}`],
    priceRange: "99-1199 ZAR",
    currenciesAccepted: SITE.currencyCode,
    paymentAccepted: "EFT, SnapScan, Zapper, Yoco, Ozow, Capitec Pay, Visa, Mastercard, PayPal, Bitcoin",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.domain}/#organization`,
    name: SITE.brand,
    legalName: SITE.brand,
    url: SITE.domain,
    logo: { "@type": "ImageObject", url: `${SITE.domain}/og-image.jpg`, width: 1200, height: 630 },
    image: `${SITE.domain}/og-image.jpg`,
    description:
      "Mzansi Stream — premium streaming service with 20,000+ live channels, 100,000+ movies and series. Trusted by South Africans worldwide.",
    foundingDate: "2024",
    areaServed: [
      "South Africa", "Zimbabwe", "Botswana", "Namibia", "Mozambique",
      "United Kingdom", "Australia", "New Zealand", "United States",
      "Canada", "United Arab Emirates", "Germany", "Ireland", "Netherlands",
      "Belgium", "Switzerland", "Singapore", "Worldwide",
    ],
    knowsLanguage: ["en", "af", "zu", "xh", "fr"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: `+${SITE.whatsappPhone}`,
        availableLanguage: ["English", "Afrikaans", "Zulu", "Xhosa", "French"],
        contactOption: "TollFree",
        areaServed: "Worldwide",
      },
    ],
    sameAs: [`https://wa.me/${SITE.whatsappPhone}`],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.domain}/#website`,
    url: SITE.domain,
    name: SITE.brand,
    description: "Premium IPTV for South Africa and the SA diaspora worldwide — 20,000+ channels in 4K.",
    inLanguage: [
      "en-ZA", "en-GB", "en-AU", "en-US", "en-AE", "en-NZ", "en-ZW",
      "af", "zu", "xh", "pt-MZ", "fr",
    ],
    publisher: { "@id": `${SITE.domain}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE.domain}/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",          item: SITE.domain },
      { "@type": "ListItem", position: 2, name: "Pricing",       item: `${SITE.domain}/#offers` },
      { "@type": "ListItem", position: 3, name: "Channels",      item: `${SITE.domain}/#channels` },
      { "@type": "ListItem", position: 4, name: "Your language", item: `${SITE.domain}/#countries` },
      { "@type": "ListItem", position: 5, name: "International", item: `${SITE.domain}/#international` },
      { "@type": "ListItem", position: 6, name: "Setup",         item: `${SITE.domain}/#setup` },
      { "@type": "ListItem", position: 7, name: "FAQ",           item: `${SITE.domain}/#faq` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.domain}/#service`,
    serviceType: "Premium IPTV Streaming",
    name: `${SITE.brand} — Premium IPTV`,
    provider: { "@id": `${SITE.domain}/#organization` },
    inLanguage: [
      "en-ZA", "en-GB", "en-AU", "en-US", "en-AE", "en-NZ", "en-ZW",
      "af", "zu", "xh", "pt-MZ", "fr",
    ],
    areaServed: [
      { "@type": "Country", name: "South Africa" },
      { "@type": "Country", name: "Zimbabwe" },
      { "@type": "Country", name: "Botswana" },
      { "@type": "Country", name: "Namibia" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "New Zealand" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Germany" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${SITE.brand} plans`,
      itemListElement: plans.map(p => ({
        "@type": "Offer",
        name: t.planNames[p.key],
        price: String(p.price),
        priceCurrency: SITE.currencyCode,
      })),
    },
  };

  return (
    <>
      {/* JSON-LD — server-rendered for Google */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <LanguageProvider>
        <CinematicIntroController />
        <div className="bg" />

        <TopBar />
        <HeaderNav />

        <main className="main">
          <Hero />
          <TrialBanner />
          <TrustSection />
          <Offers />
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
        </main>

        <FooterSection />

        <PWABar />
        <StickyMobileCta />
        <LeratoChat />
        <LiveActivity />
      </LanguageProvider>
    </>
  );
}
