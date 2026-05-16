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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
              <div className="ctaRow">
                <a href="#trial" className="btnPrimary">
                  Switch — Free 24h trial →
                </a>
                <a href="#table" className="btnSecondary">
                  See the comparison →
                </a>
              </div>
            </header>

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

            <section className="longformSection" id="trial">
              <h2>Switch from {data.name} today</h2>
              <p>
                24-hour free trial, no card. Pay only if it works for you.
                Activated on WhatsApp within 10 minutes.
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
