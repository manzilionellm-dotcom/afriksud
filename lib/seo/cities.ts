// lib/seo/cities.ts
// Data for /[locale]/cities/[city] programmatic pages.

export type SACity = {
  slug: string;
  name: string;
  region: string;
  /** Approx metro population, formatted for prose. */
  population: string;
  /** Suburbs / neighbourhoods to mention in the hero. */
  suburbs: string[];
  /** Fibre / wireless ISPs known to work well. */
  isps: string[];
  /** Local PSL / rugby clubs to anchor the sport angle. */
  teams: { sport: string; clubs: string[] }[];
  /** One-sentence value prop for the hero lead. */
  hook: string;
};

export const SA_CITIES: SACity[] = [
  {
    slug: "johannesburg",
    name: "Johannesburg",
    region: "Gauteng",
    population: "~5.6M metro",
    suburbs: ["Sandton", "Soweto", "Randburg", "Roodepoort", "Midrand", "Fourways"],
    isps: ["Vumatel", "Openserve", "Frogfoot", "MTN Fibre", "Vodacom Fibre", "Rain 5G"],
    teams: [
      { sport: "PSL", clubs: ["Kaizer Chiefs", "Orlando Pirates"] },
      { sport: "URC / Currie Cup", clubs: ["Lions"] },
    ],
    hook: "Drop DStv Premium and keep every SuperSport feed in 4K — covering every Sundowns, Chiefs, Pirates and Lions fixture.",
  },
  {
    slug: "cape-town",
    name: "Cape Town",
    region: "Western Cape",
    population: "~4.7M metro",
    suburbs: ["Northern Suburbs", "Southern Suburbs", "Sea Point", "Stellenbosch", "Bellville"],
    isps: ["Vumatel", "Openserve", "Frogfoot", "Octotel", "MetroFibre", "Rain 5G"],
    teams: [
      { sport: "PSL", clubs: ["Cape Town City"] },
      { sport: "URC", clubs: ["DHL Stormers"] },
    ],
    hook: "Watch every Stormers URC fixture and Cape Town City PSL game in 4K, on Vumatel, Openserve, Frogfoot or Octotel.",
  },
  {
    slug: "durban",
    name: "Durban",
    region: "KwaZulu-Natal",
    population: "~3.9M metro",
    suburbs: ["Durban North", "Umhlanga", "Ballito", "Pinetown", "Chatsworth"],
    isps: ["Vumatel", "Openserve", "Frogfoot", "MTN Fibre", "Rain 5G"],
    teams: [
      { sport: "PSL", clubs: ["AmaZulu FC", "Royal AM"] },
      { sport: "URC", clubs: ["Hollywoodbets Sharks"] },
    ],
    hook: "Sharks rugby, AmaZulu matches, kykNET, Mzansi Magic and 20,000+ channels — installed in 10 minutes on Vumatel or Openserve.",
  },
  {
    slug: "pretoria",
    name: "Pretoria",
    region: "Gauteng",
    population: "~2.9M metro",
    suburbs: ["Pretoria East", "Centurion", "Midrand", "Hatfield", "Menlyn"],
    isps: ["Vumatel", "Openserve", "Frogfoot", "MTN Fibre", "Vodacom Fibre"],
    teams: [
      { sport: "PSL", clubs: ["Mamelodi Sundowns", "SuperSport United"] },
      { sport: "URC", clubs: ["Vodacom Bulls"] },
    ],
    hook: "Every Sundowns, SuperSport United and Bulls match in 4K — plus kykNET drama in HD and full SABC + e.tv pack.",
  },
  {
    slug: "gqeberha",
    name: "Gqeberha (Port Elizabeth)",
    region: "Eastern Cape",
    population: "~1.3M metro",
    suburbs: ["Walmer", "Summerstrand", "Newton Park", "Despatch"],
    isps: ["Vumatel", "Openserve", "Frogfoot", "Rain 5G"],
    teams: [
      { sport: "PSL", clubs: ["Chippa United"] },
      { sport: "URC", clubs: ["EP Elephants"] },
    ],
    hook: "Reliable IPTV across Walmer and Summerstrand — Chippa, EP Elephants and the full SuperSport line-up in 4K.",
  },
  {
    slug: "bloemfontein",
    name: "Bloemfontein",
    region: "Free State",
    population: "~750k metro",
    suburbs: ["Brandwag", "Universitas", "Heuwelsig", "Langenhoven Park"],
    isps: ["Vumatel", "Openserve", "Frogfoot", "MTN Fibre"],
    teams: [
      { sport: "PSL / first division", clubs: ["Bloemfontein Celtic legacy fans"] },
      { sport: "URC / Currie Cup", clubs: ["Toyota Cheetahs"] },
    ],
    hook: "Watch every Cheetahs match, the full SuperSport rugby pack and kykNET drama in 4K — installed on Vumatel or Openserve in minutes.",
  },
  {
    slug: "east-london",
    name: "East London",
    region: "Eastern Cape",
    population: "~480k metro",
    suburbs: ["Vincent", "Beacon Bay", "Gonubie", "Mdantsane"],
    isps: ["Vumatel", "Openserve", "Frogfoot", "Rain 5G"],
    teams: [{ sport: "PSL", clubs: ["Buffalo City clubs"] }],
    hook: "Stable streaming in East London — every PSL match, Premier League and Springbok Test in 4K with no buffering.",
  },
  {
    slug: "polokwane",
    name: "Polokwane",
    region: "Limpopo",
    population: "~800k metro",
    suburbs: ["Bendor", "Fauna Park", "Westenburg", "Seshego"],
    isps: ["Vumatel", "Openserve", "MTN Fibre", "Rain 5G"],
    teams: [{ sport: "PSL", clubs: ["Polokwane City", "Black Leopards legacy"] }],
    hook: "SuperSport PSL, kykNET drama, SABC and Limpopo-friendly streaming across Polokwane on every major fibre network.",
  },
  {
    slug: "nelspruit",
    name: "Nelspruit / Mbombela",
    region: "Mpumalanga",
    population: "~700k metro",
    suburbs: ["Sonheuwel", "West Acres", "Riverside", "White River"],
    isps: ["Vumatel", "Openserve", "Frogfoot", "MTN Fibre"],
    teams: [{ sport: "PSL", clubs: ["TS Galaxy"] }],
    hook: "TS Galaxy fixtures, every PSL match-day and 20,000+ channels in 4K — installed on WhatsApp in 10 minutes.",
  },
  {
    slug: "rustenburg",
    name: "Rustenburg",
    region: "North West",
    population: "~600k metro",
    suburbs: ["Cashan", "Safari Gardens", "Geelhoutpark", "Tlhabane"],
    isps: ["Openserve", "MTN Fibre", "Rain 5G"],
    teams: [{ sport: "PSL", clubs: ["Platinum Stars legacy"] }],
    hook: "Mining-town households cancelling DStv — get every SuperSport feed, Premier League and kykNET in 4K from R99/mo.",
  },
  {
    slug: "pietermaritzburg",
    name: "Pietermaritzburg",
    region: "KwaZulu-Natal",
    population: "~750k metro",
    suburbs: ["Hilton", "Scottsville", "Hayfields", "Lincoln Meade"],
    isps: ["Vumatel", "Openserve", "Frogfoot"],
    teams: [{ sport: "URC", clubs: ["Sharks (Hollywoodbets — KZN home)"] }],
    hook: "Watch the Sharks live in 4K from Maritzburg — plus the full SABC, kykNET and Mzansi Magic line-up.",
  },
  {
    slug: "stellenbosch",
    name: "Stellenbosch",
    region: "Western Cape",
    population: "~200k metro",
    suburbs: ["Die Boord", "Brandwacht", "Welgevonden", "Idas Valley"],
    isps: ["Vumatel", "Openserve", "Frogfoot", "Octotel"],
    teams: [{ sport: "PSL", clubs: ["Stellenbosch FC"] }],
    hook: "Stellenbosch FC, every Stormers URC match and kykNET drama in 4K — installed on WhatsApp in 10 minutes.",
  },
];

export function getSACity(slug: string): SACity | undefined {
  return SA_CITIES.find((c) => c.slug === slug);
}

export const SA_CITY_SLUGS = SA_CITIES.map((c) => c.slug);
