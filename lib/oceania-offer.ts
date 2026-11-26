export const OCEANIA_MARKETS = {
  "en-au": { country: "Australia", countryCode: "AU", slug: "australia" },
  "en-nz": { country: "New Zealand", countryCode: "NZ", slug: "new-zealand" },
} as const;

export type OceaniaMarket = keyof typeof OCEANIA_MARKETS;

export function isOceaniaMarket(locale: string): locale is OceaniaMarket {
  return Object.prototype.hasOwnProperty.call(OCEANIA_MARKETS, locale);
}

export const OCEANIA_PLANS = [
  {
    id: "day",
    name: "Day pass",
    usd: 5,
    description: "24 hours of paid access. Choose the day you want to watch.",
    action: "Ask for the day pass",
  },
  {
    id: "month",
    name: "One month",
    usd: 15,
    description: "One prepaid month. Confirm your device and programme before you pay.",
    action: "Choose one month",
  },
  {
    id: "year",
    name: "One year",
    usd: 65,
    description: "One upfront payment for 12 months. Ask us to confirm the programmes you want.",
    action: "Choose one year",
  },
] as const;
