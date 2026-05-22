// components/seo/PillarTemplate.tsx
// Server component. Renders any pillar page from `lib/seo/pillars.ts`
// — long-form copy, in-page TOC, HowTo-aware steps, FAQ accordion,
// related-link cluster and the full schema stack (Article + FAQPage
// + HowTo when steps exist + BreadcrumbList).

import Link from "next/link";
import { LOCALE_META, type Locale } from "../../lib/locales";
import { localeUrl, SITE_URL } from "../../lib/url";
import { SITE } from "../shared/site";
import { generateWhatsAppLink } from "../shared/utils";
import { LongformShell } from "../client/LongformShell";
import type { Pillar } from "../../lib/seo/pillars";
import { InlinePricingBlock } from "./InlinePricingBlock";
import { TrustReversalBlock } from "./TrustReversalBlock";
import { InternalLinkHub } from "./InternalLinkHub";
import { DirectAnswerBlock } from "./DirectAnswerBlock";
import { JsonLd } from "../../lib/seo/jsonld";
import { ORG_ID, WEBSITE_ID } from "../../lib/seo/entity";

export function PillarTemplate({
  pillar,
  locale,
}: {
  pillar: Pillar;
  locale: Locale;
}) {
  const canonical = localeUrl(locale, `/${pillar.slug}/`);
  const primaryHref = generateWhatsAppLink(
    pillar.cta.primary.message,
    "",
    pillar.cta.primary.ref
  );

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pillar.h1,
    description: pillar.metaDescription,
    image: `${SITE_URL}/og-image.jpg`,
    datePublished: pillar.datePublished,
    dateModified: pillar.dateModified,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: canonical,
    inLanguage: LOCALE_META[locale].hreflang,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@type": "Thing", name: pillar.h1 },
  };

  // WebPage + Speakable. Marks the direct-answer block + lead so AI
  // Overviews / voice surfaces have a high-confidence quotable span.
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: pillar.metaTitle,
    description: pillar.metaDescription,
    inLanguage: LOCALE_META[locale].hreflang,
    isPartOf: { "@id": WEBSITE_ID },
    primaryImageOfPage: `${SITE_URL}/og-image.jpg`,
    datePublished: pillar.datePublished,
    dateModified: pillar.dateModified,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".longformLead", ".direct-answer"],
    },
    breadcrumb: {
      "@id": `${canonical}#breadcrumb`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pillar.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale, "/") },
      {
        "@type": "ListItem",
        position: 2,
        name: pillar.h1,
        item: canonical,
      },
    ],
  };

  // Emit a HowTo schema if any section has steps[].
  const howToSection = pillar.sections.find((s) => s.steps && s.steps.length);
  const howToSchema = howToSection
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: howToSection.h2,
        description: howToSection.paragraphs?.[0] ?? pillar.metaDescription,
        totalTime: "PT10M",
        supply: [
          { "@type": "HowToSupply", name: "Internet connection (min 25 Mbps for 4K)" },
          { "@type": "HowToSupply", name: "Mzansi Stream M3U link + Xtream Codes credentials" },
        ],
        tool: [
          { "@type": "HowToTool", name: "Smart TV, Firestick, Android TV box or any standard M3U player" },
        ],
        step: howToSection.steps!.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.text,
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      {howToSchema ? <JsonLd data={howToSchema} /> : null}

      <LongformShell locale={locale}>
        <article className="section">
          <header className="longformHeader">
            <p className="longformEyebrow">{pillar.eyebrow}</p>
            <h1>{pillar.h1}</h1>
            <p className="longformLead">{pillar.lead}</p>
            {pillar.trustLine ? (
              <p className="trustStrip" style={{ marginTop: 16 }}>
                {pillar.trustLine}
              </p>
            ) : null}
            <div className="ctaRow">
              <a
                href={primaryHref}
                className="btnPrimary"
                target="_blank"
                rel="noreferrer"
                data-track-ref={pillar.cta.primary.ref}
                data-track-placement={`Pillar-${pillar.slug}-Hero`}
              >
                {pillar.cta.primary.label}
              </a>
              {pillar.cta.secondary ? (
                <a
                  href={pillar.cta.secondary.href}
                  className="btnSecondary"
                  data-track-ref={`Pillar-${pillar.slug}-Hero-Secondary`}
                  data-track-placement={`Pillar-${pillar.slug}-Hero`}
                >
                  {pillar.cta.secondary.label}
                </a>
              ) : null}
            </div>
          </header>

          <DirectAnswerBlock
            question={pillar.h1}
            answer={pillar.lead}
            keyFacts={
              pillar.trustLine
                ? [pillar.trustLine, "From R99/month. 24-hour free trial, no credit card. Activated on WhatsApp in 10 minutes."]
                : undefined
            }
          />

          <nav aria-label="On this page" className="longformSection">
            <h2 className="sr-only">On this page</h2>
            <ul className="longformList">
              {pillar.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.h2}</a>
                </li>
              ))}
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </nav>

          {pillar.sections.map((s) => (
            <section key={s.id} id={s.id} className="longformSection">
              <h2>{s.h2}</h2>
              {s.paragraphs?.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {s.bullets ? (
                <ul className="longformList">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
              {s.steps ? (
                <ol className="longformList">
                  {s.steps.map((st) => (
                    <li key={st.title}>
                      <strong>{st.title}.</strong> {st.text}
                    </li>
                  ))}
                </ol>
              ) : null}
            </section>
          ))}

          <section className="longformSection" id="faq">
            <h2>Frequently asked questions</h2>
            {pillar.faq.map((f) => (
              <details key={f.q} className="faqItem">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </section>

          <TrustReversalBlock locale={locale} />

          <InlinePricingBlock
            locale={locale}
            refTag={`Pillar-${pillar.slug}`}
            heading="Pricing — from R99/month, no contract"
            sub="Pick a plan, message us on WhatsApp, and we activate within 10 minutes. 24-hour free trial available before you pay."
          />

          <section className="longformSection" id="next-step">
            <h2>Ready to start? Free 24h trial — no card</h2>
            <p>
              Message {SITE.brand} on WhatsApp and we activate your free
              24-hour trial within 10 minutes. Full 20,000+ channel lineup,
              4K UHD, EPG, support in English — no credit card required.
            </p>
            <div className="ctaRow">
              <a
                href={primaryHref}
                className="btnPrimary"
                target="_blank"
                rel="noreferrer"
                data-track-ref={pillar.cta.primary.ref}
                data-track-placement={`Pillar-${pillar.slug}-Footer-CTA`}
              >
                {pillar.cta.primary.label}
              </a>
            </div>
          </section>

          <section className="longformSection">
            <h2>Related guides</h2>
            <ul className="longformList">
              {pillar.related.map((r) => (
                <li key={r.href}>
                  <Link href={`/${locale}${r.href}`}>{r.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <InternalLinkHub
            locale={locale}
            exclude={[`/${pillar.slug}/`]}
          />
        </article>
      </LongformShell>
    </>
  );
}
