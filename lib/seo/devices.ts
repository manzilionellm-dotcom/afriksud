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

  // ─── WINDOWS PC (Niveau 3 — OS) ─────────────────────────────────────
  {
    slug: "windows-pc",
    eyebrow: "Windows PC · Install guide",
    h1: "IPTV on Windows PC or Laptop — South Africa 2026",
    metaTitle: "IPTV Windows PC 2026 — Smarters, VLC, Kodi Setup",
    metaDescription:
      "Watch IPTV on a Windows 10/11 PC or laptop in South Africa — IPTV Smarters, VLC and Kodi with Xtream Codes or M3U, EPG and 4K SuperSport. Mzansi Stream from R99/mo.",
    lead:
      "A Windows 10 or 11 PC or laptop makes a capable IPTV player — plug it into your TV over HDMI and it becomes a big-screen setup. You have three solid options: IPTV Smarters for Windows (the full app with EPG and VOD), the free VLC media player (quick M3U playback), or Kodi with an IPTV add-on. This guide covers all three with your Mzansi Stream Xtream Codes login.",
    trustLine:
      "Windows 10 / 11 · IPTV Smarters · VLC · Kodi · Xtream Codes / M3U · HDMI to TV",
    cta: {
      primary: {
        label: "Get my Windows login →",
        message:
          "Hi! I want IPTV on my Windows PC — please send my Xtream Codes URL, username and password (and the M3U link for VLC).",
        ref: "Device-Windows-Hero",
      },
      secondary: { label: "Jump to setup steps →", href: "#install" },
    },
    sections: [
      {
        id: "compatibility",
        h2: "What you need on Windows",
        paragraphs: [
          "Any Windows 10 or 11 PC or laptop from the last decade will play Mzansi Stream — IPTV is light on hardware. For 4K, you want a reasonably modern CPU/GPU and an HDMI 2.0 output if you're mirroring to a 4K TV. A wired Ethernet connection beats Wi-Fi for smooth live sport, exactly as on any other device.",
        ],
        bullets: [
          "Windows 10 or Windows 11 (32-bit or 64-bit).",
          "HDMI cable to connect the PC/laptop to your TV (optional).",
          "IPTV Smarters for Windows, or VLC, or Kodi.",
          "Your Mzansi Stream Xtream Codes login (or M3U URL for VLC).",
        ],
      },
      {
        id: "install",
        h2: "Set up IPTV on Windows — step-by-step",
        steps: [
          {
            title: "Pick your player",
            text: "IPTV Smarters (full app with EPG, catch-up and VOD) is the best all-rounder. VLC is fastest for a quick test. Kodi suits tinkerers who want a 10-foot media-centre UI.",
          },
          {
            title: "IPTV Smarters — install and log in",
            text: "Download IPTV Smarters for Windows from the developer's site, install it, choose 'Login with Xtream Codes API', and enter the Server URL, username and password we sent on WhatsApp.",
          },
          {
            title: "VLC — open the M3U link",
            text: "In VLC: Media → Open Network Stream → paste the M3U URL we send → Play. VLC plays the channel list but has no EPG — it's best for a quick check.",
          },
          {
            title: "Kodi — add the PVR IPTV Simple Client",
            text: "In Kodi: Add-ons → PVR IPTV Simple Client → Configure → set the M3U URL and the XMLTV EPG URL we provide → enable. Kodi then shows a full guide.",
          },
          {
            title: "Connect to your TV (optional)",
            text: "Run an HDMI cable from the laptop to the TV and set Windows display to 'Duplicate' or 'Second screen only' for a big-screen picture.",
          },
          {
            title: "Test 4K and set favourites",
            text: "Open SuperSport or Premier League to confirm playback. In IPTV Smarters, star your regular channels so they're one click away.",
          },
        ],
      },
      {
        id: "troubleshooting",
        h2: "Windows IPTV troubleshooting",
        bullets: [
          "No picture in IPTV Smarters but the list loads — switch the built-in player engine, or install VLC/K-Lite codecs.",
          "Choppy 4K on a laptop — plug into Ethernet, close background apps, and set Windows power mode to 'Best performance'.",
          "VLC plays audio only — a codec issue; update VLC to the latest version or use IPTV Smarters instead.",
          "No EPG in VLC — that's expected; VLC has no guide. Use IPTV Smarters or Kodi for the 7-day EPG.",
          "Windows SmartScreen warns on install — the app is unsigned; choose 'More info → Run anyway' only for the official download.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I watch IPTV on a Windows laptop?",
        a: "Yes. Install IPTV Smarters for Windows and log in with your Mzansi Stream Xtream Codes URL, username and password, or open the M3U link in the free VLC player. Connect the laptop to your TV over HDMI for a big-screen setup.",
      },
      {
        q: "What's the best IPTV player for Windows?",
        a: "IPTV Smarters for Windows is the best all-rounder — it has the 7-day EPG, catch-up and a Movies/Series library. VLC is quickest for a test but has no guide, and Kodi (with PVR IPTV Simple Client) suits users who want a media-centre interface.",
      },
      {
        q: "Does VLC work for IPTV?",
        a: "Yes, for playback. In VLC use Media → Open Network Stream and paste the M3U URL we send. VLC plays the channels but has no EPG or catch-up, so it's best as a quick check — use IPTV Smarters or Kodi for the full experience.",
      },
      {
        q: "How do I get IPTV from my PC onto my TV?",
        a: "Connect the PC or laptop to the TV with an HDMI cable and set Windows display to 'Duplicate' or 'Second screen only'. The IPTV picture then shows on the TV at up to 4K if both the PC output and TV support it.",
      },
    ],
    related: [
      { label: "IPTV on macOS", href: "/devices/macos/" },
      { label: "IPTV Smarters Pro setup", href: "/apps/iptv-smarters-pro/" },
      { label: "How to install IPTV", href: "/knowledge-base/how-to-install-iptv/" },
      { label: "All devices supported", href: "/devices/" },
    ],
    hasHowTo: true,
    datePublished: "2026-07-05",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── macOS (Niveau 3 — OS) ──────────────────────────────────────────
  {
    slug: "macos",
    eyebrow: "macOS · Install guide",
    h1: "IPTV on Mac (macOS) — South Africa 2026",
    metaTitle: "IPTV Mac 2026 — macOS Smarters, VLC, iMPlayer Setup",
    metaDescription:
      "Watch IPTV on a Mac (macOS, Intel or Apple Silicon) in South Africa — IPTV Smarters, iMPlayer and VLC with Xtream Codes, EPG and 4K SuperSport. Mzansi Stream from R99/mo.",
    lead:
      "IPTV runs cleanly on any Mac — Intel or Apple Silicon (M1/M2/M3/M4). The best native experience is iMPlayer or IPTV Smarters from the Mac App Store, both of which support Xtream Codes with a full EPG; VLC is the free fallback for quick M3U playback. Connect the Mac to your TV over HDMI or AirPlay to a nearby Apple TV for the big screen. This guide covers all three.",
    trustLine:
      "macOS Intel & Apple Silicon · iMPlayer · IPTV Smarters · VLC · Xtream Codes · AirPlay",
    cta: {
      primary: {
        label: "Get my Mac login →",
        message:
          "Hi! I want IPTV on my Mac — please send my Xtream Codes URL, username and password (and the M3U link for VLC).",
        ref: "Device-macOS-Hero",
      },
      secondary: { label: "Jump to setup steps →", href: "#install" },
    },
    sections: [
      {
        id: "compatibility",
        h2: "What you need on a Mac",
        paragraphs: [
          "Any Mac running a recent macOS version plays Mzansi Stream — Apple Silicon Macs (M-series) handle 4K effortlessly, and Intel Macs from the last several years are fine too. Apps from the Mac App Store are notarised and install without the security warnings you sometimes hit on Windows. For live sport, wire the Mac to Ethernet (a USB-C/Thunderbolt adapter) or use 5GHz Wi-Fi.",
        ],
        bullets: [
          "macOS on Apple Silicon (M1/M2/M3/M4) or a recent Intel Mac.",
          "iMPlayer or IPTV Smarters from the Mac App Store, or VLC.",
          "HDMI/USB-C to your TV, or AirPlay to an Apple TV.",
          "Your Mzansi Stream Xtream Codes login (or M3U URL for VLC).",
        ],
      },
      {
        id: "install",
        h2: "Set up IPTV on macOS — step-by-step",
        steps: [
          {
            title: "Choose your player",
            text: "iMPlayer and IPTV Smarters are the best native Mac apps (EPG, catch-up, VOD, Xtream Codes). VLC is the free option for a quick M3U test with no guide.",
          },
          {
            title: "iMPlayer / IPTV Smarters — install and log in",
            text: "Install from the Mac App Store, open the app, choose 'Xtream Codes' login, and enter the Server URL, username and password we sent on WhatsApp.",
          },
          {
            title: "VLC — open the M3U link",
            text: "In VLC: File → Open Network → paste the M3U URL → Open. VLC plays the channels but has no EPG.",
          },
          {
            title: "Send to the TV",
            text: "Connect the Mac to the TV with a USB-C/HDMI adapter, or AirPlay the screen (or the app, on supported players) to an Apple TV on the same network.",
          },
          {
            title: "Confirm the EPG and test 4K",
            text: "In iMPlayer/IPTV Smarters the 7-day EPG loads automatically. Open SuperSport or Premier League to confirm 4K, then add favourites.",
          },
        ],
      },
      {
        id: "troubleshooting",
        h2: "macOS IPTV troubleshooting",
        bullets: [
          "App won't play a channel — switch the player engine in the app's settings, or try VLC to isolate a codec issue.",
          "AirPlay drops during sport — AirPlay adds latency and jitter; a wired HDMI/USB-C connection is steadier for live 4K.",
          "Choppy playback on an Intel Mac — close heavy background apps and use Ethernet; older Intel GPUs work harder on 4K.",
          "VLC audio only — update VLC to the current version; older builds miss some codecs.",
          "Can't find the app — search the exact name ('iMPlayer', 'IPTV Smarters') in the Mac App Store; names vary slightly by region.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I watch IPTV on a Mac?",
        a: "Yes. Install iMPlayer or IPTV Smarters from the Mac App Store and log in with your Mzansi Stream Xtream Codes details, or open the M3U link in VLC. It runs on both Apple Silicon (M1–M4) and recent Intel Macs.",
      },
      {
        q: "What's the best IPTV app for macOS?",
        a: "iMPlayer and IPTV Smarters are the best native Mac apps — both support Xtream Codes with a full 7-day EPG, catch-up and VOD. VLC works for quick M3U playback but has no guide. All use the same Mzansi Stream login.",
      },
      {
        q: "Does IPTV work on Apple Silicon (M1/M2/M3) Macs?",
        a: "Yes, and very well — M-series Macs decode 4K IPTV with ease. Install a native Mac App Store player (iMPlayer or IPTV Smarters); most are universal or Apple-Silicon-native, so there's no performance penalty.",
      },
      {
        q: "How do I get IPTV from my Mac to the TV?",
        a: "Two ways: connect the Mac to the TV with a USB-C/HDMI adapter for a wired big-screen picture, or AirPlay to an Apple TV on the same Wi-Fi. Wired HDMI is steadier for live 4K sport since AirPlay adds a little latency.",
      },
    ],
    related: [
      { label: "IPTV on Windows PC", href: "/devices/windows-pc/" },
      { label: "IPTV on iPhone & iPad", href: "/devices/iphone-ipad/" },
      { label: "IPTV Smarters Pro setup", href: "/apps/iptv-smarters-pro/" },
      { label: "All devices supported", href: "/devices/" },
    ],
    hasHowTo: true,
    datePublished: "2026-07-05",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── ROKU (Niveau 4 — limited support, honest angle) ────────────────
  {
    slug: "roku",
    eyebrow: "Roku · Compatibility guide",
    h1: "IPTV on Roku — Honest Guide & Best Workaround (2026)",
    metaTitle: "IPTV on Roku 2026 — Limited Support + Best Workaround",
    metaDescription:
      "Can you use IPTV on Roku? The honest answer: Roku has no proper Xtream Codes app, so support is limited. Here's the realistic workaround (screen mirroring) and the better fix. Mzansi Stream.",
    lead:
      "Let's be straight: Roku is the one platform where IPTV support is genuinely limited. Roku's locked-down channel store has no proper Xtream Codes player like TiviMate or IPTV Smarters, so you can't install Mzansi Stream directly the way you can on a Firestick or Smart TV. The realistic options are screen mirroring from an Android phone, or — the honest best fix — using a cheap Firestick instead. This guide explains both without overselling.",
    trustLine:
      "Honest compatibility · screen-mirroring workaround · Firestick is the better fix",
    cta: {
      primary: {
        label: "Ask us the best option for you →",
        message:
          "Hi! I have a Roku and want Mzansi Stream. What's the best way to watch — mirror from my phone, or should I get a Firestick?",
        ref: "Device-Roku-Hero",
      },
      secondary: { label: "See the workarounds →", href: "#workaround" },
    },
    sections: [
      {
        id: "honest",
        h2: "The honest truth about Roku and IPTV",
        paragraphs: [
          "Roku deliberately keeps its platform closed. There's no official IPTV Smarters, no TiviMate and no reliable Xtream Codes player in the Roku Channel Store, and side-loading third-party apps isn't practical for most users. Any 'private channel' hacks that once existed are unreliable and often break. So unlike a Firestick or a Samsung TV, you cannot simply install Mzansi Stream on a Roku and log in.",
          "We'd rather tell you that up front than sell you something that won't work well. If Roku is your only device, the mirroring workaround below gets you watching; if you want a proper experience, a R700 Firestick is the honest recommendation.",
        ],
      },
      {
        id: "workaround",
        h2: "Workaround 1 — screen mirror from an Android phone",
        steps: [
          {
            title: "Enable screen mirroring on the Roku",
            text: "On the Roku: Settings → System → Screen mirroring → set to 'Prompt' or 'Always allow'.",
          },
          {
            title: "Install a player on your Android phone",
            text: "Install IPTV Smarters or XCIPTV on your Android phone and log in with your Mzansi Stream Xtream Codes details.",
          },
          {
            title: "Cast the phone screen to the Roku",
            text: "On Android: Settings → Connected devices → Cast (or 'Smart View' on Samsung) → pick your Roku. The phone screen, including the IPTV app, appears on the TV.",
          },
          {
            title: "Play in landscape and full-screen",
            text: "Rotate the phone to landscape and play the channel full-screen. Note: mirroring uses your phone's battery and Wi-Fi, and can add lag on 4K — HD mirrors more smoothly.",
          },
        ],
      },
      {
        id: "iphone",
        h2: "Workaround 2 — iPhone (limited)",
        paragraphs: [
          "iPhones use AirPlay, which Roku supports on newer models — but AirPlay mirroring of a live IPTV stream is inconsistent and often blocked by the player app. In practice, Android mirroring to Roku is far more reliable than iPhone AirPlay for IPTV. If you only have an iPhone and a Roku, the Firestick route below is the sensible choice.",
        ],
      },
      {
        id: "better-fix",
        h2: "The better fix — a Firestick (or your Smart TV app)",
        paragraphs: [
          "For about R700, an Amazon Firestick 4K plugs into the same HDMI port as your Roku and runs TiviMate, IPTV Smarters and XCIPTV natively — full EPG, catch-up, 4K, no mirroring. If your TV is a smart Samsung, LG, Hisense or Sony, you can install a player on the TV itself and skip extra hardware entirely. Either is a dramatically better experience than mirroring to a Roku.",
        ],
        bullets: [
          "Firestick 4K — native TiviMate/Smarters/XCIPTV, full EPG and 4K.",
          "Samsung/LG/Hisense/Sony Smart TV — install IBO/Duplex/Smarters on the TV.",
          "Android TV box or Formuler Z — the most stable 4K for heavy sport.",
          "Keep the Roku for Netflix/Disney+ and add a Firestick for IPTV.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I install IPTV on a Roku?",
        a: "Not directly. Roku's closed platform has no proper Xtream Codes player like IPTV Smarters or TiviMate, so you can't install Mzansi Stream and log in the way you can on a Firestick or Smart TV. The realistic options are screen-mirroring from an Android phone, or using a cheap Firestick instead.",
      },
      {
        q: "How do I watch IPTV on my Roku TV then?",
        a: "Mirror it from an Android phone: enable Screen Mirroring on the Roku, run IPTV Smarters/XCIPTV on the phone, and cast the phone screen to the Roku. It works but adds some lag on 4K. For a proper experience, plug a Firestick into the TV instead.",
      },
      {
        q: "Is there an IPTV Smarters app for Roku?",
        a: "No. There is no reliable IPTV Smarters, TiviMate or Xtream Codes player in the Roku Channel Store, and side-loading isn't practical. This is a genuine Roku limitation — not something specific to Mzansi Stream.",
      },
      {
        q: "What should I buy to watch IPTV if I have a Roku?",
        a: "An Amazon Firestick 4K (~R700) is the honest best answer — it plugs into the same TV, runs the top IPTV players natively with full EPG and 4K, and needs no mirroring. If your TV is a smart Samsung/LG/Hisense/Sony, you can install a player on the TV itself instead.",
      },
    ],
    related: [
      { label: "IPTV on Firestick / Fire TV", href: "/iptv-firestick-south-africa/" },
      { label: "IPTV on Chromecast", href: "/devices/chromecast/" },
      { label: "Which platform should I choose?", href: "/knowledge-base/which-iptv-platform-to-choose/" },
      { label: "All devices supported", href: "/devices/" },
    ],
    hasHowTo: true,
    datePublished: "2026-07-05",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── CHROMECAST (Niveau 4 — limited support, honest angle) ──────────
  {
    slug: "chromecast",
    eyebrow: "Chromecast · Compatibility guide",
    h1: "IPTV on Chromecast — Honest Guide (2026)",
    metaTitle: "IPTV Chromecast 2026 — Which Model Works + Workaround",
    metaDescription:
      "IPTV on Chromecast: it depends on the model. Chromecast with Google TV runs IPTV apps natively; the older cast-only dongle needs a workaround. The honest guide for Mzansi Stream.",
    lead:
      "Chromecast is a tale of two devices, so here's the honest breakdown. 'Chromecast with Google TV' (the one with a remote) is actually full Android TV — it installs IPTV Smarters, TiviMate and XCIPTV natively and works perfectly. The older 'cast-only' Chromecast dongle (no remote) has no apps of its own and only supports casting, which most IPTV players block — so support there is limited. This guide tells you which you have and the best path for each.",
    trustLine:
      "Google TV = full support · cast-only dongle = limited + workaround · honest angle",
    cta: {
      primary: {
        label: "Which Chromecast do I have? Ask us →",
        message:
          "Hi! I have a Chromecast and want Mzansi Stream. Mine [has/doesn't have] a remote — what's the best way to set it up?",
        ref: "Device-Chromecast-Hero",
      },
      secondary: { label: "See which model you have →", href: "#which" },
    },
    sections: [
      {
        id: "which",
        h2: "First: which Chromecast do you have?",
        paragraphs: [
          "This is the whole answer, so check before anything else. If your Chromecast came with a remote control and shows a full app-launcher home screen, it's 'Chromecast with Google TV' — a proper Android TV device with an app store. If it's a small dongle with no remote that you only control by 'casting' from your phone, it's a legacy cast-only Chromecast.",
        ],
        bullets: [
          "Has a remote + home screen with apps → Chromecast with Google TV (full IPTV support).",
          "No remote, cast-only from your phone → legacy Chromecast (limited).",
          "Google TV Streamer (2024+) → also full Android TV, same as Google TV.",
        ],
      },
      {
        id: "google-tv",
        h2: "Chromecast with Google TV — full support, install directly",
        steps: [
          {
            title: "Open the Google Play Store on the device",
            text: "From the Google TV home screen, go to Apps / search and open the Play Store.",
          },
          {
            title: "Install IPTV Smarters, TiviMate or XCIPTV",
            text: "Search and install your preferred player — all three run natively on Google TV.",
          },
          {
            title: "Log in with Xtream Codes",
            text: "Open the app, choose 'Xtream Codes API', and enter the Server URL, username and password we sent on WhatsApp.",
          },
          {
            title: "Load channels, EPG and test 4K",
            text: "The full lineup and 7-day EPG load automatically. Chromecast with Google TV outputs 4K HDR — open SuperSport to confirm, then add favourites.",
          },
        ],
      },
      {
        id: "legacy",
        h2: "Legacy cast-only Chromecast — the limited workaround",
        paragraphs: [
          "The old dongle has no apps and can only receive a 'cast'. The catch: most IPTV players (IPTV Smarters, TiviMate) don't offer a Chromecast cast button, because live IPTV streams don't cast reliably. So you can't cleanly send a channel to a legacy Chromecast the way you'd cast YouTube.",
          "The only real workaround is to cast your whole Android phone screen (tab/screen mirroring) to the Chromecast via Google Home — but this is laggy for live 4K and drains the phone. Honestly, if you have a legacy Chromecast, the better move is to replace it with a Chromecast with Google TV or a Firestick, both of which run IPTV apps directly.",
        ],
        bullets: [
          "Screen-cast the phone via the Google Home app (laggy, HD is smoother than 4K).",
          "Better: upgrade to Chromecast with Google TV — installs IPTV apps natively.",
          "Or add a Firestick 4K (~R700) for full TiviMate/Smarters support.",
        ],
      },
    ],
    faq: [
      {
        q: "Does IPTV work on Chromecast?",
        a: "It depends on the model. 'Chromecast with Google TV' (the one with a remote) is full Android TV — it installs IPTV Smarters, TiviMate and XCIPTV natively and works perfectly. The older cast-only Chromecast dongle has no apps and can't reliably cast live IPTV, so support there is limited.",
      },
      {
        q: "How do I know which Chromecast I have?",
        a: "If it came with a remote and shows a home screen full of apps, it's Chromecast with Google TV (full IPTV support). If it's a small dongle with no remote that you only control by casting from your phone, it's a legacy cast-only Chromecast, which is limited for IPTV.",
      },
      {
        q: "Can I cast IPTV from my phone to a Chromecast?",
        a: "Not cleanly. Most IPTV player apps don't offer a Chromecast cast button because live streams don't cast reliably. You can screen-mirror your whole Android phone to the Chromecast via Google Home, but it's laggy for 4K. Chromecast with Google TV, which runs the apps directly, is far better.",
      },
      {
        q: "What's the best fix if I have an old cast-only Chromecast?",
        a: "Upgrade to Chromecast with Google TV or add a Firestick 4K (~R700). Both plug into the same HDMI port and run IPTV Smarters, TiviMate and XCIPTV natively with full EPG and 4K — no mirroring, no lag. It's a much better experience than casting to the old dongle.",
      },
    ],
    related: [
      { label: "IPTV on Android TV box", href: "/devices/android-tv-box/" },
      { label: "IPTV on Firestick / Fire TV", href: "/iptv-firestick-south-africa/" },
      { label: "IPTV on Roku", href: "/devices/roku/" },
      { label: "All devices supported", href: "/devices/" },
    ],
    hasHowTo: true,
    datePublished: "2026-07-05",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },
];

export const DEVICE_SLUGS = DEVICES.map((d) => d.slug);

export function getDevice(slug: string): Pillar | undefined {
  return DEVICES.find((d) => d.slug === slug);
}
