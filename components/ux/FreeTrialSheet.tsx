"use client";
// components/ux/FreeTrialSheet.tsx
// Bottom sheet with a single phone-number field → opens WhatsApp deep
// link with a pre-filled message. Visual layer only; the underlying
// link uses the existing helper so business logic is preserved.

import React, { useMemo, useState } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { Sheet } from "./Sheet";
import { useLang } from "../client/LanguageProvider";
import { dict } from "../shared/dict";
import { generateWhatsAppLink } from "../shared/utils";
import { tapHaptic } from "./haptic";

export function FreeTrialSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { lang } = useLang();
  const t = dict[lang];
  const [phone, setPhone] = useState("");

  const link = useMemo(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const base = t.whatsapp.trial;
    const withPhone = phone
      ? `${base} (callback: ${phone.trim()})`
      : base;
    return generateWhatsAppLink(withPhone, ua, "Hero-Trial-Sheet");
  }, [phone, t.whatsapp.trial]);

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      direction="bottom"
      title={t.trial.title}
      description={t.trial.sub}
    >
      <div className="mt-2 space-y-4">
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-white/50">
            {t.trial.badge}
          </span>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/15 bg-black/40 px-4 py-3 focus-within:border-[#FFD96A]/60">
            <Phone size={18} className="text-white/50" aria-hidden="true" />
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+44 7307 410512"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-transparent text-base text-white placeholder:text-white/30 outline-none"
              aria-label="Phone number"
            />
          </div>
          <p className="mt-2 text-xs text-white/50">{t.trial.note}</p>
        </label>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          onClick={() => tapHaptic(14)}
          className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-base font-semibold text-black shadow-[0_8px_24px_rgba(37,211,102,0.35)] active:scale-95 transition"
        >
          {t.trial.cta}
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </Sheet>
  );
}
