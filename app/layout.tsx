// app/layout.tsx
// Server Component — generates all root metadata server-side for Google.
// hreflang map is built from the canonical 12-locale registry so the
// switcher, sitemap and HTML metadata never drift out of sync.

import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist } from "next/font/google";
import {
  DEFAULT_LOCALE,
  LOCALE_META,
  LOCALES,
  type Locale,
} from "../lib/locales";
import { AnalyticsProvider } from "../lib/analytics/AnalyticsProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://iptvmzansi.com";
const SITE_NAME = "Mzansi Stream";
const OG_IMAGE = SITE_URL + "/og-image.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Kept under 60 characters so Google doesn't truncate on SERP.
    // `default` is rendered as-is (no template applied) so the brand
    // suffix lives here. Child pages must set `title` WITHOUT the
    // `| Mzansi Stream` suffix — the template appends it once.
    default: "DStv Alternative — 20,000+ Channels from R99 | Mzansi Stream",
    template: "%s | Mzansi Stream",
  },
  // Under 155 characters; honest claims only (no fabricated rating).
  description:
    "South Africa's IPTV alternative to DStv — 20,000+ live channels including SuperSport, kykNET and SABC in 4K. Free 24h trial, no card. From R99/mo.",
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
  alternates: {
    // Per-page canonical + languages live on `app/[locale]/.../page.tsx`.
    // Root-level metadata only carries the default-locale hint.
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: LOCALE_META[DEFAULT_LOCALE].ogLocale,
    alternateLocale: LOCALES.filter((l) => l !== DEFAULT_LOCALE).map(
      (l) => LOCALE_META[l].ogLocale
    ),
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Best IPTV South Africa 2026 — 20,000+ Channels in 4K | Mzansi Stream",
    description:
      "South Africa's best IPTV — SABC, e.tv, SuperSport PSL, Premier League, kykNET + 20,000 international channels in 4K. Activated in 10 minutes on WhatsApp. Free 24h trial.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Mzansi Stream — Best IPTV South Africa 2026",
        type: "image/jpeg",
      },
    ],
    countryName: "South Africa",
  },
  twitter: {
    card: "summary_large_image",
    site: "@iptvmzansi",
    creator: "@iptvmzansi",
    title: "Best IPTV South Africa 2026 — 20,000+ Channels in 4K",
    description:
      "Premium streaming SA — SABC, e.tv, SuperSport, Premier League + diaspora channels. Activated in 10 min. Free 24h trial.",
    images: [OG_IMAGE],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // `<html lang>` / `dir` resolve from the middleware-set `x-mz-locale`
  // header so Googlebot sees the correct attribute on every locale URL
  // instead of a static `en-ZA` fallback.
  const hdrs = await headers();
  const headerLocale = hdrs.get("x-mz-locale") ?? DEFAULT_LOCALE;
  const resolved = (LOCALES as readonly string[]).includes(headerLocale)
    ? (headerLocale as Locale)
    : DEFAULT_LOCALE;
  const meta = LOCALE_META[resolved];
  return (
    <html
      lang={meta.hreflang}
      dir={meta.dir}
      className={geistSans.variable + " h-full antialiased"}
    >
      <body className="min-h-full flex flex-col">
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
