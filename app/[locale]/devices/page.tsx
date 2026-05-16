// app/[locale]/devices/page.tsx — Hub for all device install guides.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../lib/url";
import { robotsForProgrammatic } from "../../../lib/seo/indexability";
import { DEVICES } from "../../../lib/seo/devices";
import { HubListing } from "../../../components/seo/HubListing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  const title =
    "IPTV Device Install Guides — Smart TV, Firestick, Android, Apple TV";
  const description =
    "Step-by-step IPTV install guides for every device — Samsung, LG, Hisense, Sony Bravia, Firestick, Android TV box, Apple TV 4K, iPhone, iPad and MAG Box.";
  return {
    title,
    description,
    alternates: {
      canonical: localeUrl(locale as Locale, "/devices/"),
      languages: hreflangFor("/devices/"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(locale as Locale, "/devices/"),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title,
      description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function DevicesHub({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();

  // Combine /devices/* leaves with the two root pillars (Samsung +
  // Firestick) so the hub is a complete index for crawlers.
  const items = [
    {
      href: "/iptv-firestick-south-africa/",
      label: "IPTV on Amazon Firestick 4K",
      caption: "Pillar guide",
    },
    {
      href: "/iptv-samsung-smart-tv/",
      label: "IPTV on Samsung Smart TV (Tizen)",
      caption: "Pillar guide",
    },
    ...DEVICES.map((d) => ({
      href: `/devices/${d.slug}/`,
      label: d.h1.replace(" — South Africa 2026", ""),
    })),
  ];

  return (
    <HubListing
      locale={locale as Locale}
      eyebrow="Devices · install guides"
      h1="Install IPTV on any device — 10 device guides"
      lead="Mzansi Stream works on every standard M3U device — Smart TV, streaming stick, set-top box, phone, tablet, PC. Pick your device for the exact app, install steps and troubleshooting."
      itemListName="Device install guides"
      basePath="/devices/"
      intro={[
        "All guides use the same Mzansi Stream M3U / Xtream Codes credentials — one subscription covers every device on your network.",
      ]}
      items={items}
    />
  );
}
