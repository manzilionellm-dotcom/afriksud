// lib/seo/faq-page.ts
// FAQPage JSON-LD builder. The London Springboks blog uses `reinforce`
// so the graph has stable @ids + inLanguage (rich-result hygiene).
// Other posts keep the historical mainEntity-only shape.

import type { BlogFaq } from "./blog-posts";

type BuildFaqPageOpts = {
  faq: BlogFaq[];
  canonical: string;
  inLanguage: string;
  reinforce?: boolean;
};

export function buildFaqPageSchema({
  faq,
  canonical,
  inLanguage,
  reinforce = false,
}: BuildFaqPageOpts) {
  const mainEntity = faq.map((f, i) => ({
    "@type": "Question" as const,
    ...(reinforce ? { "@id": `${canonical}#faq-q${i + 1}` } : {}),
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: f.a,
      ...(reinforce ? { inLanguage } : {}),
    },
  }));

  const base = {
    "@context": "https://schema.org",
    "@type": "FAQPage" as const,
    mainEntity,
  };

  if (!reinforce) return base;

  return {
    ...base,
    "@id": `${canonical}#faqpage`,
    url: canonical,
    inLanguage,
    mainEntityOfPage: { "@type": "WebPage" as const, "@id": canonical },
  };
}
