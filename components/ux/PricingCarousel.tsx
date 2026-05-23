"use client";
// components/ux/PricingCarousel.tsx
// Horizontal scroll-snap pricing row + bottom-sheet plan details.
// All prices and copy are unchanged — only the visual layer is new.

import React from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { HorizontalRow, RowItem } from "./HorizontalRow";
import { Sheet } from "./Sheet";
import { useLang } from "../client/LanguageProvider";
import { dict } from "../shared/dict";
import { plans } from "../shared/plans";
import { SITE } from "../shared/site";
import type { Plan } from "../shared/types";
import { tapHaptic } from "./haptic";
import { track } from "../../lib/analytics/track";
import { openCheckout } from "./checkout/bus";

function PlanCard({
  plan,
  onSelect,
}: {
  plan: Plan;
  onSelect: (p: Plan) => void;
}) {
  const { lang } = useLang();
  const t = dict[lang];
  const pricePerMonth = Math.round(plan.price / plan.months);
  const saving = Math.round((1 - pricePerMonth / 199) * 100);
  const highlight = plan.highlight;

  return (
    <button
      type="button"
      onClick={() => {
        tapHaptic();
        onSelect(plan);
      }}
      aria-label={`${t.planNames[plan.key]} — ${SITE.currencyLabel}${plan.price}`}
      className={`group relative flex h-full w-full flex-col rounded-3xl border p-6 text-start transition-all active:scale-[0.98] ${
        highlight
          ? "border-[#FFB81C]/60 bg-gradient-to-b from-[#1a1207] via-[#0a0a0a] to-[#0a0a0a] shadow-[0_0_0_1px_rgba(255,184,28,0.18),0_30px_80px_-20px_rgba(255,184,28,0.35)]"
          : "border-white/10 bg-gradient-to-b from-[#141414] to-[#0A0A0A] hover:border-white/20"
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 start-6 inline-flex items-center gap-1 rounded-full bg-[#FFB81C] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
          <Sparkles size={12} aria-hidden="true" />
          {t.offers.bestSeller}
        </span>
      )}
      {saving > 0 && !highlight && (
        <span className="absolute -top-3 end-6 rounded-full bg-[#E0152D] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
          -{saving}%
        </span>
      )}
      <div className="text-sm font-medium text-white/70">
        {t.planNames[plan.key]}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-base text-white/60">{SITE.currencyLabel}</span>
        <span
          className="font-bold tracking-tight text-white"
          style={{ fontSize: "clamp(2.75rem, 8vw, 3.5rem)", lineHeight: 1 }}
        >
          {pricePerMonth}
        </span>
        <span className="text-sm text-white/60">{t.offers.perMonth}</span>
      </div>
      <div className="mt-1 text-xs text-white/50">
        {t.offers.billedOnce} {SITE.currencyLabel}
        {plan.price}
        {plan.months > 1 ? ` (${t.offers.totalLabel})` : ""}
      </div>
      <ul className="mt-5 space-y-2.5 text-sm text-white/80">
        {t.planPerks[plan.key].slice(0, 4).map((perk) => (
          <li key={perk} className="flex items-start gap-2">
            <Check
              size={16}
              className={highlight ? "text-[#FFD96A] mt-0.5" : "text-emerald-400 mt-0.5"}
              aria-hidden="true"
            />
            <span>{perk}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <span
          className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
            highlight ? "text-[#FFD96A]" : "text-white"
          }`}
        >
          {t.offers.order}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </button>
  );
}

export function PricingCarousel() {
  const { lang } = useLang();
  const t = dict[lang];
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const firedRef = React.useRef(false);

  React.useEffect(() => {
    if (!sectionRef.current || firedRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            track("pricing_view", { placement: "Pricing-Carousel" });
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSelect = (p: Plan) => {
    track("plan_card_click", {
      plan_key: p.key,
      months: p.months,
      price: p.price,
      placement: "Pricing-Carousel",
    });
    openCheckout({ plan: p, source: "Pricing-Carousel" });
  };

  return (
    <section ref={sectionRef} id="offers" className="relative py-12 sm:py-20">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <h2
          className="font-bold tracking-tight text-white"
          style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", letterSpacing: "-0.02em" }}
        >
          {t.offers.title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/65 sm:text-base">
          {t.offers.sub}
        </p>
      </div>
      <div className="mt-6 sm:mt-10">
        <HorizontalRow ariaLabel={t.offers.title} showProgress>
          {plans.map((p) => (
            <RowItem key={p.key} widthClass="w-[280px] sm:w-[300px]">
              <PlanCard plan={p} onSelect={handleSelect} />
            </RowItem>
          ))}
        </HorizontalRow>
      </div>
    </section>
  );
}

// Re-exported for BottomTabBar — opens the plans sheet from the tab bar.
// Clicking any plan now opens the global PriceCheckoutPanel directly,
// so the legacy detail-sheet step is gone (one fewer tap to WhatsApp).
export function PricingSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { lang } = useLang();
  const t = dict[lang];

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      direction="bottom"
      fullHeight
      title={t.offers.title}
      description={t.offers.sub}
    >
      <div className="mt-2 grid grid-cols-1 gap-3">
        {plans.map((p) => (
          <PlanCard
            key={p.key}
            plan={p}
            onSelect={(plan) => {
              onOpenChange(false);
              track("plan_card_click", {
                plan_key: plan.key,
                months: plan.months,
                price: plan.price,
                placement: "Pricing-Sheet",
              });
              openCheckout({ plan, source: "Pricing-Sheet" });
            }}
          />
        ))}
      </div>
    </Sheet>
  );
}
