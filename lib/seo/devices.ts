// lib/seo/devices.ts
// Device-specific install guides served at /[locale]/devices/[slug]/.
// Each device uses the same data shape as a Pillar so the existing
// PillarTemplate renders them — same schema stack (Article + FAQ +
// HowTo + Breadcrumb), same CTA flow, same internal-link cluster.
//
// Firestick + Samsung Tizen live at the root as standalone pillars
// because they're the highest-volume queries. Everything else lives
// under /devices/ to keep the URL space organised.

import type { Pillar } from "./pillars";

const ZA = "en-za" as const;

export const DEVICES: Pillar[] = [
  {
    slug: "hisense-vidaa",
    eyebrow: "Hisense VIDAA · Install guide",
    h1: "IPTV on Hisense Smart TV (VIDAA OS) — South Africa 2026",
    metaTitle:
      "IPTV Hisense VIDAA Smart TV 2026 — Install in 10 Min",
    metaDescription:
      "Install IPTV on a Hisense Smart TV (VIDAA OS) in South Africa — IPTV Smarters Pro, M3U link, 4K SuperSport. Works on every Hisense U6, U7, U8 and ULED.",
    lead:
      "Hisense Smart TVs running VIDAA OS are the second most-popular Smart TV brand in South Africa after Samsung — and IPTV installs cleanly on every Hisense 2022+ model from the VIDAA App Store. This guide walks through the complete Mzansi Stream install on a Hisense U6, U7, U8 or ULED using IPTV Smarters Pro.",
    trustLine:
      "Hisense VIDAA 2022+ · IPTV Smarters Pro · 4K UHD SuperSport · Native install",
    cta: {
      primary: {
        label: "Get the Hisense M3U link →",
        message:
          "Hi! I want IPTV on my Hisense Smart TV — please send the M3U link and setup steps for IPTV Smarters Pro on VIDAA.",
        ref: "Device-Hisense-Hero",
      },
      secondary: { label: "Jump to install steps →", href: "#install" },
    },
    sections: [
      {
        id: "compatibility",
        h2: "Which Hisense TVs support IPTV?",
        paragraphs: [
          "Every Hisense Smart TV running VIDAA OS (2022 onwards, U6, U7, U8 series and the ULED line-up) installs IPTV directly from the VIDAA Smart App Store. Older Hisense Smart TVs (2018-2021) typically run a legacy VIDAA build that may not stock IPTV Smarters Pro — for those, install Smart IPTV or add a Firestick.",
        ],
        bullets: [
          "Hisense U6K / U6N / U6Q (2022+) — fully supported, 4K HDR.",
          "Hisense U7K / U7N / U7Q — fully supported, 4K HDR.",
          "Hisense U8K / U8N / U8Q — fully supported, 4K Mini-LED.",
          "Hisense A6 / A7 series — supported.",
          "Hisense ULED X / ULED — fully supported.",
          "Hisense Laser TV (Trichroma) — supported with HDMI fallback.",
        ],
      },
      {
        id: "install",
        h2: "Install IPTV on Hisense VIDAA — step-by-step",
        steps: [
          {
            title: "Open the VIDAA Smart App Store",
            text: "Press the Home button → scroll to Apps → open the VIDAA App Store.",
          },
          {
            title: "Search for IPTV Smarters Pro",
            text: "Type 'IPTV Smarters' in the search bar. Install the free app. If it doesn't appear, use Smart IPTV as a fallback.",
          },
          {
            title: "Open IPTV Smarters Pro",
            text: "Choose 'Login with Xtream Codes API'. Enter the URL, username and password Mzansi Stream sent on WhatsApp.",
          },
          {
            title: "Wait for the channel list",
            text: "VIDAA takes 30-60 seconds to load the 20,000+ channel list the first time. Subsequent launches are <5 seconds.",
          },
          {
            title: "Set the EPG",
            text: "EPG auto-detects via Xtream Codes. If it doesn't, paste the XMLTV URL we sent into Settings → EPG.",
          },
          {
            title: "Test SuperSport in 4K",
            text: "Find SuperSport PSL or Premier League — 4K UHD should play with HDR if your stream is HDR-encoded.",
          },
        ],
      },
      {
        id: "vidaa-quirks",
        h2: "VIDAA-specific quirks and fixes",
        bullets: [
          "VIDAA voice search sometimes hijacks the remote mid-stream — disable in Settings → System → Voice if you don't use it.",
          "Hisense U6 series defaults to 50Hz HDMI output — switch to 60Hz in Picture → Advanced for smoother sport.",
          "Auto-DLNA service can cause mid-stream stutter — disable in Network → DLNA.",
          "VIDAA U8 supports HDR10+ and Dolby Vision; IPTV Smarters Pro plays both natively.",
          "First-launch app store load is slow on older VIDAA builds — be patient.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I install IPTV on a Hisense Smart TV?",
        a: "Yes. Every Hisense Smart TV running VIDAA OS (2022+) installs IPTV directly from the VIDAA App Store via IPTV Smarters Pro. No Firestick required.",
      },
      {
        q: "Does Hisense U6 support 4K IPTV?",
        a: "Yes. The Hisense U6 series streams Mzansi Stream's 4K SuperSport, Premier League and movie channels in 4K UHD with HDR10.",
      },
      {
        q: "What if IPTV Smarters Pro isn't in my Hisense store?",
        a: "Install Smart IPTV instead (works on older VIDAA from 2018+) or add a Firestick 4K to a free HDMI port.",
      },
      {
        q: "Does Hisense ULED support Dolby Vision IPTV?",
        a: "Yes — Hisense ULED and U8 models play Dolby Vision streams via IPTV Smarters Pro natively.",
      },
      {
        q: "How much does IPTV cost for a Hisense TV?",
        a: "Mzansi Stream is R99/month on the 12-month plan or R149/month on the 3-month plan. Same lineup for every device.",
      },
    ],
    related: [
      { label: "Best IPTV in South Africa 2026", href: "/best-iptv-south-africa-2026/" },
      { label: "IPTV for Samsung Smart TV (Tizen)", href: "/iptv-samsung-smart-tv/" },
      { label: "IPTV Firestick — install guide", href: "/iptv-firestick-south-africa/" },
      { label: "All devices supported", href: "/devices/" },
      { label: "Watch SuperSport without DStv", href: "/iptv-supersport-without-dstv/" },
    ],
    hasHowTo: true,
    datePublished: "2026-02-15",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  {
    slug: "lg-webos",
    eyebrow: "LG webOS · Install guide",
    h1: "IPTV on LG Smart TV (webOS) — South Africa 2026",
    metaTitle:
      "IPTV LG Smart TV webOS 2026 — Install in 12 Min",
    metaDescription:
      "Install IPTV on an LG Smart TV (webOS) in South Africa — Smart IPTV or SS IPTV, M3U link, 4K SuperSport. Works on every LG OLED, QNED and UHD from 2018.",
    lead:
      "LG Smart TVs running webOS install IPTV via Smart IPTV or SS IPTV from the LG Content Store. Both work cleanly on every LG OLED (B/C/G series), QNED, NanoCell and UHD set from 2018 onwards. This guide covers the complete Mzansi Stream install with troubleshooting for the LG-specific MAC-address activation quirk.",
    trustLine: "LG webOS 2018+ · Smart IPTV or SS IPTV · 4K Dolby Vision SuperSport",
    cta: {
      primary: {
        label: "Get the LG M3U link →",
        message:
          "Hi! I want IPTV on my LG Smart TV (webOS) — please send the M3U link and setup for Smart IPTV.",
        ref: "Device-LG-Hero",
      },
      secondary: { label: "Jump to install steps →", href: "#install" },
    },
    sections: [
      {
        id: "compatibility",
        h2: "Which LG Smart TVs support IPTV?",
        paragraphs: [
          "LG webOS 4.0 and later (2018 onwards) support IPTV via Smart IPTV (SS IPTV is the free alternative). This covers every LG OLED (B7-C4, G1-G4), QNED, NanoCell and UHD set sold in SA from 2018 forward.",
        ],
        bullets: [
          "LG OLED B / C / G / E series (2018+) — fully supported, 4K Dolby Vision.",
          "LG QNED 80/85/90/99 — fully supported, 4K.",
          "LG NanoCell — supported.",
          "LG UHD UR / UQ / UP — supported.",
          "Older LG NetCast (pre-2014) — not supported, requires Firestick.",
        ],
      },
      {
        id: "install",
        h2: "Install IPTV on LG webOS — step-by-step",
        steps: [
          {
            title: "Open the LG Content Store",
            text: "Press Home → Apps → LG Content Store.",
          },
          {
            title: "Install Smart IPTV (or SS IPTV)",
            text: "Search 'Smart IPTV' — install. Smart IPTV has a 7-day free trial, then a once-off €5.49 activation. SS IPTV is the free alternative.",
          },
          {
            title: "Find your TV's MAC address",
            text: "Settings → All Settings → Connection → Wired/Wireless → MAC address. Send it to us on WhatsApp.",
          },
          {
            title: "Upload your M3U playlist",
            text: "Smart IPTV: visit siptv.app/mylist on your phone → enter the MAC address → upload the M3U file we send.",
          },
          {
            title: "Reload Smart IPTV on the TV",
            text: "Close and re-open Smart IPTV on your LG. The channel list loads from our M3U.",
          },
          {
            title: "Test 4K SuperSport",
            text: "LG OLED and QNED support Dolby Vision IPTV streams. Open SuperSport — 4K should play with HDR on a sufficiently fast fibre line.",
          },
        ],
      },
      {
        id: "lg-quirks",
        h2: "LG-specific quirks and fixes",
        bullets: [
          "Smart IPTV is per-MAC-address — if you replace your LG, the activation has to migrate.",
          "Use a wired Ethernet connection if possible — LG webOS Wi-Fi can drop briefly on app launch.",
          "Disable LG's Quick Start+ if streams pause unexpectedly — it puts the network adapter to sleep.",
          "OLED G / C series support Dolby Vision IPTV out of the box.",
          "If 4K stutters, set HDMI to 'Ultra HD Deep Colour' in Settings → Picture.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I install IPTV on an LG Smart TV?",
        a: "Yes. Every LG Smart TV running webOS 4.0 or later (2018+) supports IPTV via Smart IPTV or SS IPTV from the LG Content Store.",
      },
      {
        q: "What's the best IPTV app for LG webOS?",
        a: "Smart IPTV is the gold standard (€5.49 once after a 7-day trial). SS IPTV is the free alternative with a simpler UI.",
      },
      {
        q: "Does my LG OLED support Dolby Vision IPTV?",
        a: "Yes — LG OLED B/C/G/E series support Dolby Vision IPTV streams natively via Smart IPTV.",
      },
      {
        q: "Why does Smart IPTV need my TV's MAC address?",
        a: "Smart IPTV's activation is per-MAC-address. Your M3U playlist is mapped to that MAC so it loads automatically on your LG.",
      },
      {
        q: "Can I install IPTV on an LG TV without paying for Smart IPTV?",
        a: "Yes — SS IPTV is the free LG alternative. It uses the same M3U URL and works on every LG webOS 4.0+.",
      },
    ],
    related: [
      { label: "Best IPTV in South Africa 2026", href: "/best-iptv-south-africa-2026/" },
      { label: "IPTV for Samsung Smart TV (Tizen)", href: "/iptv-samsung-smart-tv/" },
      { label: "IPTV on Hisense VIDAA", href: "/devices/hisense-vidaa/" },
      { label: "IPTV on Sony Bravia", href: "/devices/sony-bravia/" },
      { label: "All devices supported", href: "/devices/" },
    ],
    hasHowTo: true,
    datePublished: "2026-02-16",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  {
    slug: "sony-bravia",
    eyebrow: "Sony Bravia · Google TV install",
    h1: "IPTV on Sony Bravia (Google TV / Android TV) — South Africa 2026",
    metaTitle:
      "IPTV Sony Bravia Google TV 2026 — TiviMate Install",
    metaDescription:
      "Install IPTV on a Sony Bravia (Google TV / Android TV) — TiviMate or IPTV Smarters, 4K Dolby Vision SuperSport. Works on every Bravia XR and A-series.",
    lead:
      "Sony Bravia Smart TVs run Google TV (formerly Android TV) — which means you get the full Google Play Store, including TiviMate Premium, the slickest IPTV experience on any platform. This guide walks through the install on a Sony Bravia XR or A-series.",
    trustLine: "Sony Bravia + Google TV · TiviMate Premium · 4K Dolby Vision",
    cta: {
      primary: {
        label: "Get the Sony Bravia M3U link →",
        message:
          "Hi! I want IPTV on my Sony Bravia (Google TV) — please send the M3U link and TiviMate setup steps.",
        ref: "Device-Sony-Hero",
      },
      secondary: { label: "Jump to install steps →", href: "#install" },
    },
    sections: [
      {
        id: "why-sony",
        h2: "Why Sony Bravia is a great IPTV TV",
        paragraphs: [
          "Sony Bravia 4K OLED and Mini-LED sets ship with Google TV — full Play Store access, TiviMate Premium, IPTV Smarters Pro, MX Player, all work natively. The XR Cognitive Processor handles 4K HDR upscaling on IPTV streams beautifully. If you have a Sony Bravia in 2026, you have one of the best IPTV TVs money can buy without adding a Firestick.",
        ],
      },
      {
        id: "install",
        h2: "Install IPTV on Sony Bravia — step-by-step",
        steps: [
          {
            title: "Open Google Play Store on Bravia",
            text: "Press the Google Assistant / Home button → Apps → Google Play Store.",
          },
          {
            title: "Search for TiviMate",
            text: "Type 'TiviMate'. Install the free version. Premium licence (~R250 once) unlocks multi-playlist + recording.",
          },
          {
            title: "Add your Mzansi Stream playlist",
            text: "Open TiviMate → Add Playlist → Enter URL. Paste the M3U URL we sent on WhatsApp.",
          },
          {
            title: "Configure EPG",
            text: "TiviMate auto-detects EPG from the M3U. If not, paste the XMLTV URL from WhatsApp.",
          },
          {
            title: "Test 4K Dolby Vision",
            text: "Sony Bravia supports Dolby Vision IPTV streams. Open SuperSport PSL — XR upscaling handles 1080p sources cleanly too.",
          },
        ],
      },
      {
        id: "tips",
        h2: "Tips for Sony Bravia + IPTV",
        bullets: [
          "Enable 'Motionflow' for sport — smoother PSL action.",
          "Set HDMI input to 'Enhanced' for 4K@60Hz inputs.",
          "Disable Bravia's 'Power Saving' mid-stream — it dims the panel.",
          "Use the dedicated Google Assistant remote to launch TiviMate via voice.",
          "TiviMate Premium recording works on a USB-attached drive on most Bravia models.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I install IPTV on a Sony Bravia?",
        a: "Yes. Every Sony Bravia running Google TV or Android TV (2018+) installs IPTV directly from the Google Play Store via TiviMate or IPTV Smarters Pro.",
      },
      {
        q: "Does Sony Bravia support Dolby Vision IPTV?",
        a: "Yes — Sony Bravia XR OLED and Mini-LED models support Dolby Vision IPTV via TiviMate.",
      },
      {
        q: "What's the best IPTV app on Sony Bravia?",
        a: "TiviMate Premium gives the best EPG and multi-playlist UX. IPTV Smarters Pro is the free alternative.",
      },
    ],
    related: [
      { label: "Best IPTV in South Africa 2026", href: "/best-iptv-south-africa-2026/" },
      { label: "IPTV on Android TV Box", href: "/devices/android-tv-box/" },
      { label: "IPTV Firestick — install guide", href: "/iptv-firestick-south-africa/" },
      { label: "All devices supported", href: "/devices/" },
    ],
    hasHowTo: true,
    datePublished: "2026-02-17",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  {
    slug: "android-tv-box",
    eyebrow: "Android TV Box · Install guide",
    h1: "IPTV on Android TV Box (Nvidia Shield, Mi Box, Onn) — South Africa 2026",
    metaTitle:
      "IPTV Android TV Box 2026 — Nvidia Shield, Mi Box",
    metaDescription:
      "Install IPTV on Nvidia Shield, Xiaomi Mi Box, Onn 4K Pro or any Android TV box in South Africa — TiviMate Premium, 4K SuperSport, EPG. From R99/mo.",
    lead:
      "Dedicated Android TV boxes — the Nvidia Shield TV Pro, Xiaomi Mi Box S, Onn 4K Pro, Chromecast with Google TV — give you the same Google Play Store as a Sony Bravia, with the freedom to plug into any HDMI TV (old, new, projector, monitor). For IPTV, the Nvidia Shield Pro is the absolute top-end experience.",
    trustLine: "Nvidia Shield · Mi Box · Onn 4K Pro · TiviMate Premium · 4K Dolby Vision",
    cta: {
      primary: {
        label: "Get the Android TV Box M3U link →",
        message:
          "Hi! I want IPTV on my Android TV Box — please send the M3U link and TiviMate setup.",
        ref: "Device-AndroidBox-Hero",
      },
      secondary: { label: "Jump to install steps →", href: "#install" },
    },
    sections: [
      {
        id: "which-box",
        h2: "Which Android TV box should you buy in 2026?",
        bullets: [
          "Nvidia Shield TV Pro — gold standard, R3,500-R4,000 on Takealot, 4K HDR, AI upscaling, 16GB ROM.",
          "Xiaomi Mi Box S (2nd gen) — R1,500, 4K HDR, solid IPTV runner.",
          "Onn 4K Pro (Walmart) — R1,200 imported, 4K Dolby Vision, surprisingly capable.",
          "Chromecast with Google TV (4K) — R1,200, slim form factor, runs TiviMate.",
          "Generic 'X96' / 'T95' boxes — avoid; older Android, no Play Store, no updates.",
        ],
      },
      {
        id: "install",
        h2: "Install IPTV on Android TV Box — step-by-step",
        steps: [
          {
            title: "Open Google Play Store",
            text: "On the Android TV home screen → Apps → Google Play Store.",
          },
          {
            title: "Install TiviMate",
            text: "Search 'TiviMate'. Install the free version. Premium unlock is once-off.",
          },
          {
            title: "Add the Mzansi Stream playlist",
            text: "Open TiviMate → Add Playlist → Enter URL → paste our M3U URL from WhatsApp.",
          },
          {
            title: "Configure EPG",
            text: "TiviMate auto-detects EPG. If not, paste the XMLTV URL.",
          },
          {
            title: "Stream 4K SuperSport",
            text: "Nvidia Shield Pro: enable AI upscaling in Settings → Display → AI upscaling.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Which Android TV box is best for IPTV?",
        a: "Nvidia Shield TV Pro is the top-end choice. Xiaomi Mi Box S and Chromecast with Google TV are excellent value alternatives.",
      },
      {
        q: "Should I buy a generic X96 or T95 box?",
        a: "No. Generic Chinese boxes typically ship with outdated Android, no Google Play Store and no security updates. Spend the extra R1,000 on an Nvidia Shield or Mi Box.",
      },
      {
        q: "Does Nvidia Shield support Dolby Vision IPTV?",
        a: "Yes — Nvidia Shield TV Pro plays Dolby Vision IPTV streams natively via TiviMate.",
      },
    ],
    related: [
      { label: "IPTV Firestick — install guide", href: "/iptv-firestick-south-africa/" },
      { label: "IPTV on Sony Bravia (Google TV)", href: "/devices/sony-bravia/" },
      { label: "IPTV on Apple TV 4K", href: "/devices/apple-tv-4k/" },
      { label: "All devices supported", href: "/devices/" },
    ],
    hasHowTo: true,
    datePublished: "2026-02-18",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  {
    slug: "apple-tv-4k",
    eyebrow: "Apple TV 4K · Install guide",
    h1: "IPTV on Apple TV 4K — South Africa 2026",
    metaTitle: "IPTV Apple TV 4K 2026 — IPTV Smarters",
    metaDescription:
      "Install IPTV on Apple TV 4K in South Africa — IPTV Smarters Player or GSE Smart IPTV, 4K Dolby Vision SuperSport. From R99/mo on WhatsApp.",
    lead:
      "Apple TV 4K (2nd / 3rd gen) is the premium IPTV device for households already in the Apple ecosystem. The A15 / A17 silicon handles 4K HDR streams flawlessly, AirPlay lets you cast from your iPhone, and IPTV Smarters Player or GSE Smart IPTV run natively from the App Store.",
    trustLine: "Apple TV 4K · IPTV Smarters Player · GSE Smart IPTV · AirPlay · 4K Dolby Vision",
    cta: {
      primary: {
        label: "Get the Apple TV M3U link →",
        message:
          "Hi! I want IPTV on my Apple TV 4K — please send the M3U link and IPTV Smarters setup.",
        ref: "Device-AppleTV-Hero",
      },
      secondary: { label: "Jump to install steps →", href: "#install" },
    },
    sections: [
      {
        id: "compat",
        h2: "Which Apple TV models support IPTV?",
        bullets: [
          "Apple TV 4K 3rd gen (2022) — recommended, A15 chip, Dolby Vision.",
          "Apple TV 4K 2nd gen (2021) — A12 chip, fully capable.",
          "Apple TV HD (2015) — supported but 1080p only.",
          "Older Apple TV (pre-2015) — not supported.",
        ],
      },
      {
        id: "install",
        h2: "Install IPTV on Apple TV 4K — step-by-step",
        steps: [
          {
            title: "Open the App Store",
            text: "From the Apple TV home → App Store.",
          },
          {
            title: "Install IPTV Smarters Player or GSE Smart IPTV",
            text: "Both are free downloads. IPTV Smarters Player has the cleaner UX; GSE supports more codecs.",
          },
          {
            title: "Add your Mzansi Stream credentials",
            text: "Open the app → Login with Xtream Codes API → enter URL/user/password from WhatsApp.",
          },
          {
            title: "Stream 4K Dolby Vision",
            text: "Apple TV 4K passes through Dolby Vision IPTV streams natively. Use AirPlay from iPhone for quick cast.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Can I install IPTV on Apple TV 4K?",
        a: "Yes. Install IPTV Smarters Player or GSE Smart IPTV from the App Store — both work natively with Mzansi Stream.",
      },
      {
        q: "Does Apple TV 4K support Dolby Vision IPTV?",
        a: "Yes. Apple TV 4K 2nd and 3rd gen pass Dolby Vision IPTV streams natively to compatible TVs.",
      },
      {
        q: "Can I AirPlay IPTV from iPhone to Apple TV?",
        a: "Yes. Open IPTV Smarters Player on your iPhone → AirPlay icon → select your Apple TV.",
      },
    ],
    related: [
      { label: "IPTV on iPhone / iPad", href: "/devices/iphone-ipad/" },
      { label: "IPTV on Android TV Box", href: "/devices/android-tv-box/" },
      { label: "Best IPTV in South Africa 2026", href: "/best-iptv-south-africa-2026/" },
      { label: "All devices supported", href: "/devices/" },
    ],
    hasHowTo: true,
    datePublished: "2026-02-19",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  {
    slug: "iphone-ipad",
    eyebrow: "iPhone & iPad · Install guide",
    h1: "IPTV on iPhone & iPad — South Africa 2026",
    metaTitle: "IPTV iPhone iPad 2026 — IPTV Smarters Player",
    metaDescription:
      "Install IPTV on iPhone or iPad in South Africa — IPTV Smarters Player or GSE Smart IPTV from the App Store. 4K SuperSport. From R99/mo.",
    lead:
      "Mzansi Stream installs on every iPhone (6S onwards) and every iPad (Air 2 / Mini 4 onwards) via IPTV Smarters Player from the App Store. Native 4K playback on iPhone Pro / Pro Max models. AirPlay to Apple TV 4K or any compatible Smart TV in a single tap.",
    trustLine: "iOS 14+ · IPTV Smarters Player · AirPlay · Native 4K on Pro models",
    cta: {
      primary: {
        label: "Get the iPhone M3U link →",
        message:
          "Hi! I want IPTV on my iPhone / iPad — please send the M3U link and IPTV Smarters setup.",
        ref: "Device-iPhone-Hero",
      },
      secondary: { label: "Jump to install steps →", href: "#install" },
    },
    sections: [
      {
        id: "install",
        h2: "Install IPTV on iPhone / iPad — step-by-step",
        steps: [
          {
            title: "Open the App Store",
            text: "Tap the App Store icon on your iPhone or iPad.",
          },
          {
            title: "Install IPTV Smarters Player",
            text: "Search 'IPTV Smarters Player' — install (free).",
          },
          {
            title: "Add Mzansi Stream",
            text: "Open the app → Login with Xtream Codes API → enter the URL/user/password from WhatsApp.",
          },
          {
            title: "Stream and cast",
            text: "Play any channel. To cast to a TV: tap the AirPlay icon → select your Apple TV / AirPlay-compatible TV.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Does IPTV work on iPhone?",
        a: "Yes. IPTV Smarters Player is free in the App Store. Works on every iPhone 6S+ and iPad Air 2+.",
      },
      {
        q: "Can I AirPlay IPTV to my Smart TV?",
        a: "Yes. Tap the AirPlay icon in IPTV Smarters Player → select your Apple TV or AirPlay-compatible Smart TV (LG, Samsung 2019+, Sony Bravia).",
      },
      {
        q: "What's the best free IPTV app for iPhone?",
        a: "IPTV Smarters Player is the standard. GSE Smart IPTV is the alternative.",
      },
    ],
    related: [
      { label: "IPTV on Apple TV 4K", href: "/devices/apple-tv-4k/" },
      { label: "IPTV on Android (phone / tablet)", href: "/devices/android-mobile/" },
      { label: "All devices supported", href: "/devices/" },
    ],
    hasHowTo: true,
    datePublished: "2026-02-20",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  {
    slug: "android-mobile",
    eyebrow: "Android phone & tablet · Install",
    h1: "IPTV on Android Phone & Tablet — South Africa 2026",
    metaTitle:
      "IPTV Android Phone Tablet 2026 — TiviMate / Smarters",
    metaDescription:
      "Install IPTV on Android phones and tablets in SA — TiviMate Companion, IPTV Smarters Pro, M3U. Cast to Chromecast or Smart TV. From R99/mo.",
    lead:
      "Mzansi Stream installs on any Android phone or tablet running Android 7 or later via TiviMate Companion or IPTV Smarters Pro from the Play Store. Cast to Chromecast, Google TV or any DLNA-capable Smart TV. Great for travel and load-shedding.",
    trustLine: "Android 7+ · TiviMate Companion · IPTV Smarters Pro · Cast / DLNA",
    cta: {
      primary: {
        label: "Get the Android mobile M3U link →",
        message:
          "Hi! I want IPTV on my Android phone — please send the M3U link and TiviMate Companion setup.",
        ref: "Device-AndroidMobile-Hero",
      },
      secondary: { label: "Jump to install steps →", href: "#install" },
    },
    sections: [
      {
        id: "install",
        h2: "Install IPTV on Android — step-by-step",
        steps: [
          {
            title: "Open Google Play Store",
            text: "On your Android phone or tablet, open the Play Store.",
          },
          {
            title: "Install TiviMate Companion (or IPTV Smarters Pro)",
            text: "Search 'TiviMate Companion' — install. Use it to sync playlists with TiviMate on your Android TV box. For standalone mobile playback, install IPTV Smarters Pro.",
          },
          {
            title: "Add Mzansi Stream",
            text: "Open the app → Add Playlist → paste the M3U URL from WhatsApp.",
          },
          {
            title: "Cast to TV",
            text: "Tap the Cast icon → select your Chromecast / Google TV / Smart TV.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Does IPTV work on Android phone?",
        a: "Yes. Install IPTV Smarters Pro or TiviMate Companion from the Google Play Store.",
      },
      {
        q: "Can I cast IPTV from Android to my Smart TV?",
        a: "Yes — Chromecast, Google TV and many DLNA Smart TVs all receive cast streams from IPTV Smarters Pro.",
      },
      {
        q: "Will IPTV work during load shedding?",
        a: "Yes — if you've got mobile data (Vodacom / MTN / Cell C / Rain) your Android phone can keep streaming HD over 4G/5G while the fibre's down.",
      },
    ],
    related: [
      { label: "IPTV on iPhone / iPad", href: "/devices/iphone-ipad/" },
      { label: "IPTV on Android TV Box", href: "/devices/android-tv-box/" },
      { label: "All devices supported", href: "/devices/" },
    ],
    hasHowTo: true,
    datePublished: "2026-02-21",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  {
    slug: "mag-box",
    eyebrow: "MAG Box · Install guide",
    h1: "IPTV on MAG Box (322, 524, 540) — South Africa 2026",
    metaTitle: "IPTV MAG Box 322 524 540 2026 — Stalker Portal",
    metaDescription:
      "Configure IPTV on MAG Box (322, 524, 540) in South Africa — Stalker portal, MAC address, 4K SuperSport. Mzansi Stream from R99/mo.",
    lead:
      "MAG Boxes (Infomir 322, 524, 540 and the newer 425A) are dedicated IPTV set-top boxes with a built-in Stalker portal — no app store needed, no third-party player. Configuration is purely via the portal URL we whitelist to your MAG's MAC address.",
    trustLine: "MAG 322 / 425A / 524 / 540 · Stalker portal · MAC-whitelisted",
    cta: {
      primary: {
        label: "Send my MAG portal credentials →",
        message:
          "Hi! I have a MAG Box (model: ___, MAC: ___) — please whitelist my MAC and send the Stalker portal URL.",
        ref: "Device-MAG-Hero",
      },
      secondary: { label: "Jump to install steps →", href: "#install" },
    },
    sections: [
      {
        id: "install",
        h2: "Configure IPTV on MAG Box — step-by-step",
        steps: [
          {
            title: "Find your MAG's MAC address",
            text: "On the MAG home screen → System Settings → About. Send the MAC address (00:1A:79:...) to us on WhatsApp.",
          },
          {
            title: "We whitelist your MAC",
            text: "We add your MAC to our Stalker portal — usually within 5 minutes.",
          },
          {
            title: "Enter the portal URL on your MAG",
            text: "Settings → Servers → Portal 1 → paste the URL we send.",
          },
          {
            title: "Restart the portal",
            text: "Settings → Restart portal. The channel list loads.",
          },
          {
            title: "Test 4K SuperSport",
            text: "MAG 540 supports 4K HDR; MAG 322 caps at 1080p.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Does MAG Box work with Mzansi Stream?",
        a: "Yes. Send us your MAG's MAC address — we whitelist it and send the Stalker portal URL.",
      },
      {
        q: "Which MAG Box should I buy?",
        a: "For 4K, choose MAG 540 or 425A. For HD-only, MAG 322 / 324 are cheaper and still solid.",
      },
      {
        q: "Can I use a generic Stalker emulator instead of a MAG?",
        a: "Technically yes (STB Emulator on Android), but performance and stability are best on real MAG hardware.",
      },
    ],
    related: [
      { label: "Best IPTV in South Africa 2026", href: "/best-iptv-south-africa-2026/" },
      { label: "All devices supported", href: "/devices/" },
    ],
    hasHowTo: true,
    datePublished: "2026-02-22",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  // ─── NIVEAU 1 — IPTV APPS / PLAYERS (highest buyer intent) ──────────
  // These are player-setup pages, not hardware pages. They target the
  // "which app + how to set it up" queries (e.g. "iptv tivimate setup",
  // "TiviMate vs IPTV Smarters") that sit closest to the purchase.
  {
    slug: "tivimate",
    eyebrow: "TiviMate · Player setup",
    h1: "TiviMate IPTV Setup — South Africa 2026",
    metaTitle: "TiviMate IPTV Setup 2026 — Xtream Codes in 8 Min",
    metaDescription:
      "Set up TiviMate for IPTV in South Africa — add your Xtream Codes playlist, EPG, groups and Premium recording. The slickest player for Firestick, Android TV and Google TV.",
    lead:
      "TiviMate is the most polished IPTV player on Android, Fire OS and Google TV — a proper 10-foot TV guide, buffered zapping, catch-up and DVR recording. It does not carry any channels itself: you point it at the Mzansi Stream Xtream Codes playlist and it builds the guide for you. This page is the complete SA setup — free vs Premium, the exact login steps, EPG, groups, and the fixes for the two errors people actually hit.",
    trustLine:
      "Firestick · Android TV · Google TV · NVIDIA Shield · Xtream Codes API · Premium DVR",
    cta: {
      primary: {
        label: "Get your TiviMate Xtream login →",
        message:
          "Hi! I'm setting up TiviMate — please send my Xtream Codes URL, username and password plus the EPG link.",
        ref: "App-TiviMate-Hero",
      },
      secondary: { label: "Jump to setup steps →", href: "#setup" },
    },
    sections: [
      {
        id: "what-is-tivimate",
        h2: "What is TiviMate — and which devices run it?",
        paragraphs: [
          "TiviMate is an IPTV player, not a channel provider. It reads a playlist (either an Xtream Codes login or an M3U URL) and turns it into a fast, DStv-style channel guide with a proper EPG. It's built for the remote-and-couch experience, which is why it feels far better than a generic M3U app on a big screen.",
          "The one thing to know before you start: TiviMate only runs on Android-based devices. There is no iPhone, iPad, Samsung Tizen or LG webOS build. On those, use IPTV Smarters Pro instead — see the link at the bottom.",
        ],
        bullets: [
          "Amazon Firestick / Fire TV (all 4K models) — the most popular TiviMate device in SA.",
          "Android TV & Google TV — Sony Bravia, TCL, Philips, Chromecast with Google TV.",
          "NVIDIA Shield — the premium TiviMate experience, flawless 4K.",
          "Android TV boxes (Formuler, generic Allwinner/Amlogic) — supported.",
          "Android phones & tablets — works, though the UI is designed for a remote.",
          "NOT supported: iPhone, iPad, Samsung Tizen, LG webOS — use IPTV Smarters Pro.",
        ],
      },
      {
        id: "free-vs-premium",
        h2: "TiviMate free vs Premium — what you actually need",
        paragraphs: [
          "The free version is enough to watch every Mzansi Stream channel with a full EPG. You only need Premium (~R250 once-off lifetime, or roughly R110/year) if you want recording, catch-up playback, multiple playlists or the 4-up multi-view. For most SA households the free version is fine to start; sport fans usually upgrade for the DVR so they never miss a PSL kickoff.",
        ],
        bullets: [
          "Free: one playlist, full live TV, EPG, favourites, external players.",
          "Premium: DVR recording, catch-up/archive, multiple playlists, multi-view (up to 4 streams), scheduled recordings, custom EPG sources.",
          "Buy Premium once inside the app — it's tied to your Google account, so it follows you to a new Firestick or box.",
        ],
      },
      {
        id: "setup",
        h2: "Set up TiviMate with your Mzansi Stream playlist — step by step",
        steps: [
          {
            title: "Install TiviMate",
            text: "On Firestick, open the Amazon Appstore and search 'TiviMate'. On Android TV / Google TV, install it from Google Play. It's free.",
          },
          {
            title: "Add a playlist",
            text: "Open TiviMate → 'Add playlist' → choose 'Xtream Codes'. This is better than M3U because it pulls the EPG, VOD and catch-up automatically.",
          },
          {
            title: "Enter your Xtream login",
            text: "Paste the Server URL, Username and Password we send you on WhatsApp. Give the playlist a name like 'Mzansi Stream' and continue.",
          },
          {
            title: "Let the guide build",
            text: "TiviMate downloads the 20,000+ channel list and the EPG. The first build takes 30-90 seconds; after that it launches in a couple of seconds.",
          },
          {
            title: "Tidy the channel groups",
            text: "Settings → Playlists → your playlist → 'Channel groups'. Hide the groups you don't watch (e.g. leave South Africa, Sport, Movies, Kids) so zapping is fast.",
          },
          {
            title: "Set the EPG time zone",
            text: "Settings → EPG → set time offset to GMT+2 (SAST) so SuperSport and SABC programmes line up with the real schedule.",
          },
          {
            title: "Test SuperSport in 4K",
            text: "Open SuperSport PSL or Premier League. On a decent fibre line it plays in 4K/HD instantly. If it buffers, see the fixes below.",
          },
        ],
      },
      {
        id: "premium-features",
        h2: "Recording, catch-up and multi-view (Premium)",
        paragraphs: [
          "If you upgraded to Premium, three features are worth setting up on day one. Recording lets you DVR a match to a USB drive plugged into your Firestick or box. Catch-up (called 'Archive' in TiviMate) plays the last few days of a channel — handy if you miss a game. Multi-view puts up to four streams on screen at once, so you can watch two PSL matches side by side on derby day.",
        ],
        bullets: [
          "Recording: long-press a channel → Record, or schedule from the EPG. Point it at a USB drive for space.",
          "Catch-up: channels with a clock icon support archive — open the EPG and select a past programme.",
          "Multi-view: long-press → 'Add to multi-view' (needs Premium and a device with enough grunt — Shield or a 4K Firestick).",
          "Multiple playlists: keep the SA playlist as default and add a backup line without losing your favourites.",
        ],
      },
      {
        id: "troubleshooting",
        h2: "TiviMate not working? The two real fixes",
        paragraphs: [
          "Ninety percent of TiviMate problems in SA are one of two things: a wrong or expired login, or a buffering line. Here's how to tell them apart.",
        ],
        bullets: [
          "'Playlist processing failed' / can't add playlist — the Xtream URL or password is wrong, or the subscription lapsed. Re-check the details we sent, or message us to confirm your line is active.",
          "Everything loads but one channel is black — that single stream is temporarily down; try another channel in the same group. If all are black, it's the connection, not TiviMate.",
          "Buffering every few seconds — hard-wire the Firestick with a USB-Ethernet adapter, or move to 5GHz Wi-Fi. On a Huawei/ZTE ISP router, throughput caps are the usual culprit.",
          "EPG times are wrong — set the EPG offset to GMT+2 in Settings → EPG.",
          "App feels sluggish on an old Firestick — clear the app cache and turn off the on-screen clock/animations in Settings → Appearance.",
          "Buffered channel switching: enable Settings → Playback → 'Buffered channel switching' for instant, DStv-like zapping.",
        ],
      },
      {
        id: "tivimate-vs-smarters",
        h2: "TiviMate vs IPTV Smarters — which should you use?",
        paragraphs: [
          "Use TiviMate if your device is a Firestick, Android TV, Google TV or an Android box and you want the best live-TV guide and DVR. Use IPTV Smarters Pro if you're on iPhone, iPad, a Samsung/LG Smart TV, or you mainly watch movies and series (Smarters has a nicer VOD/series layout). Many SA users run TiviMate on the lounge Firestick and Smarters on their phone — one subscription covers both.",
        ],
      },
    ],
    faq: [
      {
        q: "Is TiviMate free?",
        a: "Yes — the free version plays every Mzansi Stream channel with a full EPG. Premium (~R250 once-off) adds DVR recording, catch-up, multiple playlists and 4-up multi-view. You never pay TiviMate for channels; those come with your Mzansi Stream subscription.",
      },
      {
        q: "Does TiviMate work on Firestick?",
        a: "Yes — Firestick is the most popular TiviMate device in South Africa. Install it from the Amazon Appstore, add your Xtream Codes login, and you're watching in about eight minutes.",
      },
      {
        q: "Can I use TiviMate on iPhone or a Samsung Smart TV?",
        a: "No. TiviMate is Android-only (Firestick, Android TV, Google TV, Android boxes). On iPhone, iPad, Samsung Tizen or LG webOS, use IPTV Smarters Pro instead — the same Mzansi Stream login works there.",
      },
      {
        q: "What do I enter to set up TiviMate?",
        a: "Choose 'Xtream Codes' and enter the Server URL, Username and Password we send you on WhatsApp. That single login pulls the channels, EPG, catch-up and VOD automatically.",
      },
      {
        q: "Why does TiviMate say 'playlist processing failed'?",
        a: "That almost always means the login is mistyped or the subscription has expired. Re-check the exact URL, username and password, or message us on WhatsApp and we'll confirm your line is active.",
      },
      {
        q: "How do I record a match on TiviMate?",
        a: "With Premium, long-press the channel and choose Record, or schedule it from the EPG. Plug a USB drive into your Firestick or box so recordings have space to save.",
      },
    ],
    related: [
      { label: "IPTV Smarters Pro — setup guide", href: "/devices/iptv-smarters-pro/" },
      { label: "IPTV on Firestick — install guide", href: "/iptv-firestick-south-africa/" },
      { label: "IPTV on Android TV box", href: "/devices/android-tv-box/" },
      { label: "Best IPTV in South Africa 2026", href: "/best-iptv-south-africa-2026/" },
      { label: "Watch SuperSport without DStv", href: "/iptv-supersport-without-dstv/" },
      { label: "All devices supported", href: "/devices/" },
    ],
    hasHowTo: true,
    datePublished: "2026-07-18",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  {
    slug: "iptv-smarters-pro",
    eyebrow: "IPTV Smarters Pro · Player setup",
    h1: "IPTV Smarters Pro Setup — South Africa 2026",
    metaTitle: "IPTV Smarters Pro Setup 2026 — Login in 6 Min",
    metaDescription:
      "Set up IPTV Smarters Pro in South Africa — log in with Xtream Codes, load the EPG, catch-up and VOD. The one player that runs on iPhone, iPad, Android, Firestick and Smart TVs.",
    lead:
      "IPTV Smarters Pro is the most widely-compatible IPTV player — it runs on iPhone, iPad, Android, Firestick and most Smart TVs, which is why it's the default app we recommend across every Mzansi Stream install guide. It's completely free; you just log in with the Xtream Codes details we send. This page is the full SA setup: the login, EPG, catch-up, movies/series, and the fixes for the errors people hit most.",
    trustLine:
      "iPhone · iPad · Android · Firestick · Smart TV · Xtream Codes login · Free app",
    cta: {
      primary: {
        label: "Get your Smarters Xtream login →",
        message:
          "Hi! I'm setting up IPTV Smarters Pro — please send my Xtream Codes URL, username and password plus the EPG link.",
        ref: "App-Smarters-Hero",
      },
      secondary: { label: "Jump to setup steps →", href: "#setup" },
    },
    sections: [
      {
        id: "compatibility",
        h2: "Which devices run IPTV Smarters Pro?",
        paragraphs: [
          "The reason we default to IPTV Smarters Pro is coverage — it's the one player that runs on almost everything. If you have a mix of devices at home (a Firestick in the lounge, an iPhone on the go, a Samsung TV in the bedroom), Smarters gives everyone the same layout with one login.",
        ],
        bullets: [
          "iPhone & iPad — App Store (this is the main reason to pick Smarters over TiviMate).",
          "Android phones & tablets — Google Play or our APK.",
          "Amazon Firestick / Fire TV — Amazon Appstore or Downloader.",
          "Android TV & Google TV — Sony, TCL, Philips, Chromecast with Google TV.",
          "Samsung Tizen & LG webOS — sideload / store depending on model (Smart IPTV is the fallback).",
          "Windows & macOS — desktop build available.",
        ],
      },
      {
        id: "setup",
        h2: "Set up IPTV Smarters Pro — step by step",
        steps: [
          {
            title: "Install the app",
            text: "iPhone/iPad: App Store → 'IPTV Smarters Pro'. Firestick: Amazon Appstore, or use the Downloader app if it isn't listed. Android: Google Play.",
          },
          {
            title: "Choose 'Login with Xtream Codes API'",
            text: "On the first screen pick 'Login with Xtream Codes API' — not M3U. Xtream pulls the EPG, catch-up and VOD automatically; M3U is live-only.",
          },
          {
            title: "Enter your details",
            text: "Any name (e.g. 'Mzansi Stream'), then the Server URL, Username and Password we send on WhatsApp. Tap Add User.",
          },
          {
            title: "Wait for the first sync",
            text: "The app loads Live TV, Movies and Series plus the EPG. The first sync takes 30-60 seconds; after that it opens instantly.",
          },
          {
            title: "Open Live TV and set the EPG",
            text: "Go to Live TV. If programme names look off by two hours, set the time zone to GMT+2 (SAST) in Settings so SuperSport and SABC line up.",
          },
          {
            title: "Pick an external player if a stream stutters",
            text: "Settings → Player Selection. If the built-in player struggles on a channel, switch that stream to MX Player or VLC for smoother 4K.",
          },
          {
            title: "Test SuperSport",
            text: "Open SuperSport in Live TV. It should play in seconds on a decent fibre line. Buffering fixes are below.",
          },
        ],
      },
      {
        id: "features",
        h2: "Catch-up, movies, series and multi-screen",
        paragraphs: [
          "IPTV Smarters Pro is stronger than most players on on-demand content, which is why movie-and-series households often prefer it. The Movies and Series tabs give you a poster-wall layout with resume-watching, and catch-up lets you rewind live channels that support archive.",
        ],
        bullets: [
          "Catch-up: channels with archive show a clock/EPG history — open the guide and pick a past programme.",
          "Movies & Series: poster layout with categories, search and resume — good for the whole family.",
          "External players: set MX Player or VLC per stream for the smoothest 4K on weaker devices.",
          "Parental controls: PIN-lock adult categories in Settings — useful on the kids' TV.",
          "Multi-screen: paid add-on lets you view several streams at once on supported devices.",
        ],
      },
      {
        id: "troubleshooting",
        h2: "IPTV Smarters not working? Common fixes",
        paragraphs: [
          "Most Smarters issues in SA come down to the login, an expired line, or the network. Work through these before reinstalling.",
        ],
        bullets: [
          "'Invalid credentials' or 'unable to login' — the URL, username or password is mistyped, or the subscription lapsed. Re-check exactly, or message us to confirm your line is active.",
          "Logs in but no channels appear — pull-to-refresh, or force-close and reopen so the list re-syncs.",
          "One channel is black but others play — that stream is briefly down; try another in the same group.",
          "Everything buffers — hard-wire the Firestick over Ethernet or move to 5GHz Wi-Fi; ISP-branded Huawei/ZTE routers often cap throughput.",
          "EPG shifted by two hours — set the time zone to GMT+2 (SAST) in Settings.",
          "Choppy 4K on an older device — switch that stream to MX Player or VLC under Player Selection.",
          "App won't install on Firestick — use the Downloader app and our APK link (some regions hide Smarters in the Amazon store).",
        ],
      },
      {
        id: "smarters-vs-tivimate",
        h2: "IPTV Smarters vs TiviMate — which to choose?",
        paragraphs: [
          "Pick IPTV Smarters Pro if you're on iPhone, iPad, a Samsung/LG Smart TV, or you watch a lot of movies and series — its VOD layout and cross-device reach are the best. Pick TiviMate if you're on a Firestick, Android TV or box and want the slickest live-TV guide and DVR recording. Your single Mzansi Stream login works in both, so plenty of households run Smarters on phones and TiviMate on the lounge Firestick.",
        ],
      },
    ],
    faq: [
      {
        q: "Is IPTV Smarters Pro free?",
        a: "Yes — the app is free on every platform. You only pay for your Mzansi Stream subscription (from R99/month), which is the Xtream Codes login you enter into the app.",
      },
      {
        q: "Does IPTV Smarters Pro work on iPhone and iPad?",
        a: "Yes. It's on the App Store for iPhone and iPad — that's the main reason to choose Smarters over TiviMate, which is Android-only. Log in with your Xtream Codes details and you're watching in minutes.",
      },
      {
        q: "M3U or Xtream Codes — which login should I use?",
        a: "Use 'Login with Xtream Codes API'. It pulls the EPG, catch-up and movies/series automatically. M3U only gives you live channels with no guide.",
      },
      {
        q: "Why does IPTV Smarters say 'invalid credentials'?",
        a: "The server URL, username or password is mistyped, or the subscription has expired. Re-check the details exactly as we sent them, or message us on WhatsApp to confirm your line is active.",
      },
      {
        q: "Can I watch movies and series on IPTV Smarters Pro?",
        a: "Yes — the Movies and Series tabs give you a poster-wall layout with categories, search and resume-watching, on top of the live channels and catch-up.",
      },
      {
        q: "How do I fix buffering in IPTV Smarters Pro?",
        a: "Hard-wire your Firestick or box over Ethernet, or use 5GHz Wi-Fi, and switch the stream to MX Player or VLC under Settings → Player Selection. Most buffering is the network or an ISP router cap, not the app.",
      },
    ],
    related: [
      { label: "TiviMate — setup guide", href: "/devices/tivimate/" },
      { label: "IPTV on Firestick — install guide", href: "/iptv-firestick-south-africa/" },
      { label: "IPTV on iPhone & iPad", href: "/devices/iphone-ipad/" },
      { label: "IPTV on Samsung Smart TV (Tizen)", href: "/iptv-samsung-smart-tv/" },
      { label: "Best IPTV in South Africa 2026", href: "/best-iptv-south-africa-2026/" },
      { label: "All devices supported", href: "/devices/" },
    ],
    hasHowTo: true,
    datePublished: "2026-07-18",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },
];

export const DEVICE_SLUGS = DEVICES.map((d) => d.slug);

export function getDevice(slug: string): Pillar | undefined {
  return DEVICES.find((d) => d.slug === slug);
}
