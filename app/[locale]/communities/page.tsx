// app/[locale]/communities/page.tsx — Hub for the foreign-community pages.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../lib/url";
import { robotsForProgrammatic } from "../../../lib/seo/indexability";
import { COMMUNITIES } from "../../../lib/seo/communities";
import { HubListing } from "../../../components/seo/HubListing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  const title = "Foreign Community TV in South Africa — 15 Diaspora Channel Packs";
  const description =
    "Watch your home-country channels in South Africa — Zimbabwean, Mozambican, Indian, Nigerian, British, Pakistani, Chinese, Greek, French, German, Portuguese and 4 more.";
  return {
    title,
    description,
    alternates: {
      canonical: localeUrl(locale as Locale, "/communities/"),
      languages: hreflangFor("/communities/"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(locale as Locale, "/communities/"),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title,
      description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function CommunitiesHub({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  return (
    <HubListing
      locale={locale as Locale}
      eyebrow="Foreign communities in SA"
      h1="Home-country TV for foreign communities in South Africa"
      lead="If you live in South Africa and want your home-country channels alongside SuperSport, SABC and kykNET, Mzansi Stream bundles them into a single M3U feed — 15 community channel packs in their native languages."
      itemListName="Community channel guides"
      basePath="/communities/"
      items={COMMUNITIES.map((c) => ({
        href: `/communities/${c.slug}/`,
        label: `${c.demonym} TV in South Africa`,
        caption: c.homeCountry,
      }))}
    />
  );
}
