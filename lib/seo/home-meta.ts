// lib/seo/home-meta.ts
// Native-language homepage <title> + meta description per locale.
//
// IMPORTANT: `title` here is WITHOUT the "| Mzansi Stream" suffix — the root
// layout's metadata title template ("%s | Mzansi Stream") appends it once.
// The branded form is exposed via `brandedTitle()` for OpenGraph, which does
// not run through the template.

import type { Locale } from "../locales";
import { OCEANIA_MARKETS, OCEANIA_PLANS, type OceaniaMarket } from "../oceania-offer";

export type HomeMeta = {
  /** <title> WITHOUT brand suffix (the layout template appends it). */
  title: string;
  /** meta description — native, with a number + CTA. */
  description: string;
  /** OpenGraph description (defaults to `description` when omitted). */
  ogDescription?: string;
};

const BRAND = "Mzansi Stream";

function oceaniaHomeMeta(market: OceaniaMarket): HomeMeta {
  const { country } = OCEANIA_MARKETS[market];
  const prices = OCEANIA_PLANS.map((plan) => `US$${plan.usd}/${plan.id}`);
  const options = new Intl.ListFormat("en-GB", { type: "disjunction" }).format(prices);
  return {
    title: `South African TV in ${country}`,
    description: `Start a free 24-hour trial in ${country}, Monday to Friday. No card needed. Ask about your channels on WhatsApp. Prepay ${options}.`,
  };
}

export const HOME_META: Record<Locale, HomeMeta> = {
  "en-za": {
    title: "DStv Alternative in South Africa | Pricing",
    description: "Compare DStv and Mzansi Stream in South Africa. Mzansi costs USD 15 for one month or USD 65 upfront for a year. Try it for 24 hours without a card.",
  },
  "en-gb": {
    title: "South African TV in the UK",
    description: "Moving to the UK? Check South African TV availability, what happens to your DStv account and how to request a Mzansi Stream device trial.",
  },
  "en-au": oceaniaHomeMeta("en-au"),
  "en-us": {
    title: "South African TV in the United States",
    description: "Explore viewing options for South Africans living in the US. Check local programme availability and request a 24-hour device trial on WhatsApp.",
  },
  "en-ae": {
    title: "South African TV in the UAE",
    description: "Explore South African viewing guides for the Emirates. Ask about your device and the programmes available where you live before paying.",
  },
  "en-nz": oceaniaHomeMeta("en-nz"),
  "en-zw": {
    title: "South African TV and IPTV in Zimbabwe",
    description: "Check local viewing options, supported devices and prepaid terms in Zimbabwe. Ask for the current price and a 24-hour trial on WhatsApp.",
  },
  af: {
    title: "IPTV in Suid-Afrika | Pryse en gratis proef",
    description: "Een maand kos USD 15, of betaal USD 65 vooruit vir twaalf maande. Probeer Mzansi Stream vir 24 uur op jou eie toestel, sonder ’n bankkaart.",
  },
  zu: {
    title: "I-IPTV e-South Africa",
    description: "I-IPTV e-South Africa. USD 15 / 1 inyanga. Ukulinga kwamahhala kwama-24h ku-WhatsApp.",
  },
  xh: {
    title: "I-IPTV eMzantsi Afrika",
    description: "I-IPTV eMzantsi Afrika. USD 15 / 1 inyanga. Uvavanyo lwasimahla lweeyure ezingama-24 ku-WhatsApp.",
  },
  "pt-mz": {
    title: "IPTV em Moçambique | Guias e teste grátis",
    description: "Consulte a disponibilidade dos programas em Moçambique e as condições de pagamento. Peça um teste de 24 horas no seu aparelho pelo WhatsApp.",
  },
  fr: {
    title: "IPTV Afrique du Sud | Tarifs et essai gratuit",
    description: "Mzansi Stream coûte 199 rands pour un mois ou 1 199 rands pour un an payé d’avance. Consultez les guides DStv et demandez un essai gratuit de 24 h.",
  },
};

export function homeMetaFor(locale: Locale): HomeMeta {
  return HOME_META[locale] ?? HOME_META["en-za"];
}

/** Branded title for OpenGraph (OG does not run through the layout template). */
export function brandedTitle(locale: Locale): string {
  return `${homeMetaFor(locale).title} | ${BRAND}`;
}
