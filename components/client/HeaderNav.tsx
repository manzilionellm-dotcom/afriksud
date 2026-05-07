"use client";
// components/client/HeaderNav.tsx

import React, { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { dict } from "../shared/dict";
import { MzansiLogo } from "../shared/MzansiLogo";
import { generateWhatsAppLink } from "../shared/utils";

export function HeaderNav() {
  const { lang, setLang } = useLang();
  const t = dict[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [ua, setUA] = useState("");

  useEffect(() => {
    setUA(navigator.userAgent);
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    (installPrompt as unknown as { prompt: () => void }).prompt();
    (installPrompt as unknown as { userChoice: Promise<{ outcome: string }> })
      .userChoice.then((c) => { if (c.outcome === "accepted") setInstallPrompt(null); });
  };

  const navLinks = [
    { href: "#offers",        label: t.nav.offers },
    { href: "#channels",      label: t.nav.channels },
    { href: "#countries",     label: t.nav.countries },
    { href: "#international", label: t.nav.international },
    { href: "#devices",       label: t.nav.devices },
    { href: "#cities",        label: t.nav.cities },
    { href: "#faq",           label: t.nav.faq },
    { href: "#setup",         label: t.nav.setup },
  ];

  return (
    <>
      <header className="header">
        <nav className="nav">
          <a href="#" className="brand" aria-label="Mzansi Stream">
            <MzansiLogo size={34} showText={true} />
          </a>
          <div className="links">
            {navLinks.map(l => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
            <div className="langSwitch">
              <button
                onClick={() => setLang("en")}
                className={`langBtn ${lang === "en" ? "active" : ""}`}
                aria-label="English"
              >EN</button>
              <button
                onClick={() => setLang("af")}
                className={`langBtn ${lang === "af" ? "active" : ""}`}
                aria-label="Afrikaans"
              >AF</button>
              <button
                onClick={() => setLang("fr")}
                className={`langBtn ${lang === "fr" ? "active" : ""}`}
                aria-label="Français"
              >FR</button>
            </div>
            {installPrompt && (
              <button onClick={handleInstallClick} className="installBtn" type="button">
                📲 {t.nav.install}
              </button>
            )}
          </div>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
            type="button"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className="mobileMenu" onClick={() => setMenuOpen(false)}>
          <div className="mobileMenuLogo">
            <MzansiLogo size={40} showText={true} />
          </div>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="mobileLangSwitch">
            <button
              onClick={(e) => { e.stopPropagation(); setLang("en"); }}
              className={`langBtn ${lang === "en" ? "active" : ""}`}
            >EN</button>
            <button
              onClick={(e) => { e.stopPropagation(); setLang("af"); }}
              className={`langBtn ${lang === "af" ? "active" : ""}`}
            >AF</button>
            <button
              onClick={(e) => { e.stopPropagation(); setLang("fr"); }}
              className={`langBtn ${lang === "fr" ? "active" : ""}`}
            >FR</button>
          </div>
          <a
            className="btnPrimary"
            href={generateWhatsAppLink(t.whatsapp.generic, ua, "Mobile-Menu")}
            target="_blank"
            rel="noreferrer"
            style={{ textAlign: "center", marginTop: 8 }}
          >
            💬 WhatsApp
          </a>
        </div>
      )}
    </>
  );
}
