import type { Metadata } from "next";
import Link from "next/link";
import { localeUrl, ogImagesFor } from "../../../lib/url";

import { isOceaniaMarket } from "../../../lib/oceania-offer";
import { oceaniaRouteMetadata } from "../../../lib/seo/oceania-route";
import { OceaniaOffer } from "../../../components/seo/OceaniaOffer";

const TRIAL_PATH = "/free-trial";
const TRIAL_CANONICAL = localeUrl("en-za", TRIAL_PATH);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (isOceaniaMarket(locale)) return oceaniaRouteMetadata(locale, "trial");
  const isCanonical = locale === "en-za";
  return {
    title: "Free 24-hour IPTV trial in South Africa",
    description:
      "Try Mzansi Stream for 24 hours on your TV or phone. No card needed. Send your country and device on WhatsApp to arrange setup and check availability.",
    alternates: {
      canonical: TRIAL_CANONICAL,
      // x-default is this page, not the homepage. Other locales canonicalise
      // here and stay out of the hreflang cluster.
      languages: isCanonical
        ? { "en-ZA": TRIAL_CANONICAL, "x-default": TRIAL_CANONICAL }
        : undefined,
    },
    openGraph: {
      images: ogImagesFor("en-za"),
      title: "Free 24-hour IPTV trial in South Africa",
      description:
        "Try Mzansi Stream for 24 hours on your TV or phone. No card needed. Send your country and device on WhatsApp to arrange setup and check availability.",
      url: TRIAL_CANONICAL,
      type: "website",
      locale: "en_ZA",
    },
    robots: isCanonical
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

const WA_NUMBER = "447307410512";
const WA_PREFILL = encodeURIComponent(
  `Hi Mzansi IPTV 🇿🇦
I want a free trial.
City: 
Device: 
Locale: en-za
Page: /en-za/free-trial`
);
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${WA_PREFILL}`;

const faqs = [
  {
    q: "Is there a free IPTV trial for Mzansi / South Africa?",
    a: "The Mzansi Stream trial is free for 24 hours. You do not need a card. Send your country and device on WhatsApp and support will confirm the start time.",
  },
  {
    q: "Can I watch SuperSport-style sports and SA entertainment?",
    a: "Ask about the exact programme, date and country. Availability varies by territory. For a specific match, check the local broadcaster’s schedule before buying a plan.",
  },
  {
    q: "I’m in London — can diaspora try Mzansi IPTV?",
    a: "Yes. UK Wi‑Fi + Firestick is a common path for Springboks fans abroad. Say you’re in London (or elsewhere) so we set expectations for peak times.",
  },
  {
    q: "Do I need DStv hardware?",
    a: "No DStv box required for an IPTV trial path. You need a compatible device + internet. Honesty: this is not an official DStv product.",
  },
  {
    q: "Firestick setup?",
    a: "Firestick / Android TV → 7 MOTION TV. Phone → IPTV Smarters Pro. Samsung/LG → Smart IPTV. We guide on WhatsApp.",
  },
  {
    q: "Is there a public playlist?",
    a: "No. Setup stays on WhatsApp.",
  },
  {
    q: "What should I test?",
    a: "One SA entertainment/news category, one sports window that matters (rugby/football), and buffering at your real watch time.",
  },
  {
    q: "Which language is this page?",
    a: "English, written for South Africa and for South Africans abroad.",
  },
  {
    q: "Where are the prices?",
    a: "South African plans are R199 for one month, R449 for three months, R699 for six months or R1,199 upfront for twelve months. The 24-hour trial is free.",
  },
  {
    q: "Do you show star ratings?",
    a: "This page does not show star ratings.",
  },
] as const;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${TRIAL_CANONICAL}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: localeUrl("en-za", "/") },
    {
      "@type": "ListItem",
      position: 2,
      name: "Mzansi IPTV free trial — start on WhatsApp",
      item: TRIAL_CANONICAL,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const steps = [
  {
    n: "1",
    t: "City + device",
    d: "Joburg, CPT, Durban, Pretoria — or London diaspora. Firestick, Android, Smart TV, phone.",
  },
  {
    n: "2",
    t: "Availability",
    d: "We confirm today’s trial window on WhatsApp.",
  },
  {
    n: "3",
    t: "Private setup",
    d: "7 MOTION TV / Smarters / Smart IPTV. No public playlist.",
  },
  {
    n: "4",
    t: "Test & decide",
    d: "Try a programme you actually watch. Check picture, audio and playback at your usual viewing time.",
  },
];

export default async function FreeTrialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (isOceaniaMarket(locale)) return <OceaniaOffer market={locale} view="trial" />;

  return (
    <main lang="en-ZA" className="mx-auto max-w-3xl px-5 pb-28 pt-24 sm:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <p className="text-sm font-medium text-emerald-700">
        South Africa · Free 24-hour trial · No card needed
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Mzansi IPTV free trial — start on WhatsApp
      </h1>
      <p className="mt-4 text-lg text-neutral-600">
        Try the service on the TV or phone you already use. Tell us your country and device on WhatsApp. We will confirm availability, send the setup steps and tell you when your 24 hours start.
      </p>
      <p className="mt-2 text-sm text-neutral-500">
        After the trial, one month is R199. Twelve months cost R1,199 upfront. You choose whether to continue.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={WA_HREF}
          data-track-ref="Free-Trial"
          data-track-placement="Trial-Landing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white shadow-lg"
        >
          Ask for free trial
        </a>
        <Link
          href="/en-za"
          className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3.5 text-base font-semibold"
        >
          Back to South Africa
        </Link>
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">How the trial works</h2>
        <ol className="mt-6 space-y-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="flex gap-4 rounded-2xl border border-neutral-200 p-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-sm font-bold text-[#128C7E]">
                {s.n}
              </span>
              <div>
                <p className="font-semibold">{s.t}</p>
                <p className="mt-1 text-sm text-neutral-600">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Locals vs London diaspora</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 p-4">
            <p className="font-semibold">ZA cities</p>
            <p className="mt-2 text-sm text-neutral-600">
              Joburg / CPT / Durban — prefer stable home Wi‑Fi for the big
              screen. Braai-night soft tip: test at the hour you’d actually
              watch.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-4">
            <p className="font-semibold">London / UK</p>
            <p className="mt-2 text-sm text-neutral-600">
              Springboks weekends on UK peak Wi‑Fi + Firestick flats are a
              common path. Say you’re abroad so we set peak-time expectations.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">What to test</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-700">
          <li>SA entertainment / news</li>
          <li>Rugby or football window that matters to you</li>
          <li>Buffering at your real watch time</li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Devices</h2>
        <ul className="mt-4 space-y-2 text-neutral-700">
          <li>
            <strong>Firestick / Android TV</strong> → 7 MOTION TV
          </li>
          <li>
            <strong>Phone</strong> → IPTV Smarters Pro
          </li>
          <li>
            <strong>Samsung / LG</strong> → Smart IPTV
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">FAQ</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-neutral-200 p-4"
            >
              <summary className="cursor-pointer list-none font-semibold">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-neutral-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-3xl bg-neutral-900 px-6 py-10 text-center text-white">
        <h2 className="text-2xl font-bold">Message WhatsApp to start</h2>
        <p className="mx-auto mt-3 max-w-md text-neutral-300">
          City + device. South African plans are R199 for one month, R449 for three months, R699 for six months or R1,199 upfront for twelve months. The 24-hour trial is free.
        </p>
        <a
          href={WA_HREF}
          data-track-ref="Free-Trial"
          data-track-placement="Trial-Landing"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-full bg-[#25D366] px-8 py-3.5 text-base font-semibold text-white"
        >
          Ask for free trial
        </a>
        <nav className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-neutral-400">
          <Link href="/en-za" className="hover:text-white">
            South Africa
          </Link>
          <Link href="/en-za/iptv-supersport-without-dstv" className="hover:text-white">
            Sports
          </Link>
          <Link href="/" className="hover:text-white">
            Home
          </Link>
        </nav>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 p-3 backdrop-blur sm:hidden">
        <a
          href={WA_HREF}
          data-track-ref="Free-Trial"
          data-track-placement="Trial-Landing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white"
        >
          Trial on WhatsApp
        </a>
      </div>
    </main>
  );
}
