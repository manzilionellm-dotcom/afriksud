// components/shared/plans.ts
// Mzansi Stream pricing in ZAR.
// Strategy: dramatically cheaper than DStv Premium (R899/mo) and Compact (R449/mo).
// 12-month plan = R99.92/mo effective — destroys DStv on every metric.

import type { Plan } from "./types";

export const plans: Plan[] = [
  { key: "p1",  price: 199,  months: 1,  currency: "ZAR", priceValidUntil: "2027-12-31" },
  { key: "p3",  price: 449,  months: 3,  currency: "ZAR", priceValidUntil: "2027-12-31", highlight: true },
  { key: "p6",  price: 699,  months: 6,  currency: "ZAR", priceValidUntil: "2027-12-31" },
  { key: "p12", price: 1199, months: 12, currency: "ZAR", priceValidUntil: "2027-12-31" },
];

// Channel categories preview (5 tabs)
export const channelPreview = [
  {
    region: "South Africa",
    channels: [
      "SABC 1 HD", "SABC 2 HD", "SABC 3 HD", "SABC News", "e.tv HD",
      "eNCA", "Newzroom Afrika", "kykNET", "Mzansi Magic", "1 Magic",
    ],
  },
  {
    region: "Sport",
    channels: [
      "SuperSport PSL", "SuperSport Premier League", "SuperSport Rugby",
      "SuperSport Cricket", "SuperSport Variety 1", "SuperSport Variety 2",
      "SuperSport Action", "SuperSport Grandstand", "Eurosport 1 4K", "DAZN",
    ],
  },
  {
    region: "Movies & Series",
    channels: [
      "M-Net Movies Premiere", "M-Net Movies Action+", "M-Net Series",
      "AMC", "FOX", "BBC Brit", "Disney+", "HBO Max", "Netflix mirror", "Sony Channel",
    ],
  },
  {
    region: "Africa",
    channels: [
      "Africa Magic Showcase", "Africa Magic Family", "Channels TV Nigeria",
      "ZBC News Zimbabwe", "TPA1 Angola", "TVM Mozambique", "KTN Kenya",
      "DStv News", "Trace Africa", "Trace Mziki",
    ],
  },
  {
    region: "International",
    channels: [
      "BBC One HD", "BBC News", "CNN International", "Sky News",
      "Al Jazeera English", "France 24 EN", "DW English", "Bloomberg", "RT", "TRT World",
    ],
  },
] as const;

// Devices supported
export const deviceList = [
  { name: "Smart TV",            icon: "📺" },
  { name: "Firestick / Fire TV", icon: "🔥" },
  { name: "iPhone & iPad",       icon: "📱" },
  { name: "Android",             icon: "🤖" },
  { name: "PC & Mac",            icon: "💻" },
  { name: "Android TV Box",      icon: "📦" },
  { name: "MAG Box",             icon: "📡" },
];
