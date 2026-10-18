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
    default: "DStv Alternative — Live TV in 4K from R99 | Mzansi Stream",
    template: "%s | Mzansi Stream",
  },
  // Under 155 characters; honest claims only (no fabricated rating).
  description:
    "South Africa's IPTV alternative to DStv — live channels in 4K with SuperSport, kykNET and SABC folders to confirm on WhatsApp. Free 24h trial, no card. From R99/mo.",
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
    title: "Best IPTV South Africa 2026 — Live TV in 4K | Mzansi Stream",
    description:
      "IPTV for South Africa — SABC, e.tv, SuperSport PSL, Premier League, kykNET and international folders in 4K, line-up confirmed on WhatsApp. Free 24h trial.",
    countryName: "South Africa",
  },
  twitter: {
    card: "summary_large_image",
    // À CONFIRMER — no verified @iptvmzansi profile in the repo. Do not emit site/creator.
    title: "Best IPTV South Africa 2026 — Live TV in 4K",
    description:
      "Premium streaming SA — SABC, e.tv, SuperSport, Premier League + diaspora channels. Activated on WhatsApp. Free 24h trial.",
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
  return {
    ...BASE_METADATA,
    alternates: {
      canonical: localeUrl(locale as Locale, "/"),
      languages: hreflangFor("/"),
    },
    openGraph: {
      ...BASE_METADATA.openGraph,
      locale: meta.ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => LOCALE_META[l].ogLocale
      ),
    },
    other: {
      ...(BASE_METADATA.other as Record<string, string>),
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
