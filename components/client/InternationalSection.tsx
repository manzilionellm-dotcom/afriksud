"use client";
// components/client/InternationalSection.tsx
// SA worldwide — for South Africans abroad.

import React, { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { dict } from "../shared/dict";
import { expatCountries } from "../shared/countries";
import { generateWhatsAppLink } from "../shared/utils";
import { SA_ABROAD_COUNTRIES } from "../../lib/seo/sa-abroad";

export function InternationalSection() {
  const { lang } = useLang();
  const t = dict[lang];
  const c = t.international;
  const [ua, setUA] = useState("");

  useEffect(() => { setUA(navigator.userAgent); }, []);

  const buildMsg = (countryName: string) =>
    lang === "fr"
      ? `Bonjour ! Je vis en/au ${countryName} et je veux Mzansi Stream.`
      : lang === "af"
      ? `Hi! Ek bly in ${countryName} en wil Mzansi Stream hê.`
      : `Hi! I live in ${countryName} and I want Mzansi Stream.`;

  const notListed =
    lang === "fr"
      ? "Bonjour ! Mon pays n'est pas listé. Mzansi Stream est-il disponible ?"
      : lang === "af"
      ? "Hi! My land is nie gelys nie. Is Mzansi Stream beskikbaar daar?"
      : "Hi! My country isn't listed. Is Mzansi Stream available there?";

  return (
    <section id="international" className="section">
      <div className="sectionHead">
        <span className="intlEyebrow">{c.eyebrow}</span>
        <h2>{c.title}</h2>
        <p>{c.sub}</p>
      </div>

      <p className="intlTagline">{c.tagline}</p>

      <div className="intlGrid" role="list">
        {expatCountries.map((country) => (
          <a
            key={country.code}
            role="listitem"
            className="intlCard"
            href={generateWhatsAppLink(buildMsg(country.name), ua, `Intl-${country.code}`)}
            target="_blank"
            rel="noreferrer"
            aria-label={`${country.name} — ${country.desc}`}
          >
            <span className="intlFlag" aria-hidden="true">{country.flag}</span>
            <div className="intlBody">
              <h3 className="intlName">{country.name}</h3>
              <p className="intlDesc">{country.desc}</p>
            </div>
            <span className="intlArrow" aria-hidden="true">›</span>
          </a>
        ))}
      </div>

      <div className="intlBenefits">
        <h3 className="intlBenefitsTitle">{c.benefitsTitle}</h3>
        <div className="intlBenefitsGrid">
          {c.benefits.map((b) => (
            <div key={b.title} className="intlBenefit">
              <span className="intlBenefitIcon" aria-hidden="true">{b.icon}</span>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <nav className="diasporaLinks" aria-label="South African diaspora country guides">
        <p className="diasporaLinksTitle">Country guides for SA expats</p>
        <ul>
          {SA_ABROAD_COUNTRIES.map((c) => (
            <li key={c.slug}>
              <a href={`/${lang}/sa-abroad/${c.slug}/`} hrefLang={c.preferredCanonicalLocale}>
                <span aria-hidden="true">{c.flag}</span> SA TV in {c.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="stepsCtaWrap" style={{ marginTop: 28, flexDirection: "column", gap: 10 }}>
        <a
          className="btnPrimary"
          href={generateWhatsAppLink(buildMsg("[your country]"), ua, "Intl-Generic")}
          target="_blank"
          rel="noreferrer"
        >
          {c.cta}
        </a>
        <a
          className="btnSecondary"
          href={generateWhatsAppLink(notListed, ua, "Intl-NotListed")}
          target="_blank"
          rel="noreferrer"
        >
          {c.ctaSecondary}
        </a>
      </div>
    </section>
  );
}
