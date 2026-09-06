// lib/seo/springboks-uk-hub.ts
// Thin FAQ landing for Seo short slugs `/en/iptv-springboks-uk` (308 →
// `/{locale}/iptv-springboks-uk`). Reuses SPRINGBOKS_LONDON_P1_FAQ.
// Does not reconstruct /blog/watch-springboks-from-london/.

import type { BlogFaq } from "./blog-posts";
import { SPRINGBOKS_LONDON_P1_FAQ } from "./blog-diaspora";

export const SPRINGBOKS_UK_HUB_SLUG = "iptv-springboks-uk";
export const SPRINGBOKS_UK_HUB_PATH = "/iptv-springboks-uk/";
export const SPRINGBOKS_UK_WATCH_ALIAS = "watch-springboks-uk";

export const SPRINGBOKS_UK_HUB = {
  slug: SPRINGBOKS_UK_HUB_SLUG,
  title: "IPTV Springboks UK — watch SA rugby from London",
  h1: "IPTV Springboks UK — FAQ for SA rugby fans in London",
  metaDescription:
    "Watch Springboks and URC from the UK on IPTV. Six FAQs: trial, Firestick, kick-off, feeds, legal. WhatsApp +44 7307 410512. London guide linked.",
  datePublished: "2026-09-06",
  dateModified: "2026-09-06",
  lead:
    "South Africans in the UK ask the same six questions before they drop a DStv decoder back home: can the Boks and URC play on a London Firestick, will every SuperSport-style feed show up, what time is kick-off, is there a 24-hour trial, and is this “free illegal streams”? Short answers below. The long London guide stays on the blog.",
  keyFacts: [
    "24-hour trial on WhatsApp +44 7307 410512. No card. No mailto.",
    "We list playlist categories — not exclusive Sky, TNT or SuperSport licences.",
    "Live kick-off follows the host broadcast clock, not a UK delay feed.",
  ],
  cta: {
    label: "WhatsApp the UK rugby trial — +44 7307 410512 →",
    message:
      "Hi! I'm in the UK. I want the 24-hour Mzansi Stream trial for Springboks / URC / SA channels. Device: [Firestick / Smart TV].",
    ref: "Hub-Boks-UK",
  },
  faq: SPRINGBOKS_LONDON_P1_FAQ as BlogFaq[],
  relatedLinks: [
    {
      label: "Watch the Springboks from London — full IPTV guide",
      href: "/en-za/blog/watch-springboks-from-london/",
    },
    {
      label: "Rugby kickoff times from London (SAST → GMT/BST)",
      href: "/en-za/blog/rugby-kickoff-times-london/",
    },
    {
      label: "Best IPTV setup in the UK — Firestick and Smart TV",
      href: "/en-za/blog/iptv-uk-firestick-smart-tv-sa-sports/",
    },
    {
      label: "South African TV in the United Kingdom",
      href: "/en-gb/sa-abroad/uk/",
    },
    {
      label: "IPTV categories are not broadcast licences",
      href: "/en-za/blog/iptv-uk-categories-not-licences/",
    },
  ],
} as const;
