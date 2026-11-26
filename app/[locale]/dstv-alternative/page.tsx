// app/[locale]/dstv-alternative/page.tsx
// SEO pillar page targeting "dstv alternative" (KD 48, ~6.6k/mo ZA).

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../lib/locales";
import { hreflangForProgrammatic, localeUrl, SITE_URL } from "../../../lib/url";
import { robotsForProgrammatic } from "../../../lib/seo/indexability";
import { pillarMetaLocalized } from "../../../lib/seo/pillar-meta-i18n";
import { DSTV_SA_PRICES, DSTV_PRICE_SOURCE } from "../../../lib/seo/dstv-sa-prices";
import { DstvSavingsCalculator } from "../../../components/client/DstvSavingsCalculator";
import { generateWhatsAppLink } from "../../../components/shared/utils";
import { LanguageProvider } from "../../../components/client/LanguageProvider";
import { HeaderNav } from "../../../components/client/HeaderNav";
import { FooterSection } from "../../../components/client/LocalizedSections";
import { StickyBottomCta } from "../../../components/client/StickyBottomCta";
import { PopiaConsentBanner } from "../../../components/client/PopiaConsentBanner";
import { SkipLink } from "../../../components/client/SkipLink";
import { LocaleSync } from "../../../components/client/LocaleSync";
import { SITE } from "../../../components/shared/site";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  const pmeta = pillarMetaLocalized("dstv-alternative", locale as Locale, {
    title: "DStv too expensive? Compare the monthly and upfront cost",
    description:
      "Compare DStv packages with Mzansi prepaid prices. Check the shows you want, your next payment and your device before trying another service.",
  });
  return {
    title: pmeta.title,
    description: pmeta.description,
    alternates: {
      canonical: localeUrl(locale as Locale, "/dstv-alternative"),
      languages: hreflangForProgrammatic(locale as Locale, "/dstv-alternative"),
    },
    openGraph: {
      type: "article",
      url: localeUrl(locale as Locale, "/dstv-alternative"),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title: pmeta.title,
      description: pmeta.description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

const FAQ = [
  { q: "What is the cheapest monthly option in this comparison?", a: "DStv Stream Starter costs R99 per month. Mzansi costs USD 15 for one month or USD 65 upfront for twelve months. Compare the programmes you actually watch before deciding." },
  { q: "Can I keep DStv without a satellite dish?", a: "DStv offers streaming-only packages in South Africa. Check your device, broadband and the package that carries the shows you want." },
  { q: "How do I cancel an ordinary DStv subscription?", a: "Use DStv Self Service, choose My Products and the correct package, then schedule Disconnect for your next payment date. If you have a fixed-term or internet bundle, request an account-specific quote before changing it." },
  { q: "Can I keep a particular sports event or series?", a: "Check the exact fixture or episode with its broadcaster for your country. A channel name is insufficient to confirm a live match, full series or future replay." },
  { q: "What can I test on Mzansi?", a: "The free 24-hour trial lets you check your own TV, remote, programme guide, sound and connection before you pay. Ask on WhatsApp with your country and device. No card is required." },
];

export default async function DstvAlternativePage({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "DStv too expensive? What a South African household can do",
    description:
      "Compare a cheaper DStv package, direct broadcaster access and prepaid streaming using the amount due today.",
    image: `${SITE_URL}/og-image.jpg`,
    datePublished: "2026-01-15",
    dateModified: "2026-11-26",
    author: { "@type": "Organization", name: SITE.brand },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
    },
    mainEntityOfPage: localeUrl(locale as Locale, "/dstv-alternative"),
    inLanguage: LOCALE_META[locale as Locale].hreflang,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale as Locale, "/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "DStv Alternative",
        item: localeUrl(locale as Locale, "/dstv-alternative"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
              <p className="longformEyebrow">DStv Alternative · 2026 Guide</p>
              <h1>DStv too expensive? Compare your South African options</h1>
              <p className="longformLead">Start with the shows your household watched last week and the amount you can spend today. DStv Stream Starter is R99 for one month. A month of Mzansi Stream is USD 15. Mzansi’s USD 65 annual offer is paid in full, which works out to USD 5.42 a month.</p>
              <p className="trustStrip">South Africa · Prices checked 26 November 2026 · All amounts in rand</p>
              <div className="ctaRow">
                <a href="#calculator" className="btnSecondary">Compare my costs</a>
                <Link href="/en-za/blog/dstv-price-south-africa" className="btnSecondary">Read the full price guide</Link>
              </div>
            </header>
            <section className="longformSection">
              <h2>Three routes to a smaller bill</h2>
              <ol className="longformList">
                <li><strong>Keep DStv and change package.</strong> Look up the shows and sport you use in the current DStv guide. Check your next payment date and any fixed-term commitments.</li>
                <li><strong>Go straight to the broadcaster.</strong> If the household mostly watches the news or listens to the radio, check <Link href="/en-za/blog/sabc-without-dstv">what SABC+ offers directly</Link>. Some services are available free.</li>
                <li><strong>Test an independent service on your device.</strong> Try your normal viewing time, remote, subtitles and guide before choosing a prepaid term. A different service has its own catalogue.</li>
              </ol>
            </section>
            <section className="longformSection" id="calculator">
              <h2>Compare twelve months of subscription payments</h2>
              <p>The calculator compares DStv’s standard price on your chosen service with one annual Mzansi payment. It excludes your broadband bill, hardware, access fees and discounts.</p>
              <DstvSavingsCalculator />
            </section>
            <section className="longformSection">
              <h2>Current DStv prices in South Africa</h2>
              <div className="compareTableWrap"><table className="compareTable">
                <thead><tr><th scope="col">Package</th><th scope="col">Stream per month</th><th scope="col">Satellite per month</th></tr></thead>
                <tbody>{DSTV_SA_PRICES.map((plan) => <tr key={plan.name}><th scope="row">{plan.name}</th><td>R{plan.stream}</td><td>R{plan.satellite}</td></tr>)}</tbody>
              </table></div>
              <p>DStv also advertises Premium satellite at R799 per month on a 24-month contract including the access fee. The standard month-to-month satellite price is R979. <a href={DSTV_PRICE_SOURCE}>Official DStv price and package guide</a>.</p>
              <p>Seeing more channels than usual? Check the <Link href="/en-za/blog/dstv-open-time-2026">South African Open Time dates and eligibility</Link> before upgrading or downgrading.</p>
            </section>
            <section className="longformSection" id="pricing">
              <h2>What you pay Mzansi today</h2>
              <ul className="longformList"><li>One month — USD 15</li><li>Day pass — USD 5</li><li>Twelve months — USD 65</li></ul>
              <p>Each term is prepaid. A full year of DStv Stream Starter would cost R1,188 at its current monthly price. That is R11 less than the Mzansi annual subscription. Programme availability and device compatibility matter as much as the difference.</p>
            </section>
            <section className="longformSection" id="trial">
              <h2>Try it before changing your DStv account</h2>
              <p>Tell us your country and device. Test the picture, audio and listings for 24 hours without a card. If you later want to leave DStv, use its own account service to <Link href="/en-za/cancel-dstv-2026">schedule disconnection at your next payment date</Link>.</p>
              <div className="ctaRow"><a href={generateWhatsAppLink("I’m in [country] and use [device]. I’d like to try Mzansi Stream for 24 hours before I pay.", "", "DStv-Alt-Trial-CTA")} className="btnPrimary" data-track-ref="DStv-Alt-Trial-CTA" target="_blank" rel="noreferrer">Try Mzansi Stream free for 24 hours</a></div>
            </section>

            <section className="longformSection" id="faq">
              <h2>FAQ</h2>
              {FAQ.map((f) => (
                <details key={f.q} className="faqItem">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
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
