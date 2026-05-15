"use client";
// components/client/PopiaConsentBanner.tsx
// POPIA + Omnibus-compliant cookie banner.
// Three buttons of equal weight: Accept all / Reject all / Customize.
// No non-essential cookies are loaded before a positive choice is made.

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import type { Locale } from "../../lib/locales";

const STORAGE_KEY = "mz_consent";

type Consent = "accepted" | "rejected" | "custom" | null;

const COPY: Record<
  Locale,
  { body: string; accept: string; reject: string; customize: string }
> = {
  "en-za": {
    body: "We use cookies to improve your experience. By clicking 'Accept all' you agree to our cookie policy.",
    accept: "Accept all",
    reject: "Reject all",
    customize: "Customize",
  },
  "en-gb": {
    body: "We use cookies to improve your experience. By clicking 'Accept all' you agree to our cookie policy.",
    accept: "Accept all",
    reject: "Reject all",
    customize: "Customize",
  },
  "en-au": {
    body: "We use cookies to improve your experience. By clicking 'Accept all' you agree to our cookie policy.",
    accept: "Accept all",
    reject: "Reject all",
    customize: "Customise",
  },
  "en-us": {
    body: "We use cookies to improve your experience. By clicking 'Accept all' you agree to our cookie policy.",
    accept: "Accept all",
    reject: "Reject all",
    customize: "Customize",
  },
  "en-ae": {
    body: "We use cookies to improve your experience. By clicking 'Accept all' you agree to our cookie policy.",
    accept: "Accept all",
    reject: "Reject all",
    customize: "Customise",
  },
  "en-nz": {
    body: "We use cookies to improve your experience. By clicking 'Accept all' you agree to our cookie policy.",
    accept: "Accept all",
    reject: "Reject all",
    customize: "Customise",
  },
  "en-zw": {
    body: "We use cookies to improve your experience. By clicking 'Accept all' you agree to our cookie policy.",
    accept: "Accept all",
    reject: "Reject all",
    customize: "Customize",
  },
  af: {
    body: "Ons gebruik koekies om jou ervaring te verbeter. Deur 'Aanvaar alles' te kliek, stem jy in tot ons koekiebeleid.",
    accept: "Aanvaar alles",
    reject: "Verwerp alles",
    customize: "Pas aan",
  },
  zu: {
    body: "Sisebenzisa amakhukhi ukuthuthukisa okuhlangenwe nakho kwakho. Ngokuchofoza 'Yamukela konke' uyavuma inqubomgomo yethu yamakhukhi.",
    accept: "Yamukela konke",
    reject: "Yenqaba konke",
    customize: "Lungisa",
  },
  xh: {
    body: "Sisebenzisa iikuki ukuphucula amava akho. Ngokucofa 'Yamkela zonke' uyavuma kumgaqo-nkqubo wethu weekuki.",
    accept: "Yamkela zonke",
    reject: "Yala zonke",
    customize: "Lungisa",
  },
  "pt-mz": {
    body: "Usamos cookies para melhorar a sua experiência. Ao clicar em 'Aceitar tudo' aceita a nossa política de cookies.",
    accept: "Aceitar tudo",
    reject: "Rejeitar tudo",
    customize: "Personalizar",
  },
  fr: {
    body: "Nous utilisons des cookies pour améliorer votre expérience. En cliquant sur 'Tout accepter', vous acceptez notre politique de cookies.",
    accept: "Tout accepter",
    reject: "Tout refuser",
    customize: "Personnaliser",
  },
};

export function PopiaConsentBanner() {
  const { lang } = useLang();
  const [consent, setConsent] = useState<Consent>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
      setConsent(stored);
    } catch {}
    setHydrated(true);
  }, []);

  const record = (value: Exclude<Consent, null>) => {
    setConsent(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    // Tracking scripts read `mz_consent` from localStorage before
    // initialising — we dispatch a custom event so they can wake up.
    window.dispatchEvent(new CustomEvent("mz:consent", { detail: value }));
  };

  if (!hydrated || consent !== null) return null;

  const copy = COPY[lang] ?? COPY["en-za"];

  return (
    <div className="popiaBanner" role="dialog" aria-label="Cookie consent">
      <p className="popiaBannerText">
        {copy.body}{" "}
        <a href={`/${lang}/legal/cookies/`} className="popiaBannerLink">
          Cookie policy
        </a>
      </p>
      <div className="popiaBannerActions">
        <button
          type="button"
          className="popiaBtn popiaBtnAccept"
          onClick={() => record("accepted")}
        >
          {copy.accept}
        </button>
        <button
          type="button"
          className="popiaBtn popiaBtnReject"
          onClick={() => record("rejected")}
        >
          {copy.reject}
        </button>
        <button
          type="button"
          className="popiaBtn popiaBtnCustomize"
          onClick={() => record("custom")}
        >
          {copy.customize}
        </button>
      </div>
    </div>
  );
}
