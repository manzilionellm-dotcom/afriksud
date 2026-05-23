// components/shared/dict.ts
// Mzansi Stream copy across the 12 P0 locales.
//
// Hero H1/CTA strings for af / zu / xh / pt-mz / en-zw / fr are the
// owner-approved native-language wording defined in the SEO playbook —
// these were drafted by hand to avoid machine-translated nguni copy.
// English diaspora variants (en-gb / en-au / en-us / en-ae / en-nz)
// share the en-ZA base; per-market hero copy lands in follow-up PRs as
// the diaspora landing pages are built out.

import type { Copy, Locale } from "./types";
import { deviceList } from "./plans";

const SITE_LABEL = { brand: "Mzansi Stream" };

// ════════════════════════════════════════════════════════════════════════════
// ENGLISH SOUTH AFRICA (en-ZA) — DEFAULT
// ════════════════════════════════════════════════════════════════════════════
const enZA: Copy = {
  brand: SITE_LABEL.brand,
  top: {
    status: "Servers online · Live WhatsApp support",
    urgency: "🎁 Free 24h trial · No card, no commitment",
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
    trust: "One of the most reliable IPTV services in South Africa · Available worldwide · No contract",
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
    title: "Customer reviews",
    // POPIA + Omnibus compliance: this list starts empty and only grows
    // with consented, verified customer testimonials (HelloPeter /
    // Trustpilot). Do not seed with invented entries.
    sub: "Be among our first verified customers — leave your HelloPeter review after 30 days of use.",
    items: [],
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
  checkout: {
    title: "Order on WhatsApp",
    secureBadge: "Secure transaction",
    close: "Close",
    step1Label: "Step 1",
    step1Title: "Pick your plan length",
    step2Label: "Step 2",
    step2Title: "Your TV or device",
    step2Placeholder: "Select your TV or device…",
    step3Label: "Step 3",
    step3Title: "Your IPTV app",
    step3Placeholder: "Select your IPTV app…",
    step4Label: "Step 4",
    step4Title: "Notes (optional)",
    step4Placeholder: "Anything we should know? Channels you want, sport packs, devices in the home…",
    otherSpecify: "Please specify",
    pillTotal: "total",
    pillBilledOnce: "billed once",
    recapTitle: "Your order",
    recapPlan: "Plan",
    recapDevice: "Device",
    recapApp: "App",
    recapNotes: "Notes",
    recapEmpty: "—",
    cta: "Send on WhatsApp",
    badges: [
      { title: "Activation 10 min", desc: "On WhatsApp" },
      { title: "No contract", desc: "Pay once" },
      { title: "Guarantee", desc: "Satisfaction" },
      { title: "Support 10 min", desc: "7 days a week" },
    ],
    waIntro: "Hi! I'd like to order Mzansi Stream 👇",
    waContext: "From page",
    waNotesLabel: "Notes",
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
  ...enZA,
  brand: SITE_LABEL.brand,
  top: {
    status: "Bedieners aanlyn · Lewendige WhatsApp-ondersteuning",
    urgency: "🎁 Gratis 24-uur proeftydperk · Geen kaart, geen verbintenis",
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
    trust: "Een van die mees betroubare IPTV-dienste in Suid-Afrika · Wêreldwyd beskikbaar · Geen kontrak",
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
  ...enZA,
  brand: SITE_LABEL.brand,
  top: {
    status: "Serveurs en ligne · Support WhatsApp en direct",
    urgency: "🎁 Essai gratuit 24h · Sans carte, sans engagement",
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
    trust: "L'un des services IPTV les plus fiables en Afrique du Sud · Disponible dans le monde · Sans engagement",
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
  checkout: {
    title: "Commander sur WhatsApp",
    secureBadge: "Transaction sécurisée",
    close: "Fermer",
    step1Label: "Étape 1",
    step1Title: "Choisis la durée",
    step2Label: "Étape 2",
    step2Title: "Ta TV ou box",
    step2Placeholder: "Sélectionne ta TV ou box…",
    step3Label: "Étape 3",
    step3Title: "Ton appli IPTV",
    step3Placeholder: "Sélectionne ton appli IPTV…",
    step4Label: "Étape 4",
    step4Title: "Notes (facultatif)",
    step4Placeholder: "Quelque chose à nous dire ? Chaînes voulues, packs sport, appareils à la maison…",
    otherSpecify: "Précise s'il te plaît",
    pillTotal: "total",
    pillBilledOnce: "facturé une fois",
    recapTitle: "Ta commande",
    recapPlan: "Plan",
    recapDevice: "Appareil",
    recapApp: "Appli",
    recapNotes: "Notes",
    recapEmpty: "—",
    cta: "Envoyer sur WhatsApp",
    badges: [
      { title: "Activation 10 min", desc: "Sur WhatsApp" },
      { title: "Sans engagement", desc: "Paiement unique" },
      { title: "Garantie", desc: "Satisfaction" },
      { title: "Support 10 min", desc: "7j/7" },
    ],
    waIntro: "Bonjour ! Je souhaite commander Mzansi Stream 👇",
    waContext: "Depuis la page",
    waNotesLabel: "Notes",
  },
};

// ════════════════════════════════════════════════════════════════════════════
// NATIVE-LANGUAGE HERO OVERLAYS
// ----------------------------------------------------------------------------
// Per-locale overrides applied on top of the en-ZA base. Only the strings
// that materially differ from English go here; the rest inherits.
// ════════════════════════════════════════════════════════════════════════════

// isiZulu — hero owner-approved (SEO playbook section B.1).
const zu: Copy = {
  ...enZA,
  top: {
    status: "Iziphunziso zixhumekile · Usekelo lwe-WhatsApp luphila",
    urgency: "🎁 Ukulinga kwamahhala kwama-24h · Akudingeki ikhadi",
  },
  hero: {
    ...enZA.hero,
    titleA: "I-IPTV Engcono e-South Africa 2026.",
    titleB: "Iziteshi ezi-20,000+, SuperSport, ku-4K kusukela ku-R99/inyanga.",
    ctaPrices: "Bona izinhlelo",
    ctaAdvisor: "Khuluma nomeluleki",
    trust: "Enye yezinsizakalo ze-IPTV ezithembeke kakhulu e-South Africa · Akukho nkontileka",
  },
  trial: {
    ...enZA.trial,
    cta: "Qala Ukulinga Kwamahhala Kwama-24h",
  },
  stickyCta: "★ Qala kwamahhala 24h →",
  reviews: {
    title: "Izibuyekezo zamakhasimende",
    sub: "Yiba phakathi kwamakhasimende ethu okuqala — shiya isibuyekezo se-HelloPeter sakho ngemuva kwezinsuku ezingu-30 zokusebenzisa.",
    items: [],
  },
};

// isiXhosa — hero owner-approved.
const xh: Copy = {
  ...enZA,
  top: {
    status: "Iiseva zixhumekile · Inkxaso ye-WhatsApp iphila",
    urgency: "🎁 Uvavanyo lwasimahla lweyure ezingama-24 · Akukho khadi",
  },
  hero: {
    ...enZA.hero,
    titleA: "Eyona IPTV Ilungileyo eMzantsi Afrika 2026.",
    titleB: "20,000+ iitshaneli, SuperSport ku-4K ukusuka ku-R99/inyanga.",
    ctaPrices: "Jonga izicwangciso",
    ctaAdvisor: "Thetha necebo",
    trust: "Enye yeenkonzo ze-IPTV ezithembekileyo eMzantsi Afrika · Akukho sivumelwano",
  },
  trial: {
    ...enZA.trial,
    cta: "Qala uvavanyo lwasimahla lweyure ezingama-24",
  },
  stickyCta: "★ Zama simahla iiyure ezingama-24 →",
  reviews: {
    title: "Izimvo zabathengi",
    sub: "Yiba phakathi kwabathengi bethu bokuqala abaqinisekisiweyo — shiya isimvo sakho se-HelloPeter emva kweentsuku ezingama-30 zokusebenzisa.",
    items: [],
  },
};

// Português Moçambique — hero owner-approved.
const ptMZ: Copy = {
  ...enZA,
  top: {
    status: "Servidores em linha · Suporte WhatsApp ao vivo",
    urgency: "🎁 Teste grátis de 24h · Sem cartão, sem compromisso",
  },
  hero: {
    ...enZA.hero,
    pill: "4K Premium · CDN global · 20.000+ canais",
    titleA: "Melhor IPTV Moçambique 2026.",
    titleB: "DStv, SuperSport, 20.000+ canais em 4K.",
    lead: "20.000+ canais em 4K nativo, desporto ao vivo sem cortes, filmes e séries em segundos. SuperSport, Premier League, TVM, RTP África — tudo num só pacote. Sem fidelização.",
    ctaPrices: "Ver planos",
    ctaAdvisor: "Falar com um consultor",
    trust: "Um dos serviços de IPTV mais confiáveis em África Austral · Disponível em todo o mundo · Sem fidelização",
  },
  trial: {
    badge: "TESTE GRÁTIS",
    title: "Experimente grátis por 24 horas",
    sub: "Sem cartão, sem compromisso. Fale connosco no WhatsApp e teste o serviço na sua Smart TV, Firestick, telemóvel ou tablet em poucos minutos.",
    cta: "Pedir o meu teste grátis",
    note: "Sem fidelização. Sem cobranças automáticas.",
  },
  stickyCta: "★ Experimentar 24h grátis →",
  reviews: {
    title: "Avaliações dos clientes",
    sub: "Seja um dos nossos primeiros clientes verificados — deixe a sua avaliação no HelloPeter após 30 dias de uso.",
    items: [],
  },
};

// English Zimbabwe — hero owner-approved.
const enZW: Copy = {
  ...enZA,
  top: {
    status: "Servers online · Live WhatsApp support",
    urgency: "🎁 Free 24h trial · No card, no commitment",
  },
  hero: {
    ...enZA.hero,
    titleA: "Best IPTV Zimbabwe 2026.",
    titleB: "DStv channels, SuperSport & 20,000+ live in 4K.",
    lead: "20,000+ channels in native 4K, live sport with no buffering, movies and series in seconds. SuperSport, Premier League, ZBC TV and the full DStv line-up — in one package. No contract, no decoder.",
    trust: "One of the most reliable IPTV services in Southern Africa · No contract · Pay in USD, EcoCash or OneMoney",
  },
};

// English diaspora variants share en-ZA copy. The "Watch SA TV abroad"
// hero defined in the SEO playbook lands per-page in follow-up PRs as
// the diaspora landing routes are built; the homepage stays neutral for
// now to avoid showing the wrong proposition to a visitor browsing
// /?lang=en-gb without a dedicated route yet.
const enGB: Copy = { ...enZA };
const enAU: Copy = { ...enZA };
const enUS: Copy = { ...enZA };
const enAE: Copy = { ...enZA };
const enNZ: Copy = { ...enZA };

export const dict: Record<Locale, Copy> = {
  "en-za": enZA,
  "en-gb": enGB,
  "en-au": enAU,
  "en-us": enUS,
  af,
  zu,
  xh,
  "pt-mz": ptMZ,
  "en-zw": enZW,
  fr,
  "en-ae": enAE,
  "en-nz": enNZ,
};

