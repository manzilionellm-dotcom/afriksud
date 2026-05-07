// app/layout.tsx
// Server Component — generates ALL metadata server-side for Google.
// 130+ keywords for SA + diaspora. Optimised to crush DStv on SERP.

import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
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
    default:
      "Best IPTV South Africa 2026 — 20,000+ Channels, 4K, from R99/mo | Mzansi Stream",
    template: "%s | Mzansi Stream",
  },
  description:
    "🇿🇦 South Africa's best IPTV 2026 — 20,000+ channels in 4K UHD. SABC, e.tv, SuperSport, DStv Premiership, Premier League + Indian, Nigerian, Zimbabwean channels. Activated in 10 min on WhatsApp. Free 24h trial, no card. From R99/mo. No contract. ★ 4.9/5 from 1,200+ customers.",
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    // ── SOUTH AFRICA HIGH-VOLUME ─────────────────────────────────────────────
    "IPTV South Africa",
    "best IPTV South Africa",
    "best IPTV South Africa 2026",
    "IPTV SA",
    "IPTV Mzansi",
    "South African IPTV",
    "IPTV subscription South Africa",
    "IPTV streaming SA",
    "stable IPTV South Africa",
    "cheap IPTV South Africa",
    "IPTV free trial South Africa",
    "Mzansi Stream",
    // ── DStv ALTERNATIVE (huge keyword) ─────────────────────────────────────
    "DStv alternative",
    "alternative to DStv",
    "DStv vs IPTV",
    "cheaper than DStv",
    "DStv replacement",
    "drop DStv",
    "cancel DStv",
    "DStv Premium alternative",
    "DStv Compact alternative",
    "Showmax alternative",
    "Netflix alternative South Africa",
    // ── SA CHANNELS ─────────────────────────────────────────────────────────
    "SABC IPTV",
    "SABC streaming",
    "SABC live online",
    "e.tv streaming",
    "e.tv live",
    "kykNET IPTV",
    "Mzansi Magic streaming",
    "M-Net online",
    "1 Magic streaming",
    "eNCA online",
    "Newzroom Afrika streaming",
    // ── SPORT (MASSIVE) ─────────────────────────────────────────────────────
    "SuperSport stream",
    "SuperSport live",
    "SuperSport PSL streaming",
    "DStv Premiership stream",
    "PSL streaming",
    "PSL live",
    "Premier League South Africa",
    "Premier League streaming SA",
    "Springboks stream",
    "Springboks live",
    "URC streaming",
    "URC South Africa",
    "Currie Cup stream",
    "Stormers stream",
    "Sharks rugby stream",
    "Bulls rugby stream",
    "Cheetahs stream",
    "Kaizer Chiefs stream",
    "Orlando Pirates stream",
    "Mamelodi Sundowns stream",
    "AmaZulu FC stream",
    "Cape Town City stream",
    "Proteas cricket stream",
    "IPL South Africa",
    "T20 stream SA",
    "F1 streaming South Africa",
    // ── DEVICES ─────────────────────────────────────────────────────────────
    "Firestick IPTV South Africa",
    "Smart TV IPTV SA",
    "TiviMate South Africa",
    "IPTV Smarters South Africa",
    "MAG Box South Africa",
    "iPhone IPTV SA",
    "Android TV box South Africa",
    "M3U South Africa",
    // ── CITIES ──────────────────────────────────────────────────────────────
    "IPTV Johannesburg",
    "IPTV Cape Town",
    "IPTV Durban",
    "IPTV Pretoria",
    "IPTV Gqeberha",
    "IPTV Bloemfontein",
    "IPTV East London",
    "IPTV Polokwane",
    "IPTV Joburg",
    "IPTV Sandton",
    "IPTV Soweto",
    "IPTV Stellenbosch",
    // ── DIASPORA COMMUNITIES IN SA ──────────────────────────────────────────
    "Zimbabwean IPTV South Africa",
    "ZBC TV Johannesburg",
    "Star FM streaming SA",
    "Indian IPTV South Africa",
    "Bollywood streaming Durban",
    "Zee TV South Africa",
    "Sun TV Durban",
    "Star Plus SA",
    "Asianet South Africa",
    "Nigerian IPTV South Africa",
    "Nollywood IPTV SA",
    "Channels TV South Africa",
    "Africa Magic SA",
    "British TV South Africa",
    "BBC Cape Town",
    "Sky Sports South Africa",
    "ITV Cape Town",
    "Portuguese TV South Africa",
    "TVM Mozambique South Africa",
    "RTP Pretoria",
    "Chinese IPTV South Africa",
    "CCTV South Africa",
    "Arabic IPTV South Africa",
    "MBC Cape Town",
    "beIN Sports Johannesburg",
    "Greek IPTV South Africa",
    "ERT Johannesburg",
    // ── SA EXPATS WORLDWIDE (BIG SEO) ───────────────────────────────────────
    "watch SuperSport in UK",
    "watch SuperSport in Australia",
    "watch SuperSport in USA",
    "watch SuperSport abroad",
    "watch SABC abroad",
    "watch SABC in UK",
    "watch SABC in Australia",
    "watch SABC in USA",
    "watch SABC outside South Africa",
    "watch kykNET abroad",
    "watch PSL abroad",
    "watch Springboks abroad",
    "watch URC abroad",
    "watch Currie Cup abroad",
    "South African TV in UK",
    "South African TV in Australia",
    "South African TV in USA",
    "South African TV in UAE",
    "South African TV in Canada",
    "South African TV in Germany",
    "SA TV expat",
    "DStv abroad",
    "DStv outside South Africa",
    "South African channels worldwide",
    // ── ISP / FIBRE ─────────────────────────────────────────────────────────
    "IPTV Vumatel",
    "IPTV Openserve",
    "IPTV Frogfoot",
    "IPTV MTN Fibre",
    "IPTV Vodacom Fibre",
    "IPTV Octotel",
    "IPTV MetroFibre",
    "IPTV Cool Ideas",
    // ── PAYMENTS / TRUST ────────────────────────────────────────────────────
    "IPTV SnapScan",
    "IPTV Zapper",
    "IPTV EFT South Africa",
    "IPTV Capitec Pay",
    "IPTV Ozow",
    "IPTV without contract South Africa",
    "IPTV free trial 24 hours",
    "IPTV no credit card",
  ],
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
    canonical: "/",
    languages: {
      "en-ZA": SITE_URL + "/?lang=en",
      "en-GB": SITE_URL + "/?lang=en",
      "en-AU": SITE_URL + "/?lang=en",
      "en-US": SITE_URL + "/?lang=en",
      "en-AE": SITE_URL + "/?lang=en",
      en: SITE_URL + "/?lang=en",
      "af-ZA": SITE_URL + "/?lang=af",
      af: SITE_URL + "/?lang=af",
      "fr-FR": SITE_URL + "/?lang=fr",
      fr: SITE_URL + "/?lang=fr",
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    alternateLocale: ["en_GB", "en_AU", "en_US", "af_ZA", "fr_FR"],
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
    language: "English, Afrikaans, French",
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
  return (
    <html
      lang="en"
      dir="ltr"
      className={geistSans.variable + " h-full antialiased"}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
