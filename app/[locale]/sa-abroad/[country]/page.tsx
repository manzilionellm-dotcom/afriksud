// app/[locale]/sa-abroad/[country]/page.tsx
// Section B.5.1 — SA expat outbound landing pages. Per-country canonical
// follows the SEO playbook: /sa-abroad/uk/ canonicalises to its en-gb
// alternate, /sa-abroad/australia/ to its en-au alternate, etc.
// hreflang map still enumerates the full 12-locale set.

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../../lib/url";
import { robotsForProgrammatic } from "../../../../lib/seo/indexability";
import {
  SA_ABROAD_SLUGS,
  getSaAbroadCountry,
} from "../../../../lib/seo/sa-abroad";
import { LongformShell } from "../../../../components/client/LongformShell";
import { DirectAnswerBlock } from "../../../../components/seo/DirectAnswerBlock";

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

  const cityList = data.cities.join(", ");
  const title = `Watch SuperSport, SABC & kykNET in ${data.name}`;
  const description = `Stream SuperSport, SABC, kykNET and 20,000+ South African channels in ${data.name} (${cityList}) in 4K. Built for SA expats — no DStv decoder, no contract.`;

  // Canonical follows B.5.4 — the preferred-locale variant owns the URL.
  const canonical = localeUrl(
    data.preferredCanonicalLocale,
    `/sa-abroad/${country}/`
  );

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: hreflangFor(`/sa-abroad/${country}/`),
    },
    openGraph: {
      type: "article",
      url: canonical,
      locale: LOCALE_META[locale as Locale].ogLocale,
      title,
      description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function SaAbroadCountryPage({ params }: Props) {
  const { locale, country } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const data = getSaAbroadCountry(country);
  if (!data) notFound();

  const cityList = data.cities.join(", ");
  const lastCity = data.cities[data.cities.length - 1];
  const otherCities = data.cities.slice(0, -1).join(", ");

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Mzansi Stream — South African TV in ${data.name}`,
    description: `Stream SuperSport, SABC, kykNET, M-Net and 20,000+ South African and international channels for SA expats living in ${data.name}.`,
    serviceType: "IPTV streaming for South African diaspora",
    provider: {
      "@type": "Organization",
      name: "Mzansi Stream",
      url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: data.name, addressCountry: data.iso2 },
    audience: {
      "@type": "PeopleAudience",
      audienceType: `South African diaspora in ${data.name}`,
      geographicArea: { "@type": "Country", name: data.name },
    },
    url: localeUrl(data.preferredCanonicalLocale, `/sa-abroad/${country}/`),
    knowsAbout: [
      "South African television",
      "SuperSport",
      "SABC",
      "kykNET",
      `South African diaspora in ${data.name}`,
    ],
  };

  // AI-extraction surface. Evidence-driven: this template produced a
  // Copilot-sourced order (2026-08-16, /en-au/sa-abroad/australia) while
  // carrying no Question/Answer/Speakable markup at all — the engines cited
  // it from raw prose. Every fact below is already asserted in the body
  // copy of this page; nothing new is claimed here.
  const directAnswer = {
    question: `Can I watch SuperSport, SABC and kykNET in ${data.name}?`,
    answer: `Yes. Mzansi Stream streams every SuperSport feed, SABC 1/2/3, e.tv, kykNET and Mzansi Magic live in ${data.name} over your normal internet line — no DStv decoder, no satellite dish and no 24-month contract. Plans start at R199 for one month, billed in ZAR, and a 24-hour free trial runs before you pay anything.`,
    keyFacts: [
      `Streams reach ${cityList} through our edge in ${data.edgeRegion}, so 4K stays stable across ${data.name}.`,
      `Time difference: ${data.timezone}.`,
      `Plans are billed in ZAR: R199 for 1 month, R449 for 3 months, R699 for 6 months and R1,199 for 12 months. ${data.localPriceNote}.`,
      `Setup is usually live within 10 minutes of payment, delivered as an M3U link plus a one-page device guide.`,
      `A 7-day money-back guarantee applies if the service does not work on your line in ${data.name}.`,
    ],
  };

  const faqItems = [
      {
        q: `Can I watch SuperSport in ${data.name} without a DStv decoder?`,
        a: `Yes. Every SuperSport feed — PSL, Premier League, Variety 1-4, Rugby and Cricket — streams live to ${data.name} over your existing internet connection. There is no decoder, no satellite dish, no installer and no SuperSport stand-alone subscription.`,
      },
      {
        q: `How much does South African TV cost in ${data.name}?`,
        a: `Plans are priced in ZAR: R199 for 1 month, R449 for 3 months, R699 for 6 months and R1,199 for 12 months. ${data.localPriceNote}. Payment is by Visa, Mastercard, PayPal, Apple Pay, Google Pay or Wise, and there is no 24-month contract.`,
      },
      {
        q: `Which devices work in ${data.name}?`,
        a: `Samsung, LG, Sony and Hisense Smart TVs, Amazon Firestick 4K Max, Apple TV, Android TV boxes, iPhone, iPad, Android phones, MAG Box, PC and Mac — through TiviMate, IPTV Smarters Pro, GSE Smart IPTV, XCIPTV or any standard M3U player.`,
      },
      {
        q: `How long does activation take in ${data.name}?`,
        a: `Usually under 10 minutes. You message us on WhatsApp from your ${data.name} number, pick a plan and pay, then receive your M3U link with a one-page setup guide for your device.`,
      },
      {
        q: `Can I test it before paying in ${data.name}?`,
        a: `Yes. A 24-hour free trial runs before any payment, and paid plans carry a 7-day money-back guarantee if the stream does not work on your line in ${data.name}.`,
      },
  ];

  // Schema mirrors the visible FAQ below one-for-one — never markup-only.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
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
        name: "SA Worldwide",
        item: localeUrl(locale as Locale, "/sa-abroad/"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.name,
        item: localeUrl(locale as Locale, `/sa-abroad/${country}/`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <LongformShell locale={locale as Locale}>
        <article className="section">
          <header className="longformHeader">
            <p className="longformEyebrow">
              {data.flag} {data.name} · SA Worldwide
            </p>
            <h1>
              Watch SuperSport, SABC and kykNET in {data.name} — Mzansi
              Stream
            </h1>
            <p className="longformLead">
              South Africans living in {cityList} can stream every
              SuperSport feed, SABC 1/2/3, e.tv, kykNET, kykNET & Kie and
              Mzansi Magic in 4K — without a DStv decoder, without a 24-
              month contract and without a separate SA satellite
              subscription. Mzansi Stream delivers South African TV in
              {" "}{data.name} on the device you already own: Smart TV,
              Firestick, iPhone, iPad, Android, MAG Box or PC.
            </p>
            <div className="ctaRow">
              <a
                href={`/?ref=SAAbroad-${data.iso2}#offers`}
                className="btnPrimary"
              >
                Start 24h free trial →
              </a>
              <a href="#pricing" className="btnSecondary">
                See plans →
              </a>
            </div>
          </header>

          <DirectAnswerBlock
            question={directAnswer.question}
            answer={directAnswer.answer}
            keyFacts={directAnswer.keyFacts}
          />

          <section className="longformSection">
            <h2>Watch SuperSport in {data.name}</h2>
            <p>
              Every SuperSport feed — SuperSport PSL, SuperSport Premier
              League, SuperSport Variety 1-4, SuperSport Rugby, SuperSport
              Cricket — streams live in 4K to viewers in {otherCities}
              {otherCities ? " and " : ""}{lastCity}. SA expats use Mzansi
              Stream to watch the PSL on a Saturday in {data.cities[0]} the
              same way they would at home in Joburg — no SuperSport
              stand-alone subscription, no DStv decoder, no installer.
            </p>
            <p>
              Watch the Springboks live in {data.name}, every URC fixture,
              every Currie Cup match and the British &amp; Irish Lions
              tour in 4K via SuperSport Rugby.
            </p>
          </section>

          <section className="longformSection">
            <h2>SABC, kykNET and the full SA local pack abroad</h2>
            <p>
              Stream SABC abroad — SABC 1, SABC 2, SABC 3, SABC News and
              SABC Education in HD — alongside e.tv, eExtra, eMovies and
              eToonz. Add the full kykNET pack (kykNET, kykNET & Kie,
              kykNET Lekker, kykNET Musiek, kykNET Nou!) for SA expats
              who keep up with their Afrikaans drama from {data.name}, plus
              Mzansi Magic and Moja Love for South African series watchers.
            </p>
          </section>

          <section className="longformSection">
            <h2>How it works in {data.name}</h2>
            <ol className="longformList">
              <li>
                Message us on WhatsApp from your {data.name} phone — we
                support international numbers.
              </li>
              <li>
                Pick a plan and pay by card, PayPal or international EFT.
                {" "}{data.localPriceNote}.
              </li>
              <li>
                Receive your M3U link plus a one-page setup guide for your
                Firestick, Smart TV, iPhone, iPad or Android TV. Usually
                live within 10 minutes.
              </li>
            </ol>
            <p>
              South African expat TV in {data.name} streams through our
              edge in {data.edgeRegion}, so 4K is stable across {cityList}.
              {" "}{data.timezone}, so live SA sport hits prime time on
              your local clock.
            </p>
          </section>

          <section className="longformSection">
            <h2>Premier League, PSL and DStv channels overseas</h2>
            <p>
              The same Premier League and PSL feeds available on DStv
              Premium back home stream cleanly to {data.name} via Mzansi
              Stream. SA expats who used to pay for DStv overseas via
              a friend or family member back home can drop that workaround
              entirely — Mzansi Stream serves you directly in {data.name},
              with your own subscription and WhatsApp support in English.
            </p>
          </section>

          <section className="longformSection" id="pricing">
            <h2>Pricing</h2>
            <p>
              Plans in ZAR with international payment options: 1 month
              R199, 3 months R449, 6 months R699, 12 months R1,199.
              Pay via Visa, Mastercard, PayPal, Apple Pay, Google Pay or
              Wise. {data.localPriceNote}.
            </p>
            <p>
              No 24-month contract. 7-day money-back guarantee if the
              service doesn&apos;t work for your line in {data.name}.
            </p>
          </section>

          <section className="longformSection">
            <h2>Devices we support in {data.name}</h2>
            <p>
              Samsung / LG / Sony / Hisense Smart TV, Amazon Firestick
              (4K Max), Apple TV, Android TV Box, iPhone, iPad, Android
              phone, MAG Box, PC and Mac via TiviMate, IPTV Smarters Pro,
              GSE Smart IPTV, XCIPTV or any standard M3U player.
            </p>
          </section>

          <section className="longformSection">
            <h2>Coverage across {data.name}</h2>
            <p>
              We have customers in {cityList} and across {data.name}. The
              same M3U link works on home fibre, public WiFi and mobile
              data on any local network.
            </p>
          </section>

          <section className="longformSection" id="faq">
            <h2>South African TV in {data.name} — frequently asked questions</h2>
            {faqItems.map((item) => (
              <div key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </section>

          <section className="longformSection">
            <h2>Related</h2>
            <ul className="longformList">
              <li>
                <Link href={`/${locale}/dstv-alternative/`}>
                  DStv abroad — full 2026 guide and pricing comparison
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog/watch-springboks-live-online/`}>
                  Watch the Springboks live online in {data.name}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog/how-to-watch-psl-online-2026/`}>
                  How to watch the PSL online in 2026
                </Link>
              </li>
            </ul>
          </section>
        </article>
      </LongformShell>
    </>
  );
}
