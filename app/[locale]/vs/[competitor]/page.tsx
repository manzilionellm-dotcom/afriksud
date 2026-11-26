// app/[locale]/vs/[competitor]/page.tsx
// 8 versus-competitor pages generated from lib/seo/competitors.

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { hreflangForProgrammatic, localeUrl, SITE_URL } from "../../../../lib/url";
import { robotsForProgrammatic } from "../../../../lib/seo/indexability";
import {
  COMPETITOR_SLUGS,
  getCompetitor,
} from "../../../../lib/seo/competitors";
import { LanguageProvider } from "../../../../components/client/LanguageProvider";
import { HeaderNav } from "../../../../components/client/HeaderNav";
import { FooterSection } from "../../../../components/client/LocalizedSections";
import { StickyBottomCta } from "../../../../components/client/StickyBottomCta";
import { PopiaConsentBanner } from "../../../../components/client/PopiaConsentBanner";
import { SkipLink } from "../../../../components/client/SkipLink";
import { LocaleSync } from "../../../../components/client/LocaleSync";
import { InlinePricingBlock } from "../../../../components/seo/InlinePricingBlock";
import { TrustReversalBlock } from "../../../../components/seo/TrustReversalBlock";
import { InternalLinkHub } from "../../../../components/seo/InternalLinkHub";
import { DirectAnswerBlock } from "../../../../components/seo/DirectAnswerBlock";
import { SITE } from "../../../../components/shared/site";

type Props = { params: Promise<{ locale: string; competitor: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    COMPETITOR_SLUGS.map((competitor) => ({ locale, competitor }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, competitor } = await params;
  const data = getCompetitor(competitor);
  if (!(LOCALES as readonly string[]).includes(locale) || !data) return {};
  return {
    title: data.meta.title,
    description: data.meta.description,
    alternates: {
      canonical: localeUrl(locale as Locale, `/vs/${competitor}`),
      languages: hreflangForProgrammatic(locale as Locale, `/vs/${competitor}`),
    },
    openGraph: {
      type: "article",
      url: localeUrl(locale as Locale, `/vs/${competitor}`),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title: data.meta.title,
      description: data.meta.description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function VersusPage({ params }: Props) {
  const { locale, competitor } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const data = getCompetitor(competitor);
  if (!data) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale as Locale, "/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compare",
        item: localeUrl(locale as Locale, "/vs"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.name,
        item: localeUrl(locale as Locale, `/vs/${competitor}`),
      },
    ],
  };

  // Auto-generated FAQ from the comparison data so every /vs/ page emits
  // FAQPage schema. Owner can replace with bespoke entries later.
  const faqEntries = [
    { q: `What should I check about ${data.name}?`, a: data.hook },
    { q: "What does Mzansi cost upfront?", a: "One month is R199. Twelve months are R1,199 in one payment, equivalent to R99.92 per month. Include any internet, equipment and access costs when comparing services." },
    { q: "Can I test Mzansi before paying?", a: "Request a 24-hour trial without a card, and share your device and country. Check the picture, guide, remote and audio on your own connection." },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <LanguageProvider>
        <LocaleSync locale={locale as Locale} />
        <SkipLink />
        <div className="bg" />
        <HeaderNav />

        <main className="main longform" id="main-content">
          <article className="section">
            <header className="longformHeader">
              <p className="longformEyebrow">Compare · 2026</p>
              <h1>Mzansi Stream vs {data.name}</h1>
              <p className="longformLead">{data.hook}</p>
              <p className="trustStrip" style={{ marginTop: 16 }}>
                One month R199 · Twelve months R1,199 upfront · Free 24-hour trial
              </p>
              <div className="ctaRow">
                <a
                  href="#pricing"
                  className="btnPrimary"
                  data-track-ref={`Vs-${competitor}-Hero-Pricing`}
                  data-track-placement={`Vs-${competitor}-Hero`}
                >
                  Compare prepaid terms →
                </a>
                <a
                  href="#table"
                  className="btnSecondary"
                  data-track-ref={`Vs-${competitor}-Hero-Compare`}
                  data-track-placement={`Vs-${competitor}-Hero`}
                >
                  See the comparison →
                </a>
              </div>
            </header>

            <DirectAnswerBlock
              question={`What is the current position for ${data.name}?`}
              answer={`${data.priceMonthly}. A single month of Mzansi Stream is R199. Check the programme and viewing country before deciding.`}
            />

            <section className="longformSection" id="table">
              <h2>Side-by-side comparison</h2>
              <div className="compareTableWrap">
                <table className="compareTable">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>{data.name}</th>
                      <th className="highlight">Mzansi Stream</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.features.map((f) => (
                      <tr key={f.label}>
                        <td className="featureLabel">{f.label}</td>
                        <td>{f.them}</td>
                        <td className="highlight">{f.us}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="longformSection">
              <h2>What to check with {data.name}</h2>
              <ul className="longformList">
                {data.theirStrengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>

            <section className="longformSection">
              <h2>What to check with Mzansi Stream</h2>
              <ul className="longformList">
                {data.ourEdge.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>

            <section className="longformSection">
              <h2>Check the source and compare prices</h2>
              {data.source && <p><a href={data.source.url}>{data.source.label}</a></p>}
              <p><Link href="/en-za/blog/dstv-price-south-africa">South African DStv prices and Mzansi’s upfront cost</Link></p>
            </section>
            <TrustReversalBlock locale={locale as Locale} />

            <InlinePricingBlock
              locale={locale as Locale}
              refTag={`Vs-${competitor}`}
              heading="Mzansi Stream prepaid prices"
              sub="One month costs R199. A full year costs R1,199 upfront. Test the service on your home connection before choosing."
            />

            <section className="longformSection" id="faq">
              <h2>Frequently asked questions</h2>
              {faqEntries.map((f) => (
                <details key={f.q} className="faqItem">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </section>

            <InternalLinkHub
              locale={locale as Locale}
              heading={`More guides — ${SITE.brand} buyer hub`}
              exclude={[`/vs/${competitor}`]}
            />

            <section className="longformSection" id="trial">
              <h2>Try Mzansi Stream on your device</h2>
              <p>
                24-hour free trial, no card. Pay only if it works for you.
                Activation and support are provided on WhatsApp.
              </p>
            </section>
          </article>
        </main>

        <FooterSection />
        <StickyBottomCta />
        <PopiaConsentBanner />
      </LanguageProvider>
    </>
  );
}
