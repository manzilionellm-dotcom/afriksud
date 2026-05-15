"use client";
// components/client/SkipLink.tsx
// WCAG-required skip link. Localised label per active locale.

import { useLang } from "./LanguageProvider";

const LABELS: Record<string, string> = {
  "en-za": "Skip to content",
  "en-gb": "Skip to content",
  "en-au": "Skip to content",
  "en-us": "Skip to content",
  "en-ae": "Skip to content",
  "en-nz": "Skip to content",
  "en-zw": "Skip to content",
  af: "Spring na inhoud",
  zu: "Yeqela kokuqukethwe",
  xh: "Tsibela kokuqulethweyo",
  "pt-mz": "Saltar para o conteúdo",
  fr: "Aller au contenu",
};

export function SkipLink() {
  const { lang } = useLang();
  const label = LABELS[lang] ?? LABELS["en-za"];
  return (
    <a href="#main-content" className="skip-link">
      {label}
    </a>
  );
}
