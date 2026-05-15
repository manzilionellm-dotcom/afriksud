// app/layout.tsx
// Server Component — generates all root metadata server-side for Google.
// hreflang map is built from the canonical 12-locale registry so the
// switcher, sitemap and HTML metadata never drift out of sync.

import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { DEFAULT_LOCALE, LOCALE_META, LOCALES } from "../lib/locales";
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
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The `<html lang>` / `dir` attributes are kept at the en-ZA default for
  // the initial server render — `LanguageProvider` rewrites them on the
  // client once the resolved locale is known. A future PR will migrate the
  // app to `/[locale]/` routes so the correct attributes ship from SSR.
  const rootMeta = LOCALE_META[DEFAULT_LOCALE];
  return (
    <html
      lang={rootMeta.hreflang}
      dir={rootMeta.dir}
      className={geistSans.variable + " h-full antialiased"}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
