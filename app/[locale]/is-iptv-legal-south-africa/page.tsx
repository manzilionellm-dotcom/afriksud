// app/[locale]/is-iptv-legal-south-africa/page.tsx
// Pillar — AI Overview target ("Is IPTV legal in South Africa?").

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../lib/url";
import { robotsForProgrammatic } from "../../../lib/seo/indexability";
import { getPillar } from "../../../lib/seo/pillars";
import { PillarTemplate } from "../../../components/seo/PillarTemplate";

const SLUG = "is-iptv-legal-south-africa";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pillar = getPillar(SLUG);
  if (!(LOCALES as readonly string[]).includes(locale) || !pillar) return {};
  return {
    title: pillar.metaTitle,
    description: pillar.metaDescription,
    alternates: {
      canonical: localeUrl(locale as Locale, `/${SLUG}/`),
      languages: hreflangFor(`/${SLUG}/`),
    },
    openGraph: {
      type: "article",
      url: localeUrl(locale as Locale, `/${SLUG}/`),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title: pillar.metaTitle,
      description: pillar.metaDescription,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function IsIptvLegalPage({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const pillar = getPillar(SLUG);
  if (!pillar) notFound();
  return <PillarTemplate pillar={pillar} locale={locale as Locale} />;
}
