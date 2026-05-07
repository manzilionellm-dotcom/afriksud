"use client";
// components/client/LiveActivity.tsx

import React, { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { generateWhatsAppLink, getISOWeekKey, hash32, makePRNG, clamp, timeAgoLabel } from "../shared/utils";
import { SITE } from "../shared/site";

const COPY = {
  en: { live: "live", title: "Right now 🔥", subTpl: (n: number) => `${n} people are looking at pricing now.`, view: "View", visitors: "Visitors now", support: "Support", online: "Online", openCta: "Open WhatsApp", waMsg: "Hi! I want to sign up.", updated: "Updated" },
  af: { live: "lewend", title: "Nou 🔥", subTpl: (n: number) => `${n} mense kyk nou na die pryse.`, view: "Bekyk", visitors: "Besoekers nou", support: "Ondersteuning", online: "Aanlyn", openCta: "Open WhatsApp", waMsg: "Hi! Ek wil aansluit.", updated: "Opgedateer" },
  fr: { live: "en direct", title: "En ce moment 🔥", subTpl: (n: number) => `${n} personnes regardent les tarifs.`, view: "Voir", visitors: "Visiteurs", support: "Support", online: "En ligne", openCta: "Ouvrir WhatsApp", waMsg: "Bonjour ! Je veux m'inscrire.", updated: "Mis à jour" },
};

export function LiveActivity() {
  const { lang } = useLang();
  const cx = COPY[lang];
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [data, setData] = useState<{ viewing: number; updatedLabel: string } | null>(null);
  const [ua, setUA] = useState("");

  useEffect(() => { setUA(navigator.userAgent); }, []);

  useEffect(() => {
    const now = new Date();
    const weekKey = getISOWeekKey(now);
    const weekSeed = hash32(`${SITE.domain}|${weekKey}`);
    const rndWeek = makePRNG(weekSeed);
    const viewingBase = 4 + Math.floor(rndWeek() * 9);
    let lastUpdate = new Date();

    const tick = () => {
      const t = new Date();
      const minuteKey = `${weekKey}|${t.getUTCHours()}:${t.getUTCMinutes()}`;
      const rnd = makePRNG(hash32(`${SITE.domain}|${minuteKey}`));
      const jitter = () => (rnd() < 0.33 ? -1 : rnd() < 0.66 ? 0 : 1);
      const viewing = clamp(viewingBase + jitter(), 4, 22);
      if (rnd() < 0.25) lastUpdate = t;
      setData({ viewing, updatedLabel: timeAgoLabel(lastUpdate, t) });
    };

    tick();
    const id = window.setInterval(tick, 12000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const k = "live_toast_v3";
    try { if (sessionStorage.getItem(k) === "1") return; } catch {}
    const onScroll = () => {
      const el = document.getElementById("offers");
      if (!el) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.7) {
        window.removeEventListener("scroll", onScroll);
        try { sessionStorage.setItem(k, "1"); } catch {}
        setToast(true);
        window.setTimeout(() => setToast(false), 5000);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {toast && data && (
        <div className="liveToast" role="status" aria-live="polite">
          <span className="liveDot" />
          <div className="liveToastText">
            <div className="liveToastTitle">{cx.title}</div>
            <div className="liveToastSub">{cx.subTpl(data.viewing)}</div>
          </div>
          <button className="liveToastBtn" onClick={() => setOpen(true)}>{cx.view}</button>
        </div>
      )}

      <button className="liveBadge" onClick={() => setOpen(v => !v)} aria-label="View live activity">
        <span className="liveDot" />
        <span className="liveBadgeText">{data ? `${data.viewing} ${cx.live}` : cx.live}</span>
      </button>

      {open && data && (
        <div className="livePanel">
          <div className="liveHead">
            <div style={{ fontWeight: 900 }}>Live 🇿🇦</div>
            <div className="liveSub">{cx.updated} {data.updatedLabel}</div>
          </div>
          <div className="liveStats">
            <div className="liveRow"><span>{cx.visitors}</span><b>{data.viewing}</b></div>
            <div className="liveRow"><span>{cx.support}</span><b style={{ color: "#22c55e" }}>{cx.online}</b></div>
          </div>
          <button
            className="liveCta"
            onClick={() => window.open(generateWhatsAppLink(cx.waMsg, ua, "Live-Widget"), "_blank")}
          >
            {cx.openCta}
          </button>
        </div>
      )}
    </>
  );
}
