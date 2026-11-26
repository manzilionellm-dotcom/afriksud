"use client";
// components/ux/PremiumPlanSelector.tsx
// Keep the selected term and the price passed to checkout in sync.
import React, { useEffect, useRef, useState } from "react";
import { Check, MessageCircle, Sparkles } from "lucide-react";
import { useLang } from "../client/LanguageProvider";
import { dict } from "../shared/dict";
import { plans, monthlyEquivalent } from "../shared/plans";
import { SITE } from "../shared/site";
import { tapHaptic } from "./haptic";
import { openCheckout } from "./checkout/bus";
import { track } from "../../lib/analytics/track";
import type { PlanKey } from "../shared/types";

export function PremiumPlanSelector() {
  const { lang } = useLang();
  const t = dict[lang];
  const recommendedKey: PlanKey =
    plans.find((p) => p.highlight)?.key ?? "p3";
  const [planKey, setPlanKey] = useState<PlanKey>(recommendedKey);

  const currentPlan = plans.find((plan) => plan.key === planKey) ?? plans[0];
  const monthlyPrice = monthlyEquivalent(currentPlan);
  const numberFormat = new Intl.NumberFormat(lang);

  const pick = (key: PlanKey) => {
    if (key !== planKey) tapHaptic(8);
    setPlanKey(key);
  };

  const sectionRef = useRef<HTMLElement | null>(null);
  const firedView = useRef(false);
  useEffect(() => {
    if (!sectionRef.current || firedView.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedView.current) {
            firedView.current = true;
            track("pricing_view", { placement: "PremiumPlanSelector" });
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

  const onWhatsApp = () => {
    track("plan_card_click", {
      plan_key: currentPlan.key,
      months: currentPlan.months,
      price: currentPlan.price,
      placement: "PremiumPlanSelector",
    });
    openCheckout({ plan: currentPlan, source: "PremiumPlanSelector" });
  };

  return (
    <section
      ref={sectionRef}
      id="offers"
      aria-label={t.offers.title}
      className="relative py-14 sm:py-20"
    >
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <header className="text-center">
          <h2
            className="font-bold tracking-tight text-white"
            style={{
              fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {t.offers.title}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/65 sm:text-base">
            {t.offers.sub}
          </p>
        </header>

        {/* ─ Segmented pill (1m · 3m · 6m · 12m) ─────────────── */}
        <div
          role="radiogroup"
          aria-label={t.checkout.step1Title}
          className="mx-auto mt-8 flex w-fit items-center gap-1 rounded-full border border-white/12 bg-black/40 p-1 backdrop-blur"
        >
          {plans.map((p) => {
            const selected = p.key === planKey;
            return (
              <button
                key={p.key}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => pick(p.key)}
                className={`relative inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-2 text-sm font-semibold transition-colors ${
                  selected
                    ? "bg-gradient-to-b from-[#FFD96A] to-[#FFB81C] text-black shadow-[0_8px_24px_rgba(255,184,28,0.35)]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {t.planNames[p.key]}
                {p.highlight ? (
                  <span
                    aria-hidden="true"
                    className={`absolute -top-2 -right-2 inline-flex h-4 items-center rounded-full px-1.5 text-[9px] font-bold uppercase tracking-widest ${
                      selected
                        ? "bg-black text-[#FFD96A]"
                        : "bg-[#FFB81C] text-black"
                    }`}
                  >
                    ★
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* ─ One big premium card ─────────────────────────────── */}
        <article
          className="relative mx-auto mt-8 max-w-[760px] overflow-hidden rounded-[28px] border border-[#FFB81C]/40 bg-gradient-to-b from-[#1a1207] via-[#0e0a13] to-[#070509] p-7 sm:p-9 shadow-[0_0_0_1px_rgba(255,184,28,0.15),0_40px_120px_-30px_rgba(255,184,28,0.35)]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,184,28,0.20) 0%, transparent 65%)",
            }}
          />

          <div className="relative flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFB81C] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
              <Sparkles size={12} aria-hidden="true" />
              {currentPlan.highlight
                ? t.offers.bestSeller
                : t.planNames[currentPlan.key]}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-widest text-white/50">
              {t.checkout.pillBilledOnce}
            </span>
          </div>

          <div className="relative mt-5 flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="text-2xl font-semibold text-[#E0152D]">
              {SITE.currencyLabel}
            </span>
            <span
              className="font-extrabold leading-none text-white"
              style={{
                fontSize: "clamp(3.5rem, 11vw, 5.5rem)",
                letterSpacing: "-0.04em",
                display: "inline-block",
              }}
            >
              {numberFormat.format(currentPlan.price)}
            </span>
            <span className="pb-2 text-base text-white/65">{t.checkout.pillTotal}</span>
          </div>

          <div className="relative mt-3 text-sm text-white/70">
            {t.planNames[currentPlan.key]} · {t.checkout.pillBilledOnce}
            {currentPlan.months > 1 && <> · {SITE.currencyLabel}{numberFormat.format(monthlyPrice)}{t.offers.perMonth}</>}
          </div>

          <ul className="relative mt-6 grid grid-cols-1 gap-2.5 text-sm text-white/85 sm:grid-cols-2">
            {t.planPerks[currentPlan.key].slice(0, 6).map((perk) => (
              <li key={perk} className="flex items-start gap-2">
                <Check size={16} className="mt-0.5 text-emerald-400" aria-hidden="true" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <div className="relative mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onWhatsApp}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-base font-semibold text-black shadow-[0_10px_30px_rgba(37,211,102,0.35)] hover:bg-[#1ebd5b] active:scale-95 transition"
              data-track-ref={`PremiumPlanSelector-${currentPlan.key}`}
              data-track-placement="PremiumPlanSelector"
            >
              <MessageCircle size={18} aria-hidden="true" />
              {t.offers.order}
            </button>
            <p className="text-center text-xs text-white/55 sm:text-left">
              {t.trial.note}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
