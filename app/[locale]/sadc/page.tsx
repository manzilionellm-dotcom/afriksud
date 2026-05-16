// app/[locale]/sadc/page.tsx — Hub for the 8 SADC country pages.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../lib/url";
import { robotsForProgrammatic } from "../../../lib/seo/indexability";
import { SADC_COUNTRIES } from "../../../lib/seo/sadc-countries";
import { HubListing } from "../../../components/seo/HubListing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  const title = "IPTV Across SADC — Zimbabwe, Botswana, Namibia, Mozambique +5";
  const description =
    "Local IPTV for the 8 SADC countries — pricing in local currency, payment methods, channel mix and ISP compatibility. From Zimbabwe to Malawi, served by SA edges.";
  return {
    title,
    description,
    alternates: {
      canonical: localeUrl(locale as Locale, "/sadc/"),
      languages: hreflangFor("/sadc/"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(locale as Locale, "/sadc/"),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title,
      description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function SadcHub({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  return (
    <HubListing
      locale={locale as Locale}
      eyebrow="SADC · 8 countries"
      h1="IPTV across SADC — 8 country guides"
      lead="Mzansi Stream serves every SADC country with local pricing, local payment methods (EcoCash, M-Pesa, Mukuru, USD direct) and channel mixes that include the local broadcasters next to SuperSport and SABC."
      itemListName="SADC country guides"
      basePath="/sadc/"
      items={SADC_COUNTRIES.map((c) => ({
        href: `/sadc/${c.slug}/`,
        label: `IPTV in ${c.name}`,
        caption: `${c.flag} ${c.currency.code}`,
      }))}
    />
  );
}
