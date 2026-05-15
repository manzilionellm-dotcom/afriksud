"use client";
// components/client/LocaleSwitcher.tsx
// Switcher that lists the 12 P0 locales with their native-language labels.
// Used in both desktop header and mobile drawer.

import React from "react";
import { useLang } from "./LanguageProvider";
import { LOCALES, LOCALE_META, type Locale } from "../../lib/locales";

type Props = {
  variant?: "desktop" | "mobile";
  onSelect?: (locale: Locale) => void;
};

export function LocaleSwitcher({ variant = "desktop", onSelect }: Props) {
  const { lang, setLang } = useLang();

  const handleClick = (locale: Locale) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setLang(locale);
    onSelect?.(locale);
  };

  return (
    <div
      className={variant === "mobile" ? "mobileLangSwitch" : "langSwitch"}
      role="group"
      aria-label="Choose your language"
    >
      {LOCALES.map((locale) => {
        const meta = LOCALE_META[locale];
        const active = lang === locale;
        return (
          <button
            key={locale}
            type="button"
            onClick={handleClick(locale)}
            className={`langBtn ${active ? "active" : ""}`}
            lang={meta.hreflang}
            data-hreflang={meta.hreflang}
            aria-label={`${meta.nativeName} (${meta.hreflang})`}
            aria-current={active ? "true" : undefined}
          >
            <span aria-hidden="true">{meta.flag}</span>
            <span>{meta.nativeName}</span>
          </button>
        );
      })}
    </div>
  );
}
