// lib/seo/pillars.ts
// Top-of-funnel head-term pillar pages. These target the highest-volume
// SA + diaspora IPTV queries that no programmatic route currently covers.
// Each pillar carries deep H2 sections, FAQ entities, HowTo steps where
// relevant, and explicit internal links to convert organic into WhatsApp.

import type { Locale } from "../locales";

export type PillarSection = {
  /** Anchor id — used as `#id` for in-page nav + breadcrumb. */
  id: string;
  h2: string;
  /** Optional — sections may carry only bullets or only steps. */
  paragraphs?: string[];
  bullets?: string[];
  /** Optional step list rendered as <ol> + emitted as HowTo schema. */
  steps?: { title: string; text: string }[];
};

export type PillarFaq = { q: string; a: string };

export type PillarRelated = { label: string; href: string };

export type Pillar = {
  slug: string;
  /** Top tag rendered above H1 ("Best IPTV · 2026 guide" etc.). */
  eyebrow: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** Lead paragraph immediately under H1 (60-90 words). */
  lead: string;
  /** Trust strip line under lead (one sentence). */
  trustLine?: string;
  /** Hero CTAs — the first one is the primary WhatsApp action. */
  cta: {
    primary: { label: string; message: string; ref: string };
    secondary?: { label: string; href: string };
  };
  sections: PillarSection[];
  faq: PillarFaq[];
  /** Internal cross-links rendered as a "Related" block + included in
   *  the page's invisible link graph so PageRank flows to the leaves. */
  related: PillarRelated[];
  /** Whether the pillar should emit a HowTo schema. Set true when any
   *  section uses `steps[]`. */
  hasHowTo: boolean;
  /** Date used in JSON-LD `datePublished` / `dateModified`. */
  datePublished: string;
  dateModified: string;
  /** Audience locale defaults to en-ZA but pillar can target diaspora. */
  preferredLocale: Locale;
};

const ZA: Locale = "en-za";

export const PILLARS: Pillar[] = [
  // ─── 1. BEST IPTV SOUTH AFRICA 2026 ─────────────────────────────────
  {
    slug: "best-iptv-south-africa-2026",
    eyebrow: "Best IPTV · 2026 buyer's guide",
    h1: "Best IPTV in South Africa 2026 — Honest Buyer's Guide",
    metaTitle:
      "Best IPTV South Africa 2026 — 20,000+ Channels in 4K | Mzansi Stream",
    metaDescription:
      "The honest 2026 buyer's guide to the best IPTV in South Africa. Compare price, channels, sport, 4K, support and what to check before you pay. From R99/mo with a 24h free trial.",
    lead:
      "Choosing the best IPTV in South Africa in 2026 means weighing price, channel lineup, sport coverage, 4K stability on Vumatel and Openserve, support quality and the simple question — can you actually cancel without a fight? This guide ranks what to look for, what to ignore and why Mzansi Stream tops the practical short-list for SA households cutting the DStv cord.",
    trustLine:
      "20,000+ channels · SuperSport in 4K · WhatsApp activation in 10 minutes · No contract · 7-day money-back guarantee",
    cta: {
      primary: {
        label: "Start the free 24h trial →",
        message:
          "Hi! I read the 'Best IPTV South Africa 2026' guide and I'd like the free 24-hour trial.",
        ref: "Pillar-BestIPTV-Hero",
      },
      secondary: { label: "Jump to comparison →", href: "#comparison" },
    },
    sections: [
      {
        id: "what-matters",
        h2: "What actually matters in 2026 (and what doesn't)",
        paragraphs: [
          "The South African IPTV market in 2026 looks nothing like it did in 2020. Fibre is everywhere — Vumatel, Openserve, Frogfoot, Octotel, MetroFibre, MTN and Vodacom now cover most of the Joburg, Cape Town, Durban and Pretoria metros. SuperSport remains the centre of gravity for sport, but more households are paying R899/month for DStv Premium when most of the channels they actually watch are on a single service tier away from each other. The shortlist below is what genuinely matters when comparing providers in 2026.",
          "Ignore vanity claims like '50,000 channels' — most are dead, geo-blocked or duplicate language tracks. What matters is how many of the channels you actually watch every week are stable in 4K on your fibre line, on your specific TV or stick.",
        ],
        bullets: [
          "Channel lineup that maps to what you actually watch (SABC, e.tv, SuperSport, kykNET, Mzansi Magic, Premier League).",
          "4K UHD on every plan, not gated behind a R+200 'premium' tier.",
          "Stable streaming on your fibre line — Vumatel, Openserve and Frogfoot are the standard test.",
          "Support that replies on WhatsApp within minutes, not a 5-day email queue.",
          "Local payment methods — EFT, SnapScan, Ozow, Capitec Pay — without a forced credit card.",
          "Trial without a card so you can verify before you pay.",
          "Cancellation that's a single WhatsApp message, not a 30-day notice in a portal that hides the option.",
        ],
      },
      {
        id: "comparison",
        h2: "Best IPTV providers in South Africa — 2026 short-list",
        paragraphs: [
          "Most of the SA IPTV market is private, so a fully objective benchmark is impossible without paying for every provider for 30 days. This short-list reflects what's currently being recommended by SA fibre installers, kykNET-focused households and Joburg / Cape Town reseller networks in early 2026.",
          "Mzansi Stream sits in the price-quality sweet spot for households who want one stable subscription that covers the full DStv-equivalent channel pack, the full SuperSport line-up in 4K, and 20,000+ international channels — without a 24-month contract.",
        ],
        bullets: [
          "Mzansi Stream — from R99/mo, full SuperSport in 4K, WhatsApp support, no contract. Best all-rounder for SA households.",
          "Reseller marketplaces (Facebook groups, Gumtree) — cheap (R50-R80/mo) but typically 720p, frequent outages and no recourse when the link dies.",
          "DStv Stream — official, R249-R899/mo, 24-month commitment on Premium tier, no real ICDN edge benefit over a strong IPTV provider in 2026.",
          "Showmax — R99/mo for streaming-only catalogue, no live SuperSport sport tier without an upgrade, no SABC.",
          "Imported IPTV with US/EU IPs — high buffering risk on SA fibre, geo-blocking on SuperSport feeds.",
        ],
      },
      {
        id: "price-quality",
        h2: "Price vs. quality — the 2026 IPTV pricing reality",
        paragraphs: [
          "Healthy SA IPTV pricing in 2026 sits between R99 and R200/month on annual plans, R150-R250 on monthly. Anything cheaper than R80 typically means an oversubscribed reseller link that crashes during the Soweto Derby. Anything more expensive than R250 needs to justify it with unique premium add-ons (BeIN sport pack, specialised PVR, multi-screen on 4 devices).",
          "Mzansi Stream prices break down to R99/month on the 12-month plan (R1,199 once) and R149/month on the 3-month plan (R449 once) — both with the full lineup, 4K UHD and direct WhatsApp support. The 7-day money-back guarantee removes the 'what if it sucks' objection that kills most IPTV first-time buyers.",
        ],
      },
      {
        id: "sport",
        h2: "Sport coverage — SuperSport, Premier League and beyond",
        paragraphs: [
          "Sport is the single biggest reason households keep DStv. A good 2026 IPTV must carry every SuperSport feed (PSL, Variety 1-4, Rugby, Cricket, Premier League), the URC and Currie Cup, every Springbok Test, all SA20 fixtures, and ideally Formula 1, UFC and the major boxing cards.",
          "Mzansi Stream's sport pack mirrors DStv Premium without the R899 price tag. Premier League in 4K is included on every plan. URC, Currie Cup and the full PSL cup competitions stream on SuperSport feeds with stable bitrate during peak Soweto Derby load.",
        ],
        bullets: [
          "PSL — every match-day across SuperSport PSL + Variety 1-4.",
          "Premier League — full coverage, 4K UHD.",
          "URC + Currie Cup — every fixture from October to June.",
          "Cricket — Proteas + SA20 + ICC tournaments.",
          "Formula 1 — every Grand Prix weekend.",
          "Springboks — every Test live in 4K.",
        ],
      },
      {
        id: "devices",
        h2: "Devices — what works in 2026",
        paragraphs: [
          "Most modern Smart TVs (Samsung Tizen 2022+, LG webOS 2022+, Sony Bravia, Hisense) install IPTV Smarters Pro or a similar M3U player from the built-in store in under five minutes. Amazon Firestick 4K and Android TV boxes (Nvidia Shield, Xiaomi Mi Box) are the gold standard for IPTV — TiviMate Premium gives the smoothest EPG UX in the market. iPhone, iPad and Android phones run IPTV Smarters Player out of the box.",
          "Mzansi Stream supports every standard M3U device — no proprietary decoder, no installer fee, no monthly device tax.",
        ],
        bullets: [
          "Firestick 4K — TiviMate Premium (best mobile-first IPTV UX).",
          "Samsung Tizen Smart TV — IPTV Smarters Pro via app store.",
          "LG webOS — Smart IPTV or SS IPTV.",
          "Android TV Box (Nvidia Shield / Mi Box / Onn) — TiviMate Premium.",
          "iPhone / iPad — IPTV Smarters Player from the App Store.",
          "MAG Box (322 / 524 / 540) — built-in Stalker portal.",
        ],
      },
      {
        id: "legality",
        h2: "Is IPTV legal in South Africa in 2026?",
        paragraphs: [
          "Streaming TV via IPTV is not illegal per se in South Africa — IPTV is just a technology, in the same way an internet browser is a technology. What is illegal is the unauthorised distribution of copyrighted content without a licence.",
          "Mzansi Stream sources channel feeds via licensed partners, accepts traceable South African payment methods (EFT, SnapScan, Capitec Pay, Ozow), processes personal data under POPIA, and publishes its information officer per the Protection of Personal Information Act 4 of 2013. A reputable IPTV provider in SA in 2026 is one that operates openly, not one that requires anonymous crypto via a Telegram channel.",
        ],
      },
      {
        id: "support",
        h2: "Support — the deciding factor most buyers underweight",
        paragraphs: [
          "The single biggest difference between a frustrated IPTV customer and a happy one is how fast support replies when something breaks at 9 PM on a Saturday before a big match. Phone IVR (DStv) and email-only (most resellers) both fail this test. WhatsApp support, with a real human reply within 10 minutes during opening hours, is the new standard.",
          "Mzansi Stream replies on WhatsApp from 08:00 to 23:00 SAST, seven days a week including public holidays. Most issues are diagnosed and resolved inside an hour.",
        ],
      },
      {
        id: "verdict",
        h2: "Verdict — which IPTV is best in South Africa in 2026?",
        paragraphs: [
          "For a SA household watching SuperSport, kykNET, SABC, Premier League and 20,000+ international channels on a Samsung Smart TV, Firestick or Android TV box in 2026, Mzansi Stream is the strongest practical choice. Price-quality sweet spot, full SuperSport in 4K, WhatsApp support, no contract, money-back guarantee, traceable SA payment methods, POPIA-compliant.",
          "The 24-hour free trial without a credit card removes the only real risk of trying. Cancel by replying to the same WhatsApp thread — no installer to send away, no 30-day notice period, no SMS chase from a sales team trying to retain you.",
        ],
      },
    ],
    faq: [
      {
        q: "Which is the best IPTV in South Africa in 2026?",
        a: "Mzansi Stream is the strongest practical choice for SA households in 2026 — 20,000+ channels including the full SuperSport line-up in 4K, Premier League on every plan, kykNET and SABC included, from R99/month on the 12-month plan, with WhatsApp support 08:00-23:00 SAST and no contract.",
      },
      {
        q: "How much does a good IPTV cost in South Africa?",
        a: "Healthy SA IPTV pricing in 2026 is R99-R200/month on annual plans and R150-R250/month on monthly plans. Cheaper than R80/month typically means an unstable reseller link. Mzansi Stream's 12-month plan is R1,199 (R99/month equivalent).",
      },
      {
        q: "Is IPTV legal in South Africa?",
        a: "IPTV is a legal technology in South Africa. What's illegal is the unauthorised distribution of copyrighted content. Mzansi Stream sources its channels via licensed partners, accepts traceable SA payment methods and is POPIA-compliant.",
      },
      {
        q: "Will an IPTV work with my Vumatel / Openserve / Frogfoot fibre line?",
        a: "Yes. Mzansi Stream peers at NAPAfrica with CDN edges in Johannesburg and Cape Town, so 4K streams cleanly on every major SA fibre network: Vumatel, Openserve, Frogfoot, Octotel, MetroFibre, MTN Fibre, Vodacom Fibre and Rain 5G.",
      },
      {
        q: "Do I need a VPN to use IPTV in South Africa?",
        a: "No. Mzansi Stream works without a VPN on every major SA fibre network. Some users add a VPN for personal privacy reasons — it's a choice, not a requirement.",
      },
      {
        q: "Which app is best for IPTV — TiviMate, IPTV Smarters or GSE?",
        a: "TiviMate Premium gives the smoothest EPG UX on Firestick and Android TV boxes. IPTV Smarters Pro is the easiest install on Samsung Tizen and LG webOS Smart TVs. GSE Smart IPTV works well on iPad and iPhone. Mzansi Stream provides M3U links that work in any standard player.",
      },
      {
        q: "Can I watch SuperSport without DStv?",
        a: "Yes. Mzansi Stream carries every SuperSport feed (PSL, Variety 1-4, Rugby, Cricket, Premier League, MotorSport, Tennis, Golf) in 4K without a DStv subscription.",
      },
      {
        q: "How do I pay for IPTV in South Africa?",
        a: "Mzansi Stream accepts EFT, SnapScan, Zapper, Yoco, Ozow, Capitec Pay, Visa, Mastercard, PayPal and Bitcoin. No credit card is required for the 24-hour free trial.",
      },
      {
        q: "Is there a 24h free IPTV trial without a credit card?",
        a: "Yes. Message Mzansi Stream on WhatsApp and we activate a 24-hour trial — full 20,000+ channel lineup, 4K UHD, EPG, no card required.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes — there is no contract, no auto-renewal and no 30-day notice period. Your subscription expires at the end of the period you've paid for. A 7-day money-back guarantee covers the first week.",
      },
    ],
    related: [
      { label: "DStv alternative — complete 2026 guide", href: "/dstv-alternative/" },
      {
        label: "Best IPTV for Firestick in South Africa",
        href: "/iptv-firestick-south-africa/",
      },
      {
        label: "IPTV for Samsung Smart TV (Tizen)",
        href: "/iptv-samsung-smart-tv/",
      },
      {
        label: "Watch SuperSport without DStv",
        href: "/iptv-supersport-without-dstv/",
      },
      { label: "IPTV in Johannesburg", href: "/cities/johannesburg/" },
      { label: "IPTV in Cape Town", href: "/cities/cape-town/" },
      { label: "Mzansi Stream vs DStv Premium", href: "/vs/dstv-premium/" },
    ],
    hasHowTo: false,
    datePublished: "2026-01-10",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  // ─── 2. IPTV FIRESTICK SOUTH AFRICA ─────────────────────────────────
  {
    slug: "iptv-firestick-south-africa",
    eyebrow: "Firestick install · 10-minute setup",
    h1: "IPTV Firestick South Africa — Install in 10 Minutes (2026 Guide)",
    metaTitle:
      "IPTV Firestick South Africa 2026 — TiviMate Setup in 10 Min | Mzansi Stream",
    metaDescription:
      "Step-by-step IPTV Firestick setup for South Africa in 2026 — TiviMate Premium, M3U link, EPG, 4K SuperSport. Works on Vumatel, Openserve, Frogfoot. From R99/mo.",
    lead:
      "The Amazon Firestick 4K is the most popular IPTV device in South Africa in 2026 — cheap, plug-and-play, and TiviMate Premium gives the slickest IPTV experience on any platform. This guide walks through the complete Mzansi Stream install on Firestick using TiviMate or IPTV Smarters Pro, with troubleshooting for the common SA-specific issues (Vumatel DNS, Openserve buffering, EPG load order).",
    trustLine:
      "TiviMate or IPTV Smarters Pro · 4K UHD SuperSport · EPG included · 10-minute install · WhatsApp support",
    cta: {
      primary: {
        label: "Get the Firestick M3U link →",
        message:
          "Hi! I want IPTV on my Firestick — please send the M3U link and setup steps for TiviMate.",
        ref: "Pillar-Firestick-Hero",
      },
      secondary: { label: "Jump to the setup steps →", href: "#install" },
    },
    sections: [
      {
        id: "why-firestick",
        h2: "Why Firestick is the #1 IPTV device in South Africa",
        paragraphs: [
          "The Amazon Firestick 4K and Firestick 4K Max have become the default IPTV device for South African households because they tick every practical box: under R1,000 from Takealot, plug into any HDMI TV including older non-Smart sets, run TiviMate Premium with no rooting or jailbreaking, and stream 4K HDR over any standard fibre line.",
          "Compared to a Smart TV's built-in OS, the Firestick gives you a dedicated remote, faster app launches, regular Amazon firmware updates and a single playlist that survives even if the TV changes. For a family that rotates the IPTV setup between bedrooms or holiday homes, the Firestick is unbeatable.",
        ],
      },
      {
        id: "what-you-need",
        h2: "What you need before starting",
        bullets: [
          "Amazon Firestick 4K or Firestick 4K Max (HD Firestick works but caps at 1080p).",
          "Stable internet — minimum 10 Mbps for HD, 25 Mbps for 4K SuperSport.",
          "Amazon account (any country — the Firestick works fine with a UK/US account on a SA TV).",
          "Mzansi Stream M3U link + portal credentials (we send these on WhatsApp).",
          "About 10 minutes of uninterrupted time for the first install.",
        ],
        paragraphs: [
          "If your Firestick is on the original Amazon firmware (2019 or earlier), update to FireOS 7+ first via Settings → My Fire TV → About → Check for Updates. TiviMate's installer requires recent FireOS for the sideload to succeed cleanly.",
        ],
      },
      {
        id: "install",
        h2: "Install IPTV on Firestick — 10-minute step-by-step",
        steps: [
          {
            title: "Enable third-party apps on Firestick",
            text: "On the Firestick home screen, go to Settings → My Fire TV → Developer Options → Install Unknown Apps → enable for Downloader. If Developer Options is hidden, tap 'About' seven times to unlock it.",
          },
          {
            title: "Install Downloader",
            text: "From the Firestick search bar (magnifying glass icon), type 'Downloader' and install the official app by AFTVnews (orange icon).",
          },
          {
            title: "Sideload TiviMate via Downloader",
            text: "Open Downloader, click in the URL field and enter 'tivimate.com/companion' (we send the exact current URL on WhatsApp because the TiviMate domain changes occasionally). Install when the APK download completes.",
          },
          {
            title: "Open TiviMate and add your M3U playlist",
            text: "Launch TiviMate, choose 'Add playlist' → 'Enter URL'. Paste the M3U URL we sent you on WhatsApp. Name the playlist 'Mzansi Stream'.",
          },
          {
            title: "Set the EPG (TV guide) source",
            text: "TiviMate auto-detects the EPG from the M3U metadata. If it doesn't, manually paste the XMLTV URL we send alongside the M3U.",
          },
          {
            title: "Test the 4K SuperSport stream",
            text: "Find SuperSport PSL or Premier League in the channel list and start the stream. You should see 4K UHD at 50 fps with no buffering. If the stream stutters, see the troubleshooting section below.",
          },
        ],
        paragraphs: [
          "TiviMate is the cleanest UX but it's not free — the Premium licence is once-off (about R250 lifetime) and unlocks multi-playlist, picture-in-picture and recording. If you'd rather a free alternative, IPTV Smarters Pro works identically with the same Mzansi Stream M3U link.",
        ],
      },
      {
        id: "iptv-smarters",
        h2: "Alternative — IPTV Smarters Pro on Firestick (free)",
        paragraphs: [
          "IPTV Smarters Pro is the standard free alternative to TiviMate. The UX is more 'classic IPTV' (less polished but completely functional) and the install is identical: sideload via Downloader, then enter the M3U URL we send on WhatsApp.",
          "Use IPTV Smarters Pro if you don't want to pay for TiviMate Premium, if you need M3U URL switching on a multi-household account, or if you're running the same M3U on a low-spec Firestick HD where TiviMate's animations stutter.",
        ],
      },
      {
        id: "vumatel-openserve",
        h2: "Streaming on Vumatel, Openserve and Frogfoot in 2026",
        paragraphs: [
          "Mzansi Stream's CDN edges at NAPAfrica in Johannesburg and Cape Town give every major SA fibre line low-latency 4K. Specifically: Vumatel, Openserve and Frogfoot peer directly with NAPAfrica, so 4K SuperSport runs at <50ms with no router-side QoS tweaks needed.",
          "If you're on MTN Fibre, Vodacom Fibre or Rain 5G, performance is also excellent — slightly higher latency but no impact on 4K stability. Octotel and MetroFibre also stream cleanly.",
          "The only consistently flaky setup we see is older WiFi routers (Huawei B315s, ZTE H168N) that bottleneck the 5GHz radio at 80 Mbps. If your Firestick is on the 5GHz radio but capped at 1080p, replace the router or hard-wire the Firestick over Ethernet (Amazon sells a USB-Ethernet adapter for R250).",
        ],
      },
      {
        id: "troubleshooting",
        h2: "Common Firestick IPTV problems and fixes",
        bullets: [
          "Stream starts in HD then drops to 480p — your router is throttling. Switch from 2.4GHz to 5GHz, or hard-wire via USB-Ethernet adapter.",
          "EPG (TV guide) is empty — paste the XMLTV URL we sent on WhatsApp into TiviMate → Settings → EPG → Add URL.",
          "TiviMate says 'Subscription not active' — wait 30 seconds and retry. The M3U URL caches at the CDN; activation takes up to 60 seconds after we send it.",
          "SuperSport feeds buffer during the Soweto Derby — extremely rare in 2026 because we provisioned for peak PSL load, but reboot the Firestick and switch to a backup SuperSport feed if it persists.",
          "Firestick remote stops responding mid-stream — typical Firestick issue, hold Home + Back for 10 seconds to soft-reset, no IPTV side fix needed.",
        ],
      },
      {
        id: "rooting",
        h2: "Do I need to jailbreak / root the Firestick?",
        paragraphs: [
          "No — and you shouldn't. Mzansi Stream installs cleanly on a stock Firestick via Downloader. Anyone telling you that you need to 'jailbreak' the Firestick to run IPTV is selling a script that breaks Amazon's TOS and risks your Amazon account being banned (which would also kill your Prime Video and Audible). The legitimate sideload path via Downloader keeps your warranty and your Amazon account intact.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I install IPTV on Firestick in South Africa?",
        a: "Yes. The Amazon Firestick 4K is the most popular IPTV device in South Africa in 2026. Mzansi Stream installs in under 10 minutes via TiviMate Premium or IPTV Smarters Pro, sideloaded through the Downloader app. No rooting or jailbreaking required.",
      },
      {
        q: "Which is the best IPTV app for Firestick — TiviMate or IPTV Smarters?",
        a: "TiviMate Premium has the cleanest UX, the best EPG and multi-playlist support — recommended for most users. IPTV Smarters Pro is the free alternative and works perfectly with the same Mzansi Stream M3U link.",
      },
      {
        q: "Does IPTV work in 4K on Firestick?",
        a: "Yes. The Firestick 4K and Firestick 4K Max stream Mzansi Stream's SuperSport, Premier League and movie channels in full 4K UHD on any modern Smart TV with HDMI 2.0+. Minimum recommended bandwidth is 25 Mbps.",
      },
      {
        q: "Do I need to jailbreak my Firestick to install IPTV?",
        a: "No. Mzansi Stream installs cleanly on a stock Firestick via the official Downloader app — no rooting, no jailbreak, no Amazon account risk. Anyone telling you otherwise is selling an unnecessary script.",
      },
      {
        q: "Will IPTV work on my Firestick with Vumatel / Openserve / Frogfoot?",
        a: "Yes. Mzansi Stream peers at NAPAfrica with edges in Johannesburg and Cape Town, so Vumatel, Openserve and Frogfoot all stream 4K cleanly. MTN Fibre, Vodacom Fibre, Rain 5G, Octotel and MetroFibre also work well.",
      },
      {
        q: "How do I update the M3U link on Firestick?",
        a: "In TiviMate: Settings → Playlists → tap your playlist → Update URL. In IPTV Smarters Pro: Settings → Manage Playlists → Edit. Mzansi Stream rotates the M3U URL rarely — when we do, we send the new URL on WhatsApp.",
      },
      {
        q: "Does the Firestick HD (not 4K) work with IPTV?",
        a: "Yes. The Firestick HD (Lite or 2nd gen) works fine for SD and HD streams but caps at 1080p. If you want 4K SuperSport, choose the Firestick 4K or Firestick 4K Max.",
      },
      {
        q: "How much does an IPTV subscription for Firestick cost in South Africa?",
        a: "Mzansi Stream is R99/month on the 12-month plan (R1,199 once), or R149/month on the 3-month plan (R449 once). All plans include the full 20,000+ channel lineup, 4K UHD, EPG and WhatsApp support — no separate device tax.",
      },
    ],
    related: [
      {
        label: "Best IPTV in South Africa 2026 — buyer's guide",
        href: "/best-iptv-south-africa-2026/",
      },
      {
        label: "IPTV for Samsung Smart TV (Tizen) — full guide",
        href: "/iptv-samsung-smart-tv/",
      },
      {
        label: "Watch SuperSport without DStv",
        href: "/iptv-supersport-without-dstv/",
      },
      { label: "DStv alternative — complete 2026 guide", href: "/dstv-alternative/" },
      { label: "IPTV in Johannesburg", href: "/cities/johannesburg/" },
      { label: "IPTV in Cape Town", href: "/cities/cape-town/" },
    ],
    hasHowTo: true,
    datePublished: "2026-01-15",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  // ─── 3. IPTV SAMSUNG SMART TV ───────────────────────────────────────
  {
    slug: "iptv-samsung-smart-tv",
    eyebrow: "Samsung Smart TV · Tizen install",
    h1: "IPTV for Samsung Smart TV (Tizen) — 2026 South Africa Guide",
    metaTitle:
      "IPTV Samsung Smart TV South Africa 2026 — Tizen Install | Mzansi Stream",
    metaDescription:
      "Install IPTV on a Samsung Smart TV (Tizen) in South Africa — IPTV Smarters Pro, M3U link, 4K SuperSport, kykNET. Works on every 2022+ Samsung. From R99/mo.",
    lead:
      "Samsung Smart TVs running Tizen (2022 and later) install IPTV natively from the Samsung App Store — no Firestick required, no sideload, no developer mode. This guide covers the complete Mzansi Stream install on Samsung Tizen using IPTV Smarters Pro or Smart IPTV, with troubleshooting for the Samsung-specific quirks (regional store, OneRemote pairing, the M3U cache reload).",
    trustLine:
      "Samsung Tizen 2022+ · IPTV Smarters Pro · 4K UHD SuperSport · Native install · No Firestick needed",
    cta: {
      primary: {
        label: "Get the Samsung M3U link →",
        message:
          "Hi! I want IPTV on my Samsung Smart TV — please send the M3U link and setup steps for IPTV Smarters Pro on Tizen.",
        ref: "Pillar-Samsung-Hero",
      },
      secondary: { label: "Jump to the setup steps →", href: "#install" },
    },
    sections: [
      {
        id: "which-samsung-works",
        h2: "Which Samsung TVs support IPTV in 2026?",
        paragraphs: [
          "Every Samsung Smart TV running Tizen OS (2018 onwards, but practically 2022+ for the best app store availability) supports IPTV via M3U player apps from the Samsung Smart Hub. This includes the entire QLED, Crystal UHD, Neo QLED, OLED S9x, and most Crystal 4K mid-range lines sold by Hirsch's, Game and Makro across South Africa.",
          "If your Samsung TV is from 2021 or earlier, IPTV Smarters Pro may not be in the regional Samsung store — in that case, install Smart IPTV (the older standard) or sideload via a Firestick (see our Firestick guide).",
        ],
        bullets: [
          "Samsung QLED Q60-Q95 series (2022, 2023, 2024, 2025) — fully supported.",
          "Samsung Neo QLED QN85-QN95 — fully supported, 4K HDR10+.",
          "Samsung Crystal UHD AU/BU/CU/DU series — fully supported.",
          "Samsung OLED S90C/S95C/S95D — fully supported, 4K UHD.",
          "The Frame (2022+) — fully supported.",
          "Older Tizen 2018-2021 — use Smart IPTV instead of IPTV Smarters Pro.",
        ],
      },
      {
        id: "what-you-need",
        h2: "What you need before starting",
        bullets: [
          "Samsung Smart TV running Tizen OS 2022 or newer (Settings → Support → About → Software Version).",
          "Stable internet — Samsung TVs work better over Ethernet than 2.4GHz WiFi; switch to 5GHz or hard-wire if possible.",
          "Samsung account signed in (required to install apps from the Samsung Smart Hub).",
          "Mzansi Stream M3U link + Xtream Codes credentials (we send these on WhatsApp).",
          "About 8-12 minutes of time. First install takes longest because Tizen's app store is sometimes slow on first connect.",
        ],
      },
      {
        id: "install",
        h2: "Install IPTV on Samsung Smart TV — step-by-step",
        steps: [
          {
            title: "Open the Samsung Smart Hub",
            text: "Press the Home button on the Samsung remote. The Smart Hub bar appears at the bottom of the screen.",
          },
          {
            title: "Search for IPTV Smarters Pro",
            text: "Scroll to Apps → magnifying glass → type 'IPTV Smarters Pro'. Install the app (free). If it doesn't appear, your TV's regional store might not stock it — fall back to 'Smart IPTV'.",
          },
          {
            title: "Open IPTV Smarters Pro and add your account",
            text: "Open the app. Choose 'Login with Xtream Codes API'. Enter the URL, username and password Mzansi Stream sent you on WhatsApp. Name the connection 'Mzansi Stream'.",
          },
          {
            title: "Wait for the channel list to load",
            text: "Tizen takes 30-60 seconds to load the full 20,000+ channel list the first time. Subsequent launches load in under 5 seconds.",
          },
          {
            title: "Configure the EPG (TV guide)",
            text: "IPTV Smarters auto-detects EPG when using Xtream Codes login. If it doesn't, go to Settings → EPG → paste the XMLTV URL we sent on WhatsApp.",
          },
          {
            title: "Test 4K SuperSport",
            text: "Find SuperSport PSL in the Sport category. Play it. On a 2022+ Samsung, you should see 4K UHD with HDR if your stream is HDR-encoded. If the stream is only 1080p, check your internet speed (need 25 Mbps for 4K).",
          },
        ],
      },
      {
        id: "smart-iptv",
        h2: "Alternative for older Samsung — Smart IPTV",
        paragraphs: [
          "Smart IPTV is the older M3U player that worked on Samsung Tizen from 2018-2022. It's still maintained and works on every Samsung Smart TV — but it's a once-off €5.49 unlock after the 7-day trial, and the activation is per-MAC-address (you'll need your TV's MAC address from Settings → Network → Network Status).",
          "Use Smart IPTV if your Samsung is from 2018-2021 and IPTV Smarters Pro isn't in your store, or if you specifically want the simpler 'pure M3U' interface without the Xtream Codes login wrapper.",
        ],
      },
      {
        id: "troubleshooting",
        h2: "Common Samsung IPTV problems and fixes",
        bullets: [
          "App not in store — your TV's regional store doesn't stock IPTV Smarters Pro. Use Smart IPTV instead, or connect a Firestick to a free HDMI port.",
          "Channels load but won't play — check that you've entered the correct Xtream Codes URL (no trailing slash, no spaces). We can re-send credentials on WhatsApp.",
          "4K SuperSport plays at 1080p only — your internet is under 25 Mbps or your TV is on 2.4GHz WiFi. Switch to 5GHz or Ethernet.",
          "EPG empty — paste the XMLTV URL we sent into Settings → EPG → Add URL.",
          "OneRemote pairs but won't navigate the app — power-cycle the TV (unplug for 60 seconds). Tizen sometimes loses Bluetooth focus to background services.",
          "Stream freezes mid-match — Samsung's auto-DLNA service sometimes hijacks bandwidth. Disable DLNA in Settings → General → Network → Expert Settings.",
        ],
      },
      {
        id: "tizen-vs-firestick",
        h2: "Samsung Tizen vs Firestick — which is better for IPTV?",
        paragraphs: [
          "Samsung Tizen has the advantage of no extra hardware, no HDMI port used, one remote and a single source. The trade-off is that Tizen's regional store can lag (some apps appear in Europe months before they appear in SA), and updates are slower.",
          "Firestick has the advantage of a dedicated IPTV-first ecosystem (TiviMate, MX Player, Downloader all live there), faster updates, and a remote optimised for streaming. The trade-off is one more remote on the coffee table.",
          "For most households in SA in 2026, if you have a 2022+ Samsung Smart TV, install IPTV directly on Tizen — it's the cleanest setup. If you have an older Samsung or you want the best possible IPTV UX (TiviMate Premium), add a Firestick 4K to a spare HDMI port.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I install IPTV on a Samsung Smart TV in South Africa?",
        a: "Yes. Every Samsung Smart TV running Tizen OS (2018+, best on 2022+) installs IPTV via IPTV Smarters Pro or Smart IPTV from the Samsung Smart Hub. No Firestick or sideload required.",
      },
      {
        q: "Which IPTV app is best for Samsung Tizen?",
        a: "IPTV Smarters Pro (free) is the best for Samsung Tizen 2022+. Smart IPTV (€5.49 once) is the standard for Samsung Tizen 2018-2021. Both work with the same Mzansi Stream M3U link.",
      },
      {
        q: "Does my Samsung Smart TV support 4K IPTV?",
        a: "Yes — every Samsung 4K Smart TV (QLED, Neo QLED, Crystal UHD, OLED S9x) supports 4K IPTV via Mzansi Stream provided your internet speed is at least 25 Mbps and you're on the 5GHz WiFi band or Ethernet.",
      },
      {
        q: "What if IPTV Smarters Pro isn't in my Samsung store?",
        a: "Your TV's regional store may not stock it. Use Smart IPTV instead (works on every Tizen TV from 2018 onwards) or connect a Firestick 4K to a free HDMI port and install TiviMate / IPTV Smarters Pro there.",
      },
      {
        q: "Do I need to enable developer mode on Samsung Tizen?",
        a: "No. Mzansi Stream installs from the official Samsung Smart Hub — no developer mode, no sideload, no root. Anyone telling you otherwise is misleading you.",
      },
      {
        q: "How much does IPTV cost for a Samsung Smart TV in South Africa?",
        a: "Mzansi Stream is R99/month on the 12-month plan (R1,199 once) or R149/month on the 3-month plan. The same plan covers Samsung, Firestick, Android TV, MAG Box and any other M3U device on your network.",
      },
      {
        q: "Does IPTV on Samsung work with SuperSport in 4K?",
        a: "Yes. Mzansi Stream carries every SuperSport feed (PSL, Premier League, Rugby, Cricket) in 4K UHD on Samsung Tizen 2022+ with HDR10+ where the source feed supports it.",
      },
      {
        q: "How do I remove IPTV from my Samsung TV?",
        a: "Long-press the app icon in the Smart Hub → Delete. Your Mzansi Stream subscription is unaffected — you can re-install or move to another device anytime.",
      },
    ],
    related: [
      {
        label: "Best IPTV in South Africa 2026 — buyer's guide",
        href: "/best-iptv-south-africa-2026/",
      },
      {
        label: "IPTV Firestick South Africa — 10-min setup",
        href: "/iptv-firestick-south-africa/",
      },
      {
        label: "Watch SuperSport without DStv",
        href: "/iptv-supersport-without-dstv/",
      },
      { label: "DStv alternative — complete 2026 guide", href: "/dstv-alternative/" },
      { label: "IPTV in Johannesburg", href: "/cities/johannesburg/" },
      { label: "IPTV in Pretoria", href: "/cities/pretoria/" },
    ],
    hasHowTo: true,
    datePublished: "2026-01-18",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  // ─── 4. IPTV SUPERSPORT WITHOUT DSTV ────────────────────────────────
  {
    slug: "iptv-supersport-without-dstv",
    eyebrow: "SuperSport · No DStv required",
    h1: "Watch SuperSport Without DStv — IPTV Guide for South Africa 2026",
    metaTitle:
      "Watch SuperSport Without DStv — IPTV in 4K 2026 | Mzansi Stream",
    metaDescription:
      "Stream every SuperSport feed (PSL, Premier League, Rugby, Cricket) in 4K without DStv. Mzansi Stream IPTV from R99/mo on WhatsApp — installed in 10 minutes.",
    lead:
      "SuperSport is the single biggest reason South African households keep paying R899/month for DStv Premium. In 2026 you don't have to. This guide explains exactly how to watch every SuperSport feed (PSL, Premier League, Rugby, Cricket, Variety 1-4, MotorSport, Tennis, Golf) in 4K UHD without a DStv decoder, without a 24-month contract and without the SuperSport Schools stand-alone subscription.",
    trustLine:
      "Every SuperSport feed · 4K UHD · No DStv decoder · No contract · WhatsApp activation in 10 minutes",
    cta: {
      primary: {
        label: "Watch SuperSport in 4K — Free 24h trial →",
        message:
          "Hi! I want to watch SuperSport without DStv. Please activate my free 24-hour trial.",
        ref: "Pillar-SuperSport-Hero",
      },
      secondary: { label: "See plans from R99/mo →", href: "#pricing" },
    },
    sections: [
      {
        id: "supersport-feeds",
        h2: "Every SuperSport feed you can watch via IPTV",
        paragraphs: [
          "SuperSport runs 20+ dedicated channels across PSL, Premier League, URC, Currie Cup, Cricket, Motorsport, Tennis, Golf and Variety. Mzansi Stream carries every active SuperSport feed live in 4K UHD where the source signal supports it.",
        ],
        bullets: [
          "SuperSport PSL — every DStv Premiership match-day.",
          "SuperSport Premier League — full Premier League coverage, 4K.",
          "SuperSport Variety 1, 2, 3, 4 — overflow sport, cup competitions, mid-week games.",
          "SuperSport Rugby — URC, Currie Cup, every Springbok Test, Six Nations.",
          "SuperSport Cricket — Proteas tours, SA20, ICC World Cup, county cricket.",
          "SuperSport Action — combat sport, UFC, boxing major cards.",
          "SuperSport Grandstand — Olympic / multi-sport.",
          "SuperSport MotorSport — Formula 1, MotoGP, Supercars.",
          "SuperSport Tennis — Grand Slams, ATP, WTA.",
          "SuperSport Golf — Masters, Open, PGA Tour, Sunshine Tour.",
          "SuperSport Blitz / Maximo — preview / commentary / highlights.",
        ],
      },
      {
        id: "why-no-dstv",
        h2: "Why South Africans are watching SuperSport via IPTV instead of DStv in 2026",
        paragraphs: [
          "DStv Premium is R899/month in 2026 — R10,788 a year. The Compact Plus tier (R549/month) only carries partial Premier League, no full Variety pack and no 4K. The Compact tier (R449) drops the Premier League entirely. To get the full SuperSport line-up legally via DStv, you're committing to Premium with a 24-month contract.",
          "IPTV providers like Mzansi Stream source the same SuperSport feeds via licensed partners, deliver them over a SA CDN (NAPAfrica peering in Johannesburg + Cape Town), and bundle them into a R99-R150/month subscription with no contract, no decoder, no installer fee. The picture quality is identical because the source feed is identical — it's the commercial structure that's different.",
        ],
      },
      {
        id: "what-you-save",
        h2: "What you save vs DStv Premium",
        paragraphs: [
          "DStv Premium: R899/month × 12 = R10,788/year. Mzansi Stream 12-month plan: R1,199 once. Annual saving: R9,589.",
          "Most SA households can replace DStv Premium with Mzansi Stream and put the saving toward fibre upgrade, a 4K Smart TV or a once-off Firestick 4K — and still come out ahead R8,000+ a year.",
        ],
      },
      {
        id: "what-you-need",
        h2: "What you need to stream SuperSport in 4K",
        bullets: [
          "Fibre connection — minimum 25 Mbps for stable 4K SuperSport. Vumatel, Openserve, Frogfoot, MTN Fibre, Octotel and MetroFibre all work well.",
          "4K-capable display — every Samsung, LG, Sony, Hisense 4K Smart TV from 2022+ works. Older HD TVs work but stream in 1080p.",
          "A player device — your Smart TV's built-in player, a Firestick 4K, an Android TV box (Nvidia Shield, Mi Box), an Apple TV 4K or any standard M3U player.",
          "A Mzansi Stream subscription — from R99/month on the 12-month plan.",
        ],
      },
      {
        id: "install",
        h2: "How to watch SuperSport via IPTV — 10 minutes from order to live",
        steps: [
          {
            title: "Message Mzansi Stream on WhatsApp",
            text: "Tell us which device you'll be watching on (Smart TV brand + model, or Firestick / Android TV box). We send the device-specific setup guide.",
          },
          {
            title: "Pick a plan and pay",
            text: "1, 3, 6 or 12-month plans. Pay via EFT, SnapScan, Ozow, Capitec Pay, Visa, Mastercard, PayPal or Bitcoin. 24-hour free trial available with no card.",
          },
          {
            title: "Receive your M3U link",
            text: "Usually within 5 minutes of payment we send your M3U URL + Xtream Codes credentials + the one-page setup guide for your device.",
          },
          {
            title: "Install and stream",
            text: "Follow the guide. Most installs are live within 10 minutes. Open SuperSport PSL — you're streaming.",
          },
        ],
      },
      {
        id: "legality",
        h2: "Is it legal to watch SuperSport via IPTV in South Africa?",
        paragraphs: [
          "IPTV is a legal technology in South Africa. What's illegal is the unauthorised distribution of copyrighted content without a licence. Mzansi Stream sources its SuperSport feeds via licensed partners, accepts traceable SA payment methods (EFT, SnapScan, Capitec Pay, Ozow) and processes personal data under POPIA.",
          "A reputable IPTV provider in SA in 2026 operates openly with a real business name, real customer support and traceable payment. If a provider only accepts anonymous crypto via a Telegram channel and won't tell you their licensing chain, walk away — that's the risk profile that triggers enforcement, not 'IPTV' generically.",
        ],
      },
      {
        id: "compared",
        h2: "Mzansi Stream vs DStv Premium for SuperSport",
        bullets: [
          "Price: R99/mo (12-month) vs R899/mo. Saving: R800/mo, R9,500+/year.",
          "SuperSport coverage: identical — every feed, in 4K.",
          "Contract: no contract vs 24-month commitment on DStv Premium.",
          "Decoder: none vs R1,500+ decoder rental/purchase.",
          "Installer: none — install yourself in 10 minutes via WhatsApp guide.",
          "Support: WhatsApp 08:00-23:00 SAST vs phone IVR queue.",
          "Cancellation: reply on WhatsApp vs 30-day notice + portal hunt.",
          "Multi-device: works on Smart TV, Firestick, phone, tablet, MAG Box, PC in parallel (one connection per plan; multi-screen plans available).",
        ],
      },
    ],
    faq: [
      {
        q: "Can I watch SuperSport without a DStv subscription?",
        a: "Yes. Mzansi Stream IPTV carries every SuperSport feed (PSL, Premier League, Variety 1-4, Rugby, Cricket, MotorSport, Tennis, Golf) in 4K UHD from R99/month, with no DStv decoder, no installer and no 24-month contract.",
      },
      {
        q: "Is it legal to watch SuperSport via IPTV in South Africa?",
        a: "IPTV is a legal technology. What's illegal is the unauthorised distribution of copyrighted content. Mzansi Stream sources its SuperSport feeds via licensed partners, accepts traceable SA payment methods and is POPIA-compliant.",
      },
      {
        q: "Will I get the full Premier League?",
        a: "Yes. Mzansi Stream carries the full Premier League season in 4K — every fixture, including the early kick-off, the 16:30 and the 20:00 evening matches that DStv Compact Plus partially blocks.",
      },
      {
        q: "Do I get URC, Currie Cup and Springbok Tests?",
        a: "Yes — every URC, Currie Cup and Springbok Test in 4K via SuperSport Rugby and SuperSport Grandstand feeds.",
      },
      {
        q: "Does Mzansi Stream carry SA20 cricket and Proteas tours?",
        a: "Yes. Full SA20 season, every Proteas international tour and all ICC tournaments (T20 World Cup, ODI World Cup, Champions Trophy) via SuperSport Cricket.",
      },
      {
        q: "Will the stream buffer during the Soweto Derby?",
        a: "No — our SA CDN is provisioned for peak PSL load including Soweto Derby Sundays. We monitor live during high-traffic match-days and pre-cache feeds at the edge.",
      },
      {
        q: "Can I watch SuperSport while travelling outside South Africa?",
        a: "Yes. Mzansi Stream works in 50+ countries with no geo-blocking. SA expats use it to watch SuperSport, SABC and kykNET from the UK, Australia, USA, UAE, NZ and Canada in 4K.",
      },
      {
        q: "How much does it cost per month?",
        a: "R99/month on the 12-month plan (R1,199 once), R149/month on the 3-month plan, R199/month on the 1-month plan. All plans carry the full SuperSport line-up in 4K — sport is not gated behind a higher tier.",
      },
    ],
    related: [
      {
        label: "Best IPTV in South Africa 2026 — buyer's guide",
        href: "/best-iptv-south-africa-2026/",
      },
      {
        label: "IPTV Firestick South Africa — install guide",
        href: "/iptv-firestick-south-africa/",
      },
      {
        label: "IPTV for Samsung Smart TV (Tizen)",
        href: "/iptv-samsung-smart-tv/",
      },
      { label: "DStv alternative — complete 2026 guide", href: "/dstv-alternative/" },
      { label: "Mzansi Stream vs DStv Premium", href: "/vs/dstv-premium/" },
      { label: "Mzansi Stream vs SuperSport stand-alone", href: "/vs/supersport/" },
    ],
    hasHowTo: true,
    datePublished: "2026-01-22",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },
];

export const PILLAR_SLUGS = PILLARS.map((p) => p.slug);

export function getPillar(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}
