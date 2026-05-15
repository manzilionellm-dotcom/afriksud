// app/[locale]/sadc/[country]/page.tsx
// 8 SADC country pages — dynamically generated from lib/seo/sadc-countries.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../../lib/url";
import { SADC_SLUGS, getSadcCountry } from "../../../../lib/seo/sadc-countries";
import { LanguageProvider } from "../../../../components/client/LanguageProvider";
import { HeaderNav } from "../../../../components/client/HeaderNav";
import { FooterSection } from "../../../../components/client/LocalizedSections";
import { WhatsAppFab } from "../../../../components/client/WhatsAppFab";
import { StickyBottomCta } from "../../../../components/client/StickyBottomCta";
import { PopiaConsentBanner } from "../../../../components/client/PopiaConsentBanner";
import { SkipLink } from "../../../../components/client/SkipLink";
import { LocaleSync } from "../../../../components/client/LocaleSync";
import { SITE } from "../../../../components/shared/site";

type Props = { params: Promise<{ locale: string; country: string }> };

export function generateStaticParams() {
  // Generate every (locale, country) combination so that hreflang links
  // resolve to real pages instead of soft-404s. The page content is the
  // same English copy for non-localised variants — translation pass is
  // a follow-up content task, not a routing concern.
  return LOCALES.flatMap((locale) =>
    SADC_SLUGS.map((country) => ({ locale, country }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country } = await params;
  const data = getSadcCountry(country);
  if (!(LOCALES as readonly string[]).includes(locale) || !data) return {};
  return {
    title: data.meta.title,
    description: data.meta.description,
    alternates: {
      canonical: localeUrl(locale as Locale, `/sadc/${country}/`),
      languages: hreflangFor(`/sadc/${country}/`),
    },
    openGraph: {
      type: "article",
      url: localeUrl(locale as Locale, `/sadc/${country}/`),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title: data.meta.title,
      description: data.meta.description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function SadcCountryPage({ params }: Props) {
  const { locale, country } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const data = getSadcCountry(country);
  if (!data) notFound();

  // Local FAQ — keeps each page distinct on intent.
  const faq = [
    {
      q: `Is IPTV legal in ${data.name}?`,
      a: `Streaming TV is not illegal per se in ${data.name}. What's illegal in most jurisdictions is the unauthorised distribution of copyrighted content. Mzansi Stream sources its channels via licensed partners and processes payments through traceable channels.`,
    },
    {
      q: `Will this work on ${data.isps.slice(0, 2).join(" or ")}?`,
      a: `Yes — Mzansi Stream is optimised for ${data.isps.join(", ")}. CDN edges in Johannesburg and Cape Town deliver 4K with low latency across ${data.name}.`,
    },
    {
      q: `Can I pay in ${data.currency.code} or USD?`,
      a: `You can pay in ${data.payments.slice(0, 4).join(", ")} or via international card and PayPal. ${data.currency.usdParityNote ?? ""}`.trim(),
    },
    {
      q: `Do I need a VPN in ${data.name}?`,
      a: `Generally no — the service works without a VPN. Some viewers add one for privacy; it's a personal choice, not a requirement.`,
    },
    {
      q: "What happens during a power cut?",
      a: "Watch over 4G/5G data on your phone or tablet while the power's off. The service auto-resumes on reconnect; no re-activation needed.",
    },
    {
      q: `What local ${data.name} channels are included?`,
      a: `Mzansi Stream carries ${data.localChannels.join(", ")} plus the full SABC and SuperSport line-up and 20,000+ international channels.`,
    },
    {
      q: `Is this a DStv ${data.name} replacement?`,
      a: data.dstvNote,
    },
    {
      q: "How fast is activation?",
      a: "Usually within 10 minutes of payment on WhatsApp, including weekends and public holidays.",
    },
    {
      q: "Is there a contract?",
      a: "No contract, no auto-renewal. You pay for the period you select and the service ends at the end of that period.",
    },
    {
      q: "What's the refund policy?",
      a: "7-day money-back guarantee. If the service doesn't work for you within the first week, we refund in full.",
    },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.hero.h1,
    description: data.hero.lead,
    image: `${SITE_URL}/og-image.jpg`,
    datePublished: "2026-01-15",
    dateModified: "2026-05-15",
    author: { "@type": "Organization", name: SITE.brand },
    mainEntityOfPage: localeUrl(locale as Locale, `/sadc/${country}/`),
    inLanguage: LOCALE_META[locale as Locale].hreflang,
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Mzansi Stream — ${data.name}`,
    description: data.hero.lead,
    areaServed: [
      { "@type": "Country", name: data.name },
      ...data.cities.map((c) => ({ "@type": "City", name: c })),
    ],
    address: { "@type": "PostalAddress", addressCountry: data.iso2 },
    url: localeUrl(locale as Locale, `/sadc/${country}/`),
    priceRange: `${data.pricing[0].price} - ${data.pricing[data.pricing.length - 1].price}`,
    paymentAccepted: data.payments.join(", "),
    currenciesAccepted: data.currency.code,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
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
              <p className="longformEyebrow">
                {data.flag} {data.name} · IPTV 2026
              </p>
              <h1>{data.hero.h1}</h1>
              <p className="longformLead">{data.hero.lead}</p>
              <div className="ctaRow">
                <a href="#trial" className="btnPrimary">
                  Free 24h trial →
                </a>
                <a href="#pricing" className="btnSecondary">
                  See plans →
                </a>
              </div>
            </header>

            <section className="longformSection" id="pricing">
              <h2>Pricing in {data.name}</h2>
              <ul className="longformList">
                {data.pricing.map((p) => (
                  <li key={p.months}>
                    <strong>
                      {p.months} {p.months === 1 ? "month" : "months"} — {p.price}
                    </strong>
                    {p.tag ? <span> · {p.tag}</span> : null}
                  </li>
                ))}
              </ul>
              <p>{data.currency.usdParityNote}</p>
            </section>

            <section className="longformSection">
              <h2>Payment methods accepted in {data.name}</h2>
              <ul className="longformList">
                {data.payments.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>

            <section className="longformSection">
              <h2>Local channels and DStv alternative</h2>
              <p>{data.dstvNote}</p>
              <p>
                <strong>Local channels included:</strong>{" "}
                {data.localChannels.join(", ")}.
              </p>
              <p>
                <strong>Plus:</strong> every SuperSport feed (PSL, Premier
                League, Variety, Rugby, Cricket), SABC, kykNET, Mzansi
                Magic, M-Net Movies, and 20,000+ international channels in
                4K.
              </p>
            </section>

            <section className="longformSection">
              <h2>Works on every device on your network</h2>
              <p>
                Smart TV (Samsung, LG, Sony, Hisense), Firestick, Android TV
                Box, MAG Box, iPhone, iPad, Android, PC and Mac. Use
                TiviMate, IPTV Smarters Pro, GSE Smart IPTV or any standard
                M3U player.
              </p>
              <p>
                <strong>Tested on local ISPs:</strong> {data.isps.join(", ")}.
              </p>
            </section>

            <section className="longformSection">
              <h2>How to get IPTV in {data.name} — 3 steps</h2>
              <ol className="longformList">
                <li>Message us on WhatsApp.</li>
                <li>
                  Pick a plan (from {data.pricing[0].price}) and pay via{" "}
                  {data.payments.slice(0, 3).join(", ")} or card.
                </li>
                <li>
                  Receive your M3U link plus a setup guide for your device —
                  usually live within 10 minutes.
                </li>
              </ol>
            </section>

            <section className="longformSection">
              <h2>{data.name} cities served</h2>
              <p>{data.cities.join(", ")}.</p>
            </section>

            <section className="longformSection" id="faq">
              <h2>FAQ — Mzansi Stream {data.name}</h2>
              {faq.map((f) => (
                <details key={f.q} className="faqItem">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </section>

            <section className="longformSection" id="trial">
              <h2>Get started today</h2>
              <p>
                24-hour free trial, no card. Activated on WhatsApp within 10
                minutes.
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
