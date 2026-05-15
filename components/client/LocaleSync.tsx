"use client";
// components/client/LocaleSync.tsx
// Bridges the URL-derived locale (server) and the client LanguageProvider
// so visiting /{locale} on first load aligns the dictionary and the
// document `lang` / `dir` before LanguageProvider's own detection kicks in.

import { useEffect } from "react";
import { useLang } from "./LanguageProvider";
import type { Locale } from "../../lib/locales";

export function LocaleSync({ locale }: { locale: Locale }) {
  const { lang, setLang } = useLang();
  useEffect(() => {
    if (lang !== locale) setLang(locale);
    // We only sync on initial mount when the URL locale and current
    // context disagree. Subsequent user-driven switches stay in control.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);
  return null;
}
