import type { Metadata } from "next";
import { LOCALE_META } from "../locales";
import { OCEANIA_MARKETS, type OceaniaMarket } from "../oceania-offer";
import { localeUrl, ogImagesFor } from "../url";

export function oceaniaRouteMetadata(
  market: OceaniaMarket,
  view: "guide" | "trial" | "terms",
  isCanonical = true
): Metadata {
  const { country, countryCode, slug } = OCEANIA_MARKETS[market];
  const pages = {
    guide: {
      path: `/sa-abroad/${slug}`,
      title: `South African TV guide for ${country}`,
      description: `Check a programme, your device and the local trial options in ${country}. Compare the day, month and annual prepaid plans in US dollars.`,
    },
    trial: {
      path: "/free-trial",
      title: `Free 24-hour TV trial in ${country}`,
      description: `Request a free 24-hour weekday trial on your home connection in ${country}. Check your device and programmes on WhatsApp before choosing a pass.`,
    },
    terms: {
      path: "/legal/terms",
      title: `Prepaid TV terms for ${country}`,
      description: `Review the prepaid plan periods, prices in US dollars and support arrangements for Mzansi Stream in ${country}.`,
    },
  };
  const { path, title, description } = pages[view];
  const canonical = localeUrl(market, path);
  const images = ogImagesFor(market);
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: isCanonical && view !== "terms"
        ? { [LOCALE_META[market].hreflang]: canonical, "x-default": canonical }
        : undefined,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      images,
      locale: LOCALE_META[market].ogLocale,
      countryName: country,
    },
    twitter: { card: "summary_large_image", title, description, images },
    robots: { index: isCanonical && view !== "terms", follow: view !== "terms" },
    other: { "geo.region": countryCode, "geo.placename": country, "x-mz-locale": market },
  };
}
