"use client";
// components/client/StickyBottomCta.tsx
// Shows up after the visitor scrolls past the hero. Mobile-first.

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import type { Locale } from "../../lib/locales";

const TRIAL_LABEL: Record<Locale, string> = {
  "en-za": "Start 24h free trial",
  "en-gb": "Start 24h free trial",
  "en-au": "Start 24h free trial",
  "en-us": "Start 24h free trial",
  "en-ae": "Start 24h free trial",
  "en-nz": "Start 24h free trial",
  "en-zw": "Start 24h free trial",
  af: "Begin 24-uur gratis toets",
  zu: "Qala kwamahhala 24h",
  xh: "Qala simahla iiyure ezi-24",
  "pt-mz": "Testar 24h grátis",
  fr: "Essai gratuit 24h",
};

const PLANS_LABEL: Record<Locale, string> = {
  "en-za": "See plans from R99/mo",
  "en-gb": "See plans from R99/mo",
  "en-au": "See plans from R99/mo",
  "en-us": "See plans from R99/mo",
  "en-ae": "See plans from R99/mo",
  "en-nz": "See plans from R99/mo",
  "en-zw": "See plans from US$11/mo",
  af: "Sien pryse vanaf R99/mnd",
  zu: "Bona izinhlelo ku-R99/inyanga",
  xh: "Jonga izicwangciso ku-R99",
  "pt-mz": "Ver planos desde 700 MT/mês",
  fr: "Voir les tarifs dès R99/mois",
};

export function StickyBottomCta() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="stickyBottomCta" role="region" aria-label="Quick actions">
      <a
        href="#trial"
        className="stickyBottomCtaPrimary"
        data-track-ref="Sticky-Bottom-Trial"
        data-track-placement="Sticky-Bottom-CTA"
      >
        {TRIAL_LABEL[lang] ?? TRIAL_LABEL["en-za"]}
      </a>
      <a
        href="#offers"
        className="stickyBottomCtaSecondary"
        data-track-ref="Sticky-Bottom-Pricing"
        data-track-placement="Sticky-Bottom-CTA"
      >
        {PLANS_LABEL[lang] ?? PLANS_LABEL["en-za"]}
      </a>
    </div>
  );
}
