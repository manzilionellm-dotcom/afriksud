"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ─────────────────────────────────────────────────────────────────────────────
 *  MZANSI STREAM — Premium IPTV for South Africa
 *  Single-locale (en-ZA) Next.js client page.
 *  100% English en-ZA. Optimised for South Africa SEO + diaspora intent.
 *  ──────────────────────────────────────────────────────────────────────────── */

// ─── TYPES ───────────────────────────────────────────────────────────────────
type PlanKey = "p1" | "p3" | "p6" | "p12";
type Msg = { from: "bot" | "user"; text: string };
type Plan = { key: PlanKey; price: number; months: number; priceValidUntil: string; highlight?: boolean };
type FAQItem = { q: string; a: string };
type ReviewItem = { name: string; city: string; stars: number; text: string; plan: string };
type CountryChannel = { n: string; c: string };
type Country = {
  slug: string;
  flag: string;
  name: string;
  sub: string;
  desc: string;
  wa: string;
  keywords: [string, string][];
  channels: CountryChannel[];
};
type ExpatCountry = { flag: string; code: string; name: string; desc: string };

// ─── GLOBAL CONFIG ───────────────────────────────────────────────────────────
const SITE = {
  domain: "https://espg.vercel.app",
  brand: "Mzansi Stream",
  whatsappPhone: "447307410512",
  currencyCode: "ZAR",
  currencyLabel: "R",
} as const;

// ─── PRICING ─────────────────────────────────────────────────────────────────
// Precios optimizados para mercado español (EUR).
// Posicionamiento: drásticamente más barato que Movistar Plus+ / DAZN.
const PLANS: Plan[] = [
  { key: "p1",  price: 199,  months: 1,  priceValidUntil: "2027-12-31" },
  { key: "p3",  price: 449,  months: 3,  priceValidUntil: "2027-12-31", highlight: true },
  { key: "p6",  price: 699,  months: 6,  priceValidUntil: "2027-12-31" },
  { key: "p12", price: 1199, months: 12, priceValidUntil: "2027-12-31" },
];

// ─── CHANNEL PREVIEW (South Africa + Africa + International) ─────────────────────
const CHANNEL_PREVIEW = [
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

// ─── DEVICES COMPATIBLES ────────────────────────────────────────────────
const DEVICE_LIST = [
  { name: "Smart TV",            icon: "📺" },
  { name: "Firestick / Fire TV", icon: "🔥" },
  { name: "iPhone & iPad",       icon: "📱" },
  { name: "Android",             icon: "🤖" },
  { name: "PC y Mac",            icon: "💻" },
  { name: "Android TV Box",      icon: "📦" },
  { name: "MAG Box",             icon: "📡" },
];

// ─── DIASPORA COMMUNITIES IN SOUTH AFRICA ───────────────────────────────────
// The largest foreign communities living in South Africa get access
// nativo a su televisión de origen.
const COUNTRIES: Country[] = [
  {
    slug: "zimbabwean",
    flag: "🇿🇼",
    name: "Zimbabwean",
    sub: "ZBC News, Star FM, ZTV",
    desc: "Full Zimbabwean channel pack — ZBC News, ZTV1, Star FM, Capitalk, sport and Shona/Ndebele content.",
    wa: "Hi! I want Zimbabwean channels in South Africa.",
    keywords: [
      ["zimbabwean iptv south africa", "1 800/mo"],
      ["zbc tv johannesburg", "1 100/mo"],
      ["star fm streaming sa", "640/mo"],
      ["zim tv channels jhb", "480/mo"],
    ],
    channels: [
      { n: "ZBC News", c: "📰" }, { n: "ZTV1", c: "🎬" }, { n: "Star FM", c: "🎵" },
      { n: "ZBC Live", c: "🎬" }, { n: "Capitalk", c: "📰" }, { n: "ZTN Prime", c: "🎬" },
      { n: "1ZTV", c: "🎬" }, { n: "Joy TV", c: "🎬" },
    ],
  },
  {
    slug: "indian",
    flag: "🇮🇳",
    name: "Indian (हिंदी / தமிழ்)",
    sub: "Star Plus, Zee, Sun TV, Sony",
    desc: "Indian channel pack — Bollywood, Star Plus, Zee, Sony, Sun TV (Tamil), Asianet (Malayalam).",
    wa: "Hi! I want Indian / Bollywood channels in South Africa.",
    keywords: [
      ["indian iptv south africa", "1 600/mo"],
      ["bollywood streaming durban", "880/mo"],
      ["zee tv south africa", "720/mo"],
      ["sun tv durban", "560/mo"],
    ],
    channels: [
      { n: "Star Plus HD", c: "🎬" }, { n: "Zee TV HD", c: "🎬" }, { n: "Sony TV", c: "🎬" },
      { n: "Colors TV", c: "🎬" }, { n: "Star Sports 1", c: "🏏" }, { n: "Sun TV (Tamil)", c: "🎬" },
      { n: "Asianet (Malayalam)", c: "🎬" }, { n: "Aaj Tak", c: "📰" }, { n: "Zee Cinema", c: "🎬" },
      { n: "Star Gold", c: "🎬" },
    ],
  },
  {
    slug: "nigerian",
    flag: "🇳🇬",
    name: "Nigerian (Nollywood)",
    sub: "Nollywood TV, AIT, Channels",
    desc: "Nigerian channel pack — Nollywood movies, Channels TV, AIT, Africa Magic.",
    wa: "Hi! I want Nigerian / Nollywood channels in South Africa.",
    keywords: [
      ["nollywood iptv south africa", "1 300/mo"],
      ["nigerian channels johannesburg", "720/mo"],
      ["channels tv south africa", "480/mo"],
    ],
    channels: [
      { n: "Africa Magic Showcase", c: "🎬" }, { n: "Africa Magic Yoruba", c: "🎬" },
      { n: "Africa Magic Igbo", c: "🎬" }, { n: "Channels TV", c: "📰" },
      { n: "AIT", c: "📰" }, { n: "TVC News Nigeria", c: "📰" }, { n: "Nollywood TV", c: "🎬" },
      { n: "ROK", c: "🎬" },
    ],
  },
  {
    slug: "british",
    flag: "🇬🇧",
    name: "British TV",
    sub: "BBC, ITV, Sky Sports",
    desc: "Full British TV pack — BBC, ITV, Channel 4, Sky Sports for British expats in SA.",
    wa: "Hi! I want British TV channels in South Africa.",
    keywords: [
      ["british tv south africa", "980/mo"],
      ["bbc cape town", "560/mo"],
      ["sky sports south africa", "420/mo"],
    ],
    channels: [
      { n: "BBC One HD", c: "🎬" }, { n: "BBC Two", c: "🎬" }, { n: "BBC News", c: "📰" },
      { n: "ITV 1 HD", c: "🎬" }, { n: "Channel 4", c: "🎬" }, { n: "Channel 5", c: "🎬" },
      { n: "Sky Sports Main", c: "⚽" }, { n: "Sky News", c: "📰" }, { n: "BT Sport 1", c: "⚽" },
    ],
  },
  {
    slug: "portuguese",
    flag: "🇵🇹",
    name: "Português / Mozambican",
    sub: "RTP, SIC, TVI, TVM",
    desc: "Portuguese and Mozambican channels — RTP Internacional, SIC, TVI, TVM, STV.",
    wa: "Hi! I want Portuguese / Mozambican channels in South Africa.",
    keywords: [
      ["portuguese tv south africa", "640/mo"],
      ["tvm mozambique south africa", "320/mo"],
      ["rtp pretoria", "210/mo"],
    ],
    channels: [
      { n: "RTP 1", c: "🎬" }, { n: "RTP Internacional", c: "🎬" }, { n: "SIC", c: "🎬" },
      { n: "TVI", c: "🎬" }, { n: "TVM Mozambique", c: "🎬" }, { n: "STV", c: "🎬" },
    ],
  },
  {
    slug: "french-african",
    flag: "🇨🇩",
    name: "Francophone Africa",
    sub: "Canal+ Afrique, RTNC, RTI",
    desc: "Francophone African channels — Canal+ Afrique, RTNC (DRC), RTI, AfricaNews.",
    wa: "Hi! I want Francophone African channels in South Africa.",
    keywords: [
      ["congolese iptv south africa", "440/mo"],
      ["canal afrique johannesburg", "260/mo"],
    ],
    channels: [
      { n: "Canal+ Afrique", c: "🎬" }, { n: "RTNC DRC", c: "🎬" }, { n: "RTI Côte d'Ivoire", c: "🎬" },
      { n: "Africa24", c: "📰" }, { n: "Trace Africa", c: "🎵" },
    ],
  },
  {
    slug: "chinese",
    flag: "🇨🇳",
    name: "中文",
    sub: "CCTV, Phoenix, TVB",
    desc: "Chinese channels — CCTV, Phoenix, TVB Jade, Mandarin and Cantonese.",
    wa: "Hi! I want Chinese channels in South Africa.",
    keywords: [
      ["chinese iptv south africa", "320/mo"],
      ["cctv south africa", "180/mo"],
    ],
    channels: [
      { n: "CCTV 1", c: "🎬" }, { n: "CCTV 4 Intl", c: "🎬" },
      { n: "Phoenix InfoNews", c: "📰" }, { n: "Phoenix Chinese", c: "🎬" },
      { n: "TVB Jade", c: "🎬" }, { n: "CCTV Sport", c: "⚽" },
    ],
  },
  {
    slug: "arabic",
    flag: "🇦🇪",
    name: "العربية",
    sub: "MBC, Al Jazeera, beIN Sports",
    desc: "Full Arabic channel pack — MBC, Al Jazeera, beIN Sports 4K, OSN, Rotana.",
    wa: "Hi! I want Arabic channels in South Africa.",
    keywords: [
      ["arabic iptv south africa", "260/mo"],
      ["mbc cape town", "180/mo"],
      ["bein sports johannesburg", "140/mo"],
    ],
    channels: [
      { n: "MBC 1", c: "🎬" }, { n: "MBC 2", c: "🎬" }, { n: "MBC Drama", c: "📺" },
      { n: "Al Jazeera", c: "📰" }, { n: "Al Arabiya", c: "📰" },
      { n: "beIN Sports 1 4K", c: "⚽" }, { n: "OSN Sports", c: "⚽" }, { n: "Rotana Cinema", c: "🎬" },
    ],
  },
  {
    slug: "greek",
    flag: "🇬🇷",
    name: "Ελληνικά",
    sub: "ERT, MEGA, ANT1",
    desc: "Greek channels for the SA Greek community — ERT, MEGA, ANT1, Nova Sports.",
    wa: "Hi! I want Greek channels in South Africa.",
    keywords: [
      ["greek iptv south africa", "180/mo"],
      ["ert johannesburg", "110/mo"],
    ],
    channels: [
      { n: "ERT 1", c: "🎬" }, { n: "MEGA Channel", c: "🎬" }, { n: "ANT1", c: "🎬" },
      { n: "SKAI TV", c: "📰" }, { n: "Nova Sports GR", c: "⚽" },
    ],
  },
];

// ─── EXPATS — DESTINATIONS FOR SOUTH AFRICANS ABROAD ────────────────
const EXPAT_COUNTRIES: ExpatCountry[] = [
  { flag: "🇬🇧", code: "gb", name: "United Kingdom", desc: "Full SA TV in London, Manchester, Birmingham — SuperSport, SABC, kykNET with no geo-blocking." },
  { flag: "🇦🇺", code: "au", name: "Australia",       desc: "SuperSport and SA channels in Perth, Sydney, Melbourne — perfect for the SA expat community." },
  { flag: "🇳🇿", code: "nz", name: "New Zealand",     desc: "South African channels in Auckland, Wellington, Christchurch — low-latency stream." },
  { flag: "🇺🇸", code: "us", name: "United States",   desc: "Watch SuperSport and SABC in Houston, NYC, LA — large SA community supported." },
  { flag: "🇨🇦", code: "ca", name: "Canada",          desc: "SA TV in Toronto, Vancouver, Calgary, Montreal." },
  { flag: "🇦🇪", code: "ae", name: "UAE / Dubai",     desc: "Stable 4K stream for South Africans in the Emirates." },
  { flag: "🇩🇪", code: "de", name: "Germany",         desc: "SuperSport and SABC in Berlin, Munich, Frankfurt." },
  { flag: "🇮🇪", code: "ie", name: "Ireland",         desc: "SA channels in Dublin, Cork, Galway — growing SA expat community." },
  { flag: "🇳🇱", code: "nl", name: "Netherlands",     desc: "South African TV in Amsterdam, The Hague, Rotterdam — without VPN." },
  { flag: "🇧🇪", code: "be", name: "Belgium",         desc: "SA channels for the diaspora in Brussels and Antwerp." },
  { flag: "🇨🇭", code: "ch", name: "Switzerland",     desc: "Low-latency streaming for SA expats in Zurich, Geneva, Lausanne." },
  { flag: "🇲🇿", code: "mz", name: "Mozambique",      desc: "Cross-border SA + Portuguese channels for Maputo and Beira." },
  { flag: "🇿🇼", code: "zw", name: "Zimbabwe",        desc: "South African channels in Harare and Bulawayo with edge servers." },
  { flag: "🇧🇼", code: "bw", name: "Botswana",        desc: "SA channels in Gaborone and Francistown — same package, regional pricing." },
  { flag: "🇳🇦", code: "na", name: "Namibia",         desc: "South African TV across Windhoek, Walvis Bay, Swakopmund." },
  { flag: "🇸🇬", code: "sg", name: "Singapore",       desc: "SA channels for expats in Singapore — optimised for Asia latency." },
];

// ─── ENGLISH (en-ZA) DICTIONARY ─────────────────────────────────────────────────────
// Single locale. SEO for South Africa. Natural, persuasive English en-ZA tone.
const T = {
  brand: SITE.brand,
  top: {
    status: "Servers online · Live WhatsApp support",
    urgency: "🎁 Launch price locked in until 30 June · Free 24h trial",
  },
  nav: {
    offers: "Pricing",
    channels: "Channels",
    countries: "Your language",
    international: "SA worldwide",
    devices: "Devices",
    cities: "Cities",
    faq: "FAQ",
    setup: "Setup",
    install: "Install app",
  },
  hero: {
    pill: "Premium 4K · Global CDN · 20,000+ channels",
    titleA: "Every channel.",
    titleB: "Instantly.",
    lead: "20,000+ channels in native 4K, live sport with no buffering, movies and series unlocked in seconds. SuperSport, DStv Premiership, Premier League, kykNET — all in one package. No contract.",
    ctaPrices: "Instant access",
    ctaAdvisor: "Talk to an advisor",
    trust: "★ 4.9/5 · 1,200+ customers · Available worldwide · No contract",
  },
  trial: {
    badge: "Free trial",
    title: "Try it free for 24 hours",
    sub: "No card, no commitment. Message us on WhatsApp and try the service on your Smart TV, Firestick, phone or tablet within minutes.",
    cta: "Request your free trial now",
    note: "No contract. No automatic charges.",
  },
  offers: {
    title: "Choose your plan",
    sub: "Every plan includes 20,000+ channels, 100,000+ movies and series, EPG and WhatsApp support. Instant activation.",
    order: "Order via WhatsApp",
    billedOnce: "One-off payment of",
    perMonth: "/mo",
    save: "SAVE",
    bestSeller: "BEST SELLER",
    totalLabel: "one-off",
  },
  planNames: {
    p1: "1 month",
    p3: "3 months",
    p6: "6 months",
    p12: "12 months",
  } as Record<PlanKey, string>,
  planPerks: {
    p1: ["20,000+ live channels", "4K/UHD quality", "EPG guide included", "WhatsApp support", "No contract"],
    p3: ["Most popular choice", "20,000+ live channels", "100,000+ movies & series", "Priority support", "Guided install"],
    p6: ["Best value for money", "20,000+ live channels", "Up to 3 devices", "EPG + Catch-up TV", "Every channel included"],
    p12: ["Best deal of the year", "Premium VIP access", "20,000+ channels", "VIP 24/7 support", "Free upgrades"],
  } as Record<PlanKey, string[]>,
  channels: {
    title: "Browse the channel line-up",
    sub: "Pick a category to preview what's included.",
    more: "…and 20,000+ more channels",
  },
  devices: {
    title: "Works on every device you own",
    sub: "Install on up to 3 devices. We walk you through it on WhatsApp, no matter what you use.",
    list: DEVICE_LIST,
  },
  vod: {
    title: "100,000+ movies and series on demand",
    sub: "Catalogue refreshed every week with the latest releases. Watch when you want, where you want.",
    stats: [
      { value: "100,000+", label: "Movies & series" },
      { value: "20,000+",  label: "Live channels" },
      { value: "4K/UHD",   label: "Max quality" },
      { value: "< 10 min", label: "Activation time" },
    ],
  },
  compare: {
    title: "Why choose Mzansi Stream?",
    sub: "Comparison vs the main streaming services in South Africa.",
    headers: ["Service", "Price/mo", "Live channels", "VOD", "4K", "Support"],
    rows: [
      { service: "DStv Premium",         price: "R899",  live: "~180", vod: true,  hd4k: true,  support: "Phone" },
      { service: "DStv Compact Plus",    price: "R549",  live: "~150", vod: true,  hd4k: false, support: "Phone" },
      { service: "DStv Compact",         price: "R449",  live: "~120", vod: true,  hd4k: false, support: "Phone" },
      { service: "Showmax",              price: "R99",   live: "0",    vod: true,  hd4k: true,  support: "Email" },
      { service: "Netflix Premium",      price: "R199",  live: "0",    vod: true,  hd4k: true,  support: "Chat" },
      { service: "Mzansi Stream",        price: "from R99", live: "20,000+", vod: true, hd4k: true, support: "Direct WhatsApp", highlight: true },
    ] as { service: string; price: string; live: string; vod: boolean; hd4k: boolean; support: string; highlight?: boolean }[],
  },
  reviews: {
    title: "What our customers say",
    sub: "Real reviews from customers across South Africa.",
    items: [
      { name: "Sipho M.",   city: "Johannesburg", stars: 5, plan: "3 months",  text: "I had it running in 10 minutes with their WhatsApp help. SABC, e.tv, SuperSport PSL, Premier League — everything works. Saving over R600/month vs DStv Premium." },
      { name: "Lerato N.",  city: "Cape Town",    stars: 5, plan: "6 months",  text: "Finally watching the URC and the Stormers in 4K with zero buffering. Customer support replies in English, every day of the week. Brilliant." },
      { name: "Pieter B.",  city: "Pretoria",     stars: 5, plan: "12 months", text: "Tried plenty of IPTV in the past — this one is the most stable by far. TiviMate runs perfectly on my Firestick, no drops even at peak. 100% recommended." },
      { name: "Naledi K.",  city: "Durban",       stars: 4, plan: "3 months",  text: "Was nervous at first but the support walked me through every step. Now I get all the kykNET dramas, the AmaZulu matches and SABC without issues." },
      { name: "Riaan vdM.", city: "Gqeberha",     stars: 5, plan: "12 months", text: "Tested for 24h free and signed up for the year the next day. PSL, Premier League, F1 and cricket all in one place. Top class." },
      { name: "Thandi Z.",  city: "Bloemfontein", stars: 5, plan: "6 months",  text: "Works perfectly on my Samsung Smart TV and my iPhone. The kids' channels are a great bonus for the family." },
    ] as ReviewItem[],
  },
  trust: {
    title: "Safe, simple sign-up",
    items: [
      { icon: "🧪", title: "Free 24h trial",      desc: "No credit card. Zero risk." },
      { icon: "⚡", title: "Activated in < 10 min", desc: "We activate you instantly on WhatsApp." },
      { icon: "💬", title: "English support",      desc: "Quick replies, every day." },
      { icon: "🛡️", title: "Satisfaction guarantee", desc: "Not happy? Reach out within 24h." },
      { icon: "📺", title: "4K on every plan",     desc: "No surcharge for max quality." },
      { icon: "🌐", title: "Optimised for SA fibre","desc": "Works with Vumatel, Openserve, Frogfoot, MTN and Vodacom." },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      { q: "Can I watch SABC, e.tv and SA free-to-air channels?", a: "Yes — every major South African channel is included in HD: SABC 1, SABC 2, SABC 3, e.tv, eExtra, eMovies, eNCA, Newzroom Afrika, plus regional broadcasters." },
      { q: "Can I watch the DStv Premiership and the Premier League?", a: "Yes. We include SuperSport PSL, SuperSport Premier League, SuperSport Variety, SuperSport Rugby and SuperSport Cricket. Every match in 4K with no buffering." },
      { q: "Is it compatible with TiviMate, IPTV Smarters and Smart TV?", a: "Yes. Works with TiviMate, IPTV Smarters Pro, GSE Smart IPTV and any standard M3U app. We send the M3U link directly via WhatsApp." },
      { q: "Which devices are supported?", a: "Smart TVs (Samsung, LG, Sony), Firestick / Fire TV, Android TV, iPhone, iPad, Android, Android TV Box, MAG Box and PC/Mac. We guide the install for your specific device." },
      { q: "How fast is activation?", a: "Usually 5 to 10 minutes after we receive your order on WhatsApp, including weekends and public holidays." },
      { q: "Is the EPG guide included?", a: "Yes. The full Electronic Programme Guide is included in every plan so you always know what's on now and what's coming up." },
      { q: "Can I watch on multiple devices at the same time?", a: "The standard plan includes one connection. If you need multi-screen for the whole household, message us on WhatsApp and we'll set up a tailored plan." },
      { q: "Do I need a VPN?", a: "Not required in South Africa, but we recommend one for extra privacy. We can advise on the best VPN for the service." },
      { q: "Does it work outside South Africa?", a: "Yes — the service works in 50+ countries with no geo-blocks. For best results outside SA we recommend a VPN." },
      { q: "How do I pay?", a: "Payment is handled on WhatsApp. We accept EFT, SnapScan, Zapper, Yoco, Ozow, Capitec Pay, Visa, Mastercard, PayPal and Bitcoin." },
      { q: "What if the service goes down?", a: "Message us directly on WhatsApp. We resolve any technical issue typically within 1–2 hours. No customer is left without help." },
      { q: "Is there a contract? Can I cancel?", a: "No contract and no auto-renewal. You pay once and the service ends at the end of the chosen period. If you want to continue, you renew it manually." },
    ] as FAQItem[],
  },
  cities: {
    title: "Premium IPTV across South Africa",
    sub: "The best internet TV service, tuned for your province.",
    button: "Contact us",
    items: [
      { name: "Johannesburg", text: "Perfect for Joburg households who want to drop DStv Premium for a stable, much cheaper alternative. Full SuperSport line-up, Premier League, kykNET and all the SABC channels." },
      { name: "Cape Town",    text: "Optimised for Cape Town. Watch the Stormers, Cape Town City FC and every URC and PSL match on every device, with no buffering." },
      { name: "Durban",       text: "Built for Durban: AmaZulu FC, Sharks rugby, Indian channels for the local community and the full international line-up." },
      { name: "Pretoria",     text: "Mamelodi Sundowns, Bulls rugby, kykNET dramas and the full SABC + e.tv pack — install in 10 minutes via WhatsApp." },
      { name: "Gqeberha",     text: "Stable IPTV in the Eastern Cape — Chippa United, EP Elephants and the major nationals." },
      { name: "Bloemfontein", text: "Bloemfontein Celtic, Free State Cheetahs and the full SuperSport rugby pack with English-language support." },
      { name: "East London",  text: "Reliable streaming in EL with low-latency edge servers — every PSL match plus Premier League." },
      { name: "Polokwane",    text: "Black Leopards, SABC, kykNET and the full international pack across Limpopo." },
    ],
  },
  setup: {
    title: "10-minute install",
    sub: "Works on Firestick, Smart TV, iPhone, Android and more. We walk you through every step.",
    button: "Get install help",
    steps: [
      { step: "1", text: "Message us on WhatsApp and tell us which device you have." },
      { step: "2", text: "Pick your plan and pay via EFT, SnapScan, Zapper or card." },
      { step: "3", text: "Receive your M3U link and step-by-step guide. You're watching TV in under 10 minutes." },
    ],
  },
  international: {
    eyebrow: "SA WORLDWIDE",
    title: "Mzansi Stream — for South Africans anywhere in the world",
    sub: "20,000+ live channels in 4K. Built for the SA diaspora in the UK, Australia, New Zealand, USA, UAE, Canada, Germany and beyond. No geo-blocking. Watch SuperSport, SABC and kykNET wherever you are.",
    tagline: "Tap your country — we route the stream through the closest low-latency edge.",
    selectCountry: "Pick your country",
    benefitsTitle: "Why 1,200+ South African expats choose Mzansi Stream",
    benefits: [
      { icon: "🌍", title: "Works in 50+ countries", desc: "Low-latency edge servers across Europe, the Americas, the Middle East and Asia. Stable 4K wherever you are." },
      { icon: "📺", title: "Every SA channel",      desc: "SABC 1/2/3, e.tv, SuperSport PSL, SuperSport Premier League, kykNET, Mzansi Magic — all included." },
      { icon: "⚡", title: "No geo-blocking",        desc: "The service works without a VPN. You don't need a separate SA decoder rental to watch SABC abroad." },
      { icon: "💬", title: "Support in English",    desc: "WhatsApp support 7 days a week in English (and Afrikaans on request)." },
    ],
    cta: "Order via WhatsApp",
    ctaSecondary: "My country isn't listed",
  },
  footer: {
    rights: "All rights reserved.",
    note: "Optimised for fast, stable streaming across South Africa and the diaspora.",
    legal: "Legal notice",
    privacy: "Privacy policy (POPIA)",
    terms: "Terms & conditions",
    refund: "Satisfaction policy",
  },
  whatsapp: {
    generic: "Hi! I need information about Mzansi Stream.",
    trial: "Hi! I'd like a free 24-hour trial of Mzansi Stream. Can you help?",
    orderMessage: (planName: string, price: number) =>
      `Hi! I want to order the ${planName} plan (${price} ${SITE.currencyLabel}). How do I activate it?`,
  },
  bot: {
    name: "Lerato",
    greeting1: "Hi there! 👋 I'm Lerato.",
    greeting2: "I can help with pricing, the free trial or the install. What would you like to know?",
    price1: "Plans start at R99/month — 1, 3, 6 or 12 months. All include 20,000+ channels, EPG and WhatsApp support.",
    price2: "Want to see the pricing or try it free for 24h first?",
    install1: "Firestick and Smart TV are our most popular devices. Install takes 10 minutes.",
    install2: "I'll send the step-by-step guide on WhatsApp now.",
    trial1: "Of course! We offer a 24-hour free trial — no card, no commitment.",
    trial2: "Tap below and I'll send the trial link directly on WhatsApp.",
    channels1: "We have 20,000+ channels: SABC, SuperSport, Premier League, kykNET, M-Net, Disney+, HBO Max, plus African and international content.",
    default1: "I can help with pricing, the free trial, install and device compatibility.",
    default2: "For the fastest reply, message me on WhatsApp 👇",
    typing: "Lerato is typing...",
    online: "Quick to reply",
    quick: ["See pricing 💰", "Try 24h free 🧪", "Firestick help 🔥", "Which channels? 📺"],
  },
  pwa: {
    title: "Install as app",
    sub: "Faster access and offline support.",
    accept: "Install",
    iosTitle: "Add to Home Screen",
    iosHint: 'Tap the share button and then "Add to Home Screen".',
  },
  stickyCta: "★ Try 24h free →",
  trustStrip: {
    customers: "customers",
    activated: "Activated in 10 min",
    countries: "countries",
    guarantee: "Satisfaction guarantee",
  },
  payments: {
    label: "Secure payments",
  },
};

// ─── UTILITIES ──────────────────────────────────────────────────────────────
function isMobileUA(ua: string): boolean {
  return /Android|iPhone|iPad|iPod/i.test(ua);
}

function generateWhatsAppLink(message: string, ua: string, ref?: string): string {
  const suffix = ref ? ` | Ref: ${ref}` : "";
  const text = encodeURIComponent(message + suffix);
  return isMobileUA(ua)
    ? `https://wa.me/${SITE.whatsappPhone}?text=${text}`
    : `https://api.whatsapp.com/send?phone=${SITE.whatsappPhone}&text=${text}`;
}

function getISOWeekKey(d = new Date()): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function hash32(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function makePRNG(seed: number) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >>> 17; s >>>= 0;
    s ^= s << 5;  s >>>= 0;
    return (s >>> 0) / 4294967296;
  };
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function timeAgoLabel(from: Date, now: Date) {
  const sec = Math.max(1, Math.floor((now.getTime() - from.getTime()) / 1000));
  const min = Math.floor(sec / 60);
  if (min <= 0) return "just now";
  if (min === 1) return "1 min ago";
  if (min < 60) return `${min} min ago`;
  const h = Math.floor(min / 60);
  return h === 1 ? "1 hour ago" : `${h} h ago`;
}

// ─── BOT — REPLIES ────────────────────────────────────────────────────────
function getBotReply(input: string): string[] {
  const q = input.toLowerCase();
  if (/(price|cost|pricing|plan|how much|cheap|💰)/.test(q)) {
    return [T.bot.price1, T.bot.price2];
  }
  if (/(firestick|install|setup|device|smart\s?tv|🔥)/.test(q)) {
    return [T.bot.install1, T.bot.install2];
  }
  if (/(trial|free|try|test|🧪)/.test(q)) {
    return [T.bot.trial1, T.bot.trial2];
  }
  if (/(channel|sport|psl|premiership|premier league|supersport|kyknet|sabc|📺)/.test(q)) {
    return [T.bot.channels1, T.bot.default2];
  }
  return [T.bot.default1, T.bot.default2];
}

// ─── LIVE ACTIVITY WIDGET ──────────────────────────────────────────
function LiveActivityWidget({ userAgent }: { userAgent: string }) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [data, setData] = useState<{ viewing: number; updatedLabel: string } | null>(null);

  useEffect(() => {
    const now = new Date();
    const weekKey = getISOWeekKey(now);
    const weekSeed = hash32(`${SITE.domain}|${weekKey}`);
    const rndWeek = makePRNG(weekSeed);
    const viewingBase = 4 + Math.floor(rndWeek() * 9);
    let lastUpdate = new Date();

    const tick = () => {
      const t = new Date();
      const minuteKey = `${weekKey}|${t.getUTCHours()}:${t.getUTCMinutes()}`;
      const rnd = makePRNG(hash32(`${SITE.domain}|${minuteKey}`));
      const jitter = () => (rnd() < 0.33 ? -1 : rnd() < 0.66 ? 0 : 1);
      const viewing = clamp(viewingBase + jitter(), 4, 22);
      if (rnd() < 0.25) lastUpdate = t;
      setData({ viewing, updatedLabel: timeAgoLabel(lastUpdate, t) });
    };

    tick();
    const id = window.setInterval(tick, 12000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const k = "live_toast_v3";
    try { if (sessionStorage.getItem(k) === "1") return; } catch {}
    const onScroll = () => {
      const el = document.getElementById("offers");
      if (!el) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.7) {
        window.removeEventListener("scroll", onScroll);
        try { sessionStorage.setItem(k, "1"); } catch {}
        setToast(true);
        window.setTimeout(() => setToast(false), 5000);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {toast && data && (
        <div className="liveToast" role="status" aria-live="polite">
          <span className="liveDot" />
          <div className="liveToastText">
            <div className="liveToastTitle">Right now 🔥</div>
            <div className="liveToastSub">{data.viewing} people are looking at pricing now.</div>
          </div>
          <button className="liveToastBtn" onClick={() => setOpen(true)}>View</button>
        </div>
      )}

      <button className="liveBadge" onClick={() => setOpen(v => !v)} aria-label="View live activity">
        <span className="liveDot" />
        <span className="liveBadgeText">{data ? `${data.viewing} live` : "Live"}</span>
      </button>

      {open && data && (
        <div className="livePanel">
          <div className="liveHead">
            <div style={{ fontWeight: 900 }}>Live 🇿🇦</div>
            <div className="liveSub">Updated {data.updatedLabel}</div>
          </div>
          <div className="liveStats">
            <div className="liveRow"><span>Visitors now</span><b>{data.viewing}</b></div>
            <div className="liveRow"><span>Support</span><b style={{ color: "#22c55e" }}>Online</b></div>
          </div>
          <button
            className="liveCta"
            onClick={() => window.open(generateWhatsAppLink("Hi! I want to sign up.", userAgent, "Live-Widget"), "_blank")}
          >
            Open WhatsApp
          </button>
        </div>
      )}
    </>
  );
}

// ─── LERATO CHAT ──────────────────────────────────────────────────────────────
function LeratoChat({ userAgent }: { userAgent: string }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [unread, setUnread] = useState(0);
  const [showQuick, setShowQuick] = useState(false);
  const msgsEndRef = useRef<HTMLDivElement | null>(null);

  const avatarUrl = "/support-agent.jpg";

  const pushBot = async (text: string, delay = 900) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, delay));
    setMsgs(prev => [...prev, { from: "bot", text }]);
    setIsTyping(false);
  };

  useEffect(() => {
    try { if (localStorage.getItem("chatDismissed") === "true") setDismissed(true); } catch {}
  }, []);

  useEffect(() => {
    if (msgs.length > 0) msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (msgs.filter(m => m.from === "bot").length >= 2) setShowQuick(true);
  }, [msgs, isTyping]);

  useEffect(() => { if (open) setUnread(0); }, [open]);

  useEffect(() => {
    if (dismissed || msgs.length > 0) return;
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;
    try { if (sessionStorage.getItem("mz_chat_greeted") === "1") return; } catch {}

    const t = window.setTimeout(() => {
      pushBot(T.bot.greeting1, 0).then(() => pushBot(T.bot.greeting2, 1200));
      setUnread(2);
      try { sessionStorage.setItem("mz_chat_greeted", "1"); } catch {}
    }, 4500);
    return () => window.clearTimeout(t);
  }, [dismissed, msgs.length]);

  const handleOpen = () => {
    setOpen(true);
    setDismissed(false);
    try { localStorage.removeItem("chatDismissed"); } catch {}
  };

  const handleClose = () => {
    setOpen(false);
    setDismissed(true);
    try { localStorage.setItem("chatDismissed", "true"); } catch {}
  };

  const handleToggle = () => (open ? handleClose() : handleOpen());

  const doSend = async (val: string) => {
    if (!val.trim() || isTyping) return;
    setMsgs(prev => [...prev, { from: "user", text: val }]);
    setInput("");
    setShowQuick(false);
    const replies = getBotReply(val);
    for (const r of replies) await pushBot(r, 700);
    window.setTimeout(() => {
      window.open(generateWhatsAppLink(`Hi! ${val}`, userAgent, "Lerato-Chat"), "_blank");
    }, 1200);
  };

  const handleSend = () => doSend(input);
  const handleQuick = (q: string) => doSend(q);

  const teaserMsgs = useMemo(() => {
    const bots = msgs.filter(m => m.from === "bot");
    return bots.slice(Math.max(0, bots.length - 3));
  }, [msgs]);

  const fallbackSrc = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.currentTarget as HTMLImageElement).src = "/icon-192.png";
  };

  return (
    <>
      {!open && !dismissed && teaserMsgs.length > 0 && (
        <button className="miliTeaser" onClick={handleOpen} aria-label="Open chat">
          <div className="miliTeaserHead">
            <img src={avatarUrl} alt={T.bot.name} className="miliTeaserAvatar" loading="lazy" width={22} height={22} onError={fallbackSrc} />
            <span className="miliTeaserTitle">{T.bot.name} · Support</span>
            {unread > 0 && <span className="miliBadge">{unread}</span>}
          </div>
          <div className="miliTeaserLines">
            {teaserMsgs.map((m, i) => <div key={i} className="miliTeaserLine">{m.text}</div>)}
          </div>
        </button>
      )}

      <button className="miliFab" onClick={handleToggle} aria-label={`Chatear con ${T.bot.name}`}>
        <div className="fabContent">
          <img src={avatarUrl} alt={T.bot.name} className="fabAvatar" loading="lazy" width={35} height={35} onError={fallbackSrc} />
          <span className="fabPulse" />
          <span className="fabText">Support</span>
          {unread > 0 && <span className="miliBadge miliBadgeFab">{unread}</span>}
        </div>
      </button>

      {open && (
        <div className="miliBox" role="dialog" aria-label={`Chat con ${T.bot.name}`}>
          <div className="miliHeader">
            <div className="headerAvatarWrapper">
              <img src={avatarUrl} alt={T.bot.name} className="headerAvatar" width={40} height={40} onError={fallbackSrc} />
              <span className="onlineIndicator" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 900, fontSize: "14px" }}>{T.bot.name} · Support</div>
              <div style={{ fontSize: "11px", color: "#25d366", fontWeight: 600 }}>
                {isTyping ? T.bot.typing : T.bot.online}
              </div>
            </div>
            <button className="miliClose" onClick={handleClose} aria-label="Close chat">✕</button>
          </div>

          <div className="miliBody">
            <div className="miliMsgs">
              {msgs.map((m, i) => (
                <div key={i} className={m.from === "bot" ? "miliMsgBot" : "miliMsgUser"}>{m.text}</div>
              ))}
              <div ref={msgsEndRef} />
            </div>

            {isTyping && (
              <div className="typingIndicator"><span>.</span><span>.</span><span>.</span></div>
            )}

            {showQuick && !isTyping && (
              <div className="quickReplies">
                {T.bot.quick.map(q => (
                  <button key={q} className="quickReply" onClick={() => handleQuick(q)}>{q}</button>
                ))}
              </div>
            )}

            <div className="miliInputRow">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
              />
              <button onClick={handleSend} aria-label="Send">→</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── CHANNEL EXPLORER ───────────────────────────────────────────────────
function ChannelExplorer() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section id="channels" className="section">
      <div className="sectionHead">
        <h2>{T.channels.title}</h2>
        <p>{T.channels.sub}</p>
      </div>
      <div className="explorerBox">
        <div className="tabs">
          {CHANNEL_PREVIEW.map((item, i) => (
            <button
              key={item.region}
              className={`tabBtn ${activeTab === i ? "active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {item.region}
            </button>
          ))}
        </div>
        <div className="channelList">
          {CHANNEL_PREVIEW[activeTab].channels.map(ch => (
            <div key={ch} className="channelItem">▶ {ch}</div>
          ))}
          <div className="channelItem more">{T.channels.more}</div>
        </div>
      </div>
    </section>
  );
}

// ─── DIASPORA COMMUNITIES IN SOUTH AFRICA ───────────────────────────────────
function CountriesSection({ ua }: { ua: string }) {
  const [selected, setSelected] = useState<Country | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const closeModal = () => setSelected(null);

  return (
    <>
      <section id="countries" className="section">
        <div className="sectionHead">
          <h2>TV in your language, living in South Africa</h2>
          <p>Tap your country to see every channel and sign up instantly on WhatsApp.</p>
          <p style={{ fontSize: 13, color: "var(--gold)", fontWeight: 600, marginTop: 6 }}>
            👆 Tap a country to see the available channels
          </p>
        </div>

        <div className="countriesGrid">
          {COUNTRIES.map(c => (
            <button key={c.slug} className="countryCard" onClick={() => setSelected(c)}>
              <span className="ctryFlag">{c.flag}</span>
              <div className="ctryInfo">
                <div className="ctryName">{c.name}</div>
                <div className="ctrySub">{c.sub}</div>
              </div>
              <span className="ctryArrow">›</span>
            </button>
          ))}
        </div>

        <div className="stepsCtaWrap" style={{ marginTop: 28 }}>
          <a
            className="btnSecondary"
            href={generateWhatsAppLink("Hi! I am looking for channels in my language while living in South Africa.", ua, "Countries-NotFound")}
            target="_blank"
            rel="noreferrer"
          >
            💬 Your language not listed? Ask us
          </a>
        </div>
      </section>

      {selected && (
        <div
          className="countryModalOverlay"
          onClick={(e) => {
            if ((e.target as HTMLElement).classList.contains("countryModalOverlay")) closeModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={selected.name}
        >
          <div className="countryModalBox">
            <div className="countryModalHd">
              <span className="countryModalFlag">{selected.flag}</span>
              <div className="countryModalTb">
                <h2>{selected.name}</h2>
                <p>{selected.desc}</p>
              </div>
              <button className="countryModalClose" onClick={closeModal} aria-label="Close">✕</button>
            </div>

            <div className="countryModalBd">
              <div className="countryModalSec">
                <div className="countryModalSecTitle">📺 Channels included ({selected.channels.length}+)</div>
                <div className="countryChGrid">
                  {selected.channels.map(ch => (
                    <div key={ch.n} className="countryChChip">
                      <div className="countryChName">{ch.n}</div>
                      <div className="countryChIcon">{ch.c}</div>
                    </div>
                  ))}
                  <div className="countryChChip countryChChipGold">
                    <div className="countryChName" style={{ color: "#C9A84C" }}>+ hundreds more</div>
                    <div className="countryChIcon">💬</div>
                  </div>
                </div>
              </div>

              <div className="countryModalSec">
                <div className="countryModalSecTitle">🔍 What people search on Google</div>
                <div className="countryKwWrap">
                  {selected.keywords.map(([kw, vol]) => (
                    <div key={kw} className="countryKwPill">
                      <span className="countryKwText">{kw}</span>
                      <span className="countryKwVol">{vol}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 10 }}>
                  Volume = monthly searches in South Africa
                </p>
              </div>

              <div className="countryPriceBox">
                <span style={{ fontSize: 26, flexShrink: 0 }}>💰</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 3 }}>
                    From R99/mo
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>
                    All channels · Free 24h trial · No contract
                  </div>
                </div>
              </div>
            </div>

            <div className="countryModalFt">
              <a
                className="trialCta"
                style={{ flex: 1, minWidth: 140, textAlign: "center", fontSize: 14, padding: "13px 18px" }}
                href={generateWhatsAppLink(selected.wa, ua, `Country-${selected.slug}`)}
                target="_blank"
                rel="noreferrer"
              >
                💬 Order {selected.name} — WhatsApp
              </a>
              <a
                className="btnSecondary"
                style={{ flex: 1, minWidth: 130, textAlign: "center", fontSize: 13, padding: "13px 14px" }}
                href={generateWhatsAppLink(`Hi! I want a free 24h trial of the ${selected.name} channels.`, ua, `Trial-${selected.slug}`)}
                target="_blank"
                rel="noreferrer"
              >
                🧪 Free 24h trial
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── SA WORLDWIDE ──────────────────────────────────────────────────────
function InternationalSection({ ua }: { ua: string }) {
  const c = T.international;

  const buildMsg = (countryName: string) =>
    `Hi! I live in ${countryName} and I want Mzansi Stream.`;

  const notListed = "Hi! My country isn\u0027t listed. Is Mzansi Stream available there?";

  return (
    <section id="international" className="section">
      <div className="sectionHead">
        <span className="intlEyebrow">{c.eyebrow}</span>
        <h2>{c.title}</h2>
        <p>{c.sub}</p>
      </div>

      <p className="intlTagline">{c.tagline}</p>

      <div className="intlGrid" role="list">
        {EXPAT_COUNTRIES.map((country) => (
          <a
            key={country.code}
            role="listitem"
            className="intlCard"
            href={generateWhatsAppLink(buildMsg(country.name), ua, `Intl-${country.code}`)}
            target="_blank"
            rel="noreferrer"
            aria-label={`${country.name} — ${country.desc}`}
          >
            <span className="intlFlag" aria-hidden="true">{country.flag}</span>
            <div className="intlBody">
              <h3 className="intlName">{country.name}</h3>
              <p className="intlDesc">{country.desc}</p>
            </div>
            <span className="intlArrow" aria-hidden="true">›</span>
          </a>
        ))}
      </div>

      <div className="intlBenefits">
        <h3 className="intlBenefitsTitle">{c.benefitsTitle}</h3>
        <div className="intlBenefitsGrid">
          {c.benefits.map((b) => (
            <div key={b.title} className="intlBenefit">
              <span className="intlBenefitIcon" aria-hidden="true">{b.icon}</span>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="stepsCtaWrap" style={{ marginTop: 28, flexDirection: "column", gap: 10 }}>
        <a
          className="btnPrimary"
          href={generateWhatsAppLink(buildMsg("[tu país]"), ua, "Intl-Generic")}
          target="_blank"
          rel="noreferrer"
        >
          {c.cta}
        </a>
        <a
          className="btnSecondary"
          href={generateWhatsAppLink(notListed, ua, "Intl-NotListed")}
          target="_blank"
          rel="noreferrer"
        >
          {c.ctaSecondary}
        </a>
      </div>
    </section>
  );
}

// ─── DEVICES ────────────────────────────────────────────────────────────
function DeviceSection({ ua }: { ua: string }) {
  return (
    <section id="devices" className="section">
      <div className="sectionHead">
        <h2>{T.devices.title}</h2>
        <p>{T.devices.sub}</p>
      </div>
      <div className="deviceGrid">
        {T.devices.list.map(d => (
          <div key={d.name} className="deviceCard">
            <span className="deviceIcon">{d.icon}</span>
            <span className="deviceName">{d.name}</span>
          </div>
        ))}
      </div>
      <div className="stepsCtaWrap" style={{ marginTop: 28 }}>
        <a
          className="btnSecondary"
          href={generateWhatsAppLink(T.whatsapp.generic, ua, "Device-Section")}
          target="_blank"
          rel="noreferrer"
        >
          {T.setup.button}
        </a>
      </div>
    </section>
  );
}

// ─── FREE TRIAL BANNER ────────────────────────────────────────────────────
function TrialBanner({ ua }: { ua: string }) {
  return (
    <div className="trialBanner">
      <span className="trialBadge">{T.trial.badge}</span>
      <div className="trialContent">
        <h3>{T.trial.title}</h3>
        <p>{T.trial.sub}</p>
        <p className="trialNote">{T.trial.note}</p>
      </div>
      <a
        className="trialCta"
        href={generateWhatsAppLink(T.whatsapp.trial, ua, "Trial-Banner")}
        target="_blank"
        rel="noreferrer"
      >
        {T.trial.cta}
      </a>
    </div>
  );
}

// ─── VOD ─────────────────────────────────────────────────────────────────────
function VODSection() {
  return (
    <section className="section vodSection">
      <div className="sectionHead">
        <h2>{T.vod.title}</h2>
        <p>{T.vod.sub}</p>
      </div>
      <div className="statsGrid">
        {T.vod.stats.map(s => (
          <div key={s.label} className="statCard">
            <div className="statValue">{s.value}</div>
            <div className="statLabel">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── COMPARE ─────────────────────────────────────────────────────────────
function CompareSection() {
  return (
    <section className="section">
      <div className="sectionHead">
        <h2>{T.compare.title}</h2>
        <p>{T.compare.sub}</p>
      </div>
      <div className="compareWrap">
        <table className="compareTable">
          <thead>
            <tr>{T.compare.headers.map(h => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {T.compare.rows.map(row => (
              <tr key={row.service} className={row.highlight ? "highlightRow" : ""}>
                <td className="serviceName">
                  {row.highlight && <span className="bestTag">✓ </span>}
                  {row.service}
                </td>
                <td className={row.highlight ? "accentPrice" : ""}>{row.price}</td>
                <td>{row.live}</td>
                <td style={{ color: row.vod ? "#22c55e" : "#ef4444" }}>{row.vod ? "✓" : "✗"}</td>
                <td style={{ color: row.hd4k ? "#22c55e" : "#ef4444" }}>{row.hd4k ? "✓" : "✗"}</td>
                <td>{row.support}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── REVIEWS ───────────────────────────────────────────────────────────────
function ReviewsSection() {
  return (
    <section className="section">
      <div className="sectionHead">
        <h2>{T.reviews.title}</h2>
        <p>{T.reviews.sub}</p>
      </div>
      <div className="reviewsGrid">
        {T.reviews.items.map((r, i) => (
          <article key={i} className="reviewCard">
            <div className="reviewStars">{"⭐".repeat(r.stars)}</div>
            <p className="reviewText">&ldquo;{r.text}&rdquo;</p>
            <div className="reviewMeta">
              <span className="reviewName">{r.name}</span>
              <span className="reviewCity">— {r.city}</span>
              <span className="reviewPlan">{r.plan}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── TRUST ───────────────────────────────────────────────────────────────
function TrustSection() {
  return (
    <section className="section trustSection">
      <div className="sectionHead"><h2>{T.trust.title}</h2></div>
      <div className="trustGrid">
        {T.trust.items.map(item => (
          <div key={item.title} className="trustCard">
            <span className="trustIcon">{item.icon}</span>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── SOUTH AFRICA CITIES ──────────────────────────────────────────────────────
function SpainCities({ ua }: { ua: string }) {
  return (
    <section id="cities" className="section">
      <div className="sectionHead">
        <h2>{T.cities.title}</h2>
        <p>{T.cities.sub}</p>
      </div>
      <div className="grid">
        {T.cities.items.map(city => (
          <article key={city.name} className="card">
            <div className="cardHeader"><h3>{city.name}</h3></div>
            <p className="cityText">{city.text}</p>
            <a
              className="btnPlan"
              href={generateWhatsAppLink(`Hi! I want Mzansi Stream in ${city.name}.`, ua, `${city.name}-City`)}
              target="_blank"
              rel="noreferrer"
            >
              {T.cities.button} — {city.name}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── INSTALL ─────────────────────────────────────────────────────────────
function QuickSetup({ ua }: { ua: string }) {
  return (
    <section id="setup" className="section">
      <div className="sectionHead">
        <h2>{T.setup.title}</h2>
        <p>{T.setup.sub}</p>
      </div>
      <div className="stepsGrid">
        {T.setup.steps.map(item => (
          <div key={item.step} className="stepCard">
            <div className="stepNumber">{item.step}</div>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <div className="stepsCtaWrap">
        <a
          className="btnPrimary"
          href={generateWhatsAppLink(T.whatsapp.generic, ua, "Setup-CTA")}
          target="_blank"
          rel="noreferrer"
        >
          {T.setup.button}
        </a>
      </div>
    </section>
  );
}

// ─── MZANSI STREAM LOGO ──────────────────────────────────────────────────────────
function MzansiLogo({ size = 36, showText = true }: { size?: number; showText?: boolean }) {
  const h = size;
  const w = showText ? size * 5.2 : size;
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${showText ? 208 : 40} 40`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${SITE.brand} logo`}
    >
      <defs>
        <linearGradient id="lgGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8C97A" />
          <stop offset="50%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#9A7830" />
        </linearGradient>
        <linearGradient id="lgShield" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C30B1E" />
          <stop offset="100%" stopColor="#7C0A18" />
        </linearGradient>
        <filter id="lgGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d="M 3 3 L 37 3 L 37 26 Q 37 36 20 39 Q 3 36 3 26 Z" fill="url(#lgShield)" stroke="#7c0a18" strokeWidth="0.8" />
      <path d="M 3 3 L 37 3 L 37 26 Q 37 36 20 39 Q 3 36 3 26 Z" fill="none" stroke="url(#lgGold)" strokeWidth="1.2" filter="url(#lgGlow)" />
      <g filter="url(#lgGlow)">
        {/* Corona estilizada española + rayos de sol */}
        <path d="M 8 26 L 8 19 L 12 19 L 12 14 L 16 19 L 20 9 L 24 19 L 28 14 L 28 19 L 32 19 L 32 26 Z" fill="url(#lgGold)" />
        <circle cx="20" cy="8" r="2.4" fill="#E8C97A" />
        <circle cx="12" cy="13" r="1.5" fill="#C9A84C" />
        <circle cx="28" cy="13" r="1.5" fill="#C9A84C" />
        <ellipse cx="20" cy="29" rx="6" ry="1.2" fill="rgba(255,220,120,0.18)" />
      </g>
      {showText && (
        <>
          <text x="50" y="19" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" fontWeight="800" fontSize="13" letterSpacing="2.5" fill="#f5f0f5">
            ESPAÑA
          </text>
          <line x1="50" y1="23" x2="205" y2="23" stroke="url(#lgGold)" strokeWidth="0.7" opacity="0.6" />
          <text x="50" y="35" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" fontWeight="900" fontSize="11" letterSpacing="6" fill="url(#lgGold)">
            TV
          </text>
        </>
      )}
    </svg>
  );
}

// ─── CINEMATIC INTRO ────────────────────────────────────────────────────────
function CinematicIntro({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  const skip = () => {
    setExiting(true);
    window.setTimeout(onDone, 420);
  };

  useEffect(() => {
    const t = window.setTimeout(skip, 3000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: (i * 97 + 13) % 100,
    size: 1 + (i * 31) % 3,
    delay: ((i * 137) % 400) / 100,
    dur: 4 + ((i * 73) % 300) / 100,
  }));

  return (
    <div className={`cinWrap${exiting ? " cinExit" : ""}`}>
      <div className="cinBg" />
      <div className="cinVignette" />
      <div className="cinParticles" aria-hidden="true">
        {particles.map(p => (
          <span
            key={p.id}
            className="cinParticle"
            style={{
              left: `${p.left}%`, bottom: "-4px",
              width: `${p.size}px`, height: `${p.size}px`,
              animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>
      <div className="cinLensFlare" aria-hidden="true" />

      <div className="cinContent">
        <div className="cinEmblemWrap">
          <div className="cinEmblemGlow" />
          <svg className="cinSvg" viewBox="0 0 200 200" width="200" height="200" aria-label="Mzansi Stream emblem">
            <defs>
              <filter id="cglow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {/* Escudo rojo con borde dorado */}
            <path className="cinShieldFill" d="M 16 16 L 184 16 L 184 118 Q 184 160 100 186 Q 16 160 16 118 Z" fill="#AA0000" />
            <path className="cinShieldFill" d="M 22 22 L 178 22 L 178 117 Q 178 155 100 180 Q 22 155 22 117 Z" fill="none" stroke="rgba(50,0,0,0.5)" strokeWidth="6" />
            <path className="cinShieldBorder" d="M 16 16 L 184 16 L 184 118 Q 184 160 100 186 Q 16 160 16 118 Z" fill="none" stroke="#FFD700" strokeWidth="3.5" filter="url(#cglow)" strokeLinecap="round" strokeLinejoin="round" />
            <path className="cinShieldBorderGlow" d="M 16 16 L 184 16 L 184 118 Q 184 160 100 186 Q 16 160 16 118 Z" fill="none" stroke="rgba(255,215,0,0.2)" strokeWidth="12" />

            {/* Sol radiante (rayos) */}
            <g className="cinCrown cinCrown1" transform="translate(100,100)">
              {Array.from({ length: 12 }).map((_, i) => (
                <rect
                  key={i}
                  x="-2"
                  y="-58"
                  width="4"
                  height="22"
                  fill="#FFD700"
                  filter="url(#cglow)"
                  transform={`rotate(${i * 30})`}
                />
              ))}
              <circle cx="0" cy="0" r="22" fill="#FFD700" filter="url(#cglow)" />
              <circle cx="0" cy="0" r="14" fill="#AA0000" />
            </g>

            {/* Corona central */}
            <g className="cinCrown cinCrown2" transform="translate(100,100)">
              <path
                d="M -28 14 L -28 -2 L -22 -2 L -22 -12 L -11 -2 L 0 -22 L 11 -2 L 22 -12 L 22 -2 L 28 -2 L 28 14 Z"
                fill="#FFD700"
                filter="url(#cglow)"
              />
              <circle cx="0" cy="-22" r="4" fill="#FFD700" />
              <circle cx="-22" cy="-12" r="3" fill="#FFD700" />
              <circle cx="22" cy="-12" r="3" fill="#FFD700" />
            </g>
          </svg>
        </div>

        <div className="cinTitleWrap">
          <h1 className="cinTitle">MZANSI</h1>
          <div className="cinTitleLine" />
        </div>
        <p className="cinTagline">The future of streaming in South Africa</p>
        <p className="cinSub">20,000+ channels&nbsp;·&nbsp;4K/UHD&nbsp;·&nbsp;EPG&nbsp;·&nbsp;WhatsApp support</p>
      </div>

      <button className="cinSkip" onClick={skip} type="button">Skip ›</button>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────
export default function Page() {
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showPWABar, setShowPWABar] = useState(false);
  const [showIOSBar, setShowIOSBar] = useState(false);
  const [secondaryReady, setSecondaryReady] = useState(false);

  // Carga diferida de componentes secundarios para mejorar LCP/TBT
  useEffect(() => {
    type IdleHandle = number;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => IdleHandle;
      cancelIdleCallback?: (h: IdleHandle) => void;
    };
    let handle: IdleHandle | undefined;
    if (typeof w.requestIdleCallback === "function") {
      handle = w.requestIdleCallback(() => setSecondaryReady(true));
    } else {
      handle = window.setTimeout(() => setSecondaryReady(true), 1200) as unknown as IdleHandle;
    }
    return () => {
      if (typeof w.cancelIdleCallback === "function" && handle !== undefined) w.cancelIdleCallback(handle);
      else if (handle !== undefined) window.clearTimeout(handle as unknown as number);
    };
  }, []);

  useEffect(() => {
    const cover = document.getElementById("__next_cover");
    if (cover) {
      cover.style.transition = "opacity 0.25s ease";
      cover.style.opacity = "0";
      setTimeout(() => cover.parentNode?.removeChild(cover), 260);
    }

    // Intro cinemática solo en escritorio y solo la primera vez por sesión
    const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 768;
    let alreadySeen = false;
    try { alreadySeen = sessionStorage.getItem("mz_intro_v1") === "1"; } catch {}
    if (!isSmallScreen && !alreadySeen) {
      setShowIntro(true);
      try { sessionStorage.setItem("mz_intro_v1", "1"); } catch {}
    }

    if (typeof document !== "undefined") document.documentElement.lang = "es";
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});

    const handleInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleInstall);
  }, []);

  useEffect(() => {
    if (!installPrompt) return;
    const key = "pwa_dismissed_v1";
    try { if (localStorage.getItem(key)) return; } catch {}
    const timer = window.setTimeout(() => setShowPWABar(true), 2600);
    return () => window.clearTimeout(timer);
  }, [installPrompt]);

  useEffect(() => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isInStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (!isIOS || isInStandalone) return;
    const key = "ios_pwa_dismissed_v1";
    try { if (localStorage.getItem(key)) return; } catch {}
    const timer = window.setTimeout(() => setShowIOSBar(true), 3500);
    return () => window.clearTimeout(timer);
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    setShowPWABar(false);
    try { localStorage.removeItem("pwa_dismissed_v1"); } catch {}
    (installPrompt as unknown as { prompt: () => void }).prompt();
    (installPrompt as unknown as { userChoice: Promise<{ outcome: string }> }).userChoice.then((c) => { if (c.outcome === "accepted") setInstallPrompt(null); });
  };

  const handlePWADismiss = () => {
    setShowPWABar(false);
    try { localStorage.setItem("pwa_dismissed_v1", "1"); } catch {}
  };

  const handleIOSDismiss = () => {
    setShowIOSBar(false);
    try { localStorage.setItem("ios_pwa_dismissed_v1", "1"); } catch {}
  };

  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";

  // ─── SCHEMA.ORG / JSON-LD ──────────────────────────────────────────────────
  const seller = {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.domain,
  };

  const shippingDetails = {
    "@type": "OfferShippingDetails",
    shippingRate: { "@type": "MonetaryAmount", value: "0", currency: SITE.currencyCode },
    shippingDestination: { "@type": "DefinedRegion", addressCountry: "ZA" },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "MIN" },
      transitTime:  { "@type": "QuantitativeValue", minValue: 0, maxValue: 10, unitCode: "MIN" },
    },
  };

  const returnPolicy = {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "ES",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 1,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE.domain}/#product`,
    name: "Mzansi Stream — Premium IPTV South Africa",
    brand: { "@type": "Brand", name: SITE.brand },
    description:
      "Mzansi Stream — 20,000+ live channels, 100,000+ movies and series, EPG, 4K/UHD. SuperSport, DStv Premiership, Premier League, kykNET, SABC and more. WhatsApp activation in 10 minutes. Compatible with Firestick, Smart TV, iPhone, Android and PC.",
    image: `${SITE.domain}/og-image.jpg`,
    url: SITE.domain,
    sku: "MZANSI-STREAM-ZA",
    mpn: "MZANSI-2026",
    category: "Streaming / IPTV",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1200",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Sipho M." },
        reviewBody: "Set up in 10 minutes. SABC, e.tv, SuperSport PSL — all working. Saving over R600/month versus DStv Premium.",
        datePublished: "2025-11-01",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Riaan vdM." },
        reviewBody: "Tested the 24h free trial and signed up for the year. PSL, Premier League, F1 and cricket in one place.",
        datePublished: "2025-12-15",
      },
    ],
    offers: PLANS.map(p => ({
      "@type": "Offer",
      "@id": `${SITE.domain}/#offer-${p.key}`,
      name: T.planNames[p.key],
      description: `Mzansi Stream ${T.planNames[p.key]} — 20,000+ channels, 4K/UHD, EPG included.`,
      price: String(p.price),
      priceCurrency: SITE.currencyCode,
      priceValidUntil: p.priceValidUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: SITE.domain,
      seller,
      shippingDetails,
      hasMerchantReturnPolicy: returnPolicy,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: T.faq.items.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineBusiness",
    "@id": `${SITE.domain}/#business`,
    name: SITE.brand,
    url: SITE.domain,
    logo: `${SITE.domain}/og-image.jpg`,
    image: `${SITE.domain}/og-image.jpg`,
    description: "Mzansi Stream — 20,000+ channels, 4K/UHD, sport, movies and series. Premium streaming for South Africa and the SA diaspora worldwide.",
    foundingDate: "2024",
    areaServed: [
      { "@type": "Country", name: "South Africa" },
      { "@type": "City", name: "Johannesburg" },
      { "@type": "City", name: "Cape Town" },
      { "@type": "City", name: "Durban" },
      { "@type": "City", name: "Pretoria" },
      { "@type": "City", name: "Gqeberha" },
      { "@type": "City", name: "Bloemfontein" },
      { "@type": "City", name: "East London" },
      { "@type": "City", name: "Polokwane" },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "ZA",
      addressRegion: "South Africa",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: `+${SITE.whatsappPhone}`,
      availableLanguage: ["English", "Afrikaans", "Zulu", "Xhosa"],
      contactOption: "https://schema.org/TollFree",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "08:00",
        closes: "23:00",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1200",
      bestRating: "5",
    },
    sameAs: [`https://wa.me/${SITE.whatsappPhone}`],
    priceRange: "5-60 EUR",
    currenciesAccepted: SITE.currencyCode,
    paymentAccepted: "Bizum, Tarjeta, Transferencia, PayPal",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.domain}/#organization`,
    name: SITE.brand,
    legalName: SITE.brand,
    url: SITE.domain,
    logo: { "@type": "ImageObject", url: `${SITE.domain}/og-image.jpg`, width: 1200, height: 630 },
    image: `${SITE.domain}/og-image.jpg`,
    description:
      "Mzansi Stream — premium streaming service with 20,000+ live channels, 100,000+ movies and series. Trusted by South Africans worldwide.",
    foundingDate: "2024",
    areaServed: [
      "South Africa", "Zimbabwe", "Botswana", "Namibia", "Mozambique",
      "United Kingdom", "Australia", "New Zealand", "United States",
      "Canada", "United Arab Emirates", "Germany", "Ireland", "Worldwide",
    ],
    knowsLanguage: ["en", "af", "zu", "xh"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: `+${SITE.whatsappPhone}`,
        availableLanguage: ["English", "Afrikaans", "Zulu", "Xhosa"],
        contactOption: "TollFree",
        areaServed: "Worldwide",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${SITE.whatsappPhone}`,
        availableLanguage: ["Spanish", "English"],
        areaServed: "Worldwide",
      },
    ],
    sameAs: [`https://wa.me/${SITE.whatsappPhone}`],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.domain}/#website`,
    url: SITE.domain,
    name: SITE.brand,
    description: "Premium IPTV for South Africa and the SA diaspora worldwide — 20,000+ channels in 4K.",
    inLanguage: ["en-ZA", "en-GB"],
    publisher: { "@id": `${SITE.domain}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE.domain}/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",          item: SITE.domain },
      { "@type": "ListItem", position: 2, name: "Pricing",       item: `${SITE.domain}/#offers` },
      { "@type": "ListItem", position: 3, name: "Channels",      item: `${SITE.domain}/#channels` },
      { "@type": "ListItem", position: 4, name: "International", item: `${SITE.domain}/#international` },
      { "@type": "ListItem", position: 5, name: "Setup",         item: `${SITE.domain}/#setup` },
      { "@type": "ListItem", position: 6, name: "FAQ",           item: `${SITE.domain}/#faq` },
    ],
  };


  // ─── SCHEMAS AVANZADOS 2026 — GEO + AI Overviews + Voice Search ────────────
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE.domain}/#webpage`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".hero h1", ".hero .lead", ".heroTrust", ".faqAnswer"],
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.domain}/#service`,
    serviceType: "Streaming IPTV Premium",
    name: `${SITE.brand} — IPTV Premium`,
    provider: { "@id": `${SITE.domain}/#organization` },
    inLanguage: ["en-ZA", "en-GB", "en-AU"],
    areaServed: [
      { "@type": "Country", name: "South Africa" },
      { "@type": "Country", name: "México" },
      { "@type": "Country", name: "Argentina" },
      { "@type": "Country", name: "Colombia" },
      { "@type": "Country", name: "Chile" },
      { "@type": "Country", name: "Perú" },
      { "@type": "Country", name: "Brasil" },
      { "@type": "Country", name: "Estados Unidos" },
      { "@type": "Country", name: "Reino Unido" },
      { "@type": "Country", name: "Alemania" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Planes ${SITE.brand}`,
      itemListElement: PLANS.map((p) => ({
        "@type": "Offer",
        name: T.planNames[p.key],
        price: String(p.price),
        priceCurrency: SITE.currencyCode,
      })),
    },
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${SITE.brand} — App IPTV`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Android, iOS, Android TV, Fire OS, tvOS, Tizen, webOS, Windows, macOS",
    offers: { "@type": "Offer", price: "0", priceCurrency: SITE.currencyCode },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "1200", bestRating: "5" },
    inLanguage: ["en-ZA", "en-GB", "en-AU"],
    publisher: { "@id": `${SITE.domain}/#organization` },
  };

  const navLinks = [
    { href: "#offers",        label: T.nav.offers },
    { href: "#channels",      label: T.nav.channels },
    { href: "#countries",     label: T.nav.countries },
    { href: "#international", label: T.nav.international },
    { href: "#devices",       label: T.nav.devices },
    { href: "#cities",        label: T.nav.cities },
    { href: "#faq",           label: T.nav.faq },
    { href: "#setup",         label: T.nav.setup },
  ];

  return (
    <>
      {showIntro && <CinematicIntro onDone={() => setShowIntro(false)} />}

      <div
        id="__next_cover"
        style={{
          position: "fixed", inset: 0, background: "#060407",
          zIndex: 99997, display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}
      />

      <div className="app">
        {/* JSON-LD — server-rendered para Google y crawlers LLM */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {/* Advanced 2026 — GEO + AI Overviews + Voice Search */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />

        <link rel="apple-touch-icon" href="/icon-192.png" />
        <div className="bg" />

        {/* TOP BAR */}
        <div className="topBar">
          <div className="topBarInner">
            <span><span className="greenDot" /> {T.top.status}</span>
            <span className="urgency">{T.top.urgency}</span>
          </div>
        </div>

        {/* HEADER */}
        <header className="header">
          <nav className="nav">
            <a href="#" className="brand"><MzansiLogo size={34} showText={true} /></a>
            <div className="links">
              {navLinks.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
              {installPrompt && (
                <button onClick={handleInstallClick} className="installBtn" type="button">📲 {T.nav.install}</button>
              )}
            </div>
            <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menú" type="button">
              {menuOpen ? "✕" : "☰"}
            </button>
          </nav>
        </header>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="mobileMenu" onClick={() => setMenuOpen(false)}>
            <div className="mobileMenuLogo"><MzansiLogo size={40} showText={true} /></div>
            {navLinks.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
            <a
              className="btnPrimary"
              href={generateWhatsAppLink(T.whatsapp.generic, ua, "Mobile-Menu")}
              target="_blank"
              rel="noreferrer"
              style={{ textAlign: "center", marginTop: 8 }}
            >
              💬 WhatsApp
            </a>
          </div>
        )}

        <main className="main">
          {/* HERO */}
          <section className="hero">
            <div className="heroContent">
              <div className="heroLogo"><MzansiLogo size={52} showText={false} /></div>
              <p className="pill">{T.hero.pill}</p>
              <h1>
                {T.hero.titleA}<br />
                <span className="accent">{T.hero.titleB}</span>
              </h1>
              <p className="lead">{T.hero.lead}</p>
              <div className="actions">
                <a className="btnPrimary" href="#offers">{T.hero.ctaPrices}</a>
              </div>
              <a
                className="btnGhost"
                href={generateWhatsAppLink(T.whatsapp.generic, ua, "Hero-Generic")}
                target="_blank"
                rel="noreferrer"
              >
                {T.hero.ctaAdvisor} →
              </a>
              <div className="heroTrust">{T.hero.trust}</div>

              {/* Trust strip */}
              <div className="trustStrip" aria-label="Mzansi Stream trust signals">
                <span className="trustStripItem">
                  <span className="gold">★ 4,9/5</span>&nbsp;·&nbsp;<strong>1 200+</strong> {T.trustStrip.customers}
                </span>
                <span className="trustStripDot" aria-hidden="true" />
                <span className="trustStripItem">⚡ <strong>{T.trustStrip.activated}</strong></span>
                <span className="trustStripDot" aria-hidden="true" />
                <span className="trustStripItem">🌍 <strong>50+ {T.trustStrip.countries}</strong></span>
                <span className="trustStripDot" aria-hidden="true" />
                <span className="trustStripItem">🛡️ <strong>{T.trustStrip.guarantee}</strong></span>
              </div>
            </div>
          </section>

          <TrialBanner ua={ua} />
          <TrustSection />

          {/* TARIFAS */}
          <section id="offers" className="section">
            <div className="sectionHead">
              <h2>{T.offers.title}</h2>
              <p>{T.offers.sub}</p>
            </div>
            <div className="grid">
              {PLANS.map(p => {
                const pricePerMonth = Math.round(p.price / p.months);
                const saving = Math.round((1 - pricePerMonth / 199) * 100);
                return (
                  <article key={p.key} className={`card ${p.highlight ? "highlight" : ""}`}>
                    {saving > 0 && (
                      <div className="saveBadge">{T.offers.save} {saving}%</div>
                    )}
                    <div className="cardHeader">
                      <h3>{T.planNames[p.key]}</h3>
                      {p.highlight && <span className="bestSellerBadge">{T.offers.bestSeller}</span>}
                    </div>
                    <div className="priceLockup">
                      <span className="bigNumber">{pricePerMonth}</span>
                      <span className="currency">{SITE.currencyLabel}</span>
                      <span className="perMonth">{T.offers.perMonth}</span>
                    </div>
                    <div className="billedInfo">
                      {T.offers.billedOnce} {p.price} {SITE.currencyLabel}
                      {p.months > 1 && ` (${T.offers.totalLabel})`}
                    </div>
                    <ul className="perks">
                      {T.planPerks[p.key].map(perk => (
                        <li key={perk}><span className="check">✓</span> {perk}</li>
                      ))}
                    </ul>
                    <a
                      className="btnPlan"
                      href={generateWhatsAppLink(T.whatsapp.orderMessage(T.planNames[p.key], p.price), ua, `Plan-${p.key}`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {T.offers.order}
                    </a>
                  </article>
                );
              })}
            </div>

            {/* Métodos de pago — confianza después del precio */}
            <div className="paymentBadges" aria-label="Métodos de pago aceptados">
              <div className="paymentLabel">{T.payments.label}</div>
              <div className="paymentList">
                <span className="payBadge">📱 Bizum</span>
                <span className="payBadge">🏦 Transferencia</span>
                <span className="payBadge"><img src="https://cdn.simpleicons.org/paypal/3B7BBF" alt="" width={16} height={16} loading="lazy" />PayPal</span>
                <span className="payBadge">💳 Visa</span>
                <span className="payBadge"><img src="https://cdn.simpleicons.org/mastercard/EB001B" alt="" width={20} height={16} loading="lazy" />Mastercard</span>
                <span className="payBadge"> Apple Pay</span>
                <span className="payBadge"><img src="https://cdn.simpleicons.org/googlepay/FFFFFF" alt="" width={20} height={16} loading="lazy" />Google Pay</span>
                <span className="payBadge"><img src="https://cdn.simpleicons.org/wise/9FE870" alt="" width={16} height={16} loading="lazy" />Wise</span>
                <span className="payBadge"><img src="https://cdn.simpleicons.org/revolut/FFFFFF" alt="" width={16} height={16} loading="lazy" />Revolut</span>
                <span className="payBadge">₿ Bitcoin</span>
              </div>
            </div>
          </section>

          <VODSection />
          <CompareSection />
          <ChannelExplorer />
          <CountriesSection ua={ua} />
          <InternationalSection ua={ua} />
          <DeviceSection ua={ua} />
          <ReviewsSection />
          <SpainCities ua={ua} />
          <QuickSetup ua={ua} />

          {/* FAQ */}
          <section id="faq" className="section">
            <div className="sectionHead"><h2>{T.faq.title}</h2></div>
            <div className="faq">
              {T.faq.items.map((f, i) => (
                <details key={i} className="faqItem">
                  <summary className="faqSummary">{f.q}</summary>
                  <p className="faqAnswer">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footerLogo"><MzansiLogo size={32} showText={true} /></div>
          <p>© {new Date().getFullYear()} {SITE.brand}. {T.footer.rights}</p>
          <p style={{ marginTop: 6 }}>{T.footer.note}</p>
          <div className="footerLinks">
            <a href="#faq">{T.footer.legal}</a>
            <a href="#faq">{T.footer.privacy}</a>
            <a href="#faq">{T.footer.terms}</a>
            <a href="#faq">{T.footer.refund}</a>
          </div>
        </footer>

        {/* PWA bar */}
        {showPWABar && (
          <div className="pwaBar">
            <span className="pwaIcon">📲</span>
            <div className="pwaText">
              <strong>{T.pwa.title}</strong>
              <span>{T.pwa.sub}</span>
            </div>
            <button className="pwaAccept" onClick={handleInstallClick}>{T.pwa.accept}</button>
            <button className="pwaDismiss" onClick={handlePWADismiss} aria-label="Close">✕</button>
          </div>
        )}

        {showIOSBar && (
          <div className="pwaBar pwaBarIOS">
            <span className="pwaIcon">📲</span>
            <div className="pwaText">
              <strong>{T.pwa.iosTitle}</strong>
              <span>
                {T.pwa.iosHint.split(" ")[0]}{" "}
                <span className="iosShareIcon">⬆</span>{" "}
                {T.pwa.iosHint.split(" ").slice(1).join(" ")}
              </span>
            </div>
            <button className="pwaDismiss" onClick={handleIOSDismiss} aria-label="Close">✕</button>
          </div>
        )}

        {/* Sticky CTA — móvil */}
        <a
          className="stickyMobileCta"
          href={generateWhatsAppLink(T.whatsapp.trial, ua, "Sticky-Mobile")}
          target="_blank"
          rel="noreferrer"
          aria-label="Probar 24 h gratis"
        >
          {T.stickyCta}
        </a>

        {secondaryReady && <LeratoChat userAgent={ua} />}
        {secondaryReady && <LiveActivityWidget userAgent={ua} />}

        <style jsx global>{`
          :root {
            /* Cinema true-black */
            --bg: #000000;
            --card: #0a0a0a;
            --card-hi: #141414;
            /* SA flag green */
            --accent: #7c0a18;
            --accent-hi: #c4001d;
            --accent-glow: rgba(196,0,29,0.42);
            --accent-faint: rgba(196,0,29,0.06);
            /* Tipografía */
            --fg: #f5f5f5;
            --muted: #8a8a8a;
            --muted-hi: #b8b8b8;
            --border: rgba(255,255,255,0.08);
            --border-hi: rgba(255,255,255,0.18);
            --border-accent: rgba(196,0,29,0.45);
            /* Oro real */
            --gold: #c8a96e;
            --gold-hi: #e8c97a;
            /* Radios */
            --r-cta: 4px;
            --r-secondary: 6px;
            --r-card: 12px;
            --r-modal: 16px;
          }
          html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; background: #000; }
          body {
            margin: 0;
            background: #000;
            color: var(--fg);
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            overscroll-behavior-y: contain;
            letter-spacing: -0.005em;
          }
          *, *::before, *::after { box-sizing: border-box; }
          #__next_cover::after {
            content: "";
            width: 26px; height: 26px;
            border: 2px solid rgba(196,0,29,0.2);
            border-top-color: #c4001d;
            border-radius: 50%;
            animation: __spin 0.65s linear infinite;
          }
          @keyframes __spin { to { transform: rotate(360deg); } }
          .bg {
            position: fixed; inset: 0; z-index: -1;
            background:
              radial-gradient(ellipse 70% 35% at 50% -5%, rgba(196,0,29,0.06) 0%, transparent 65%),
              radial-gradient(ellipse 90% 50% at 50% 100%, rgba(124,10,24,0.04) 0%, transparent 70%),
              #000;
          }
          .main { max-width: 1100px; margin: 0 auto; padding: 0 20px 80px; min-width: 0; }
          .section { margin-bottom: 80px; min-width: 0; }
          .sectionHead { text-align: center; margin-bottom: 40px; max-width: 760px; margin-left: auto; margin-right: auto; }
          .sectionHead h2 { font-size: clamp(1.6rem, 4vw, 2.1rem); line-height: 1.15; margin: 0 0 10px; letter-spacing: -0.5px; }
          .sectionHead p { color: var(--muted); line-height: 1.55; }

          /* TOP BAR */
          .topBar { background: #000; font-size: 12px; border-bottom: 1px solid var(--border); padding: 8px 0; padding-top: max(8px, env(safe-area-inset-top, 0px)); color: var(--muted-hi); }
          .topBarInner { max-width: 1100px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; gap: 14px; flex-wrap: wrap; min-width: 0; }
          .topBarInner > span { min-width: 0; }
          .greenDot { display: inline-block; width: 6px; height: 6px; background: #22c55e; border-radius: 50%; margin-right: 6px; box-shadow: 0 0 6px rgba(34,197,94,0.6); }
          .urgency { color: var(--gold-hi); font-weight: 600; letter-spacing: 0.005em; }

          /* HEADER */
          .header {
            position: sticky; top: 0; z-index: 100;
            backdrop-filter: blur(14px) saturate(160%);
            -webkit-backdrop-filter: blur(14px) saturate(160%);
            background: rgba(6,4,7,0.85);
            border-bottom: 1px solid rgba(196,0,29,0.18);
            padding-top: env(safe-area-inset-top, 0px);
            transform: translateZ(0);
          }
          .nav { max-width: 1100px; margin: 0 auto; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px; min-width: 0; }
          .brand { font-weight: 900; font-size: 1.2rem; color: #fff; text-decoration: none; display: flex; align-items: center; gap: 8px; letter-spacing: -0.5px; transition: opacity 0.2s; min-width: 0; flex-shrink: 1; }
          .brand svg { max-width: 100%; height: auto; display: block; }
          .brand:hover { opacity: 0.85; }

          .heroLogo { display: flex; justify-content: center; margin-bottom: 20px; filter: drop-shadow(0 0 18px rgba(196,0,29,0.5)); }
          .footerLogo { display: flex; justify-content: center; margin-bottom: 16px; opacity: 0.8; }
          .mobileMenuLogo { padding: 16px 0 8px; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 8px; }

          .links { display: flex; gap: 18px; font-weight: 500; font-size: 14px; align-items: center; flex-wrap: wrap; justify-content: flex-end; }
          .links a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
          .links a:hover { color: #fff; }
          .installBtn { background: rgba(255,255,255,0.1); border: 1px solid var(--accent); color: #fff; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 700; }

          .hamburger { display: none; background: none; border: 1px solid var(--border); color: #fff; min-width: 44px; min-height: 44px; padding: 10px 14px; border-radius: 6px; cursor: pointer; font-size: 16px; flex-shrink: 0; align-items: center; justify-content: center; }
          .mobileMenu {
            position: fixed; inset: 0;
            background: rgba(6,4,7,0.985);
            backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
            z-index: 110;
            display: flex; flex-direction: column;
            padding: calc(72px + env(safe-area-inset-top, 0px)) 24px calc(40px + env(safe-area-inset-bottom, 0px));
            gap: 4px; overflow-y: auto; overscroll-behavior: contain;
            animation: mobileMenuIn 0.22s cubic-bezier(0.16,1,0.3,1);
          }
          @keyframes mobileMenuIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
          .mobileMenu a { font-size: 17px; font-weight: 600; color: #fff; text-decoration: none; padding: 16px 0; border-bottom: 1px solid var(--border); display: block; transition: color 0.15s, transform 0.15s; }
          .mobileMenu a:active { color: var(--gold); transform: translateX(4px); }

          /* HERO */
          .hero { padding: 80px 0 60px; text-align: center; min-width: 0; }
          .heroContent { max-width: 780px; margin: 0 auto; min-width: 0; }
          .pill { display: inline-block; padding: 6px 14px; border: 1px solid var(--border-hi); color: var(--gold-hi); background: rgba(255,255,255,0.03); border-radius: 99px; font-size: 11.5px; font-weight: 600; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.12em; max-width: 100%; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }
          h1 { font-size: clamp(2.2rem, 6.2vw, 4.4rem); line-height: 1.02; font-weight: 900; margin: 0 0 22px; letter-spacing: -0.035em; }
          .accent { background: linear-gradient(135deg, #f5f0f5 0%, var(--gold) 60%, #e0d0d0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .lead { color: var(--muted); font-size: 1.1rem; max-width: 620px; margin: 0 auto 32px; line-height: 1.6; }

          .actions { display: flex; gap: 12px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap; }
          .btnPrimary {
            background: var(--accent-hi); color: #fff;
            padding: 15px 32px; border-radius: var(--r-cta);
            text-decoration: none; font-weight: 700; font-size: 15px;
            letter-spacing: 0.005em;
            transition: background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
            border: none; cursor: pointer; display: inline-block;
            box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 24px -10px var(--accent-glow);
          }
          .btnPrimary:hover { background: #e60914; transform: translateY(-1px); box-shadow: 0 1px 0 rgba(255,255,255,0.08) inset, 0 14px 30px -8px var(--accent-glow); }
          .btnPrimary:active { transform: translateY(0); }

          .btnSecondary {
            background: rgba(255,255,255,0.06);
            border: 1px solid var(--border-hi);
            color: #fff; padding: 14px 30px; border-radius: var(--r-secondary);
            text-decoration: none; font-weight: 600; font-size: 14.5px;
            transition: background 0.18s ease, border-color 0.18s ease;
            display: inline-block;
            backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          }
          .btnSecondary:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.28); }

          .btnGhost {
            display: inline-flex; align-items: center; justify-content: center;
            color: var(--muted-hi); text-decoration: none;
            font-size: 14px; font-weight: 500;
            padding: 12px 16px; min-height: 44px; margin-top: 10px;
            transition: color 0.18s ease, transform 0.18s ease;
            letter-spacing: 0.005em;
          }
          .btnGhost:hover { color: #fff; transform: translateX(2px); }
          .btnGhost:active { color: #fff; }

          .heroTrust { color: var(--muted); font-size: 13px; font-weight: 500; line-height: 1.6; }

          /* TRIAL BANNER */
          .trialBanner {
            background:
              linear-gradient(180deg, rgba(196,0,29,0.07) 0%, rgba(0,0,0,0) 100%),
              var(--card);
            border: 1px solid var(--border-accent);
            border-radius: var(--r-card);
            padding: 28px 32px; margin-bottom: 72px;
            display: flex; gap: 24px; align-items: center; flex-wrap: wrap;
            position: relative; overflow: hidden;
          }
          .trialBanner::before {
            content: ""; position: absolute; inset: 0;
            background: radial-gradient(ellipse 60% 50% at 0% 50%, rgba(200,169,110,0.06), transparent 60%);
            pointer-events: none;
          }
          .trialBadge { display: inline-flex; align-items: center; padding: 5px 12px; background: var(--accent-hi); color: #fff; font-size: 10.5px; font-weight: 800; border-radius: var(--r-cta); text-transform: uppercase; letter-spacing: 0.08em; flex-shrink: 0; height: fit-content; margin-top: 2px; }
          .trialContent { flex: 1; min-width: 220px; position: relative; }
          .trialContent h3 { margin: 0 0 8px; font-size: 1.35rem; font-weight: 800; letter-spacing: -0.4px; color: #fff; }
          .trialContent p { margin: 0 0 6px; color: var(--muted-hi); font-size: 14px; line-height: 1.55; }
          .trialNote { font-size: 12px !important; opacity: 0.6; }
          .trialCta {
            display: inline-flex; align-items: center; justify-content: center;
            background: var(--accent-hi); color: #fff; font-weight: 800;
            padding: 14px 26px; border-radius: var(--r-cta);
            text-decoration: none; font-size: 14.5px; white-space: nowrap;
            transition: background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
            align-self: center; flex-shrink: 0;
            box-shadow: 0 8px 22px -8px var(--accent-glow);
            letter-spacing: 0.01em; position: relative;
          }
          .trialCta:hover { background: #e60914; transform: translateY(-1px); box-shadow: 0 14px 30px -8px var(--accent-glow); }
          .trialCta:active { transform: translateY(0); }

          /* TRUST STRIP */
          .trustStrip {
            display: flex; align-items: center; justify-content: center;
            gap: 28px; padding: 18px 16px; margin-top: 28px;
            border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
            flex-wrap: wrap; color: var(--muted-hi); font-size: 12.5px;
          }
          .trustStripItem { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
          .trustStripItem strong { color: #fff; font-weight: 700; }
          .trustStripItem .gold { color: var(--gold-hi); }
          .trustStripDot { width: 4px; height: 4px; background: var(--muted); border-radius: 50%; opacity: 0.45; }

          /* TRUST SECTION */
          .trustSection { margin-bottom: 80px; }
          .trustGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; }
          .trustCard { background: var(--card); border: 1px solid var(--border); border-radius: var(--r-card); padding: 22px 16px; text-align: center; transition: border-color 0.2s ease, transform 0.2s ease; }
          .trustCard:hover { border-color: var(--border-hi); transform: translateY(-2px); }
          .trustIcon { font-size: 28px; display: block; margin-bottom: 10px; }
          .trustCard h4 { margin: 0 0 6px; font-size: 13px; font-weight: 700; }
          .trustCard p { margin: 0; font-size: 12px; color: var(--muted); line-height: 1.5; }

          /* OFERTAS */
          .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
          .card { position: relative; background: var(--card); border: 1px solid var(--border); padding: 30px 24px; border-radius: var(--r-card); display: flex; flex-direction: column; transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; }
          .card:hover { transform: translateY(-4px); border-color: var(--border-hi); box-shadow: 0 12px 36px -8px rgba(0,0,0,0.6); }
          .card.highlight { border: 1px solid var(--border-accent); box-shadow: 0 0 0 1px rgba(196,0,29,0.18), 0 16px 50px -10px rgba(196,0,29,0.18); background: linear-gradient(180deg, rgba(196,0,29,0.05) 0%, rgba(0,0,0,0) 60%); }
          .saveBadge { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); background: var(--accent-hi); color: #fff; font-weight: 800; font-size: 10.5px; padding: 5px 12px; border-radius: var(--r-cta); box-shadow: 0 4px 14px -2px var(--accent-glow); z-index: 2; letter-spacing: 0.04em; text-transform: uppercase; }
          .cardHeader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 10px; }
          .cardHeader h3 { margin: 0; font-size: 1.1rem; }
          .bestSellerBadge { font-size: 10px; background: var(--gold-hi); color: #000; font-weight: 800; padding: 3px 8px; border-radius: var(--r-cta); text-transform: uppercase; letter-spacing: 0.04em; }
          .priceLockup { display: flex; align-items: baseline; justify-content: center; line-height: 1; margin-bottom: 8px; }
          .currency { font-size: 1.6rem; font-weight: 600; margin-left: 4px; color: var(--muted-hi); }
          .bigNumber { font-size: 3.8rem; font-weight: 800; letter-spacing: -2px; }
          .perMonth { font-size: 1rem; color: var(--muted); margin-left: 6px; }
          .billedInfo { text-align: center; color: var(--muted); font-size: 13px; margin-bottom: 24px; font-weight: 500; }
          .perks { list-style: none; padding: 0; margin: 0 0 24px 0; flex-grow: 1; }
          .perks li { padding: 8px 0; font-size: 14px; color: #e5e5e5; display: flex; gap: 10px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.03); }
          .perks li:last-child { border-bottom: none; }
          .check { color: var(--gold); font-weight: bold; }
          .btnPlan { display: block; width: 100%; text-align: center; background: #fff; color: #000; font-weight: 800; padding: 15px; border-radius: var(--r-cta); text-decoration: none; transition: background 0.18s ease, transform 0.18s ease; letter-spacing: 0.01em; font-size: 14.5px; }
          .btnPlan:hover { background: #e5e5e5; }
          .btnPlan:active { transform: scale(0.985); }
          .highlight .btnPlan { background: var(--accent-hi); color: #fff; box-shadow: 0 8px 22px -8px var(--accent-glow); }
          .highlight .btnPlan:hover { background: #e60914; }

          /* VOD */
          .statsGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 20px; }
          .statCard { background: var(--card); border: 1px solid var(--border); border-radius: var(--r-card); padding: 28px 20px; text-align: center; transition: border-color 0.2s ease; }
          .statCard:hover { border-color: var(--border-hi); }
          .statValue { font-size: 2rem; font-weight: 800; color: #fff; letter-spacing: -1px; }
          .statLabel { font-size: 13px; color: var(--muted); margin-top: 6px; }

          /* COMPARATIVA */
          .compareWrap { overflow-x: auto; border-radius: 14px; border: 1px solid var(--border); }
          .compareTable { width: 100%; border-collapse: collapse; font-size: 14px; min-width: 560px; }
          .compareTable thead tr { background: rgba(255,255,255,0.04); }
          .compareTable th { padding: 14px 16px; text-align: left; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--muted); border-bottom: 1px solid var(--border); }
          .compareTable td { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.04); color: #ccc; }
          .highlightRow { background: rgba(196,0,29,0.1); }
          .highlightRow td { color: #fff; font-weight: 600; border-bottom: 1px solid rgba(196,0,29,0.2); }
          .accentPrice { color: var(--gold) !important; font-weight: 800 !important; font-size: 15px; }
          .serviceName { font-weight: 600; color: #fff; }
          .bestTag { color: #4ade80; font-weight: 900; }
          .compareTable tr:last-child td { border-bottom: none; }

          /* CANALES */
          .explorerBox { background: var(--card); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
          .tabs { display: flex; background: rgba(0,0,0,0.3); border-bottom: 1px solid var(--border); overflow-x: auto; }
          .tabBtn { flex: 1; padding: 16px; background: none; border: none; color: var(--muted); cursor: pointer; font-weight: 600; font-size: 14px; min-width: 100px; white-space: nowrap; }
          .tabBtn.active { color: white; background: rgba(255,255,255,0.04); border-bottom: 2px solid var(--accent-hi); }
          .channelList { padding: 24px; display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
          .channelItem { font-size: 13px; color: #ccc; display: flex; align-items: center; gap: 8px; }
          .more { color: var(--muted); font-style: italic; }

          /* COMUNIDADES */
          .countriesGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
          .countryCard {
            background: var(--card); border: 1px solid var(--border); border-radius: 12px;
            padding: 14px 16px; display: flex; align-items: center; gap: 11px;
            cursor: pointer; transition: all 0.2s; text-align: left; width: 100%;
            -webkit-tap-highlight-color: rgba(201,168,76,0.2);
          }
          .countryCard:hover { transform: translateY(-2px) translateX(2px); border-color: rgba(201,168,76,0.5); background: #130d18; box-shadow: 0 6px 24px rgba(0,0,0,0.5); }
          .countryCard:active { transform: scale(0.97); }
          .ctryFlag { font-size: 22px; flex-shrink: 0; }
          .ctryInfo { flex: 1; min-width: 0; }
          .ctryName { font-weight: 700; font-size: 14px; color: #f0ecf5; }
          .ctrySub { font-size: 11px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .ctryArrow { color: rgba(201,168,76,0.5); font-size: 18px; flex-shrink: 0; transition: transform 0.2s; }
          .countryCard:hover .ctryArrow { transform: translateX(4px); color: #C9A84C; }

          .countryModalOverlay {
            position: fixed; inset: 0; z-index: 9999;
            background: rgba(0,0,0,0.82); backdrop-filter: blur(8px);
            display: flex; align-items: flex-end; justify-content: center;
            animation: fadeIn 0.2s ease;
          }
          @media (min-width: 640px) { .countryModalOverlay { align-items: center; padding: 20px; } }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .countryModalBox {
            background: #0d0a12; border: 1px solid rgba(255,255,255,0.12);
            border-radius: 20px 20px 0 0;
            width: 100%; min-width: 0; align-self: stretch;
            max-width: 680px; max-height: 90vh;
            display: flex; flex-direction: column; overflow: hidden;
            animation: slideUp 0.3s ease;
          }
          @media (min-width: 640px) { .countryModalBox { border-radius: 20px; max-height: 88vh; } }
          .countryModalHd { padding: 20px 20px 0; display: flex; align-items: flex-start; gap: 14px; flex-shrink: 0; }
          .countryModalFlag { font-size: 44px; line-height: 1; flex-shrink: 0; }
          .countryModalTb { flex: 1; min-width: 0; }
          .countryModalTb h2 { font-size: 22px; font-weight: 800; color: #fff; margin: 0 0 4px; overflow-wrap: break-word; word-break: normal; hyphens: none; }
          .countryModalTb p { font-size: 13px; color: var(--muted); line-height: 1.5; margin: 0; overflow-wrap: break-word; word-break: normal; }
          .countryModalBd, .countryModalSec, .countryChChip, .countryChName, .countryKwPill { min-width: 0; overflow-wrap: break-word; word-break: normal; }
          .countryModalClose {
            background: rgba(255,255,255,0.08); border: none; border-radius: 50%;
            width: 36px; height: 36px; color: var(--muted); font-size: 18px;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
            cursor: pointer; transition: 0.15s;
          }
          .countryModalClose:hover { background: rgba(255,255,255,0.15); color: #f0ecf5; }
          .countryModalBd { overflow-y: auto; padding: 16px 20px 24px; flex: 1; }
          .countryModalBd::-webkit-scrollbar { width: 4px; }
          .countryModalBd::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
          .countryModalSec { margin-bottom: 24px; }
          .countryModalSecTitle { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(201,168,76,0.7); margin-bottom: 12px; }
          .countryChGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 7px; }
          .countryChChip { background: #130d18; border: 1px solid rgba(255,255,255,0.07); border-radius: 8px; padding: 8px 12px; display: flex; align-items: center; justify-content: space-between; gap: 6px; }
          .countryChChipGold { background: rgba(201,168,76,0.06); border-color: rgba(201,168,76,0.2); }
          .countryChName { font-size: 13px; font-weight: 600; color: #f0ecf5; }
          .countryChIcon { font-size: 14px; }
          .countryKwWrap { display: flex; flex-wrap: wrap; gap: 7px; }
          .countryKwPill { background: rgba(0,106,167,0.1); border: 1px solid rgba(0,106,167,0.25); border-radius: 20px; padding: 5px 12px; display: flex; align-items: center; gap: 6px; }
          .countryKwText { font-size: 12px; color: rgba(240,236,245,0.75); }
          .countryKwVol { font-size: 11px; color: #4AB4E8; font-weight: 700; }
          .countryPriceBox { background: rgba(61,190,122,0.06); border: 1px solid rgba(61,190,122,0.2); border-radius: 12px; padding: 14px 16px; display: flex; align-items: center; gap: 12px; }
          .countryModalFt { padding: 14px 20px 20px; border-top: 1px solid rgba(255,255,255,0.07); flex-shrink: 0; display: flex; gap: 10px; flex-wrap: wrap; }

          /* INTERNACIONAL */
          .intlEyebrow { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold-hi); border: 1px solid rgba(200,169,110,0.28); background: rgba(200,169,110,0.04); padding: 5px 12px; border-radius: var(--r-cta); margin-bottom: 14px; }
          .intlTagline { text-align: center; color: var(--muted); font-size: 13px; margin: 0 0 28px; max-width: 620px; margin-left: auto; margin-right: auto; line-height: 1.55; }
          .intlGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; margin-bottom: 40px; }
          .intlCard {
            display: flex; align-items: center; gap: 14px;
            background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
            border: 1px solid var(--border); border-radius: 14px;
            padding: 14px 16px; text-decoration: none; color: inherit;
            transition: transform 0.2s, border-color 0.2s, background 0.2s;
            min-width: 0;
          }
          .intlCard:hover { transform: translateY(-2px); border-color: rgba(201,168,76,0.5); background: linear-gradient(180deg, rgba(201,168,76,0.06) 0%, rgba(196,0,29,0.05) 100%); }
          .intlCard:active { transform: scale(0.98); }
          .intlFlag { font-size: 30px; flex-shrink: 0; line-height: 1; }
          .intlBody { flex: 1; min-width: 0; }
          .intlName { font-size: 14px; font-weight: 800; color: #fff; margin: 0 0 2px; letter-spacing: -0.2px; }
          .intlDesc { font-size: 12px; color: var(--muted); margin: 0; line-height: 1.45; }
          .intlArrow { color: rgba(201,168,76,0.5); font-size: 22px; flex-shrink: 0; transition: transform 0.2s, color 0.2s; }
          .intlCard:hover .intlArrow { color: var(--gold); transform: translateX(3px); }
          .intlBenefits { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 28px 24px; margin-top: 8px; }
          .intlBenefitsTitle { text-align: center; font-size: 1.1rem; font-weight: 800; color: #fff; margin: 0 0 22px; letter-spacing: -0.3px; }
          .intlBenefitsGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 18px; }
          .intlBenefit { text-align: left; }
          .intlBenefitIcon { font-size: 24px; display: block; margin-bottom: 6px; }
          .intlBenefit h4 { font-size: 13px; font-weight: 700; color: #fff; margin: 0 0 4px; letter-spacing: -0.1px; }
          .intlBenefit p { font-size: 12px; color: var(--muted); margin: 0; line-height: 1.55; }

          /* DISPOSITIVOS */
          .deviceGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 16px; }
          .deviceCard { background: var(--card); border: 1px solid var(--border); border-radius: var(--r-card); padding: 20px 12px; display: flex; flex-direction: column; align-items: center; gap: 10px; transition: border-color 0.2s ease, transform 0.2s ease; text-align: center; }
          .deviceCard:hover { border-color: var(--border-hi); transform: translateY(-3px); }
          .deviceIcon { font-size: 32px; }
          .deviceName { font-size: 13px; font-weight: 600; color: #ccc; }

          /* OPINIONES */
          .reviewsGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
          .reviewCard { background: var(--card); border: 1px solid var(--border); border-radius: var(--r-card); padding: 24px; display: flex; flex-direction: column; gap: 12px; transition: border-color 0.2s ease; }
          .reviewCard:hover { border-color: var(--border-hi); }
          .reviewStars { font-size: 14px; letter-spacing: 1px; }
          .reviewText { margin: 0; font-size: 14px; color: #d4d4d8; line-height: 1.6; font-style: italic; flex: 1; }
          .reviewMeta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 12px; }
          .reviewName { font-weight: 700; color: #fff; }
          .reviewCity { color: var(--muted); }
          .reviewPlan { margin-left: auto; background: rgba(196,0,29,0.12); border: 1px solid rgba(196,0,29,0.25); color: var(--gold); padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }

          /* CIUDADES */
          .cityText { color: var(--muted); line-height: 1.6; margin-bottom: 20px; }

          /* INSTALACIÓN */
          .stepsGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
          .stepCard { background: var(--card); border: 1px solid var(--border); border-radius: var(--r-card); padding: 24px; transition: border-color 0.2s ease; }
          .stepCard:hover { border-color: var(--border-hi); }
          .stepNumber { width: 38px; height: 38px; border-radius: var(--r-cta); background: var(--accent-hi); display: flex; align-items: center; justify-content: center; font-weight: 800; margin-bottom: 14px; color: #fff; box-shadow: 0 6px 18px -6px var(--accent-glow); }
          .stepCard p { margin: 0; color: var(--muted); line-height: 1.6; }
          .stepsCtaWrap { display: flex; justify-content: center; margin-top: 24px; }

          /* FAQ */
          .faqItem { background: var(--card); border: 1px solid var(--border); border-radius: var(--r-card); margin-bottom: 10px; transition: border-color 0.2s ease, background 0.2s ease; }
          .faqItem[open] { background: var(--card-hi); border-color: var(--border-hi); }
          .faqSummary { padding: 18px 20px; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; font-size: 15px; color: #fff; gap: 12px; }
          .faqSummary::-webkit-details-marker { display: none; }
          .faqSummary::after { content: "+"; font-size: 18px; color: var(--muted); }
          .faqItem[open] .faqSummary::after { content: "−"; }
          .faqAnswer { padding: 0 18px 18px; margin: 0; color: var(--muted); line-height: 1.6; font-size: 14px; }

          /* FOOTER */
          .footer { padding: 56px 20px; text-align: center; color: var(--muted); font-size: 13px; border-top: 1px solid var(--border); margin-top: 72px; background: #000; }
          .footerLinks { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-top: 14px; }
          .footerLinks a { color: #555; text-decoration: none; font-size: 12px; transition: color 0.2s; padding: 12px 8px; min-height: 44px; display: inline-flex; align-items: center; }
          .footerLinks a:hover { color: var(--muted); }
          .footerLinks a:active { color: var(--fg); }

          /* CHAT FAB */
          .miliFab {
            position: fixed; bottom: 25px; left: 25px;
            background: rgba(20,20,20,0.92);
            backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
            border: 1px solid var(--border-hi); padding: 0; border-radius: 999px;
            cursor: pointer; z-index: 1000;
            box-shadow: 0 6px 20px -4px rgba(0,0,0,0.6); overflow: hidden;
            transition: background 0.2s ease, border-color 0.2s ease, transform 0.18s ease;
          }
          .miliFab:hover { background: rgba(30,30,30,0.95); border-color: rgba(255,255,255,0.3); }
          .miliFab:active { transform: scale(0.97); }
          .fabContent { display: flex; align-items: center; padding: 6px 14px 6px 6px; gap: 10px; position: relative; }
          .fabAvatar { border-radius: 50%; border: 2px solid #22c55e; object-fit: cover; object-position: top center; background: #0a0a0a; }
          .fabText { font-weight: 600; font-size: 13px; color: #fff; letter-spacing: 0.005em; }
          .fabPulse { position: absolute; top: 6px; left: 30px; width: 9px; height: 9px; background: #22c55e; border-radius: 50%; border: 2px solid #0a0a0a; }
          .miliTeaser {
            position: fixed; bottom: 95px; left: 25px; width: 300px;
            background: rgba(15,15,15,0.96);
            backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
            border: 1px solid var(--border-hi); border-radius: var(--r-card);
            padding: 12px 14px; z-index: 999; cursor: pointer;
            box-shadow: 0 10px 28px -6px rgba(0,0,0,0.55); text-align: left;
            transition: border-color 0.2s ease;
          }
          .miliTeaser:hover { border-color: rgba(255,255,255,0.28); }
          .miliTeaserHead { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
          .miliTeaserAvatar { border-radius: 50%; object-fit: cover; object-position: top center; background: #0a0a0a; }
          .miliTeaserTitle { font-weight: 700; font-size: 12px; color: #fff; letter-spacing: 0.01em; }
          .miliTeaserLines { display: flex; flex-direction: column; gap: 5px; }
          .miliTeaserLine { font-size: 12px; color: var(--muted-hi); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 1.4; }
          .miliBadge { background: var(--accent-hi); color: #fff; font-weight: 700; font-size: 10.5px; padding: 2px 7px; border-radius: 999px; margin-left: auto; letter-spacing: 0.02em; }
          .miliBadgeFab { position: absolute; top: -6px; right: -6px; margin-left: 0; }
          .miliBox { position: fixed; bottom: 85px; left: 25px; width: 320px; max-height: 75vh; background: #18181b; border: 1px solid var(--border); border-radius: 16px; z-index: 1000; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5); animation: slideUp 0.3s cubic-bezier(0.16,1,0.3,1); display: flex; flex-direction: column; }
          @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          .miliHeader { padding: 16px; background: #27272a; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .miliClose { background: none; border: 1px solid rgba(255,255,255,0.12); color: #fff; width: 34px; height: 34px; border-radius: 10px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
          .headerAvatarWrapper { position: relative; }
          .headerAvatar { border-radius: 50%; object-fit: cover; object-position: top center; background: #130810; }
          .onlineIndicator { position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; background: #22c55e; border-radius: 50%; border: 2px solid #27272a; }
          .miliBody { display: flex; flex-direction: column; min-height: 0; flex: 1; }
          .miliMsgs { flex: 1; min-height: 0; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
          .miliMsgBot { align-self: flex-start; background: #3f3f46; color: #fff; padding: 10px 14px; border-radius: 12px 12px 12px 2px; font-size: 14px; line-height: 1.4; max-width: 85%; }
          .miliMsgUser { align-self: flex-end; background: linear-gradient(135deg, var(--accent-hi), var(--accent)); color: white; padding: 10px 14px; border-radius: 12px 12px 2px 12px; font-size: 14px; max-width: 85%; }
          .quickReplies { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 12px 0; }
          .quickReply { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 6px 12px; border-radius: 16px; font-size: 12px; cursor: pointer; transition: 0.15s; white-space: nowrap; }
          .quickReply:hover { background: rgba(255,255,255,0.14); }
          .miliInputRow { display: flex; padding: 12px; border-top: 1px solid rgba(255,255,255,0.1); background: #27272a; gap: 8px; }
          .miliInputRow input { flex: 1; background: #18181b; border: 1px solid #3f3f46; border-radius: 20px; padding: 8px 12px; color: white; outline: none; font-size: 14px; }
          .miliInputRow button { background: none; border: none; color: var(--gold); font-weight: bold; font-size: 18px; cursor: pointer; padding: 0; }
          .typingIndicator { padding: 0 16px 8px; font-size: 20px; color: #666; display: flex; gap: 2px; line-height: 10px; }
          .typingIndicator span { animation: blink 1.4s infinite both; }
          .typingIndicator span:nth-child(2) { animation-delay: 0.2s; }
          .typingIndicator span:nth-child(3) { animation-delay: 0.4s; }
          @keyframes blink { 0% { opacity: 0.2; } 20% { opacity: 1; } 100% { opacity: 0.2; } }

          /* LIVE BADGE */
          .liveBadge { position: fixed; bottom: 25px; right: 25px; background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 99px; color: #fff; cursor: pointer; z-index: 1000; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
          .liveBadge:hover { background: rgba(255,255,255,0.15); }
          .liveDot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e; animation: pulseLive 2s infinite; flex-shrink: 0; }
          @keyframes pulseLive { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
          .liveBadgeText { font-weight: 700; font-size: 13px; }
          .livePanel { position: fixed; bottom: 80px; right: 25px; width: 260px; background: #18181b; border: 1px solid var(--border); border-radius: 16px; padding: 16px; z-index: 1000; animation: slideUp 0.3s; }
          .liveHead { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; margin-bottom: 10px; }
          .liveSub { font-size: 11px; color: var(--muted); margin-top: 3px; }
          .liveStats { margin-bottom: 12px; }
          .liveRow { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; color: #e4e4e7; }
          .liveCta { width: 100%; background: linear-gradient(135deg, var(--accent-hi), var(--accent)); color: white; border: none; padding: 10px; border-radius: 8px; font-weight: 700; cursor: pointer; }
          .liveToast { position: fixed; bottom: 85px; right: 25px; background: rgba(20,20,20,0.97); backdrop-filter: blur(12px); border: 1px solid var(--border-accent); border-left: 4px solid var(--accent-hi); padding: 14px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px; z-index: 1100; animation: slideLeft 0.4s cubic-bezier(0.175,0.885,0.32,1.275); width: 300px; }
          @keyframes slideLeft { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
          .liveToastTitle { font-weight: 800; font-size: 13px; color: #fff; margin-bottom: 2px; }
          .liveToastSub { font-size: 12px; color: #ccc; }
          .liveToastBtn { margin-left: auto; background: rgba(255,255,255,0.1); border: none; color: white; padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer; }

          /* RESPONSIVE */
          @media (max-width: 900px) {
            .links a { display: none; }
            .installBtn { display: none; }
            .hamburger { display: flex; }
          }
          @media (max-width: 640px) {
            .main { padding: 0 16px; padding-bottom: max(140px, env(safe-area-inset-bottom, 0px) + 120px); }
            .section { margin-bottom: 56px; }
            .sectionHead { margin-bottom: 28px; }
            .sectionHead h2 { font-size: clamp(1.4rem, 5.5vw, 1.85rem); line-height: 1.15; }
            .sectionHead p { font-size: 0.95rem; line-height: 1.55; }
            .topBarInner { flex-direction: column; gap: 4px; font-size: 11px; padding: 0 16px; }
            .urgency { font-size: 11px; }
            .nav { padding: 12px 16px; gap: 10px; }
            .brand svg { max-width: clamp(140px, 42vw, 168px); }
            .hero { padding: 40px 0 36px; }
            .heroLogo { margin-bottom: 16px; }
            h1 { font-size: clamp(1.85rem, 9vw, 2.6rem); letter-spacing: -0.5px; margin-bottom: 14px; line-height: 1.1; }
            .pill { font-size: 10px; padding: 5px 12px; margin-bottom: 16px; max-width: 100%; }
            .lead { font-size: 1rem; margin-bottom: 24px; line-height: 1.55; }
            .actions { gap: 10px; flex-direction: column; align-items: stretch; padding: 0 4px; }
            .btnPrimary, .btnSecondary { width: 100%; max-width: 100%; padding: 16px 22px; font-size: 15px; text-align: center; }
            .heroTrust { font-size: 12px; padding: 0 8px; line-height: 1.55; }
            .trustStrip { gap: 12px 18px; padding: 14px 12px; margin-top: 22px; font-size: 11.5px; }
            .trustStripItem { font-size: 11.5px; }
            .trustStripDot { display: none; }
            .trialBanner { flex-direction: column; align-items: stretch; padding: 22px 18px; gap: 14px; border-radius: var(--r-card); margin-bottom: 56px; }
            .trialContent h3 { font-size: 1.15rem; }
            .trialCta { text-align: center; justify-content: center; padding: 15px 20px; font-size: 15px; width: 100%; }
            .trustGrid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
            .trustCard { padding: 14px 10px; }
            .trustIcon { font-size: 22px; margin-bottom: 7px; }
            .trustCard h4 { font-size: 12px; }
            .trustCard p { font-size: 11px; }
            .grid { grid-template-columns: 1fr; gap: 18px; }
            .card { padding: 24px 18px; }
            .card.highlight { transform: none; }
            .bigNumber { font-size: 3.2rem; }
            .statsGrid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
            .statCard { padding: 20px 14px; }
            .statValue { font-size: 1.65rem; }
            .compareWrap { border-radius: 10px; }
            .compareTable { font-size: 11px; min-width: 420px; }
            .compareTable th, .compareTable td { padding: 10px 8px; }
            .tabBtn { font-size: 12px; padding: 12px 10px; min-width: 80px; }
            .channelList { padding: 16px; grid-template-columns: repeat(2, 1fr); gap: 10px; }
            .countriesGrid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
            .countryCard { padding: 12px 13px; gap: 9px; }
            .ctryFlag { font-size: 20px; }
            .ctryName { font-size: 13px; }
            .ctrySub { font-size: 10.5px; }
            .countryChGrid { grid-template-columns: repeat(2, 1fr); }
            .countryModalBox { max-height: 92vh; max-height: 92dvh; }
            .countryModalHd { padding: 18px 18px 0; gap: 12px; }
            .countryModalFlag { font-size: 38px; }
            .countryModalTb h2 { font-size: 19px; }
            .countryModalBd { padding: 14px 18px 22px; }
            .countryModalFt { flex-direction: column; padding: 12px 18px max(16px, env(safe-area-inset-bottom, 0px)); }
            .countryModalFt a { min-width: unset; width: 100%; }
            .intlGrid { grid-template-columns: 1fr; gap: 8px; }
            .intlCard { padding: 12px 14px; gap: 12px; }
            .intlFlag { font-size: 26px; }
            .intlName { font-size: 13.5px; }
            .intlDesc { font-size: 11.5px; }
            .intlBenefits { padding: 22px 18px; border-radius: 14px; }
            .intlBenefitsTitle { font-size: 1rem; margin-bottom: 16px; }
            .intlBenefitsGrid { grid-template-columns: 1fr; gap: 14px; }
            .intlBenefit h4 { font-size: 13px; }
            .intlBenefit p { font-size: 12px; }
            .deviceGrid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
            .deviceCard { padding: 14px 8px; gap: 6px; }
            .deviceIcon { font-size: 24px; }
            .deviceName { font-size: 11px; }
            .reviewsGrid { grid-template-columns: 1fr; gap: 14px; }
            .reviewCard { padding: 20px; }
            .stepsGrid { grid-template-columns: 1fr; gap: 14px; }
            .stepCard { padding: 22px; }
            .faqSummary { padding: 16px; font-size: 14px; }
            .faqAnswer { padding: 0 16px 16px; font-size: 13.5px; }
            .footer { padding: 44px 16px max(44px, env(safe-area-inset-bottom, 0px) + 24px); }
            .footerLinks { gap: 14px; }
            .liveBadge { display: none; }
            .liveToast { bottom: max(16px, env(safe-area-inset-bottom, 0px)); left: 12px; right: 12px; width: auto; max-width: calc(100% - 24px); }
            .miliFab { bottom: max(16px, env(safe-area-inset-bottom, 0px)); left: auto; right: 16px; border-radius: 999px; }
            .miliTeaser { bottom: max(88px, env(safe-area-inset-bottom, 0px) + 72px); left: auto; right: 16px; width: min(300px, calc(100% - 32px)); max-width: calc(100% - 32px); }
            .miliBox { bottom: max(88px, env(safe-area-inset-bottom, 0px) + 72px); left: 12px; right: 12px; width: auto; max-width: calc(100% - 24px); max-height: 72vh; max-height: 72dvh; }
            .fabText { display: none; }
            .fabContent { padding: 8px; gap: 0; }
            .pwaBar { left: 12px; right: 12px; bottom: max(12px, env(safe-area-inset-bottom, 0px)); width: auto; max-width: calc(100% - 24px); transform: none; }
          }
          @media (hover: none) {
            .btnPrimary, .btnSecondary, .btnPlan, .trialCta,
            .tabBtn, .faqSummary, .quickReply, .hamburger,
            .countryCard { min-height: 48px; }
            .card:hover, .trustCard:hover, .deviceCard:hover, .reviewCard:hover, .stepCard:hover, .countryCard:hover, .intlCard:hover { transform: none; box-shadow: none; border-color: rgba(255,255,255,0.06); background: var(--card); }
            .card:active { transform: scale(0.985); transition: transform 0.12s ease; }
            .trustCard:active, .deviceCard:active, .reviewCard:active, .stepCard:active, .intlCard:active { transform: scale(0.97); transition: transform 0.12s ease; }
            .btnPrimary:active, .btnPlan:active, .trialCta:active { transform: scale(0.97); transition: transform 0.1s ease; }
            .btnSecondary:active { background: rgba(255,255,255,0.12); transition: background 0.1s ease; }
            .countryCard:active { transform: scale(0.96); border-color: rgba(201,168,76,0.5); }
            .tabBtn:active { background: rgba(255,255,255,0.07); }
            .faqSummary { transition: background 0.15s; }
            .faqSummary:active { background: rgba(255,255,255,0.04); }
          }
          @media (prefers-reduced-motion: reduce) {
            .miliBox, .liveToast, .miliFab, .liveDot, .urgency, .installBtn,
            .countryModalBox, .countryModalOverlay, .mobileMenu { animation: none; transition: none; }
            .typingIndicator span { animation: none; }
          }
          @media (max-width: 359px) {
            .main { padding: 0 12px; padding-bottom: max(140px, env(safe-area-inset-bottom, 0px) + 120px); }
            .nav { padding: 11px 12px; gap: 8px; }
            .brand svg { max-width: 132px; }
            .topBarInner { padding: 0 12px; font-size: 10.5px; }
            .pill { font-size: 9.5px; padding: 4px 10px; letter-spacing: 0.3px; }
            .bigNumber { font-size: 2.9rem; }
            .statValue { font-size: 1.45rem; }
            .countriesGrid { gap: 6px; }
            .countryCard { padding: 11px 10px; gap: 8px; }
            .ctrySub { font-size: 10px; }
          }
          .heroLogo, .cinSvg, .saveBadge, .bestSellerBadge { will-change: transform; transform: translateZ(0); }
          .card, .trustCard, .deviceCard, .reviewCard, .stepCard, .countryCard, .intlCard { contain: layout style; }

          /* INTRO CINEMÁTICA */
          .cinWrap { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; flex-direction: column; overflow: hidden; }
          .cinWrap.cinExit { animation: cinFadeOut 0.42s cubic-bezier(0.4,0,1,1) forwards; }
          @keyframes cinFadeOut { to { opacity: 0; transform: scale(1.04); } }
          .cinBg { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 40%, #5a0010 0%, #2a0008 55%, #000000 100%); }
          .cinVignette { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 100%); pointer-events: none; }
          .cinParticles { position: absolute; inset: 0; pointer-events: none; }
          .cinParticle { position: absolute; border-radius: 50%; background: #FFD700; animation: cinFloat linear infinite; }
          @keyframes cinFloat { 0% { transform: translateY(0) scale(1); opacity: 0; } 8% { opacity: 0.55; } 90% { opacity: 0.3; } 100% { transform: translateY(-105vh) scale(0.4); opacity: 0; } }
          .cinLensFlare { position: absolute; top: 0; left: -100%; width: 60%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,215,0,0.04), rgba(255,215,0,0.09), rgba(255,215,0,0.04), transparent); animation: cinLens 0.7s ease-out 1.0s forwards; pointer-events: none; }
          @keyframes cinLens { to { left: 140%; } }
          .cinEmblemWrap { position: relative; margin-bottom: 28px; }
          .cinEmblemGlow { position: absolute; inset: -30px; border-radius: 50%; background: radial-gradient(ellipse, rgba(255,215,0,0.18) 0%, transparent 70%); animation: cinGlowPulse 2s ease-in-out 1.1s infinite; }
          @keyframes cinGlowPulse { 0%,100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.15); opacity: 1; } }
          .cinSvg { position: relative; z-index: 1; }
          .cinShieldFill { opacity: 0; animation: cinFadeIn 0.3s ease 0.88s forwards; }
          .cinShieldBorder { stroke-dasharray: 700; stroke-dashoffset: 700; animation: cinDraw 0.82s cubic-bezier(0.4,0,0.2,1) 0.15s forwards; }
          .cinShieldBorderGlow { opacity: 0; animation: cinFadeIn 0.25s ease 0.88s forwards; }
          @keyframes cinDraw { to { stroke-dashoffset: 0; } }
          @keyframes cinFadeIn { to { opacity: 1; } }
          .cinCrown { opacity: 0; transform-origin: center bottom; }
          .cinCrown1 { animation: cinCrownPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.18s forwards; }
          .cinCrown2 { animation: cinCrownPop 0.4s cubic-bezier(0.34,1.4,0.64,1) 1.45s forwards; }
          @keyframes cinCrownPop { 0% { opacity: 0; transform: scale(0) translateY(4px) rotate(-6deg); } 60% { opacity: 1; } 100% { opacity: 1; transform: scale(1) translateY(0) rotate(0); } }
          .cinContent { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0; max-width: 100%; padding: 0 20px; box-sizing: border-box; }
          .cinTitleWrap { margin-bottom: 14px; max-width: 100%; }
          .cinTitle { font-size: clamp(2rem, 8vw, 5rem); font-weight: 900; letter-spacing: 0.28em; color: #FFD700; text-shadow: 0 0 32px rgba(255,215,0,0.7), 0 0 64px rgba(255,215,0,0.28); margin: 0 0 8px; opacity: 0; max-width: 100%; white-space: nowrap; animation: cinTitleIn 0.48s cubic-bezier(0.16,1,0.3,1) 1.72s forwards; }
          @keyframes cinTitleIn { 0% { opacity: 0; letter-spacing: 0.42em; transform: scale(1.04); filter: blur(6px); } 65% { filter: blur(0); } 100% { opacity: 1; letter-spacing: 0.28em; transform: scale(1); filter: blur(0); } }
          .cinTitleLine { height: 1px; background: linear-gradient(90deg, transparent, #FFD700, transparent); width: 0; max-width: 100%; margin: 0 auto; animation: cinLineExpand 0.38s ease 2.02s forwards; }
          @keyframes cinLineExpand { to { width: min(220px, 60vw); } }
          .cinTagline { font-size: clamp(0.78rem, 3vw, 0.95rem); letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.62); font-weight: 400; margin: 0 0 8px; max-width: 100%; opacity: 0; animation: cinFadeUp 0.35s ease 2.2s forwards; }
          .cinSub { font-size: clamp(10px, 2.6vw, 12px); letter-spacing: 0.06em; color: rgba(255,215,0,0.5); margin: 0; max-width: 100%; opacity: 0; animation: cinFadeUp 0.3s ease 2.42s forwards; }
          @keyframes cinFadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
          .cinSkip { position: absolute; bottom: max(28px, env(safe-area-inset-bottom, 0px) + 16px); right: 20px; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,215,0,0.2); color: rgba(255,215,0,0.45); font-size: 12px; letter-spacing: 0.08em; padding: 8px 18px; border-radius: 20px; cursor: pointer; transition: border-color 0.18s, color 0.18s, background 0.18s; z-index: 10; min-height: 40px; opacity: 0; animation: cinFadeIn 0.3s ease 0.6s forwards; }
          .cinSkip:hover { border-color: #FFD700; color: #FFD700; background: rgba(255,215,0,0.06); }
          @media (prefers-reduced-motion: reduce) { .cinWrap { display: none !important; } }

          /* STICKY CTA MÓVIL */
          .stickyMobileCta { display: none; }
          @media (max-width: 768px) {
            .stickyMobileCta {
              position: fixed; bottom: 0; left: 0; right: 0;
              padding: 14px 16px; padding-bottom: max(14px, env(safe-area-inset-bottom, 0px));
              background: var(--accent-hi); color: #fff;
              text-align: center; text-decoration: none;
              font-weight: 800; font-size: 15px;
              z-index: 998;
              box-shadow: 0 -8px 24px -4px rgba(0,0,0,0.5);
              display: block;
              letter-spacing: 0.01em;
              transition: background 0.18s ease;
            }
            .stickyMobileCta:active { background: #e60914; }
            .miliFab { bottom: max(72px, env(safe-area-inset-bottom, 0px) + 64px) !important; }
            .miliTeaser { bottom: max(140px, env(safe-area-inset-bottom, 0px) + 130px) !important; }
            .miliBox { bottom: max(140px, env(safe-area-inset-bottom, 0px) + 130px) !important; }
            .pwaBar { bottom: max(72px, env(safe-area-inset-bottom, 0px) + 64px) !important; }
            .main { padding-bottom: 180px !important; padding-bottom: max(180px, env(safe-area-inset-bottom, 0px) + 160px) !important; }
            .footer { padding-bottom: 80px !important; }
          }

          /* MÉTODOS DE PAGO */
          .paymentBadges { margin-top: 36px; padding-top: 28px; border-top: 1px solid var(--border); text-align: center; }
          .paymentLabel { font-size: 11px; color: var(--muted); letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 14px; font-weight: 600; }
          .paymentList { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
          .payBadge { background: var(--card); border: 1px solid var(--border); border-radius: var(--r-cta); padding: 8px 14px; font-size: 13px; font-weight: 600; color: var(--muted-hi); letter-spacing: 0.005em; transition: border-color 0.2s ease, color 0.2s ease; display: inline-flex; align-items: center; gap: 6px; }
          .payBadge:hover { border-color: var(--border-hi); color: #fff; }
          .payBadge img { display: inline-block; vertical-align: middle; opacity: 0.85; transition: opacity 0.18s ease; }
          .payBadge:hover img { opacity: 1; }

          /* PWA INSTALL BAR */
          .pwaBar { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); width: min(460px, calc(100% - 32px)); background: var(--card-hi); border: 1px solid var(--border-accent); border-radius: var(--r-card); padding: 12px 14px; display: flex; align-items: center; gap: 12px; z-index: 1050; box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 1px rgba(196,0,29,0.4); animation: pwaSlideUp 0.4s cubic-bezier(0.16,1,0.3,1); }
          @keyframes pwaSlideUp { from { transform: translateX(-50%) translateY(20px); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }
          .pwaIcon { font-size: 24px; flex-shrink: 0; }
          .pwaText { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
          .pwaText strong { font-size: 13px; font-weight: 700; color: var(--fg); }
          .pwaText span { font-size: 11px; color: var(--muted); }
          .pwaAccept { background: var(--accent-hi); color: #fff; border: none; padding: 9px 18px; border-radius: var(--r-cta); font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; transition: background 0.18s ease; }
          .pwaAccept:hover { background: #e60914; }
          .pwaDismiss { background: none; border: none; color: var(--muted); font-size: 14px; cursor: pointer; padding: 4px 6px; flex-shrink: 0; transition: color 0.15s; }
          .pwaDismiss:hover { color: var(--fg); }
          .pwaBarIOS { bottom: max(80px, env(safe-area-inset-bottom, 0px) + 70px); }
          .iosShareIcon { display: inline-block; background: rgba(255,215,0,0.15); border: 1px solid rgba(255,215,0,0.3); border-radius: 4px; padding: 1px 5px; font-size: 11px; color: #FFD700; margin: 0 1px; vertical-align: middle; }
        `}</style>
      </div>
    </>
  );
}
