// app/[locale]/iptv-springboks-uk/page.tsx
// Thin FAQ hub for Seo short slug `iptv-springboks-uk`.
// Visible accordion + FAQPage = SPRINGBOKS_LONDON_P1_FAQ (same pack as
// /blog/watch-springboks-from-london/). Conversion = wa.me/447307410512.
// 0 AggregateRating. 0 mailto. Does not reconstruct the live blog.

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { LOCALES, LOCALE_META, type Locale } from "../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../lib/url";
import { robotsForProgrammatic } from "../../../lib/seo/indexability";
import { SPRINGBOKS_UK_HUB, SPRINGBOKS_UK_HUB_PATH } from "../../../lib/seo/springboks-uk-hub";
import { JsonLd } from "../../../lib/seo/jsonld";
import { LongformShell } from "../../../components/client/LongformShell";
import { DirectAnswerBlock } from "../../../components/seo/DirectAnswerBlock";
import { DiasporaSoftSellCta } from "../../../components/seo/DiasporaSoftSellCta";
import { InternalLinkHub } from "../../../components/seo/InternalLinkHub";
import { SITE } from "../../../components/shared/site";
import { waMeLink } from "../../../components/shared/utils";

const SLUG = SPRINGBOKS_UK_HUB.slug;

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  const loc = locale as Locale;
  return {
    title: SPRINGBOKS_UK_HUB.title,
    description: SPRINGBOKS_UK_HUB.metaDescription,
    alternates: {
      canonical: localeUrl(loc, SPRINGBOKS_UK_HUB_PATH),
      languages: hreflangFor(SPRINGBOKS_UK_HUB_PATH),
    },
    openGraph: {
      type: "article",
      url: localeUrl(loc, SPRINGBOKS_UK_HUB_PATH),
      locale: LOCALE_META[loc].ogLocale,
      title: SPRINGBOKS_UK_HUB.title,
      description: SPRINGBOKS_UK_HUB.metaDescription,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(loc),
  };
}

export default async function IptvSpringboksUkHubPage({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const loc = locale as Locale;
  const hub = SPRINGBOKS_UK_HUB;
  const canonical = localeUrl(loc, SPRINGBOKS_UK_HUB_PATH);
  const waHref = waMeLink(hub.cta.message, hub.cta.ref);

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: canonical,
    name: hub.title,
    description: hub.metaDescription,
    inLanguage: LOCALE_META[loc].hreflang,
    datePublished: hub.datePublished,
    dateModified: hub.dateModified,
    mainEntity: { "@id": `${canonical}#faq` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(loc, "/") },
      { "@type": "ListItem", position: 2, name: hub.h1, item: canonical },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: hub.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <LongformShell locale={loc}>
        <article className="section">
          <header className="longformHeader">
            <p className="longformEyebrow">
              <Link href={`/${locale}/blog/watch-springboks-from-london/`}>
                London rugby guide
              </Link>
              {" · "}
              <time dateTime={hub.datePublished}>{hub.datePublished}</time>
            </p>
            <h1>{hub.h1}</h1>
            <p className="longformLead">{hub.lead}</p>
            <div className="ctaRow">
              <a
                href={waHref}
                className="btnPrimary"
                target="_blank"
                rel="noreferrer"
                data-track-ref={hub.cta.ref}
                data-track-placement={`Hub-${SLUG}-Hero`}
              >
                {hub.cta.label}
              </a>
            </div>
          </header>

          <DirectAnswerBlock
            question={hub.h1}
            answer={hub.lead}
            keyFacts={[...hub.keyFacts]}
          />

          <section className="longformSection" id="faq">
            <h2>Frequently asked questions</h2>
            {hub.faq.map((f) => (
              <details key={f.q} className="faqItem">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </section>

          <DiasporaSoftSellCta
            variant="end"
            slug={SLUG}
            place="London / the UK"
          />

          <section className="longformSection" id="next-step">
            <h2>Ready? Message us on WhatsApp</h2>
            <p>
              {SITE.brand} sends a free 24-hour trial on WhatsApp — name the
              device, name the fixtures you care about, then decide. No
              credit card. No email thread.
            </p>
            <div className="ctaRow">
              <a
                href={waHref}
                className="btnPrimary"
                target="_blank"
                rel="noreferrer"
                data-track-ref={hub.cta.ref}
                data-track-placement={`Hub-${SLUG}-Footer-CTA`}
              >
                {hub.cta.label}
              </a>
            </div>
            <p>
              <a href={waHref} target="_blank" rel="noreferrer">
                {`https://wa.me/${SITE.whatsappPhone}`}
              </a>
              {" · "}
              +44 7307 410512
            </p>
          </section>

          <section className="longformSection">
            <h2>Related</h2>
            <ul className="longformList">
              {hub.relatedLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <InternalLinkHub
            locale={loc}
            heading="More buyer-intent guides"
            exclude={[`/${SLUG}/`]}
          />
        </article>
      </LongformShell>
    </>
  );
}
