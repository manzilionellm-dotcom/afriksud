// app/[locale]/apps/[app]/page.tsx
// Device Hub — Niveau 1 app/player install pages (TiviMate, IPTV
// Smarters Pro, IBO Player, XCIPTV, Duplex Play, Sparkle TV, Formuler Z,
// STB Emulator). Re-uses PillarTemplate so each inherits the full schema
// stack (Article + WebPage + FAQPage + HowTo + Breadcrumb) and the
// WhatsApp → pricing funnel. pathPrefix keeps the JSON-LD canonical in
// sync with the /apps/ route.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../../lib/url";
import { robotsForProgrammatic } from "../../../../lib/seo/indexability";
import { IPTV_APP_SLUGS, getApp } from "../../../../lib/seo/apps";
import { PillarTemplate } from "../../../../components/seo/PillarTemplate";

type Props = { params: Promise<{ locale: string; app: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    IPTV_APP_SLUGS.map((app) => ({ locale, app }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, app } = await params;
  const data = getApp(app);
  if (!(LOCALES as readonly string[]).includes(locale) || !data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: localeUrl(locale as Locale, `/apps/${app}/`),
      languages: hreflangFor(`/apps/${app}/`),
    },
    openGraph: {
      type: "article",
      url: localeUrl(locale as Locale, `/apps/${app}/`),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title: data.metaTitle,
      description: data.metaDescription,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function AppPage({ params }: Props) {
  const { locale, app } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const data = getApp(app);
  if (!data) notFound();
  return (
    <PillarTemplate pillar={data} locale={locale as Locale} pathPrefix="/apps" />
  );
}
