"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { expatCountries } from "../shared/countries";
import { waMeLink } from "../shared/utils";

const copy = {
  en: {
    title: "South African TV abroad",
    intro: "Choose your destination to check viewing options, device setup and local times.",
    all: "All destination guides",
    trial: "Try Mzansi Stream free for 24 hours on WhatsApp",
    message: "I'd like a free 24-hour Mzansi Stream trial. My country is [country] and my device is [model].",
  },
  fr: {
    title: "La télévision sud-africaine à l’étranger",
    intro: "Choisissez votre destination pour vérifier les programmes, les appareils et les horaires locaux.",
    all: "Tous les guides par destination",
    trial: "Demander l’essai gratuit Mzansi Stream de 24 h sur WhatsApp",
    message: "Je souhaite essayer Mzansi Stream gratuitement pendant 24 h. Mon pays est [pays] et mon appareil est [modèle].",
  },
  af: {
    title: "Suid-Afrikaanse TV in die buiteland",
    intro: "Kies jou bestemming vir plaaslike kykopsies, toestelle en uitsaaitye.",
    all: "Alle bestemmingsgidse",
    trial: "Probeer Mzansi Stream 24 uur gratis op WhatsApp",
    message: "Ek wil Mzansi Stream vir 24 uur gratis probeer. My land is [land] en my toestel is [model].",
  },
};

export function InternationalSection() {
  const { lang } = useLang();
  const c = copy[lang === "fr" || lang === "af" ? lang : "en"];

  return (
    <section id="international" className="section">
      <div className="sectionHead">
        <h2>{c.title}</h2>
        <p>{c.intro}</p>
      </div>
      <div className="intlGrid">
        {expatCountries.map((country) => (
          <Link key={country.code} className="intlCard" href={country.guidePath}>
            <span className="intlFlag" aria-hidden="true">{country.flag}</span>
            <div className="intlBody">
              <h3 className="intlName">{country.name}</h3>
              <p className="intlDesc">{country.desc}</p>
            </div>
            <span className="intlArrow" aria-hidden="true">›</span>
          </Link>
        ))}
      </div>
      <p className="diasporaLinks"><Link href="/en-za/sa-abroad">{c.all}</Link></p>
      <div className="stepsCtaWrap">
        <a className="btnPrimary" href={waMeLink(c.message, "Intl-Trial")} target="_blank" rel="noreferrer" data-track-ref="Intl-Trial">
          {c.trial}
        </a>
      </div>
    </section>
  );
}
