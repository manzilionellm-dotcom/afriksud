// components/shared/plans.ts
// Mzansi Stream pricing in USD.
// Totals below are paid upfront for the chosen term.

import type { Plan } from "./types";

export const plans: Plan[] = [
  { key: "pday", price: 5, months: 0, currency: "USD", priceValidUntil: "2027-12-31" },
  { key: "p1", price: 15, months: 1, currency: "USD", priceValidUntil: "2027-12-31" },
  { key: "p12", price: 65, months: 12, currency: "USD", priceValidUntil: "2027-12-31" },
];

export function monthlyEquivalent(plan: Plan): number {
  return Number((plan.price / Math.max(1, plan.months)).toFixed(2));
}

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
      "AMC", "FOX", "BBC Brit", "Sony Channel",
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
