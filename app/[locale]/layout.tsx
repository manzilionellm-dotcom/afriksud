// app/[locale]/layout.tsx
// ROOT layout for every locale page. It owns `<html lang>` / `dir`,
// resolved from the `[locale]` URL param (no `headers()` — the previous
// root layout read a middleware header, which made all 1,600+ pages
// render dynamically: `Cache-Control: private, no-store`, CDN MISS on
// every request). Pages are now prerendered for the 12 frozen locales.
//
// It also owns the per-locale canonical, hreflang and OpenGraph headers,
// plus a `<meta x-mz-locale>` hint the client LanguageProvider reads to
// align with the URL on first render.

import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_META,
  type Locale,
} from "../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../lib/url";
import { isOceaniaMarket, OCEANIA_MARKETS } from "../../lib/oceania-offer";
import { AnalyticsProvider } from "../../lib/analytics/AnalyticsProvider";
import { WhatsAppFabLink } from "../../components/seo/WhatsAppFabLink";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_NAME = "Mzansi Stream";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// Unknown first segments 404 at the router (the 12 locales are frozen in
// lib/locales.ts) — no request-time rendering is needed to decide.
export const dynamicParams = false;

const BASE_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Kept under 60 characters so Google doesn't truncate on SERP.
    // `default` is rendered as-is (no template applied) so the brand
    // suffix lives here. Child pages must set `title` WITHOUT the
    // `| Mzansi Stream` suffix — the template appends it once.
    default: "DStv Alternative in South Africa | Mzansi Stream",
    template: "%s | Mzansi Stream",
  },
  // Under 155 characters; honest claims only (no fabricated rating).
  description:
    "Compare DStv with Mzansi Stream. One month costs USD 15, or pay USD 65 upfront for a year. Request a free 24-hour trial on WhatsApp.",
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  // `meta name="keywords"` is intentionally omitted — modern Google ignores
  // it, and stuffing 100+ terms here is a known low-quality signal. Surface
  // entities through structured data and on-page copy instead.
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_NAME,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  // No root canonical. `/` 307s to `/en-za`, and a canonical must be a
  // 200 URL. Each locale page sets its own alternates.canonical.
  // OpenGraph / Twitter images come from the file convention
  // app/[locale]/opengraph-image.tsx (one native-language card per locale).
  openGraph: {
    type: "website",
    locale: LOCALE_META[DEFAULT_LOCALE].ogLocale,
    alternateLocale: LOCALES.filter((l) => l !== DEFAULT_LOCALE).map(
      (l) => LOCALE_META[l].ogLocale
    ),
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Prepaid TV in South Africa | Mzansi Stream",
    description:
      "Compare South African prepaid prices and check the programmes available on your device during the free 24-hour trial.",
    countryName: "South Africa",
  },
  twitter: {
    card: "summary_large_image",
    // À CONFIRMER — no verified @iptvmzansi profile in the repo. Do not emit site/creator.
    title: "Prepaid TV in South Africa",
    description:
      "South African prepaid streaming plans and a free 24-hour trial on your own device.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "streaming",
  classification: "Streaming Service, IPTV, Live Television, Entertainment",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
    shortcut: "/icon-192.png",
  },
  other: {
    "geo.region": "ZA",
    "geo.placename": "South Africa",
    "geo.position": "-26.2041;28.0473",
    ICBM: "-26.2041, 28.0473",
    language: "English, Afrikaans, isiZulu, isiXhosa, Português, Français",
    rating: "general",
    distribution: "global",
    coverage: "worldwide",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  // Accessibility intact — users can pinch-zoom up to 5x. Accidental
  // double-tap zoom is killed per-element via `touch-action: manipulation`
  // in globals.css, not by clamping the viewport.
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return BASE_METADATA;
  const meta = LOCALE_META[locale as Locale];
  const other = { ...(BASE_METADATA.other as Record<string, string>) };
  const market = isOceaniaMarket(locale) ? OCEANIA_MARKETS[locale] : null;
  const marketTitle = market ? `Prepaid TV in ${market.country} | Mzansi Stream` : undefined;
  const marketDescription = market ? `Try Mzansi Stream in ${market.country} on a weekday. Compare prepaid day, month and annual passes in US dollars.` : undefined;
  if (market) {
    other["geo.region"] = meta.country;
    other["geo.placename"] = market.country;
    delete other["geo.position"];
    delete other.ICBM;
  }
  return {
    ...BASE_METADATA,
    ...(marketTitle && marketDescription ? {
      title: { default: marketTitle, template: "%s | Mzansi Stream" },
      description: marketDescription,
      twitter: { ...BASE_METADATA.twitter, title: marketTitle, description: marketDescription },
    } : {}),
    alternates: {
      canonical: localeUrl(locale as Locale, "/"),
      languages: hreflangFor("/"),
    },
    openGraph: {
      ...BASE_METADATA.openGraph,
      locale: meta.ogLocale,
      ...(market ? { countryName: market.country, title: marketTitle, description: marketDescription } : {}),
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => LOCALE_META[l].ogLocale
      ),
    },
    other: {
      ...other,
      "x-mz-locale": locale,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const meta = LOCALE_META[locale as Locale];
  return (
    <html
      lang={meta.hreflang}
      dir={meta.dir}
      className={geistSans.variable + " h-full antialiased"}
    >
      <body className="min-h-full flex flex-col">
        <AnalyticsProvider />
        {children}
        <WhatsAppFabLink locale={locale as Locale} />
      </body>
    </html>
  );
}
