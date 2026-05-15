"use client";
// components/client/LanguageProvider.tsx
// Locale resolution for the 12 P0 markets. Detection priority:
//   1. URL `?lang=` (explicit override, e.g. shared link from a campaign)
//   2. Cookie `NEXT_LOCALE` (returning visitors keep their choice)
//   3. localStorage fallback for older sessions migrating off `mz_lang`
//   4. Geo hint injected at build time via <meta name="x-mz-country">
//      (populated by the edge / middleware in a follow-up PR)
//   5. Accept-Language → navigator.language
//   6. DEFAULT_LOCALE (en-za)

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  DEFAULT_LOCALE,
  localeFromAcceptLanguage,
  localeFromCountry,
  normalizeLocale,
  LOCALE_META,
  type Locale,
} from "../../lib/locales";
import type { LangCtx } from "../shared/types";

const COOKIE_NAME = "NEXT_LOCALE";
const COOKIE_MAX_AGE_DAYS = 365;
const LEGACY_STORAGE_KEY = "mz_lang";

const LanguageContext = createContext<LangCtx>({
  lang: DEFAULT_LOCALE,
  setLang: () => {},
});

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function readGeoHint(): string | null {
  if (typeof document === "undefined") return null;
  const meta = document.querySelector('meta[name="x-mz-country"]');
  return meta?.getAttribute("content") ?? null;
}

function detectLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  // 1. URL ?lang= takes priority.
  try {
    const fromUrl = normalizeLocale(
      new URLSearchParams(window.location.search).get("lang")
    );
    if (fromUrl) return fromUrl;
  } catch {}

  // 2. NEXT_LOCALE cookie.
  const fromCookie = normalizeLocale(readCookie(COOKIE_NAME));
  if (fromCookie) return fromCookie;

  // 3. Legacy localStorage value from the previous 3-locale switcher.
  try {
    const stored = normalizeLocale(localStorage.getItem(LEGACY_STORAGE_KEY));
    if (stored) return stored;
  } catch {}

  // 4. Geo hint emitted by the edge / middleware.
  const fromGeo = readGeoHint();
  if (fromGeo) return localeFromCountry(fromGeo);

  // 5. Accept-Language / navigator.language.
  if (typeof navigator !== "undefined") {
    const langs = navigator.languages?.length
      ? navigator.languages.join(",")
      : navigator.language;
    const fromHeader = localeFromAcceptLanguage(langs);
    if (fromHeader) return fromHeader;
  }

  return DEFAULT_LOCALE;
}

function applyDocumentLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  const meta = LOCALE_META[locale];
  document.documentElement.lang = meta.hreflang;
  document.documentElement.dir = meta.dir;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const detected = detectLocale();
    setLangState(detected);
    applyDocumentLocale(detected);
    // Persist the resolved locale so SSR-rendered pages and follow-up
    // visits stay consistent without re-running detection from scratch.
    writeCookie(COOKIE_NAME, detected);
  }, []);

  const setLang = (l: Locale) => {
    const normalised = normalizeLocale(l) ?? DEFAULT_LOCALE;
    setLangState(normalised);
    writeCookie(COOKIE_NAME, normalised);
    try {
      // Keep legacy key in sync for any code path that still reads it.
      localStorage.setItem(LEGACY_STORAGE_KEY, normalised);
    } catch {}
    applyDocumentLocale(normalised);
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
