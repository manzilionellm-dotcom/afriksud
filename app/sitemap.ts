import type { MetadataRoute } from 'next';

const SITE_URL = 'https://espg.vercel.app';

const STATIC_PAGES: { path: string; priority: number; freq: 'daily' | 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '/',                       priority: 1.0,  freq: 'daily' },
  { path: '/iptv-south-africa',      priority: 0.95, freq: 'weekly' },
  { path: '/how-to-install-iptv',    priority: 0.9,  freq: 'weekly' },
  { path: '/payment-methods',        priority: 0.9,  freq: 'weekly' },
  { path: '/iptv-worldwide',         priority: 0.85, freq: 'monthly' },
];

const SA_CITIES = [
  'cape-town', 'johannesburg', 'durban', 'pretoria', 'gqeberha',
  'bloemfontein', 'east-london', 'polokwane', 'mbombela', 'kimberley',
];

const SPORTS = ['dstv-premiership', 'urc-rugby', 'premier-league', 'champions-league', 'cricket', 'f1'];
const DEVICES = ['firestick', 'smart-tv-samsung', 'smart-tv-lg', 'android-tv-box', 'iphone-ipad', 'android', 'mag-box', 'macbook-windows'];
const COMPETITORS = ['dstv-premium', 'dstv-compact', 'showmax', 'netflix'];

const HREFLANGS = ['en-ZA', 'af-ZA', 'zu-ZA', 'en-GB', 'en-AU', 'en-US'] as const;

function buildAlternates(path: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const lang of HREFLANGS) langs[lang] = `${SITE_URL}${path}`;
  langs['x-default'] = `${SITE_URL}${path}`;
  return langs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const p of STATIC_PAGES) {
    entries.push({ url: `${SITE_URL}${p.path}`, lastModified: now, changeFrequency: p.freq, priority: p.priority, alternates: { languages: buildAlternates(p.path) } });
  }
  for (const c of SA_CITIES) {
    const path = `/iptv-${c}`;
    entries.push({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7, alternates: { languages: buildAlternates(path) } });
  }
  for (const s of SPORTS) {
    const path = `/iptv-${s}`;
    entries.push({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency: 'weekly', priority: 0.75, alternates: { languages: buildAlternates(path) } });
  }
  for (const d of DEVICES) {
    const path = `/install-iptv-${d}`;
    entries.push({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency: 'monthly', priority: 0.75, alternates: { languages: buildAlternates(path) } });
  }
  for (const c of COMPETITORS) {
    const path = `/iptv-vs-${c}`;
    entries.push({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7, alternates: { languages: buildAlternates(path) } });
  }
  return entries;
}
