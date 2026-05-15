"use client";
// components/client/LongformShell.tsx
// Standard wrapper for the programmatic content pages — keeps the page
// templates focused on their content while sharing chrome.

import type { Locale } from "../../lib/locales";
import { LanguageProvider } from "./LanguageProvider";
import { LocaleSync } from "./LocaleSync";
import { SkipLink } from "./SkipLink";
import { HeaderNav } from "./HeaderNav";
import { FooterSection } from "./LocalizedSections";
import { WhatsAppFab } from "./WhatsAppFab";
import { StickyBottomCta } from "./StickyBottomCta";
import { PopiaConsentBanner } from "./PopiaConsentBanner";

export function LongformShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <LocaleSync locale={locale} />
      <SkipLink />
      <div className="bg" />
      <HeaderNav />
      <main className="main longform" id="main-content">
        {children}
      </main>
      <FooterSection />
      <WhatsAppFab />
      <StickyBottomCta />
      <PopiaConsentBanner />
    </LanguageProvider>
  );
}
