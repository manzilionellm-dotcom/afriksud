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
import { useWaPrefillOverride } from "./WaPrefillContext";

const PREFILL: Record<Locale, string> = {
  "en-za": "Hi Mzansi — 24h trial. City + device:",
  "en-gb": "Hi Mzansi — 24h trial. City + device:",
  "en-au": "Hi Mzansi — 24h trial. City + device:",
  "en-us": "Hi Mzansi — 24h trial. City + device:",
  "en-ae": "Hi Mzansi — 24h trial. City + device:",
  "en-nz": "Hi Mzansi — 24h trial. City + device:",
  "en-zw": "Hi Mzansi Zimbabwe — 24h trial. City + device:",
  af: "Hallo Mzansi — 24-uur toets. Stad + toestel:",
  zu: "Sawubona Mzansi — 24h trial. Idolobha + idivayisi:",
  xh: "Molo Mzansi — 24h trial. Isixeko + isixhobo:",
  "pt-mz": "Olá Mzansi — teste 24h. Cidade + dispositivo:",
  fr: "Bonjour Mzansi — essai 24h. Ville + appareil :",
};

function readEnv(key: string): string | undefined {
  // Single number for every brand. Per-locale keys still accepted so
  // existing Vercel env names keep working — they must all be 447307410512.
  const mzansi =
    process.env.NEXT_PUBLIC_WHATSAPP_MZANSI ||
    process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT ||
    process.env.NEXT_PUBLIC_WHATSAPP_ZA ||
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE;
  switch (key) {
    case "NEXT_PUBLIC_WHATSAPP_ZA":
      return process.env.NEXT_PUBLIC_WHATSAPP_ZA || mzansi;
    case "NEXT_PUBLIC_WHATSAPP_ZW":
      return process.env.NEXT_PUBLIC_WHATSAPP_ZW || mzansi;
    case "NEXT_PUBLIC_WHATSAPP_MZ":
      return process.env.NEXT_PUBLIC_WHATSAPP_MZ || mzansi;
    case "NEXT_PUBLIC_WHATSAPP_BW":
      return process.env.NEXT_PUBLIC_WHATSAPP_BW || mzansi;
    case "NEXT_PUBLIC_WHATSAPP_NA":
      return process.env.NEXT_PUBLIC_WHATSAPP_NA || mzansi;
    case "NEXT_PUBLIC_WHATSAPP_LS":
      return process.env.NEXT_PUBLIC_WHATSAPP_LS || mzansi;
    case "NEXT_PUBLIC_WHATSAPP_SZ":
      return process.env.NEXT_PUBLIC_WHATSAPP_SZ || mzansi;
    case "NEXT_PUBLIC_WHATSAPP_ZM":
      return process.env.NEXT_PUBLIC_WHATSAPP_ZM || mzansi;
    case "NEXT_PUBLIC_WHATSAPP_MW":
      return process.env.NEXT_PUBLIC_WHATSAPP_MW || mzansi;
    case "NEXT_PUBLIC_WHATSAPP_DEFAULT":
      return mzansi;
    default:
      return mzansi;
  }
}

export function WhatsAppFab() {
  const { lang } = useLang();
  const waOverride = useWaPrefillOverride();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const meta = LOCALE_META[lang];
  const number =
    readEnv(meta.whatsappEnvKey) ||
    readEnv("NEXT_PUBLIC_WHATSAPP_DEFAULT") ||
    SITE.whatsappPhone ||
    "447307410512";
  const message = PREFILL[lang] ?? PREFILL["en-za"];
  const href =
    waOverride?.href ??
    `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      className="waFab"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Open WhatsApp chat"
      data-track-ref="WhatsApp-Fab"
      data-track-placement="Floating-Action-Button"
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
