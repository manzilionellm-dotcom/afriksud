"use client";
// components/ux/checkout/PriceCheckoutPanel.tsx
// Full-screen checkout panel for price → WhatsApp.
// Mounted by PriceCheckoutMount and shown when the bus emits.
//
// Design notes / pitfalls baked in:
//   - PIÈGE A: rendered via createPortal(document.body) so transformed
//     ancestors never become its containing block.
//   - PIÈGE B: <select> options are explicitly styled in globals.css
//     (`select option { background:#0d0a12; color:#fff; }`) — without
//     that the native popup is the OS background on Win/Linux.
//   - PIÈGE C: the price-morph effect reads displayKey via a ref. Its
//     own setDisplayKey at mid-point therefore can't restart the effect.

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronRight, ShieldCheck, X, MessageCircle } from "lucide-react";
import { useLang } from "../../client/LanguageProvider";
import { dict } from "../../shared/dict";
import { plans } from "../../shared/plans";
import { SITE } from "../../shared/site";
import { isMobileUA } from "../../shared/utils";
import { track } from "../../../lib/analytics/track";
import { tapHaptic } from "../haptic";
import { TV_BRANDS, IPTV_APPS } from "./data";
import type { Plan, PlanKey } from "../../shared/types";

const MORPH_OUT_MS = 120;
const MORPH_IN_MS = 240;
const MORPH_EASE = "cubic-bezier(0.34, 1.56, 0.64, 1)";

function planTotal(p: Plan) {
  return p.price;
}
function planPerMonth(p: Plan) {
  return Math.round(p.price / p.months);
}

function buildWhatsAppMessage(opts: {
  intro: string;
  planLabel: string;
  total: number;
  currencyLabel: string;
  device: string;
  app: string;
  pagePath: string;
  pageLabel: string;
  notes: string;
  notesLabel: string;
}): string {
  const lines: string[] = [];
  lines.push(opts.intro);
  lines.push("");
  lines.push(`• ${opts.planLabel} — ${opts.currencyLabel}${opts.total}`);
  if (opts.device) lines.push(`• ${opts.device}`);
  if (opts.app) lines.push(`• ${opts.app}`);
  lines.push("");
  lines.push(`${opts.pageLabel}: ${opts.pagePath}`);
  if (opts.notes) {
    lines.push("");
    lines.push(`${opts.notesLabel}: ${opts.notes}`);
  }
  return lines.join("\n");
}

function StepBadge({ done, n }: { done: boolean; n: number }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold transition-colors ${
        done
          ? "bg-emerald-500 text-black"
          : "bg-[#E0152D] text-white"
      }`}
    >
      {done ? <Check size={14} strokeWidth={3} /> : n}
    </span>
  );
}

function MorphValue({
  morphing,
  children,
}: {
  morphing: "idle" | "out" | "in";
  children: React.ReactNode;
}) {
  const style: React.CSSProperties =
    morphing === "out"
      ? {
          opacity: 0,
          transform: "scale(0.84)",
          transition: `opacity ${MORPH_OUT_MS}ms ease-out, transform ${MORPH_OUT_MS}ms ease-out`,
        }
      : morphing === "in"
      ? {
          opacity: 1,
          transform: "scale(1)",
          transition: `opacity ${MORPH_IN_MS}ms ${MORPH_EASE}, transform ${MORPH_IN_MS}ms ${MORPH_EASE}`,
        }
      : {
          opacity: 1,
          transform: "scale(1)",
        };
  return (
    <span
      style={{
        display: "inline-block",
        transformOrigin: "left center",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function PriceCheckoutPanel({
  open,
  initialPlanKey,
  source,
  onClose,
}: {
  open: boolean;
  initialPlanKey: PlanKey;
  source?: string;
  onClose: () => void;
}) {
  const { lang } = useLang();
  const t = dict[lang];

  // Live picked plan (drives the recap + morph).
  const [planKey, setPlanKey] = useState<PlanKey>(initialPlanKey);
  useEffect(() => {
    if (open) setPlanKey(initialPlanKey);
  }, [open, initialPlanKey]);

  // ─── Form state ──────────────────────────────────────────────
  const [device, setDevice] = useState("");
  const [deviceOther, setDeviceOther] = useState("");
  const [app, setApp] = useState("");
  const [appOther, setAppOther] = useState("");
  const [notes, setNotes] = useState("");

  // Reset on each open so two consecutive orders don't bleed.
  useEffect(() => {
    if (open) {
      setDevice("");
      setDeviceOther("");
      setApp("");
      setAppOther("");
      setNotes("");
    }
  }, [open]);

  // ─── DOM refs for auto-advance scroll ────────────────────────
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const deviceSelectRef = useRef<HTMLSelectElement | null>(null);
  const appSelectRef = useRef<HTMLSelectElement | null>(null);
  const notesAnchorRef = useRef<HTMLDivElement | null>(null);
  const deviceOtherRef = useRef<HTMLInputElement | null>(null);
  const appOtherRef = useRef<HTMLInputElement | null>(null);

  const smoothScrollTo = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    const container = scrollerRef.current;
    if (!container) {
      node.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const cRect = container.getBoundingClientRect();
    const nRect = node.getBoundingClientRect();
    const offset = nRect.top - cRect.top + container.scrollTop - cRect.height / 3;
    container.scrollTo({ top: Math.max(0, offset), behavior: "smooth" });
  }, []);

  // ─── Auto-advance: device picked → focus app select ──────────
  const handleDeviceChange = (val: string) => {
    setDevice(val);
    tapHaptic(6);
    if (val === "other") {
      // Reveal custom input + focus it. No scroll on "other".
      requestAnimationFrame(() => deviceOtherRef.current?.focus());
      return;
    }
    setDeviceOther("");
    requestAnimationFrame(() => {
      smoothScrollTo(appSelectRef.current);
      setTimeout(() => appSelectRef.current?.focus({ preventScroll: true }), 240);
    });
  };

  const handleAppChange = (val: string) => {
    setApp(val);
    tapHaptic(6);
    if (val === "other") {
      requestAnimationFrame(() => appOtherRef.current?.focus());
      return;
    }
    setAppOther("");
    // Move user to the notes / CTA region. Do NOT focus the textarea —
    // that would pop the mobile keyboard for an optional field.
    requestAnimationFrame(() => smoothScrollTo(notesAnchorRef.current));
  };

  // ─── Price-morph effect (PIÈGE C) ────────────────────────────
  const [morphing, setMorphing] = useState<"idle" | "out" | "in">("idle");
  const [displayKey, setDisplayKey] = useState<PlanKey>(initialPlanKey);
  const displayKeyRef = useRef<PlanKey>(initialPlanKey);
  displayKeyRef.current = displayKey;

  useEffect(() => {
    // Read latest displayKey via ref so this effect's identity doesn't
    // depend on it. Otherwise our own setDisplayKey at mid-point would
    // restart the effect, blow the cleanup, and leave morphing stuck.
    if (planKey === displayKeyRef.current) return;
    let alive = true;
    setMorphing("out");
    const outId = window.setTimeout(() => {
      if (!alive) return;
      setDisplayKey(planKey);
      setMorphing("in");
      const inId = window.setTimeout(() => {
        if (!alive) return;
        setMorphing("idle");
      }, MORPH_IN_MS);
      // Stash so cleanup can clear the second timer too.
      (outId as unknown as { _inId: number })._inId = inId;
    }, MORPH_OUT_MS);
    return () => {
      alive = false;
      window.clearTimeout(outId);
      const stashed = (outId as unknown as { _inId?: number })._inId;
      if (stashed) window.clearTimeout(stashed);
    };
  }, [planKey]);

  // ─── Close on Escape + lock body scroll when open ────────────
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // ─── Resolved labels ─────────────────────────────────────────
  const currentPlan = plans.find((p) => p.key === planKey)!;
  const displayPlan = plans.find((p) => p.key === displayKey) ?? currentPlan;

  const deviceLabel =
    device === "other"
      ? deviceOther.trim()
      : TV_BRANDS.find((o) => o.value === device)?.label ?? "";
  const appLabel =
    app === "other"
      ? appOther.trim()
      : IPTV_APPS.find((o) => o.value === app)?.label ?? "";

  const step1Done = true; // duration always has a value (initialPlanKey)
  const step2Done = device !== "" && (device !== "other" || deviceOther.trim().length > 0);
  const step3Done = app !== "" && (app !== "other" || appOther.trim().length > 0);

  // ─── Build WhatsApp link ─────────────────────────────────────
  const waLink = useMemo(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const mobile = isMobileUA(ua);
    const pagePath =
      typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : "/";
    const planLabel = `${t.planNames[currentPlan.key]} (${currentPlan.months}m)`;
    const message = buildWhatsAppMessage({
      intro: t.checkout.waIntro,
      planLabel,
      total: planTotal(currentPlan),
      currencyLabel: SITE.currencyLabel,
      device: deviceLabel ? `${t.checkout.recapDevice}: ${deviceLabel}` : "",
      app: appLabel ? `${t.checkout.recapApp}: ${appLabel}` : "",
      pagePath,
      pageLabel: t.checkout.waContext,
      notes: notes.trim(),
      notesLabel: t.checkout.waNotesLabel,
    });
    const text = encodeURIComponent(message);
    return mobile
      ? `https://wa.me/${SITE.whatsappPhone}?text=${text}`
      : `https://api.whatsapp.com/send?phone=${SITE.whatsappPhone}&text=${text}`;
  }, [
    currentPlan,
    deviceLabel,
    appLabel,
    notes,
    t.checkout.recapDevice,
    t.checkout.recapApp,
    t.checkout.waIntro,
    t.checkout.waContext,
    t.checkout.waNotesLabel,
    t.planNames,
  ]);

  // ─── Submit via synthetic <a>.click() so analytics fires ─────
  const sendToWhatsApp = useCallback(() => {
    tapHaptic(14);
    track("whatsapp_click", {
      placement: "PriceCheckout",
      source: source ?? "unknown",
      plan_key: currentPlan.key,
      months: currentPlan.months,
      price: currentPlan.price,
      device: deviceLabel || "unspecified",
      app: appLabel || "unspecified",
      has_notes: notes.trim().length > 0,
    });
    const a = document.createElement("a");
    a.href = waLink;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      try {
        document.body.removeChild(a);
      } catch {}
    }, 0);
  }, [waLink, source, currentPlan, deviceLabel, appLabel, notes]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  // ─── RENDER ──────────────────────────────────────────────────
  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.checkout.title}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Topbar */}
      <div
        className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-white/10"
        style={{ background: "rgba(8,5,12,0.85)", flexShrink: 0 }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-semibold tracking-tight text-white truncate">
            {SITE.brand}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
            <ShieldCheck size={12} aria-hidden="true" />
            {t.checkout.secureBadge}
          </span>
        </div>
        <button
          type="button"
          aria-label={t.checkout.close}
          onClick={() => {
            tapHaptic(6);
            onClose();
          }}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 hover:bg-white/10 active:scale-95"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Scrollable two-pane body */}
      <div
        ref={scrollerRef}
        className="flex-1 overflow-y-auto overscroll-contain"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="mx-auto grid w-full max-w-[1180px] gap-6 px-4 sm:px-6 py-6 md:py-8 md:grid-cols-[1.5fr_1fr] md:gap-8">
          {/* ── FORM (left) ────────────────────────────────── */}
          <div className="min-w-0">
            <h2
              className="font-bold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", letterSpacing: "-0.02em" }}
            >
              {t.checkout.title}
            </h2>

            {/* ─ Step 1: Duration ──────────────────────── */}
            <section className="mt-6">
              <header className="flex items-center gap-2.5">
                <StepBadge done={step1Done} n={1} />
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-widest text-white/50">
                    {t.checkout.step1Label}
                  </div>
                  <div className="text-base font-semibold text-white">
                    {t.checkout.step1Title}
                  </div>
                </div>
              </header>
              <fieldset className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                <legend className="sr-only">{t.checkout.step1Title}</legend>
                {plans.map((p) => {
                  const selected = p.key === planKey;
                  const perMonth = planPerMonth(p);
                  return (
                    <label
                      key={p.key}
                      className={`group relative flex cursor-pointer flex-col gap-1 rounded-2xl border p-3 transition-all active:scale-[0.98] ${
                        selected
                          ? "border-[#FFB81C]/70 bg-gradient-to-b from-[#1a1207] to-[#0a0a0a] shadow-[0_0_0_2px_rgba(255,184,28,0.25),0_18px_40px_-20px_rgba(255,184,28,0.35)]"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={p.key}
                        checked={selected}
                        onChange={() => {
                          setPlanKey(p.key);
                          tapHaptic(8);
                        }}
                        className="sr-only"
                        aria-label={`${t.planNames[p.key]} ${SITE.currencyLabel}${p.price}`}
                      />
                      <div className="text-xs font-medium text-white/70">
                        {t.planNames[p.key]}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-semibold text-[#E0152D]">
                          {SITE.currencyLabel}
                        </span>
                        <span className="text-2xl font-extrabold text-white leading-none">
                          {perMonth}
                        </span>
                        <span className="text-[11px] text-white/60">
                          {t.offers.perMonth}
                        </span>
                      </div>
                      <span
                        className="mt-0.5 inline-flex w-fit items-center rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-medium text-white/70"
                        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                      >
                        {SITE.currencyLabel}
                        {p.price} {t.checkout.pillTotal}
                      </span>
                      {p.highlight ? (
                        <span className="absolute -top-2 right-2 rounded-full bg-[#FFB81C] px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-black">
                          {t.offers.bestSeller}
                        </span>
                      ) : null}
                    </label>
                  );
                })}
              </fieldset>
            </section>

            {/* ─ Step 2: Device ────────────────────────── */}
            <section className="mt-7">
              <header className="flex items-center gap-2.5">
                <StepBadge done={step2Done} n={2} />
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-widest text-white/50">
                    {t.checkout.step2Label}
                  </div>
                  <div className="text-base font-semibold text-white">
                    {t.checkout.step2Title}
                  </div>
                </div>
              </header>
              <div className="mt-3 rounded-2xl border border-white/12 bg-black/40 focus-within:border-[#FFD96A]/60">
                <select
                  ref={deviceSelectRef}
                  value={device}
                  onChange={(e) => handleDeviceChange(e.target.value)}
                  className="block w-full bg-transparent px-4 py-3.5 text-base text-white outline-none"
                  aria-label={t.checkout.step2Title}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23ffffff80' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 14px center",
                    paddingRight: 40,
                  }}
                >
                  <option value="" disabled>
                    {t.checkout.step2Placeholder}
                  </option>
                  {TV_BRANDS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              {device === "other" ? (
                <input
                  ref={deviceOtherRef}
                  type="text"
                  value={deviceOther}
                  onChange={(e) => setDeviceOther(e.target.value)}
                  placeholder={t.checkout.otherSpecify}
                  className="mt-2 block w-full rounded-2xl border border-white/12 bg-black/40 px-4 py-3 text-base text-white outline-none placeholder:text-white/30 focus:border-[#FFD96A]/60"
                  aria-label={t.checkout.otherSpecify}
                />
              ) : null}
            </section>

            {/* ─ Step 3: App ───────────────────────────── */}
            <section className="mt-7">
              <header className="flex items-center gap-2.5">
                <StepBadge done={step3Done} n={3} />
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-widest text-white/50">
                    {t.checkout.step3Label}
                  </div>
                  <div className="text-base font-semibold text-white">
                    {t.checkout.step3Title}
                  </div>
                </div>
              </header>
              <div className="mt-3 rounded-2xl border border-white/12 bg-black/40 focus-within:border-[#FFD96A]/60">
                <select
                  ref={appSelectRef}
                  value={app}
                  onChange={(e) => handleAppChange(e.target.value)}
                  className="block w-full bg-transparent px-4 py-3.5 text-base text-white outline-none"
                  aria-label={t.checkout.step3Title}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23ffffff80' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 14px center",
                    paddingRight: 40,
                  }}
                >
                  <option value="" disabled>
                    {t.checkout.step3Placeholder}
                  </option>
                  {IPTV_APPS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              {app === "other" ? (
                <input
                  ref={appOtherRef}
                  type="text"
                  value={appOther}
                  onChange={(e) => setAppOther(e.target.value)}
                  placeholder={t.checkout.otherSpecify}
                  className="mt-2 block w-full rounded-2xl border border-white/12 bg-black/40 px-4 py-3 text-base text-white outline-none placeholder:text-white/30 focus:border-[#FFD96A]/60"
                  aria-label={t.checkout.otherSpecify}
                />
              ) : null}
            </section>

            {/* ─ Step 4: Notes ─────────────────────────── */}
            <section className="mt-7" ref={notesAnchorRef}>
              <header className="flex items-center gap-2.5">
                <StepBadge done={notes.trim().length > 0} n={4} />
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-widest text-white/50">
                    {t.checkout.step4Label}
                  </div>
                  <div className="text-base font-semibold text-white">
                    {t.checkout.step4Title}
                  </div>
                </div>
              </header>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.checkout.step4Placeholder}
                rows={3}
                className="mt-3 block w-full rounded-2xl border border-white/12 bg-black/40 px-4 py-3 text-base text-white outline-none placeholder:text-white/30 focus:border-[#FFD96A]/60 resize-y"
                aria-label={t.checkout.step4Title}
              />
            </section>

            {/* Mobile bottom spacer so sticky CTA doesn't overlap last field */}
            <div className="h-28 md:h-6" aria-hidden="true" />
          </div>

          {/* ── RECAP (right) ─────────────────────────────── */}
          <aside
            className="hidden md:block"
            aria-label={t.checkout.recapTitle}
          >
            <div className="sticky top-4 rounded-3xl border border-white/12 bg-gradient-to-b from-[#15101c] to-[#0a0710] p-5 shadow-[0_30px_80px_-40px_rgba(255,184,28,0.25)]">
              <div className="text-[11px] font-medium uppercase tracking-widest text-white/50">
                {t.checkout.recapTitle}
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-white/60">{t.checkout.recapPlan}</span>
                  <span className="font-medium text-white text-right">
                    <MorphValue morphing={morphing}>
                      {t.planNames[displayPlan.key]}
                    </MorphValue>
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-white/60">{t.checkout.recapDevice}</span>
                  <span className="font-medium text-white text-right">
                    {deviceLabel || (
                      <span className="text-white/40">{t.checkout.recapEmpty}</span>
                    )}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-white/60">{t.checkout.recapApp}</span>
                  <span className="font-medium text-white text-right">
                    {appLabel || (
                      <span className="text-white/40">{t.checkout.recapEmpty}</span>
                    )}
                  </span>
                </div>
                {notes.trim() ? (
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-white/60">{t.checkout.recapNotes}</span>
                    <span
                      className="font-medium text-white text-right max-w-[60%] truncate"
                      title={notes.trim()}
                    >
                      {notes.trim()}
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="my-5 h-px w-full bg-white/10" />

              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-widest text-white/50">
                    {t.offers.totalLabel}
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-xl font-semibold text-[#E0152D]">
                      {SITE.currencyLabel}
                    </span>
                    <span
                      className="font-extrabold text-white leading-none"
                      style={{ fontSize: 44 }}
                    >
                      <MorphValue morphing={morphing}>
                        {planTotal(displayPlan)}
                      </MorphValue>
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/80">
                  <MorphValue morphing={morphing}>
                    {t.checkout.pillBilledOnce}
                  </MorphValue>
                </span>
              </div>

              <button
                type="button"
                onClick={sendToWhatsApp}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-base font-semibold text-black shadow-[0_10px_30px_rgba(37,211,102,0.35)] hover:bg-[#1ebd5b] active:scale-95 transition"
              >
                <MessageCircle size={18} aria-hidden="true" />
                {t.checkout.cta}
                <ChevronRight size={18} aria-hidden="true" />
              </button>

              <ul className="mt-5 grid grid-cols-2 gap-2.5">
                {t.checkout.badges.map((b) => (
                  <li
                    key={b.title}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2"
                  >
                    <div className="text-[12px] font-semibold text-white">
                      {b.title}
                    </div>
                    <div className="text-[11px] text-white/55">{b.desc}</div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div
        className="md:hidden border-t border-white/10"
        style={{
          background: "rgba(8,5,12,0.92)",
          paddingBottom: "env(safe-area-inset-bottom)",
          flexShrink: 0,
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-widest text-white/50">
              {t.offers.totalLabel}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-semibold text-[#E0152D]">
                {SITE.currencyLabel}
              </span>
              <span className="text-2xl font-extrabold text-white leading-none">
                <MorphValue morphing={morphing}>
                  {planTotal(displayPlan)}
                </MorphValue>
              </span>
              <span className="ml-1 inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/80">
                <MorphValue morphing={morphing}>
                  {t.checkout.pillBilledOnce}
                </MorphValue>
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={sendToWhatsApp}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(37,211,102,0.35)] active:scale-95 transition"
          >
            <MessageCircle size={16} aria-hidden="true" />
            {t.checkout.cta}
          </button>
        </div>
      </div>
    </div>
  );

  // PIÈGE A: portal to body so no transformed ancestor steals position:fixed.
  return createPortal(overlay, document.body);
}
