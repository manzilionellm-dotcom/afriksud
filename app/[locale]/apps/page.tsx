// app/[locale]/apps/page.tsx — Hub for IPTV apps, players and boxes.
// Device Hub Niveau 1: the highest purchase-intent tier of the content
// hub. Rolls up every /apps/[slug]/ leaf into one browsable, crawlable
// index that distributes internal link equity to each player guide.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../lib/url";
import { robotsForProgrammatic } from "../../../lib/seo/indexability";
import { IPTV_APPS } from "../../../lib/seo/apps";
import { HubListing } from "../../../components/seo/HubListing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  const title =
    "IPTV Apps & Players — TiviMate, IPTV Smarters, IBO, XCIPTV Setup";
  const description =
    "Setup guides for every IPTV app and player — TiviMate, IPTV Smarters Pro, IBO Player, XCIPTV, Duplex Play, Sparkle TV, Formuler Z and STB Emulator. Xtream Codes, EPG, 4K.";
  return {
    title,
    description,
    alternates: {
      canonical: localeUrl(locale as Locale, "/apps/"),
      languages: hreflangFor("/apps/"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(locale as Locale, "/apps/"),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title,
      description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function AppsHub({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();

  const items = IPTV_APPS.map((a) => ({
    href: `/apps/${a.slug}/`,
    label: a.h1.replace(/ —.*$/, ""),
    caption: a.eyebrow.replace(/ · .*$/, ""),
  }));

  return (
    <HubListing
      locale={locale as Locale}
      eyebrow="Apps & players · setup guides"
      h1="IPTV apps & players — pick yours and set it up in minutes"
      lead="An IPTV app is the front-end that plays your Mzansi Stream subscription. Pick the right player for your device and follow the exact setup — Xtream Codes login or MAC-and-key activation, EPG, catch-up and 4K SuperSport. One subscription works across every app below."
      itemListName="IPTV apps, players & boxes"
      basePath="/apps/"
      intro={[
        "Not sure which to use? On a Firestick or Android TV, TiviMate and XCIPTV are the enthusiast picks and IPTV Smarters Pro is the universal default. On a Samsung or LG Smart TV, IBO Player, Duplex Play and Sparkle TV activate with your TV's MAC address — no long URLs to type on a remote. For a dedicated box, the Formuler Z with MYTVOnline is the closest thing to a DStv-decoder experience, and STB Emulator turns any Android device into a MAG-style Stalker portal.",
        "Every guide uses the same Mzansi Stream credentials we send on WhatsApp, so you can install the app on one device now and add the rest of the house later without paying again.",
      ]}
      extraSections={[
        {
          h2: "Xtream Codes vs MAC-and-key — what's the difference?",
          paragraphs: [
            "Xtream Codes players (TiviMate, IPTV Smarters Pro, XCIPTV, Formuler MYTVOnline) log in with a Server URL, username and password. They pull Live TV, Movies, Series and the 7-day EPG together and are the least error-prone — ideal on Firestick, Android TV and boxes.",
            "MAC-and-key players (IBO Player, Duplex Play, Sparkle TV) show a MAC address and device key on the TV screen. You send us those two codes on WhatsApp and we upload your playlist from our side — nothing long to type on a Samsung or LG remote. STB Emulator is a special case: it emulates a MAG box and connects to a Stalker portal via a MAC we whitelist.",
          ],
        },
      ]}
      items={items}
    />
  );
}
