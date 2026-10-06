import config from "../aio.config.json";

type Lang = "en";
export const aio = config;
export const defaultLang = config.defaultLang as Lang;

export function faqFor(lang: Lang = defaultLang) {
  return config.i18n[lang].faq;
}

/** Direct answer under the homepage comparison question heading. */
export function compareHook(lang: Lang = defaultLang) {
  return config.i18n[lang].compareHook;
}

/**
 * FAQPage + Product/Offer for the en-ZA sales homepage.
 * Organization is not repeated: entity.ts already emits it at
 * https://iptvmzansi.com/#organization. HowTo is omitted — device
 * tutorials live on their own pages and already emit HowTo there.
 */
export function buildJsonLd(lang: Lang = defaultLang) {
  const url = config.siteUrl;
  const copy = config.i18n[lang];
  const products = config.plans.map((p) => ({
    "@type": "Product",
    "@id": `${url}/en-za#product-${p.id}`,
    name: `${config.siteName} – ${p.name[lang]}`,
    description: copy.productDescription.replace("{name}", p.name[lang]),
    image: `${url}/og-image.jpg`,
    brand: { "@type": "Brand", name: config.siteName },
    offers: {
      "@type": "Offer",
      url: `${url}/en-za#offers`,
      price: p.price.toFixed(2),
      priceCurrency: config.currency,
      availability: "https://schema.org/InStock",
      seller: { "@id": `${url}/#organization` },
    },
  }));
  const faq = {
    "@type": "FAQPage",
    "@id": `${url}/en-za#faq`,
    inLanguage: config.faqInLanguage,
    mainEntity: faqFor(lang).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return { "@context": "https://schema.org", "@graph": [faq, ...products] };
}

/** Safe serialisation for <script type="application/ld+json"> */
export function jsonLdString(lang: Lang = defaultLang) {
  return JSON.stringify(buildJsonLd(lang)).replace(/</g, "\\u003c");
}
