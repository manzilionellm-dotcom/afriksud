// app/[locale]/cities/page.tsx — Hub for the 12 SA city pages.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../lib/url";
import { robotsForProgrammatic } from "../../../lib/seo/indexability";
import { SA_CITIES } from "../../../lib/seo/cities";
import { HubListing } from "../../../components/seo/HubListing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  const title = "IPTV in South African Cities — 12 Metros Covered | Mzansi Stream";
  const description =
    "Local IPTV for every major South African metro — Johannesburg, Cape Town, Durban, Pretoria, Gqeberha and 7 more. Optimised for Vumatel, Openserve and Frogfoot.";
  return {
    title,
    description,
    alternates: {
      canonical: localeUrl(locale as Locale, "/cities/"),
      languages: hreflangFor("/cities/"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(locale as Locale, "/cities/"),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title,
      description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function CitiesHub({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  return (
    <HubListing
      locale={locale as Locale}
      eyebrow="Cities · South Africa"
      h1="IPTV in South African cities — every metro covered"
      lead="Mzansi Stream is optimised for every major SA metro and the surrounding suburbs. Pick your city for the local channel mix, ISP compatibility notes and the WhatsApp setup for your specific fibre line."
      itemListName="South African cities served"
      basePath="/cities/"
      intro={[
        "Our CDN peers at NAPAfrica with edges in Johannesburg and Cape Town, so every metro on this list streams 4K cleanly on Vumatel, Openserve, Frogfoot, Octotel, MetroFibre, MTN Fibre, Vodacom Fibre and Rain 5G.",
      ]}
      items={SA_CITIES.map((c) => ({
        href: `/cities/${c.slug}/`,
        label: `IPTV in ${c.name}`,
        caption: `${c.region} · ${c.population}`,
      }))}
      extraSections={[
        {
          h2: "Not in this list?",
          paragraphs: [
            "We serve every South African city with a fibre line — not just the 12 above. Message us on WhatsApp with your suburb and ISP, and we'll send a setup tailored to your area within 10 minutes.",
          ],
        },
      ]}
    />
  );
}
