// app/[locale]/vs/page.tsx — Hub for the competitor comparison pages.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../lib/url";
import { robotsForProgrammatic } from "../../../lib/seo/indexability";
import { COMPETITORS } from "../../../lib/seo/competitors";
import { HubListing } from "../../../components/seo/HubListing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  const title = "Mzansi Stream vs DStv, Showmax, Netflix — Honest 2026 Comparisons";
  const description =
    "Side-by-side comparisons of Mzansi Stream vs DStv Premium, DStv Compact Plus, Showmax, SuperSport, Netflix and other SA streaming services. Pricing, channels, sport coverage.";
  return {
    title,
    description,
    alternates: {
      canonical: localeUrl(locale as Locale, "/vs/"),
      languages: hreflangFor("/vs/"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(locale as Locale, "/vs/"),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title,
      description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function VsHub({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  return (
    <HubListing
      locale={locale as Locale}
      eyebrow="Compare · 2026"
      h1="Mzansi Stream vs every major SA streaming service"
      lead="Honest 2026 comparisons. No fabricated star ratings, no hidden affiliate links. Pick the competitor you're weighing against to see the price gap, channel overlap and what each side genuinely does better."
      itemListName="Side-by-side comparisons"
      basePath="/vs/"
      items={COMPETITORS.map((c) => ({
        href: `/vs/${c.slug}/`,
        label: `Mzansi Stream vs ${c.name}`,
        caption: c.priceMonthly,
      }))}
    />
  );
}
