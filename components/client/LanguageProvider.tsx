"use client";
// components/client/LanguageProvider.tsx
// Trilingual EN/AF/FR with auto-detect from browser + URL ?lang=

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Locale, LangCtx } from "../shared/types";

const LanguageContext = createContext<LangCtx>({
  lang: "en",
  setLang: () => {},
});

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";

  // 1. URL ?lang= takes priority
  try {
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    if (urlLang === "en" || urlLang === "af" || urlLang === "fr") return urlLang;
  } catch {}

  // 2. Stored choice
  try {
    const stored = localStorage.getItem("mz_lang");
    if (stored === "en" || stored === "af" || stored === "fr") return stored;
  } catch {}

  // 3. Browser language detection
  const nav = navigator.language || (navigator.languages && navigator.languages[0]) || "en";
  const lower = nav.toLowerCase();
  if (lower.startsWith("af")) return "af";
  if (lower.startsWith("fr")) return "fr";
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>("en");

  useEffect(() => {
    const detected = detectLocale();
    setLangState(detected);
    if (typeof document !== "undefined") {
      document.documentElement.lang = detected;
    }
  }, []);

  const setLang = (l: Locale) => {
    setLangState(l);
    try { localStorage.setItem("mz_lang", l); } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
