// app/[locale]/sa-abroad/[country]/page.tsx
// Section B.5.1 — SA expat outbound landing pages. Per-country canonical
// follows the SEO playbook: /sa-abroad/uk/ canonicalises to its en-gb
// alternate, /sa-abroad/australia/ to its en-au alternate, etc.
// hreflang lists only that canonical URL (self + x-default). Locales
// that are noindex (fr, pt-mz) are never the canonical target.

import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { localeUrl, SITE_URL } from "../../../../lib/url";
import {
  indexableCanonicalLocale,
  robotsForProgrammatic,
} from "../../../../lib/seo/indexability";
import {
  SA_ABROAD_SLUGS,
  getSaAbroadCountry,
  saAbroadFaq,
  saAbroadPath,
  saAbroadPlace,
} from "../../../../lib/seo/sa-abroad";
import { isOceaniaMarket } from "../../../../lib/oceania-offer";
import { oceaniaRouteMetadata } from "../../../../lib/seo/oceania-route";
import { OceaniaOffer } from "../../../../components/seo/OceaniaOffer";
import { JsonLd } from "../../../../lib/seo/jsonld";
import { LongformShell } from "../../../../components/client/LongformShell";
import { DiasporaSoftSellCta } from "../../../../components/seo/DiasporaSoftSellCta";
import { plans } from "../../../../components/shared/plans";

type Props = { params: Promise<{ locale: string; country: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SA_ABROAD_SLUGS.map((country) => ({ locale, country }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country } = await params;
  const data = getSaAbroadCountry(country);
  if (!(LOCALES as readonly string[]).includes(locale) || !data) return {};
  if (isOceaniaMarket(data.preferredCanonicalLocale)) {
    return oceaniaRouteMetadata(data.preferredCanonicalLocale, "guide", locale === data.preferredCanonicalLocale);
  }

  const place = saAbroadPlace(data);
  const title = `South African TV in ${place}: a viewing guide`;
  const description = `Find South African news and programme listings in ${place}. Check local times, device setup and prepaid Mzansi Stream prices before choosing a plan.`;

  // One indexable URL. Non-canonical locales only emit rel=canonical
  // (no hreflang to URLs that themselves canonicalise elsewhere).
  const canonicalLocale = indexableCanonicalLocale(data.preferredCanonicalLocale);
  const canonical = localeUrl(canonicalLocale, `/sa-abroad/${country}`);
  const selfCanonical = locale === canonicalLocale;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: selfCanonical
        ? {
            [LOCALE_META[canonicalLocale].hreflang]: canonical,
            "x-default": canonical,
          }
        : undefined,
    },
    openGraph: {
      type: "article",
      url: canonical,
      locale: LOCALE_META[locale as Locale].ogLocale,
      title,
      description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: selfCanonical
      ? { index: true, follow: true }
      : robotsForProgrammatic(locale as Locale),
  };
}

export default async function SaAbroadCountryPage({ params }: Props) {
  const { locale, country } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const data = getSaAbroadCountry(country);
  if (!data) notFound();
  const market = data.preferredCanonicalLocale;
  if (isOceaniaMarket(market)) {
    if (locale !== market) permanentRedirect(saAbroadPath(data));
    return (
      <OceaniaOffer market={market} view="guide">
        <section aria-label="Programme guides">
          <h2>Local viewing guides</h2>
          <ul>
            {market === "en-au" && <li><Link href="/en-au/blog/dstv-australia-find-the-broadcaster">Find the Australian broadcaster and compare Perth and Sydney start times</Link></li>}
            <li><Link href="/en-za/blog/sabc-without-dstv">Find South African public news and radio abroad</Link></li>
          </ul>
        </section>
      </OceaniaOffer>
    );
  }

  const place = saAbroadPlace(data);
  const canonical = `${SITE_URL}${saAbroadPath(data)}`;
  const faq = saAbroadFaq(data);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale as Locale) },
      { "@type": "ListItem", position: 2, name: "South African TV abroad", item: localeUrl("en-za", "/sa-abroad") },
      { "@type": "ListItem", position: 3, name: data.name, item: canonical },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <LongformShell locale={locale as Locale}>
        <article className="section">
          <header className="longformHeader">
            <p className="longformEyebrow">{data.flag} South African TV abroad</p>
            <h1>South African TV in {place}</h1>
            <p className="longformLead">
              Looking for a South African bulletin, a series or a particular match in {place}?
              Start with the programme title and the local broadcaster’s listing. You can also
              check your device with Mzansi Stream before choosing a prepaid plan.
            </p>
          </header>
          <section className="longformSection">
            <h2>Find your programme</h2>
            <p>
              For SABC News, radio or podcasts, start with <a href="https://sabc-plus.com/index.php/faq">SABC+’s international availability list</a>.
              For a sports fixture, look up the teams, competition and date in a broadcaster’s
              schedule for {place}. For an Afrikaans series, check the season, episode and
              available audio on the local listing before paying.
            </p>
            <ul className="longformList">
              <li><Link href="/en-za/blog/sabc-without-dstv">Which SABC news and radio services work abroad?</Link></li>
              {country === "uk" && <li><Link href="/en-gb/blog/dstv-uk-moving-from-south-africa">What happens to a South African DStv account when you move to the UK?</Link></li>}
              {["france", "germany", "belgium", "switzerland"].includes(country) &&
                <li><Link href="/fr/blog/dstv-en-europe-par-programme" hrefLang="fr">Retrouver un programme en France ou en Allemagne (guide en français)</Link></li>}
            </ul>
          </section>
          <section className="longformSection">
            <h2>Read the schedule in local time</h2>
            <p>{data.timezone}. If a listing uses South African Standard Time, select the date and your city when converting it. Your phone may already display the local start time.</p>
          </section>
          <DiasporaSoftSellCta variant="mid" slug={`sa-abroad-${country}`} place={place} />
          <section className="longformSection" id="pricing">
            <h2>What Mzansi Stream costs</h2>
            <p>The published prices are in US dollars. Each amount pays for the whole period shown.</p>
            <ul className="longformList">
              {plans.map((p) => (
                <li key={p.key}>{p.months === 0 ? "Day pass" : p.months === 1 ? "1 month" : "1 year"} · USD {p.price.toLocaleString("en-GB")} paid upfront</li>
              ))}
            </ul>
            <p>If your account is in {data.localCurrency}, ask for the checkout amount and currency before paying. Your bank can confirm any conversion charge.</p>
          </section>
          <section className="longformSection">
            <h2>Check your television and connection</h2>
            <p>Tell support the model printed on your television or streaming stick. Try the service during your usual viewing hours in {data.cities.join(", ")} or wherever you live. Test the remote, audio and picture on the screen you intend to use.</p>
            <Link href="/en-za/devices">Browse the device setup guides</Link>
          </section>
          <section className="longformSection" id="faq">
            <h2>Frequently asked questions</h2>
            {faq.map((f) => (
              <details key={f.q} className="faqItem">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </section>
          <p><Link href="/en-za/sa-abroad">All destination guides</Link></p>
        </article>
      </LongformShell>
    </>
  );
}
