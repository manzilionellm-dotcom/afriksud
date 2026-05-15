"use client";
// components/ux/MobileMenuSheet.tsx
// Right-side full-height navigation drawer.

import React from "react";
import { ChevronRight } from "lucide-react";
import { Sheet } from "./Sheet";
import { useLang } from "../client/LanguageProvider";
import { dict } from "../shared/dict";
import { LocaleSwitcher } from "../client/LocaleSwitcher";
import { MzansiLogo } from "../shared/MzansiLogo";
import { tapHaptic } from "./haptic";

type NavLink = { href: string; label: string };

export function MobileMenuSheet({
  open,
  onOpenChange,
  navLinks,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  navLinks: NavLink[];
}) {
  const { lang } = useLang();
  const t = dict[lang];

  return (
    <Sheet open={open} onOpenChange={onOpenChange} direction="right">
      <div className="flex items-center justify-between py-3">
        <MzansiLogo size={32} showText={true} />
      </div>
      <nav aria-label="Mobile navigation" className="mt-2 flex flex-col">
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => {
              tapHaptic();
              onOpenChange(false);
            }}
            className="flex items-center justify-between py-3.5 ps-1 pe-2 border-b border-white/5 text-base text-white/90 hover:text-white active:scale-[0.99] transition-transform"
          >
            <span>{l.label}</span>
            <ChevronRight size={18} className="text-white/40" aria-hidden="true" />
          </a>
        ))}
        <a
          href="#setup"
          onClick={() => {
            tapHaptic();
            onOpenChange(false);
          }}
          className="flex items-center justify-between py-3.5 ps-1 pe-2 border-b border-white/5 text-base text-white/90 hover:text-white"
        >
          <span>{t.nav.setup}</span>
          <ChevronRight size={18} className="text-white/40" aria-hidden="true" />
        </a>
      </nav>
      <div className="mt-6 pt-4 border-t border-white/10">
        <p className="text-xs uppercase tracking-widest text-white/40 mb-2">
          Language
        </p>
        <LocaleSwitcher variant="mobile" onSelect={() => onOpenChange(false)} />
      </div>
    </Sheet>
  );
}
