// lib/seo/sa-abroad.ts
// Section B.5.1 — SA diaspora outbound pages at /[locale]/sa-abroad/[country]/.
// Each entry drives one programmatic page targeting SA expats in that
// country. `preferredCanonicalLocale` controls the canonical URL: e.g.
// the UK page's canonical lives at /en-gb/sa-abroad/uk/ even when the
// page is reached through /en-za/sa-abroad/uk/.

import type { Locale } from "../locales";

export type SaAbroadCountry = {
  slug: string;
  name: string;
  flag: string;
  iso2: string;
  /** Locale chosen as canonical home for this country page. */
  preferredCanonicalLocale: Locale;
  /** Top 3 cities to localise the keyword footprint. */
  cities: string[];
  /** Region used for the "low-latency edge servers in [region]" line. */
  edgeRegion: string;
  /** Time-zone summary for the "watch on SA time" angle. */
  timezone: string;
  /** Local currency code for the pricing block. ZAR is always shown. */
  localCurrency: string;
  /** Approximate ZAR-equivalent prefix used in copy. */
  localPriceNote: string;
};

export const SA_ABROAD_COUNTRIES: SaAbroadCountry[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    iso2: "GB",
    preferredCanonicalLocale: "en-gb",
    cities: ["London", "Manchester", "Birmingham"],
    edgeRegion: "London (LON-1)",
    timezone: "UTC / UTC+1 BST — 1-2 hours behind SAST",
    localCurrency: "GBP",
    localPriceNote: "From the equivalent of ~£5/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    iso2: "AU",
    preferredCanonicalLocale: "en-au",
    cities: ["Sydney", "Melbourne", "Perth"],
    edgeRegion: "Sydney (SYD-1)",
    timezone: "UTC+8 to UTC+11 — 6-9 hours ahead of SAST",
    localCurrency: "AUD",
    localPriceNote: "From the equivalent of ~AU$8/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    iso2: "NZ",
    preferredCanonicalLocale: "en-nz",
    cities: ["Auckland", "Wellington", "Christchurch"],
    edgeRegion: "Sydney (SYD-1) and Auckland peering",
    timezone: "UTC+12 — 10 hours ahead of SAST",
    localCurrency: "NZD",
    localPriceNote: "From the equivalent of ~NZ$9/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "usa",
    name: "United States",
    flag: "🇺🇸",
    iso2: "US",
    preferredCanonicalLocale: "en-us",
    cities: ["New York", "Los Angeles", "Houston"],
    edgeRegion: "Ashburn (IAD-1) and Los Angeles (LAX-1)",
    timezone: "UTC-5 to UTC-10 — 5-10 hours behind SAST",
    localCurrency: "USD",
    localPriceNote: "From the equivalent of ~US$6/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    iso2: "CA",
    // Canada has no dedicated locale in the registry — fall back to en-us
    // since it shares the North American time zone band and currency feel.
    preferredCanonicalLocale: "en-us",
    cities: ["Toronto", "Vancouver", "Calgary"],
    edgeRegion: "Ashburn (IAD-1) and Los Angeles (LAX-1)",
    timezone: "UTC-4 to UTC-8 — 6-10 hours behind SAST",
    localCurrency: "CAD",
    localPriceNote: "From the equivalent of ~CA$8/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    iso2: "AE",
    preferredCanonicalLocale: "en-ae",
    cities: ["Dubai", "Abu Dhabi", "Sharjah"],
    edgeRegion: "Dubai (DXB-1)",
    timezone: "UTC+4 — 2 hours ahead of SAST",
    localCurrency: "AED",
    localPriceNote: "From the equivalent of ~AED25/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "germany",
    name: "Germany",
    flag: "🇩🇪",
    iso2: "DE",
    // No dedicated de-DE locale; en-ZA serves as default since the
    // diaspora reads in English anyway.
    preferredCanonicalLocale: "en-za",
    cities: ["Berlin", "Munich", "Frankfurt"],
    edgeRegion: "Frankfurt (FRA-1)",
    timezone: "UTC+1 / UTC+2 — same as / 1 hour behind SAST",
    localCurrency: "EUR",
    localPriceNote: "From the equivalent of ~€6/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "ireland",
    name: "Ireland",
    flag: "🇮🇪",
    iso2: "IE",
    preferredCanonicalLocale: "en-gb",
    cities: ["Dublin", "Cork", "Galway"],
    edgeRegion: "London (LON-1) and Dublin peering",
    timezone: "UTC / UTC+1 IST — 1-2 hours behind SAST",
    localCurrency: "EUR",
    localPriceNote: "From the equivalent of ~€6/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    flag: "🇳🇱",
    iso2: "NL",
    preferredCanonicalLocale: "en-za",
    cities: ["Amsterdam", "Rotterdam", "The Hague"],
    edgeRegion: "Amsterdam (AMS-1)",
    timezone: "UTC+1 / UTC+2 — same as / 1 hour behind SAST",
    localCurrency: "EUR",
    localPriceNote: "From the equivalent of ~€6/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "belgium",
    name: "Belgium",
    flag: "🇧🇪",
    iso2: "BE",
    preferredCanonicalLocale: "fr",
    cities: ["Brussels", "Antwerp", "Ghent"],
    edgeRegion: "Amsterdam (AMS-1) and Brussels peering",
    timezone: "UTC+1 / UTC+2 — same as / 1 hour behind SAST",
    localCurrency: "EUR",
    localPriceNote: "From the equivalent of ~€6/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    flag: "🇨🇭",
    iso2: "CH",
    preferredCanonicalLocale: "fr",
    cities: ["Zurich", "Geneva", "Basel"],
    edgeRegion: "Frankfurt (FRA-1) and Zurich peering",
    timezone: "UTC+1 / UTC+2 — same as / 1 hour behind SAST",
    localCurrency: "CHF",
    localPriceNote: "From the equivalent of ~CHF8/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    iso2: "SG",
    preferredCanonicalLocale: "en-za",
    cities: ["Singapore"],
    edgeRegion: "Singapore (SIN-1)",
    timezone: "UTC+8 — 6 hours ahead of SAST",
    localCurrency: "SGD",
    localPriceNote: "From the equivalent of ~SG$8/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    iso2: "SA",
    preferredCanonicalLocale: "en-ae",
    cities: ["Riyadh", "Jeddah", "Dammam"],
    edgeRegion: "Dubai (DXB-1)",
    timezone: "UTC+3 — 1 hour ahead of SAST",
    localCurrency: "SAR",
    localPriceNote: "From the equivalent of ~SAR25/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "qatar",
    name: "Qatar",
    flag: "🇶🇦",
    iso2: "QA",
    preferredCanonicalLocale: "en-ae",
    cities: ["Doha", "Al Rayyan", "Al Wakrah"],
    edgeRegion: "Dubai (DXB-1)",
    timezone: "UTC+3 — 1 hour ahead of SAST",
    localCurrency: "QAR",
    localPriceNote: "From the equivalent of ~QAR25/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "mauritius",
    name: "Mauritius",
    flag: "🇲🇺",
    iso2: "MU",
    preferredCanonicalLocale: "en-za",
    cities: ["Port Louis", "Curepipe", "Quatre Bornes"],
    edgeRegion: "Johannesburg (JNB-1) — closest SA edge serves Mauritius",
    timezone: "UTC+4 — 2 hours ahead of SAST",
    localCurrency: "MUR",
    localPriceNote: "From the equivalent of ~MUR300/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "portugal",
    name: "Portugal",
    flag: "🇵🇹",
    iso2: "PT",
    // Portugal sits closer to pt-MZ than to en-ZA for diaspora reading
    // patterns (Portuguese SA emigrants returning to the homeland).
    preferredCanonicalLocale: "pt-mz",
    cities: ["Lisbon", "Porto", "Funchal"],
    edgeRegion: "Lisbon (LIS-1) and Amsterdam (AMS-1)",
    timezone: "UTC / UTC+1 — 1-2 hours behind SAST",
    localCurrency: "EUR",
    localPriceNote: "From the equivalent of ~€6/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "israel",
    name: "Israel",
    flag: "🇮🇱",
    iso2: "IL",
    preferredCanonicalLocale: "en-za",
    cities: ["Tel Aviv", "Jerusalem", "Haifa"],
    edgeRegion: "Frankfurt (FRA-1) and Tel Aviv peering",
    timezone: "UTC+2 / UTC+3 — same as SAST / 1 hour ahead",
    localCurrency: "ILS",
    localPriceNote: "From the equivalent of ~₪25/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "spain",
    name: "Spain",
    flag: "🇪🇸",
    iso2: "ES",
    preferredCanonicalLocale: "en-za",
    cities: ["Madrid", "Barcelona", "Valencia"],
    edgeRegion: "Madrid (MAD-1)",
    timezone: "UTC+1 / UTC+2 — same as / 1 hour behind SAST",
    localCurrency: "EUR",
    localPriceNote: "From the equivalent of ~€6/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    slug: "thailand",
    name: "Thailand",
    flag: "🇹🇭",
    iso2: "TH",
    preferredCanonicalLocale: "en-za",
    cities: ["Bangkok", "Chiang Mai", "Phuket"],
    edgeRegion: "Singapore (SIN-1)",
    timezone: "UTC+7 — 5 hours ahead of SAST",
    localCurrency: "THB",
    localPriceNote: "From the equivalent of ~฿200/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
  {
    // Tasmania-style note: France isn't a major SA diaspora destination by
    // headcount, but the SA Francophone-adjacent community + retirees in
    // Provence keep the route relevant.
    slug: "france",
    name: "France",
    flag: "🇫🇷",
    iso2: "FR",
    preferredCanonicalLocale: "fr",
    cities: ["Paris", "Lyon", "Marseille"],
    edgeRegion: "Paris (CDG-1) and Frankfurt (FRA-1)",
    timezone: "UTC+1 / UTC+2 — same as / 1 hour behind SAST",
    localCurrency: "EUR",
    localPriceNote: "From the equivalent of ~€6/month in ZAR (TO_FILL_BY_OWNER for live FX)",
  },
];

export function getSaAbroadCountry(slug: string): SaAbroadCountry | undefined {
  return SA_ABROAD_COUNTRIES.find((c) => c.slug === slug);
}

export const SA_ABROAD_SLUGS = SA_ABROAD_COUNTRIES.map((c) => c.slug);
