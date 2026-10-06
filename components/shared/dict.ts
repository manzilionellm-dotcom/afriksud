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
    pill: "Premium 4K · No contract · 24h free trial",
    titleA: "Best IPTV South Africa.",
    titleB: "Direct to your screen.",
    lead: "Live channels in 4K, sport, movies and series. SuperSport-style, DStv Premiership, Premier League and kykNET folders — line-up to confirm on WhatsApp. No contract. Picture quality depends on your line.",
    ctaPrices: "See pricing",
    ctaAdvisor: "Talk to an advisor",
    trust: "No contract · WhatsApp activation · Test it on your own line",
  },
  trial: {
    badge: "FREE TRIAL",
    title: "Try it free for 24 hours",
    sub: "No card, no commitment. Message us on WhatsApp and try the service on your Smart TV, Firestick, phone or tablet.",
    cta: "Request your free trial now",
    note: "No contract. No automatic charges.",
  },
  offers: {
    title: "Choose your plan",
    sub: "Every plan includes the same channel line-up, VOD, EPG and WhatsApp support. Line-up to confirm on WhatsApp.",
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
    p1: ["SA + sport folders to trial", "4K/UHD quality", "EPG guide included", "WhatsApp support", "No contract"],
    p3: ["Most popular choice", "SA + sport folders to trial", "VOD on the trial", "Priority support", "Guided install"],
    p6: ["Best value for money", "SA + sport folders to trial", "Up to 3 devices", "EPG + Catch-up TV", "Same line-up as every plan"],
    p12: ["Best deal of the year", "Premium VIP access", "Published channel pack", "WhatsApp support", "Free upgrades"],
  },
  channels: {
    title: "Browse the channel line-up",
    sub: "Pick a category to preview example channel names — line-up to confirm on WhatsApp.",
    more: "…full line-up to confirm on WhatsApp",
  },
  devices: {
    title: "Works on every device you own",
    sub: "Install on up to 3 devices. We walk you through it on WhatsApp, no matter what you use.",
    list: deviceList,
  },
  vod: {
    title: "Movies and series on demand",
    sub: "Ask on WhatsApp for the current catalogue, then check it on the 24h trial. Watch when you want, where you want.",
    stats: [
      { value: "VOD",      label: "Movies & series" },
      { value: "Live",     label: "TV channels" },
      { value: "4K/UHD",   label: "Max quality" },
      { value: "24h",      label: "Free trial" },
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
      { service: "Mzansi Stream",     price: "from R99", live: "Confirm on WhatsApp", vod: true, hd4k: true,  support: "Direct WhatsApp", highlight: true },
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
      { icon: "⚡", title: "Activated on WhatsApp",   desc: "Activation is done on WhatsApp after payment." },
      { icon: "💬", title: "English support",         desc: "Support on WhatsApp." },
      { icon: "🛡️", title: "Satisfaction guarantee", desc: "Not happy? Reach out within 24h." },
      { icon: "📺", title: "4K on every plan",        desc: "No surcharge for max quality." },
      { icon: "🌐", title: "SA fibre",                desc: "Test it on Vumatel, Openserve, Frogfoot, MTN or Vodacom during the trial." },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      { q: "Can I watch SABC, e.tv and SA free-to-air channels?", a: "SABC 1, 2 and 3, e.tv and the usual SA free-to-air names are the folders most viewers look for. Confirm what actually plays on your 24h trial — we don’t list this as a complete official line-up." },
      { q: "Can I watch the DStv Premiership and the Premier League?", a: "SuperSport PSL, Premier League, Variety, Rugby and Cricket folders are on the lineup. We don't promise every official feed or a buffer-free picture — test the match on the 24h trial." },
      { q: "Is it compatible with TiviMate, IPTV Smarters and Smart TV?", a: "Yes. Works with TiviMate, IPTV Smarters Pro, GSE Smart IPTV and any standard M3U app. We send the M3U link directly via WhatsApp." },
      { q: "Which devices are supported?", a: "Smart TVs (Samsung, LG, Sony), Firestick / Fire TV, Android TV, iPhone, iPad, Android, Android TV Box, MAG Box and PC/Mac. We guide the install for your specific device." },
      { q: "How fast is activation?", a: "Activation is done on WhatsApp after we receive your order and payment. We don't publish a fixed delay." },
      { q: "Is the EPG guide included?", a: "Yes. The full Electronic Programme Guide is included in every plan so you always know what's on now and what's coming up." },
      { q: "Can I watch on multiple devices at the same time?", a: "The standard plan includes one connection. If you need multi-screen for the whole household, message us on WhatsApp and we'll set up a tailored plan." },
      { q: "Do I need a VPN?", a: "Not required in South Africa, but we recommend one for extra privacy. We can advise on the best VPN for the service." },
      { q: "Does it work outside South Africa?", a: "South Africans abroad use it. We don't publish a country count. For best results outside SA we recommend a VPN, and the 24h trial is how you check your own connection." },
      { q: "How do I pay?", a: "Payment is handled on WhatsApp. We accept EFT, SnapScan, Zapper, Yoco, Ozow, Capitec Pay, Visa, Mastercard, PayPal and Bitcoin." },
      { q: "What if the service goes down?", a: "Message us directly on WhatsApp. We treat outages as a support job, not a promise that nothing will ever drop." },
      { q: "Is there a contract? Can I cancel?", a: "No contract and no auto-renewal. You pay once and the service ends at the end of the chosen period. If you want to continue, you renew it manually." },
      { q: "Is Mzansi Stream a DStv alternative?", a: "It is a no-contract option people compare with a DStv decoder. We don't claim every DStv Premium channel, a ranked 'leading' title, or a multiple like '100x more'. Trial the folders you watch." },
      { q: "Do you cover the Springboks rugby and the URC?", a: "Springboks, URC and Currie Cup are the fixtures people ask for, via SuperSport Rugby and Variety folders. Rights and blackouts can still apply — test the match." },
      { q: "Can I watch the IPL cricket and Proteas matches?", a: "SuperSport Cricket / Star Sports-style folders are the usual ask for Proteas and IPL. We don’t guarantee every match or every official feed. Tell us the upcoming games on WhatsApp and test them first." },
      { q: "Will it work with Vumatel, Openserve and other SA fibre?", a: "It runs over any home internet, including Vumatel, Openserve, Frogfoot, Octotel, MetroFibre, MTN Fibre and Vodacom Fibre. The 24h trial is the proof on your line — not a guarantee for every network." },
    ],
  },
  cities: {
    title: "Premium IPTV across South Africa",
    sub: "The best internet TV service, tuned for your province.",
    button: "Contact us",
    items: [
      { name: "Johannesburg", text: "A cheaper DStv-style option for Joburg households. SuperSport-style folders, Premier League, kykNET and SABC — confirm what you need on the trial." },
      { name: "Cape Town",    text: "Set up for Cape Town. Stormers, Cape Town City FC, URC and PSL folders — test the fixture on your line. We don't promise zero buffering." },
      { name: "Durban",       text: "Built for Durban: AmaZulu FC, Sharks rugby, Indian channels for the local community and the international folders people actually use." },
      { name: "Pretoria",     text: "Mamelodi Sundowns, Bulls rugby, kykNET dramas and the SABC + e.tv pack — install in about 10 minutes via WhatsApp." },
      { name: "Gqeberha",     text: "Eastern Cape setup — Chippa United, EP Elephants and the major national folders, confirmed on trial." },
      { name: "Bloemfontein", text: "Bloemfontein Celtic, Free State Cheetahs and SuperSport-style rugby folders with English-language WhatsApp support." },
      { name: "East London",  text: "Streaming in EL over a local line — PSL and Premier League folders to test, not an every-match promise." },
      { name: "Polokwane",    text: "Black Leopards, SABC, kykNET and the international folders people ask for across Limpopo." },
    ],
  },
  setup: {
    title: "10-minute install",
    sub: "Works on Firestick, Smart TV, iPhone, Android and more. We walk you through every step.",
    button: "Get install help",
    steps: [
      { step: "1", text: "Message us on WhatsApp and tell us which device you have." },
      { step: "2", text: "Pick your plan and pay via EFT, SnapScan, Zapper or card." },
      { step: "3", text: "Receive your M3U link and step-by-step guide, then start watching." },
    ],
  },
  international: {
    eyebrow: "SA WORLDWIDE",
    title: "Mzansi Stream — for South Africans anywhere in the world",
    sub: "Live channels in 4K where your line allows. Built for the SA diaspora in the UK, Australia, New Zealand, USA, UAE, Canada, Germany and beyond. SuperSport-style, SABC and kykNET folders — confirm them on the 24h trial.",
    tagline: "Tap your country to see its page.",
    selectCountry: "Pick your country",
    benefitsTitle: "South African TV for people living abroad",
    benefits: [
      { icon: "🌍", title: "Used by SA expats abroad", desc: "Edges in the regions we publish on the country pages. 4K depends on your broadband — test it. We don't publish a country count." },
      { icon: "📺", title: "SA channel folders",      desc: "SABC, e.tv, SuperSport-style sport and kykNET are the usual folders — confirm names on the 24h trial." },
      { icon: "⚡", title: "No geo-blocking",        desc: "The service works without a VPN. You don't need a separate SA decoder rental to watch SABC abroad." },
      { icon: "💬", title: "Support in English",    desc: "WhatsApp support in English (and Afrikaans on request)." },
    ],
    cta: "Order via WhatsApp",
    ctaSecondary: "My country isn't listed",
  },
  footer: {
    rights: "All rights reserved.",
    note: "Picture quality depends on your line — test it on the 24h trial.",
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
      { title: "Activation", desc: "On WhatsApp" },
      { title: "No contract", desc: "Pay once" },
      { title: "Guarantee", desc: "Satisfaction" },
      { title: "Support", desc: "On WhatsApp" },
    ],
    waIntro: "Hi! I'd like to order Mzansi Stream 👇",
    waContext: "From page",
    waNotesLabel: "Notes",
  },
  bot: {
    name: "Lerato",
    greeting1: "Hi there! 👋 I'm Lerato.",
    greeting2: "I can help with pricing, the free trial or the install. What would you like to know?",
    price1: "Plans start at R99/month — 1, 3, 6 or 12 months. All include the same line-up, EPG and WhatsApp support.",
    price2: "Want to see the pricing or try it free for 24h first?",
    install1: "Firestick and Smart TV both work. Install takes about 10 minutes.",
    install2: "I'll send the step-by-step guide on WhatsApp now.",
    trial1: "Of course! We offer a 24-hour free trial — no card, no commitment.",
    trial2: "Tap below and I'll send the trial link directly on WhatsApp.",
    channels1: "The line-up has SABC, SuperSport-style, Premier League, kykNET and M-Net folders, plus African and international content — confirm what you need on WhatsApp.",
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
    activated: "Activated on WhatsApp",
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
    pill: "Premium 4K · Geen kontrak · 24 uur gratis",
    titleA: "Beste IPTV Suid-Afrika.",
    titleB: "Direk op jou skerm.",
    lead: "Lewendige kanale in 4K, sport, films en reekse. SuperSport, DStv Premiership, Premier League, kykNET — bevestig die lys op WhatsApp. Geen kontrak. Beeldgehalte hang van jou lyn af.",
    ctaPrices: "Sien pryse",
    ctaAdvisor: "Praat met 'n raadgewer",
    trust: "Geen kontrak · WhatsApp-aktivering · Toets dit op jou eie lyn",
  },
  trial: {
    badge: "GRATIS PROEF",
    title: "Probeer dit gratis vir 24 uur",
    sub: "Geen kaart, geen verbintenis. Stuur ons 'n WhatsApp-boodskap en probeer die diens op jou Smart TV, Firestick, foon of tablet.",
    cta: "Vra nou jou gratis proeftydperk aan",
    note: "Geen kontrak. Geen outomatiese heffings.",
  },
  offers: {
    title: "Kies jou pakket",
    sub: "Elke pakket het dieselfde kanaallys, films en reekse, EPG en WhatsApp-ondersteuning. Bevestig die lys op WhatsApp.",
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
      { step: "3", text: "Ontvang jou M3U-skakel en gids, en begin kyk." },
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
    pill: "4K Premium · Sans engagement · Essai 24h",
    titleA: "Meilleure IPTV Afrique du Sud.",
    titleB: "Direct sur votre écran.",
    lead: "Chaînes en direct en 4K, sport, films et séries. SuperSport, DStv Premiership, Premier League, kykNET — catalogue à confirmer sur WhatsApp. Sans engagement. La qualité dépend de votre ligne.",
    ctaPrices: "Voir les tarifs",
    ctaAdvisor: "Parler à un conseiller",
    trust: "Sans engagement · Activation WhatsApp · À tester sur votre ligne",
  },
  trial: {
    badge: "ESSAI GRATUIT",
    title: "Essayez gratuitement pendant 24h",
    sub: "Sans carte, sans engagement. Contactez-nous sur WhatsApp et testez le service sur votre Smart TV, Firestick, téléphone ou tablette.",
    cta: "Demander mon essai gratuit",
    note: "Sans engagement. Sans prélèvement automatique.",
  },
  offers: {
    title: "Choisissez votre forfait",
    sub: "Chaque forfait a la même grille, films et séries, EPG et support WhatsApp. Catalogue à confirmer sur WhatsApp.",
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
      { step: "3", text: "Recevez votre lien M3U et le guide, puis lancez la TV." },
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
      { title: "Activation", desc: "Sur WhatsApp" },
      { title: "Sans engagement", desc: "Paiement unique" },
      { title: "Garantie", desc: "Satisfaction" },
      { title: "Support", desc: "Sur WhatsApp" },
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
    titleB: "SuperSport, ku-4K kusukela ku-R99/inyanga.",
    ctaPrices: "Bona izinhlelo",
    ctaAdvisor: "Khuluma nomeluleki",
    trust: "Akukho nkontileka",
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
    titleB: "SuperSport ku-4K ukusuka ku-R99/inyanga.",
    ctaPrices: "Jonga izicwangciso",
    ctaAdvisor: "Thetha necebo",
    trust: "Akukho sivumelwano",
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
    pill: "4K Premium · Sem fidelização · Teste 24h",
    titleA: "Melhor IPTV Moçambique 2026.",
    titleB: "DStv, SuperSport, canais em 4K.",
    lead: "Canais ao vivo em 4K, desporto, filmes e séries. SuperSport, Premier League, TVM, RTP África — confirme a grelha no WhatsApp. Sem fidelização. A qualidade depende da sua ligação.",
    ctaPrices: "Ver planos",
    ctaAdvisor: "Falar com um consultor",
    trust: "Sem fidelização · Ativação no WhatsApp · Teste na sua própria ligação",
  },
  trial: {
    badge: "TESTE GRÁTIS",
    title: "Experimente grátis por 24 horas",
    sub: "Sem cartão, sem compromisso. Fale connosco no WhatsApp e teste o serviço na sua Smart TV, Firestick, telemóvel ou tablet.",
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
    titleB: "DStv-style channels and SuperSport in 4K.",
    lead: "Live channels in 4K, sport, movies and series. SuperSport-style, Premier League, ZBC TV and DStv-style folders — line-up to confirm on WhatsApp. No contract, no decoder. Picture quality depends on your line.",
    trust: "No contract · Pay in USD, EcoCash or OneMoney · Test it on your own line",
  },
};

// English diaspora variants share en-ZA copy unless a locale needs its
// own claims. en-gb homepage is live in the UK: soft-sell only — no
// every-match guarantees, no invented expat counts, no 100x, no ratings.
const enGB: Copy = {
  ...enZA,
  hero: {
    ...enZA.hero,
    lead:
      "Live channels in 4K, sport, movies and series. SuperSport-style folders, DStv Premiership, Premier League, kykNET — line-up to confirm on WhatsApp. No contract. Trial it on your UK Wi-Fi before you pay.",
    trust:
      "South African TV for the UK diaspora · WhatsApp +44 7307 410512 · No contract",
  },
  planPerks: {
    ...enZA.planPerks,
    p6: ["Best value for money", "SA + sport folders to trial", "Up to 3 devices", "EPG + Catch-up TV", "Same line-up as every plan"],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "Can I watch SABC, e.tv and SA free-to-air channels?",
        a: "SABC 1, 2 and 3, e.tv and the usual SA free-to-air names are the folders most UK viewers look for. Confirm what actually plays on your 24h trial — we don’t list this as a complete official line-up.",
      },
      {
        q: "Can I watch the DStv Premiership and the Premier League?",
        a: "SuperSport-style PSL and Premier League folders are what people usually ask for. We don’t guarantee every match feed or every official broadcast. Tell us the fixtures you care about on WhatsApp +44 7307 410512 and test them on a short trial.",
      },
      { q: "Is it compatible with TiviMate, IPTV Smarters and Smart TV?", a: "Yes. Works with TiviMate, IPTV Smarters Pro, GSE Smart IPTV and any standard M3U app. We send the M3U link directly via WhatsApp." },
      { q: "Which devices are supported?", a: "Smart TVs (Samsung, LG, Sony), Firestick / Fire TV, Android TV, iPhone, iPad, Android, Android TV Box, MAG Box and PC/Mac. We guide the install for your specific device." },
      { q: "How fast is activation?", a: "Activation is done on WhatsApp after we receive your order and payment. We don't publish a fixed delay." },
      { q: "Is the EPG guide included?", a: "Yes. The full Electronic Programme Guide is included in every plan so you always know what's on now and what's coming up." },
      { q: "Can I watch on multiple devices at the same time?", a: "The standard plan includes one connection. If you need multi-screen for the whole household, message us on WhatsApp and we'll set up a tailored plan." },
      { q: "Do I need a VPN?", a: "Not required in South Africa, but we recommend one for extra privacy. We can advise on the best VPN for the service." },
      { q: "Does it work outside South Africa?", a: "Yes — it works for South Africans in the UK and other countries. For best results outside SA we recommend a VPN. The 24h trial is how you check your own connection." },
      { q: "How do I pay?", a: "Payment is handled on WhatsApp. We accept EFT, SnapScan, Zapper, Yoco, Ozow, Capitec Pay, Visa, Mastercard, PayPal and Bitcoin." },
      { q: "What if the service goes down?", a: "Message us directly on WhatsApp +44 7307 410512. We treat outages as a support job, not a promise that nothing will ever drop." },
      { q: "Is there a contract? Can I cancel?", a: "No contract and no auto-renewal. You pay once and the service ends at the end of the chosen period. If you want to continue, you renew it manually." },
      {
        q: "Is Mzansi Stream a DStv alternative?",
        a: "Mzansi Stream is a DStv-style alternative for South African channels — playlist categories, not an exclusive MultiChoice licence. We don’t claim every DStv Premium channel or “100x more”. Trial the folders you actually watch, then decide.",
      },
      {
        q: "Do you cover the Springboks rugby and the URC?",
        a: "Many SA fans in the UK use IPTV to follow Springboks and URC over home broadband. Rights and blackouts still apply — we don’t promise every official feed for every fixture. Use a short trial to see what plays on your UK connection. WhatsApp +44 7307 410512.",
      },
      {
        q: "Can I watch the IPL cricket and Proteas matches?",
        a: "SuperSport Cricket / Star Sports-style folders are the usual ask for Proteas and IPL. We don’t guarantee every match or every official feed. Message +44 7307 410512 with the upcoming games and test them first.",
      },
      {
        q: "Will it work with Vumatel, Openserve and other SA fibre?",
        a: "On a UK connection, stability depends on your Wi-Fi and ISP. In South Africa we also see it on the usual fibre networks. The 24h trial is the proof on your line — not a guarantee for every network.",
      },
      {
        q: "Soft legal — is this “free illegal streams” or 100% cleared for every Springboks game?",
        a: "No. We don’t offer or market “free illegal streams,” and we never claim “100% legal streams of [network/event].” We give no legal opinion and make no legality or licence claim; licensing, rights, and blackouts still apply. Trial first, keep expectations honest, then decide.",
      },
    ],
  },
  cities: {
    ...enZA.cities,
    items: [
      { name: "Johannesburg", text: "A cheaper DStv-style option for Joburg households. SuperSport-style folders, Premier League, kykNET and SABC — confirm what you need on the trial." },
      { name: "Cape Town",    text: "Cape Town viewers usually ask for Stormers, Cape Town City FC, URC and PSL folders. We don’t promise every fixture — test the ones you care about first." },
      { name: "Durban",       text: "Built for Durban: AmaZulu FC, Sharks rugby, Indian channels for the local community and the international folders people actually use." },
      { name: "Pretoria",     text: "Mamelodi Sundowns, Bulls rugby, kykNET dramas and the SABC + e.tv pack — install in about 10 minutes via WhatsApp." },
      { name: "Gqeberha",     text: "Eastern Cape setup — Chippa United, EP Elephants and the major national folders, confirmed on trial." },
      { name: "Bloemfontein", text: "Bloemfontein Celtic, Free State Cheetahs and SuperSport-style rugby folders with English-language WhatsApp support." },
      { name: "East London",  text: "Streaming in EL over a local line — PSL and Premier League folders to test, not an every-match promise." },
      { name: "Polokwane",    text: "Black Leopards, SABC, kykNET and the international folders people ask for across Limpopo." },
    ],
  },
  international: {
    ...enZA.international,
    benefitsTitle: "Why South Africans in the UK pick Mzansi Stream",
    benefits: [
      { icon: "🌍", title: "Built for SA viewers abroad", desc: "European edges for a London or Manchester lounge. Trial 4K on your own UK broadband — we don’t invent viewer counts." },
      { icon: "📺", title: "SA channel folders",      desc: "SABC, e.tv, SuperSport-style sport and kykNET are the usual folders — confirm names on the 24h trial." },
      { icon: "⚡", title: "No SA decoder rental",        desc: "You don’t need a decoder sitting in someone’s Joburg lounge. A VPN can still help privacy and some routes." },
      { icon: "💬", title: "Support in English",    desc: "WhatsApp +44 7307 410512, in English (and Afrikaans on request)." },
    ],
  },
  whatsapp: {
    ...enZA.whatsapp,
    generic: "Hi! I'm in the UK. I need information about Mzansi Stream.",
    trial: "Hi! I'm in the UK. I'd like a free 24-hour trial of Mzansi Stream for SA channels / Springboks. Device: [Firestick / Smart TV].",
  },
};
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

