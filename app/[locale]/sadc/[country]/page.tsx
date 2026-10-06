// app/[locale]/sadc/[country]/page.tsx
// 8 SADC country pages — dynamically generated from lib/seo/sadc-countries.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { hreflangForProgrammatic, localeUrl, SITE_URL } from "../../../../lib/url";
import { robotsForProgrammatic } from "../../../../lib/seo/indexability";
import { SADC_SLUGS, getSadcCountry } from "../../../../lib/seo/sadc-countries";
import { LanguageProvider } from "../../../../components/client/LanguageProvider";
import { HeaderNav } from "../../../../components/client/HeaderNav";
import { FooterSection } from "../../../../components/client/LocalizedSections";
import { StickyBottomCta } from "../../../../components/client/StickyBottomCta";
import { PopiaConsentBanner } from "../../../../components/client/PopiaConsentBanner";
import { SkipLink } from "../../../../components/client/SkipLink";
import { LocaleSync } from "../../../../components/client/LocaleSync";
import { DirectAnswerBlock } from "../../../../components/seo/DirectAnswerBlock";
import { InternalLinkHub } from "../../../../components/seo/InternalLinkHub";
import { TrustReversalBlock } from "../../../../components/seo/TrustReversalBlock";
import { JsonLd } from "../../../../lib/seo/jsonld";
import { ORG_ID, WEBSITE_ID } from "../../../../lib/seo/entity";

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
      canonical: localeUrl(locale as Locale, `/sadc/${country}`),
      languages: hreflangForProgrammatic(locale as Locale, `/sadc/${country}`),
    },
    openGraph: {
      type: "article",
      url: localeUrl(locale as Locale, `/sadc/${country}`),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title: data.meta.title,
      description: data.meta.description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
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
      a: `This page is not legal advice and makes no legality claim for ${data.name}. Unauthorised distribution of copyrighted content is the copyright issue in most places. This page does not state that Mzansi Stream holds channel licences. Payments shown for this country are the methods listed above.`,
    },
    {
      q: `Will this work on ${data.isps.slice(0, 2).join(" or ")}?`,
      a: `It runs over ${data.isps.join(", ")} like any home internet. 4K depends on your line — test it during the 24-hour trial.`,
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
      a: `The line-up lists ${data.localChannels.join(", ")} plus SABC, SuperSport-style and international folders — to confirm on WhatsApp before you pay.`,
    },
    {
      q: `Is this a DStv ${data.name} replacement?`,
      a: data.dstvNote,
    },
    {
      q: "How fast is activation?",
      a: "Activation is done on WhatsApp after payment. We don't publish a fixed delay.",
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

  const canonical = localeUrl(locale as Locale, `/sadc/${country}`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.hero.h1,
    description: data.hero.lead,
    image: `${SITE_URL}/og-image.jpg`,
    datePublished: "2026-01-15",
    dateModified: "2026-05-15",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: canonical,
    inLanguage: LOCALE_META[locale as Locale].hreflang,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@type": "Country", name: data.name },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${canonical}#localbusiness`,
    name: `Mzansi Stream — ${data.name}`,
    description: data.hero.lead,
    parentOrganization: { "@id": ORG_ID },
    image: `${SITE_URL}/og-image.jpg`,
    areaServed: [
      { "@type": "Country", name: data.name },
      ...data.cities.map((c) => ({ "@type": "City", name: c })),
    ],
    address: { "@type": "PostalAddress", addressCountry: data.iso2 },
    url: canonical,
    priceRange: `${data.pricing[0].price} - ${data.pricing[data.pricing.length - 1].price}`,
    paymentAccepted: data.payments.join(", "),
    currenciesAccepted: data.currency.code,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale as Locale, "/") },
      { "@type": "ListItem", position: 2, name: "SADC", item: localeUrl(locale as Locale, "/sadc") },
      { "@type": "ListItem", position: 3, name: data.name, item: canonical },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: data.meta.title,
    description: data.meta.description,
    inLanguage: LOCALE_META[locale as Locale].hreflang,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@type": "Country", name: data.name },
    primaryImageOfPage: `${SITE_URL}/og-image.jpg`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".longformLead", ".direct-answer"],
    },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
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

  const directAnswer = `Mzansi Stream is a no-contract way to watch SuperSport-style, SABC, kykNET and international folders in 4K UHD where the source supports it, from anywhere in ${data.name} — line-up to confirm on WhatsApp. Pricing starts at ${data.pricing[0].price} for one month with no contract and no decoder. Activation runs on WhatsApp. Pay in ${data.payments.slice(0, 3).join(", ")} or via international card and PayPal — ${data.currency.code} accepted${data.currency.usdParityNote ? ` (${data.currency.usdParityNote})` : ""}. Test 4K on ${data.isps.slice(0, 3).join(", ")} or other ${data.name} networks during the 24-hour trial.`;

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={localBusiness} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />

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
              <p className="trustStrip" style={{ marginTop: 16 }}>
                {data.flag} Nationwide {data.name} coverage · 4K SuperSport · Pay in {data.payments.slice(0, 3).join(", ")} · From {data.pricing[0].price}
              </p>
              <div className="ctaRow">
                <a
                  href="#trial"
                  className="btnPrimary"
                  data-track-ref={`Sadc-${country}-Hero-Trial`}
                  data-track-placement={`Sadc-${country}-Hero`}
                >
                  Free 24h trial →
                </a>
                <a
                  href="#pricing"
                  className="btnSecondary"
                  data-track-ref={`Sadc-${country}-Hero-Pricing`}
                  data-track-placement={`Sadc-${country}-Hero`}
                >
                  See plans →
                </a>
              </div>
            </header>

            <DirectAnswerBlock
              question={`How do I watch SuperSport and SA channels in ${data.name}?`}
              answer={directAnswer}
              keyFacts={[
                `Runs over ${data.isps.join(", ")} like any home internet — test 4K on the 24-hour trial.`,
                `Local broadcasters listed (to confirm on WhatsApp): ${data.localChannels.slice(0, 6).join(", ")}.`,
                `Cities served include ${data.cities.slice(0, 4).join(", ")} and every other major ${data.name} metro.`,
              ]}
            />

            <nav aria-label="On this page" className="longformSection">
              <h2 className="sr-only">On this page</h2>
              <ul className="longformList">
                <li><a href="#pricing">Pricing in {data.name}</a></li>
                <li><a href="#payments">Payment methods</a></li>
                <li><a href="#channels">Local channels</a></li>
                <li><a href="#devices">Devices supported</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </nav>

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

            <section className="longformSection" id="payments">
              <h2>Payment methods accepted in {data.name}</h2>
              <ul className="longformList">
                {data.payments.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>

            <section className="longformSection" id="channels">
              <h2>Local channels and DStv alternative in {data.name}</h2>
              <p>{data.dstvNote}</p>
              <p>
                <strong>Local channels listed (to confirm on WhatsApp):</strong>{" "}
                {data.localChannels.join(", ")}.
              </p>
              <p>
                <strong>Plus:</strong> SuperSport-style folders (PSL, Premier
                League, Variety, Rugby, Cricket), SABC, kykNET, Mzansi
                Magic, M-Net Movies and international channels — line-up
                to confirm on WhatsApp.
              </p>
            </section>

            <section className="longformSection" id="devices">
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
                  Receive your M3U link plus a setup guide for your device on
                  WhatsApp.
                </li>
              </ol>
            </section>

            <section className="longformSection">
              <h2>{data.name} cities served</h2>
              <p>{data.cities.join(", ")}.</p>
            </section>

            <TrustReversalBlock locale={locale as Locale} />

            <section className="longformSection" id="faq">
              <h2>FAQ — Mzansi Stream {data.name}</h2>
              {faq.map((f) => (
                <details key={f.q} className="faqItem">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </section>

            <InternalLinkHub
              locale={locale as Locale}
              heading={`More guides for ${data.name} households`}
            />

            <section className="longformSection" id="trial">
              <h2>Get started in {data.name} today</h2>
              <p>
                24-hour free trial, no card. Activated on WhatsApp. Pay in {data.payments.slice(0, 4).join(", ")} or
                via international card.
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
