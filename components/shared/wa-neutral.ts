// components/shared/wa-neutral.ts
// Neutral WhatsApp prefill per language, shared by the floating button
// (components/seo/WhatsAppFabLink.tsx) and the footer LiveStatus link.
// Wording is the owner-approved copy already shipped on the FAB — no new
// translations. The number is fixed — do not read it from env.

import type { Locale } from "../../lib/locales";

export const WA_NUMBER = "447307410512";

export type FabLang = "en" | "af" | "zu" | "xh" | "pt" | "fr";

/** Neutral prefill. No trial, price, channel, legality, or uptime claim. */
export const WA_NEUTRAL_MESSAGE: Record<FabLang, string> = {
  en: "Hello, I have a question about your service.",
  af: "Hallo, ek het 'n vraag.",
  zu: "Sawubona, nginombuzo.",
  xh: "Molo, ndinombuzo.",
  pt: "Olá, tenho uma pergunta.",
  fr: "Bonjour, j'ai une question.",
};

export const WA_ARIA_LABEL: Record<FabLang, string> = {
  en: "Chat on WhatsApp",
  af: "Gesels op WhatsApp",
  zu: "Xoxa ku-WhatsApp",
  xh: "Thetha ku-WhatsApp",
  pt: "Falar no WhatsApp",
  fr: "Discuter sur WhatsApp",
};

export function fabLang(locale: Locale): FabLang {
  if (locale === "af" || locale === "zu" || locale === "xh" || locale === "fr") {
    return locale;
  }
  if (locale === "pt-mz") return "pt";
  return "en";
}

/**
 * wa.me href with the neutral message, optionally suffixed with a
 * language-neutral context tag (brand + page URL) so the operator sees
 * which page the visitor came from. Context is data, not copy.
 */
export function waNeutralHref(locale: Locale, context?: string): string {
  const base = WA_NEUTRAL_MESSAGE[fabLang(locale)];
  const text = context ? `${base} [${context}]` : base;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
