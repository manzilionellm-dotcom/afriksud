// lib/seo/sa-languages.ts
// 4 dedicated SA-language landing pages. Slug stays English for URL
// stability; the page body is rendered in the matching language.

export type SALanguagePage = {
  slug: string;
  /** Locale code the page is intended to surface under. */
  preferredLocale: string;
  title: string;
  metaDescription: string;
  hero: { h1: string; lead: string; cta: string };
  featuredChannels: string[];
  body: { h2: string; paragraphs: string[] }[];
};

export const SA_LANGUAGE_PAGES: SALanguagePage[] = [
  {
    slug: "iptv-afrikaans",
    preferredLocale: "af",
    title: "IPTV Afrikaans 2026 — kykNET, kykNET & Kie, kykNET Lekker in 4K",
    metaDescription:
      "Kyk kykNET, kykNET & Kie en kykNET Lekker in 4K. 20 000+ kanale, geen kontrak, vanaf R99/maand. Aktiveer op WhatsApp in 10 minute.",
    hero: {
      h1: "IPTV in Afrikaans — kykNET, kykNET & Kie, kykNET Lekker in 4K",
      lead: "20 000+ lewendige kanale in 4K — die volle kykNET-pakket, SuperSport, SABC, Mzansi Magic en wêreldwye inhoud. Vanaf R99/maand, geen kontrak, geen dekodeerder.",
      cta: "Begin gratis 24-uur proef",
    },
    featuredChannels: [
      "kykNET",
      "kykNET & Kie",
      "kykNET Lekker",
      "kykNET Musiek",
      "kykNET Nou!",
      "VIA",
      "VIA Lekker",
    ],
    body: [
      {
        h2: "Volle kykNET-pakket",
        paragraphs: [
          "Die volle kykNET-familie is ingesluit — kykNET, kykNET & Kie, kykNET Lekker, kykNET Musiek en VIA. Alle gewilde dramas, sake-programme en realiteitsreekse in HD en 4K.",
        ],
      },
      {
        h2: "Werk op enige toestel",
        paragraphs: [
          "Smart TV, Firestick, Android TV, iPhone, Android, MAG Box of rekenaar. Ons stuur die M3U-skakel via WhatsApp en lei jou stap-vir-stap deur die installasie.",
        ],
      },
    ],
  },
  {
    slug: "iptv-zulu",
    preferredLocale: "zu",
    title: "I-IPTV ngesiZulu 2026 — Mzansi Magic, Moja Love, SuperSport ku-4K",
    metaDescription:
      "Buka i-Mzansi Magic, Mzansi Wethu, Moja Love ne-SuperSport ku-4K. Iziteshi ezi-20,000+, akukho nkontileka, kusukela ku-R99/inyanga.",
    hero: {
      h1: "I-IPTV ngesiZulu — Mzansi Magic, Moja Love, SuperSport ku-4K",
      lead: "Iziteshi ezi-20,000+ ezibukhoma ku-4K — Mzansi Magic, Mzansi Wethu, Moja Love, SuperSport PSL ne-SABC. Kusukela ku-R99/inyanga, akukho nkontileka, akukho dikhoda.",
      cta: "Qala Ukulinga Kwamahhala Kwama-24h",
    },
    featuredChannels: [
      "Mzansi Magic",
      "Mzansi Wethu",
      "Moja Love",
      "1 Magic",
      "Honey",
      "SABC 1",
      "SABC 2",
      "SuperSport PSL",
    ],
    body: [
      {
        h2: "Iziteshi zesintu wonke",
        paragraphs: [
          "Mzansi Magic, Mzansi Wethu, Moja Love, 1 Magic, Honey kanye ne-SABC 1, 2 no-3 zonke zifakiwe. Bukela imidlalo, izinkulumo zansuku zonke nezindaba ku-HD nakwi-4K.",
        ],
      },
      {
        h2: "I-PSL ne-SuperSport",
        paragraphs: [
          "Yonke imidlalo ye-DStv Premiership, i-Premier League ne-URC iku-SuperSport PSL ne-Variety 1-4 ku-4K, ngaphandle kwedikhoda ye-DStv.",
        ],
      },
    ],
  },
  {
    slug: "iptv-xhosa",
    preferredLocale: "xh",
    title: "IPTV ngesiXhosa 2026 — Mzansi Magic, Moja Love, SuperSport ku-4K",
    metaDescription:
      "Bukela i-Mzansi Magic, Moja Love ne-SuperSport ku-4K. 20,000+ iitshaneli, akukho sivumelwano, ukusuka ku-R99/inyanga.",
    hero: {
      h1: "IPTV ngesiXhosa — Mzansi Magic, Moja Love, SuperSport ku-4K",
      lead: "20,000+ iitshaneli ezibukhoma ku-4K — Mzansi Magic, Mzansi Wethu, Moja Love, SuperSport PSL ne-SABC. Ukusuka ku-R99/inyanga, akukho sivumelwano, akukho dekhoda.",
      cta: "Qala uvavanyo lwasimahla lweyure ezingama-24",
    },
    featuredChannels: [
      "Mzansi Magic",
      "Mzansi Wethu",
      "Moja Love",
      "1 Magic",
      "SABC 1",
      "SABC 2",
      "SABC 3",
      "SuperSport PSL",
    ],
    body: [
      {
        h2: "Iitshaneli zomthonyama zonke",
        paragraphs: [
          "Mzansi Magic, Mzansi Wethu, Moja Love, 1 Magic kunye ne-SABC 1, 2 no-3 zonke zifakiwe. Bukela amabali, iindaba kunye nemiboniso bhanya-bhanya ku-HD nakwi-4K.",
        ],
      },
    ],
  },
  {
    slug: "iptv-portuguese-mozambique",
    preferredLocale: "pt-mz",
    title: "IPTV Português Moçambique 2026 — TVM, RTP África, SuperSport em 4K",
    metaDescription:
      "TVM, RTP África, SIC, TVI, STV e SuperSport em 4K. 20.000+ canais ao vivo, sem fidelização, desde 700 MT/mês.",
    hero: {
      h1: "IPTV Português Moçambique — TVM, RTP África, SuperSport em 4K",
      lead: "20.000+ canais ao vivo em 4K — TVM, RTP África, SIC, TVI, STV e a linha completa SuperSport. Desde 700 MT/mês, sem fidelização, sem descodificador.",
      cta: "Pedir o meu teste grátis de 24h",
    },
    featuredChannels: [
      "TVM",
      "RTP África",
      "SIC",
      "TVI",
      "STV",
      "SuperSport Premier League",
      "SuperSport PSL",
    ],
    body: [
      {
        h2: "Canais portugueses incluídos",
        paragraphs: [
          "Toda a oferta de canais portugueses está incluída — TVM, RTP África, SIC, TVI e STV — em HD e 4K. Filmes, séries e desporto da Liga Portuguesa em direto.",
        ],
      },
      {
        h2: "Pagamento em Moçambique",
        paragraphs: [
          "Pagamento via M-Pesa Moçambique, mKesh, USD, Visa ou Mastercard. Activação por WhatsApp em 10 minutos.",
        ],
      },
    ],
  },
];

export function getSALanguagePage(slug: string): SALanguagePage | undefined {
  return SA_LANGUAGE_PAGES.find((p) => p.slug === slug);
}

export const SA_LANGUAGE_SLUGS = SA_LANGUAGE_PAGES.map((p) => p.slug);
