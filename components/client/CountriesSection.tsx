"use client";
// components/client/CountriesSection.tsx
// 9 diaspora communities IN South Africa.

import React, { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { countries } from "../shared/countries";
import type { Country, Locale } from "../shared/types";
import { generateWhatsAppLink } from "../shared/utils";

type LangGroup = "en" | "af" | "fr";

function toLangGroup(locale: Locale): LangGroup {
  if (locale === "af") return "af";
  if (locale === "fr") return "fr";
  // zu / xh / pt-mz / all English variants fall back to en copy here
  // until per-locale strings land in a follow-up PR.
  return "en";
}

const TITLES_BY_LANG: Record<LangGroup, Record<string, string>> = {
  en: { title: "TV in your language, living in South Africa", sub: "Tap your country to see every channel and sign up instantly on WhatsApp.", hint: "👆 Tap a country to see the available channels", notFoundCta: "💬 Your language not listed? Ask us", notFoundMsg: "Hi! I am looking for channels in my language while living in South Africa.", channelsTitle: "📺 Channels included", searchTitle: "🔍 What people search on Google", volumeNote: "Volume = monthly searches in South Africa", priceTitle: "From R99/mo", priceSub: "All channels · Free 24h trial · No contract", more: "+ hundreds more", orderCta: "💬 Order — WhatsApp", trialCta: "🧪 Free 24h trial", trialMsg: "Hi! I want a free 24h trial of the" },
  af: { title: "TV in jou taal, in Suid-Afrika", sub: "Tik op jou land om al die kanale te sien en onmiddellik aan te sluit via WhatsApp.", hint: "👆 Tik 'n land om die kanale te sien", notFoundCta: "💬 Jou taal nie gelys nie? Vra ons", notFoundMsg: "Hi! Ek soek kanale in my taal in Suid-Afrika.", channelsTitle: "📺 Kanale ingesluit", searchTitle: "🔍 Wat mense op Google soek", volumeNote: "Volume = maandelikse soektogte in Suid-Afrika", priceTitle: "Vanaf R99/maand", priceSub: "Alle kanale · Gratis 24u proef · Geen kontrak", more: "+ honderde meer", orderCta: "💬 Bestel — WhatsApp", trialCta: "🧪 Gratis 24u proef", trialMsg: "Hi! Ek wil 'n gratis 24u proef van die" },
  fr: { title: "La TV dans votre langue, en Afrique du Sud", sub: "Cliquez sur votre pays pour voir toutes les chaînes et s'inscrire sur WhatsApp.", hint: "👆 Cliquez sur un pays pour voir les chaînes", notFoundCta: "💬 Votre langue n'est pas listée ? Demandez-nous", notFoundMsg: "Bonjour ! Je cherche des chaînes dans ma langue en Afrique du Sud.", channelsTitle: "📺 Chaînes incluses", searchTitle: "🔍 Ce que les gens cherchent sur Google", volumeNote: "Volume = recherches mensuelles en Afrique du Sud", priceTitle: "À partir de R99/mois", priceSub: "Toutes les chaînes · Essai 24h gratuit · Sans engagement", more: "+ des centaines d'autres", orderCta: "💬 Commander — WhatsApp", trialCta: "🧪 Essai 24h gratuit", trialMsg: "Bonjour ! Je veux un essai gratuit 24h des" },
};

export function CountriesSection() {
  const { lang } = useLang();
  const tx = TITLES_BY_LANG[toLangGroup(lang)];
  const [selected, setSelected] = useState<Country | null>(null);
  const [ua, setUA] = useState("");

  useEffect(() => { setUA(navigator.userAgent); }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const closeModal = () => setSelected(null);

  return (
    <>
      <section id="countries" className="section">
        <div className="sectionHead">
          <h2>{tx.title}</h2>
          <p>{tx.sub}</p>
          <p style={{ fontSize: 13, color: "var(--gold)", fontWeight: 600, marginTop: 6 }}>
            {tx.hint}
          </p>
        </div>

        <div className="countriesGrid">
          {countries.map(c => (
            <button key={c.slug} className="countryCard" onClick={() => setSelected(c)}>
              <span className="ctryFlag">{c.flag}</span>
              <div className="ctryInfo">
                <div className="ctryName">{c.name}</div>
                <div className="ctrySub">{c.sub}</div>
              </div>
              <span className="ctryArrow">›</span>
            </button>
          ))}
        </div>

        <div className="stepsCtaWrap" style={{ marginTop: 28 }}>
          <a
            className="btnSecondary"
            href={generateWhatsAppLink(tx.notFoundMsg, ua, "Countries-NotFound")}
            target="_blank"
            rel="noreferrer"
          >
            {tx.notFoundCta}
          </a>
        </div>
      </section>

      {selected && (
        <div
          className="countryModalOverlay"
          onClick={(e) => {
            if ((e.target as HTMLElement).classList.contains("countryModalOverlay")) closeModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={selected.name}
        >
          <div className="countryModalBox">
            <div className="countryModalHd">
              <span className="countryModalFlag">{selected.flag}</span>
              <div className="countryModalTb">
                <h2>{selected.name}</h2>
                <p>{selected.desc}</p>
              </div>
              <button className="countryModalClose" onClick={closeModal} aria-label="Close">✕</button>
            </div>

            <div className="countryModalBd">
              <div className="countryModalSec">
                <div className="countryModalSecTitle">
                  {tx.channelsTitle} ({selected.channels.length}+)
                </div>
                <div className="countryChGrid">
                  {selected.channels.map(ch => (
                    <div key={ch.n} className="countryChChip">
                      <div className="countryChName">{ch.n}</div>
                      <div className="countryChIcon">{ch.c}</div>
                    </div>
                  ))}
                  <div className="countryChChip countryChChipGold">
                    <div className="countryChName" style={{ color: "#C9A84C" }}>{tx.more}</div>
                    <div className="countryChIcon">💬</div>
                  </div>
                </div>
              </div>

              <div className="countryModalSec">
                <div className="countryModalSecTitle">{tx.searchTitle}</div>
                <div className="countryKwWrap">
                  {selected.keywords.map(([kw, vol]) => (
                    <div key={kw} className="countryKwPill">
                      <span className="countryKwText">{kw}</span>
                      <span className="countryKwVol">{vol}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 10 }}>
                  {tx.volumeNote}
                </p>
              </div>

              <div className="countryPriceBox">
                <span style={{ fontSize: 26, flexShrink: 0 }}>💰</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 3 }}>
                    {tx.priceTitle}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>
                    {tx.priceSub}
                  </div>
                </div>
              </div>
            </div>

            <div className="countryModalFt">
              <a
                className="trialCta"
                style={{ flex: 1, minWidth: 140, textAlign: "center", fontSize: 14, padding: "13px 18px" }}
                href={generateWhatsAppLink(selected.wa, ua, `Country-${selected.slug}`)}
                target="_blank"
                rel="noreferrer"
              >
                {tx.orderCta.replace("Order", `Order ${selected.name}`)}
              </a>
              <a
                className="btnSecondary"
                style={{ flex: 1, minWidth: 130, textAlign: "center", fontSize: 13, padding: "13px 14px" }}
                href={generateWhatsAppLink(`${tx.trialMsg} ${selected.name} channels.`, ua, `Trial-${selected.slug}`)}
                target="_blank"
                rel="noreferrer"
              >
                {tx.trialCta}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
