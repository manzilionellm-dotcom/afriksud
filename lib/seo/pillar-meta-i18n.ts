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
      title: "DStv-Alternatief 2026 — Bespaar R800/md · 20,000+ Kanale",
      description:
        "Beste DStv-alternatief in Suid-Afrika 2026. 20,000+ lewendige kanale, SuperSport PSL, Premier League, kykNET en SABC in 4K. Vanaf R99/md. Gratis 24u-proef — geen kaart.",
    },
    fr: {
      title: "Alternative à DStv 2026 — Économisez R800/mois · 20 000+ chaînes",
      description:
        "Meilleure alternative à DStv en Afrique du Sud 2026. 20 000+ chaînes en direct, SuperSport PSL, Premier League, kykNET et SABC en 4K. Dès R99/mois. Essai gratuit 24 h.",
    },
    "pt-mz": {
      title: "Alternativa à DStv 2026 — Poupe R800/mês · 20.000+ canais",
      description:
        "Melhor alternativa à DStv na África do Sul 2026. 20.000+ canais ao vivo, SuperSport PSL, Premier League, kykNET e SABC em 4K. Desde R99/mês. Teste grátis de 24h.",
    },
    zu: {
      title: "Enye Indlela ye-DStv 2026 — Onga u-R800 · iziteshi ezi-20,000+",
      description:
        "Enye indlela engcono ye-DStv e-South Africa 2026. Iziteshi ezi-20,000+ eziphilayo, SuperSport PSL, Premier League, kykNET ne-SABC ku-4K. Kusukela ku-R99/inyanga nokulinga kwamahhala kwama-24h.",
    },
    xh: {
      title: "Enye Indlela ye-DStv 2026 — Onga i-R800 · 20,000+ iitshaneli",
      description:
        "Enye indlela elungileyo ye-DStv eMzantsi Afrika 2026. Iitshaneli ezi-20,000+ eziphilayo, SuperSport PSL, Premier League, kykNET ne-SABC ku-4K. Ukusuka ku-R99/inyanga nokuvavanya kwasimahla.",
    },
  },

  "iptv-vumatel-openserve-frogfoot": {
    af: {
      title: "IPTV vir Vumatel, Openserve & Frogfoot 2026 — 4K Stabiel",
      description:
        "Beste IPTV vir Vumatel, Openserve, Frogfoot, Octotel en MetroFibre in Suid-Afrika. 4K SuperSport sonder onderbrekings. NAPAfrica-CDN. Vanaf R99/md.",
    },
    fr: {
      title: "IPTV pour Vumatel, Openserve & Frogfoot 2026 — 4K stable",
      description:
        "Meilleure IPTV pour la fibre Vumatel, Openserve, Frogfoot, Octotel et MetroFibre en Afrique du Sud. SuperSport 4K sans coupures. CDN NAPAfrica. Dès R99/mois.",
    },
    "pt-mz": {
      title: "IPTV para Vumatel, Openserve & Frogfoot 2026 — 4K estável",
      description:
        "Melhor IPTV para fibra Vumatel, Openserve, Frogfoot, Octotel e MetroFibre na África do Sul. SuperSport em 4K sem cortes. CDN NAPAfrica. Desde R99/mês.",
    },
    zu: {
      title: "I-IPTV ye-Vumatel, Openserve & Frogfoot 2026 — 4K ezinzile",
      description:
        "I-IPTV engcono ye-fiber ye-Vumatel, Openserve ne-Frogfoot e-South Africa. I-SuperSport ku-4K ngaphandle kokuma. I-CDN ye-NAPAfrica. Kusukela ku-R99/inyanga.",
    },
    xh: {
      title: "I-IPTV ye-Vumatel, Openserve & Frogfoot 2026 — 4K ezinzileyo",
      description:
        "I-IPTV elungileyo ye-fiber ye-Vumatel, Openserve ne-Frogfoot eMzantsi Afrika. I-SuperSport ku-4K ngaphandle kokuma. I-CDN ye-NAPAfrica. Ukusuka ku-R99/inyanga.",
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
      title: "Beste IPTV Suid-Afrika 2026 — 20,000+ Kanale in 4K",
      description:
        "Die eerlike 2026-kopersgids vir die beste IPTV in Suid-Afrika. Vergelyk prys, kanale, sport, 4K en ondersteuning. Vanaf R99/md met 'n gratis 24u-proeftydperk.",
    },
    fr: {
      title: "Meilleure IPTV Afrique du Sud 2026 — 20 000+ chaînes en 4K",
      description:
        "Le guide d'achat honnête 2026 de la meilleure IPTV en Afrique du Sud. Comparez prix, chaînes, sport, 4K et support. Dès R99/mois avec un essai gratuit de 24 h.",
    },
    "pt-mz": {
      title: "Melhor IPTV África do Sul 2026 — 20.000+ canais em 4K",
      description:
        "O guia de compra honesto de 2026 para o melhor IPTV na África do Sul. Compare preço, canais, desporto, 4K e suporte. Desde R99/mês com teste grátis de 24h.",
    },
    zu: {
      title: "I-IPTV Engcono e-South Africa 2026 — iziteshi ezi-20,000+ ku-4K",
      description:
        "Umhlahlandlela wabathengi ka-2026 we-IPTV engcono e-South Africa. Qhathanisa intengo, iziteshi, ezemidlalo ne-4K. Kusukela ku-R99/inyanga nokulinga kwamahhala kwama-24h.",
    },
    xh: {
      title: "Eyona IPTV Ilungileyo eMzantsi Afrika 2026 — 20,000+ ku-4K",
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
        "Stroom elke SuperSport-kanaal (PSL, Premier League, Rugby, Krieket) in 4K sonder DStv. Mzansi Stream IPTV vanaf R99/md op WhatsApp — binne 10 minute geïnstalleer.",
    },
    fr: {
      title: "Regarder SuperSport sans DStv — IPTV en 4K 2026",
      description:
        "Diffusez tous les flux SuperSport (PSL, Premier League, rugby, cricket) en 4K sans DStv. Mzansi Stream IPTV dès R99/mois sur WhatsApp — installé en 10 minutes.",
    },
    "pt-mz": {
      title: "Ver SuperSport sem DStv — IPTV em 4K 2026",
      description:
        "Transmita todos os sinais SuperSport (PSL, Premier League, râguebi, críquete) em 4K sem DStv. Mzansi Stream IPTV desde R99/mês no WhatsApp — instalado em 10 minutos.",
    },
    zu: {
      title: "Buka i-SuperSport Ngaphandle kwe-DStv — IPTV ku-4K 2026",
      description:
        "Sakaza yonke i-SuperSport (PSL, Premier League, Rugby, Cricket) ku-4K ngaphandle kwe-DStv. Mzansi Stream IPTV kusukela ku-R99/inyanga ku-WhatsApp — kufakwa ngemizuzu eyi-10.",
    },
    xh: {
      title: "Bukela i-SuperSport Ngaphandle kwe-DStv — IPTV ku-4K 2026",
      description:
        "Sasaza yonke i-SuperSport (PSL, Premier League, Rugby, Cricket) ku-4K ngaphandle kwe-DStv. Mzansi Stream IPTV ukusuka ku-R99/inyanga ku-WhatsApp — ifakwa ngemizuzu eli-10.",
    },
  },

  "cheap-iptv-south-africa": {
    af: {
      title: "Goedkoop IPTV Suid-Afrika — Vanaf R99/md, 20,000+ Kanale",
      description:
        "Goedkoop IPTV in Suid-Afrika vanaf R99/maand. 20,000+ lewendige kanale, 4K SuperSport, kykNET, SABC en Premier League. Geen kontrak, geen dekodeerder, geen installasiefooi.",
    },
    fr: {
      title: "IPTV pas chère Afrique du Sud — Dès R99/mois, 20 000+ chaînes",
      description:
        "IPTV pas chère en Afrique du Sud dès R99/mois. 20 000+ chaînes en direct, SuperSport 4K, kykNET, SABC et Premier League. Sans engagement, sans décodeur.",
    },
    "pt-mz": {
      title: "IPTV barato África do Sul — Desde R99/mês, 20.000+ canais",
      description:
        "IPTV barato na África do Sul desde R99/mês. 20.000+ canais ao vivo, SuperSport 4K, kykNET, SABC e Premier League. Sem fidelização, sem descodificador.",
    },
    zu: {
      title: "I-IPTV Eshibhile South Africa — Kusukela ku-R99, iziteshi ezi-20,000+",
      description:
        "I-IPTV eshibhile e-South Africa kusukela ku-R99/inyanga. Iziteshi ezi-20,000+ eziphilayo, i-SuperSport 4K, i-kykNET ne-SABC. Ngaphandle kwenkontileka, ngaphandle kwedikhoda.",
    },
    xh: {
      title: "I-IPTV Etshiphu eMzantsi Afrika — Ukusuka ku-R99, 20,000+ iitshaneli",
      description:
        "I-IPTV etshiphu eMzantsi Afrika ukusuka ku-R99/inyanga. Iitshaneli ezi-20,000+ eziphilayo, i-SuperSport 4K, i-kykNET ne-SABC. Ngaphandle kwesivumelwano, ngaphandle kwedikhoda.",
    },
  },

  "4k-iptv-south-africa": {
    af: {
      title: "4K IPTV Suid-Afrika — Ware UHD SuperSport & Premier League",
      description:
        "Ware 4K UHD IPTV in Suid-Afrika. SuperSport, Premier League, kykNET en 20,000+ kanale in egte 4K — geen opskalering. NAPAfrica-CDN, geen onderbrekings. Vanaf R99/md.",
    },
    fr: {
      title: "IPTV 4K Afrique du Sud — UHD natif SuperSport & Premier League",
      description:
        "IPTV 4K UHD natif en Afrique du Sud. SuperSport, Premier League, kykNET et 20 000+ chaînes en vrai 4K — sans upscaling. CDN NAPAfrica, sans coupures. Dès R99/mois.",
    },
    "pt-mz": {
      title: "IPTV 4K África do Sul — UHD nativo SuperSport & Premier League",
      description:
        "IPTV 4K UHD nativo na África do Sul. SuperSport, Premier League, kykNET e 20.000+ canais em 4K real — sem upscaling. CDN NAPAfrica, sem cortes. Desde R99/mês.",
    },
    zu: {
      title: "I-4K IPTV South Africa — i-UHD Yangempela SuperSport & Premier League",
      description:
        "I-IPTV ye-4K UHD yangempela e-South Africa. I-SuperSport, Premier League, kykNET neziteshi ezi-20,000+ ku-4K yangempela. I-CDN ye-NAPAfrica. Kusukela ku-R99/inyanga.",
    },
    xh: {
      title: "I-4K IPTV eMzantsi Afrika — i-UHD Yokwenyani SuperSport & Premier League",
      description:
        "I-IPTV ye-4K UHD yokwenyani eMzantsi Afrika. I-SuperSport, Premier League, kykNET neetshaneli ezi-20,000+ ku-4K yokwenyani. I-CDN ye-NAPAfrica. Ukusuka ku-R99/inyanga.",
    },
  },

  "iptv-no-buffering-south-africa": {
    af: {
      title: "IPTV Sonder Onderbrekings Suid-Afrika — Stabiele 4K",
      description:
        "Stabiele IPTV sonder onderbrekings in Suid-Afrika. NAPAfrica-CDN, <15ms vertraging, 4K SuperSport wat nie middel-in-die-wedstryd val nie. Opstellys + vergelyking.",
    },
    fr: {
      title: "IPTV sans coupures Afrique du Sud — Flux 4K stables",
      description:
        "IPTV stable sans coupures en Afrique du Sud. CDN NAPAfrica, latence <15 ms, SuperSport 4K qui ne lâche pas en plein match. Checklist d'installation + comparatif.",
    },
    "pt-mz": {
      title: "IPTV sem cortes África do Sul — Transmissões 4K estáveis",
      description:
        "IPTV estável sem cortes na África do Sul. CDN NAPAfrica, latência <15ms, SuperSport 4K que não falha a meio do jogo. Checklist de instalação + comparação de fornecedores.",
    },
    zu: {
      title: "I-IPTV Engenakuma South Africa — Ukusakaza kwe-4K Okuzinzile",
      description:
        "I-IPTV ezinzile engenakuma e-South Africa. I-CDN ye-NAPAfrica, i-latency engaphansi kuka-15ms, i-SuperSport 4K engawi phakathi nomdlalo. Kusukela ku-R99/inyanga.",
    },
    xh: {
      title: "I-IPTV Engenakuma eMzantsi Afrika — Ukusasaza kwe-4K Okuzinzileyo",
      description:
        "I-IPTV ezinzileyo engenakuma eMzantsi Afrika. I-CDN ye-NAPAfrica, i-latency engaphantsi kwe-15ms, i-SuperSport 4K engaweli phakathi komdlalo. Ukusuka ku-R99/inyanga.",
    },
  },

  "iptv-for-movies-and-series": {
    af: {
      title: "IPTV vir Flieks & Reekse Suid-Afrika — 100K Titels",
      description:
        "IPTV vir flieks en reekse in Suid-Afrika — 100,000+ titels op aanvraag plus lewendige M-Net, Showmax, Disney+ en HBO Max-inhoud. 4K, geen kontrak. Vanaf R99/md.",
    },
    fr: {
      title: "IPTV films & séries Afrique du Sud — 100 000 titres",
      description:
        "IPTV pour films et séries en Afrique du Sud — 100 000+ titres à la demande plus M-Net en direct, Showmax, Disney+ et HBO Max. 4K, sans engagement. Dès R99/mois.",
    },
    "pt-mz": {
      title: "IPTV filmes & séries África do Sul — 100 mil títulos",
      description:
        "IPTV para filmes e séries na África do Sul — 100.000+ títulos a pedido, além de M-Net ao vivo, Showmax, Disney+ e HBO Max. 4K, sem fidelização. Desde R99/mês.",
    },
    zu: {
      title: "I-IPTV Yamamuvi Nochungechunge South Africa — Izihloko ezingu-100K",
      description:
        "I-IPTV yamamuvi nochungechunge e-South Africa — izihloko ezingu-100,000+ ngokufuna kanye ne-M-Net, Showmax ne-Disney+. Ku-4K, ngaphandle kwenkontileka. Kusukela ku-R99.",
    },
    xh: {
      title: "I-IPTV Yeefilimu Nothotho eMzantsi Afrika — Izihloko ezingu-100K",
      description:
        "I-IPTV yeefilimu nothotho eMzantsi Afrika — izihloko ezingu-100,000+ ngokufuna kunye ne-M-Net, Showmax ne-Disney+. Ku-4K, ngaphandle kwesivumelwano. Ukusuka ku-R99.",
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
