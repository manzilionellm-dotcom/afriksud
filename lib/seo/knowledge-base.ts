// lib/seo/knowledge-base.ts
// Knowledge Base — the most-searched "how / which / what" questions.
// Served at /[locale]/knowledge-base/[slug]/. Each article is
// answer-first (the lead is a self-contained answer surfaced in the
// DirectAnswerBlock), carries original FAQ + FAQPage schema, and the
// route renders a visible "Last updated" date (showUpdated). Reuses the
// `Pillar` shape + PillarTemplate; route passes pathPrefix="/knowledge-base".

import type { Pillar } from "./pillars";
import type { Locale } from "../locales";

const ZA: Locale = "en-za";

export const KB_ARTICLES: Pillar[] = [
  // ─── HOW TO INSTALL IPTV ────────────────────────────────────────────
  {
    slug: "how-to-install-iptv",
    eyebrow: "Knowledge Base · Getting started",
    h1: "How to Install IPTV in South Africa — the Complete Guide",
    metaTitle: "How to Install IPTV (2026) — Any Device, Step by Step",
    metaDescription:
      "How to install IPTV in South Africa in 2026 — pick a player, log in with Xtream Codes or a MAC address, load channels and EPG. Firestick, Smart TV, box or phone. From R99/mo.",
    lead:
      "Installing IPTV takes three steps on any device: install a player app (IPTV Smarters Pro, TiviMate, IBO Player or your box's built-in player), log in with the Xtream Codes URL/username/password we send on WhatsApp — or a MAC address on a Samsung/LG TV — and let it load the channels and EPG. Start to finish it's about ten minutes, and the same login works on every screen in the house.",
    trustLine:
      "Any device · Xtream Codes or MAC · ~10 minutes · one login, every screen",
    cta: {
      primary: {
        label: "Start my install — free 24h trial →",
        message:
          "Hi! I want to install Mzansi Stream. My device is ___ — please send my login and setup steps for the free 24-hour trial.",
        ref: "KB-Install-Hero",
      },
      secondary: { label: "Jump to the steps →", href: "#steps" },
    },
    sections: [
      {
        id: "choose-player",
        h2: "Step 1 — choose the right player for your device",
        paragraphs: [
          "IPTV is delivered through a player app, and the best one depends on your device. There's no single 'IPTV app' — you pick a player, then log in with your Mzansi Stream credentials.",
        ],
        bullets: [
          "Firestick / Fire TV / Android TV → TiviMate, XCIPTV or IPTV Smarters Pro.",
          "Samsung (Tizen) / LG (webOS) → IBO Player, Duplex Play or Sparkle TV.",
          "iPhone / iPad → IPTV Smarters Player.",
          "Dedicated box → Formuler Z (MYTVOnline) or a MAG box (Stalker portal).",
          "Windows / macOS → IPTV Smarters desktop or VLC.",
        ],
      },
      {
        id: "steps",
        h2: "Step 2 — install and log in, step-by-step",
        steps: [
          {
            title: "Get your login from WhatsApp",
            text: "Message us for the free 24-hour trial. We send your Xtream Codes Server URL, username and password (or a Stalker portal / MAC setup for a MAG-style box).",
          },
          {
            title: "Install the player",
            text: "Install your chosen app from the device's store. On a Firestick, side-load TiviMate/STB Emu with the free Downloader app; everywhere else it's a normal store install.",
          },
          {
            title: "Log in with Xtream Codes",
            text: "Open the app, choose 'Login with Xtream Codes API', and enter the URL, username and password exactly as sent (keep the http/https prefix and port).",
          },
          {
            title: "Samsung / LG: use MAC-and-key instead",
            text: "On IBO/Duplex/Sparkle, the TV shows a MAC address and device key — send us those two and we upload your playlist from our side. Nothing long to type on the remote.",
          },
          {
            title: "Load channels and EPG",
            text: "The app pulls Live TV, Movies, Series and the 7-day EPG. First load takes 30–60 seconds for the full 20,000+ channels.",
          },
          {
            title: "Test and save favourites",
            text: "Play SuperSport or Premier League to confirm it works, then add your regular channels to Favourites so they're one tap away.",
          },
        ],
      },
      {
        id: "after",
        h2: "Step 3 — after install: get it stable",
        paragraphs: [
          "Once it's working, two quick moves make it rock-solid: connect the device over Ethernet (or 5GHz Wi-Fi) so live sport doesn't buffer, and pick the 4K/FHD feed of your favourite channels for the sharpest picture. If anything misbehaves, the Help Center has an answer-first fix for every common issue.",
        ],
      },
    ],
    faq: [
      {
        q: "How do I install IPTV on my TV?",
        a: "Install a player app — IPTV Smarters Pro, TiviMate or IBO Player depending on your TV — then log in with the Xtream Codes URL, username and password we send on WhatsApp (or a MAC address on Samsung/LG). It loads the channels and EPG in under a minute. The whole install is about ten minutes.",
      },
      {
        q: "Which app do I need to install IPTV?",
        a: "It depends on the device: TiviMate, XCIPTV or IPTV Smarters Pro on Firestick/Android; IBO Player, Duplex Play or Sparkle TV on Samsung/LG; IPTV Smarters Player on iPhone/iPad; MYTVOnline on a Formuler box. We tell you the best one for your device when you start the trial.",
      },
      {
        q: "How long does it take to install IPTV?",
        a: "About ten minutes from getting your login to watching. Installing the app is quick; the only wait is 30–60 seconds while the player loads the full 20,000+ channel list and the 7-day EPG the first time.",
      },
      {
        q: "Can I install IPTV on more than one device?",
        a: "Yes. The same Mzansi Stream login works on every device — Firestick, Smart TV, phone, tablet, PC. Set it up on one now and add the others any time; just mind your plan's connection limit if several stream at once.",
      },
      {
        q: "Do I need any technical skill to install IPTV?",
        a: "No. If you can install an app and type a username and password, you can install IPTV. On Samsung/LG it's even simpler — you send us a MAC address and we load the playlist for you. And we'll walk you through it on WhatsApp if you get stuck.",
      },
    ],
    related: [
      { label: "All IPTV apps & players", href: "/apps/" },
      { label: "All device install guides", href: "/devices/" },
      { label: "Which platform should I choose?", href: "/knowledge-base/which-iptv-platform-to-choose/" },
      { label: "Network requirements for IPTV", href: "/knowledge-base/iptv-network-requirements/" },
      { label: "Help Center — troubleshooting", href: "/help/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-25",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── WHICH PLATFORM TO CHOOSE ───────────────────────────────────────
  {
    slug: "which-iptv-platform-to-choose",
    eyebrow: "Knowledge Base · Choosing",
    h1: "Which Device or Platform Should I Choose for IPTV?",
    metaTitle: "Which IPTV Device to Choose (2026) — Firestick vs TV vs Box",
    metaDescription:
      "Which device is best for IPTV in South Africa? Compare Firestick, Smart TV, Android box, Formuler and phone for Mzansi Stream — cost, 4K, ease and stability. Answer-first guide.",
    lead:
      "For most South Africans the best-value way to run IPTV is an Amazon Firestick 4K plugged into any TV — cheap, portable and it runs the best players. If you want the most stable 4K for live sport, a dedicated box (Formuler Z or a good Android TV box on Ethernet) is worth it. Use your Smart TV's built-in app only if you'd rather not add hardware. Your Mzansi Stream subscription works on all of them.",
    trustLine:
      "Firestick = best value · box = most stable 4K · Smart TV = no extra hardware",
    cta: {
      primary: {
        label: "Not sure? Ask us on WhatsApp →",
        message:
          "Hi! I'm choosing a device for Mzansi Stream. I have a ___ TV and mainly watch ___ — what do you recommend?",
        ref: "KB-Platform-Hero",
      },
      secondary: { label: "Jump to the comparison →", href: "#compare" },
    },
    sections: [
      {
        id: "compare",
        h2: "The options compared",
        bullets: [
          "Amazon Firestick 4K (~R700–R1,000) — best all-round value; runs TiviMate, XCIPTV, IPTV Smarters; portable between TVs. Add a USB-Ethernet adapter for rock-solid 4K.",
          "Android TV box (~R700–R2,000) — more RAM and an Ethernet port; great for a permanent lounge setup.",
          "Formuler Z (~R2,000+) — dedicated IPTV hardware with MYTVOnline; the most DStv-decoder-like experience and very stable 4K.",
          "Smart TV built-in (Samsung/LG/Hisense/Sony) — no extra hardware; use IBO/Duplex/Sparkle or IPTV Smarters. Built-in Wi-Fi is the usual weak point.",
          "Phone / tablet (iPhone, iPad, Android) — handy as a second screen or for travel; AirPlay/Cast to the TV.",
          "MAG box (~R1,500) — a plug-and-play Stalker-portal box for people who want zero apps.",
        ],
      },
      {
        id: "by-need",
        h2: "Pick by what matters most to you",
        bullets: [
          "Cheapest way to start → Firestick 4K on your existing TV.",
          "Most stable 4K for SuperSport → Formuler Z or an Android box on Ethernet.",
          "No new hardware → your Smart TV's built-in app.",
          "Simplest, no-apps experience → MAG box (we whitelist your MAC).",
          "Watching in bed / travelling → phone or tablet with IPTV Smarters.",
          "Mixed household (Apple + Samsung + Firestick) → IPTV Smarters Pro everywhere for one shared layout.",
        ],
      },
      {
        id: "advice",
        h2: "Our honest recommendation",
        paragraphs: [
          "If you're starting out, buy a Firestick 4K and a R250 USB-Ethernet adapter. It's the lowest-cost path to a great experience, it's portable, and it runs the best players. Upgrade to a Formuler Z or an Android box on Ethernet only if you're a heavy live-sport household that wants the steadiest possible 4K. Don't over-buy — a Smart TV you already own plus a good player is often all you need.",
        ],
      },
    ],
    faq: [
      {
        q: "What's the best device for IPTV in South Africa?",
        a: "For most people, an Amazon Firestick 4K — it's cheap (~R700–R1,000), portable and runs the best players like TiviMate and IPTV Smarters. Add a USB-Ethernet adapter for stable 4K. Heavy live-sport households may prefer a Formuler Z or an Android box on Ethernet.",
      },
      {
        q: "Should I use my Smart TV's built-in app or buy a Firestick?",
        a: "A Smart TV app (IBO, Duplex, Sparkle or IPTV Smarters) means no extra hardware, but built-in TV Wi-Fi is often the weak link for 4K. A Firestick 4K with Ethernet is more reliable and runs better players. If your TV already streams other apps smoothly, the built-in route is fine.",
      },
      {
        q: "Is a Formuler or Android box worth it over a Firestick?",
        a: "For heavy live-sport viewers, yes. A Formuler Z or a good Android box has more RAM and an Ethernet port, so 4K SuperSport holds steady during a busy matchday. For casual viewing, a Firestick 4K does the job for a fraction of the price.",
      },
      {
        q: "Does the device change what channels I get?",
        a: "No. Your Mzansi Stream subscription provides the same 20,000+ channels, Movies, Series and EPG on every device. The device only affects picture ceiling (4K vs 1080p), stability and ease of setup — not the content.",
      },
      {
        q: "Can I use one subscription across different platforms?",
        a: "Yes. One login works on Firestick, Smart TV, box, phone and PC at once (up to your plan's connection limit). Many households mix a lounge box, a bedroom Firestick and a couple of phones on a single subscription.",
      },
    ],
    related: [
      { label: "All device install guides", href: "/devices/" },
      { label: "All IPTV apps & players", href: "/apps/" },
      { label: "IPTV on Firestick / Fire TV", href: "/iptv-firestick-south-africa/" },
      { label: "How to install IPTV", href: "/knowledge-base/how-to-install-iptv/" },
      { label: "Best IPTV in South Africa 2026", href: "/best-iptv-south-africa-2026/" },
    ],
    hasHowTo: false,
    datePublished: "2026-06-25",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── NETWORK REQUIREMENTS ───────────────────────────────────────────
  {
    slug: "iptv-network-requirements",
    eyebrow: "Knowledge Base · Network",
    h1: "IPTV Network Requirements — Speed, Router and Wi-Fi",
    metaTitle: "IPTV Network Requirements (2026) — Speed & Router (SA)",
    metaDescription:
      "What internet speed do you need for IPTV? Mzansi Stream network requirements — Mbps for HD vs 4K, Wi-Fi vs Ethernet, router and fibre ISPs in South Africa. Answer-first guide.",
    lead:
      "For IPTV you need about 10 Mbps per HD stream and 25 Mbps per 4K stream — so a 50–100 Mbps SA fibre line comfortably runs several TVs at once. What matters more than raw speed is a stable connection: Ethernet or 5GHz Wi-Fi, a decent router, and an ISP that peers at NAPAfrica. Mzansi Stream's CDN sits at NAPAfrica in Johannesburg and Cape Town, so a modest, stable line beats a fast, congested one.",
    trustLine:
      "~10 Mbps HD · ~25 Mbps 4K · stability > speed · NAPAfrica-peered CDN",
    cta: {
      primary: {
        label: "Check your line — free 24h trial →",
        message:
          "Hi! I want to test Mzansi Stream on my line. My ISP is ___ and my speed is ___ Mbps — please send the free trial.",
        ref: "KB-Network-Hero",
      },
      secondary: { label: "Jump to the numbers →", href: "#numbers" },
    },
    sections: [
      {
        id: "numbers",
        h2: "How much speed you actually need",
        bullets: [
          "SD stream — ~5 Mbps.",
          "HD (720p/1080p) stream — ~10 Mbps.",
          "Full HD/FHD stream — ~15 Mbps.",
          "4K/UHD stream — ~25 Mbps steady.",
          "Two 4K TVs at once — ~50 Mbps; add ~25 Mbps per extra 4K screen.",
          "Any 25+ Mbps uncapped SA fibre line runs 4K IPTV fine; 50–100 Mbps covers a whole household.",
        ],
      },
      {
        id: "stability",
        h2: "Why stability beats speed",
        paragraphs: [
          "A 100 Mbps line that peers directly at NAPAfrica beats a 500 Mbps line that routes overseas before reaching an SA IPTV server. Once you're past ~50 Mbps, latency, jitter and peering matter more than more Mbps. That's why a Firestick on shaky 2.4GHz Wi-Fi buffers a stream that the same line handles perfectly over Ethernet.",
          "Mzansi Stream's CDN edges are at NAPAfrica in Johannesburg and Cape Town — the exchange every major SA ISP peers at — so a Vumatel, Openserve or Frogfoot line reaches the stream in under 15ms.",
        ],
      },
      {
        id: "setup",
        h2: "Get your network IPTV-ready",
        bullets: [
          "Prefer Ethernet — the single biggest stability gain; wire the Firestick (USB-Ethernet adapter ~R250), box or TV.",
          "On Wi-Fi, use 5GHz, not 2.4GHz, and stay near the router.",
          "Replace an old ISP-branded router with a Wi-Fi 6 model (Archer AX55 ~R1,300) if 5GHz is capped.",
          "Set DNS to 8.8.8.8 / 1.1.1.1 for faster channel loading.",
          "Fibre is ideal; Rain 5G and MTN Wi-Fi work well; capped LTE is workable for HD.",
        ],
      },
      {
        id: "isps",
        h2: "Which SA ISPs work best?",
        paragraphs: [
          "Every major SA fibre ISP handles Mzansi Stream in 4K on a stable line: Vumatel, Openserve, Frogfoot, Octotel, MetroFibre, MTN Fibre and Vodacom Fibre all peer at NAPAfrica. Rain 5G streams 4K cleanly on most home setups with slightly more jitter. No SA ISP throttles IPTV — the traffic is encrypted HLS/M3U, indistinguishable from YouTube or Netflix.",
        ],
      },
    ],
    faq: [
      {
        q: "What internet speed do I need for IPTV?",
        a: "About 10 Mbps per HD stream and 25 Mbps per 4K stream. A 50–100 Mbps SA fibre line comfortably runs several TVs at once. Any uncapped 25+ Mbps line handles 4K; stability matters more than raw speed once you're past ~50 Mbps.",
      },
      {
        q: "Is my fibre fast enough for 4K IPTV?",
        a: "If it's a stable 25 Mbps or more, yes — one 4K stream needs about 25 Mbps steady. For multiple 4K TVs, add ~25 Mbps each. On SA fibre (Vumatel, Openserve, Frogfoot, etc.) the line is rarely the issue; local Wi-Fi usually is.",
      },
      {
        q: "Do I need Ethernet, or is Wi-Fi okay for IPTV?",
        a: "Wi-Fi works, but Ethernet is the single biggest stability upgrade — it removes the jitter that causes most buffering. If you must use Wi-Fi, use the 5GHz band and stay near the router. A USB-Ethernet adapter for a Firestick is about R250 and worth it.",
      },
      {
        q: "Will my ISP throttle IPTV?",
        a: "No. In 2026 no major SA ISP throttles IPTV. The traffic is encrypted HLS/M3U over HTTPS — the same wire format as YouTube and Netflix — so there's nothing to single out. If a stream drops, it's your Wi-Fi or a rare ISP congestion event, not deliberate throttling.",
      },
      {
        q: "Does IPTV work on Rain 5G or LTE?",
        a: "Yes. Rain 5G and MTN fixed-wireless stream Mzansi Stream in 4K on most home setups, with slightly more jitter than fibre. Capped or throttled LTE is workable for HD but not ideal for steady 4K. For heavy 4K sport, fibre on Ethernet is best.",
      },
    ],
    related: [
      { label: "IPTV with no buffering", href: "/iptv-no-buffering-south-africa/" },
      { label: "IPTV for Vumatel, Openserve & Frogfoot", href: "/iptv-vumatel-openserve-frogfoot/" },
      { label: "Network error — Help Center fix", href: "/help/iptv-network-error/" },
      { label: "How to install IPTV", href: "/knowledge-base/how-to-install-iptv/" },
      { label: "All Knowledge Base articles", href: "/knowledge-base/" },
    ],
    hasHowTo: false,
    datePublished: "2026-06-25",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── IMPROVE VIDEO QUALITY ──────────────────────────────────────────
  {
    slug: "improve-iptv-video-quality",
    eyebrow: "Knowledge Base · Picture quality",
    h1: "How to Improve IPTV Video Quality",
    metaTitle: "Improve IPTV Video Quality (2026) — Get Sharp 4K (SA)",
    metaDescription:
      "Get the sharpest IPTV picture — pick the 4K/FHD feed, enable hardware decoding, fix TV picture settings and give 4K enough bandwidth. Mzansi Stream video-quality guide.",
    lead:
      "To get the best IPTV picture, pick the 4K or FHD version of the channel (many have SD, HD and 4K feeds), turn on hardware decoding in your player, set your TV's picture mode off 'eco', and give a 4K stream the ~25 Mbps steady bandwidth it needs. Mzansi Stream carries SuperSport and Premier League in up to 4K where the source allows — choosing the right feed is usually the biggest single improvement.",
    trustLine:
      "Pick the 4K feed · hardware decoding · TV picture mode · enough bandwidth",
    cta: {
      primary: {
        label: "Get the 4K feeds — message us →",
        message:
          "Hi! I want the sharpest picture on Mzansi Stream. My TV is ___ and device is ___ — which categories have the 4K feeds?",
        ref: "KB-Quality-Hero",
      },
      secondary: { label: "Jump to the tips →", href: "#tips" },
    },
    sections: [
      {
        id: "tips",
        h2: "The four things that improve picture most",
        bullets: [
          "Pick the right feed — choose the '4K', 'UHD' or 'FHD' version of the channel, not the SD one. This is the #1 fix.",
          "Enable hardware decoding — in TiviMate/IPTV Smarters/XCIPTV, use Hardware or Hardware+ so the device's chip decodes for a cleaner image.",
          "Fix TV picture settings — switch off 'Eco' to Standard/Cinema/Filmmaker, set HDMI to full range, nudge sharpness up.",
          "Give 4K bandwidth — ~25 Mbps steady; Ethernet or 5GHz so it doesn't auto-drop resolution.",
        ],
      },
      {
        id: "device",
        h2: "Make sure your device can output 4K",
        paragraphs: [
          "A basic (non-4K) Firestick or an old box caps at 1080p no matter which feed you pick. For true 4K, use a Firestick 4K, a 4K Android box, a Formuler Z, or your TV's built-in 4K app, connected with an HDMI 2.0 cable straight into the TV (splitters and old cables break the 4K/HDCP handshake).",
        ],
      },
      {
        id: "why-drops",
        h2: "Why picture sometimes drops mid-stream",
        paragraphs: [
          "If the picture starts sharp then goes soft during a match, the stream is auto-dropping resolution because the link can't sustain 4K bandwidth at peak time. That's a network issue, not source quality. Hard-wire over Ethernet, or use the FHD feed which holds steady on a busy network. The Help Center's video-quality and buffering guides cover this in detail.",
        ],
      },
    ],
    faq: [
      {
        q: "How do I make my IPTV picture sharper?",
        a: "Pick the 4K or FHD version of the channel (not SD), enable hardware decoding in your player, and set your TV's picture mode off 'eco' to Standard or Cinema. Those three changes fix most soft-picture complaints. For true 4K, use a 4K-capable device on Ethernet or 5GHz.",
      },
      {
        q: "Why is my IPTV in SD when I'm paying for 4K?",
        a: "You're likely watching the SD entry of a channel that also has a 4K/FHD feed. In your player, select the '4K' or 'UHD' version of SuperSport or Premier League. If you're not sure which category holds the 4K feeds, message us and we'll point you to them.",
      },
      {
        q: "Does hardware decoding improve picture quality?",
        a: "Yes — it uses your device's dedicated video chip instead of the CPU, giving a cleaner, smoother image and fewer artefacts, especially on 4K. Turn on Hardware or Hardware+ in TiviMate, IPTV Smarters or XCIPTV. Only switch to software decoding if a specific channel glitches.",
      },
      {
        q: "My TV settings — what should they be for IPTV?",
        a: "Set the picture mode to Standard, Cinema or Filmmaker (not Eco/Dynamic), set the HDMI input to full range or '4K', and raise sharpness slightly. On Samsung, disable Eco Solution which dims the panel. These help every source look its best, IPTV included.",
      },
      {
        q: "Why does the quality drop during live sport?",
        a: "The stream auto-drops resolution when the connection can't sustain 4K at peak time — a bandwidth issue, not the source. Hard-wire the device over Ethernet, or use the FHD feed which stays steady on a busy network. See the Help Center buffering guide for the full fix.",
      },
    ],
    related: [
      { label: "Video quality — Help Center fix", href: "/help/iptv-video-quality/" },
      { label: "4K IPTV in South Africa", href: "/4k-iptv-south-africa/" },
      { label: "Network requirements for IPTV", href: "/knowledge-base/iptv-network-requirements/" },
      { label: "Buffering — how to stop it", href: "/help/iptv-buffering/" },
      { label: "All Knowledge Base articles", href: "/knowledge-base/" },
    ],
    hasHowTo: false,
    datePublished: "2026-06-25",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── FEATURES AVAILABLE ─────────────────────────────────────────────
  {
    slug: "iptv-features",
    eyebrow: "Knowledge Base · Features",
    h1: "What Features Does IPTV Include? (EPG, Catch-Up, VOD)",
    metaTitle: "IPTV Features (2026) — EPG, Catch-Up, VOD, Recording (SA)",
    metaDescription:
      "What can IPTV do? Mzansi Stream features — 20,000+ live channels, 7-day EPG, catch-up TV, Movies & Series VOD, recording, multi-screen and 4K. What's included and how it works.",
    lead:
      "Mzansi Stream includes far more than live channels: a 20,000+ channel lineup, a full 7-day EPG (TV guide), 7-day catch-up on major channels, a large Movies and Series on-demand (VOD) library, 4K/UHD where the source allows, multi-screen viewing, and recording on players that support it (TiviMate, MYTVOnline). What you can use depends partly on your player, but the core — live TV, EPG, catch-up and VOD — works everywhere.",
    trustLine:
      "20,000+ channels · 7-day EPG · catch-up · Movies & Series VOD · 4K · multi-screen",
    cta: {
      primary: {
        label: "See it all — free 24h trial →",
        message:
          "Hi! I'd like the free 24-hour Mzansi Stream trial to see the channels, EPG, catch-up and VOD. My device is ___.",
        ref: "KB-Features-Hero",
      },
      secondary: { label: "Jump to the feature list →", href: "#features" },
    },
    sections: [
      {
        id: "features",
        h2: "What's included",
        bullets: [
          "20,000+ live channels — SA (SuperSport, SABC, kykNET, M-Net), UK, US, sports, kids, news, international.",
          "7-day EPG — a full electronic programme guide so you can see what's on now and later.",
          "Catch-up TV — rewind up to 7 days on major channels to watch something you missed.",
          "Movies & Series (VOD) — a large on-demand library that plays like Netflix/Showmax.",
          "4K / UHD — SuperSport and Premier League in up to 4K where the source allows.",
          "Multi-screen — one subscription on several devices at once (up to your plan's connection limit).",
          "Recording — on players that support it (TiviMate Premium, Formuler MYTVOnline) to a USB drive.",
          "Favourites & multiple profiles-style groups — organise channels per device.",
        ],
      },
      {
        id: "by-player",
        h2: "Which features depend on your player",
        paragraphs: [
          "The channels, EPG, catch-up and VOD come from your Mzansi Stream subscription and appear in every player. Some extras depend on the app: recording, multi-view and picture-in-picture need TiviMate Premium or a Formuler box; the VOD 'poster wall' looks best in XCIPTV and IPTV Smarters. Pick the player that surfaces the features you care about.",
        ],
        bullets: [
          "Recording → TiviMate Premium, Formuler MYTVOnline, some boxes.",
          "Multi-view / PiP → TiviMate Premium.",
          "Best VOD browsing → XCIPTV, IPTV Smarters Pro.",
          "Best EPG grid → TiviMate, MYTVOnline 3.",
        ],
      },
      {
        id: "not-included",
        h2: "Being straight about limits",
        paragraphs: [
          "IPTV isn't magic. Catch-up depends on the channel (not every channel carries a 7-day rewind), 4K depends on the source feed, and recording depends on your player and a USB drive. We'd rather set the right expectation up front — take the free 24-hour trial and see exactly what your channels and features look like before you pay.",
        ],
      },
    ],
    faq: [
      {
        q: "What features are included with IPTV?",
        a: "Mzansi Stream includes 20,000+ live channels, a 7-day EPG, 7-day catch-up on major channels, a Movies & Series VOD library, 4K where the source allows, multi-screen viewing and recording on supported players. The core — live TV, EPG, catch-up and VOD — works in every app.",
      },
      {
        q: "Does IPTV have a TV guide (EPG)?",
        a: "Yes — a full 7-day electronic programme guide. It loads automatically when you log in with Xtream Codes, so you can see what's on now and later and jump straight to a channel. If a channel's guide is blank, refresh the EPG in your player's settings.",
      },
      {
        q: "Can I watch catch-up or rewind live TV?",
        a: "Yes, on major channels — up to 7 days of catch-up so you can watch something you missed. Catch-up availability depends on the channel; not every one carries a full rewind. The EPG shows which programmes are available to replay.",
      },
      {
        q: "Does IPTV include movies and series on demand?",
        a: "Yes. There's a large Movies and Series (VOD) library that plays on demand like Netflix or Showmax, in addition to the live channels. It browses best in XCIPTV or IPTV Smarters, which show it as a poster wall.",
      },
      {
        q: "Can I record IPTV?",
        a: "On players that support it — TiviMate Premium and Formuler MYTVOnline can record live channels to a USB drive, and schedule recordings from the EPG. The basic free players play live and catch-up but don't record.",
      },
    ],
    related: [
      { label: "IPTV for movies & series", href: "/iptv-for-movies-and-series/" },
      { label: "Watch SuperSport without DStv", href: "/iptv-supersport-without-dstv/" },
      { label: "Manage favourites", href: "/knowledge-base/iptv-favourites/" },
      { label: "Profiles & multiple users", href: "/knowledge-base/iptv-profiles/" },
      { label: "All Knowledge Base articles", href: "/knowledge-base/" },
    ],
    hasHowTo: false,
    datePublished: "2026-06-25",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── PROFILES ───────────────────────────────────────────────────────
  {
    slug: "iptv-profiles",
    eyebrow: "Knowledge Base · Profiles",
    h1: "IPTV Profiles & Multiple Users — How They Work",
    metaTitle: "IPTV Profiles & Multi-User (2026) — Parental PIN (SA)",
    metaDescription:
      "Can IPTV have profiles and multiple users? How Mzansi Stream handles multi-screen, per-device setups, parental PINs and hiding adult content. Answer-first Knowledge Base guide.",
    lead:
      "IPTV doesn't use Netflix-style named profiles, but you get the same result in a different way: one subscription streams on several devices at once (up to your plan's connection limit), each device keeps its own favourites and channel groups, and a parental PIN hides adult categories from the kids. So the lounge, the bedroom and a phone can each have their own setup on a single account.",
    trustLine:
      "Multi-screen · per-device favourites · parental PIN · hide categories",
    cta: {
      primary: {
        label: "Set up multi-screen — ask us →",
        message:
          "Hi! I want Mzansi Stream on a few TVs with a parental PIN for the kids. How many screens can I watch at once?",
        ref: "KB-Profiles-Hero",
      },
      secondary: { label: "Jump to how it works →", href: "#how" },
    },
    sections: [
      {
        id: "how",
        h2: "How 'profiles' work on IPTV",
        paragraphs: [
          "Most IPTV players don't have Netflix-style profiles you switch between on one screen. Instead, personalisation happens per device: each Firestick, TV or phone logs into the same subscription and keeps its own favourites, channel groups and layout. In practice that covers what families want — the lounge box shows Dad's sport favourites, the kids' Firestick shows cartoons, and a phone has its own list.",
        ],
      },
      {
        id: "multi-screen",
        h2: "Multiple screens at once",
        bullets: [
          "One subscription can stream on several devices simultaneously — up to your plan's connection limit.",
          "If you hit 'connection limit reached', a plan with more connections lifts it — just ask us.",
          "Retire an old device (tell us) to free a connection slot.",
          "Each device counts as one connection while it's actively streaming.",
        ],
      },
      {
        id: "parental",
        h2: "Parental control & hiding content",
        bullets: [
          "Set a parental PIN in your player (TiviMate, IPTV Smarters, XCIPTV all support it) to lock adult categories.",
          "Hide categories you don't want visible — adult, foreign-language or unused groups — so a kids' device shows only safe channels.",
          "On a shared Firestick, hiding + a PIN gives a clean, child-safe channel list.",
          "Ask us to provision a line without adult categories at all if you'd prefer they never appear.",
        ],
      },
    ],
    faq: [
      {
        q: "Does IPTV have profiles like Netflix?",
        a: "Not named on-screen profiles, no. Instead each device keeps its own favourites, channel groups and layout while sharing one subscription. For families that's usually all you need — the lounge, the kids' room and a phone each have their own setup on a single account.",
      },
      {
        q: "How many people can watch IPTV at the same time?",
        a: "As many devices as your plan's connection limit allows — often several at once. If everyone streams simultaneously and you hit 'connection limit reached', we can move you to a plan with more connections. Ask us what your current plan allows.",
      },
      {
        q: "Can I set a parental PIN or hide adult channels?",
        a: "Yes. Players like TiviMate, IPTV Smarters and XCIPTV support a parental PIN to lock adult categories, and you can hide any category from view. On a kids' device you can show only safe channels. We can also provision your line without adult categories entirely.",
      },
      {
        q: "Can each TV in the house have different favourites?",
        a: "Yes — favourites and channel groups are stored per device on most players. Set the lounge box up with your sport favourites and the kids' Firestick with cartoons; they don't interfere with each other even though they share one subscription.",
      },
      {
        q: "Do I need separate subscriptions for each TV?",
        a: "No. One Mzansi Stream subscription covers every TV, phone and box in the house, up to your plan's simultaneous-connection limit. You only need a bigger plan if many screens stream at the exact same time.",
      },
    ],
    related: [
      { label: "Manage favourites", href: "/knowledge-base/iptv-favourites/" },
      { label: "Moving to a new device", href: "/help/iptv-change-device/" },
      { label: "What features does IPTV include?", href: "/knowledge-base/iptv-features/" },
      { label: "All IPTV apps & players", href: "/apps/" },
      { label: "All Knowledge Base articles", href: "/knowledge-base/" },
    ],
    hasHowTo: false,
    datePublished: "2026-06-25",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── FAVOURITES ─────────────────────────────────────────────────────
  {
    slug: "iptv-favourites",
    eyebrow: "Knowledge Base · Favourites",
    h1: "How to Set Up IPTV Favourites (Every Player)",
    metaTitle: "IPTV Favourites Setup (2026) — TiviMate, Smarters (SA)",
    metaDescription:
      "Tidy 20,000 channels into a short favourites list. How to add and organise IPTV favourites in TiviMate, IPTV Smarters, XCIPTV and IBO on Mzansi Stream. Answer-first guide.",
    lead:
      "Favourites turn a 20,000-channel list into a short, personal one. In any player — TiviMate, IPTV Smarters, XCIPTV, IBO — you long-press (or use the menu on) a channel and add it to Favourites, then set the app to open on the Favourites group. Most people end up with 15–30 channels they actually watch. Favourites are stored per device, so each TV can have its own list.",
    trustLine:
      "Long-press to add · per-device lists · open on favourites · every player",
    cta: {
      primary: {
        label: "Need a hand? Message us →",
        message:
          "Hi! I want to set up my favourite channels on Mzansi Stream. My app is ___ — can you help me organise them?",
        ref: "KB-Favourites-Hero",
      },
      secondary: { label: "Jump to the steps →", href: "#steps" },
    },
    sections: [
      {
        id: "steps",
        h2: "Add favourites — the general method",
        steps: [
          {
            title: "Open the channel list or EPG",
            text: "Go to Live TV and scroll to a channel you watch often, or open the EPG grid.",
          },
          {
            title: "Long-press or open the channel menu",
            text: "Long-press the channel (on a remote, hold the select button) or press the menu/options button to bring up channel actions.",
          },
          {
            title: "Add to Favourites",
            text: "Choose 'Add to Favourites' (a star or heart icon). Repeat for the 15–30 channels you actually watch.",
          },
          {
            title: "Set the app to open on Favourites",
            text: "In settings, set the default group / start-up category to 'Favourites' so the short list shows first every time.",
          },
          {
            title: "Reorder if your player allows",
            text: "TiviMate and some players let you drag favourites into your preferred order — put SuperSport and your daily channels at the top.",
          },
        ],
      },
      {
        id: "per-player",
        h2: "Per-player notes",
        bullets: [
          "TiviMate — long-press a channel → 'Add to favorites'; create multiple custom groups (Sport, News, Kids) and reorder freely.",
          "IPTV Smarters Pro — press the menu on a channel → the star icon; a 'Favourites' category appears in Live TV.",
          "XCIPTV — long-press → 'Add to Fav'; the Favourites tab collects them.",
          "IBO / Duplex / Sparkle — use the on-screen favourite/star option; the favourites list is stored on that device.",
          "Favourites are per device — set each TV up the way its main viewer likes.",
        ],
      },
      {
        id: "tips",
        h2: "Tips to keep the list clean",
        bullets: [
          "Hide categories you never watch so the full list is quicker to browse.",
          "Keep favourites to what you actually use — 15–30 channels is the sweet spot.",
          "Group by theme in TiviMate (Sport / News / Kids) if you watch a lot of different channels.",
          "Re-add favourites after a reinstall — most players store them locally, not in the cloud.",
        ],
      },
    ],
    faq: [
      {
        q: "How do I add favourite channels on IPTV?",
        a: "In any player, long-press (or open the menu on) a channel and choose 'Add to Favourites' — the star or heart icon. Then set the app to open on the Favourites group. It's the same idea in TiviMate, IPTV Smarters, XCIPTV and IBO, just a slightly different icon.",
      },
      {
        q: "How do I make my favourites show first?",
        a: "In your player's settings, set the default group or start-up category to 'Favourites'. The app will then open straight onto your short list instead of the full 20,000-channel lineup every time.",
      },
      {
        q: "Are IPTV favourites saved across devices?",
        a: "On most players, no — favourites are stored per device, so each TV or Firestick keeps its own list. That's handy for families (different lists per room) but means you re-add them after a reinstall. Ask us for a player that syncs favourites if you switch devices often.",
      },
      {
        q: "Can I organise favourites into groups like Sport and Kids?",
        a: "Yes, in TiviMate and some other players you can create multiple custom groups — Sport, News, Kids — and drag channels into order. IPTV Smarters and XCIPTV keep a single Favourites category, which is enough for most people.",
      },
      {
        q: "I reinstalled the app and lost my favourites.",
        a: "Because most players store favourites locally, a reinstall clears them (your subscription and channels are fine). Just re-add your regulars — it takes a couple of minutes. If you switch or reinstall often, ask us about a player that keeps favourites in the cloud.",
      },
    ],
    related: [
      { label: "Profiles & multiple users", href: "/knowledge-base/iptv-profiles/" },
      { label: "What features does IPTV include?", href: "/knowledge-base/iptv-features/" },
      { label: "TiviMate setup", href: "/apps/tivimate/" },
      { label: "IPTV Smarters Pro setup", href: "/apps/iptv-smarters-pro/" },
      { label: "All Knowledge Base articles", href: "/knowledge-base/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-25",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },
];

export const KB_SLUGS = KB_ARTICLES.map((a) => a.slug);

export function getKbArticle(slug: string): Pillar | undefined {
  return KB_ARTICLES.find((a) => a.slug === slug);
}
