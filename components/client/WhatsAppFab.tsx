"use client";
// components/client/WhatsAppFab.tsx
// Single floating WhatsApp action button — Material-style FAB sitting
// bottom-right. Replaces the trio of overlays the old home rendered
// (chat overlay + live activity badge + PWA bar) per the brief's mobile
// UX guidance (Section N.4 — drastic overlay reduction).

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { LOCALE_META, type Locale } from "../../lib/locales";
import { SITE } from "../shared/site";

const PREFILL: Record<Locale, string> = {
  "en-za": "Hi! I'd like a free 24h Mzansi Stream trial.",
  "en-gb": "Hi! I'd like a free 24h Mzansi Stream trial.",
  "en-au": "Hi! I'd like a free 24h Mzansi Stream trial.",
  "en-us": "Hi! I'd like a free 24h Mzansi Stream trial.",
  "en-ae": "Hi! I'd like a free 24h Mzansi Stream trial.",
  "en-nz": "Hi! I'd like a free 24h Mzansi Stream trial.",
  "en-zw": "Hi! I'd like a free 24h Mzansi Stream Zimbabwe trial.",
  af: "Hallo! Ek wil graag begin met die gratis 24-uur Mzansi Stream toets.",
  zu: "Sawubona! Ngifuna ukulinga kwamahhala kwama-24h kwe-Mzansi Stream.",
  xh: "Molo! Ndingathanda uvavanyo lwasimahla lweyure ezingama-24 lwe-Mzansi Stream.",
  "pt-mz": "Olá! Gostaria de um teste grátis de 24h do Mzansi Stream.",
  fr: "Bonjour ! Je souhaite un essai gratuit de 24h Mzansi Stream.",
};

function readEnv(key: string): string | undefined {
  // Next.js inlines `process.env.NEXT_PUBLIC_*` at build time, but a
  // bracket access is opaque to that step. We only call this with
  // known keys; values get baked in below via a switch.
  switch (key) {
    case "NEXT_PUBLIC_WHATSAPP_ZA":
      return process.env.NEXT_PUBLIC_WHATSAPP_ZA;
    case "NEXT_PUBLIC_WHATSAPP_ZW":
      return process.env.NEXT_PUBLIC_WHATSAPP_ZW;
    case "NEXT_PUBLIC_WHATSAPP_MZ":
      return process.env.NEXT_PUBLIC_WHATSAPP_MZ;
    case "NEXT_PUBLIC_WHATSAPP_BW":
      return process.env.NEXT_PUBLIC_WHATSAPP_BW;
    case "NEXT_PUBLIC_WHATSAPP_NA":
      return process.env.NEXT_PUBLIC_WHATSAPP_NA;
    case "NEXT_PUBLIC_WHATSAPP_LS":
      return process.env.NEXT_PUBLIC_WHATSAPP_LS;
    case "NEXT_PUBLIC_WHATSAPP_SZ":
      return process.env.NEXT_PUBLIC_WHATSAPP_SZ;
    case "NEXT_PUBLIC_WHATSAPP_ZM":
      return process.env.NEXT_PUBLIC_WHATSAPP_ZM;
    case "NEXT_PUBLIC_WHATSAPP_MW":
      return process.env.NEXT_PUBLIC_WHATSAPP_MW;
    case "NEXT_PUBLIC_WHATSAPP_DEFAULT":
      return process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT;
    default:
      return undefined;
  }
}

export function WhatsAppFab() {
  const { lang } = useLang();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const meta = LOCALE_META[lang];
  const number =
    readEnv(meta.whatsappEnvKey) ||
    readEnv("NEXT_PUBLIC_WHATSAPP_DEFAULT") ||
    SITE.whatsappPhone;
  const message = PREFILL[lang] ?? PREFILL["en-za"];
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      className="waFab"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Open WhatsApp chat"
    >
      <svg
        viewBox="0 0 32 32"
        width="28"
        height="28"
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M16 .395a15.605 15.605 0 0 0-13.4 23.6L.395 31.605l7.793-2.06A15.605 15.605 0 1 0 16 .395Zm0 28.6a13 13 0 0 1-6.625-1.8l-.475-.275-4.625 1.225 1.25-4.525-.3-.475A13 13 0 1 1 16 28.995Zm7.075-9.55c-.4-.2-2.35-1.15-2.7-1.275-.35-.125-.625-.2-.9.2s-1.025 1.275-1.25 1.525c-.225.25-.475.275-.875.1a10.575 10.575 0 0 1-3.1-1.925 11.6 11.6 0 0 1-2.15-2.65c-.225-.4 0-.6.175-.825.175-.225.4-.425.6-.65.2-.225.275-.4.4-.65.125-.25.05-.475-.025-.65-.075-.175-.875-2.1-1.2-2.85-.325-.75-.65-.625-.875-.625a1.6 1.6 0 0 0-1.225.575 3.625 3.625 0 0 0-1.125 2.7 6.275 6.275 0 0 0 1.325 3.4c.175.225 2.4 3.65 5.825 5.125a19.575 19.575 0 0 0 1.95.725 4.575 4.575 0 0 0 2.05.125 3.35 3.35 0 0 0 2.2-1.525 2.7 2.7 0 0 0 .2-1.525c-.1-.175-.4-.275-.825-.475Z" />
      </svg>
    </a>
  );
}
