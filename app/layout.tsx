import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://afriksud.vercel.app';
const BRAND = 'Mzansi Stream';
const TITLE = 'Mzansi Stream — Premium IPTV South Africa · DStv Alternative from R199/month';
const DESCRIPTION =
  'Premium IPTV for South Africa. 20,000+ channels in 4K including SuperSport, DStv Premiership, SABC, kykNET and Premier League. WhatsApp activation in 10 minutes. 24-hour free trial. No contract.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s · ${BRAND}` },
  description: DESCRIPTION,
  applicationName: BRAND,
  generator: 'Next.js',
  keywords: [
    'iptv south africa',
    'best iptv 2026 south africa',
    'iptv dstv alternative',
    'supersport iptv',
    'dstv premiership streaming',
    'premier league south africa iptv',
    'iptv 4k south africa',
    'iptv firestick south africa',
    'iptv smart tv south africa',
    'cheap iptv south africa',
    'iptv free trial',
    'watch soccer live south africa',
    'kyknet iptv',
    'mzansi magic streaming',
    'showmax alternative',
    'iptv with eft payment',
    'iptv snapscan zapper',
  ],
  authors: [{ name: BRAND, url: SITE_URL }],
  creator: BRAND,
  publisher: BRAND,
  category: 'streaming',
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-ZA': `${SITE_URL}/`,
      'af-ZA': `${SITE_URL}/af`,
      'zu-ZA': `${SITE_URL}/zu`,
      'en-GB': `${SITE_URL}/uk`,
      'en-AU': `${SITE_URL}/au`,
      'en-US': `${SITE_URL}/us`,
      'x-default': `${SITE_URL}/`,
    },
  },
  openGraph: {
    type: 'website', locale: 'en_ZA',
    alternateLocale: ['af_ZA', 'zu_ZA', 'en_GB', 'en_AU'],
    url: SITE_URL, siteName: BRAND, title: TITLE, description: DESCRIPTION,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${BRAND} — Premium IPTV for South Africa` }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og-image.jpg'] },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'icon', type: 'image/png', sizes: '192x192', url: '/icon-192.png' },
      { rel: 'icon', type: 'image/png', sizes: '512x512', url: '/icon-512.png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: '#007749',
  width: 'device-width', initialScale: 1, maximumScale: 5, colorScheme: 'dark',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-ZA">
      <body className="antialiased">{children}</body>
    </html>
  );
}
