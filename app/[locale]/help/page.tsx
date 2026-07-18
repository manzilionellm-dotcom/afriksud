// app/[locale]/help/page.tsx — Help Center hub.
// Rolls up the troubleshooting articles into one crawlable index and
// captures "problem" searches (IPTV buffering, black screen, network
// error) that funnel into WhatsApp support.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../lib/url";
import { robotsForProgrammatic } from "../../../lib/seo/indexability";
import { HELP_ARTICLES } from "../../../lib/seo/help-center";
import { HubListing } from "../../../components/seo/HubListing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  const title =
    "IPTV Help Center — Buffering, Black Screen, Can't Connect Fixes";
  const description =
    "Fix common IPTV problems fast — buffering, black screen, playback freezing, network errors, can't connect, app updates and account recovery. Answer-first guides + WhatsApp support.";
  return {
    title,
    description,
    alternates: {
      canonical: localeUrl(locale as Locale, "/help/"),
      languages: hreflangFor("/help/"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(locale as Locale, "/help/"),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title,
      description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function HelpHub({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();

  const items = HELP_ARTICLES.map((a) => ({
    href: `/help/${a.slug}/`,
    label: a.h1,
    caption: a.eyebrow.replace(/^Help Center · /, ""),
  }));

  return (
    <HubListing
      locale={locale as Locale}
      eyebrow="Help Center · troubleshooting"
      h1="IPTV Help Center — fix common problems fast"
      lead="Something not working? Start here. Each guide gives you the fix in the first line, then the probable cause and step-by-step solution. Most IPTV issues — buffering, black screen, can't connect — take two minutes to solve. If you're still stuck, every guide has a one-tap WhatsApp support link."
      itemListName="Troubleshooting guides"
      basePath="/help/"
      intro={[
        "Nine out of ten IPTV problems are one of three things: the local Wi-Fi (buffering), the player's decoder (black screen or freezing), or a login typo (can't connect). Work down the list below to your symptom, follow the steps, and you'll usually be watching again before you'd finish a support call.",
        "Prefer to talk to a human? Every article links straight to WhatsApp support — tell us your device and symptom and we'll walk through it with you.",
      ]}
      extraSections={[
        {
          h2: "Can't find your problem?",
          paragraphs: [
            "If your issue isn't listed, message us on WhatsApp with your device (Firestick, Samsung TV, Formuler box, etc.), the app you're using, and exactly what you see on screen. Screenshots help. We'll diagnose it live — most fixes take a few minutes.",
          ],
        },
      ]}
      items={items}
    />
  );
}
