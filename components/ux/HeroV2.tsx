"use client";
// components/ux/HeroV2.tsx
// Full-viewport (100dvh) cinematic hero. Layers:
//   1. Background: looping muted video with poster fallback (placeholder
//      path — TO_FILL_BY_OWNER once the channel-montage reel ships).
//   2. Overlay: top-to-bottom black gradient + brand gold radial glow.
//   3. Content: bottom-aligned pill, hero H1, lead, dual CTAs.

import React, { useEffect, useState } from "react";
import { Play, ArrowRight } from "lucide-react";
import { useLang } from "../client/LanguageProvider";
import { dict } from "../shared/dict";
import { generateWhatsAppLink } from "../shared/utils";
import { FreeTrialSheet } from "./FreeTrialSheet";
import { VideoDemoSheet } from "./VideoDemoSheet";
import { tapHaptic } from "./haptic";

const HERO_VIDEO_SRC = "/videos/hero-loop.mp4"; // TO_FILL_BY_OWNER
const HERO_POSTER_SRC = "/og-image.jpg";

export function HeroV2() {
  const { lang } = useLang();
  const t = dict[lang];
  const [trialOpen, setTrialOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  // Defer the video element to first paint: poster image carries the
  // hero visual at the SSR moment so LCP is the H1, not a 1.5MB video
  // initialised mid-paint. The video mounts after the first user gesture
  // or after `mount` to keep mobile data + CPU sane on Galaxy A-class
  // devices.
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(min-width: 768px)").matches) {
      setShowVideo(true);
    }
  }, []);

  const headline = (t.hero.titleA || "").trim();
  const accent = (t.hero.titleB || "").trim();

  return (
    <section
      className="relative w-full overflow-hidden text-white"
      style={{ minHeight: "100dvh" }}
      aria-label={t.hero.pill}
    >
      <div className="absolute inset-0 z-0">
        {showVideo ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={HERO_POSTER_SRC}
            aria-hidden="true"
          >
            {/* The .mp4 is intentionally a placeholder. If missing, the poster
                ensures graceful fallback — no broken state. */}
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          // Mobile / first paint: serve the poster as a plain <img> so it
          // becomes the LCP candidate quickly and never blocks on video
          // metadata. Better Samsung / Galaxy A class performance.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={HERO_POSTER_SRC}
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        )}
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
            <button
              type="button"
              onClick={() => {
                tapHaptic();
                setTrialOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E0152D] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(224,21,45,0.35)] hover:bg-[#c40f24] active:scale-95 transition"
            >
              <ArrowRight size={18} aria-hidden="true" />
              {t.trial.cta}
            </button>
            <button
              type="button"
              onClick={() => {
                tapHaptic();
                setDemoOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-[15px] font-medium text-white backdrop-blur hover:bg-white/10 active:scale-95 transition"
            >
              <Play size={16} aria-hidden="true" />
              {t.hero.ctaAdvisor}
            </button>
          </div>

          <p className="mt-5 text-xs text-white/55">{t.hero.trust}</p>
        </div>
      </div>

      <FreeTrialSheet open={trialOpen} onOpenChange={setTrialOpen} />
      <VideoDemoSheet open={demoOpen} onOpenChange={setDemoOpen} />
    </section>
  );
}

// Server-safe re-export of WhatsApp helper isn't needed here; the
// FreeTrialSheet imports it lazily on the client.
export { generateWhatsAppLink as _whatsappHelper };
