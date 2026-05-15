"use client";
// components/ux/PricingCarousel.tsx
// Horizontal scroll-snap pricing row + bottom-sheet plan details.
// All prices and copy are unchanged — only the visual layer is new.

import React, { useState } from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { HorizontalRow, RowItem } from "./HorizontalRow";
import { Sheet } from "./Sheet";
import { useLang } from "../client/LanguageProvider";
import { dict } from "../shared/dict";
import { plans } from "../shared/plans";
import { SITE } from "../shared/site";
import { generateWhatsAppLink } from "../shared/utils";
import type { Plan } from "../shared/types";
import { tapHaptic } from "./haptic";

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

function PlanDetailsSheet({
  plan,
  open,
  onOpenChange,
}: {
  plan: Plan | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { lang } = useLang();
  const t = dict[lang];
  if (!plan) return null;
  const pricePerMonth = Math.round(plan.price / plan.months);
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const orderHref = generateWhatsAppLink(
    t.whatsapp.orderMessage(t.planNames[plan.key], plan.price, SITE.currencyLabel),
    ua,
    `Plan-${plan.key}-Sheet`
  );

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      direction="bottom"
      title={t.planNames[plan.key]}
      description={`${SITE.currencyLabel}${pricePerMonth} ${t.offers.perMonth} · ${t.offers.billedOnce} ${SITE.currencyLabel}${plan.price}`}
    >
      <ul className="mt-3 space-y-3 text-sm text-white/85">
        {t.planPerks[plan.key].map((perk) => (
          <li key={perk} className="flex items-start gap-2.5">
            <Check size={18} className="mt-0.5 text-emerald-400" aria-hidden="true" />
            <span>{perk}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-4">
        <p className="text-xs uppercase tracking-widest text-white/50">
          {t.payments.label}
        </p>
        <p className="mt-2 text-sm text-white/75">
          EFT · SnapScan · Zapper · Yoco · Ozow · Capitec Pay · Visa · Mastercard ·
          PayPal · Bitcoin
        </p>
      </div>
      <a
        href={orderHref}
        target="_blank"
        rel="noreferrer"
        onClick={() => tapHaptic(14)}
        className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-base font-semibold text-black shadow-[0_8px_24px_rgba(37,211,102,0.35)] active:scale-95 transition"
      >
        {t.offers.order}
        <ArrowRight size={18} aria-hidden="true" />
      </a>
    </Sheet>
  );
}

export function PricingCarousel() {
  const { lang } = useLang();
  const t = dict[lang];
  const [selected, setSelected] = useState<Plan | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelect = (p: Plan) => {
    setSelected(p);
    setOpen(true);
  };

  return (
    <section id="offers" className="relative py-12 sm:py-20">
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
      <PlanDetailsSheet plan={selected} open={open} onOpenChange={setOpen} />
    </section>
  );
}

// Re-exported for BottomTabBar — opens the plans sheet from the tab bar.
export function PricingSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { lang } = useLang();
  const t = dict[lang];
  const [selected, setSelected] = useState<Plan | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <>
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
                setSelected(plan);
                setDetailOpen(true);
                onOpenChange(false);
              }}
            />
          ))}
        </div>
      </Sheet>
      <PlanDetailsSheet
        plan={selected}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </>
  );
}
