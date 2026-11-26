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
  /** Time-zone summary for the "watch on SA time" angle. */
  timezone: string;
  /** Local currency code for the pricing block. ZAR is always shown. */
  localCurrency: string;
};

export const SA_ABROAD_COUNTRIES: SaAbroadCountry[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    iso2: "GB",
    preferredCanonicalLocale: "en-gb",
    cities: ["London", "Manchester", "Birmingham"],
    timezone: "UTC / UTC+1 BST — 1-2 hours behind SAST",
    localCurrency: "GBP",
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    iso2: "AU",
    preferredCanonicalLocale: "en-au",
    cities: ["Sydney", "Melbourne", "Perth"],
    timezone: "Perth is six hours ahead of South Africa. Sydney and Melbourne are eight hours ahead in standard time and nine hours ahead during daylight saving",
    localCurrency: "AUD",
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    iso2: "NZ",
    preferredCanonicalLocale: "en-nz",
    cities: ["Auckland", "Wellington", "Christchurch"],
    timezone: "Auckland, Wellington and Christchurch are 10 hours ahead of South Africa on NZST and 11 hours ahead on NZDT",
    localCurrency: "NZD",
  },
  {
    slug: "usa",
    name: "United States",
    flag: "🇺🇸",
    iso2: "US",
    preferredCanonicalLocale: "en-us",
    cities: ["New York", "Los Angeles", "Houston"],
    timezone: "New York, Houston and Los Angeles follow different US time zones. Select your city and the event date in your calendar",
    localCurrency: "USD",
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
    timezone: "Toronto, Calgary and Vancouver follow different local clocks. Select your city and the event date in your calendar",
    localCurrency: "CAD",
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    iso2: "AE",
    preferredCanonicalLocale: "en-ae",
    cities: ["Dubai", "Abu Dhabi", "Sharjah"],
    timezone: "UTC+4 — 2 hours ahead of SAST",
    localCurrency: "AED",
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
    timezone: "UTC+1 / UTC+2 — same as / 1 hour behind SAST",
    localCurrency: "EUR",
  },
  {
    slug: "ireland",
    name: "Ireland",
    flag: "🇮🇪",
    iso2: "IE",
    preferredCanonicalLocale: "en-gb",
    cities: ["Dublin", "Cork", "Galway"],
    timezone: "UTC / UTC+1 IST — 1-2 hours behind SAST",
    localCurrency: "EUR",
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    flag: "🇳🇱",
    iso2: "NL",
    preferredCanonicalLocale: "en-za",
    cities: ["Amsterdam", "Rotterdam", "The Hague"],
    timezone: "UTC+1 / UTC+2 — same as / 1 hour behind SAST",
    localCurrency: "EUR",
  },
  {
    slug: "belgium",
    name: "Belgium",
    flag: "🇧🇪",
    iso2: "BE",
    // Page body is English. `fr` is noindex on programmatic routes, so
    // the indexable canonical is en-za. À CONFIRMER if a French body lands.
    preferredCanonicalLocale: "en-za",
    cities: ["Brussels", "Antwerp", "Ghent"],
    timezone: "UTC+1 / UTC+2 — same as / 1 hour behind SAST",
    localCurrency: "EUR",
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    flag: "🇨🇭",
    iso2: "CH",
    // Page body is English. `fr` is noindex on programmatic routes.
    // À CONFIRMER if a French body lands.
    preferredCanonicalLocale: "en-za",
    cities: ["Zurich", "Geneva", "Basel"],
    timezone: "UTC+1 / UTC+2 — same as / 1 hour behind SAST",
    localCurrency: "CHF",
  },
  {
    slug: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    iso2: "SG",
    preferredCanonicalLocale: "en-za",
    cities: ["Singapore"],
    timezone: "UTC+8 — 6 hours ahead of SAST",
    localCurrency: "SGD",
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    iso2: "SA",
    preferredCanonicalLocale: "en-ae",
    cities: ["Riyadh", "Jeddah", "Dammam"],
    timezone: "UTC+3 — 1 hour ahead of SAST",
    localCurrency: "SAR",
  },
  {
    slug: "qatar",
    name: "Qatar",
    flag: "🇶🇦",
    iso2: "QA",
    preferredCanonicalLocale: "en-ae",
    cities: ["Doha", "Al Rayyan", "Al Wakrah"],
    timezone: "UTC+3 — 1 hour ahead of SAST",
    localCurrency: "QAR",
  },
  {
    slug: "mauritius",
    name: "Mauritius",
    flag: "🇲🇺",
    iso2: "MU",
    preferredCanonicalLocale: "en-za",
    cities: ["Port Louis", "Curepipe", "Quatre Bornes"],
    timezone: "UTC+4 — 2 hours ahead of SAST",
    localCurrency: "MUR",
  },
  {
    slug: "portugal",
    name: "Portugal",
    flag: "🇵🇹",
    iso2: "PT",
    // Body is English. pt-mz is noindex on programmatic routes, so the
    // indexable canonical is en-za. À CONFIRMER if a Portuguese body lands.
    preferredCanonicalLocale: "en-za",
    cities: ["Lisbon", "Porto", "Funchal"],
    timezone: "UTC / UTC+1 — 1-2 hours behind SAST",
    localCurrency: "EUR",
  },
  {
    slug: "israel",
    name: "Israel",
    flag: "🇮🇱",
    iso2: "IL",
    preferredCanonicalLocale: "en-za",
    cities: ["Tel Aviv", "Jerusalem", "Haifa"],
    timezone: "UTC+2 / UTC+3 — same as SAST / 1 hour ahead",
    localCurrency: "ILS",
  },
  {
    slug: "spain",
    name: "Spain",
    flag: "🇪🇸",
    iso2: "ES",
    preferredCanonicalLocale: "en-za",
    cities: ["Madrid", "Barcelona", "Valencia"],
    timezone: "UTC+1 / UTC+2 — same as / 1 hour behind SAST",
    localCurrency: "EUR",
  },
  {
    slug: "thailand",
    name: "Thailand",
    flag: "🇹🇭",
    iso2: "TH",
    preferredCanonicalLocale: "en-za",
    cities: ["Bangkok", "Chiang Mai", "Phuket"],
    timezone: "UTC+7 — 5 hours ahead of SAST",
    localCurrency: "THB",
  },
  {
    // Tasmania-style note: France isn't a major SA diaspora destination by
    // headcount, but the SA Francophone-adjacent community + retirees in
    // Provence keep the route relevant.
    slug: "france",
    name: "France",
    flag: "🇫🇷",
    iso2: "FR",
    // Page body is English. `fr` is noindex on programmatic routes.
    // À CONFIRMER if a French body lands.
    preferredCanonicalLocale: "en-za",
    cities: ["Paris", "Lyon", "Marseille"],
    timezone: "UTC+1 / UTC+2 — same as / 1 hour behind SAST",
    localCurrency: "EUR",
  },
];

export function getSaAbroadCountry(slug: string): SaAbroadCountry | undefined {
  return SA_ABROAD_COUNTRIES.find((c) => c.slug === slug);
}

export function saAbroadPath(country: SaAbroadCountry): string {
  return `/${country.preferredCanonicalLocale}/sa-abroad/${country.slug}`;
}

export function saAbroadPlace(country: SaAbroadCountry): string {
  return ["uk", "usa", "uae", "netherlands"].includes(country.slug) ? `the ${country.name}` : country.name;
}

export function saAbroadFaq(data: SaAbroadCountry): { q: string; a: string }[] {
  const place = saAbroadPlace(data);
  return [
    {
      q: `Where can I find a specific South African programme in ${place}?`,
      a: "Search the local broadcaster’s schedule for the programme or event, date and viewing country. For news and radio, SABC+ lists the services it makes available internationally.",
    },
    {
      q: `How do I check the local start time in ${place}?`,
      a: `${data.timezone}. Check whether the event listing is already shown in your device’s local time before converting it.`,
    },
    {
      q: `Can I try Mzansi Stream in ${data.name} before paying?`,
      a: `Request a free 24-hour trial on WhatsApp. Give your city and the exact model of the device you plan to use. Support can confirm what you can test from your location. No payment card is required.`,
    },
    {
      q: `What currency will I pay in?`,
      a: `The published plans are priced in South African rand. If you pay from an account in ${data.localCurrency}, confirm the payment currency, total and any bank conversion charges before you authorise payment.`,
    },
  ];
}

export const SA_ABROAD_SLUGS = SA_ABROAD_COUNTRIES.map((c) => c.slug);
