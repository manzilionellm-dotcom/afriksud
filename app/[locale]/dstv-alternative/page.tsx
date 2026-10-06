// app/[locale]/dstv-alternative/page.tsx
// SEO pillar page targeting "dstv alternative" (KD 48, ~6.6k/mo ZA).

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../lib/locales";
import { hreflangForProgrammatic, localeUrl, SITE_URL } from "../../../lib/url";
import { robotsForProgrammatic } from "../../../lib/seo/indexability";
import { pillarMetaLocalized } from "../../../lib/seo/pillar-meta-i18n";
import { COMPETITORS, getCompetitor } from "../../../lib/seo/competitors";
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
    title: "DStv Alternative 2026 — Save R800/mo · No Contract",
    description:
      "DStv alternative in South Africa 2026. SuperSport PSL, Premier League, kykNET and SABC folders in 4K — line-up to confirm on WhatsApp. From R99/mo. Free 24h trial — no card.",
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
  {
    q: "What can I replace DStv with in South Africa?",
    a: "Mzansi Stream is a no-contract DStv alternative in SA — SuperSport-style, PSL, Premier League, kykNET, SABC and international folders in 4K where the source supports it, from R99/month, with no decoder. Line-up to confirm on WhatsApp.",
  },
  {
    q: "Is there an app like DStv but cheaper?",
    a: "Yes — Mzansi Stream works on Firestick, Smart TV (Samsung / LG / Sony / Hisense), Android TV, iPhone, iPad and PC via TiviMate, IPTV Smarters Pro and other M3U players.",
  },
  {
    q: "How do I watch the rugby today without DStv?",
    a: "Order a Mzansi Stream plan (from R99/month), receive the M3U link on WhatsApp, and check the SuperSport Rugby folder in 4K on your existing TV or device.",
  },
  {
    q: "Can I live stream SuperSport without DStv?",
    a: "SuperSport-style folders (PSL, Variety, Rugby, Cricket, Premier League, Motorsport, Golf, Tennis) are in the line-up without a DStv subscription. Specific feeds and matches are to confirm on WhatsApp.",
  },
  {
    q: "Will Mzansi Stream work with Vumatel / Openserve / Frogfoot?",
    a: "It runs over Vumatel, Openserve, Frogfoot, Octotel, MetroFibre, MTN Fibre and Vodacom Fibre like any home internet. 4K depends on your line — test it on the 24-hour trial.",
  },
  {
    q: "Can I cancel DStv on WhatsApp?",
    a: "Yes. Message DStv on 060 060 3788 to cancel. Note that DStv requires 30 days' notice on a paid month — time your cancellation accordingly.",
  },
  {
    q: "Do you have to give notice to cancel DStv?",
    a: "DStv typically requires 30 days' notice on a paid month. To minimise overlap, cancel on day 1 of your billing cycle, not the end.",
  },
  {
    q: "Is IPTV legal in South Africa?",
    a: "This page is not legal advice and makes no legality claim. Distributing copyrighted content without authorisation is the copyright issue. This page does not state that Mzansi Stream holds channel licences. The POPIA page is linked from the footer and still contains owner placeholders.",
  },
  {
    q: "What's included in the 24h free trial?",
    a: "The same line-up as the paid plans, 4K UHD where available, EPG, WhatsApp support — for 24 hours, no credit card required.",
  },
  {
    q: "Can I watch DStv channels abroad?",
    a: "SA expats in the UK, AU, US, UAE, NZ and Canada ask for SuperSport, SABC and kykNET folders. This page does not publish a country count or promise 4K on every connection.",
  },
];

export default async function DstvAlternativePage({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "DStv Alternative 2026 — Save R800/mo · Live TV in 4K",
    description:
      "Leaving DStv: SuperSport-style, kykNET and SABC folders in 4K, line-up to confirm on WhatsApp. From R99/month on Mzansi Stream.",
    image: `${SITE_URL}/og-image.jpg`,
    datePublished: "2026-01-15",
    dateModified: "2026-05-15",
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

  const dstvCompetitors = COMPETITORS.filter((c) => c.slug.startsWith("dstv"));
  const dstvPremium = getCompetitor("dstv-premium")!;

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
              <h1>
                DStv Alternative South Africa 2026 — Live TV from R99/month
              </h1>
              <p className="longformLead">
                Tired of paying R899/month for DStv Premium and watching the
                price climb every year? Mzansi Stream is a no-contract DStv
                alternative in South Africa: SuperSport-style folders, DStv
                Premiership, Premier League, kykNET, Mzansi Magic, SABC,
                e.tv, plus movies and series on demand — line-up to confirm on WhatsApp —
                in 4K UHD where the source supports it, with no decoder and
                no dish. Switch from DStv on WhatsApp. Free 24-hour trial,
                no credit card. From R99/month.
              </p>
              <p className="trustStrip" style={{ marginTop: 16 }}>
                Works on Vumatel, Openserve, Frogfoot, Octotel, MetroFibre,
                MTN Fibre and Vodacom Fibre · Test it on your line
              </p>
              <div className="ctaRow">
                <a href="#trial" className="btnPrimary">
                  Start 24h free trial →
                </a>
                <a href="#pricing" className="btnSecondary">
                  See plans from R99/mo →
                </a>
              </div>
            </header>

            <section className="longformSection">
              <h2>Why South Africans are dropping DStv in 2026</h2>
              <ul className="longformList">
                <li>
                  <strong>DStv Premium R899/mo</strong> = R10,788/year.
                  Compact Plus R549, Compact R449, Family R329.
                </li>
                <li>
                  DStv pricing has risen roughly 12% cumulatively over
                  2024-2026 while wages have not kept pace.
                </li>
                <li>
                  Decoder rentals, installer fees, and a 24-month contract
                  on top of the monthly bill.
                </li>
                <li>
                  Phone-IVR support, cancellation friction, and ads on a
                  paid subscription.
                </li>
              </ul>
              <p>
                Mzansi Stream sits between R99 and R150/month, with sport,
                SA and international folders to confirm on WhatsApp.
              </p>
            </section>

            <section className="longformSection" id="calculator">
              <h2>Calculate what you&apos;ll save</h2>
              <p>
                Pick your current DStv plan and see the annual difference.
              </p>
              <DstvSavingsCalculator />
            </section>

            <section className="longformSection">
              <h2>DStv vs Mzansi Stream — full comparison</h2>
              <div className="compareTableWrap">
                <table className="compareTable">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      {dstvCompetitors.map((c) => (
                        <th key={c.slug}>{c.name}</th>
                      ))}
                      <th>Showmax</th>
                      <th className="highlight">Mzansi Stream</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dstvPremium.features.map((row) => (
                      <tr key={row.label}>
                        <td className="featureLabel">{row.label}</td>
                        {dstvCompetitors.map((c) => {
                          const match = c.features.find(
                            (f) => f.label === row.label
                          );
                          return <td key={c.slug}>{match?.them ?? "—"}</td>;
                        })}
                        <td>—</td>
                        <td className="highlight">{row.us}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="longformSection">
              <h2>Channel folders people ask for when they leave DStv</h2>
              <p>
                Line-up to confirm on WhatsApp before you pay — we don&apos;t claim every
                DStv channel or every match.
              </p>

              <h3>Sport — SuperSport replacement</h3>
              <p>
                SuperSport PSL, Premier League, Variety 1-4, Rugby, Cricket,
                Maximo, Action, MotorSport, Tennis, Golf, Blitz, F1, UFC,
                Boxing, NFL, NBA, MLB, URC, Currie Cup, Springboks Tests,
                Six Nations, IPL, Proteas, T20 World Cup.
              </p>

              <h3>DStv Local — free-to-air and specialty</h3>
              <p>
                SABC 1/2/3/News/Education in HD, e.tv, eExtra, eMovies,
                eToonz, kykNET, kykNET & Kie, kykNET Lekker, Mzansi Magic,
                Mzansi Wethu, 1 Magic, Honey, Moja Love.
              </p>

              <h3>Movies and series</h3>
              <p>
                M-Net, M-Net Movies, Studio Universal, AMC, Universal TV,
                Fox and FX folders, plus VOD — catalogue to confirm on WhatsApp.
              </p>

              <h3>Kids</h3>
              <p>
                Nickelodeon, NickJr, Cartoon Network, Disney Channel, Disney
                Jr, BabyTV.
              </p>

              <h3>News</h3>
              <p>
                eNCA, Newzroom Afrika, BBC, CNN, Al Jazeera, Sky News,
                France 24.
              </p>
            </section>

            <section className="longformSection" id="trial">
              <h2>How to cancel DStv and switch to Mzansi Stream</h2>
              <ol className="longformList">
                <li>
                  Test Mzansi Stream free for 24 hours on WhatsApp — no
                  card.
                </li>
                <li>Order any plan (1 / 3 / 6 / 12 months).</li>
                <li>
                  Receive your M3U link and one-page setup guide on
                  WhatsApp.
                </li>
                <li>
                  Cancel DStv via WhatsApp 060 060 3788 or the MyDStv app.
                </li>
                <li>Enjoy the same channels at a fraction of the price.</li>
              </ol>
              <div className="ctaRow">
                <a
                  href={generateWhatsAppLink(
                    "Hi! I'd like the free 24h Mzansi Stream trial to switch from DStv.",
                    "",
                    "DStv-Alt-Trial-CTA"
                  )}
                  className="btnPrimary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get my free 24h trial →
                </a>
              </div>
            </section>

            <section className="longformSection" id="pricing">
              <h2>Mzansi Stream plans — from R99/month, no contract</h2>
              <ul className="longformList">
                <li>
                  <strong>1 month — R199</strong>
                </li>
                <li>
                  <strong>3 months — R449</strong> (Most popular)
                </li>
                <li>
                  <strong>6 months — R699</strong>
                </li>
                <li>
                  <strong>12 months — R1,199</strong> (Best value)
                </li>
              </ul>
              <p>
                Pay via EFT, SnapScan, Ozow, Yoco, Capitec Pay, Zapper,
                Visa, Mastercard, PayPal or Bitcoin. 7-day money-back
                guarantee.
              </p>
            </section>

            <section className="longformSection">
              <h2>Is IPTV legal in South Africa?</h2>
              <p>
                This page is not legal advice and makes no legality or
                licence claim. The copyright issue is distributing
                copyrighted content without authorisation. Mzansi Stream
                accepts traceable payment. Rights and blackouts still apply,
                so test the channels and matches you need during the
                24-hour trial before you cancel DStv. Read the{" "}
                <a href={`/${locale}/legal/popia`}>POPIA page</a>.
              </p>
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
