// lib/seo/apps.ts
// Device Hub — Niveau 1: IPTV apps, players and dedicated boxes.
// These are the highest purchase-intent queries in the content hub: a
// user searching "TiviMate setup" or "IPTV Smarters Pro" already owns a
// device and is choosing the player — they're one M3U link away from
// buying. Served at /[locale]/apps/[slug]/.
//
// Each app reuses the `Pillar` shape so the existing PillarTemplate
// renders it with the full schema stack (Article + WebPage + FAQPage +
// HowTo + Breadcrumb) and the WhatsApp → pricing funnel. The route
// passes pathPrefix="/apps" so the JSON-LD canonical matches the URL.

import type { Pillar } from "./pillars";
import type { Locale } from "../locales";

const ZA: Locale = "en-za";

export const IPTV_APPS: Pillar[] = [
  // ─── TIVIMATE — the enthusiast player (highest app-intent volume) ───
  {
    slug: "tivimate",
    eyebrow: "TiviMate · Player setup 2026",
    h1: "TiviMate IPTV Setup — Xtream Codes on Firestick & Android TV",
    metaTitle: "TiviMate Setup 2026 — Xtream Codes, EPG, 4K (SA Guide)",
    metaDescription:
      "Set up TiviMate with Mzansi Stream in South Africa — Xtream Codes login, EPG, recording, multi-view and 4K SuperSport on Firestick, Android TV and NVIDIA Shield. From R99/mo.",
    lead:
      "TiviMate is the player most serious IPTV users in South Africa settle on — a clean channel grid, a proper 7-day EPG, catch-up, recording and picture-in-picture. It runs on any Android-based device: Firestick, Fire TV, Android TV, Google TV, NVIDIA Shield and Android TV boxes. This guide covers the exact Xtream Codes login for Mzansi Stream, how to load the EPG, and the paid Premium features worth the R-equivalent upgrade.",
    trustLine:
      "Android TV · Fire TV / Firestick · Google TV · NVIDIA Shield · Xtream Codes API · 7-day EPG",
    cta: {
      primary: {
        label: "Get my TiviMate Xtream Codes login →",
        message:
          "Hi! I want to use TiviMate — please send my Xtream Codes URL, username and password plus the EPG link.",
        ref: "App-TiviMate-Hero",
      },
      secondary: { label: "Jump to setup steps →", href: "#install" },
    },
    sections: [
      {
        id: "why-tivimate",
        h2: "Why TiviMate over IPTV Smarters or the stock player",
        paragraphs: [
          "TiviMate isn't a content provider — it's a front-end that plays your Mzansi Stream playlist. People choose it over IPTV Smarters Pro for three reasons: the EPG is genuinely usable (a scrollable programme grid rather than a list), recordings and catch-up are first-class, and the interface is fast on cheap hardware. On a R700 Firestick 4K it feels smoother than most Smart-TV apps.",
          "The trade-off: TiviMate is Android-only. There is no iOS, no Samsung Tizen and no LG webOS build. If your screen is an iPhone, iPad, Samsung or LG TV, use IPTV Smarters Pro or IBO Player instead — we cover those on their own pages.",
        ],
      },
      {
        id: "compatibility",
        h2: "Which devices run TiviMate?",
        bullets: [
          "Amazon Firestick / Fire TV Stick 4K / Fire TV Cube — the most common SA setup.",
          "Android TV / Google TV (Chromecast with Google TV, Xiaomi, TCL, Sony Bravia).",
          "NVIDIA Shield TV / Shield TV Pro — the smoothest 4K experience.",
          "Android TV boxes (Formuler, Ugoos, X96, H96 and generic Allwinner/Amlogic).",
          "Android phones and tablets (usable, but built for the TV grid).",
          "NOT supported: iPhone, iPad, Samsung Tizen, LG webOS, Windows, Roku, Apple TV.",
        ],
      },
      {
        id: "install",
        h2: "Install and set up TiviMate — step-by-step",
        paragraphs: [
          "TiviMate installs from the Google Play Store on Android TV / Google TV. On a Firestick it isn't in the Amazon Appstore, so you side-load it with the Downloader app — the steps below cover that path because it's the one most SA users hit.",
        ],
        steps: [
          {
            title: "Firestick only: enable app installs",
            text: "Settings → My Fire TV → Developer Options → turn on 'Install unknown apps' for the Downloader app. (Android TV / Google TV users skip this — install TiviMate straight from Google Play.)",
          },
          {
            title: "Install the Downloader app",
            text: "From the Firestick search, install 'Downloader' by AFTVnews. Open it and allow storage access.",
          },
          {
            title: "Get TiviMate",
            text: "On Android TV, search 'TiviMate' in Google Play and install. On Firestick, use Downloader to fetch the official TiviMate APK, then install it.",
          },
          {
            title: "Add a playlist → Xtream Codes",
            text: "Open TiviMate → Add Playlist → 'Enter URL'. Choose 'Xtream Codes' and enter the Server URL, Username and Password Mzansi Stream sent you on WhatsApp.",
          },
          {
            title: "Name the playlist and load channels",
            text: "Give it a name (e.g. 'Mzansi Stream'). TiviMate pulls the full 20,000+ channel list and the 7-day EPG automatically over the Xtream Codes API.",
          },
          {
            title: "Set the EPG source",
            text: "The EPG is included in the Xtream login. If a channel shows no guide, go to Settings → EPG → and confirm 'Program Guide' is set to the playlist source. Paste the XMLTV URL we sent only if you're using an M3U playlist instead of Xtream Codes.",
          },
          {
            title: "Test SuperSport in 4K",
            text: "Open the guide, jump to SuperSport PSL or Premier League and press play. Long-press a channel to add it to Favourites so it sits at the top of your grid.",
          },
        ],
      },
      {
        id: "premium",
        h2: "TiviMate free vs Premium — what's worth it",
        paragraphs: [
          "TiviMate's free tier plays your Mzansi Stream channels, EPG and catch-up — enough for most households. TiviMate Premium (a one-off / annual unlock paid to the TiviMate developer, not to us) adds the features power users want.",
        ],
        bullets: [
          "Multiple playlists — run Mzansi Stream plus a backup line side by side.",
          "Recording — schedule and record live channels to a USB drive or network share.",
          "Multi-view — watch up to four channels at once (great for a full PSL matchday).",
          "Picture-in-picture — keep the match in a corner while you browse.",
          "Custom channel groups and per-device sync of your favourites.",
        ],
      },
      {
        id: "troubleshooting",
        h2: "TiviMate not working? Fix the common issues",
        bullets: [
          "'Playlist could not be loaded' — the Xtream URL, username or password has a typo. Re-enter exactly as we sent, including http/https and the port.",
          "No EPG / blank guide — reload the playlist (Settings → Playlists → your playlist → Reload), then wait 60 seconds for the guide to populate.",
          "Buffering only on 4K channels — hard-wire the Firestick over Ethernet or move to 5GHz Wi-Fi; see our no-buffering guide.",
          "Channels load but won't play — your device's decoder may not support the codec; in Settings → Playback, switch the decoder from 'Hardware' to 'Hardware+' or 'Software'.",
          "App closed unexpectedly on Firestick — a low-RAM stick can struggle with 20,000 channels; hide unused channel groups to lighten the grid.",
        ],
      },
    ],
    faq: [
      {
        q: "Is TiviMate free with Mzansi Stream?",
        a: "TiviMate itself is free to install and plays your Mzansi Stream subscription fully. TiviMate Premium (recording, multi-view, multiple playlists) is an optional unlock you pay to the TiviMate developer — it's separate from your Mzansi Stream plan, which stays from R99/month.",
      },
      {
        q: "Does TiviMate work on a Firestick in South Africa?",
        a: "Yes. TiviMate isn't in the Amazon Appstore, so you side-load it with the free Downloader app — the steps above walk through it. Once installed you log in with the Xtream Codes URL, username and password we send on WhatsApp.",
      },
      {
        q: "Can I get the 7-day EPG and catch-up in TiviMate?",
        a: "Yes. Mzansi Stream serves a full XMLTV EPG and 7-day catch-up over the Xtream Codes API, so both appear automatically once your playlist loads. No separate EPG URL is needed for an Xtream login.",
      },
      {
        q: "Does TiviMate run on iPhone, iPad or Samsung TV?",
        a: "No — TiviMate is Android-only. On iPhone or iPad use IPTV Smarters Pro; on a Samsung Tizen or LG webOS TV use IBO Player or IPTV Smarters. Your Mzansi Stream login works across all of them.",
      },
      {
        q: "How many channels can TiviMate handle?",
        a: "The full Mzansi Stream lineup of 20,000+ channels loads fine on a Firestick 4K, Android TV box or NVIDIA Shield. On a low-RAM device, hiding channel groups you never watch keeps the guide snappy.",
      },
    ],
    related: [
      { label: "IPTV Smarters Pro setup", href: "/apps/iptv-smarters-pro/" },
      { label: "IPTV on Firestick / Fire TV", href: "/iptv-firestick-south-africa/" },
      { label: "IPTV with no buffering", href: "/iptv-no-buffering-south-africa/" },
      { label: "All IPTV apps & players", href: "/apps/" },
      { label: "Best IPTV in South Africa 2026", href: "/best-iptv-south-africa-2026/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-12",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── IPTV SMARTERS PRO — the universal player ───────────────────────
  {
    slug: "iptv-smarters-pro",
    eyebrow: "IPTV Smarters Pro · Player setup 2026",
    h1: "IPTV Smarters Pro Setup — Every Device, Xtream Codes Login",
    metaTitle: "IPTV Smarters Pro Setup 2026 — Xtream Codes (SA Guide)",
    metaDescription:
      "Set up IPTV Smarters Pro with Mzansi Stream in South Africa — Xtream Codes login on Firestick, Android, iPhone, iPad, Samsung, LG and Windows. EPG, 4K SuperSport, catch-up. From R99/mo.",
    lead:
      "IPTV Smarters Pro is the one player that runs almost everywhere — Firestick, Android TV, Android phone, iPhone, iPad, Samsung Tizen, LG webOS, Windows and macOS. If your household mixes an Apple phone, a Samsung TV and a Firestick, this is the app that gives everyone the same layout. This guide covers the Xtream Codes login for Mzansi Stream, loading the EPG, and the quirks per platform.",
    trustLine:
      "Firestick · Android · iPhone / iPad · Samsung Tizen · LG webOS · Windows · Xtream Codes API",
    cta: {
      primary: {
        label: "Get my IPTV Smarters login →",
        message:
          "Hi! I want to use IPTV Smarters Pro — please send my Xtream Codes URL, username and password.",
        ref: "App-Smarters-Hero",
      },
      secondary: { label: "Jump to setup steps →", href: "#install" },
    },
    sections: [
      {
        id: "why-smarters",
        h2: "Why IPTV Smarters Pro is the safe default",
        paragraphs: [
          "IPTV Smarters Pro wins on reach. TiviMate is smoother but Android-only; Smarters runs on nearly every screen a South African household owns. That matters when one Mzansi Stream subscription needs to work on a dad's Samsung TV, a teenager's iPhone and a Firestick in the bedroom — one login, same interface everywhere.",
          "It logs in three ways: Xtream Codes API (recommended — pulls channels, EPG and catch-up together), M3U URL, or a single-stream URL. For Mzansi Stream, always choose Xtream Codes: it's the least error-prone and gives you the full 7-day guide.",
        ],
      },
      {
        id: "compatibility",
        h2: "Which devices run IPTV Smarters Pro?",
        bullets: [
          "Amazon Firestick / Fire TV — from the Amazon Appstore (search 'IPTV Smarters').",
          "Android TV / Google TV / Android boxes — from Google Play.",
          "Android phones & tablets — from Google Play.",
          "iPhone & iPad — from the Apple App Store (published as 'IPTV Smarters Player').",
          "Samsung Smart TV (Tizen) — from the Samsung App Store on 2020+ models.",
          "LG Smart TV (webOS) — from the LG Content Store on 2019+ models.",
          "Windows & macOS — desktop build from the developer's site.",
        ],
      },
      {
        id: "install",
        h2: "Set up IPTV Smarters Pro — step-by-step",
        steps: [
          {
            title: "Install the app for your device",
            text: "Firestick: Amazon Appstore → 'IPTV Smarters'. Android / Google TV: Google Play. iPhone / iPad: App Store → 'IPTV Smarters Player'. Samsung / LG: the built-in TV app store.",
          },
          {
            title: "Open it and accept the terms",
            text: "On first launch, accept the disclaimer. IPTV Smarters is an empty player until you add your Mzansi Stream login.",
          },
          {
            title: "Choose 'Login with Xtream Codes API'",
            text: "On the 'Add User' screen pick 'Login with Xtream Codes API' (not the M3U option). Give the profile a name like 'Mzansi Stream'.",
          },
          {
            title: "Enter your credentials",
            text: "Paste the Server URL, Username and Password we sent on WhatsApp. Keep the http/https prefix and the port number exactly as provided.",
          },
          {
            title: "Let it load Live TV, Movies and Series",
            text: "The app pulls three libraries — Live TV, Movies (VOD) and Series. First load takes 30–60 seconds for the full 20,000+ channels.",
          },
          {
            title: "Confirm the EPG",
            text: "Open Live TV — each channel should show now/next and a 7-day guide. If not, go to Settings → and tap 'Refresh EPG'.",
          },
          {
            title: "Test 4K and set favourites",
            text: "Play SuperSport or Premier League to confirm 4K. Long-press (or use the menu) to add channels to Favourites for one-tap access.",
          },
        ],
      },
      {
        id: "per-platform",
        h2: "Platform quirks worth knowing",
        bullets: [
          "iPhone / iPad: the app is listed as 'IPTV Smarters Player' — same app, and it AirPlays to an Apple TV cleanly.",
          "Samsung Tizen: on some 2020 models the store lists 'IPTV Smarters Pro' under a slightly different name — if it's missing, IBO Player is the reliable Samsung fallback.",
          "Firestick: if the stream stutters, go to Settings → Player Selection and switch to the built-in decoder ('IJK Player' ↔ 'Exo Player').",
          "Windows / macOS: the desktop build is handy for testing your line before you set up the TV — same Xtream login.",
          "Multiple screens: you can log the same Mzansi Stream account into several devices; ask us about the connection count on your plan if streams drop when everyone watches at once.",
        ],
      },
      {
        id: "troubleshooting",
        h2: "Fixes for the most common IPTV Smarters errors",
        bullets: [
          "'Invalid credentials' / 'Authentication failed' — a typo in the URL, username or password, or a trailing space. Re-enter exactly as sent.",
          "Channels list loads but nothing plays — switch the player engine (Settings → Player Selection) from Exo to IJK or VLC.",
          "No EPG — Settings → refresh EPG; if still blank, your profile was added as M3U instead of Xtream Codes — delete and re-add via Xtream Codes.",
          "Buffering during live sport — wire the device over Ethernet or move to 5GHz; the CDN peers at NAPAfrica so the bottleneck is almost always local Wi-Fi.",
          "App won't open after a Samsung/LG firmware update — clear the app cache or reinstall; your Xtream login restores everything.",
        ],
      },
    ],
    faq: [
      {
        q: "Does IPTV Smarters Pro work on iPhone and Samsung TV?",
        a: "Yes — that's its strength. It runs on iPhone, iPad (as 'IPTV Smarters Player'), Samsung Tizen, LG webOS, Firestick, Android and Windows. One Mzansi Stream Xtream Codes login works on all of them, so every screen in the house shares the same layout.",
      },
      {
        q: "Xtream Codes or M3U — which login should I use?",
        a: "Use Xtream Codes API. It pulls Live TV, Movies, Series and the 7-day EPG together and is far less error-prone than an M3U URL. We send your Server URL, username and password on WhatsApp.",
      },
      {
        q: "Is IPTV Smarters Pro free?",
        a: "The player is free to install. Your Mzansi Stream subscription (from R99/month) is what provides the channels. Some app-store listings charge a small one-off for a 'Pro' unlock, but the standard free build plays the full lineup.",
      },
      {
        q: "The channels load but won't play — what's wrong?",
        a: "Almost always the player engine. Go to Settings → Player Selection and switch between Exo Player, IJK Player and VLC. One of them will decode your device's supported codecs correctly.",
      },
      {
        q: "Can I watch SuperSport in 4K on IPTV Smarters?",
        a: "Yes, on a 4K-capable device with a stable line. Mzansi Stream streams SuperSport PSL and Premier League in 4K/UHD where the source allows; for the smoothest result, hard-wire the device or use 5GHz Wi-Fi.",
      },
    ],
    related: [
      { label: "TiviMate setup", href: "/apps/tivimate/" },
      { label: "IBO Player setup", href: "/apps/ibo-player/" },
      { label: "IPTV on Samsung Smart TV", href: "/iptv-samsung-smart-tv/" },
      { label: "IPTV on Firestick / Fire TV", href: "/iptv-firestick-south-africa/" },
      { label: "All IPTV apps & players", href: "/apps/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-12",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── IBO PLAYER — the Samsung / LG go-to ────────────────────────────
  {
    slug: "ibo-player",
    eyebrow: "IBO Player · Player setup 2026",
    h1: "IBO Player Setup — Samsung, LG & Firestick (MAC + Key)",
    metaTitle: "IBO Player Setup 2026 — Samsung / LG Activation (SA)",
    metaDescription:
      "Set up IBO Player with Mzansi Stream in South Africa — MAC address + device key activation, M3U upload on Samsung Tizen, LG webOS, Firestick and Android. 4K SuperSport, EPG. From R99/mo.",
    lead:
      "IBO Player (and its close cousin IBO Pro Player) is the player most South Africans reach for on a Samsung or LG Smart TV, because it activates with your TV's MAC address and a device key rather than a fiddly login typed on a remote. This guide covers the exact MAC-and-key activation, how we load your Mzansi Stream playlist, and the difference between IBO Player and IBO Pro.",
    trustLine:
      "Samsung Tizen · LG webOS · Firestick · Android · MAC + device-key activation · 4K",
    cta: {
      primary: {
        label: "Activate IBO Player — send MAC & key →",
        message:
          "Hi! I'm using IBO Player. My MAC address is ___ and my device key is ___ — please upload my Mzansi Stream playlist.",
        ref: "App-IBO-Hero",
      },
      secondary: { label: "Jump to activation steps →", href: "#install" },
    },
    sections: [
      {
        id: "why-ibo",
        h2: "Why IBO Player on Samsung and LG",
        paragraphs: [
          "Typing an Xtream Codes URL on a Samsung or LG remote is painful. IBO Player sidesteps that: the app shows a MAC address and a device key on-screen, you send those two things to us on WhatsApp, and we upload your Mzansi Stream playlist to your device from our side. Nothing to type on the TV.",
          "There are two versions. IBO Player is the original and usually carries a small one-off activation fee after a trial period. IBO Pro Player is the newer build with the same MAC-and-key flow. Both work identically with Mzansi Stream — install whichever your TV's app store stocks.",
        ],
      },
      {
        id: "compatibility",
        h2: "Which devices run IBO Player?",
        bullets: [
          "Samsung Smart TV (Tizen) 2018+ — the most common IBO use case in SA.",
          "LG Smart TV (webOS) 2018+ — from the LG Content Store.",
          "Amazon Firestick / Fire TV & Android TV — from the respective store.",
          "Android phones & tablets — from Google Play.",
          "Note: iPhone / iPad support is limited; use IPTV Smarters Pro there instead.",
        ],
      },
      {
        id: "install",
        h2: "Activate IBO Player — step-by-step",
        steps: [
          {
            title: "Install IBO Player (or IBO Pro Player)",
            text: "Open your TV's app store — Samsung App Store or LG Content Store — search 'IBO Player' and install. On Firestick/Android use the respective store.",
          },
          {
            title: "Open it and read the two codes",
            text: "On launch the app displays a MAC address (00:1A:79:xx:xx:xx) and a Device Key. Write both down exactly, including capitalisation.",
          },
          {
            title: "Send us the MAC and key on WhatsApp",
            text: "Message us the MAC address and Device Key. We use the IBO device-management portal to attach your Mzansi Stream playlist and EPG to that exact device.",
          },
          {
            title: "We upload your Mzansi Stream playlist",
            text: "From our side we add the M3U / Xtream playlist and XMLTV EPG to your device key — usually within 5–10 minutes. You don't type anything on the TV.",
          },
          {
            title: "Reload the app",
            text: "Close and reopen IBO Player. Your channels, Movies, Series and the 7-day EPG appear automatically.",
          },
          {
            title: "Test SuperSport and set favourites",
            text: "Open Live TV → SuperSport PSL or Premier League. Add regulars to Favourites so they sit at the top of the list.",
          },
        ],
      },
      {
        id: "ibo-vs-pro",
        h2: "IBO Player vs IBO Pro Player — which one?",
        bullets: [
          "IBO Player — the original; broadest TV support; small one-off activation after the trial.",
          "IBO Pro Player — newer UI, same MAC-and-key upload flow; often the only one available on 2023+ Samsung firmware.",
          "Both take the same MAC + device key, so activation is identical for Mzansi Stream.",
          "If your Samsung store only lists one of them, install that one — we support both.",
        ],
      },
      {
        id: "troubleshooting",
        h2: "IBO Player not loading channels? Fixes",
        bullets: [
          "'No playlist' after activation — you may have sent one wrong character in the MAC or key; re-read them off the TV and resend.",
          "App shows a different MAC than expected — a factory reset or firmware update can change it; send the new MAC and we re-attach the playlist.",
          "Channels appear but the EPG is blank — reopen the app after 5 minutes; the guide syncs a little after the channel list.",
          "Buffering on 4K only — wire the TV over Ethernet or use 5GHz; Samsung/LG built-in Wi-Fi is often the limiter.",
          "App removed after a Samsung update — reinstall from the store; the same MAC re-activates without a new fee.",
        ],
      },
    ],
    faq: [
      {
        q: "How do I activate IBO Player with Mzansi Stream?",
        a: "Open IBO Player, read the MAC address and Device Key it shows on-screen, and send both to us on WhatsApp. We upload your Mzansi Stream playlist and EPG to that device from the IBO portal — you don't type anything on the TV. Reopen the app and your channels appear.",
      },
      {
        q: "Is IBO Player free?",
        a: "IBO Player and IBO Pro Player usually include a short free trial, then a small one-off activation fee paid to the app developer. That's separate from your Mzansi Stream subscription (from R99/month), which supplies the channels.",
      },
      {
        q: "IBO Player or IBO Pro Player — which should I install?",
        a: "Whichever your TV's app store stocks. They use the same MAC-and-key activation and both work identically with Mzansi Stream. On 2023+ Samsung firmware, IBO Pro Player is often the only one listed.",
      },
      {
        q: "Does IBO Player work on Samsung and LG TVs?",
        a: "Yes — that's its main use case in South Africa. It runs on Samsung Tizen and LG webOS TVs from around 2018 onward, plus Firestick and Android. iPhone/iPad support is limited, so use IPTV Smarters Pro there.",
      },
      {
        q: "My TV's MAC address changed — do I lose my channels?",
        a: "A factory reset or major firmware update can change the MAC IBO reports. Just send us the new MAC address and we re-attach your Mzansi Stream playlist to it — no new subscription needed.",
      },
    ],
    related: [
      { label: "IPTV on Samsung Smart TV", href: "/iptv-samsung-smart-tv/" },
      { label: "IPTV on LG webOS", href: "/devices/lg-webos/" },
      { label: "IPTV Smarters Pro setup", href: "/apps/iptv-smarters-pro/" },
      { label: "All IPTV apps & players", href: "/apps/" },
      { label: "Best IPTV in South Africa 2026", href: "/best-iptv-south-africa-2026/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-12",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── XCIPTV — the customisable Android player ───────────────────────
  {
    slug: "xciptv",
    eyebrow: "XCIPTV · Player setup 2026",
    h1: "XCIPTV Player Setup — Xtream Codes on Android & Firestick",
    metaTitle: "XCIPTV Setup 2026 — Xtream Codes, EPG, 4K (SA Guide)",
    metaDescription:
      "Set up XCIPTV Player with Mzansi Stream in South Africa — Xtream Codes login, EPG, catch-up and 4K SuperSport on Firestick, Android TV and Android phones. From R99/mo.",
    lead:
      "XCIPTV is a polished Android player with a movie-poster VOD wall, a clean live grid and built-in support for Xtream Codes, M3U and even multi-screen. It's a strong middle ground between TiviMate's power and IPTV Smarters' reach — and it looks great on a Firestick. This guide covers the Xtream Codes login for Mzansi Stream and the settings that keep 4K SuperSport smooth.",
    trustLine:
      "Firestick / Fire TV · Android TV · Android phone · Xtream Codes API · 7-day EPG · 4K",
    cta: {
      primary: {
        label: "Get my XCIPTV Xtream login →",
        message:
          "Hi! I want to use XCIPTV Player — please send my Xtream Codes URL, username and password plus the EPG link.",
        ref: "App-XCIPTV-Hero",
      },
      secondary: { label: "Jump to setup steps →", href: "#install" },
    },
    sections: [
      {
        id: "why-xciptv",
        h2: "Where XCIPTV fits",
        paragraphs: [
          "XCIPTV (from the Rocktech team) is built for Android and Fire OS. Its VOD section renders Mzansi Stream's Movies and Series as a poster wall that feels like a streaming app, and its live grid is quick. People pick it when they want something better-looking than IPTV Smarters but don't need TiviMate's recording and multi-view.",
          "Like every player here, XCIPTV is a shell — it plays your Mzansi Stream subscription, it doesn't provide channels. Log in with Xtream Codes for the full Live TV + Movies + Series + EPG bundle.",
        ],
      },
      {
        id: "compatibility",
        h2: "Which devices run XCIPTV?",
        bullets: [
          "Amazon Firestick / Fire TV / Fire TV Cube — from the Amazon Appstore.",
          "Android TV / Google TV / Android boxes — from Google Play.",
          "Android phones & tablets — from Google Play.",
          "NOT native: iPhone, iPad, Samsung Tizen, LG webOS — use IPTV Smarters or IBO Player there.",
        ],
      },
      {
        id: "install",
        h2: "Set up XCIPTV — step-by-step",
        steps: [
          {
            title: "Install XCIPTV",
            text: "Firestick: Amazon Appstore → 'XCIPTV'. Android / Google TV / phone: Google Play → 'XCIPTV Player'. Install and open it.",
          },
          {
            title: "Choose the Xtream Codes login",
            text: "On the login screen pick 'XTREAM CODES API' (not M3U or single stream).",
          },
          {
            title: "Enter your Mzansi Stream credentials",
            text: "Type a playlist name, then the Server URL (Any Name / Portal URL), Username and Password we sent on WhatsApp — with the http/https prefix and port intact.",
          },
          {
            title: "Load the libraries",
            text: "XCIPTV pulls Live TV, Movies and Series. The full lineup takes 30–60 seconds on first login.",
          },
          {
            title: "Confirm the EPG",
            text: "Open Live TV — the guide populates from the Xtream API. If a channel is blank, go to Settings → EPG → Update EPG.",
          },
          {
            title: "Tune playback and test 4K",
            text: "Settings → Player → try 'ExoPlayer' first; if a channel won't decode, switch to 'VLC' or 'MX Player'. Test SuperSport in 4K and add favourites.",
          },
        ],
      },
      {
        id: "settings",
        h2: "Settings that keep XCIPTV smooth",
        bullets: [
          "Player engine: ExoPlayer is fastest; VLC is the most compatible fallback for odd codecs.",
          "Auto-play last channel on boot — handy on a TV that everyone shares.",
          "Hardware decoding ON for 4K; turn it OFF only if a specific channel glitches.",
          "Hide adult / unused categories from Settings to keep the grid clean and fast.",
          "Enable the parental PIN if kids use the same Firestick.",
        ],
      },
      {
        id: "troubleshooting",
        h2: "XCIPTV troubleshooting",
        bullets: [
          "Login fails — check for a trailing space in the URL or password; re-enter exactly as we sent.",
          "Black screen on play — switch the player engine (ExoPlayer ↔ VLC ↔ MX Player).",
          "No EPG — Settings → EPG → Update EPG, then reopen Live TV.",
          "Stutter on 4K only — Ethernet or 5GHz; the CDN peers at NAPAfrica so local Wi-Fi is usually the limiter.",
          "VOD posters not loading — a slow first sync; give it a minute or force-refresh the Movies section.",
        ],
      },
    ],
    faq: [
      {
        q: "How do I log into XCIPTV with Mzansi Stream?",
        a: "Open XCIPTV, choose the 'XTREAM CODES API' login and enter the Server URL, username and password we send on WhatsApp. It loads Live TV, Movies, Series and the 7-day EPG automatically. Use Xtream Codes rather than M3U for the full bundle.",
      },
      {
        q: "Is XCIPTV free?",
        a: "XCIPTV has a free version and a paid 'Pro' unlock paid to the app developer. Either plays your Mzansi Stream subscription (from R99/month). The free build is enough for most households.",
      },
      {
        q: "Does XCIPTV work on Firestick?",
        a: "Yes — it's in the Amazon Appstore, so no side-loading needed. Install it, log in with your Xtream Codes credentials and you're watching in a couple of minutes.",
      },
      {
        q: "A channel shows a black screen — how do I fix it?",
        a: "That's a decoder mismatch. Go to Settings → Player and switch the engine between ExoPlayer, VLC and MX Player. One of them will decode the stream your device supports.",
      },
      {
        q: "Can XCIPTV do 4K SuperSport?",
        a: "Yes, on a 4K device with a stable line. Keep hardware decoding on, use ExoPlayer, and hard-wire or use 5GHz Wi-Fi for the smoothest PSL and Premier League streams.",
      },
    ],
    related: [
      { label: "TiviMate setup", href: "/apps/tivimate/" },
      { label: "IPTV Smarters Pro setup", href: "/apps/iptv-smarters-pro/" },
      { label: "IPTV on Firestick / Fire TV", href: "/iptv-firestick-south-africa/" },
      { label: "All IPTV apps & players", href: "/apps/" },
      { label: "IPTV with no buffering", href: "/iptv-no-buffering-south-africa/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-12",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── DUPLEX PLAY — the Samsung/LG classic ───────────────────────────
  {
    slug: "duplex-play",
    eyebrow: "Duplex Play · Player setup 2026",
    h1: "Duplex Play Setup — Samsung & LG (MAC + Device Key)",
    metaTitle: "Duplex Play Setup 2026 — Samsung / LG Playlist (SA)",
    metaDescription:
      "Set up Duplex Play with Mzansi Stream in South Africa — MAC address + device key, playlist upload on Samsung Tizen and LG webOS, EPG and 4K SuperSport. From R99/mo.",
    lead:
      "Duplex Play (Duplex IPTV) is a long-standing favourite on Samsung and LG Smart TVs. Like IBO Player, it activates with your TV's MAC address and a device key, and the Mzansi Stream playlist is uploaded from our side — no long URLs typed on a remote. This guide walks through the MAC-and-key activation and the settings that keep the guide and 4K streams stable.",
    trustLine:
      "Samsung Tizen · LG webOS · Android · MAC + device-key activation · EPG · 4K",
    cta: {
      primary: {
        label: "Activate Duplex Play — send MAC & key →",
        message:
          "Hi! I'm using Duplex Play. My MAC address is ___ and my device key is ___ — please upload my Mzansi Stream playlist.",
        ref: "App-Duplex-Hero",
      },
      secondary: { label: "Jump to activation steps →", href: "#install" },
    },
    sections: [
      {
        id: "why-duplex",
        h2: "Why Duplex Play on Samsung and LG",
        paragraphs: [
          "Duplex Play predates most of the newer players and is still stocked in the Samsung and LG stores, which makes it a reliable choice on older 2017–2020 Smart TVs where the newer apps sometimes won't install. Activation is the same MAC-and-key model as IBO: read two codes off the TV, send them to us, and we push the Mzansi Stream playlist to your device.",
          "Duplex is a player only — it carries no channels of its own. Your Mzansi Stream subscription supplies the 20,000+ channels, Movies, Series and the 7-day EPG.",
        ],
      },
      {
        id: "compatibility",
        h2: "Which devices run Duplex Play?",
        bullets: [
          "Samsung Smart TV (Tizen) 2017+ — from the Samsung App Store.",
          "LG Smart TV (webOS) 2017+ — from the LG Content Store.",
          "Android TV / Android boxes / phones — from Google Play (as 'Duplex IPTV').",
          "Not on iPhone / iPad — use IPTV Smarters Pro there instead.",
        ],
      },
      {
        id: "install",
        h2: "Activate Duplex Play — step-by-step",
        steps: [
          {
            title: "Install Duplex Play",
            text: "Open the Samsung App Store or LG Content Store, search 'Duplex Play' (or 'Duplex IPTV') and install it.",
          },
          {
            title: "Read the MAC address and device key",
            text: "On first launch Duplex shows a MAC address and a Device Key on-screen. Note both down exactly.",
          },
          {
            title: "Send the two codes on WhatsApp",
            text: "Message us the MAC and Device Key. We open the Duplex device portal and attach your Mzansi Stream playlist and EPG to that device.",
          },
          {
            title: "We upload your playlist",
            text: "From our side we add the M3U / Xtream playlist and XMLTV EPG — usually within 5–10 minutes. Nothing to type on the TV.",
          },
          {
            title: "Reload Duplex Play",
            text: "Close and reopen the app. Your channels, Movies, Series and 7-day guide load automatically.",
          },
          {
            title: "Test SuperSport and save favourites",
            text: "Open Live TV → SuperSport PSL or Premier League. Add the channels you watch most to Favourites.",
          },
        ],
      },
      {
        id: "troubleshooting",
        h2: "Duplex Play troubleshooting",
        bullets: [
          "'Playlist not found' — one wrong character in the MAC or key; re-read them and resend.",
          "MAC changed after a factory reset or firmware update — send the new MAC, we re-attach the playlist.",
          "Blank EPG — reopen after a few minutes; the guide syncs shortly after the channel list.",
          "4K buffering — hard-wire the TV over Ethernet or use 5GHz; built-in TV Wi-Fi is the usual limiter.",
          "App missing after a Samsung update — reinstall from the store; the same MAC re-activates.",
        ],
      },
    ],
    faq: [
      {
        q: "How do I set up Duplex Play with Mzansi Stream?",
        a: "Install Duplex Play from your Samsung or LG store, read the MAC address and device key it shows, and send both to us on WhatsApp. We upload your Mzansi Stream playlist and EPG to that device — you type nothing on the TV. Reopen the app and your channels appear.",
      },
      {
        q: "Is Duplex Play free?",
        a: "Duplex Play typically offers a trial then a small one-off activation fee to the app developer, separate from your Mzansi Stream subscription (from R99/month) which supplies the channels.",
      },
      {
        q: "Duplex Play or IBO Player — which is better on Samsung?",
        a: "Both use the same MAC-and-key upload and work identically with Mzansi Stream. Duplex Play is often the better bet on older 2017–2019 Samsung/LG TVs; IBO Pro Player tends to be stocked on newer firmware. Install whichever your store lists.",
      },
      {
        q: "My Samsung TV updated and Duplex disappeared — what now?",
        a: "Reinstall Duplex Play from the Samsung App Store. As long as the MAC address is unchanged it re-activates with your existing Mzansi Stream playlist. If the MAC changed, send us the new one.",
      },
      {
        q: "Does Duplex Play show the 7-day EPG?",
        a: "Yes. We attach the XMLTV EPG to your device when we upload the playlist, so the full 7-day guide appears in Live TV once the app reloads.",
      },
    ],
    related: [
      { label: "IBO Player setup", href: "/apps/ibo-player/" },
      { label: "IPTV on Samsung Smart TV", href: "/iptv-samsung-smart-tv/" },
      { label: "IPTV on LG webOS", href: "/devices/lg-webos/" },
      { label: "All IPTV apps & players", href: "/apps/" },
      { label: "Best IPTV in South Africa 2026", href: "/best-iptv-south-africa-2026/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-12",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── SPARKLE TV — the lightweight Samsung/LG player ─────────────────
  {
    slug: "sparkle-tv",
    eyebrow: "Sparkle TV · Player setup 2026",
    h1: "Sparkle TV Setup — Samsung & LG Smart TV (Playlist Upload)",
    metaTitle: "Sparkle TV Setup 2026 — Samsung / LG IPTV Player (SA)",
    metaDescription:
      "Set up Sparkle TV with Mzansi Stream in South Africa — MAC + device-key activation on Samsung Tizen and LG webOS, playlist upload, EPG and 4K SuperSport. From R99/mo.",
    lead:
      "Sparkle TV is a lightweight IPTV player for Samsung and LG Smart TVs that has become a popular alternative to Duplex and IBO. It uses the same device-based activation — a MAC address and a device key you send us, after which we upload your Mzansi Stream playlist. This guide covers activation, the EPG, and keeping 4K stable on a Smart TV's built-in Wi-Fi.",
    trustLine:
      "Samsung Tizen · LG webOS · MAC + device-key activation · lightweight · EPG · 4K",
    cta: {
      primary: {
        label: "Activate Sparkle TV — send MAC & key →",
        message:
          "Hi! I'm using Sparkle TV. My MAC address is ___ and my device key is ___ — please upload my Mzansi Stream playlist.",
        ref: "App-Sparkle-Hero",
      },
      secondary: { label: "Jump to activation steps →", href: "#install" },
    },
    sections: [
      {
        id: "why-sparkle",
        h2: "Why Sparkle TV",
        paragraphs: [
          "Sparkle TV is deliberately light — it loads fast on older and lower-spec Samsung and LG TVs where heavier players lag. The activation flow is the familiar MAC-and-key model: read two codes off the screen, send them to us, and your Mzansi Stream playlist and EPG are pushed to your device from our portal.",
          "As with every player in this hub, Sparkle carries no channels itself; your Mzansi Stream subscription provides the full lineup, Movies, Series and 7-day guide.",
        ],
      },
      {
        id: "compatibility",
        h2: "Which devices run Sparkle TV?",
        bullets: [
          "Samsung Smart TV (Tizen) 2018+ — from the Samsung App Store.",
          "LG Smart TV (webOS) 2018+ — from the LG Content Store.",
          "Best suited to Smart TVs; on Firestick/Android use TiviMate, XCIPTV or IPTV Smarters.",
          "Not on iPhone / iPad — use IPTV Smarters Pro there.",
        ],
      },
      {
        id: "install",
        h2: "Activate Sparkle TV — step-by-step",
        steps: [
          {
            title: "Install Sparkle TV",
            text: "Open the Samsung App Store or LG Content Store, search 'Sparkle TV' and install it.",
          },
          {
            title: "Read the MAC and device key",
            text: "On first launch Sparkle shows a MAC address and a Device Key. Note both exactly as displayed.",
          },
          {
            title: "Send the codes on WhatsApp",
            text: "Message us the MAC and Device Key. We attach your Mzansi Stream playlist and EPG to that device via the Sparkle portal.",
          },
          {
            title: "We upload your playlist",
            text: "We push the M3U / Xtream playlist and XMLTV EPG to your key — usually within 5–10 minutes. No typing on the TV.",
          },
          {
            title: "Reload the app",
            text: "Close and reopen Sparkle TV. Your channels and 7-day guide load automatically.",
          },
          {
            title: "Test 4K and set favourites",
            text: "Open Live TV → SuperSport or Premier League to confirm 4K, then add your regular channels to Favourites.",
          },
        ],
      },
      {
        id: "troubleshooting",
        h2: "Sparkle TV troubleshooting",
        bullets: [
          "No channels after activation — a mistyped MAC or key; re-read and resend both.",
          "MAC changed after a reset/firmware update — send the new MAC to re-attach the playlist.",
          "EPG blank — reopen the app after a few minutes; the guide syncs after the channel list.",
          "4K stutter — Ethernet or 5GHz; a Smart TV's built-in Wi-Fi is the usual bottleneck.",
          "App won't launch after a TV update — reinstall from the store; the same MAC re-activates.",
        ],
      },
    ],
    faq: [
      {
        q: "How do I activate Sparkle TV with Mzansi Stream?",
        a: "Install Sparkle TV from the Samsung or LG store, read the MAC address and device key it shows, and send both to us on WhatsApp. We upload your Mzansi Stream playlist and EPG to that device — nothing to type on the TV. Reopen the app and it loads.",
      },
      {
        q: "Is Sparkle TV free?",
        a: "Sparkle TV usually has a trial then a small one-off activation fee paid to the developer, separate from your Mzansi Stream subscription (from R99/month), which provides the channels.",
      },
      {
        q: "Is Sparkle TV good for an older Samsung TV?",
        a: "Yes — it's lightweight and loads faster than heavier players on older or lower-spec 2018–2020 Samsung and LG models. If it won't install on a very old TV, try Duplex Play or add a Firestick.",
      },
      {
        q: "Does Sparkle TV support 4K SuperSport?",
        a: "Yes, on a 4K TV with a stable connection. For the smoothest PSL and Premier League streams, hard-wire the TV over Ethernet or use 5GHz Wi-Fi rather than the 2.4GHz band.",
      },
      {
        q: "My device key stopped working — what should I do?",
        a: "Message us the current MAC address and device key from the app. We'll check the portal and re-attach your Mzansi Stream playlist. A factory reset or firmware update is the usual cause of a key change.",
      },
    ],
    related: [
      { label: "Duplex Play setup", href: "/apps/duplex-play/" },
      { label: "IBO Player setup", href: "/apps/ibo-player/" },
      { label: "IPTV on Samsung Smart TV", href: "/iptv-samsung-smart-tv/" },
      { label: "All IPTV apps & players", href: "/apps/" },
      { label: "IPTV on LG webOS", href: "/devices/lg-webos/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-12",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── FORMULER Z — the premium IPTV box ──────────────────────────────
  {
    slug: "formuler-z",
    eyebrow: "Formuler Z · Box setup 2026",
    h1: "Formuler Z IPTV Box Setup — MYTVOnline & Xtream Codes",
    metaTitle: "Formuler Z Setup 2026 — MYTVOnline, Xtream Codes (SA)",
    metaDescription:
      "Set up a Formuler Z box (Z8, Z10, Z11 Pro) with Mzansi Stream in South Africa — MYTVOnline 2/3, Xtream Codes login, EPG, catch-up and 4K SuperSport. From R99/mo.",
    lead:
      "Formuler Z boxes (Z8, Z10, Z11 Pro Max) are the enthusiast's dedicated IPTV hardware — an Android-based set-top box with the excellent MYTVOnline player pre-installed and a remote built for live TV. They're the closest thing to a DStv-decoder experience for IPTV. This guide covers loading Mzansi Stream into MYTVOnline via Xtream Codes, the EPG, and why a Formuler often streams 4K more reliably than a Firestick.",
    trustLine:
      "Formuler Z8 / Z10 / Z11 Pro · MYTVOnline 2 & 3 · Xtream Codes · Ethernet · 4K HDR",
    cta: {
      primary: {
        label: "Get my Formuler Xtream login →",
        message:
          "Hi! I have a Formuler Z box (model: ___) — please send my Xtream Codes URL, username and password for MYTVOnline.",
        ref: "App-Formuler-Hero",
      },
      secondary: { label: "Jump to setup steps →", href: "#install" },
    },
    sections: [
      {
        id: "why-formuler",
        h2: "Why a Formuler Z box",
        paragraphs: [
          "A Formuler Z is dedicated IPTV hardware, not a general streaming stick. It ships with MYTVOnline (versions 2 and 3), a player designed purely for live TV with a proper EPG, recording and a remote that has real channel keys. Because it's usually run over Ethernet with more RAM than a Firestick, it holds 4K SuperSport streams more steadily during a busy matchday.",
          "The Z11 Pro Max is the current flagship (4K HDR, fast); the Z10 and Z8 remain excellent. All of them load Mzansi Stream through MYTVOnline's Xtream Codes portal — the steps are the same across models.",
        ],
      },
      {
        id: "compatibility",
        h2: "Formuler models covered",
        bullets: [
          "Formuler Z11 Pro Max / Z11 Pro — current flagship, 4K HDR, MYTVOnline 3.",
          "Formuler Z10 Pro / Z10 Pro Max — 4K, excellent value, MYTVOnline 2/3.",
          "Formuler Z8 / Z8 Pro — older but still capable of 4K.",
          "Formuler CC / GTV models — Android TV based; can also run TiviMate/IPTV Smarters.",
          "All models connect over Ethernet (recommended) or 5GHz Wi-Fi.",
        ],
      },
      {
        id: "install",
        h2: "Set up Mzansi Stream in MYTVOnline — step-by-step",
        steps: [
          {
            title: "Connect and update the box",
            text: "Plug the Formuler into your TV (HDMI) and network (Ethernet recommended). On first boot, let it run any MYTVOnline update.",
          },
          {
            title: "Open MYTVOnline → add a portal",
            text: "Launch MYTVOnline. Go to Settings → Playlists / Portal → Add. Choose the 'Xtream Codes' (or 'Portal') option.",
          },
          {
            title: "Enter your Mzansi Stream credentials",
            text: "Enter the Server URL, Username and Password we sent on WhatsApp. Keep the http/https prefix and port exactly as provided.",
          },
          {
            title: "Load channels and libraries",
            text: "MYTVOnline pulls Live TV, Movies and Series plus the 7-day EPG over the Xtream API. First sync takes under a minute.",
          },
          {
            title: "Confirm the EPG and catch-up",
            text: "Open the guide — the 7-day EPG and catch-up appear automatically. If a channel is blank, refresh the EPG from Settings.",
          },
          {
            title: "Test 4K and map favourites",
            text: "Tune SuperSport PSL or Premier League to confirm 4K HDR. Use the remote's favourite key to build your channel list.",
          },
        ],
      },
      {
        id: "tips",
        h2: "Getting the best from a Formuler Z",
        bullets: [
          "Use Ethernet — the single biggest reliability gain for 4K on any box.",
          "MYTVOnline 3 (on Z11) has the slickest EPG; MYTVOnline 2 is still excellent on Z8/Z10.",
          "Enable the built-in recording to a USB drive for matches you'll miss live.",
          "If you prefer TiviMate's layout, Android-based Formuler models can side-load it — but MYTVOnline is purpose-built and usually enough.",
          "Keep the firmware current; Formuler ships regular MYTVOnline improvements.",
        ],
      },
      {
        id: "troubleshooting",
        h2: "Formuler Z troubleshooting",
        bullets: [
          "'Portal not loading' — a typo in the URL/username/password; re-enter exactly as sent.",
          "EPG blank — Settings → refresh EPG, then reopen the guide.",
          "4K drops to HD — check the Ethernet cable/port; a marginal Wi-Fi link caps bitrate.",
          "Remote lag — replace batteries or re-pair the Bluetooth remote in Settings.",
          "Box slow after months of use — clear the MYTVOnline cache or reboot; a firmware update often helps.",
        ],
      },
    ],
    faq: [
      {
        q: "How do I put Mzansi Stream on a Formuler Z box?",
        a: "Open MYTVOnline, add a portal, choose Xtream Codes, and enter the Server URL, username and password we send on WhatsApp. It loads Live TV, Movies, Series and the 7-day EPG automatically. Connect the box over Ethernet for the most stable 4K.",
      },
      {
        q: "Which Formuler model should I buy?",
        a: "The Z11 Pro Max is the current 4K HDR flagship with MYTVOnline 3. The Z10 Pro is the value pick, and the Z8 still handles 4K well. Any of them run Mzansi Stream through the same MYTVOnline Xtream Codes setup.",
      },
      {
        q: "Is a Formuler box better than a Firestick for IPTV?",
        a: "For live TV, usually yes. A Formuler is dedicated IPTV hardware with more RAM, an Ethernet port and the purpose-built MYTVOnline player, so it holds 4K SuperSport more steadily during a busy matchday than a low-RAM Firestick on Wi-Fi.",
      },
      {
        q: "Does MYTVOnline show the 7-day EPG and catch-up?",
        a: "Yes. Logging in with your Mzansi Stream Xtream Codes credentials pulls the full 7-day EPG and catch-up automatically. If a channel's guide is blank, refresh the EPG from MYTVOnline's settings.",
      },
      {
        q: "Can I record on a Formuler Z?",
        a: "Yes. MYTVOnline supports recording live channels to a USB drive plugged into the box. Handy for matches you can't watch live — schedule from the EPG.",
      },
    ],
    related: [
      { label: "MAG Box setup", href: "/devices/mag-box/" },
      { label: "Android TV box setup", href: "/devices/android-tv-box/" },
      { label: "TiviMate setup", href: "/apps/tivimate/" },
      { label: "All IPTV apps & players", href: "/apps/" },
      { label: "IPTV with no buffering", href: "/iptv-no-buffering-south-africa/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-12",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── STB EMULATOR — the MAG portal on Android ───────────────────────
  {
    slug: "stb-emulator",
    eyebrow: "STB Emulator · Player setup 2026",
    h1: "STB Emulator Setup — Stalker Portal on Android & Firestick",
    metaTitle: "STB Emulator Setup 2026 — MAC + Stalker Portal (SA)",
    metaDescription:
      "Set up STB Emulator with Mzansi Stream in South Africa — generate a MAC address, load the Stalker portal, EPG and 4K on Android TV, Firestick and Android boxes. From R99/mo.",
    lead:
      "STB Emulator turns an Android device or Firestick into a virtual MAG box: it emulates the Infomir MAG hardware and connects to a Stalker portal using a MAC address you generate in the app. It's the way to run a MAG-style portal without buying a MAG. This guide covers generating the MAC, sending it to us to whitelist, and loading your Mzansi Stream Stalker portal.",
    trustLine:
      "Android TV · Firestick / Fire TV · Android boxes · Stalker portal · MAC whitelist · EPG",
    cta: {
      primary: {
        label: "Whitelist my STB MAC →",
        message:
          "Hi! I'm using STB Emulator. My generated MAC address is ___ — please whitelist it and send the Stalker portal URL.",
        ref: "App-STB-Hero",
      },
      secondary: { label: "Jump to setup steps →", href: "#install" },
    },
    sections: [
      {
        id: "why-stb",
        h2: "When to use STB Emulator",
        paragraphs: [
          "STB Emulator (STB Emu) is for the Stalker-portal setup: instead of an Xtream Codes login, your Mzansi Stream line is delivered through a portal tied to a MAC address — exactly how a MAG box works. STB Emulator generates a virtual MAC on your Android device or Firestick, you send it to us, we whitelist it, and the portal loads.",
          "Most users are better off with Xtream Codes players (TiviMate, IPTV Smarters, XCIPTV) — they're simpler. Choose STB Emulator specifically when you want a MAG-style portal on hardware you already own, or when we've provisioned your line as a Stalker portal.",
        ],
      },
      {
        id: "compatibility",
        h2: "Which devices run STB Emulator?",
        bullets: [
          "Android TV / Google TV / Android boxes — from Google Play (STB Emu Free / Pro).",
          "Amazon Firestick / Fire TV — side-loaded via the Downloader app.",
          "Android phones & tablets — from Google Play.",
          "Not on iPhone / iPad, Samsung Tizen or LG webOS — use IBO Player or IPTV Smarters there.",
        ],
      },
      {
        id: "install",
        h2: "Set up STB Emulator — step-by-step",
        steps: [
          {
            title: "Install STB Emulator",
            text: "Android / Google TV: Google Play → 'STB Emulator'. Firestick: side-load the APK with the Downloader app (enable 'Install unknown apps' first).",
          },
          {
            title: "Open the app and note the MAC",
            text: "STB Emu generates a virtual MAC address (00:1A:79:xx:xx:xx). Find it under Settings (the gear or menu) → Profiles → your profile → 'STB MAC Address'.",
          },
          {
            title: "Send us the MAC to whitelist",
            text: "Message the MAC to us on WhatsApp. We add it to our Stalker portal — usually within 5 minutes.",
          },
          {
            title: "Enter the portal URL",
            text: "In the same profile, set 'Portal URL' to the Stalker portal address we send you. Leave the STB model as the default (MAG250/MAG254).",
          },
          {
            title: "Reload the profile",
            text: "Back out and reload the profile (or restart the app). The channel list, Movies, Series and EPG load from the portal.",
          },
          {
            title: "Test SuperSport and set favourites",
            text: "Open Live TV → SuperSport PSL or Premier League to confirm playback. Mark your regular channels as favourites in the portal menu.",
          },
        ],
      },
      {
        id: "troubleshooting",
        h2: "STB Emulator troubleshooting",
        bullets: [
          "'Portal not responding' / loading loop — the MAC isn't whitelisted yet, or the portal URL has a typo. Confirm both with us.",
          "'Authorization failed' — you may have regenerated the MAC after we whitelisted it; send the current MAC so we re-whitelist.",
          "Blank EPG — some Stalker portals sync the guide a minute after channels; reopen the guide.",
          "Black screen on a channel — Settings → change the player from the built-in to an external one (VLC / MX Player).",
          "4K stutter — Ethernet or 5GHz; the portal streams the same 4K feeds, so local Wi-Fi is the usual limiter.",
        ],
      },
    ],
    faq: [
      {
        q: "How does STB Emulator work with Mzansi Stream?",
        a: "STB Emulator generates a virtual MAC address on your Android device or Firestick. You send that MAC to us on WhatsApp, we whitelist it on our Stalker portal, and you enter the portal URL we provide. The channels, Movies, Series and EPG then load — just like a physical MAG box.",
      },
      {
        q: "Do I need STB Emulator, or should I use Xtream Codes?",
        a: "For most people, an Xtream Codes player (TiviMate, IPTV Smarters, XCIPTV) is simpler. Use STB Emulator when you specifically want a MAG-style Stalker portal on hardware you own, or when we've set your Mzansi Stream line up as a portal. Ask us which your line uses.",
      },
      {
        q: "Where do I find my MAC address in STB Emulator?",
        a: "Open Settings → Profiles → your profile → 'STB MAC Address'. It looks like 00:1A:79:xx:xx:xx. Send that exact value to us so we can whitelist it. Don't regenerate it afterwards, or you'll need to be re-whitelisted.",
      },
      {
        q: "Is STB Emulator free?",
        a: "STB Emu has a free version and a paid 'Pro' unlock paid to the app developer. Either works with Mzansi Stream (from R99/month). On Firestick you side-load it with the free Downloader app.",
      },
      {
        q: "The portal won't load — what's the fix?",
        a: "Nine times out of ten the MAC isn't whitelisted yet or was regenerated. Send us the current MAC address from STB Emulator's profile settings and confirm the portal URL matches what we sent. We re-whitelist within a few minutes.",
      },
    ],
    related: [
      { label: "MAG Box setup", href: "/devices/mag-box/" },
      { label: "TiviMate setup", href: "/apps/tivimate/" },
      { label: "IPTV Smarters Pro setup", href: "/apps/iptv-smarters-pro/" },
      { label: "All IPTV apps & players", href: "/apps/" },
      { label: "Android TV box setup", href: "/devices/android-tv-box/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-12",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },
];

export const IPTV_APP_SLUGS = IPTV_APPS.map((a) => a.slug);

export function getApp(slug: string): Pillar | undefined {
  return IPTV_APPS.find((a) => a.slug === slug);
}
