// components/shared/dict.ts
// Trilingual dictionary for Mzansi Stream:
// - en (English en-ZA, primary, all SA users)
// - af (Afrikaans, ~12% of SA, high purchasing power, NB Cape & Pretoria)
// - fr (French, for francophone African expats in SA)

import type { Copy, Locale } from "./types";
import { deviceList } from "./plans";

const SITE_LABEL = { brand: "Mzansi Stream" };

// ════════════════════════════════════════════════════════════════════════════
// ENGLISH (en-ZA) — PRIMARY
// ════════════════════════════════════════════════════════════════════════════
const en: Copy = {
  brand: SITE_LABEL.brand,
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
    whatsapp: "WhatsApp",
    install: "Install app",
  },
  hero: {
    pill: "Premium 4K · Global CDN · 20,000+ channels",
    titleA: "Best IPTV South Africa.",
    titleB: "Direct to your screen.",
    lead: "20,000+ channels in native 4K, live sport with no buffering, movies and series unlocked in seconds. SuperSport, DStv Premiership, Premier League, kykNET — all in one package. No contract.",
    ctaPrices: "See pricing",
    ctaAdvisor: "Talk to an advisor",
    trust: "★ 4.9/5 · 1,200+ customers · Available worldwide · No contract",
  },
  trial: {
    badge: "FREE TRIAL",
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
  },
  planPerks: {
    p1: ["20,000+ live channels", "4K/UHD quality", "EPG guide included", "WhatsApp support", "No contract"],
    p3: ["Most popular choice", "20,000+ live channels", "100,000+ movies & series", "Priority support", "Guided install"],
    p6: ["Best value for money", "20,000+ live channels", "Up to 3 devices", "EPG + Catch-up TV", "Every channel included"],
    p12: ["Best deal of the year", "Premium VIP access", "20,000+ channels", "VIP 24/7 support", "Free upgrades"],
  },
  channels: {
    title: "Browse the channel line-up",
    sub: "Pick a category to preview what's included.",
    more: "…and 20,000+ more channels",
  },
  devices: {
    title: "Works on every device you own",
    sub: "Install on up to 3 devices. We walk you through it on WhatsApp, no matter what you use.",
    list: deviceList,
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
      { service: "DStv Premium",      price: "R899",    live: "~180",    vod: true,  hd4k: true,  support: "Phone" },
      { service: "DStv Compact Plus", price: "R549",    live: "~150",    vod: true,  hd4k: false, support: "Phone" },
      { service: "DStv Compact",      price: "R449",    live: "~120",    vod: true,  hd4k: false, support: "Phone" },
      { service: "Showmax",           price: "R99",     live: "0",       vod: true,  hd4k: true,  support: "Email" },
      { service: "Netflix Premium",   price: "R199",    live: "0",       vod: true,  hd4k: true,  support: "Chat" },
      { service: "Mzansi Stream",     price: "from R99", live: "20,000+", vod: true, hd4k: true,  support: "Direct WhatsApp", highlight: true },
    ],
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
    ],
  },
  trust: {
    title: "Safe, simple sign-up",
    items: [
      { icon: "🧪", title: "Free 24h trial",          desc: "No credit card. Zero risk." },
      { icon: "⚡", title: "Activated in < 10 min",   desc: "We activate you instantly on WhatsApp." },
      { icon: "💬", title: "English support",         desc: "Quick replies, every day." },
      { icon: "🛡️", title: "Satisfaction guarantee", desc: "Not happy? Reach out within 24h." },
      { icon: "📺", title: "4K on every plan",        desc: "No surcharge for max quality." },
      { icon: "🌐", title: "Optimised for SA fibre",  desc: "Works with Vumatel, Openserve, Frogfoot, MTN and Vodacom." },
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
      { q: "Is Mzansi Stream a DStv alternative?", a: "Yes — Mzansi Stream is the leading DStv alternative in South Africa. You get every channel DStv Premium offers (and 100x more) for a fraction of the price, with no installer fee, no decoder rental and no contract." },
      { q: "Do you cover the Springboks rugby and the URC?", a: "Yes. Every Springboks Test, every URC fixture and every Currie Cup match in 4K via SuperSport Rugby and SuperSport Variety." },
      { q: "Can I watch the IPL cricket and Proteas matches?", a: "Yes. All Proteas T20I, ODI and Test matches plus the full IPL season are streamed in 4K via SuperSport Cricket and Star Sports." },
      { q: "Will it work with Vumatel, Openserve and other SA fibre?", a: "Yes — Mzansi Stream is optimised for South African fibre networks: Vumatel, Openserve, Frogfoot, Octotel, MetroFibre, MTN Fibre and Vodacom Fibre." },
    ],
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
    orderMessage: (planName, price, currency) =>
      `Hi! I want to order the ${planName} plan (${price} ${currency}). How do I activate it?`,
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
  payments: { label: "Secure payments" },
};

// ════════════════════════════════════════════════════════════════════════════
// AFRIKAANS (af) — secondary, ~12% SA, high purchasing power
// ════════════════════════════════════════════════════════════════════════════
const af: Copy = {
  ...en,
  brand: SITE_LABEL.brand,
  top: {
    status: "Bedieners aanlyn · Lewendige WhatsApp-ondersteuning",
    urgency: "🎁 Bekendstellingsprys vasgemaak tot 30 Junie · Gratis 24-uur proeftydperk",
  },
  nav: {
    offers: "Pryse",
    channels: "Kanale",
    countries: "Jou taal",
    international: "SA wêreldwyd",
    devices: "Toestelle",
    cities: "Stede",
    faq: "FAQ",
    setup: "Installasie",
    whatsapp: "WhatsApp",
    install: "Installeer app",
  },
  hero: {
    pill: "Premium 4K · Wêreldwye CDN · 20 000+ kanale",
    titleA: "Beste IPTV Suid-Afrika.",
    titleB: "Direk op jou skerm.",
    lead: "20 000+ kanale in inheemse 4K, lewendige sport sonder buffering, films en reekse onmiddellik beskikbaar. SuperSport, DStv Premiership, Premier League, kykNET — alles in een pakket. Geen kontrak.",
    ctaPrices: "Sien pryse",
    ctaAdvisor: "Praat met 'n raadgewer",
    trust: "★ 4,9/5 · 1 200+ kliënte · Wêreldwyd beskikbaar · Geen kontrak",
  },
  trial: {
    badge: "GRATIS PROEF",
    title: "Probeer dit gratis vir 24 uur",
    sub: "Geen kaart, geen verbintenis. Stuur ons 'n WhatsApp-boodskap en probeer die diens op jou Smart TV, Firestick, foon of tablet binne minute.",
    cta: "Vra nou jou gratis proeftydperk aan",
    note: "Geen kontrak. Geen outomatiese heffings.",
  },
  offers: {
    title: "Kies jou pakket",
    sub: "Elke pakket sluit 20 000+ kanale, 100 000+ films en reekse, EPG en WhatsApp-ondersteuning in. Onmiddellike aktivering.",
    order: "Bestel via WhatsApp",
    billedOnce: "Eenmalige betaling van",
    perMonth: "/maand",
    save: "BESPAAR",
    bestSeller: "MEES POPULÊR",
    totalLabel: "eenmalig",
  },
  planNames: {
    p1: "1 maand",
    p3: "3 maande",
    p6: "6 maande",
    p12: "12 maande",
  },
  setup: {
    title: "10-minuut installasie",
    sub: "Werk op Firestick, Smart TV, iPhone, Android en meer. Ons lei jou deur elke stap.",
    button: "Kry hulp met installasie",
    steps: [
      { step: "1", text: "Stuur ons 'n WhatsApp en sê watter toestel jy gebruik." },
      { step: "2", text: "Kies jou pakket en betaal via EFT, SnapScan, Zapper of kaart." },
      { step: "3", text: "Ontvang jou M3U-skakel en gids. Jy kyk binne 10 minute TV." },
    ],
  },
  stickyCta: "★ Probeer 24u gratis →",
};

// ════════════════════════════════════════════════════════════════════════════
// FRENCH (fr) — for francophone African expats in SA + DRC/CIV/Senegal etc.
// ════════════════════════════════════════════════════════════════════════════
const fr: Copy = {
  ...en,
  brand: SITE_LABEL.brand,
  top: {
    status: "Serveurs en ligne · Support WhatsApp en direct",
    urgency: "🎁 Prix de lancement bloqué jusqu'au 30 juin · Essai gratuit 24h",
  },
  nav: {
    offers: "Tarifs",
    channels: "Chaînes",
    countries: "Votre langue",
    international: "SA dans le monde",
    devices: "Appareils",
    cities: "Villes",
    faq: "FAQ",
    setup: "Installation",
    whatsapp: "WhatsApp",
    install: "Installer l'app",
  },
  hero: {
    pill: "4K Premium · CDN mondial · 20 000+ chaînes",
    titleA: "Meilleure IPTV Afrique du Sud.",
    titleB: "Direct sur votre écran.",
    lead: "20 000+ chaînes en 4K natif, sport en direct sans coupure, films et séries débloqués en quelques secondes. SuperSport, DStv Premiership, Premier League, kykNET — tout dans un seul forfait. Sans engagement.",
    ctaPrices: "Voir les tarifs",
    ctaAdvisor: "Parler à un conseiller",
    trust: "★ 4,9/5 · 1 200+ clients · Disponible dans le monde · Sans engagement",
  },
  trial: {
    badge: "ESSAI GRATUIT",
    title: "Essayez gratuitement pendant 24h",
    sub: "Sans carte, sans engagement. Contactez-nous sur WhatsApp et testez le service sur votre Smart TV, Firestick, téléphone ou tablette en quelques minutes.",
    cta: "Demander mon essai gratuit",
    note: "Sans engagement. Sans prélèvement automatique.",
  },
  offers: {
    title: "Choisissez votre forfait",
    sub: "Chaque forfait inclut 20 000+ chaînes, 100 000+ films et séries, EPG et support WhatsApp. Activation instantanée.",
    order: "Commander via WhatsApp",
    billedOnce: "Paiement unique de",
    perMonth: "/mois",
    save: "ÉCONOMISEZ",
    bestSeller: "MEILLEURE VENTE",
    totalLabel: "paiement unique",
  },
  planNames: {
    p1: "1 mois",
    p3: "3 mois",
    p6: "6 mois",
    p12: "12 mois",
  },
  setup: {
    title: "Installation en 10 minutes",
    sub: "Fonctionne sur Firestick, Smart TV, iPhone, Android et plus. On vous accompagne étape par étape.",
    button: "Obtenir de l'aide",
    steps: [
      { step: "1", text: "Contactez-nous sur WhatsApp et indiquez votre appareil." },
      { step: "2", text: "Choisissez votre forfait et payez par EFT, carte ou PayPal." },
      { step: "3", text: "Recevez votre lien M3U et le guide. Vous regardez la TV en moins de 10 minutes." },
    ],
  },
  stickyCta: "★ Essayer 24h gratuit →",
};

export const dict: Record<Locale, Copy> = { en, af, fr };
