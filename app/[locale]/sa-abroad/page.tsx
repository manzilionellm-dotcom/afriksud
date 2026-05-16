// app/[locale]/sa-abroad/page.tsx — Hub for SA expat / diaspora pages.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../lib/url";
import { robotsForProgrammatic } from "../../../lib/seo/indexability";
import { SA_ABROAD_COUNTRIES } from "../../../lib/seo/sa-abroad";
import { HubListing } from "../../../components/seo/HubListing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  const title = "South African TV Abroad — SuperSport, SABC & kykNET in 20+ Countries";
  const description =
    "Watch SuperSport, SABC, kykNET and 20,000+ South African channels from the UK, Australia, USA, UAE, NZ, Canada and 15+ more countries. For SA expats and diaspora.";
  return {
    title,
    description,
    alternates: {
      canonical: localeUrl(locale as Locale, "/sa-abroad/"),
      languages: hreflangFor("/sa-abroad/"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(locale as Locale, "/sa-abroad/"),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title,
      description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function SaAbroadHub({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  return (
    <HubListing
      locale={locale as Locale}
      eyebrow="SA worldwide · 20+ countries"
      h1="South African TV abroad — every country covered"
      lead="If you're a South African abroad, Mzansi Stream brings SuperSport, SABC, kykNET, Mzansi Magic and 20,000+ international channels to your TV in 50+ countries — in 4K, with no DStv decoder."
      itemListName="Countries with SA TV via Mzansi Stream"
      basePath="/sa-abroad/"
      items={SA_ABROAD_COUNTRIES.map((c) => ({
        href: `/sa-abroad/${c.slug}/`,
        label: `South African TV in ${c.name}`,
      }))}
    />
  );
}
