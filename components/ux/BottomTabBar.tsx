"use client";
// components/ux/BottomTabBar.tsx
// Mobile-only sticky bottom tab bar — Netflix/Apple-style.
// Mounted on the homepage. Hides under md breakpoint.

import React, { useState } from "react";
import { Home, Tv, Sparkles, MessageCircle } from "lucide-react";
import { useLang } from "../client/LanguageProvider";
import { dict } from "../shared/dict";
import { generateWhatsAppLink } from "../shared/utils";
import { tapHaptic } from "./haptic";
import { PricingSheet } from "./PricingCarousel";

type TabKey = "home" | "channels" | "plans" | "help";

export function BottomTabBar() {
  const { lang } = useLang();
  const t = dict[lang];
  const [active, setActive] = useState<TabKey>("home");
  const [plansOpen, setPlansOpen] = useState(false);

  const handleHelp = () => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const url = generateWhatsAppLink(t.whatsapp.generic, ua, "BottomTab-Help");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const Tab = ({
    k,
    label,
    Icon,
    onClick,
    href,
  }: {
    k: TabKey;
    label: string;
    Icon: typeof Home;
    onClick?: () => void;
    href?: string;
  }) => {
    const isActive = active === k;
    const common =
      "flex-1 flex flex-col items-center justify-center gap-0.5 h-full text-[10px] font-medium tracking-wide active:scale-95 transition-transform";
    const color = isActive ? "text-[#FFD96A]" : "text-white/70";
    const content = (
      <>
        <Icon
          size={22}
          strokeWidth={isActive ? 2.4 : 2}
          aria-hidden="true"
        />
        <span>{label}</span>
        <span
          aria-hidden="true"
          className={`absolute top-0 h-[2px] w-8 rounded-full ${
            isActive ? "bg-[#FFD96A]" : "bg-transparent"
          }`}
        />
      </>
    );
    if (href) {
      return (
        <a
          href={href}
          aria-current={isActive ? "page" : undefined}
          aria-label={label}
          onClick={() => {
            tapHaptic();
            setActive(k);
          }}
          className={`${common} ${color} relative`}
        >
          {content}
        </a>
      );
    }
    return (
      <button
        type="button"
        aria-current={isActive ? "page" : undefined}
        aria-label={label}
        onClick={() => {
          tapHaptic();
          setActive(k);
          onClick?.();
        }}
        className={`${common} ${color} relative`}
      >
        {content}
      </button>
    );
  };

  return (
    <>
      <nav
        aria-label="Primary"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-black/80 backdrop-blur-xl border-t border-white/10"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex h-16 max-w-[640px] items-stretch">
          <Tab k="home" label="Home" Icon={Home} href="#" />
          <Tab k="channels" label={t.nav.channels} Icon={Tv} href="#channels" />
          <Tab
            k="plans"
            label={t.nav.offers}
            Icon={Sparkles}
            onClick={() => setPlansOpen(true)}
          />
          <Tab
            k="help"
            label={t.nav.whatsapp}
            Icon={MessageCircle}
            onClick={handleHelp}
          />
        </div>
      </nav>
      {/* Spacer so page content isn't covered. */}
      <div aria-hidden="true" className="md:hidden h-20" />
      <PricingSheet open={plansOpen} onOpenChange={setPlansOpen} />
    </>
  );
}
