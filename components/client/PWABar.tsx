"use client";
// components/client/PWABar.tsx

import React, { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { dict } from "../shared/dict";

export function PWABar() {
  const { lang } = useLang();
  const t = dict[lang];
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [showPWABar, setShowPWABar] = useState(false);
  const [showIOSBar, setShowIOSBar] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    if (!installPrompt) return;
    const key = "pwa_dismissed_v1";
    try { if (localStorage.getItem(key)) return; } catch {}
    const t1 = window.setTimeout(() => setShowPWABar(true), 2600);
    return () => window.clearTimeout(t1);
  }, [installPrompt]);

  useEffect(() => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isInStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (!isIOS || isInStandalone) return;
    const key = "ios_pwa_dismissed_v1";
    try { if (localStorage.getItem(key)) return; } catch {}
    const t2 = window.setTimeout(() => setShowIOSBar(true), 3500);
    return () => window.clearTimeout(t2);
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    setShowPWABar(false);
    (installPrompt as unknown as { prompt: () => void }).prompt();
    (installPrompt as unknown as { userChoice: Promise<{ outcome: string }> })
      .userChoice.then(c => { if (c.outcome === "accepted") setInstallPrompt(null); });
  };

  const handlePWADismiss = () => {
    setShowPWABar(false);
    try { localStorage.setItem("pwa_dismissed_v1", "1"); } catch {}
  };

  const handleIOSDismiss = () => {
    setShowIOSBar(false);
    try { localStorage.setItem("ios_pwa_dismissed_v1", "1"); } catch {}
  };

  return (
    <>
      {showPWABar && (
        <div className="pwaBar">
          <span className="pwaIcon">📲</span>
          <div className="pwaText">
            <strong>{t.pwa.title}</strong>
            <span>{t.pwa.sub}</span>
          </div>
          <button className="pwaAccept" onClick={handleInstallClick}>{t.pwa.accept}</button>
          <button className="pwaDismiss" onClick={handlePWADismiss} aria-label="Close">✕</button>
        </div>
      )}

      {showIOSBar && (
        <div className="pwaBar pwaBarIOS">
          <span className="pwaIcon">📲</span>
          <div className="pwaText">
            <strong>{t.pwa.iosTitle}</strong>
            <span>
              {t.pwa.iosHint.split(" ")[0]}{" "}
              <span className="iosShareIcon">⬆</span>{" "}
              {t.pwa.iosHint.split(" ").slice(1).join(" ")}
            </span>
          </div>
          <button className="pwaDismiss" onClick={handleIOSDismiss} aria-label="Close">✕</button>
        </div>
      )}
    </>
  );
}
