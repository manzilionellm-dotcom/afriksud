// lib/seo/sadc-countries.ts
// Data for the /[locale]/sadc/[country] programmatic pages.
//
// Each country drives one generated page. Pricing in USD is intentional —
// most SADC markets quote IPTV in dollars (EcoCash USD, M-Pesa USD top-ups)
// even when ZAR or local currency is available, so the USD line is the
// least-friction headline. Local-currency parity prices are noted in copy.

export type SadcCountry = {
  slug: string;
  name: string;
  flag: string;
  /** ISO-3166 alpha-2 used for geo and schema. */
  iso2: string;
  /** Phone country code (no `+`) — used for WhatsApp wa.me link. */
  phoneCc: string;
  /** Local capital + 2-3 biggest cities, in order of population. */
  cities: string[];
  /** Local broadcasters worth promoting in the channel list. */
  localChannels: string[];
  /** Locally available ISPs. */
  isps: string[];
  /** Accepted local payment methods. */
  payments: string[];
  /** Headline currency for hero pricing block. */
  currency: { code: string; symbol: string; usdParityNote?: string };
  /** Pricing tiers in headline currency. */
  pricing: { months: number; price: string; tag?: string }[];
  /** Hero H1 and one-line intro. */
  hero: { h1: string; lead: string };
  /** SEO meta. */
  meta: { title: string; description: string };
  /** Local DStv-Africa pricing reference, used in the comparison block. */
  dstvNote: string;
  /** Env var key for the country-specific WhatsApp number. */
  whatsappEnvKey: string;
};

export const SADC_COUNTRIES: SadcCountry[] = [
  {
    slug: "zimbabwe",
    name: "Zimbabwe",
    flag: "🇿🇼",
    iso2: "ZW",
    phoneCc: "263",
    cities: [
      "Harare",
      "Bulawayo",
      "Chitungwiza",
      "Mutare",
      "Gweru",
      "Kwekwe",
      "Kadoma",
      "Masvingo",
      "Victoria Falls",
    ],
    localChannels: [
      "ZBC TV",
      "ZBC News",
      "ZTV",
      "Star FM TV",
      "ZiFM Stereo TV",
      "3KTV",
      "NRTV",
    ],
    isps: ["Liquid Home", "ZOL Fibroniks", "TelOne", "Utande", "Econet 4G/5G", "NetOne"],
    payments: [
      "EcoCash",
      "OneMoney",
      "ZIPIT",
      "Innbucks",
      "Mukuru",
      "USD cash",
      "Visa",
      "Mastercard",
      "PayPal",
      "Bitcoin",
    ],
    currency: { code: "USD", symbol: "US$", usdParityNote: "ZWG accepted at bond rate" },
    pricing: [
      { months: 1, price: "US$11" },
      { months: 3, price: "US$25", tag: "Most popular" },
      { months: 6, price: "US$39" },
      { months: 12, price: "US$66", tag: "Best value" },
    ],
    hero: {
      h1: "Best IPTV Zimbabwe 2026 — DStv channels, SuperSport & 20,000+ live in 4K",
      lead: "Pay in USD, EcoCash, OneMoney, ZIPIT or Innbucks. Get every SuperSport feed, the full DStv Africa line-up, ZBC TV and 20,000+ international channels in 4K — without a decoder, dish or 24-month contract. Activated on WhatsApp in 10 minutes.",
    },
    meta: {
      title: "IPTV Zimbabwe 2026 — DStv Alternative, SuperSport in 4K",
      description: "Stream 20,000+ live channels in Zimbabwe — DStv, SuperSport, ZBC TV in 4K. Pay in USD or EcoCash. From US$11/mo, no decoder, no contract.",
    },
    dstvNote: "DStv Premium Africa runs US$96/mo in Zimbabwe — Mzansi Stream covers the same sport and channel mix for a fraction of that.",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_ZW",
  },
  {
    slug: "botswana",
    name: "Botswana",
    flag: "🇧🇼",
    iso2: "BW",
    phoneCc: "267",
    cities: ["Gaborone", "Francistown", "Maun", "Lobatse", "Kanye", "Serowe", "Mahalapye"],
    localChannels: ["BTV+", "Botswana Television"],
    isps: ["BTC Fibre", "BoFiNet", "Mascom 5G", "Orange Botswana"],
    payments: ["Mascom MyZaka", "Orange Money BW", "Visa", "Mastercard", "PayPal", "Bitcoin", "USD"],
    currency: { code: "BWP", symbol: "P", usdParityNote: "USD accepted at parity" },
    pricing: [
      { months: 1, price: "P150" },
      { months: 3, price: "P340", tag: "Most popular" },
      { months: 6, price: "P530" },
      { months: 12, price: "P900", tag: "Best value" },
    ],
    hero: {
      h1: "Best IPTV Botswana 2026 — SuperSport, DStv channels & 20,000+ live",
      lead: "Stream every SuperSport feed, the full DStv Africa line-up, BTV+ and 20,000+ international channels in 4K. Pay with MyZaka, Orange Money, USD or card. Activated in 10 minutes — no decoder, no contract.",
    },
    meta: {
      title: "IPTV Botswana 2026 — DStv Alternative, SuperSport 4K",
      description: "Best IPTV Botswana — 20,000+ channels, SuperSport in 4K, BTV+ and DStv coverage. MyZaka, Orange Money, USD. From P150/mo, no decoder.",
    },
    dstvNote: "DStv Compact+ Botswana retails north of P900/mo — Mzansi Stream starts at P150.",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_BW",
  },
  {
    slug: "namibia",
    name: "Namibia",
    flag: "🇳🇦",
    iso2: "NA",
    phoneCc: "264",
    cities: ["Windhoek", "Walvis Bay", "Swakopmund", "Oshakati", "Rundu", "Katima Mulilo"],
    localChannels: ["NBC TV", "One Africa TV"],
    isps: ["MTC", "Telecom Namibia", "Paratus", "Powercom"],
    payments: ["EFT NAD", "ZAR direct (parity)", "Visa", "Mastercard", "PayPal", "USD"],
    currency: { code: "NAD", symbol: "N$", usdParityNote: "NAD pegged to ZAR — ZAR accepted at par" },
    pricing: [
      { months: 1, price: "N$199" },
      { months: 3, price: "N$449", tag: "Most popular" },
      { months: 6, price: "N$699" },
      { months: 12, price: "N$1199", tag: "Best value" },
    ],
    hero: {
      h1: "Best IPTV Namibia 2026 — DStv alternative, SuperSport, NBC TV in 4K",
      lead: "20,000+ live channels in 4K including every SuperSport feed, NBC TV, kykNET and the full SABC line-up. Pay in NAD, ZAR (parity) or USD. Activated on WhatsApp in 10 minutes — no decoder, no contract.",
    },
    meta: {
      title: "IPTV Namibia 2026 — DStv Alternative, SuperSport 4K",
      description: "Stream 20,000+ channels in Namibia — SuperSport, NBC TV, kykNET, SABC in 4K. Pay in NAD, ZAR or USD. From N$199/mo, no decoder.",
    },
    dstvNote: "DStv Premium Namibia is over N$1,000/mo — Mzansi Stream delivers the same sport in 4K from N$199.",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_NA",
  },
  {
    slug: "mozambique",
    name: "Moçambique",
    flag: "🇲🇿",
    iso2: "MZ",
    phoneCc: "258",
    cities: ["Maputo", "Matola", "Beira", "Nampula", "Chimoio", "Quelimane"],
    localChannels: ["TVM", "RTP África", "SIC", "TVI", "STV"],
    isps: ["TDM Fibra", "TMcel", "Vodacom Moçambique", "Movitel"],
    payments: ["M-Pesa Moçambique", "mKesh", "USD", "Visa", "Mastercard", "PayPal"],
    currency: { code: "MZN", symbol: "MT", usdParityNote: "USD aceite ao câmbio do dia" },
    pricing: [
      { months: 1, price: "700 MT" },
      { months: 3, price: "1.580 MT", tag: "Mais popular" },
      { months: 6, price: "2.450 MT" },
      { months: 12, price: "4.200 MT", tag: "Melhor valor" },
    ],
    hero: {
      h1: "Melhor IPTV Moçambique 2026 — DStv, SuperSport, 20.000+ canais em 4K",
      lead: "20.000+ canais em 4K nativo, futebol ao vivo sem cortes, filmes e séries em segundos. SuperSport, Premier League, TVM, RTP África, SIC — tudo num só pacote. Pague com M-Pesa, mKesh, USD ou cartão. Sem fidelização, sem descodificador.",
    },
    meta: {
      title: "IPTV Moçambique 2026 — Alternativa DStv em 4K",
      description: "Stream 20.000+ canais em Moçambique — DStv, SuperSport, TVM em 4K. Pague com M-Pesa, mKesh ou USD. Desde 700 MT/mês.",
    },
    dstvNote: "DStv Compact+ Moçambique custa cerca de 4.000 MT/mês — Mzansi Stream parte de 700 MT.",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_MZ",
  },
  {
    slug: "lesotho",
    name: "Lesotho",
    flag: "🇱🇸",
    iso2: "LS",
    phoneCc: "266",
    cities: ["Maseru", "Teyateyaneng", "Mafeteng", "Hlotse", "Mohale's Hoek"],
    localChannels: ["LTV"],
    isps: ["Vodacom Lesotho", "Econet Telecom Lesotho"],
    payments: ["M-Pesa Lesotho", "EcoCash Lesotho", "ZAR direct (parity)", "Visa", "Mastercard"],
    currency: { code: "LSL", symbol: "M", usdParityNote: "LSL = ZAR parity" },
    pricing: [
      { months: 1, price: "M199" },
      { months: 3, price: "M449", tag: "Most popular" },
      { months: 6, price: "M699" },
      { months: 12, price: "M1199", tag: "Best value" },
    ],
    hero: {
      h1: "Best IPTV Lesotho 2026 — SuperSport, kykNET, SABC in 4K",
      lead: "20,000+ live channels in 4K — SuperSport PSL, Premier League, kykNET, SABC and LTV. Pay in LSL, ZAR (parity), or via M-Pesa and EcoCash. Activated in 10 minutes on WhatsApp.",
    },
    meta: {
      title: "IPTV Lesotho 2026 — DStv Alternative, SuperSport 4K",
      description: "Best IPTV Lesotho — 20,000+ channels, SuperSport, SABC, LTV in 4K. Pay with M-Pesa, EcoCash or ZAR. From M199/mo.",
    },
    dstvNote: "DStv Premium in Lesotho retails for over M1,000/mo — Mzansi Stream covers the same sport from M199.",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_LS",
  },
  {
    slug: "eswatini",
    name: "Eswatini",
    flag: "🇸🇿",
    iso2: "SZ",
    phoneCc: "268",
    cities: ["Mbabane", "Manzini", "Lobamba", "Big Bend"],
    localChannels: ["Eswatini TV", "Channel S"],
    isps: ["MTN Eswatini", "Eswatini Mobile", "EPTC"],
    payments: ["MTN MoMo Eswatini", "EFT", "ZAR direct (parity)", "Visa", "Mastercard"],
    currency: { code: "SZL", symbol: "E", usdParityNote: "SZL = ZAR parity" },
    pricing: [
      { months: 1, price: "E199" },
      { months: 3, price: "E449", tag: "Most popular" },
      { months: 6, price: "E699" },
      { months: 12, price: "E1199", tag: "Best value" },
    ],
    hero: {
      h1: "Best IPTV Eswatini 2026 — SuperSport, kykNET, SABC in 4K",
      lead: "20,000+ live channels in 4K — every SuperSport feed, the PSL, Premier League, kykNET, SABC and Eswatini TV. Pay with MTN MoMo, EFT or ZAR. Activated in 10 minutes on WhatsApp.",
    },
    meta: {
      title: "IPTV Eswatini 2026 — DStv Alternative, SuperSport 4K",
      description: "Best IPTV Eswatini — 20,000+ channels, SuperSport, Eswatini TV, SABC in 4K. MTN MoMo, ZAR. From E199/mo.",
    },
    dstvNote: "DStv Premium Eswatini exceeds E1,000/mo — Mzansi Stream delivers the same channels from E199.",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_SZ",
  },
  {
    slug: "zambia",
    name: "Zambia",
    flag: "🇿🇲",
    iso2: "ZM",
    phoneCc: "260",
    cities: ["Lusaka", "Kitwe", "Ndola", "Kabwe", "Chingola", "Livingstone"],
    localChannels: ["ZNBC TV1", "ZNBC TV2", "ZNBC TV3", "MUVI TV", "Diamond TV"],
    isps: ["MTN Zambia", "Airtel Zambia", "Zamtel", "Liquid Zambia"],
    payments: ["MTN MoMo Zambia", "Airtel Money", "ZICTA", "USD", "Visa", "Mastercard"],
    currency: { code: "ZMW", symbol: "K", usdParityNote: "USD welcome" },
    pricing: [
      { months: 1, price: "K260" },
      { months: 3, price: "K590", tag: "Most popular" },
      { months: 6, price: "K920" },
      { months: 12, price: "K1,560", tag: "Best value" },
    ],
    hero: {
      h1: "Best IPTV Zambia 2026 — SuperSport, ZNBC, 20,000+ channels in 4K",
      lead: "20,000+ live channels in 4K — every SuperSport feed, ZNBC TV1/TV2/TV3, MUVI TV and the DStv Africa line-up. Pay with MTN MoMo, Airtel Money or USD. Activated in 10 minutes on WhatsApp.",
    },
    meta: {
      title: "IPTV Zambia 2026 — DStv Alternative, SuperSport 4K",
      description: "Best IPTV Zambia — 20,000+ channels, SuperSport, ZNBC in 4K. MTN MoMo, Airtel Money, USD. From K260/mo, no decoder.",
    },
    dstvNote: "DStv Premium Zambia is well over K1,500/mo — Mzansi Stream from K260.",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_ZM",
  },
  {
    slug: "malawi",
    name: "Malawi",
    flag: "🇲🇼",
    iso2: "MW",
    phoneCc: "265",
    cities: ["Lilongwe", "Blantyre", "Mzuzu", "Zomba"],
    localChannels: ["MBC", "Times TV", "Zodiak TV"],
    isps: ["TNM", "Airtel Malawi", "Access Communications"],
    payments: ["TNM Mpamba", "Airtel Money Malawi", "USD", "Visa", "Mastercard"],
    currency: { code: "MWK", symbol: "MK", usdParityNote: "USD welcome" },
    pricing: [
      { months: 1, price: "MK19,000" },
      { months: 3, price: "MK43,000", tag: "Most popular" },
      { months: 6, price: "MK66,000" },
      { months: 12, price: "MK112,000", tag: "Best value" },
    ],
    hero: {
      h1: "Best IPTV Malawi 2026 — SuperSport, MBC, Times TV in 4K",
      lead: "20,000+ live channels in 4K — every SuperSport feed, MBC, Times TV, Zodiak TV and the DStv Africa line-up. Pay with TNM Mpamba, Airtel Money or USD. Activated in 10 minutes on WhatsApp.",
    },
    meta: {
      title: "IPTV Malawi 2026 — DStv Alternative, SuperSport 4K",
      description: "Best IPTV Malawi — 20,000+ channels, SuperSport, MBC, Times TV in 4K. TNM Mpamba, Airtel Money, USD. From MK19,000/mo.",
    },
    dstvNote: "DStv Premium Malawi is over MK100,000/mo — Mzansi Stream from MK19,000.",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_MW",
  },
];

export function getSadcCountry(slug: string): SadcCountry | undefined {
  return SADC_COUNTRIES.find((c) => c.slug === slug);
}

export const SADC_SLUGS = SADC_COUNTRIES.map((c) => c.slug);
