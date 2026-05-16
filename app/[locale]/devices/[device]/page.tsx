// app/[locale]/devices/[device]/page.tsx
// Per-device install pages. Re-uses the PillarTemplate so each device
// inherits the full schema stack (Article + FAQ + HowTo + Breadcrumb).

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../../lib/url";
import { robotsForProgrammatic } from "../../../../lib/seo/indexability";
import { DEVICE_SLUGS, getDevice } from "../../../../lib/seo/devices";
import { PillarTemplate } from "../../../../components/seo/PillarTemplate";

type Props = { params: Promise<{ locale: string; device: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    DEVICE_SLUGS.map((device) => ({ locale, device }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, device } = await params;
  const data = getDevice(device);
  if (!(LOCALES as readonly string[]).includes(locale) || !data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: localeUrl(locale as Locale, `/devices/${device}/`),
      languages: hreflangFor(`/devices/${device}/`),
    },
    openGraph: {
      type: "article",
      url: localeUrl(locale as Locale, `/devices/${device}/`),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title: data.metaTitle,
      description: data.metaDescription,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function DevicePage({ params }: Props) {
  const { locale, device } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const data = getDevice(device);
  if (!data) notFound();
  return <PillarTemplate pillar={data} locale={locale as Locale} />;
}
