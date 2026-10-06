// lib/seo/pillar-meta-i18n.ts
// Native-language title + description overlay for the 12 pillar pages.
//
// Problem (T0): every pillar rendered its English metaTitle/metaDescription at
// all 12 locales — af/zu/xh/pt-mz/fr declared a foreign <html lang> over English
// metadata (lang↔content mismatch, hreflang-cluster duplicate signal).
//
// This module holds hand-written NATIVE copy (no machine translation, Loi #9),
// keyed by pillar slug → locale. `pillarMetaLocalized()` returns the native
// entry when present and otherwise falls back to the pillar's English meta
// (correct for the en-* locales, which share the language).
//
// Coverage: af / fr / pt-mz = full native title + description on all 12 pillars.
// zu / xh = native title + description on all 12 pillars (reviewed terminology,
// aligned with the owner-approved Nguni hero copy in components/shared/dict.ts).
// en-za / en-gb / en-au / en-us / en-ae / en-nz / en-zw = English fallback.

import type { Locale } from "../locales";
import { getPillar } from "./pillars";

type MetaPair = { title: string; description: string };
type LocaleOverlay = Partial<Record<Locale, MetaPair>>;

export const PILLAR_META_I18N: Record<string, LocaleOverlay> = {
  // dstv-alternative is a standalone page (not in the getPillar set), so the
  // page passes its English copy as the fallback for en-* locales.
  "dstv-alternative": {
    af: {
      title: "DStv-Alternatief 2026 — Bespaar R800/md",
      description:
        "Beste DStv-alternatief in Suid-Afrika 2026. SuperSport PSL, Premier League, kykNET en SABC in 4K — bevestig die lys op WhatsApp. Vanaf R99/md. Gratis 24u-proef — geen kaart.",
    },
    fr: {
      title: "Alternative à DStv 2026 — Économisez R800/mois",
      description:
        "Meilleure alternative à DStv en Afrique du Sud 2026. SuperSport PSL, Premier League, kykNET et SABC en 4K — catalogue à confirmer sur WhatsApp. Dès R99/mois. Essai gratuit 24 h.",
    },
    "pt-mz": {
      title: "Alternativa à DStv 2026 — Poupe R800/mês",
      description:
        "Melhor alternativa à DStv na África do Sul 2026. SuperSport PSL, Premier League, kykNET e SABC em 4K — confirme a grelha no WhatsApp. Desde R99/mês. Teste grátis de 24h.",
    },
    zu: {
      title: "Enye Indlela ye-DStv 2026 — Onga u-R800",
      description:
        "Enye indlela engcono ye-DStv e-South Africa 2026. SuperSport PSL, Premier League, kykNET ne-SABC ku-4K. Kusukela ku-R99/inyanga nokulinga kwamahhala kwama-24h.",
    },
    xh: {
      title: "Enye Indlela ye-DStv 2026 — Onga i-R800",
      description:
        "Enye indlela elungileyo ye-DStv eMzantsi Afrika 2026. SuperSport PSL, Premier League, kykNET ne-SABC ku-4K. Ukusuka ku-R99/inyanga nokuvavanya kwasimahla.",
    },
  },

  "iptv-vumatel-openserve-frogfoot": {
    af: {
      title: "IPTV vir Vumatel, Openserve & Frogfoot 2026 — 4K-toets",
      description:
        "Beste IPTV vir Vumatel, Openserve, Frogfoot, Octotel en MetroFibre in Suid-Afrika. 4K SuperSport — toets dit op jou lyn. Vanaf R99/md.",
    },
    fr: {
      title: "IPTV pour Vumatel, Openserve & Frogfoot 2026 — tester la 4K",
      description:
        "IPTV pour la fibre Vumatel, Openserve, Frogfoot, Octotel et MetroFibre en Afrique du Sud. SuperSport 4K, CDN NAPAfrica. Dès R99/mois. La stabilité dépend de votre ligne.",
    },
    "pt-mz": {
      title: "IPTV para Vumatel, Openserve & Frogfoot 2026 — testar 4K",
      description:
        "Melhor IPTV para fibra Vumatel, Openserve, Frogfoot, Octotel e MetroFibre na África do Sul. SuperSport em 4K — teste na sua linha. Desde R99/mês.",
    },
    zu: {
      title: "I-IPTV ye-Vumatel, Openserve & Frogfoot 2026 — 4K",
      description:
        "I-IPTV engcono ye-fiber ye-Vumatel, Openserve ne-Frogfoot e-South Africa. I-SuperSport ku-4K. I-CDN ye-NAPAfrica. Kusukela ku-R99/inyanga.",
    },
    xh: {
      title: "I-IPTV ye-Vumatel, Openserve & Frogfoot 2026 — i-4K",
      description:
        "I-IPTV elungileyo ye-fiber ye-Vumatel, Openserve ne-Frogfoot eMzantsi Afrika. I-SuperSport ku-4K. I-CDN ye-NAPAfrica. Ukusuka ku-R99/inyanga.",
    },
  },

  "iptv-eft-snapscan-payment": {
    af: {
      title: "IPTV met EFT, SnapScan, Ozow & Capitec Pay — Geen Kredietkaart",
      description:
        "Betaal vir IPTV in Suid-Afrika met EFT, SnapScan, Ozow, Zapper, Yoco of Capitec Pay — geen kredietkaart nodig. Volle 4K SuperSport vanaf R99/md.",
    },
    fr: {
      title: "IPTV par EFT, SnapScan, Ozow & Capitec Pay — Sans carte",
      description:
        "Payez votre IPTV en Afrique du Sud par EFT, SnapScan, Ozow, Zapper, Yoco ou Capitec Pay — sans carte bancaire. SuperSport 4K complet dès R99/mois.",
    },
    "pt-mz": {
      title: "IPTV por EFT, SnapScan, Ozow & Capitec Pay — Sem cartão",
      description:
        "Pague o seu IPTV na África do Sul por EFT, SnapScan, Ozow, Zapper, Yoco ou Capitec Pay — sem cartão de crédito. SuperSport 4K completo desde R99/mês.",
    },
    zu: {
      title: "I-IPTV nge-EFT, SnapScan & Capitec Pay — Ngaphandle Kwekhadi",
      description:
        "Khokhela i-IPTV e-South Africa nge-EFT, SnapScan, Ozow noma Capitec Pay — akudingeki ikhadi lesikweletu. I-SuperSport 4K egcwele kusukela ku-R99/inyanga.",
    },
    xh: {
      title: "I-IPTV nge-EFT, SnapScan & Capitec Pay — Ngaphandle Kwekhadi",
      description:
        "Hlawulela i-IPTV eMzantsi Afrika nge-EFT, SnapScan, Ozow okanye Capitec Pay — akufuneki khadi letyala. I-SuperSport 4K epheleleyo ukusuka ku-R99/inyanga.",
    },
  },

  "cancel-dstv-2026": {
    af: {
      title: "Hoe om DStv te Kanselleer 2026 — Stap vir Stap + Skuif na IPTV",
      description:
        "Kanselleer DStv in 2026 — presiese WhatsApp-nommer, die 30-dae kennisgewing-truuk en hoe om na IPTV sonder kontrak te skuif vanaf R99/md. Bespaar R9,500+ per jaar.",
    },
    fr: {
      title: "Comment résilier DStv 2026 — Étape par étape + passer à l'IPTV",
      description:
        "Résiliez DStv en 2026 — numéro WhatsApp exact, astuce du préavis de 30 jours et comment passer à l'IPTV sans engagement dès R99/mois. Économisez R9 500+ par an.",
    },
    "pt-mz": {
      title: "Como cancelar a DStv 2026 — Passo a passo + mudar para IPTV",
      description:
        "Cancele a DStv em 2026 — número de WhatsApp exato, truque do aviso de 30 dias e como mudar para IPTV sem fidelização desde R99/mês. Poupe R9.500+ por ano.",
    },
    zu: {
      title: "Ukukhansela i-DStv 2026 — Isinyathelo Ngesinyathelo + Iya ku-IPTV",
      description:
        "Khansela i-DStv ngo-2026 futhi ushintshele ku-IPTV ngaphandle kwenkontileka kusukela ku-R99/inyanga. Onga u-R9,500+ ngonyaka. Inombolo ye-WhatsApp ngokuqondile.",
    },
    xh: {
      title: "Ukurhoxisa i-DStv 2026 — Inyathelo Nenyathelo + Yiya ku-IPTV",
      description:
        "Rhoxisa i-DStv ngo-2026 uze utshintshele ku-IPTV ngaphandle kwesivumelwano ukusuka ku-R99/inyanga. Onga i-R9,500+ ngonyaka. Inombolo ye-WhatsApp ngokuchanekileyo.",
    },
  },

  "is-iptv-legal-south-africa": {
    af: {
      title: "Is IPTV Wettig in Suid-Afrika 2026? — Eerlike Regsgids",
      description:
        "Is IPTV wettig in Suid-Afrika in 2026? Die eerlike regsantwoord — IPTV is 'n wettige tegnologie; ongelisensieerde herverspreiding nie. Wat om te kontroleer voor jy inteken.",
    },
    fr: {
      title: "L'IPTV est-elle légale en Afrique du Sud 2026 ? — Guide juridique",
      description:
        "L'IPTV est-elle légale en Afrique du Sud en 2026 ? La réponse juridique honnête — l'IPTV est une technologie légale ; la rediffusion sans licence ne l'est pas.",
    },
    "pt-mz": {
      title: "O IPTV é legal na África do Sul 2026? — Guia jurídico honesto",
      description:
        "O IPTV é legal na África do Sul em 2026? A resposta jurídica honesta — o IPTV é uma tecnologia legal; a redistribuição sem licença não é. O que verificar antes de assinar.",
    },
    zu: {
      title: "Ingabe i-IPTV Isemthethweni e-South Africa 2026? — Umhlahlandlela",
      description:
        "Ingabe i-IPTV isemthethweni e-South Africa ngo-2026? Impendulo eqotho — i-IPTV iyithekhnoloji esemthethweni; ukusabalalisa ngaphandle kwelayisensi akukho.",
    },
    xh: {
      title: "Ingaba i-IPTV Isemthethweni eMzantsi Afrika 2026? — Isikhokelo",
      description:
        "Ingaba i-IPTV isemthethweni eMzantsi Afrika ngo-2026? Impendulo enyanisekileyo — i-IPTV yitekhnoloji esemthethweni; ukusasazwa ngaphandle kwelayisenisi akukho.",
    },
  },

  "best-iptv-south-africa-2026": {
    af: {
      title: "Beste IPTV Suid-Afrika 2026 — Kopersgids, 4K",
      description:
        "Die eerlike 2026-kopersgids vir die beste IPTV in Suid-Afrika. Vergelyk prys, kanale, sport, 4K en ondersteuning. Vanaf R99/md met 'n gratis 24u-proeftydperk.",
    },
    fr: {
      title: "Meilleure IPTV Afrique du Sud 2026 — guide d'achat, 4K",
      description:
        "Le guide d'achat honnête 2026 de la meilleure IPTV en Afrique du Sud. Comparez prix, chaînes, sport, 4K et support. Dès R99/mois avec un essai gratuit de 24 h.",
    },
    "pt-mz": {
      title: "Melhor IPTV África do Sul 2026 — guia de compra, 4K",
      description:
        "O guia de compra honesto de 2026 para o melhor IPTV na África do Sul. Compare preço, canais, desporto, 4K e suporte. Desde R99/mês com teste grátis de 24h.",
    },
    zu: {
      title: "I-IPTV Engcono e-South Africa 2026 — ku-4K",
      description:
        "Umhlahlandlela wabathengi ka-2026 we-IPTV engcono e-South Africa. Qhathanisa intengo, iziteshi, ezemidlalo ne-4K. Kusukela ku-R99/inyanga nokulinga kwamahhala kwama-24h.",
    },
    xh: {
      title: "Eyona IPTV Ilungileyo eMzantsi Afrika 2026 — ku-4K",
      description:
        "Isikhokelo sabathengi sika-2026 seyona IPTV ilungileyo eMzantsi Afrika. Thelekisa ixabiso, iitshaneli, ezemidlalo ne-4K. Ukusuka ku-R99/inyanga nokuvavanya kwasimahla.",
    },
  },

  "iptv-firestick-south-africa": {
    af: {
      title: "IPTV Firestick Suid-Afrika 2026 — TiviMate in 10 Minute",
      description:
        "Stap-vir-stap IPTV Firestick-opstelling vir Suid-Afrika in 2026 — TiviMate Premium, M3U-skakel, EPG, 4K SuperSport. Werk op Vumatel, Openserve, Frogfoot. Vanaf R99/md.",
    },
    fr: {
      title: "IPTV Firestick Afrique du Sud 2026 — TiviMate en 10 min",
      description:
        "Installation IPTV Firestick pas à pas pour l'Afrique du Sud en 2026 — TiviMate Premium, lien M3U, EPG, SuperSport 4K. Fonctionne sur Vumatel, Openserve. Dès R99/mois.",
    },
    "pt-mz": {
      title: "IPTV Firestick África do Sul 2026 — TiviMate em 10 min",
      description:
        "Configuração IPTV Firestick passo a passo para a África do Sul em 2026 — TiviMate Premium, link M3U, EPG, SuperSport 4K. Funciona em Vumatel, Openserve. Desde R99/mês.",
    },
    zu: {
      title: "I-IPTV Firestick South Africa 2026 — TiviMate ngemizuzu eyi-10",
      description:
        "Ukusetha i-IPTV ku-Firestick e-South Africa ngo-2026 — TiviMate Premium, isixhumanisi se-M3U, i-EPG, i-SuperSport 4K. Kusebenza ku-Vumatel, Openserve. Kusukela ku-R99/inyanga.",
    },
    xh: {
      title: "I-IPTV Firestick eMzantsi Afrika 2026 — TiviMate ngemizuzu eli-10",
      description:
        "Ukuseta i-IPTV ku-Firestick eMzantsi Afrika ngo-2026 — TiviMate Premium, ikhonkco le-M3U, i-EPG, i-SuperSport 4K. Isebenza ku-Vumatel, Openserve. Ukusuka ku-R99/inyanga.",
    },
  },

  "iptv-samsung-smart-tv": {
    af: {
      title: "IPTV Samsung Smart TV Suid-Afrika 2026 — Tizen Installasie",
      description:
        "Installeer IPTV op 'n Samsung Smart TV (Tizen) in Suid-Afrika — IPTV Smarters Pro, M3U-skakel, 4K SuperSport, kykNET. Werk op elke Samsung van 2022+. Vanaf R99/md.",
    },
    fr: {
      title: "IPTV Samsung Smart TV Afrique du Sud 2026 — installation Tizen",
      description:
        "Installez l'IPTV sur une Samsung Smart TV (Tizen) en Afrique du Sud — IPTV Smarters Pro, lien M3U, SuperSport 4K, kykNET. Fonctionne sur toute Samsung 2022+. Dès R99/mois.",
    },
    "pt-mz": {
      title: "IPTV Samsung Smart TV África do Sul 2026 — instalação Tizen",
      description:
        "Instale IPTV numa Samsung Smart TV (Tizen) na África do Sul — IPTV Smarters Pro, link M3U, SuperSport 4K, kykNET. Funciona em qualquer Samsung 2022+. Desde R99/mês.",
    },
    zu: {
      title: "I-IPTV Samsung Smart TV South Africa 2026 — Ukufaka i-Tizen",
      description:
        "Faka i-IPTV ku-Samsung Smart TV (Tizen) e-South Africa — IPTV Smarters Pro, isixhumanisi se-M3U, i-SuperSport 4K, i-kykNET. Isebenza kuwo wonke ama-Samsung 2022+. Kusukela ku-R99.",
    },
    xh: {
      title: "I-IPTV Samsung Smart TV eMzantsi Afrika 2026 — Ufakelo lwe-Tizen",
      description:
        "Faka i-IPTV kwi-Samsung Smart TV (Tizen) eMzantsi Afrika — IPTV Smarters Pro, ikhonkco le-M3U, i-SuperSport 4K, i-kykNET. Isebenza kuzo zonke ii-Samsung 2022+. Ukusuka ku-R99.",
    },
  },

  "iptv-supersport-without-dstv": {
    af: {
      title: "Kyk SuperSport Sonder DStv — IPTV in 4K 2026",
      description:
        "SuperSport-kanale (PSL, Premier League, Rugby, Krieket) in 4K sonder DStv — bevestig die wedstryde op WhatsApp. Mzansi Stream IPTV vanaf R99/md.",
    },
    fr: {
      title: "Regarder SuperSport sans DStv — IPTV en 4K 2026",
      description:
        "Les flux SuperSport (PSL, Premier League, rugby, cricket) en 4K sans DStv — matchs à confirmer sur WhatsApp. Mzansi Stream IPTV dès R99/mois.",
    },
    "pt-mz": {
      title: "Ver SuperSport sem DStv — IPTV em 4K 2026",
      description:
        "Sinais SuperSport (PSL, Premier League, râguebi, críquete) em 4K sem DStv — confirme os jogos no WhatsApp. Mzansi Stream IPTV desde R99/mês.",
    },
    zu: {
      title: "Buka i-SuperSport Ngaphandle kwe-DStv — IPTV ku-4K 2026",
      description:
        "Sakaza i-SuperSport (PSL, Premier League, Rugby, Cricket) ku-4K ngaphandle kwe-DStv. Mzansi Stream IPTV kusukela ku-R99/inyanga ku-WhatsApp — kufakwa ngemizuzu eyi-10.",
    },
    xh: {
      title: "Bukela i-SuperSport Ngaphandle kwe-DStv — IPTV ku-4K 2026",
      description:
        "Sasaza i-SuperSport (PSL, Premier League, Rugby, Cricket) ku-4K ngaphandle kwe-DStv. Mzansi Stream IPTV ukusuka ku-R99/inyanga ku-WhatsApp — ifakwa ngemizuzu eli-10.",
    },
  },

  "cheap-iptv-south-africa": {
    af: {
      title: "Goedkoop IPTV Suid-Afrika — Vanaf R99/md, Geen Kontrak",
      description:
        "Goedkoop IPTV in Suid-Afrika vanaf R99/maand. 4K SuperSport, kykNET, SABC en Premier League. Geen kontrak, geen dekodeerder, geen installasiefooi.",
    },
    fr: {
      title: "IPTV pas chère Afrique du Sud — Dès R99/mois, sans engagement",
      description:
        "IPTV pas chère en Afrique du Sud dès R99/mois. SuperSport 4K, kykNET, SABC et Premier League. Sans engagement, sans décodeur.",
    },
    "pt-mz": {
      title: "IPTV barato África do Sul — Desde R99/mês, sem fidelização",
      description:
        "IPTV barato na África do Sul desde R99/mês. SuperSport 4K, kykNET, SABC e Premier League. Sem fidelização, sem descodificador.",
    },
    zu: {
      title: "I-IPTV Eshibhile South Africa — Kusukela ku-R99",
      description:
        "I-IPTV eshibhile e-South Africa kusukela ku-R99/inyanga. I-SuperSport 4K, i-kykNET ne-SABC. Ngaphandle kwenkontileka, ngaphandle kwedikhoda.",
    },
    xh: {
      title: "I-IPTV Etshiphu eMzantsi Afrika — Ukusuka ku-R99",
      description:
        "I-IPTV etshiphu eMzantsi Afrika ukusuka ku-R99/inyanga. I-SuperSport 4K, i-kykNET ne-SABC. Ngaphandle kwesivumelwano, ngaphandle kwedikhoda.",
    },
  },

  "4k-iptv-south-africa": {
    af: {
      title: "4K IPTV Suid-Afrika — Ware UHD SuperSport & Premier League",
      description:
        "4K UHD IPTV in Suid-Afrika. SuperSport, Premier League en kykNET in 4K waar die bron dit toelaat — bevestig op WhatsApp. Vanaf R99/md.",
    },
    fr: {
      title: "IPTV 4K Afrique du Sud — UHD natif SuperSport & Premier League",
      description:
        "IPTV 4K UHD en Afrique du Sud. SuperSport, Premier League et kykNET en 4K quand la source le permet — catalogue à confirmer sur WhatsApp. Dès R99/mois. Pas de promesse zéro coupure.",
    },
    "pt-mz": {
      title: "IPTV 4K África do Sul — UHD nativo SuperSport & Premier League",
      description:
        "IPTV 4K UHD na África do Sul. SuperSport, Premier League e kykNET em 4K quando a fonte o permite — confirme no WhatsApp. Desde R99/mês.",
    },
    zu: {
      title: "I-4K IPTV South Africa — i-UHD Yangempela SuperSport & Premier League",
      description:
        "I-IPTV ye-4K UHD e-South Africa. Kusukela ku-R99/inyanga.",
    },
    xh: {
      title: "I-4K IPTV eMzantsi Afrika — i-UHD Yokwenyani SuperSport & Premier League",
      description:
        "I-IPTV ye-4K UHD eMzantsi Afrika. Ukusuka ku-R99/inyanga.",
    },
  },

  "iptv-no-buffering-south-africa": {
    af: {
      title: "IPTV-onderbrekings Suid-Afrika — oorsake en oplossings",
      description:
        "Hoekom IPTV in Suid-Afrika onderbreek, en wat jy by die huis kan nagaan. NAPAfrica-CDN. Opstellys. Geen gemete latensie of uptyd op hierdie bladsy nie.",
    },
    fr: {
      title: "Coupures IPTV Afrique du Sud — causes et solutions",
      description:
        "Pourquoi l'IPTV coupe en Afrique du Sud, et quoi vérifier chez vous. CDN NAPAfrica. Checklist d'installation. Pas de latence ni de disponibilité chiffrées ici.",
    },
    "pt-mz": {
      title: "Falhas de IPTV na África do Sul — causas e soluções",
      description:
        "Porque é que o IPTV falha na África do Sul, e o que verificar em casa. CDN NAPAfrica. Checklist. Sem latência nem uptime medidos nesta página.",
    },
    zu: {
      title: "I-IPTV e-South Africa — Ukusakaza kwe-4K",
      description:
        "I-IPTV e-South Africa. I-CDN ye-NAPAfrica. I-SuperSport 4K. Kusukela ku-R99/inyanga.",
    },
    xh: {
      title: "I-IPTV eMzantsi Afrika — Ukusasaza kwe-4K",
      description:
        "I-IPTV eMzantsi Afrika. I-CDN ye-NAPAfrica. I-SuperSport 4K. Ukusuka ku-R99/inyanga.",
    },
  },

  "iptv-for-movies-and-series": {
    af: {
      title: "IPTV vir Flieks & Reekse Suid-Afrika",
      description:
        "IPTV vir flieks en reekse in Suid-Afrika — films en reekse op aanvraag; bevestig die katalogus op WhatsApp. Geen kontrak. Vanaf R99/md.",
    },
    fr: {
      title: "IPTV films & séries Afrique du Sud — VOD",
      description:
        "IPTV pour films et séries en Afrique du Sud — VOD à la demande, catalogue à confirmer sur WhatsApp. Sans engagement. Dès R99/mois.",
    },
    "pt-mz": {
      title: "IPTV filmes & séries África do Sul — VOD",
      description:
        "IPTV para filmes e séries na África do Sul — VOD a pedido; confirme o catálogo no WhatsApp. Sem fidelização. Desde R99/mês.",
    },
    zu: {
      title: "I-IPTV Yamamuvi Nochungechunge South Africa",
      description:
        "I-IPTV yamamuvi nochungechunge e-South Africa. Ngaphandle kwenkontileka. Kusukela ku-R99.",
    },
    xh: {
      title: "I-IPTV Yeefilimu Nothotho eMzantsi Afrika",
      description:
        "I-IPTV yeefilimu nothotho eMzantsi Afrika. Ngaphandle kwesivumelwano. Ukusuka ku-R99.",
    },
  },
};

/**
 * Localized pillar metadata. Returns native title + description when a native
 * overlay exists for the locale, else the pillar's English meta (correct for
 * the en-* locales). Unknown slug → empty strings (page guards on this already).
 */
export function pillarMetaLocalized(
  slug: string,
  locale: Locale,
  fallback?: MetaPair
): MetaPair {
  const overlay = PILLAR_META_I18N[slug]?.[locale];
  if (overlay) return overlay;
  const pillar = getPillar(slug);
  if (pillar) return { title: pillar.metaTitle, description: pillar.metaDescription };
  return fallback ?? { title: "", description: "" };
}
