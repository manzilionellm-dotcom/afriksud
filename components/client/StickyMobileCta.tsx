"use client";
// components/client/StickyMobileCta.tsx

import React, { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { dict } from "../shared/dict";
import { generateWhatsAppLink } from "../shared/utils";

export function StickyMobileCta() {
  const { lang } = useLang();
  const t = dict[lang];
  const [ua, setUA] = useState("");
  useEffect(() => { setUA(navigator.userAgent); }, []);

  return (
    <a
      className="stickyMobileCta"
      href={generateWhatsAppLink(t.whatsapp.trial, ua, "Sticky-Mobile")}
      target="_blank"
      rel="noreferrer"
      aria-label="Try 24h free"
    >
      {t.stickyCta}
    </a>
  );
}
