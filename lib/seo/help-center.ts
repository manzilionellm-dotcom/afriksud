// lib/seo/help-center.ts
// Help Center — troubleshooting articles that capture "problem" traffic
// (buffering, black screen, can't connect) and convert it into a WhatsApp
// support contact. Served at /[locale]/help/[slug]/.
//
// Format per the content-hub spec: answer-first (the `lead` is the fix in
// one paragraph, surfaced in the DirectAnswerBlock), probable cause, a
// step-by-step solution (emits HowTo schema), original FAQ, and a primary
// CTA that opens WhatsApp *support* rather than a sales trial. Reuses the
// `Pillar` shape + PillarTemplate; the route passes pathPrefix="/help".

import type { Pillar } from "./pillars";
import type { Locale } from "../locales";

const ZA: Locale = "en-za";

export const HELP_ARTICLES: Pillar[] = [
  // ─── CAN'T CONNECT / WON'T LOGIN ────────────────────────────────────
  {
    slug: "iptv-cannot-connect",
    eyebrow: "Help Center · Connection",
    h1: "IPTV Won't Connect or Log In — How to Fix It",
    metaTitle: "IPTV Won't Connect / Login — Fix (Mzansi Stream Help)",
    metaDescription:
      "IPTV won't connect or shows 'invalid credentials'? Fix login and connection errors on Mzansi Stream — Xtream Codes typos, expired line, DNS and network checks. Support on WhatsApp.",
    lead:
      "If your IPTV app won't connect or says 'invalid credentials', the cause is almost always a typo in the Xtream Codes URL, username or password, an expired subscription, or your network blocking the server. Re-enter the exact details we sent on WhatsApp (mind the http/https prefix and port), restart your router, and if it still fails, message us — we'll confirm your line is active and re-issue the login in minutes.",
    trustLine:
      "Answer-first fix · works on TiviMate, IPTV Smarters, IBO, XCIPTV · WhatsApp support",
    cta: {
      primary: {
        label: "Get help on WhatsApp →",
        message:
          "Hi! My Mzansi Stream won't connect / says invalid credentials. My app is ___ and my username is ___ — please check my line.",
        ref: "Help-CantConnect-Hero",
      },
      secondary: { label: "Jump to the fix →", href: "#fix" },
    },
    sections: [
      {
        id: "cause",
        h2: "Probable cause",
        paragraphs: [
          "A connection or login failure has four usual causes: (1) a typo when the Xtream Codes URL, username or password was entered — often a missing http/https, wrong port, or a trailing space; (2) the profile was added as 'M3U' when it should be 'Xtream Codes API'; (3) the subscription or trial has expired; or (4) the home network (or a VPN) is blocking the streaming server.",
        ],
        bullets: [
          "'Invalid credentials' / 'Authentication failed' → typo or expired line.",
          "'Could not connect to server' / endless loading → network, DNS or a VPN in the way.",
          "Worked yesterday, not today → line expired, or your ISP changed your IP and a portal needs re-whitelisting.",
        ],
      },
      {
        id: "fix",
        h2: "Fix it step-by-step",
        steps: [
          {
            title: "Re-enter your credentials exactly",
            text: "Delete the profile and re-add it. Choose 'Xtream Codes API' (not M3U). Copy the Server URL, Username and Password straight from our WhatsApp message — keep the http/https prefix, the port number, and no trailing spaces.",
          },
          {
            title: "Restart your router and device",
            text: "Power-cycle the router (30 seconds off), then reboot the Firestick / TV / box. This clears most 'could not connect' errors caused by a stale network session.",
          },
          {
            title: "Turn off any VPN",
            text: "A VPN or private-DNS setting can route around or block the server. Disable it and try again. If you need a VPN, ask us which server region works with your line.",
          },
          {
            title: "Try a different network",
            text: "Tether the device to your phone's mobile data for one test. If it connects on mobile but not on Wi-Fi, your home ISP or router is blocking the server — change your router's DNS to 8.8.8.8 / 1.1.1.1.",
          },
          {
            title: "Confirm your line is active",
            text: "If all of the above fail, the subscription or trial has likely lapsed. Message us your username on WhatsApp — we check the line status and re-activate or re-issue your login within minutes.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Why does my IPTV say 'invalid credentials'?",
        a: "Almost always a typo in the Xtream Codes URL, username or password (a missing http/https, wrong port, or a trailing space), or the profile was added as M3U instead of Xtream Codes. Re-enter exactly as we sent. If it's still failing, your line may have expired — message us and we'll check it.",
      },
      {
        q: "My IPTV worked yesterday but won't connect today.",
        a: "Two common reasons: your subscription/trial lapsed, or your ISP gave you a new IP and a MAC/portal line needs re-whitelisting. Restart your router first; if it still fails, send us your username on WhatsApp and we'll re-activate or re-whitelist you in minutes.",
      },
      {
        q: "Does a VPN stop IPTV from connecting?",
        a: "It can. A VPN or private DNS may route around or block the streaming server. Turn it off and test. If you specifically need a VPN, ask us which region to connect to so it works with your Mzansi Stream line.",
      },
      {
        q: "Everything looks right but it still won't log in.",
        a: "Test on your phone's mobile data. If it connects there but not on home Wi-Fi, your router or ISP is blocking the server — change the router DNS to 8.8.8.8 and 1.1.1.1, then reboot. Still stuck? Message us and we'll walk through it live.",
      },
    ],
    related: [
      { label: "Buffering — how to stop it", href: "/help/iptv-buffering/" },
      { label: "Network error — fixes", href: "/help/iptv-network-error/" },
      { label: "IPTV with no buffering", href: "/iptv-no-buffering-south-africa/" },
      { label: "All Help Center articles", href: "/help/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-20",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── BUFFERING ──────────────────────────────────────────────────────
  {
    slug: "iptv-buffering",
    eyebrow: "Help Center · Buffering",
    h1: "IPTV Keeps Buffering — How to Stop It",
    metaTitle: "IPTV Buffering Fix — Stop It in 5 Steps (SA Help)",
    metaDescription:
      "IPTV keeps buffering during the match? Fix buffering on Mzansi Stream — Ethernet vs Wi-Fi, 5GHz, router, player engine and 4K-to-HD. Answer-first guide + WhatsApp support.",
    lead:
      "If your IPTV keeps buffering, the bottleneck is almost always your home Wi-Fi — not your fibre line and not the stream. Hard-wire the device over Ethernet or move it to the 5GHz band, restart your router, and switch the channel from 4K to HD during peak matchday load. Mzansi Stream's CDN peers at NAPAfrica in Johannesburg and Cape Town, so once the local link is solid, buffering stops.",
    trustLine:
      "NAPAfrica-peered CDN · Ethernet fix · 5GHz · works on every player · WhatsApp support",
    cta: {
      primary: {
        label: "Still buffering? Message us →",
        message:
          "Hi! My Mzansi Stream keeps buffering. My device is ___, my ISP is ___ and I'm on [Wi-Fi/Ethernet] — please help.",
        ref: "Help-Buffering-Hero",
      },
      secondary: { label: "Jump to the fix →", href: "#fix" },
    },
    sections: [
      {
        id: "cause",
        h2: "Probable cause",
        paragraphs: [
          "Buffering means the player is emptying its buffer faster than the network refills it. On SA fibre in 2026 that's rarely the fibre line and almost never the IPTV server — it's the last few metres of Wi-Fi. A Firestick or Smart TV on 2.4GHz Wi-Fi across the house will buffer a 4K stream that the same line handles perfectly over Ethernet.",
        ],
        bullets: [
          "Weak or congested Wi-Fi (2.4GHz, far from the router) — the #1 cause.",
          "An old ISP-branded router capping 5GHz throughput.",
          "4K stream on a marginal link during peak matchday load.",
          "A wrong player engine forcing software decoding on a weak device.",
        ],
      },
      {
        id: "fix",
        h2: "Fix buffering step-by-step",
        steps: [
          {
            title: "Hard-wire the device over Ethernet",
            text: "The single biggest fix. A Firestick 4K with a USB-Ethernet adapter (about R250 on Takealot), or a Smart TV / box plugged into the router, eliminates Wi-Fi jitter completely.",
          },
          {
            title: "If you must use Wi-Fi, use 5GHz",
            text: "Connect the device to your router's 5GHz network (not 2.4GHz) and get it as close to the router as possible. Avoid streaming across two or three walls.",
          },
          {
            title: "Restart the router and device",
            text: "Power-cycle the router (30 seconds off) and reboot the streaming device. This clears congestion and re-negotiates the best Wi-Fi rate.",
          },
          {
            title: "Drop 4K to HD at peak times",
            text: "During a big match, switch to the HD version of the channel. HD needs a fraction of the bandwidth and stays rock-solid when the network is busy.",
          },
          {
            title: "Switch the player engine",
            text: "In TiviMate / IPTV Smarters / XCIPTV, change the decoder (Hardware ↔ Hardware+ ↔ Software, or ExoPlayer ↔ VLC). The right engine offloads decoding to the chip and stops micro-buffering.",
          },
          {
            title: "Upgrade the router if it's ISP-branded",
            text: "Many 2020–2023 ISP routers cap 5GHz at 60–80 Mbps. A Wi-Fi 6 router (TP-Link Archer AX55 ~R1,300, ASUS RT-AX55 ~R1,500) is a lasting fix.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Why does my IPTV buffer when my fibre is fast?",
        a: "Because speed isn't the issue — the last few metres of Wi-Fi are. A 500 Mbps line still buffers if the Firestick is on 2.4GHz across the house. Hard-wire the device over Ethernet or move to 5GHz and buffering usually stops immediately.",
      },
      {
        q: "Will an Ethernet cable stop IPTV buffering?",
        a: "In most SA homes, yes — it's the biggest single fix. A wired Firestick (USB-Ethernet adapter ~R250) or a Smart TV/box plugged into the router removes Wi-Fi jitter, which is the number-one cause of buffering.",
      },
      {
        q: "My IPTV only buffers during the soccer.",
        a: "That's peak-load 4K on a marginal link. Switch to the HD feed of the channel during the match — it uses far less bandwidth and stays stable. For 4K every time, wire the device over Ethernet.",
      },
      {
        q: "Does Mzansi Stream's server cause the buffering?",
        a: "Rarely. Our CDN peers at NAPAfrica in Johannesburg and Cape Town, so the stream reaches SA fibre in under 15ms. If one specific channel buffers for everyone, tell us and we'll check that source — but general buffering is almost always local Wi-Fi.",
      },
    ],
    related: [
      { label: "IPTV with no buffering (full guide)", href: "/iptv-no-buffering-south-africa/" },
      { label: "IPTV for Vumatel, Openserve & Frogfoot", href: "/iptv-vumatel-openserve-frogfoot/" },
      { label: "Playback keeps freezing — fix", href: "/help/iptv-playback-freezing/" },
      { label: "All Help Center articles", href: "/help/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-20",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── PLAYBACK FREEZING / CUTTING OUT ────────────────────────────────
  {
    slug: "iptv-playback-freezing",
    eyebrow: "Help Center · Playback",
    h1: "IPTV Playback Freezes or Cuts Out — Fixes",
    metaTitle: "IPTV Freezing / Cutting Out — Fix (Mzansi Stream Help)",
    metaDescription:
      "IPTV playback freezes, stutters or cuts out mid-stream? Fix freezing on Mzansi Stream — decoder engine, hardware decoding, cache, EPG reload and network checks. WhatsApp support.",
    lead:
      "If IPTV playback freezes or cuts out mid-stream while the channel list still works, the usual culprit is the player's decoder — not your subscription. Switch the player engine (Hardware ↔ Software, or ExoPlayer ↔ VLC), clear the app cache, and reboot the device. If only one channel freezes, it's that source; if everything freezes, it's the device or the local network.",
    trustLine:
      "Decoder-engine fix · clear-cache · works on every player · WhatsApp support",
    cta: {
      primary: {
        label: "Get help on WhatsApp →",
        message:
          "Hi! My Mzansi Stream playback keeps freezing / cutting out. My device is ___ and the app is ___ — please help.",
        ref: "Help-Freezing-Hero",
      },
      secondary: { label: "Jump to the fix →", href: "#fix" },
    },
    sections: [
      {
        id: "cause",
        h2: "Probable cause",
        paragraphs: [
          "There's a useful test: does one channel freeze, or all of them? If a single channel stutters while others play, the issue is that channel's source and we can swap it. If everything freezes, the cause is local — a decoder mismatch in the player, a full app cache, a low-RAM device struggling with 20,000 channels, or a brief network drop.",
        ],
        bullets: [
          "One channel only → that source; tell us and we'll fix or replace it.",
          "All channels → player decoder, app cache, device RAM, or a Wi-Fi drop.",
          "Freezes then resumes every few minutes → micro-buffering (see the buffering guide).",
        ],
      },
      {
        id: "fix",
        h2: "Fix freezing step-by-step",
        steps: [
          {
            title: "Switch the player engine",
            text: "In TiviMate / IPTV Smarters / XCIPTV, change the decoder: Hardware → Hardware+ → Software, or ExoPlayer → IJK → VLC. A codec the chip can't decode natively will freeze until you pick the right engine.",
          },
          {
            title: "Clear the app cache",
            text: "On Android/Fire OS: Settings → Applications → your IPTV app → Clear cache (not Clear data). A bloated cache causes stutters after weeks of use.",
          },
          {
            title: "Reboot the device",
            text: "Fully restart the Firestick / TV / box. Low-RAM sticks recover a lot of headroom after a reboot, especially with a big channel list loaded.",
          },
          {
            title: "Reload the playlist / EPG",
            text: "Reload your playlist so the app refreshes stream URLs. A stale URL can freeze on a source that has since moved.",
          },
          {
            title: "Lighten the channel list",
            text: "Hide categories you never watch. Fewer channels in memory means a low-RAM device stops choking mid-stream.",
          },
          {
            title: "If one channel freezes, report it",
            text: "Message us the exact channel name. We check that source and swap it — you don't have to live with a bad feed.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Why does my IPTV freeze but the menu still works?",
        a: "That's a playback/decoder issue, not a subscription one. Switch the player engine (Hardware ↔ Software, or ExoPlayer ↔ VLC) and clear the app cache. If only one channel freezes, it's that source — tell us and we'll swap it.",
      },
      {
        q: "One channel freezes but the rest are fine.",
        a: "That points to a single source, not your setup. Send us the exact channel name on WhatsApp and we'll check and replace that feed. There's no need to change anything on your device for a one-channel problem.",
      },
      {
        q: "Clearing cache didn't help — what next?",
        a: "Reboot the device, reload your playlist so stream URLs refresh, and hide channel groups you don't use to free RAM. On a very old Firestick, a low-RAM stick can struggle with 20,000 channels — a newer stick or an Ethernet-connected box is the durable fix.",
      },
      {
        q: "Freezing every few minutes then resuming?",
        a: "That's micro-buffering rather than a hard freeze — a network-refill problem. Follow the buffering guide: Ethernet or 5GHz, restart the router, and drop 4K to HD at peak times.",
      },
    ],
    related: [
      { label: "Buffering — how to stop it", href: "/help/iptv-buffering/" },
      { label: "Black screen — fixes", href: "/help/iptv-black-screen/" },
      { label: "Video quality & settings", href: "/help/iptv-video-quality/" },
      { label: "All Help Center articles", href: "/help/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-20",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── BLACK SCREEN ───────────────────────────────────────────────────
  {
    slug: "iptv-black-screen",
    eyebrow: "Help Center · Black screen",
    h1: "IPTV Black Screen (Channel Won't Play) — How to Fix",
    metaTitle: "IPTV Black Screen Fix — Channel Won't Play (SA Help)",
    metaDescription:
      "IPTV shows a black screen with sound, or no picture at all? Fix black-screen playback on Mzansi Stream — decoder engine, HDMI/HDCP, hardware decoding and 4K-to-HD. WhatsApp support.",
    lead:
      "A black screen where the channel is clearly selected — sometimes with sound, sometimes without — is nearly always a decoder or HDMI issue, not a dead subscription. Switch the player engine (ExoPlayer ↔ VLC ↔ hardware/software), toggle hardware decoding, and reseat the HDMI cable. If you get audio but no video, it's the video codec; if you get neither, it's the source or the connection.",
    trustLine:
      "Decoder + HDMI fix · audio-but-no-video diagnosis · every player · WhatsApp support",
    cta: {
      primary: {
        label: "Get help on WhatsApp →",
        message:
          "Hi! My Mzansi Stream shows a black screen on channels. My device is ___ and app is ___. I [do/don't] hear sound — please help.",
        ref: "Help-BlackScreen-Hero",
      },
      secondary: { label: "Jump to the fix →", href: "#fix" },
    },
    sections: [
      {
        id: "cause",
        h2: "Probable cause",
        paragraphs: [
          "The key diagnostic is sound. If you hear audio but see a black screen, the player can't decode the video codec — a decoder-engine fix. If you get neither picture nor sound, the stream isn't loading (source or network) or the HDMI/HDCP handshake failed (common on 4K over a cheap cable or a splitter).",
        ],
        bullets: [
          "Audio but no picture → video codec / decoder engine.",
          "No audio and no picture → source not loading, or HDMI/HDCP handshake.",
          "Black screen only on 4K channels → HDCP 2.2 or a marginal 4K link.",
          "Black screen after a specific channel → that source; we'll swap it.",
        ],
      },
      {
        id: "fix",
        h2: "Fix the black screen step-by-step",
        steps: [
          {
            title: "Switch the player engine",
            text: "If you have sound but no picture, change the decoder in your app: ExoPlayer → IJK → VLC, or Hardware → Software. This resolves most audio-only black screens.",
          },
          {
            title: "Toggle hardware decoding",
            text: "In player settings, turn hardware decoding off, test, then on again. Some channels decode only one way on a given chipset.",
          },
          {
            title: "Reseat the HDMI and avoid splitters",
            text: "Unplug and firmly reconnect the HDMI cable. Plug the device directly into the TV — HDMI splitters and old cables break the HDCP handshake on 4K and give a black screen.",
          },
          {
            title: "Test an HD channel",
            text: "If 4K is black but HD plays, it's an HDCP 2.2 / bandwidth issue on the 4K path. Use the HD feed, or use a certified HDMI 2.0 cable and a directly-connected HDMI port.",
          },
          {
            title: "Reboot and reload the playlist",
            text: "Restart the device and reload your playlist so stream URLs refresh. A stale URL can hand back a black frame.",
          },
          {
            title: "If one channel stays black, report it",
            text: "Message us the channel name — we check the source and replace it. A single black channel is on our side to fix, not yours.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Why is my IPTV showing a black screen with sound?",
        a: "The player can't decode the video codec on your device. Switch the decoder engine (ExoPlayer ↔ VLC) and toggle hardware decoding in your app's settings. That fixes the large majority of audio-only black screens.",
      },
      {
        q: "Black screen with no sound at all — what's wrong?",
        a: "Either the stream isn't loading (a source or network issue) or the HDMI/HDCP handshake failed. Reseat the HDMI cable, plug directly into the TV (no splitter), reboot, and reload your playlist. If one specific channel is affected, send us its name.",
      },
      {
        q: "Only 4K channels are black.",
        a: "That's usually HDCP 2.2 or a marginal 4K link. Use a certified HDMI 2.0 cable straight into the TV (no splitter), or switch to the HD feed. HD needs less bandwidth and skips the 4K HDCP handshake entirely.",
      },
      {
        q: "The whole app is a black screen on launch.",
        a: "Clear the app cache and reboot the device; on a Smart TV, a firmware update can require a quick reinstall. Your Xtream Codes or MAC login restores everything. Still black? Message us and we'll screen-share the fix.",
      },
    ],
    related: [
      { label: "Playback freezing — fixes", href: "/help/iptv-playback-freezing/" },
      { label: "Video quality & settings", href: "/help/iptv-video-quality/" },
      { label: "Can't connect / login — fix", href: "/help/iptv-cannot-connect/" },
      { label: "All Help Center articles", href: "/help/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-20",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── NETWORK ERROR ──────────────────────────────────────────────────
  {
    slug: "iptv-network-error",
    eyebrow: "Help Center · Network",
    h1: "IPTV Network Error — Diagnose and Fix",
    metaTitle: "IPTV Network Error Fix — DNS, Router, VPN (SA Help)",
    metaDescription:
      "IPTV shows a network error or won't load channels? Fix network errors on Mzansi Stream — router reboot, DNS change, VPN, mobile-data test and ISP checks. Answer-first + WhatsApp support.",
    lead:
      "An IPTV 'network error' means the app reached out and got nothing back. Reboot your router, change your DNS to 8.8.8.8 / 1.1.1.1, disable any VPN, and test the app on your phone's mobile data. If it works on mobile but not on home Wi-Fi, your ISP or router is blocking the server — the DNS change fixes most cases. If it fails everywhere, message us to confirm the line is live.",
    trustLine:
      "DNS + router fix · mobile-data test · VPN check · WhatsApp support",
    cta: {
      primary: {
        label: "Get help on WhatsApp →",
        message:
          "Hi! My Mzansi Stream shows a network error. My ISP is ___, my router is ___ and my device is ___ — please help.",
        ref: "Help-NetworkError-Hero",
      },
      secondary: { label: "Jump to the fix →", href: "#fix" },
    },
    sections: [
      {
        id: "cause",
        h2: "Probable cause",
        paragraphs: [
          "A network error is a connectivity problem between your device and the streaming server. The common causes are: a stale router session, an ISP DNS resolver that's slow or blocking the server, an active VPN or private-DNS profile, or (rarely) an outage on your fibre line. The fastest way to isolate it is the mobile-data test below.",
        ],
        bullets: [
          "Works on mobile data, not on Wi-Fi → home router or ISP DNS.",
          "Fails on both → line status, or a wider ISP/outage issue.",
          "Started after installing a VPN or privacy app → that app's DNS.",
        ],
      },
      {
        id: "fix",
        h2: "Fix the network error step-by-step",
        steps: [
          {
            title: "Power-cycle the router",
            text: "Switch the router off for 30 seconds, then on. Wait for a full reconnect. This clears the most common stale-session network errors.",
          },
          {
            title: "Run the mobile-data test",
            text: "Turn on your phone's hotspot and connect the streaming device to it. If the app works on mobile data, the problem is your home Wi-Fi / ISP — continue below. If it fails on mobile too, skip to step 5.",
          },
          {
            title: "Change your DNS",
            text: "In the device's network settings (or the router), set DNS to 8.8.8.8 and 1.1.1.1. A slow or filtering ISP resolver is a frequent cause of IPTV network errors. Reboot after changing.",
          },
          {
            title: "Disable VPN / private DNS",
            text: "Turn off any VPN app and, on Android, set Private DNS to 'Off' (Settings → Network → Private DNS). Re-test.",
          },
          {
            title: "Confirm line status with us",
            text: "If it fails on every network, the line may be expired or need re-whitelisting. Message us your username — we confirm the status and re-activate within minutes.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "What does 'network error' mean on IPTV?",
        a: "It means the app couldn't reach the streaming server — a connectivity issue, not usually a subscription one. Reboot the router, change DNS to 8.8.8.8 / 1.1.1.1, and disable any VPN. The mobile-data test tells you whether it's your home network or the line itself.",
      },
      {
        q: "It works on mobile data but not on my home Wi-Fi.",
        a: "Your router or ISP DNS is the problem. Change the DNS on the device (or router) to 8.8.8.8 and 1.1.1.1 and reboot. If your ISP filters certain servers, this resolves most network errors. Still stuck? We'll help you set it on your specific router.",
      },
      {
        q: "Do I need to change my DNS for IPTV?",
        a: "Only if you're getting network errors or slow channel loading. Many SA ISP resolvers are slow; setting 8.8.8.8 (Google) and 1.1.1.1 (Cloudflare) speeds up channel loading and clears a lot of 'network error' messages.",
      },
      {
        q: "The error appears on every device in the house.",
        a: "That points to the router, the ISP, or your line — not one device. Reboot the router, try the DNS change, and if it still fails everywhere, message us your username. We'll confirm whether the line is active or whether there's a wider issue.",
      },
    ],
    related: [
      { label: "Can't connect / login — fix", href: "/help/iptv-cannot-connect/" },
      { label: "Buffering — how to stop it", href: "/help/iptv-buffering/" },
      { label: "Network requirements for IPTV", href: "/knowledge-base/iptv-network-requirements/" },
      { label: "All Help Center articles", href: "/help/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-20",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── APP UPDATE / REINSTALL ─────────────────────────────────────────
  {
    slug: "iptv-app-update-reinstall",
    eyebrow: "Help Center · Updates",
    h1: "IPTV App Update or Reinstall — Do It Without Losing Your Setup",
    metaTitle: "IPTV App Update / Reinstall — Keep Your Login (SA Help)",
    metaDescription:
      "Need to update or reinstall your IPTV app after a firmware change? Update TiviMate, IPTV Smarters, IBO or Duplex on Mzansi Stream without losing channels or EPG. WhatsApp support.",
    lead:
      "Updating or reinstalling your IPTV app won't lose your subscription — your Mzansi Stream login lives with us, not in the app. Note your Xtream Codes details (or your MAC address for IBO/Duplex/Sparkle), reinstall from the store, and log back in. For MAC-and-key players, as long as the MAC is unchanged it re-activates automatically; if it changed, send us the new one.",
    trustLine:
      "Keep channels + EPG · Xtream vs MAC-and-key · every player · WhatsApp support",
    cta: {
      primary: {
        label: "Need your login again? Message us →",
        message:
          "Hi! I'm reinstalling / updating my IPTV app and need my Mzansi Stream login again. My app is ___ and username/MAC is ___.",
        ref: "Help-Update-Hero",
      },
      secondary: { label: "Jump to the steps →", href: "#fix" },
    },
    sections: [
      {
        id: "cause",
        h2: "When you need to update or reinstall",
        paragraphs: [
          "A few situations force an update or reinstall: a Samsung/LG firmware update removed the app, the app crashes on launch after months of use, a new app version fixes a bug, or you're moving to a newer device. In every case your subscription is safe — it's tied to your account with us, not stored inside the app.",
        ],
        bullets: [
          "Firmware update wiped the app from a Samsung/LG TV.",
          "App crashes or freezes on launch → a clean reinstall clears it.",
          "New version available → update for bug fixes and new features.",
          "The player just needs its cache cleared, not a full reinstall.",
        ],
      },
      {
        id: "fix",
        h2: "Update or reinstall step-by-step",
        steps: [
          {
            title: "Note your login first",
            text: "For Xtream Codes players (TiviMate, IPTV Smarters, XCIPTV, Formuler): have your Server URL, username and password ready (they're in our WhatsApp chat). For MAC-and-key players (IBO, Duplex, Sparkle): note the MAC address the app shows.",
          },
          {
            title: "Try clearing cache before reinstalling",
            text: "On Android/Fire OS: Settings → Applications → your app → Clear cache. This fixes most 'crashes on launch' problems without a full reinstall.",
          },
          {
            title: "Update from the store",
            text: "Open the Google Play / Amazon Appstore / Samsung / LG store and update the app if a newer version is listed. For side-loaded TiviMate/STB Emu on Firestick, fetch the latest APK with Downloader.",
          },
          {
            title: "Reinstall if needed",
            text: "Uninstall, then reinstall from the store. Your subscription is unaffected — nothing about your Mzansi Stream account lives inside the app.",
          },
          {
            title: "Log back in",
            text: "Xtream players: re-enter Server URL, username, password. MAC players: if the MAC is unchanged, it re-activates automatically; if the reinstall changed it, send us the new MAC and we re-attach your playlist.",
          },
          {
            title: "Reload channels and EPG",
            text: "Let the app pull the full lineup and 7-day guide again. Rebuild favourites if the app didn't sync them.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Will I lose my channels if I reinstall the IPTV app?",
        a: "No. Your Mzansi Stream subscription is tied to your account with us, not stored in the app. Reinstall, log back in with your Xtream Codes details (or MAC for IBO/Duplex/Sparkle), and the full channel list and EPG return.",
      },
      {
        q: "My Samsung TV updated and the IPTV app disappeared.",
        a: "A firmware update sometimes removes side-loaded or store apps. Reinstall it from the Samsung App Store. For IBO/Duplex/Sparkle, as long as the TV's MAC address is unchanged it re-activates with your existing playlist. If the MAC changed, send us the new one.",
      },
      {
        q: "Should I clear cache or fully reinstall?",
        a: "Try Clear cache first (Settings → Applications → your app) — it fixes most crash-on-launch and stutter problems without touching your setup. Only do a full reinstall if clearing cache doesn't help.",
      },
      {
        q: "How do I get my login details again?",
        a: "They're in your WhatsApp chat with us. If you can't find them, message us your username (or the name on your order) and we'll resend your Xtream Codes login or re-attach your MAC in a couple of minutes.",
      },
    ],
    related: [
      { label: "Changing to a new device", href: "/help/iptv-change-device/" },
      { label: "Account recovery", href: "/help/iptv-account-recovery/" },
      { label: "All IPTV apps & players", href: "/apps/" },
      { label: "All Help Center articles", href: "/help/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-20",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── CHANGE DEVICE ──────────────────────────────────────────────────
  {
    slug: "iptv-change-device",
    eyebrow: "Help Center · New device",
    h1: "Moving IPTV to a New Device (TV, Firestick or Phone)",
    metaTitle: "Move IPTV to a New Device — Keep Your Sub (SA Help)",
    metaDescription:
      "Got a new TV, Firestick or phone? Move your Mzansi Stream IPTV to a new device without paying again — Xtream Codes re-login or MAC re-whitelist, EPG and favourites. WhatsApp support.",
    lead:
      "Moving Mzansi Stream to a new TV, Firestick or phone is free — one subscription follows you, it isn't locked to hardware. Install the app on the new device, log in with the same Xtream Codes details, and you're watching. For MAC-based players (IBO, Duplex, Sparkle) on a new TV, send us the new MAC address and we attach your playlist. Watch the connection limit if the old device is still logged in.",
    trustLine:
      "One sub, any device · Xtream re-login · MAC re-whitelist · WhatsApp support",
    cta: {
      primary: {
        label: "Set up my new device →",
        message:
          "Hi! I'm moving Mzansi Stream to a new device (___). My username / old MAC is ___ — please help me set it up.",
        ref: "Help-ChangeDevice-Hero",
      },
      secondary: { label: "Jump to the steps →", href: "#fix" },
    },
    sections: [
      {
        id: "cause",
        h2: "How device changes work",
        paragraphs: [
          "Your Mzansi Stream subscription is an account, not a device licence. That means you can move it to a new Firestick, a new Smart TV, a phone or a box whenever you like — no extra charge. Two things to keep in mind: Xtream Codes logins move by simply re-entering the same details, while MAC-based players are tied to the specific TV, so a new TV needs its new MAC whitelisting. And every plan has a connection limit, so log out the old device if you've retired it.",
        ],
        bullets: [
          "Xtream Codes players → same URL, username, password on the new device.",
          "MAC players (IBO / Duplex / Sparkle) → new TV = new MAC to whitelist.",
          "Mind the connection limit — free up a slot by removing the old device.",
        ],
      },
      {
        id: "fix",
        h2: "Move to a new device step-by-step",
        steps: [
          {
            title: "Install your player on the new device",
            text: "Install the same app (or the best one for the new device) from its store. On a new Firestick, side-load TiviMate/STB Emu with Downloader; on a new Samsung/LG, use IBO/Duplex/Sparkle.",
          },
          {
            title: "Xtream Codes: just log in again",
            text: "Enter the same Server URL, username and password we sent originally. The full lineup and EPG load — no new subscription, no extra cost.",
          },
          {
            title: "MAC player on a new TV: send the new MAC",
            text: "Open IBO/Duplex/Sparkle on the new TV, read its MAC address and device key, and send them to us. We attach your existing playlist to the new device.",
          },
          {
            title: "Retire the old device",
            text: "If you've replaced the old device, tell us so we can free the connection slot. This avoids 'connection limit reached' when both are logged in.",
          },
          {
            title: "Rebuild favourites",
            text: "Favourites are stored per-device on most players, so re-add your regular channels on the new one. Ask us if you'd like a cloud-synced player recommendation.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Can I move my IPTV to a new device for free?",
        a: "Yes. Your Mzansi Stream subscription is tied to your account, not to hardware. Install the app on the new TV, Firestick or phone and log in with the same Xtream Codes details — no extra charge. For MAC-based players on a new TV, send us the new MAC to whitelist.",
      },
      {
        q: "I got a new Samsung TV — how do I move my IPTV?",
        a: "Install IBO Player, Duplex Play or Sparkle TV on the new Samsung, read the MAC address and device key it shows, and send both to us. We attach your existing Mzansi Stream playlist to the new TV — you don't need to buy anything again.",
      },
      {
        q: "Do I need to cancel the old device first?",
        a: "Not to move, but do tell us if you've retired the old device so we can free its connection slot. Every plan has a connection limit; if the old and new devices are both logged in, you may hit 'connection limit reached'.",
      },
      {
        q: "Will my channels and EPG be the same on the new device?",
        a: "Yes — the same lineup, Movies, Series and 7-day EPG load once you log in. Only your favourites are device-specific on most players, so you'll re-add those. Ask us for a player that syncs favourites if you switch devices often.",
      },
    ],
    related: [
      { label: "Update or reinstall the app", href: "/help/iptv-app-update-reinstall/" },
      { label: "Account recovery", href: "/help/iptv-account-recovery/" },
      { label: "Which platform should I choose?", href: "/knowledge-base/which-iptv-platform-to-choose/" },
      { label: "All Help Center articles", href: "/help/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-20",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── ACCOUNT RECOVERY ───────────────────────────────────────────────
  {
    slug: "iptv-account-recovery",
    eyebrow: "Help Center · Account",
    h1: "Recover Your IPTV Account or Lost Login",
    metaTitle: "IPTV Account Recovery — Lost Login Fix (SA Help)",
    metaDescription:
      "Lost your Mzansi Stream login, changed your phone, or your line expired? Recover your IPTV account and get your Xtream Codes or MAC playlist re-issued. Answer-first + WhatsApp support.",
    lead:
      "If you've lost your IPTV login, changed phones, or your line stopped working, recovery is quick — message us on WhatsApp with the name or number on your order and we re-issue your Xtream Codes login or re-attach your MAC playlist. Your subscription is stored on our side, so nothing is truly lost, even if you've wiped the app or replaced the device.",
    trustLine:
      "Login re-issue · line re-activation · MAC re-attach · WhatsApp support",
    cta: {
      primary: {
        label: "Recover my account on WhatsApp →",
        message:
          "Hi! I need to recover my Mzansi Stream account. The name/number on my order is ___ — please re-issue my login.",
        ref: "Help-Recovery-Hero",
      },
      secondary: { label: "Jump to the steps →", href: "#fix" },
    },
    sections: [
      {
        id: "cause",
        h2: "Common account situations",
        paragraphs: [
          "Account recovery covers a handful of cases: you cleared or reinstalled the app and lost the login on-screen; you changed your phone number and worry your subscription is gone; the line expired and you want to renew; or someone else set it up for you and you don't have the details. In all of these, your subscription record lives with us, so we can restore access from your order details.",
        ],
        bullets: [
          "Lost the Xtream Codes login → we resend it.",
          "Changed phone/number → the subscription is unaffected; we re-verify you.",
          "Line expired → renew and we reactivate the same login.",
          "Someone set it up for you → we recover it from the order name/number.",
        ],
      },
      {
        id: "fix",
        h2: "Recover your account step-by-step",
        steps: [
          {
            title: "Message us on WhatsApp",
            text: "Open a chat with us and say you need account recovery. Use the same WhatsApp number you ordered with if you still have it — it's the fastest match.",
          },
          {
            title: "Give us an identifier",
            text: "Send any of: your Xtream Codes username, the name on the order, the email/number used, or the approximate purchase date. Any one of these lets us find your subscription.",
          },
          {
            title: "We verify and re-issue",
            text: "We confirm the account is yours and resend your Xtream Codes login (or re-attach your MAC playlist for IBO/Duplex/Sparkle). This usually takes a few minutes.",
          },
          {
            title: "Renew if the line expired",
            text: "If recovery shows the subscription lapsed, we tell you the renewal amount. Once paid, the same login reactivates — no need to set everything up again.",
          },
          {
            title: "Log back in and reload",
            text: "Enter the re-issued details on your device, reload the channel list and EPG, and rebuild favourites. You're back where you were.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "I lost my IPTV login — can I get it back?",
        a: "Yes. Your Mzansi Stream subscription is stored on our side, so nothing is lost. Message us on WhatsApp with your username, the name on the order, or the number you used, and we re-issue the login within minutes.",
      },
      {
        q: "I changed my phone number — is my subscription gone?",
        a: "No. The subscription isn't tied to a specific phone. Message us from any number with your order details (old number, username or name) and we'll verify you and restore access.",
      },
      {
        q: "My line expired — do I have to set everything up again?",
        a: "No. When you renew, we reactivate the same login, so your device keeps working without re-installing or re-entering anything new. Just message us to renew and we handle it.",
      },
      {
        q: "Someone else set up my IPTV and I don't have the details.",
        a: "That's fine — we can recover it from the order. Send us the name, number or email used at purchase (or the approximate date), and we'll locate the subscription and issue you a login you control.",
      },
    ],
    related: [
      { label: "Update or reinstall the app", href: "/help/iptv-app-update-reinstall/" },
      { label: "Moving to a new device", href: "/help/iptv-change-device/" },
      { label: "Can't connect / login — fix", href: "/help/iptv-cannot-connect/" },
      { label: "All Help Center articles", href: "/help/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-20",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },

  // ─── VIDEO QUALITY / SETTINGS ───────────────────────────────────────
  {
    slug: "iptv-video-quality",
    eyebrow: "Help Center · Picture quality",
    h1: "Improve IPTV Video Quality (Blurry, SD or Not 4K)",
    metaTitle: "IPTV Video Quality Fix — Get Sharp 4K (SA Help)",
    metaDescription:
      "IPTV looks blurry, soft or stuck in SD instead of 4K? Improve Mzansi Stream picture quality — pick the 4K/FHD feed, hardware decoding, TV picture settings and bandwidth. WhatsApp support.",
    lead:
      "If your IPTV looks soft, blurry or stuck in SD, first make sure you've selected the 4K or FHD version of the channel — many channels have SD, HD and 4K feeds. Then enable hardware decoding, set your TV's picture mode away from 'eco', and confirm your line has the bandwidth for 4K. Mzansi Stream carries SuperSport and Premier League in up to 4K where the source allows; picking the right feed is usually the whole fix.",
    trustLine:
      "Pick the 4K feed · hardware decoding · TV picture mode · WhatsApp support",
    cta: {
      primary: {
        label: "Get sharper picture — message us →",
        message:
          "Hi! My Mzansi Stream picture looks blurry / stuck in SD. My TV is ___ and device is ___ — please help me get 4K.",
        ref: "Help-Quality-Hero",
      },
      secondary: { label: "Jump to the fix →", href: "#fix" },
    },
    sections: [
      {
        id: "cause",
        h2: "Probable cause",
        paragraphs: [
          "Soft or SD-looking picture usually comes down to three things: you're on the SD or HD feed when a 4K/FHD feed exists for that channel; your player is software-decoding instead of using the TV's chip; or your TV's picture settings (eco mode, low sharpness, wrong HDMI mode) are dulling the image. Bandwidth matters too — a 4K stream that can't fill its buffer drops to a lower resolution automatically.",
        ],
        bullets: [
          "On the SD/HD feed when a 4K/FHD one exists — the most common cause.",
          "Software decoding softening the image — enable hardware decoding.",
          "TV in eco/standard mode or low sharpness — change the picture preset.",
          "Not enough bandwidth for 4K — the stream auto-drops resolution.",
        ],
      },
      {
        id: "fix",
        h2: "Sharpen the picture step-by-step",
        steps: [
          {
            title: "Select the 4K or FHD feed",
            text: "Many channels appear in SD, HD, FHD and 4K variants. In your player, choose the '4K', 'UHD' or 'FHD' version of SuperSport / Premier League rather than the plain SD entry. Ask us which categories hold the 4K feeds.",
          },
          {
            title: "Enable hardware decoding",
            text: "In TiviMate / IPTV Smarters / XCIPTV, turn hardware decoding on (Hardware or Hardware+). It uses the device's video chip for a cleaner, sharper image than software decoding.",
          },
          {
            title: "Fix your TV's picture settings",
            text: "Switch the TV picture mode off 'Eco' to 'Standard', 'Cinema' or 'Filmmaker'. Set the HDMI input to the full/4K range, and raise sharpness a little. On Samsung, disable 'Eco Solution' which dims the panel.",
          },
          {
            title: "Give 4K enough bandwidth",
            text: "4K needs ~25 Mbps steady. Hard-wire the device over Ethernet or use 5GHz. On a shared line during peak hours, a 4K stream can auto-drop to HD to avoid buffering — free up bandwidth or use the FHD feed.",
          },
          {
            title: "Confirm the device can output 4K",
            text: "A basic Firestick or old box may cap at 1080p. For true 4K use a Firestick 4K, a 4K Android box, a Formuler Z or a 4K Smart TV app, connected with an HDMI 2.0 cable.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Why does my IPTV look blurry or stuck in SD?",
        a: "Usually you're watching the SD or HD feed when a 4K/FHD version of that channel exists. Pick the '4K' or 'FHD' entry for SuperSport or Premier League, enable hardware decoding in your player, and set your TV's picture mode off 'eco'. That fixes the large majority of soft-picture complaints.",
      },
      {
        q: "How do I watch SuperSport in 4K on Mzansi Stream?",
        a: "Choose the 4K/UHD feed of the SuperSport channel (not the SD one), use a 4K-capable device with hardware decoding on, connect over Ethernet or 5GHz for the ~25 Mbps 4K needs, and set your TV to a full-range HDMI picture mode. Ask us which category the 4K feeds live in.",
      },
      {
        q: "My picture drops from 4K to blurry during the match.",
        a: "That's the stream auto-dropping resolution because the link can't sustain 4K bandwidth at peak time. Hard-wire the device over Ethernet, or switch to the FHD feed which holds steady on a busy network. It's a bandwidth issue, not a source-quality one.",
      },
      {
        q: "Does my device limit the IPTV picture quality?",
        a: "It can. A basic (non-4K) Firestick or an old box caps at 1080p regardless of the feed. For genuine 4K, use a Firestick 4K, a 4K Android box, a Formuler Z, or your TV's built-in 4K app, with an HDMI 2.0 cable straight into the TV.",
      },
    ],
    related: [
      { label: "Improve video quality (Knowledge Base)", href: "/knowledge-base/improve-iptv-video-quality/" },
      { label: "4K IPTV in South Africa", href: "/4k-iptv-south-africa/" },
      { label: "Buffering — how to stop it", href: "/help/iptv-buffering/" },
      { label: "All Help Center articles", href: "/help/" },
    ],
    hasHowTo: true,
    datePublished: "2026-06-20",
    dateModified: "2026-07-18",
    preferredLocale: ZA,
  },
];

export const HELP_SLUGS = HELP_ARTICLES.map((a) => a.slug);

export function getHelpArticle(slug: string): Pillar | undefined {
  return HELP_ARTICLES.find((a) => a.slug === slug);
}
