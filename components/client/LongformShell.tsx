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
import { PriceCheckoutMount } from "../ux/checkout/PriceCheckoutMount";
import {
  WaPrefillProvider,
  type WaPrefillOverride,
} from "./WaPrefillContext";

export function LongformShell({
  locale,
  children,
  waOverride = null,
}: {
  locale: Locale;
  children: React.ReactNode;
  /** Page-scoped WA href for chrome that bleeds onto this URL. */
  waOverride?: WaPrefillOverride | null;
}) {
  return (
    <LanguageProvider>
      <WaPrefillProvider value={waOverride}>
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
        <PriceCheckoutMount />
      </WaPrefillProvider>
    </LanguageProvider>
  );
}
