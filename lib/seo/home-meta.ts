// lib/seo/home-meta.ts
// Native-language homepage <title> + meta description per locale.
//
// Before this module the homepage shipped ONE hard-coded English title to all
// 12 locales — 12 duplicate titles AND a lang↔content mismatch (af/zu/xh/pt-mz/
// fr declared a foreign `<html lang>` while serving an English title), the
// prime non-indexation suspect for the hreflang cluster.
//
// Copy is hand-written native wording (no machine translation), aligned with
// the owner-approved hero strings already in components/shared/dict.ts. en-ZA
// is kept identical to the previously-live title so the ranking default page
// is not disturbed.
//
// IMPORTANT: `title` here is WITHOUT the "| Mzansi Stream" suffix — the root
// layout's metadata title template ("%s | Mzansi Stream") appends it once.
// The branded form is exposed via `brandedTitle()` for OpenGraph, which does
// not run through the template.

import type { Locale } from "../locales";

export type HomeMeta = {
  /** <title> WITHOUT brand suffix (the layout template appends it). */
  title: string;
  /** meta description — native, with a number + CTA. */
  description: string;
  /** OpenGraph description (defaults to `description` when omitted). */
  ogDescription?: string;
};

const BRAND = "Mzansi Stream";

export const HOME_META: Record<Locale, HomeMeta> = {
  // ── English South Africa (default) — unchanged, protects the ranking page.
  "en-za": {
    title: "DStv Alternative — 20,000+ Channels from R99",
    description:
      "South Africa's IPTV alternative to DStv — 20,000+ live channels including SuperSport, kykNET and SABC in 4K. Free 24h trial, no card. From R99/mo.",
    ogDescription:
      "South Africa's IPTV alternative to DStv — 20,000+ live channels in 4K. From R99/mo.",
  },

  // ── English diaspora — "SA TV abroad" angle, one distinct title each.
  "en-gb": {
    title: "South African IPTV in the UK — SuperSport & DStv Channels",
    description:
      "Watch South African TV in the UK — SuperSport, DStv channels and 20,000+ live channels in 4K, no decoder. Free 24h trial on WhatsApp. From R99/mo.",
  },
  "en-au": {
    title: "South African IPTV in Australia — SuperSport & DStv",
    description:
      "Watch South African TV in Australia — SuperSport, DStv channels and 20,000+ live channels in 4K, no dish. Free 24h trial on WhatsApp. From R99/mo.",
  },
  "en-us": {
    title: "South African IPTV in the USA — SuperSport & DStv",
    description:
      "Watch South African TV in the USA — SuperSport, DStv channels and 20,000+ live channels in 4K, no decoder. Free 24h trial on WhatsApp. From R99/mo.",
  },
  "en-ae": {
    title: "South African IPTV in the UAE — SuperSport & DStv",
    description:
      "Watch South African TV in the UAE — SuperSport, DStv channels and 20,000+ live channels in 4K, no dish. Free 24h trial on WhatsApp. From R99/mo.",
  },
  "en-nz": {
    title: "South African IPTV in New Zealand — SuperSport & DStv",
    description:
      "Watch South African TV in New Zealand — SuperSport, DStv channels and 20,000+ live channels in 4K, no dish. Free 24h trial on WhatsApp. From R99/mo.",
  },
  "en-zw": {
    title: "Best IPTV Zimbabwe 2026 — 20,000+ Channels in 4K",
    description:
      "Best IPTV in Zimbabwe — SuperSport, Premier League, ZBC and 20,000+ live channels in 4K, no decoder. Pay in USD, EcoCash or OneMoney. Free 24h trial.",
  },

  // ── Afrikaans (native).
  af: {
    title: "Beste IPTV Suid-Afrika 2026 — 20,000+ kanale vanaf R99",
    description:
      "Beste IPTV in Suid-Afrika — 20,000+ lewendige kanale, SuperSport, kykNET en SABC in 4K, geen dekodeerder. Gratis 24u-proeftydperk op WhatsApp. Vanaf R99/md.",
  },

  // ── isiZulu (native, aligned with dict.ts hero).
  zu: {
    title: "I-IPTV Engcono e-South Africa 2026 — iziteshi ezi-20,000+",
    description:
      "I-IPTV engcono e-South Africa — iziteshi ezi-20,000+ eziphilayo, SuperSport ne-DStv ku-4K, ngaphandle kwedikhoda. Ukulinga kwamahhala kwama-24h ku-WhatsApp. Kusukela ku-R99/inyanga.",
  },

  // ── isiXhosa (native, aligned with dict.ts hero).
  xh: {
    title: "Eyona IPTV Ilungileyo eMzantsi Afrika 2026 — 20,000+ iitshaneli",
    description:
      "Eyona IPTV ilungileyo eMzantsi Afrika — 20,000+ iitshaneli ezibukhoyo, SuperSport ne-DStv ku-4K, ngaphandle kwedikhoda. Uvavanyo lwasimahla lweeyure ezingama-24 ku-WhatsApp. Ukusuka ku-R99/inyanga.",
  },

  // ── Português (Moçambique) — native.
  "pt-mz": {
    title: "Melhor IPTV Moçambique 2026 — 20.000+ canais desde R99",
    description:
      "Melhor IPTV em Moçambique — 20.000+ canais ao vivo, SuperSport, Premier League, TVM e RTP África em 4K. Teste grátis de 24h no WhatsApp. Desde R99/mês.",
  },

  // ── Français — native.
  fr: {
    title: "Meilleure IPTV 2026 — 20 000+ chaînes 4K, sport en direct",
    description:
      "Meilleure IPTV — 20 000+ chaînes en direct, sport, films et séries en 4K sans coupures, sur tous vos écrans. Essai gratuit de 24 h sur WhatsApp. Dès R99/mois.",
  },
};

export function homeMetaFor(locale: Locale): HomeMeta {
  return HOME_META[locale] ?? HOME_META["en-za"];
}

/** Branded title for OpenGraph (OG does not run through the layout template). */
export function brandedTitle(locale: Locale): string {
  return `${homeMetaFor(locale).title} | ${BRAND}`;
}
