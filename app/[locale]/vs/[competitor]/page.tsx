// app/[locale]/vs/[competitor]/page.tsx
// 8 versus-competitor pages generated from lib/seo/competitors.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../../lib/url";
import { robotsForProgrammatic } from "../../../../lib/seo/indexability";
import {
  COMPETITOR_SLUGS,
  getCompetitor,
} from "../../../../lib/seo/competitors";
import { LanguageProvider } from "../../../../components/client/LanguageProvider";
import { HeaderNav } from "../../../../components/client/HeaderNav";
import { FooterSection } from "../../../../components/client/LocalizedSections";
import { WhatsAppFab } from "../../../../components/client/WhatsAppFab";
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
      canonical: localeUrl(locale as Locale, `/vs/${competitor}/`),
      languages: hreflangFor(`/vs/${competitor}/`),
    },
    openGraph: {
      type: "article",
      url: localeUrl(locale as Locale, `/vs/${competitor}/`),
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
        item: localeUrl(locale as Locale, "/vs/"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.name,
        item: localeUrl(locale as Locale, `/vs/${competitor}/`),
      },
    ],
  };

  // Auto-generated FAQ from the comparison data so every /vs/ page emits
  // FAQPage schema. Owner can replace with bespoke entries later.
  const faqEntries = [
    {
      q: `Is Mzansi Stream a real alternative to ${data.name}?`,
      a: `Yes — Mzansi Stream covers the same core channels as ${data.name} (where rights overlap) in 4K UHD, from R99/month, with no contract and no decoder. Activated on WhatsApp in under 10 minutes.`,
    },
    {
      q: `How much can I save by switching from ${data.name}?`,
      a: `${data.name} is ${data.priceMonthly}/month${
        data.priceYearly ? ` (${data.priceYearly}/year)` : ""
      }. Mzansi Stream starts at R99/month — most households save R8,000-R10,000 a year by switching.`,
    },
    {
      q: `Do I need a decoder to switch from ${data.name}?`,
      a: `No — Mzansi Stream runs on devices you already own: Firestick, Samsung Tizen, LG webOS, Hisense VIDAA Smart TVs, iPhone, iPad, Android phone, Android TV box and PC. No decoder, no installer, no contract.`,
    },
    {
      q: `Can I try Mzansi Stream before I cancel ${data.name}?`,
      a: `Yes — Mzansi Stream offers a 24-hour free trial on WhatsApp with no credit card required. Test it during peak hours before cancelling your current subscription.`,
    },
    {
      q: `Is Mzansi Stream legal in South Africa?`,
      a: `Streaming TV is not illegal per se in South Africa — what's illegal is distributing copyrighted content without authorisation. Mzansi Stream sources channels via licensed partners, accepts traceable payment via every major SA method and processes customer data under POPIA.`,
    },
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
                From R99/mo · 24h free trial, no card · NAPAfrica-peered · 7-day satisfaction guarantee
              </p>
              <div className="ctaRow">
                <a
                  href="#pricing"
                  className="btnPrimary"
                  data-track-ref={`Vs-${competitor}-Hero-Pricing`}
                  data-track-placement={`Vs-${competitor}-Hero`}
                >
                  See plans from R99/mo →
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
              question={`Is Mzansi Stream a real alternative to ${data.name}?`}
              answer={`Yes. Mzansi Stream covers the same core channels as ${data.name} (where rights overlap) in 4K UHD for R99/month, with no contract, no decoder and no installer visit. Activation runs on WhatsApp in under 10 minutes. ${data.name} is ${data.priceMonthly}/month${data.priceYearly ? ` (${data.priceYearly}/year)` : ""}; the Mzansi Stream 12-month plan works out to R99.92/month effective — most households save R8,000-R10,000 a year by switching.`}
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
              <h2>Where {data.name} genuinely wins</h2>
              <ul className="longformList">
                {data.theirStrengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>

            <section className="longformSection">
              <h2>Where Mzansi Stream beats {data.name}</h2>
              <ul className="longformList">
                {data.ourEdge.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>

            <TrustReversalBlock locale={locale as Locale} />

            <InlinePricingBlock
              locale={locale as Locale}
              refTag={`Vs-${competitor}`}
              heading={`Switch from ${data.name} — plans from R99/month`}
              sub={`Same SuperSport, same kykNET, same SABC, 20,000+ more channels in 4K. No contract, no decoder. Activated on WhatsApp in 10 minutes.`}
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
              exclude={[`/vs/${competitor}/`]}
            />

            <section className="longformSection" id="trial">
              <h2>Switch from {data.name} today</h2>
              <p>
                24-hour free trial, no card. Pay only if it works for you.
                Activated on WhatsApp within 10 minutes. 7-day satisfaction
                guarantee on every paid plan.
              </p>
            </section>
          </article>
        </main>

        <FooterSection />
        <WhatsAppFab />
        <StickyBottomCta />
        <PopiaConsentBanner />
      </LanguageProvider>
    </>
  );
}
