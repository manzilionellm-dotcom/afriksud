"use client";
// components/ux/StickyHeader.tsx
// Frosted sticky header: transparent at scrollY=0, blurs + darkens past 8px.
// Replaces the legacy HeaderNav. Keeps the existing LanguageProvider context.

import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useLang } from "../client/LanguageProvider";
import { dict } from "../shared/dict";
import { MzansiLogo } from "../shared/MzansiLogo";
import { LocaleSwitcher } from "../client/LocaleSwitcher";
import { MobileMenuSheet } from "./MobileMenuSheet";
import { tapHaptic } from "./haptic";

export function StickyHeader() {
  const { lang } = useLang();
  const t = dict[lang];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#offers", label: t.nav.offers },
    { href: "#channels", label: t.nav.channels },
    { href: "#countries", label: t.nav.countries },
    { href: "#international", label: t.nav.international },
    { href: "#devices", label: t.nav.devices },
    { href: "#cities", label: t.nav.cities },
    { href: "#faq", label: t.nav.faq },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <nav className="mx-auto flex h-14 md:h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 shrink-0" aria-label="Mzansi Stream">
            <MzansiLogo size={32} showText={true} />
          </a>
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
            <LocaleSwitcher variant="desktop" />
          </div>
          <button
            type="button"
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full text-white/90 hover:bg-white/10 active:scale-95 transition-transform"
            onClick={() => {
              tapHaptic();
              setMenuOpen(true);
            }}
            aria-label={t.nav.offers + " menu"}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </nav>
      </header>
      <MobileMenuSheet
        open={menuOpen}
        onOpenChange={setMenuOpen}
        navLinks={navLinks}
      />
    </>
  );
}
