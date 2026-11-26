"use client";
// components/ux/HeroV2.tsx
// The hero uses the same WhatsApp destination for trial and advisor requests.
import React from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { useLang } from "../client/LanguageProvider";
import { dict } from "../shared/dict";
import { waMeLink } from "../shared/utils";
import { tapHaptic } from "./haptic";

const HERO_POSTER_SRC = "/og-image.jpg";

export function HeroV2() {
  const { lang } = useLang();
  const t = dict[lang];
  const headline = (t.hero.titleA || "").trim();
  const accent = (t.hero.titleB || "").trim();

  return (
    <section
      className="relative w-full overflow-hidden text-white"
      style={{ minHeight: "100dvh" }}
      aria-label={t.hero.pill}
    >
      <div className="absolute inset-0 z-0">
        {/* The poster is the first visible asset on desktop and mobile. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_POSTER_SRC}
          alt="Mzansi Stream television and device preview"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,184,28,0.18) 0%, transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.85) 75%, #000 100%)",
        }}
      />

      <div className="relative z-[2] flex h-full min-h-[100dvh] flex-col">
        <div className="flex-1" />
        <div
          className="mx-auto w-full max-w-[1100px] px-5 sm:px-8 pb-[max(8rem,env(safe-area-inset-bottom))] md:pb-24"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border border-[#FFB81C]/40 bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#FFD96A] backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFD96A]" aria-hidden="true" />
            {t.hero.pill}
          </span>

          <h1
            className="mt-5 font-bold tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            <span className="block">{headline}</span>
            <span
              className="block"
              style={{
                background:
                  "linear-gradient(180deg, #FFD96A 0%, #FFB81C 50%, #E0152D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {accent}
            </span>
          </h1>

          <p
            className="mt-5 max-w-2xl text-white/80"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", lineHeight: 1.5 }}
          >
            {t.hero.lead}
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={waMeLink(t.whatsapp.trial, "Hero-Trial")}
              target="_blank"
              rel="noopener noreferrer"
              data-track-placement="hero-trial"
              onClick={() => tapHaptic()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E0152D] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(224,21,45,0.35)] hover:bg-[#c40f24] active:scale-95 transition"
            >
              <ArrowRight size={18} aria-hidden="true" />
              {t.trial.cta}
            </a>
            <a
              href={waMeLink(t.whatsapp.generic, "Hero-Advisor")}
              target="_blank"
              rel="noopener noreferrer"
              data-track-placement="hero-advisor"
              onClick={() => tapHaptic()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-[15px] font-medium text-white backdrop-blur hover:bg-white/10 active:scale-95 transition"
            >
              <MessageCircle size={16} aria-hidden="true" />
              {t.hero.ctaAdvisor}
            </a>
          </div>

          <p className="mt-5 text-xs text-white/55">{t.hero.trust}</p>
        </div>
      </div>
    </section>
  );
}

export { generateWhatsAppLink as _whatsappHelper } from "../shared/utils";
