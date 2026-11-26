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
      title: "DStv te duur? Vergelyk jou TV-koste",
      description: "Vergelyk DStv-pakkette in Suid-Afrika met Mzansi se voorafbetaalde pryse. Een maand kos R199 en twaalf maande kos R1 199 vooruit.",
    },
    fr: {
      title: "DStv trop cher ? Comparer les options en Afrique du Sud",
      description: "Comparez les bouquets DStv au coût du prépayé Mzansi. Un mois coûte 199 rands et douze mois coûtent 1 199 rands payés en une fois.",
    },
    "pt-mz": {
      title: "Alternativas à DStv na África do Sul",
      description: "Compare os pacotes locais da DStv com os planos pré-pagos da Mzansi. Um mês custa R199 e doze meses custam R1 199 pagos de uma vez.",
    },
    zu: {
      title: "Ezinye izindlela ze-DStv eNingizimu Afrika",
      description: "Qhathanisa amanani e-DStv nawe-Mzansi Stream. Inyanga eyodwa ibiza u-R199. Izinyanga eziyi-12 zibiza u-R1 199 uma ukhokha kusengaphambili.",
    },
    xh: {
      title: "Ezinye iindlela ze-DStv eMzantsi Afrika",
      description: "Thelekisa amaxabiso e-DStv nawe-Mzansi Stream. Inyanga enye ixabisa i-R199. Iinyanga ezili-12 zibiza i-R1 199 xa kuhlawulwa kwangaphambili.",
    },
  },

  "iptv-vumatel-openserve-frogfoot": {
    af: {
      title: "IPTV vir Vumatel, Openserve & Frogfoot 2026 — 4K-toets",
      description:
        "Beste IPTV vir Vumatel, Openserve, Frogfoot, Octotel en MetroFibre in Suid-Afrika. 4K SuperSport — toets dit op jou lyn. R199 vir een maand.",
    },
    fr: {
      title: "IPTV pour Vumatel, Openserve & Frogfoot 2026 — tester la 4K",
      description:
        "IPTV pour la fibre Vumatel, Openserve, Frogfoot, Octotel et MetroFibre en Afrique du Sud. SuperSport 4K, CDN NAPAfrica. 199 rands pour un mois. La stabilité dépend de votre ligne.",
    },
    "pt-mz": {
      title: "IPTV para Vumatel, Openserve & Frogfoot 2026 — testar 4K",
      description:
        "Melhor IPTV para fibra Vumatel, Openserve, Frogfoot, Octotel e MetroFibre na África do Sul. SuperSport em 4K — teste na sua linha. R199 por um mês.",
    },
    zu: {
      title: "I-IPTV ye-Vumatel, Openserve & Frogfoot 2026 — 4K",
      description:
        "I-IPTV engcono ye-fiber ye-Vumatel, Openserve ne-Frogfoot e-South Africa. I-SuperSport ku-4K. I-CDN ye-NAPAfrica. R199 ngenyanga eyodwa.",
    },
    xh: {
      title: "I-IPTV ye-Vumatel, Openserve & Frogfoot 2026 — i-4K",
      description:
        "I-IPTV elungileyo ye-fiber ye-Vumatel, Openserve ne-Frogfoot eMzantsi Afrika. I-SuperSport ku-4K. I-CDN ye-NAPAfrica. R199 ngenyanga enye.",
    },
  },

  "iptv-eft-snapscan-payment": {
    af: {
      title: "IPTV met EFT, SnapScan, Ozow & Capitec Pay — Geen Kredietkaart",
      description:
        "Betaal vir IPTV in Suid-Afrika met EFT, SnapScan, Ozow, Zapper, Yoco of Capitec Pay — geen kredietkaart nodig. Volle 4K SuperSport teen R199 vir een maand.",
    },
    fr: {
      title: "IPTV par EFT, SnapScan, Ozow & Capitec Pay — Sans carte",
      description:
        "Payez votre IPTV en Afrique du Sud par EFT, SnapScan, Ozow, Zapper, Yoco ou Capitec Pay — sans carte bancaire. SuperSport 4K complet à 199 rands pour un mois.",
    },
    "pt-mz": {
      title: "IPTV por EFT, SnapScan, Ozow & Capitec Pay — Sem cartão",
      description:
        "Pague o seu IPTV na África do Sul por EFT, SnapScan, Ozow, Zapper, Yoco ou Capitec Pay — sem cartão de crédito. SuperSport 4K completo a R199 por um mês.",
    },
    zu: {
      title: "I-IPTV nge-EFT, SnapScan & Capitec Pay — Ngaphandle Kwekhadi",
      description:
        "Khokhela i-IPTV e-South Africa nge-EFT, SnapScan, Ozow noma Capitec Pay — akudingeki ikhadi lesikweletu. I-SuperSport 4K egcwele ngo-R199 ngenyanga eyodwa.",
    },
    xh: {
      title: "I-IPTV nge-EFT, SnapScan & Capitec Pay — Ngaphandle Kwekhadi",
      description:
        "Hlawulela i-IPTV eMzantsi Afrika nge-EFT, SnapScan, Ozow okanye Capitec Pay — akufuneki khadi letyala. I-SuperSport 4K epheleleyo nge-R199 ngenyanga enye.",
    },
  },

  "cancel-dstv-2026": {
    af: {
      title: "Hoe om DStv in Suid-Afrika te kanselleer",
      description: "Gaan na My Products, kies jou pakket en gebruik Disconnect. Kontroleer die volgende betaaldatum en die voorwaardes vir jou kontrak.",
    },
    fr: {
      title: "Comment résilier DStv en Afrique du Sud",
      description: "Programmez la déconnexion à la prochaine échéance dans My Products. Vérifiez les conditions de votre contrat et conservez la confirmation.",
    },
    "pt-mz": {
      title: "Como cancelar a DStv na África do Sul",
      description: "Em My Products, selecione o pacote e agende a desconexão para a próxima data de pagamento. Confira as condições do seu contrato.",
    },
    zu: {
      title: "Indlela yokukhansela i-DStv eNingizimu Afrika",
      description: "Ku-My Products khetha iphakheji yakho bese ukhetha u-Disconnect. Hlola usuku olulandelayo lokukhokha nemigomo yenkontileka yakho.",
    },
    xh: {
      title: "Indlela yokurhoxisa i-DStv eMzantsi Afrika",
      description: "Khetha iphakheji yakho ku-My Products uze ukhethe u-Disconnect. Jonga umhla wentlawulo elandelayo nemiqathango yesivumelwano sakho.",
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
        "Die eerlike 2026-kopersgids vir die beste IPTV in Suid-Afrika. Vergelyk prys, kanale, sport, 4K en ondersteuning. R199 vir een maand met 'n gratis 24u-proeftydperk.",
    },
    fr: {
      title: "Meilleure IPTV Afrique du Sud 2026 — guide d'achat, 4K",
      description:
        "Le guide d'achat honnête 2026 de la meilleure IPTV en Afrique du Sud. Comparez prix, chaînes, sport, 4K et support. 199 rands pour un mois avec un essai gratuit de 24 h.",
    },
    "pt-mz": {
      title: "Melhor IPTV África do Sul 2026 — guia de compra, 4K",
      description:
        "O guia de compra honesto de 2026 para o melhor IPTV na África do Sul. Compare preço, canais, desporto, 4K e suporte. R199 por um mês com teste grátis de 24h.",
    },
    zu: {
      title: "I-IPTV Engcono e-South Africa 2026 — ku-4K",
      description:
        "Umhlahlandlela wabathengi ka-2026 we-IPTV engcono e-South Africa. Qhathanisa intengo, iziteshi, ezemidlalo ne-4K. R199 ngenyanga eyodwa nokulinga kwamahhala kwama-24h.",
    },
    xh: {
      title: "Eyona IPTV Ilungileyo eMzantsi Afrika 2026 — ku-4K",
      description:
        "Isikhokelo sabathengi sika-2026 seyona IPTV ilungileyo eMzantsi Afrika. Thelekisa ixabiso, iitshaneli, ezemidlalo ne-4K. R199 ngenyanga enye nokuvavanya kwasimahla.",
    },
  },

  "iptv-firestick-south-africa": {
    af: {
      title: "IPTV Firestick Suid-Afrika 2026 — TiviMate in 10 Minute",
      description:
        "Stap-vir-stap IPTV Firestick-opstelling vir Suid-Afrika in 2026 — TiviMate Premium, M3U-skakel, EPG, 4K SuperSport. Werk op Vumatel, Openserve, Frogfoot. R199 vir een maand.",
    },
    fr: {
      title: "IPTV Firestick Afrique du Sud 2026 — TiviMate en 10 min",
      description:
        "Installation IPTV Firestick pas à pas pour l'Afrique du Sud en 2026 — TiviMate Premium, lien M3U, EPG, SuperSport 4K. Fonctionne sur Vumatel, Openserve. 199 rands pour un mois.",
    },
    "pt-mz": {
      title: "IPTV Firestick África do Sul 2026 — TiviMate em 10 min",
      description:
        "Configuração IPTV Firestick passo a passo para a África do Sul em 2026 — TiviMate Premium, link M3U, EPG, SuperSport 4K. Funciona em Vumatel, Openserve. R199 por um mês.",
    },
    zu: {
      title: "I-IPTV Firestick South Africa 2026 — TiviMate ngemizuzu eyi-10",
      description:
        "Ukusetha i-IPTV ku-Firestick e-South Africa ngo-2026 — TiviMate Premium, isixhumanisi se-M3U, i-EPG, i-SuperSport 4K. Kusebenza ku-Vumatel, Openserve. R199 ngenyanga eyodwa.",
    },
    xh: {
      title: "I-IPTV Firestick eMzantsi Afrika 2026 — TiviMate ngemizuzu eli-10",
      description:
        "Ukuseta i-IPTV ku-Firestick eMzantsi Afrika ngo-2026 — TiviMate Premium, ikhonkco le-M3U, i-EPG, i-SuperSport 4K. Isebenza ku-Vumatel, Openserve. R199 ngenyanga enye.",
    },
  },

  "iptv-samsung-smart-tv": {
    af: {
      title: "IPTV Samsung Smart TV Suid-Afrika 2026 — Tizen Installasie",
      description:
        "Installeer IPTV op 'n Samsung Smart TV (Tizen) in Suid-Afrika — IPTV Smarters Pro, M3U-skakel, 4K SuperSport, kykNET. Werk op elke Samsung van 2022+. R199 vir een maand.",
    },
    fr: {
      title: "IPTV Samsung Smart TV Afrique du Sud 2026 — installation Tizen",
      description:
        "Installez l'IPTV sur une Samsung Smart TV (Tizen) en Afrique du Sud — IPTV Smarters Pro, lien M3U, SuperSport 4K, kykNET. Fonctionne sur toute Samsung 2022+. 199 rands pour un mois.",
    },
    "pt-mz": {
      title: "IPTV Samsung Smart TV África do Sul 2026 — instalação Tizen",
      description:
        "Instale IPTV numa Samsung Smart TV (Tizen) na África do Sul — IPTV Smarters Pro, link M3U, SuperSport 4K, kykNET. Funciona em qualquer Samsung 2022+. R199 por um mês.",
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
      title: "SuperSport sonder DStv – vind jou wedstryd",
      description: "Kontroleer die wedstryd, datum en uitsaaier in jou land. Vergelyk regstreekse uitsendings en herhalings voor jy betaal.",
    },
    fr: {
      title: "SuperSport sans DStv – trouver le diffuseur du match",
      description: "Vérifiez la date du match, le diffuseur dans votre pays et les conditions du direct ou du replay avant de payer.",
    },
    "pt-mz": {
      title: "SuperSport sem DStv – onde ver o jogo",
      description: "Consulte a data do jogo e a emissora no país onde o vai ver. Verifique a transmissão em direto e a repetição.",
    },
    zu: {
      title: "I-SuperSport ngaphandle kwe-DStv",
      description: "Hlola usuku lomdlalo nomsakazi ezweni okulo. Bheka ukuthi umdlalo uzodlalwa bukhoma yini ngaphambi kokukhokha.",
    },
    xh: {
      title: "I-SuperSport ngaphandle kwe-DStv",
      description: "Jonga umhla womdlalo nomsasazi kwilizwe okulo. Hlola ukuba umdlalo uza kuboniswa ngqo na ngaphambi kokuhlawula.",
    },
  },

  "cheap-iptv-south-africa": {
    af: {
      title: "Goedkoop IPTV in Suid-Afrika – wat betaal jy vooruit?",
      description: "Mzansi kos R199 vir een maand of R1 199 vooruit vir twaalf maande. Vergelyk die volle bedrag met DStv Starter.",
    },
    fr: {
      title: "IPTV abordable en Afrique du Sud – coût du prépaiement",
      description: "Un mois Mzansi coûte 199 rands. Douze mois coûtent 1 199 rands en un paiement. Comparez le montant à payer avec DStv Starter.",
    },
    "pt-mz": {
      title: "IPTV na África do Sul – quanto se paga à partida?",
      description: "A Mzansi custa R199 por um mês ou R1 199 por doze meses pagos à partida. Compare o valor total com o DStv Starter.",
    },
    zu: {
      title: "Amanani e-IPTV eNingizimu Afrika",
      description: "Inyanga eyodwa ye-Mzansi Stream ibiza u-R199. Izinyanga eziyi-12 zibiza u-R1 199 uma ukhokha kusengaphambili.",
    },
    xh: {
      title: "Amaxabiso e-IPTV eMzantsi Afrika",
      description: "Inyanga enye ye-Mzansi Stream ixabisa i-R199. Iinyanga ezili-12 zibiza i-R1 199 xa kuhlawulwa kwangaphambili.",
    },
  },

  "4k-iptv-south-africa": {
    af: {
      title: "4K IPTV Suid-Afrika — Ware UHD SuperSport & Premier League",
      description:
        "4K UHD IPTV in Suid-Afrika. SuperSport, Premier League en kykNET in 4K waar die bron dit toelaat — bevestig op WhatsApp. R199 vir een maand.",
    },
    fr: {
      title: "IPTV 4K Afrique du Sud — UHD natif SuperSport & Premier League",
      description:
        "IPTV 4K UHD en Afrique du Sud. SuperSport, Premier League et kykNET en 4K quand la source le permet — catalogue à confirmer sur WhatsApp. 199 rands pour un mois. Pas de promesse zéro coupure.",
    },
    "pt-mz": {
      title: "IPTV 4K África do Sul — UHD nativo SuperSport & Premier League",
      description:
        "IPTV 4K UHD na África do Sul. SuperSport, Premier League e kykNET em 4K quando a fonte o permite — confirme no WhatsApp. R199 por um mês.",
    },
    zu: {
      title: "I-4K IPTV South Africa — i-UHD Yangempela SuperSport & Premier League",
      description:
        "I-IPTV ye-4K UHD e-South Africa. R199 ngenyanga eyodwa.",
    },
    xh: {
      title: "I-4K IPTV eMzantsi Afrika — i-UHD Yokwenyani SuperSport & Premier League",
      description:
        "I-IPTV ye-4K UHD eMzantsi Afrika. R199 ngenyanga enye.",
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
        "I-IPTV e-South Africa. I-CDN ye-NAPAfrica. I-SuperSport 4K. R199 ngenyanga eyodwa.",
    },
    xh: {
      title: "I-IPTV eMzantsi Afrika — Ukusasaza kwe-4K",
      description:
        "I-IPTV eMzantsi Afrika. I-CDN ye-NAPAfrica. I-SuperSport 4K. R199 ngenyanga enye.",
    },
  },

  "iptv-for-movies-and-series": {
    af: {
      title: "IPTV vir Flieks & Reekse Suid-Afrika",
      description:
        "IPTV vir flieks en reekse in Suid-Afrika — films en reekse op aanvraag; bevestig die katalogus op WhatsApp. Geen kontrak. R199 vir een maand.",
    },
    fr: {
      title: "IPTV films & séries Afrique du Sud — VOD",
      description:
        "IPTV pour films et séries en Afrique du Sud — VOD à la demande, catalogue à confirmer sur WhatsApp. Sans engagement. 199 rands pour un mois.",
    },
    "pt-mz": {
      title: "IPTV filmes & séries África do Sul — VOD",
      description:
        "IPTV para filmes e séries na África do Sul — VOD a pedido; confirme o catálogo no WhatsApp. Sem fidelização. R199 por um mês.",
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
