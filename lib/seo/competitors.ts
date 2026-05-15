// lib/seo/competitors.ts
// Data for /[locale]/vs/[competitor] programmatic pages.

export type Competitor = {
  slug: string;
  name: string;
  priceMonthly: string;
  priceYearly?: string;
  /** Row data for the comparison table: feature → competitor value. */
  features: { label: string; them: string; us: string }[];
  /** The one or two things this competitor genuinely does well — credibility builds trust. */
  theirStrengths: string[];
  /** Where Mzansi Stream specifically beats them. */
  ourEdge: string[];
  meta: { title: string; description: string };
  /** Short hero hook. */
  hook: string;
};

export const COMPETITORS: Competitor[] = [
  {
    slug: "dstv-premium",
    name: "DStv Premium",
    priceMonthly: "R899",
    priceYearly: "R10,788",
    features: [
      { label: "Live channels", them: "~180", us: "20,000+" },
      { label: "SuperSport PSL", them: "Included", us: "Included" },
      { label: "Premier League", them: "Included", us: "Included" },
      { label: "URC / Currie Cup", them: "Included", us: "Included" },
      { label: "4K UHD", them: "Limited", us: "All plans" },
      { label: "Contract", them: "24-month", us: "None" },
      { label: "Decoder", them: "R1,500+ upfront", us: "None" },
      { label: "Support", them: "Phone IVR", us: "Direct WhatsApp" },
      { label: "Free trial", them: "None", us: "24h, no card" },
      { label: "Monthly price", them: "R899", us: "from R99" },
    ],
    theirStrengths: [
      "Long-established brand and infrastructure",
      "DStv Now app for tablet / phone viewing on the same subscription",
    ],
    ourEdge: [
      "Save R800+/month vs. DStv Premium — over R9,500 a year",
      "No 24-month contract, no decoder, no installer fee",
      "Every SuperSport feed in 4K on every plan, not just the top tier",
      "Activated in 10 minutes on WhatsApp instead of an installer visit",
    ],
    meta: {
      title: "Mzansi Stream vs DStv Premium — Save R800+/mo",
      description: "DStv Premium vs Mzansi Stream — same SuperSport, PSL, Premier League and kykNET in 4K, from R99/mo with no contract and no decoder.",
    },
    hook: "DStv Premium runs R899/month with a 24-month contract and a R1,500 decoder. Mzansi Stream covers the same channels in 4K from R99/month, with no contract and no decoder.",
  },
  {
    slug: "dstv-compact-plus",
    name: "DStv Compact Plus",
    priceMonthly: "R549",
    priceYearly: "R6,588",
    features: [
      { label: "Live channels", them: "~150", us: "20,000+" },
      { label: "SuperSport PSL", them: "Included", us: "Included" },
      { label: "Premier League", them: "Partial", us: "Full" },
      { label: "URC / Currie Cup", them: "Partial", us: "Full" },
      { label: "4K UHD", them: "Not available", us: "All plans" },
      { label: "Contract", them: "24-month", us: "None" },
      { label: "Decoder", them: "Required", us: "None" },
      { label: "Support", them: "Phone IVR", us: "Direct WhatsApp" },
      { label: "Free trial", them: "None", us: "24h, no card" },
      { label: "Monthly price", them: "R549", us: "from R99" },
    ],
    theirStrengths: ["Catch-up TV included", "Decoder doubles as PVR"],
    ourEdge: [
      "Save R450+/month vs Compact Plus",
      "Get full URC, Currie Cup and Premier League — not the partial Compact Plus selection",
      "Watch in 4K — Compact Plus is HD only",
      "No 24-month contract, no decoder, no installer wait",
    ],
    meta: {
      title: "Mzansi Stream vs DStv Compact Plus — Save R450+/mo",
      description: "DStv Compact Plus vs Mzansi Stream — full sport in 4K, no contract, no decoder. From R99/mo on WhatsApp.",
    },
    hook: "DStv Compact Plus is R549/month for partial sport in HD. Mzansi Stream is R99/month with full sport in 4K.",
  },
  {
    slug: "dstv-compact",
    name: "DStv Compact",
    priceMonthly: "R449",
    priceYearly: "R5,388",
    features: [
      { label: "Live channels", them: "~120", us: "20,000+" },
      { label: "SuperSport PSL", them: "Included", us: "Included" },
      { label: "Premier League", them: "Not included", us: "Full" },
      { label: "URC", them: "Limited", us: "Full" },
      { label: "4K UHD", them: "Not available", us: "All plans" },
      { label: "Contract", them: "24-month", us: "None" },
      { label: "Decoder", them: "Required", us: "None" },
      { label: "Support", them: "Phone IVR", us: "Direct WhatsApp" },
      { label: "Monthly price", them: "R449", us: "from R99" },
    ],
    theirStrengths: ["Entry-level sport coverage", "PVR via decoder"],
    ourEdge: [
      "Save R350+/month vs Compact",
      "Get Premier League — not included on Compact",
      "Full URC and SuperSport variety — not the Compact selection",
      "20,000+ international channels vs. ~120",
    ],
    meta: {
      title: "Mzansi Stream vs DStv Compact — Save R350+/mo",
      description: "DStv Compact vs Mzansi Stream — full sport, Premier League and 4K from R99/mo. No contract, no decoder.",
    },
    hook: "DStv Compact is R449/month and skips the Premier League. Mzansi Stream is R99/month with every match in 4K.",
  },
  {
    slug: "showmax",
    name: "Showmax",
    priceMonthly: "R99",
    features: [
      { label: "Live channels", them: "0", us: "20,000+" },
      { label: "SuperSport PSL live", them: "Pro tier only", us: "Included" },
      { label: "Premier League live", them: "Pro tier only", us: "Included" },
      { label: "Movies & series", them: "Strong catalogue", us: "100,000+ VOD" },
      { label: "4K UHD", them: "Select titles", us: "All plans" },
      { label: "Contract", them: "None", us: "None" },
      { label: "Free trial", them: "14-day", us: "24h, no card" },
      { label: "Monthly price (Entertainment)", them: "R99", us: "R99" },
    ],
    theirStrengths: [
      "Strong original SA dramas and Showmax originals",
      "Tightly integrated MultiChoice payments and EFT options",
    ],
    ourEdge: [
      "Showmax Entertainment has zero live channels — Mzansi Stream has 20,000+",
      "Live SuperSport, PSL and Premier League on every plan (Showmax requires Pro)",
      "100,000+ VOD library on top of live TV — not VOD-only",
      "EPG and live recording, not just on-demand",
    ],
    meta: {
      title: "Mzansi Stream vs Showmax — Live TV vs VOD",
      description: "Showmax is great VOD but has no live TV on Entertainment. Mzansi Stream gives you 20,000+ live channels + 100,000+ VOD from R99/mo.",
    },
    hook: "Showmax Entertainment is R99/month — pure VOD, zero live channels. Mzansi Stream is R99/month with 20,000+ live channels and 100,000+ VOD.",
  },
  {
    slug: "supersport",
    name: "SuperSport Schools / SuperSport stand-alone",
    priceMonthly: "Tied to DStv",
    features: [
      { label: "Stand-alone subscription", them: "Effectively no — bundled with DStv", us: "Yes, no DStv required" },
      { label: "Live PSL", them: "Yes (with DStv tier)", us: "Yes" },
      { label: "Premier League", them: "Yes (Premium tier)", us: "Yes, all plans" },
      { label: "4K UHD", them: "Limited", us: "All plans" },
      { label: "Contract", them: "DStv contract required", us: "None" },
      { label: "Devices", them: "Decoder / DStv app", us: "Any M3U app, Firestick, Smart TV" },
    ],
    theirStrengths: [
      "Official broadcaster — first-party rights",
      "DStv Now / SuperSport app on tablet and phone",
    ],
    ourEdge: [
      "Watch SuperSport without paying for a full DStv subscription",
      "No decoder, no contract, no installer fee",
      "Works on Firestick, Smart TV, MAG Box, TiviMate, IPTV Smarters — anywhere a DStv decoder doesn't reach",
      "Every SuperSport feed in 4K, not just the top channels",
    ],
    meta: {
      title: "Mzansi Stream vs SuperSport — Without DStv",
      description: "Watch every SuperSport feed, PSL and Premier League in 4K without a DStv subscription, decoder or contract. From R99/mo.",
    },
    hook: "SuperSport is locked behind a DStv subscription with a 24-month contract. Mzansi Stream unlocks every SuperSport feed for R99/month, no contract, no decoder.",
  },
  {
    slug: "starsat",
    name: "StarSat",
    priceMonthly: "R199-R399",
    features: [
      { label: "Live channels", them: "~150", us: "20,000+" },
      { label: "Premier League", them: "Partial", us: "Full" },
      { label: "URC / Currie Cup", them: "Limited", us: "Full" },
      { label: "4K UHD", them: "Limited", us: "All plans" },
      { label: "Decoder", them: "Required upfront", us: "None" },
      { label: "Support", them: "Call centre", us: "Direct WhatsApp" },
      { label: "Free trial", them: "None", us: "24h, no card" },
    ],
    theirStrengths: ["Cheaper than DStv", "Bouquet of Asian and African channels"],
    ourEdge: [
      "20,000+ channels vs StarSat's ~150",
      "Every SuperSport feed in 4K — StarSat skips the top sport tier",
      "No decoder, no installer — works on devices you already own",
      "Direct WhatsApp support instead of a call centre",
    ],
    meta: {
      title: "Mzansi Stream vs StarSat — Why People Switch",
      description: "StarSat vs Mzansi Stream — 20,000+ channels, full SuperSport in 4K, no decoder, no contract. From R99/mo on WhatsApp.",
    },
    hook: "StarSat undercuts DStv but still needs a decoder and skips the top sport tier. Mzansi Stream gives you the full sport line-up in 4K from R99 — no decoder.",
  },
  {
    slug: "openview",
    name: "OpenView",
    priceMonthly: "Free (decoder upfront)",
    features: [
      { label: "Live channels", them: "~25", us: "20,000+" },
      { label: "SuperSport PSL", them: "Not included", us: "Included" },
      { label: "Premier League", them: "Not included", us: "Included" },
      { label: "Decoder", them: "R1,000+ upfront", us: "None" },
      { label: "International channels", them: "Limited", us: "50+ countries" },
      { label: "4K", them: "Not supported", us: "All plans" },
    ],
    theirStrengths: ["No monthly fee", "Decent free-to-air SA channel mix"],
    ourEdge: [
      "Add 20,000+ channels and full SuperSport on top of free-to-air",
      "No decoder upfront — watch on devices you already own",
      "Premier League, URC and IPL — none of which OpenView carries",
      "International channels for diaspora households",
    ],
    meta: {
      title: "Mzansi Stream vs OpenView — Add Live Sport",
      description: "OpenView covers free-to-air SA basics. Mzansi Stream adds 20,000+ channels, SuperSport, Premier League in 4K from R99/mo.",
    },
    hook: "OpenView gives you basic SA free-to-air for free — but no sport, no Premier League, no international channels. Mzansi Stream fills every gap for R99/month.",
  },
  {
    slug: "netflix",
    name: "Netflix",
    priceMonthly: "R199 (Standard with ads)",
    features: [
      { label: "Live channels", them: "0", us: "20,000+" },
      { label: "SuperSport", them: "Not included", us: "Included" },
      { label: "Premier League", them: "Not included", us: "Included" },
      { label: "Movies & series", them: "Strong global catalogue", us: "100,000+ VOD" },
      { label: "SA channels (SABC, kykNET)", them: "None", us: "All included" },
      { label: "4K", them: "Premium tier only", us: "All plans" },
    ],
    theirStrengths: ["Best-in-class originals", "Strong global library"],
    ourEdge: [
      "Live TV + sport + news + kids — Netflix is VOD-only",
      "Every SA channel including SABC, e.tv, kykNET, Mzansi Magic",
      "Every SuperSport feed and Premier League match",
      "4K on every plan, not just Premium",
    ],
    meta: {
      title: "Mzansi Stream vs Netflix — Add Live SA TV",
      description: "Netflix is VOD-only. Mzansi Stream adds 20,000+ live channels, SuperSport, SABC and kykNET in 4K from R99/mo.",
    },
    hook: "Netflix is great for series but has no live TV, no sport and no SA channels. Mzansi Stream gives you all three on top of 100,000+ VOD.",
  },
];

export function getCompetitor(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}

export const COMPETITOR_SLUGS = COMPETITORS.map((c) => c.slug);
