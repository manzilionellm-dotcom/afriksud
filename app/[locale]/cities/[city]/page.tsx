// app/[locale]/cities/[city]/page.tsx
// 12 SA city pages generated from lib/seo/cities.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../../lib/url";
import { robotsForProgrammatic } from "../../../../lib/seo/indexability";
import { SA_CITY_SLUGS, getSACity } from "../../../../lib/seo/cities";
import { CITY_TOP_COMMUNITIES, getCommunity } from "../../../../lib/seo/communities";
import { LanguageProvider } from "../../../../components/client/LanguageProvider";
import { HeaderNav } from "../../../../components/client/HeaderNav";
import { FooterSection } from "../../../../components/client/LocalizedSections";
import { WhatsAppFab } from "../../../../components/client/WhatsAppFab";
import { StickyBottomCta } from "../../../../components/client/StickyBottomCta";
import { PopiaConsentBanner } from "../../../../components/client/PopiaConsentBanner";
import { SkipLink } from "../../../../components/client/SkipLink";
import { LocaleSync } from "../../../../components/client/LocaleSync";
import { DirectAnswerBlock } from "../../../../components/seo/DirectAnswerBlock";
import { InlinePricingBlock } from "../../../../components/seo/InlinePricingBlock";
import { TrustReversalBlock } from "../../../../components/seo/TrustReversalBlock";
import { InternalLinkHub } from "../../../../components/seo/InternalLinkHub";
import { JsonLd } from "../../../../lib/seo/jsonld";
import { ORG_ID, WEBSITE_ID } from "../../../../lib/seo/entity";
import { SITE } from "../../../../components/shared/site";

type Props = { params: Promise<{ locale: string; city: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SA_CITY_SLUGS.map((city) => ({ locale, city }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city } = await params;
  const data = getSACity(city);
  if (!(LOCALES as readonly string[]).includes(locale) || !data) return {};

  // Dynamic per-city description with concrete signals (region, ISP
  // count, top sport team) — beats the prior identical-everywhere line
  // for snippet uniqueness and CTR.
  const primaryTeam =
    data.teams[0]?.clubs[0]?.replace(/\s*\(.*?\)\s*/g, "").trim();
  const sportLine = primaryTeam ? ` Every ${primaryTeam} match in 4K.` : "";
  const description = `IPTV ${data.name} (${data.region}) — 20,000+ channels including SuperSport, kykNET and SABC in 4K UHD. Works on ${data.isps.slice(0, 3).join(", ")}.${sportLine} From R99/mo, no contract, activated on WhatsApp in 10 minutes.`;
  const title = `IPTV ${data.name} 2026 — DStv Alternative, SuperSport 4K`;

  return {
    title,
    description,
    alternates: {
      canonical: localeUrl(locale as Locale, `/cities/${city}/`),
      languages: hreflangFor(`/cities/${city}/`),
    },
    openGraph: {
      type: "article",
      url: localeUrl(locale as Locale, `/cities/${city}/`),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title: `IPTV ${data.name} 2026 — DStv Alternative in 4K`,
      description: `Stream 20,000+ channels in ${data.name} from R99/mo. SuperSport, kykNET, SABC in 4K — works on ${data.isps.slice(0, 3).join(", ")}.`,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function CityPage({ params }: Props) {
  const { locale, city } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const data = getSACity(city);
  if (!data) notFound();

  const topCommunities = (CITY_TOP_COMMUNITIES[city] ?? [])
    .map((slug) => getCommunity(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const canonical = localeUrl(locale as Locale, `/cities/${city}/`);

  // FAQ entities ground each city page in unique, query-shaped content.
  // The questions explicitly include the city + region so they ladder
  // to long-tail SERPs ("is IPTV legal in Pretoria") instead of
  // duplicating the head-term FAQ on the home page.
  const faqEntries = [
    {
      q: `Is IPTV legal in ${data.name}?`,
      a: `Yes — streaming TV is not illegal in South Africa. Mzansi Stream sources its channels via licensed partners, accepts traceable SA payment methods (EFT, SnapScan, Capitec Pay, Ozow), processes personal data under POPIA and operates from a registered SA business. Households in ${data.name} can switch without any regulatory risk.`,
    },
    {
      q: `Will Mzansi Stream work on my ${data.isps[0]} or ${data.isps[1] ?? "fibre"} line in ${data.name}?`,
      a: `Yes. Mzansi Stream is optimised for the major ${data.region} fibre providers — ${data.isps.join(", ")} — via a NAPAfrica-peered CDN with edges in Johannesburg and Cape Town. 4K SuperSport streams cleanly on any line over 25 Mbps.`,
    },
    {
      q: `How much can I save vs DStv Premium in ${data.name}?`,
      a: `DStv Premium is R899/month plus a R1,500 decoder and a 24-month contract. Mzansi Stream starts at R99/month effective on the 12-month plan, with no contract and no decoder. Households in ${data.name} typically save R8,000-R10,000 in the first year.`,
    },
    {
      q: `How fast is activation in ${data.name}?`,
      a: `Usually within 10 minutes of payment, 7 days a week. After paying, you receive an M3U playlist link plus a step-by-step setup guide for your specific device (Firestick, Samsung Smart TV, LG, Hisense, Android TV box, iPhone, iPad or PC).`,
    },
    {
      q: `Can I get the 24-hour free trial in ${data.name}?`,
      a: `Yes — message Mzansi Stream on WhatsApp from anywhere in ${data.name} and request the free 24-hour trial. No credit card, no commitment. Test 4K SuperSport on your own fibre line before paying.`,
    },
    {
      q: `Which suburbs of ${data.name} are covered?`,
      a: `All of them. Coverage spans ${data.suburbs.join(", ")} and every other ${data.region} suburb served by ${data.isps.slice(0, 3).join(", ")} or any LTE/5G network.`,
    },
  ];

  const sportFocus = data.teams
    .flatMap((t) =>
      t.clubs.map((c) => c.replace(/\s*\(.*?\)\s*/g, "").trim())
    )
    .filter(Boolean);
  const sportSummary = sportFocus.length
    ? ` Live coverage of ${sportFocus.slice(0, 3).join(", ")} included.`
    : "";
  const directAnswer = `Mzansi Stream is a no-contract DStv alternative serving every household in ${data.name} (${data.region}, ${data.population}) over ${data.isps.slice(0, 3).join(", ")} and other major fibre/5G networks. 20,000+ live channels — every SuperSport feed, kykNET, SABC, Mzansi Magic, Premier League and Springbok Tests in 4K UHD — from R99/month with a 24-hour free trial, no credit card required.${sportSummary}`;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${canonical}#localbusiness`,
    name: `Mzansi Stream — ${data.name}`,
    description: data.hook,
    parentOrganization: { "@id": ORG_ID },
    areaServed: [
      { "@type": "City", name: data.name, addressRegion: data.region },
      ...data.suburbs.map((s) => ({
        "@type": "City",
        name: s,
        addressRegion: data.region,
      })),
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "ZA",
      addressRegion: data.region,
      addressLocality: data.name,
    },
    url: canonical,
    image: `${SITE_URL}/og-image.jpg`,
    priceRange: "R99-R1199",
    currenciesAccepted: "ZAR",
    paymentAccepted: "EFT, Ozow, SnapScan, Zapper, Yoco, Capitec Pay, Visa, Mastercard, PayPal, Bitcoin",
    telephone: `+${SITE.whatsappPhone}`,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "23:00",
    },
  };

  const suburbItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${data.name} suburbs served`,
    numberOfItems: data.suburbs.length,
    itemListElement: data.suburbs.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale as Locale, "/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cities",
        item: localeUrl(locale as Locale, "/cities/"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.name,
        item: canonical,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: `IPTV ${data.name} 2026 — DStv Alternative`,
    description: data.hook,
    inLanguage: LOCALE_META[locale as Locale].hreflang,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: `${SITE_URL}/og-image.jpg`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".longformLead", ".direct-answer"],
    },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
  };

  return (
    <>
      <JsonLd data={localBusiness} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={suburbItemList} />

      <LanguageProvider>
        <LocaleSync locale={locale as Locale} />
        <SkipLink />
        <div className="bg" />
        <HeaderNav />

        <main className="main longform" id="main-content">
          <article className="section">
            <header className="longformHeader">
              <p className="longformEyebrow">
                {data.region} · {data.population}
              </p>
              <h1>
                IPTV {data.name} 2026 — DStv Alternative, SuperSport, 20,000+
                Channels
              </h1>
              <p className="longformLead">{data.hook}</p>
              <p className="trustStrip" style={{ marginTop: 16 }}>
                NAPAfrica-peered · 4K stable across {data.isps.slice(0, 3).join(", ")} · From R99/month · 24h free trial, no card
              </p>
              <div className="ctaRow">
                <a
                  href="#trial"
                  className="btnPrimary"
                  data-track-ref={`City-${city}-Hero-Trial`}
                  data-track-placement={`City-${city}-Hero`}
                >
                  Free 24h trial →
                </a>
                <a
                  href="#pricing"
                  className="btnSecondary"
                  data-track-ref={`City-${city}-Hero-Pricing`}
                  data-track-placement={`City-${city}-Hero`}
                >
                  See plans →
                </a>
              </div>
            </header>

            <DirectAnswerBlock
              question={`Is Mzansi Stream a real DStv alternative in ${data.name}?`}
              answer={directAnswer}
              keyFacts={[
                `Works on ${data.isps.join(", ")} — NAPAfrica-peered CDN with edges in Johannesburg and Cape Town.`,
                `Coverage spans ${data.suburbs.slice(0, 4).join(", ")} and every other ${data.region} suburb.`,
                `From R99/month effective on the 12-month plan. No contract, no decoder, no installer.`,
              ]}
            />

            <nav aria-label="On this page" className="longformSection">
              <h2 className="sr-only">On this page</h2>
              <ul className="longformList">
                <li><a href="#fibre">{data.name} fibre coverage</a></li>
                <li><a href="#sport">Local sport in {data.name}</a></li>
                <li><a href="#channels">Channel line-up</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </nav>

            <section className="longformSection" id="fibre">
              <h2>Optimised for {data.name} fibre</h2>
              <p>
                Mzansi Stream peers at NAPAfrica with CDN edges in
                Johannesburg and Cape Town, so 4K streams cleanly across
                every major SA fibre network: {data.isps.join(", ")}.
              </p>
              <p>
                <strong>Coverage in {data.name}:</strong>{" "}
                {data.suburbs.join(", ")}.
              </p>
            </section>

            <section className="longformSection" id="sport">
              <h2>Local sport in {data.name}</h2>
              {data.teams.map((t) => (
                <p key={t.sport}>
                  <strong>{t.sport}:</strong> {t.clubs.join(", ")}. Every
                  match in 4K via SuperSport.
                </p>
              ))}
            </section>

            <section className="longformSection" id="channels">
              <h2>Channel line-up for {data.name}</h2>
              <p>
                Every SuperSport feed (PSL, Variety 1-4, Rugby, Cricket,
                Premier League), kykNET, kykNET &amp; Kie, kykNET Lekker,
                Mzansi Magic, SABC 1/2/3, e.tv, M-Net, 20,000+
                international channels, and 100,000+ movies and series on
                demand.
              </p>
            </section>

            {topCommunities.length > 0 ? (
              <section className="longformSection">
                <h2>Diaspora channels for {data.name}</h2>
                <p>
                  Households in {data.name} often pair their SA channels
                  with home-country programming. Featured community pages:
                </p>
                <ul className="longformList">
                  {topCommunities.map((c) => (
                    <li key={c.slug}>
                      <a href={`/${locale}/communities/${c.slug}/`}>
                        {c.demonym} TV in South Africa — {c.homeCountry}{" "}
                        channels
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <TrustReversalBlock locale={locale as Locale} />

            <InlinePricingBlock
              locale={locale as Locale}
              refTag={`City-${city}`}
              heading={`Pricing for ${data.name} — from R99/month`}
              sub={`Pick a plan, message us on WhatsApp, and we activate within 10 minutes — anywhere in ${data.name}. 24-hour free trial available before you pay.`}
            />

            <section className="longformSection" id="faq">
              <h2>Frequently asked questions — IPTV in {data.name}</h2>
              {faqEntries.map((f) => (
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
              <h2>Get started in {data.name} — 10 minutes on WhatsApp</h2>
              <p>
                Message us on WhatsApp, pick a plan, pay via EFT, Ozow,
                SnapScan, Capitec Pay or card, and we send your M3U link
                with a setup guide for your specific device. 24-hour free
                trial, no credit card.
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
