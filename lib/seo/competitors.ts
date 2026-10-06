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
      { label: "Live channels", them: "~180", us: "Confirm on WhatsApp" },
      { label: "SuperSport PSL", them: "Included", us: "Folders to confirm" },
      { label: "Premier League", them: "Included", us: "Folders to confirm" },
      { label: "URC / Currie Cup", them: "Included", us: "Folders to confirm" },
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
      "SuperSport-style folders on every plan — matches to confirm on WhatsApp",
      "Activated on WhatsApp instead of an installer visit",
    ],
    meta: {
      title: "Mzansi Stream vs DStv Premium — Save R800+/mo",
      description: "DStv Premium vs Mzansi Stream — SuperSport-style, PSL, Premier League and kykNET folders in 4K, line-up to confirm on WhatsApp, from R99/mo with no contract and no decoder.",
    },
    hook: "DStv Premium runs R899/month with a 24-month contract and a R1,500 decoder. Mzansi Stream is a no-contract, no-decoder option from R99/month — line-up to confirm on WhatsApp.",
  },
  {
    slug: "dstv-compact-plus",
    name: "DStv Compact Plus",
    priceMonthly: "R549",
    priceYearly: "R6,588",
    features: [
      { label: "Live channels", them: "~150", us: "Confirm on WhatsApp" },
      { label: "SuperSport PSL", them: "Included", us: "Folders to confirm" },
      { label: "Premier League", them: "Partial", us: "Folders to confirm" },
      { label: "URC / Currie Cup", them: "Partial", us: "Folders to confirm" },
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
      "URC, Currie Cup and Premier League folders — to confirm on WhatsApp",
      "Watch in 4K — Compact Plus is HD only",
      "No 24-month contract, no decoder, no installer wait",
    ],
    meta: {
      title: "Mzansi Stream vs DStv Compact Plus — Save R450+/mo",
      description: "DStv Compact Plus vs Mzansi Stream — sport folders in 4K to confirm on WhatsApp, no contract, no decoder. From R99/mo on WhatsApp.",
    },
    hook: "DStv Compact Plus is R549/month for partial sport in HD. Mzansi Stream is R99/month with sport folders in 4K — to confirm on WhatsApp.",
  },
  {
    slug: "dstv-compact",
    name: "DStv Compact",
    priceMonthly: "R449",
    priceYearly: "R5,388",
    features: [
      { label: "Live channels", them: "~120", us: "Confirm on WhatsApp" },
      { label: "SuperSport PSL", them: "Included", us: "Folders to confirm" },
      { label: "Premier League", them: "Not included", us: "Folders to confirm" },
      { label: "URC", them: "Limited", us: "Folders to confirm" },
      { label: "4K UHD", them: "Not available", us: "All plans" },
      { label: "Contract", them: "24-month", us: "None" },
      { label: "Decoder", them: "Required", us: "None" },
      { label: "Support", them: "Phone IVR", us: "Direct WhatsApp" },
      { label: "Monthly price", them: "R449", us: "from R99" },
    ],
    theirStrengths: ["Entry-level sport coverage", "PVR via decoder"],
    ourEdge: [
      "Save R350+/month vs Compact",
      "Premier League folders — to confirm on WhatsApp",
      "URC and SuperSport variety folders — to confirm on WhatsApp",
      "International folders on top of SA channels",
    ],
    meta: {
      title: "Mzansi Stream vs DStv Compact — Save R350+/mo",
      description: "DStv Compact vs Mzansi Stream — sport and Premier League folders in 4K from R99/mo, to confirm on WhatsApp. No contract, no decoder.",
    },
    hook: "DStv Compact is R449/month and skips the Premier League. Mzansi Stream is R99/month with Premier League folders in 4K — matches to confirm on WhatsApp.",
  },
  {
    slug: "showmax",
    name: "Showmax",
    priceMonthly: "R99",
    features: [
      { label: "Live channels", them: "0", us: "Confirm on WhatsApp" },
      { label: "SuperSport PSL live", them: "Pro tier only", us: "Folders to confirm" },
      { label: "Premier League live", them: "Pro tier only", us: "Folders to confirm" },
      { label: "Movies & series", them: "Strong catalogue", us: "VOD — confirm on WhatsApp" },
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
      "Showmax Entertainment has zero live channels — Mzansi Stream is live TV",
      "SuperSport-style, PSL and Premier League folders on every plan — to confirm on WhatsApp",
      "VOD on top of live TV — not VOD-only",
      "EPG and live recording, not just on-demand",
    ],
    meta: {
      title: "Mzansi Stream vs Showmax — Live TV vs VOD",
      description: "Showmax is great VOD but has no live TV on Entertainment. Mzansi Stream is live TV plus VOD from R99/mo — line-up to confirm on WhatsApp.",
    },
    hook: "Showmax Entertainment is R99/month — pure VOD, zero live channels. Mzansi Stream is R99/month with live channels and VOD — line-up to confirm on WhatsApp.",
  },
  {
    slug: "supersport",
    name: "SuperSport Schools / SuperSport stand-alone",
    priceMonthly: "Tied to DStv",
    features: [
      { label: "Stand-alone subscription", them: "Effectively no — bundled with DStv", us: "Yes, no DStv required" },
      { label: "Live PSL", them: "Yes (with DStv tier)", us: "Folders to confirm" },
      { label: "Premier League", them: "Yes (Premium tier)", us: "Folders to confirm" },
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
      "SuperSport-style folders in 4K — to confirm on WhatsApp",
    ],
    meta: {
      title: "Mzansi Stream vs SuperSport — Without DStv",
      description: "SuperSport-style, PSL and Premier League folders in 4K without a DStv subscription, decoder or contract — to confirm on WhatsApp. From R99/mo.",
    },
    hook: "SuperSport is locked behind a DStv subscription with a 24-month contract. Mzansi Stream offers SuperSport-style folders for R99/month, no contract, no decoder — to confirm on WhatsApp.",
  },
  {
    slug: "starsat",
    name: "StarSat",
    priceMonthly: "R199-R399",
    features: [
      { label: "Live channels", them: "~150", us: "Confirm on WhatsApp" },
      { label: "Premier League", them: "Partial", us: "Folders to confirm" },
      { label: "URC / Currie Cup", them: "Limited", us: "Folders to confirm" },
      { label: "4K UHD", them: "Limited", us: "All plans" },
      { label: "Decoder", them: "Required upfront", us: "None" },
      { label: "Support", them: "Call centre", us: "Direct WhatsApp" },
      { label: "Free trial", them: "None", us: "24h, no card" },
    ],
    theirStrengths: ["Cheaper than DStv", "Bouquet of Asian and African channels"],
    ourEdge: [
      "International folders on top of SA channels",
      "SuperSport-style folders in 4K — to confirm on WhatsApp",
      "No decoder, no installer — works on devices you already own",
      "Direct WhatsApp support instead of a call centre",
    ],
    meta: {
      title: "Mzansi Stream vs StarSat — Why People Switch",
      description: "StarSat vs Mzansi Stream — SuperSport-style folders in 4K, no decoder, no contract. From R99/mo on WhatsApp.",
    },
    hook: "StarSat undercuts DStv but still needs a decoder and skips the top sport tier. Mzansi Stream has sport folders in 4K from R99 — no decoder; line-up to confirm on WhatsApp.",
  },
  {
    slug: "openview",
    name: "OpenView",
    priceMonthly: "Free (decoder upfront)",
    features: [
      { label: "Live channels", them: "~25", us: "Confirm on WhatsApp" },
      { label: "SuperSport PSL", them: "Not included", us: "Folders to confirm" },
      { label: "Premier League", them: "Not included", us: "Folders to confirm" },
      { label: "Decoder", them: "R1,000+ upfront", us: "None" },
      { label: "International channels", them: "Limited", us: "International folders" },
      { label: "4K", them: "Not supported", us: "All plans" },
    ],
    theirStrengths: ["No monthly fee", "Decent free-to-air SA channel mix"],
    ourEdge: [
      "Add SuperSport-style and international folders on top of free-to-air",
      "No decoder upfront — watch on devices you already own",
      "Premier League, URC and IPL folders — to confirm on WhatsApp; OpenView doesn't carry them",
      "International channels for diaspora households",
    ],
    meta: {
      title: "Mzansi Stream vs OpenView — Add Live Sport",
      description: "OpenView covers free-to-air SA basics. Mzansi Stream adds SuperSport-style and Premier League folders in 4K from R99/mo.",
    },
    hook: "OpenView gives you basic SA free-to-air for free — but no sport, no Premier League, no international channels. Mzansi Stream adds sport and international folders for R99/month — to confirm on WhatsApp.",
  },
  {
    slug: "netflix",
    name: "Netflix",
    priceMonthly: "R199 (Standard with ads)",
    features: [
      { label: "Live channels", them: "0", us: "Confirm on WhatsApp" },
      { label: "SuperSport", them: "Not included", us: "Folders to confirm" },
      { label: "Premier League", them: "Not included", us: "Folders to confirm" },
      { label: "Movies & series", them: "Strong global catalogue", us: "VOD — confirm on WhatsApp" },
      { label: "SA channels (SABC, kykNET)", them: "None", us: "Folders to confirm" },
      { label: "4K", them: "Premium tier only", us: "All plans" },
    ],
    theirStrengths: ["Best-in-class originals", "Strong global library"],
    ourEdge: [
      "Live TV + sport + news + kids — Netflix is VOD-only",
      "SA folders including SABC, e.tv, kykNET, Mzansi Magic — to confirm on WhatsApp",
      "SuperSport-style and Premier League folders — matches to confirm on WhatsApp",
      "4K on every plan, not just Premium",
    ],
    meta: {
      title: "Mzansi Stream vs Netflix — Add Live SA TV",
      description: "Netflix is VOD-only. Mzansi Stream adds live SuperSport-style, SABC and kykNET folders in 4K from R99/mo.",
    },
    hook: "Netflix is great for series but has no live TV, no sport and no SA channels. Mzansi Stream adds live TV, sport and SA folders, plus VOD — line-up to confirm on WhatsApp.",
  },
];

export function getCompetitor(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}

export const COMPETITOR_SLUGS = COMPETITORS.map((c) => c.slug);
