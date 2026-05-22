// lib/seo/entity.ts
// Single source of truth for the Mzansi Stream brand entity graph.
//
// Why centralise: every long-form page used to inline its own copy of
// the Organization / WebSite / Brand JSON-LD. Drift was inevitable —
// `description` differed across surfaces, the WebSite block was missing
// `potentialAction` (the sitelinks search box trigger), and the brand
// entity was implicit instead of having a stable `@id`. A single source
// keeps the entity graph consistent for Google's Knowledge Graph
// reconciliation and for LLM retrievers (ChatGPT/Perplexity/Gemini),
// which prefer one canonical answer per fact.
//
// Stable `@id` URIs use the convention `${SITE_URL}/#<thing>` so that
// schemas on any page can reference the canonical entity via `@id`
// instead of re-declaring it, keeping payload small and consistent.

import { LOCALES, LOCALE_META } from "../locales";
import { SITE_URL } from "../url";

export const BRAND_NAME = "Mzansi Stream";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BRAND_ID = `${SITE_URL}/#brand`;
export const LOGO_ID = `${SITE_URL}/#logo`;

const LOGO_URL = `${SITE_URL}/icon-512.png`;
const OG_URL = `${SITE_URL}/og-image.jpg`;

const KNOWS_ABOUT = [
  "IPTV",
  "DStv alternative",
  "SuperSport streaming",
  "PSL (Premier Soccer League)",
  "Premier League",
  "URC rugby",
  "Springboks",
  "kykNET",
  "Mzansi Magic",
  "SABC",
  "MultiChoice",
  "Vumatel",
  "Openserve",
  "Frogfoot",
  "4K UHD streaming",
  "Smart TV",
  "Firestick",
  "TiviMate",
  "IPTV Smarters Pro",
  "M3U playlists",
  "Xtream Codes",
  "EPG (Electronic Programme Guide)",
  "South African diaspora",
];

const AREA_SERVED = [
  { "@type": "Country", name: "South Africa" },
  { "@type": "Country", name: "Zimbabwe" },
  { "@type": "Country", name: "Botswana" },
  { "@type": "Country", name: "Namibia" },
  { "@type": "Country", name: "Mozambique" },
  { "@type": "Country", name: "Lesotho" },
  { "@type": "Country", name: "Eswatini" },
  { "@type": "Country", name: "Zambia" },
  { "@type": "Country", name: "Malawi" },
  { "@type": "Country", name: "United Kingdom" },
  { "@type": "Country", name: "Australia" },
  { "@type": "Country", name: "New Zealand" },
  { "@type": "Country", name: "United States" },
  { "@type": "Country", name: "United Arab Emirates" },
];

const SUPPORTED_LANGUAGES = [
  "English",
  "Afrikaans",
  "Zulu",
  "Xhosa",
  "Portuguese",
  "French",
];

const INLANGUAGE = LOCALES.map((l) => LOCALE_META[l].hreflang);

export type EntityOptions = {
  whatsappPhone: string;
};

export function organizationSchema({ whatsappPhone }: EntityOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: BRAND_NAME,
    legalName: BRAND_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: LOGO_URL,
      contentUrl: LOGO_URL,
      width: 512,
      height: 512,
      caption: BRAND_NAME,
    },
    image: OG_URL,
    description:
      "Mzansi Stream — premium IPTV service with 20,000+ live channels and 100,000+ movies and series in 4K. Trusted by South Africans at home and abroad as a no-contract DStv alternative.",
    slogan: "20,000+ channels in 4K — no contract, no decoder",
    foundingDate: "2024",
    knowsAbout: KNOWS_ABOUT,
    knowsLanguage: ["en", "af", "zu", "xh", "pt", "fr"],
    areaServed: AREA_SERVED,
    brand: { "@id": BRAND_ID },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: `+${whatsappPhone}`,
        availableLanguage: SUPPORTED_LANGUAGES,
        areaServed: "Worldwide",
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
    ],
    // `sameAs` deliberately omitted until canonical social profiles
    // exist (X, LinkedIn, YouTube). Fabricating these would damage the
    // entity reconciliation we're trying to build.
  };
}

export function brandSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": BRAND_ID,
    name: BRAND_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    slogan: "20,000+ channels in 4K — no contract, no decoder",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BRAND_NAME,
    alternateName: ["iptvmzansi.com", "Mzansi IPTV"],
    description:
      "Premium IPTV for South Africa and the SA diaspora worldwide — 20,000+ channels in 4K with WhatsApp activation in under 10 minutes.",
    inLanguage: INLANGUAGE,
    publisher: { "@id": ORG_ID },
    // SearchAction unlocks the Google sitelinks search box on
    // brand SERPs. The URL template targets the home anchor since the
    // site does not (yet) ship a dedicated /search route — Google will
    // not surface the search box without this declaration.
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/en-za/?q={search_term_string}#search`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
