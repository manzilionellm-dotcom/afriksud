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
  // ─── 5. IPTV VUMATEL / OPENSERVE / FROGFOOT ─────────────────────────
  {
    slug: "iptv-vumatel-openserve-frogfoot",
    eyebrow: "Fibre · ISP guide 2026",
    h1: "Best IPTV for Vumatel, Openserve and Frogfoot in South Africa",
    metaTitle:
      "IPTV for Vumatel, Openserve & Frogfoot 2026 — 4K Checks",
    metaDescription:
      "IPTV for Vumatel, Openserve, Frogfoot, Octotel and MetroFibre in South Africa. 4K SuperSport, NAPAfrica-peered CDN. One month USD 15. Stability depends on your line.",
    lead:
      "If you're on Vumatel, Openserve, Frogfoot, Octotel, MetroFibre, MTN Fibre, Vodacom Fibre or Rain 5G, your fibre line usually has the bandwidth for 4K IPTV — but peering, home Wi-Fi and the router decide what you actually see. This guide explains why routing matters, what to check on your router if 4K streams drop to 1080p, and how to test Mzansi Stream on your own line during the 24-hour trial.",
    trustLine:
      "Test 4K on your own fibre line during the 24h trial · No contract",
    cta: {
      primary: {
        label: "Test it on your fibre — Free 24h trial →",
        message:
          "Hi! I'm on [Vumatel/Openserve/Frogfoot/Octotel] and I want the free 24-hour Mzansi Stream trial to test 4K streaming on my line.",
        ref: "Pillar-Vumatel-Hero",
      },
      secondary: { label: "Jump to ISP table →", href: "#isps" },
    },
    sections: [
      {
        id: "why-isp-matters",
        h2: "Why your fibre ISP matters more than your speed",
        paragraphs: [
          "Most SA households assume that more Mbps means better IPTV. In 2026 that's only half true. A 100 Mbps Vumatel line that peers directly at NAPAfrica beats a 500 Mbps line that hops through a Frankfurt server before hitting an SA-hosted IPTV CDN. Latency and peering matter more than raw throughput once you're past 50 Mbps.",
          "Mzansi Stream's CDN edges sit at NAPAfrica in Johannesburg and Cape Town — the same exchange every major SA ISP peers at. Routing via a distant server adds latency; a local route usually helps. This page does not publish a measured latency — test on your own line.",
        ],
      },
      {
        id: "isps",
        h2: "SA fibre ISPs — what to test on the trial",
        bullets: [
          "Vumatel — test 4K on the trial.",
          "Openserve (Telkom) — test 4K on the trial.",
          "Frogfoot — test 4K on the trial.",
          "Octotel (Cape Town) — test 4K on the trial.",
          "MetroFibre — test 4K on the trial.",
          "MTN Fibre — test 4K on the trial.",
          "Vodacom Fibre — test 4K on the trial.",
          "Rain 5G — wireless, usually more jitter than fibre; test 4K before you pay.",
          "Telkom LTE — variable, HD recommended over 4K.",
        ],
      },
      {
        id: "router-setup",
        h2: "Router setup — get 4K stable on Vumatel and Openserve",
        paragraphs: [
          "Most 4K IPTV streaming problems on SA fibre aren't the fibre — they're the router. The Huawei B315s, Huawei B535, ZTE H168N, ZTE F660 and many Vodacom-branded routers shipped 2020-2023 cap 5GHz throughput at 60-80 Mbps even on a 500 Mbps line. Either replace with a Wi-Fi 6 router (TP-Link Archer AX55 R1,300, ASUS RT-AX55 R1,500) or hard-wire your Smart TV / Firestick over Ethernet.",
          "A Firestick 4K connected via USB-Ethernet adapter (R250 on Takealot) removes Wi-Fi from the chain, which often helps 4K.",
        ],
        bullets: [
          "Replace ISP-branded router with Wi-Fi 6 (Archer AX55, ASUS RT-AX55, TP-Link AX73).",
          "Hard-wire Firestick / Smart TV over Ethernet for 4K SuperSport.",
          "Enable QoS / DSCP if your router supports it — prioritise port 8080-tagged IPTV traffic.",
          "Disable DLNA on Samsung Smart TVs — it sometimes hijacks bandwidth mid-stream.",
          "Avoid the 2.4GHz band for 4K — always 5GHz.",
        ],
      },
      {
        id: "no-throttling",
        h2: "Will Vumatel / Openserve throttle my IPTV?",
        paragraphs: [
          "No. In 2026, none of the major SA fibre ISPs throttle IPTV traffic — they don't deep-packet-inspect to distinguish IPTV from a YouTube live stream. Your Mzansi Stream traffic is encrypted HLS / M3U over HTTPS, same wire format as Netflix and YouTube. There's nothing to throttle.",
          "If your stream drops mid-match, the bottleneck is almost certainly your home Wi-Fi or an ISP-side congestion event (rare on Vumatel and Openserve in 2026), not deliberate throttling.",
        ],
      },
      {
        id: "redundancy",
        h2: "What about ISP outages?",
        paragraphs: [
          "Fibre outages happen. The Vumatel Joburg outages in early 2026 reminded everyone that no single fibre line is bulletproof. The best practical defence: a Rain 5G or MTN Wi-Fi mobile router as backup. Test HD on it during the trial.",
          "If you're a heavy SuperSport household, consider a dual-WAN router (TP-Link ER605 or MikroTik hEX) with fibre as primary and Rain 5G as failover.",
        ],
      },
    ],
    faq: [
      {
        q: "Does Mzansi Stream work on Vumatel?",
        a: "It runs over Vumatel like any home internet. This page does not publish a latency figure — test 4K on the 24-hour trial.",
      },
      {
        q: "Does Mzansi Stream work on Openserve?",
        a: "It runs over Openserve (Telkom) like any home internet. Test 4K on the 24-hour trial.",
      },
      {
        q: "Does Mzansi Stream work on Frogfoot?",
        a: "It runs over Frogfoot like any home internet. Test 4K on the 24-hour trial.",
      },
      {
        q: "Does Mzansi Stream work on Octotel (Cape Town)?",
        a: "It runs over Octotel like any home internet. Test 4K on the 24-hour trial.",
      },
      {
        q: "What internet speed do I need for 4K IPTV?",
        a: "Minimum 25 Mbps sustained for stable 4K UHD streaming. 100 Mbps gives comfortable headroom for a household streaming multiple devices in parallel.",
      },
      {
        q: "My SuperSport stream buffers — is it my fibre?",
        a: "Often not — the bottleneck is usually your Wi-Fi router or 2.4GHz interference. Switch to 5GHz or hard-wire over Ethernet.",
      },
      {
        q: "Do I need to disable any router setting?",
        a: "Disable DLNA on Samsung Smart TVs (it can hijack bandwidth). Disable parental controls / SafeSearch on the router if they intercept HTTPS traffic. Enable QoS to prioritise IPTV ports if available.",
      },
      {
        q: "Will a VPN help?",
        a: "No — a VPN adds latency. Mzansi Stream is not geo-blocked on SA fibre. A VPN only helps if you're streaming SA content from outside SA.",
      },
    ],
    related: [
      {
        label: "Best IPTV in South Africa 2026 — buyer's guide",
        href: "/best-iptv-south-africa-2026",
      },
      {
        label: "Watch SuperSport without DStv",
        href: "/iptv-supersport-without-dstv",
      },
      {
        label: "IPTV Firestick South Africa — install guide",
        href: "/iptv-firestick-south-africa",
      },
      { label: "IPTV in Johannesburg", href: "/cities/johannesburg" },
      { label: "IPTV in Cape Town", href: "/cities/cape-town" },
      { label: "IPTV in Durban", href: "/cities/durban" },
    ],
    hasHowTo: false,
    datePublished: "2026-02-01",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  // ─── 6. IPTV EFT / SNAPSCAN / OZOW PAYMENT ──────────────────────────
  {
    slug: "iptv-eft-snapscan-payment",
    eyebrow: "Payments · EFT, SnapScan, Ozow, Capitec Pay",
    h1: "IPTV You Can Pay for via EFT, SnapScan, Ozow and Capitec Pay (2026)",
    metaTitle:
      "IPTV EFT, SnapScan, Ozow, Capitec Pay — No Credit Card",
    metaDescription:
      "Compare EFT and digital payment options for Mzansi, test the service on your device, and confirm the total before paying.",
    lead:
      "Most international IPTV providers require a Visa or Mastercard. Mzansi Stream accepts every standard South African payment method without forcing a credit card — EFT, SnapScan, Ozow, Zapper, Yoco, Capitec Pay, plus Visa, Mastercard, PayPal and Bitcoin. This guide covers each payment method, how activation works, what the receipt looks like, and which one to pick if your priority is speed (Ozow), privacy (Bitcoin), or zero card details (Capitec Pay).",
    trustLine:
      "EFT · SnapScan · Ozow · Zapper · Yoco · Capitec Pay · Visa · Mastercard · PayPal · Bitcoin",
    cta: {
      primary: {
        label: "Pay how you want — Get started →",
        message:
          "Hi! I'd like to order Mzansi Stream — I prefer paying via [EFT/SnapScan/Ozow/Capitec Pay] — what's the next step?",
        ref: "Pillar-Payment-Hero",
      },
      secondary: { label: "See payment methods →", href: "#methods" },
    },
    sections: [
      {
        id: "no-card",
        h2: "Why no credit card?",
        paragraphs: [
          "A surprising share of South African households either don't have a Visa / Mastercard at all (Capitec USSD card-only, prepaid cards, business EFT-only) or actively avoid using their credit card on websites they don't fully trust. Forcing a credit card cuts a huge slice of the SA market out — and signals that the merchant runs through a foreign processor that won't accept SA-native instruments.",
          "Mzansi Stream supports every payment method an SA household actually uses, plus credit cards for anyone who prefers them.",
        ],
      },
      {
        id: "methods",
        h2: "Every payment method we accept",
        bullets: [
          "EFT (manual bank transfer) — slowest (1-4 hours business hours), zero fees, and you keep the bank reference.",
          "Ozow — instant EFT via OTP, <2 minutes, supports Capitec / Standard / FNB / Nedbank / Absa / Investec.",
          "SnapScan — QR code, <60 seconds, comes off your linked debit/credit card.",
          "Zapper — QR code, <60 seconds, EFT-funded.",
          "Yoco — link or QR, instant, debit/credit card.",
          "Capitec Pay — direct from your Capitec app, <60 seconds, no card details shared.",
          "Visa / Mastercard — direct card entry via secure payment gateway.",
          "PayPal — for international and diaspora customers.",
          "Bitcoin — privacy-first option, settles in 1-2 confirmations.",
        ],
      },
      {
        id: "fastest",
        h2: "Which payment is fastest to activate?",
        paragraphs: [
          "Ozow, SnapScan, Zapper, Capitec Pay, Yoco and card payments confirm on the payment side straight away; activation then happens on WhatsApp. This page does not publish a fixed activation delay.",
          "Manual EFT waits for the funds to clear in our account before activation. If you want to avoid the clearing wait, pick Ozow — it's instant EFT.",
        ],
      },
      {
        id: "privacy",
        h2: "Which payment is most private?",
        paragraphs: [
          "If your priority is minimum information shared, the privacy ranking is: Bitcoin > Capitec Pay > Ozow > SnapScan > Yoco > Visa/Mastercard direct entry.",
          "We collect only what's required to deliver your subscription (your phone number for WhatsApp delivery, your name on the payment, the plan you purchased). We do not sell or share your data.",
        ],
      },
      {
        id: "no-recurring",
        h2: "No recurring billing trap",
        paragraphs: [
          "Mzansi Stream does not enrol your card or bank in any recurring debit order. Every plan is paid once for the period you selected. When the period ends, your subscription expires unless you actively renew via WhatsApp — no surprise USD 65 charge at midnight on month 13.",
          "Your Mzansi term is prepaid. Check the end date on the confirmation and decide whether you want to renew.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I pay for IPTV via EFT in South Africa?",
        a: "Yes. Mzansi Stream accepts manual EFT into our SA bank account. Activation follows once the funds clear. To avoid the clearing wait, use Ozow instead.",
      },
      {
        q: "Does Mzansi Stream accept SnapScan?",
        a: "Yes. Scan the QR code we send on WhatsApp, pay, and we activate your subscription on the same thread.",
      },
      {
        q: "Can I pay with Capitec Pay?",
        a: "Yes. Pay directly from your Capitec banking app without sharing card details. Activation follows on WhatsApp after payment confirmation.",
      },
      {
        q: "Does Mzansi Stream accept Ozow?",
        a: "Yes. Ozow is instant EFT via your bank's OTP, with no manual clearing delay. Activation follows on WhatsApp.",
      },
      {
        q: "Do I have to use a credit card?",
        a: "No. We accept EFT, SnapScan, Ozow, Zapper, Yoco, Capitec Pay, PayPal and Bitcoin in addition to Visa / Mastercard. You can avoid the credit card route entirely.",
      },
      {
        q: "Will I be charged again automatically?",
        a: "No. We do not enrol your card or bank in any recurring debit. Every plan is once-off for the period you selected. You actively renew on WhatsApp when you want to continue.",
      },
      {
        q: "Is paying for IPTV via EFT safe under POPIA?",
        a: "An EFT shares the payment reference and the name on the transfer. The privacy page explains what we collect. Questions go to WhatsApp (+44 7307 410512).",
      },
      {
        q: "Can I pay in cash?",
        a: "Not directly — but Capitec, FNB and Standard Bank cash deposit ATMs all accept cash that lands in our account in real time. Use the EFT reference we provide.",
      },
    ],
    related: [
      {
        label: "Best IPTV in South Africa 2026 — buyer's guide",
        href: "/best-iptv-south-africa-2026",
      },
      { label: "DStv alternative — complete 2026 guide", href: "/dstv-alternative" },
      {
        label: "Is IPTV legal in South Africa?",
        href: "/is-iptv-legal-south-africa",
      },
      {
        label: "Watch SuperSport without DStv",
        href: "/iptv-supersport-without-dstv",
      },
    ],
    hasHowTo: false,
    datePublished: "2026-02-05",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  // ─── 7. CANCEL DSTV 2026 ────────────────────────────────────────────
  {
    slug: "cancel-dstv-2026",
    eyebrow: "DStv account help",
    h1: "How to cancel DStv in South Africa",
    metaTitle: "How to cancel DStv in South Africa",
    metaDescription: "Schedule a DStv disconnection for your next payment date. Check what happens to bundles, keep the confirmation and compare your options.",
    lead: "For an ordinary South African DStv subscription, you can schedule disconnection for your next payment date. Open your account first and note the date shown. A household with a fixed-term or internet bundle should request the costs for that agreement directly from DStv.",
    trustLine: "South Africa · Checked 26 November 2026",
    cta: {
      primary: {
        label: "Try Mzansi on my device free for 24 hours",
        message: "I’m in [country] using [device]. I’d like to try Mzansi Stream for 24 hours before I pay.",
        ref: "Pillar-cancel-dstv-2026"
      },
      secondary: {
        label: "Read the guide",
        href: "#cancel-online"
      }
    },
    sections: [
      {
        id: "cancel-online",
        h2: "Schedule a disconnection in My Products",
        steps: [
          {
            title: "Find your next payment date",
            text: "Sign in to your own DStv account and check the next payment date, package and linked services. This is the date DStv uses for an ordinary scheduled disconnection."
          },
          {
            title: "Choose the right product",
            text: "Open My Products on DStv Self Service. Select the package you want to manage and choose Disconnect. Review the effective date on screen."
          },
          {
            title: "Keep your confirmation",
            text: "Save the request reference and effective date. Use the official MyDStv app or DStv support if the change does not appear. Keep your one-time codes private."
          }
        ]
      },
      {
        id: "contract",
        h2: "What changes for a fixed-term contract?",
        paragraphs: [
          "If your deal includes DStv Internet, ask DStv for any exit cost and the effect on the other service. DStv says cancellation of the television subscription on a bundled deal also cancels the linked internet service. Check before changing either one."
        ]
      },
      {
        id: "instead",
        h2: "When a cheaper package could be enough",
        paragraphs: [
          "In South Africa, DStv Stream Starter is R99 per month. Mzansi costs USD 15 for one month or USD 65 upfront for twelve months. List the programmes you want to keep before comparing the first payment and the full term."
        ]
      },
      {
        id: "after",
        h2: "What if a charge appears afterwards?",
        paragraphs: [
          "Compare the charge date with the effective date on your confirmation. Ask DStv to identify the amount and billing period. A request to Mzansi Stream cannot change your DStv account."
        ]
      }
    ],
    faq: [
      {
        q: "Must I give 30 days’ notice?",
        a: "DStv’s published process schedules an ordinary disconnection for your next payment date. Your fixed-term or bundled agreement may have separate costs."
      },
      {
        q: "Can Mzansi Stream cancel my account?",
        a: "Only DStv manages your DStv account. Use its Self Service page or its official support. Mzansi’s WhatsApp is for Mzansi trials and orders."
      },
      {
        q: "Can I try another service first?",
        a: "Mzansi offers a 24-hour trial without a card. Check it on your own television and connection before choosing a paid plan."
      }
    ],
    related: [
      {
        label: "Official DStv disconnection instructions",
        href: "https://www.dstv.com/en-za/help/faqs/viewing/my-dstv-viewing/how-can-i-cancel-my-dstv-packageservice/"
      },
      {
        label: "Official help with a DStv Internet contract",
        href: "https://www.dstv.com/en-za/help/faqs/services/dstv-internet/how-do-i-cancel-my-contract/"
      },
      {
        label: "Compare South African package prices",
        href: "/en-za/blog/dstv-price-south-africa"
      },
      {
        label: "What changes during DStv Open Time?",
        href: "/en-za/blog/dstv-open-time-2026"
      },
      {
        label: "Leaving South Africa for the UK",
        href: "/en-gb/blog/dstv-uk-moving-from-south-africa"
      }
    ],
    hasHowTo: true,
    datePublished: "2026-02-08",
    dateModified: "2026-11-26",
    preferredLocale: "en-za"
  },

  // ─── 8. IS IPTV LEGAL IN SOUTH AFRICA ───────────────────────────────
  {
    slug: "is-iptv-legal-south-africa",
    eyebrow: "Legal · IPTV in South Africa 2026",
    h1: "Is IPTV Legal in South Africa in 2026? — The Honest Answer",
    metaTitle:
      "Is IPTV Legal in South Africa 2026? — Honest Legal Guide",
    metaDescription:
      "Is IPTV legal in South Africa in 2026? Not legal advice: the technology question, the licensing question, and what to check before subscribing.",
    lead:
      "The single most-asked question about IPTV in South Africa is whether it's legal. This page is not legal advice and makes no legality or licence claim for Mzansi Stream. IPTV is a delivery technology — like an internet browser; the copyright question is about who distributes content and with which licence. This guide separates the technology from the licensing question, explains what makes one IPTV provider legitimate and another a SAPS-DPCI target, and what to check before paying any provider in SA.",
    trustLine:
      "Not legal advice · No licence claim · Traceable SA payments",
    cta: {
      primary: {
        label: "Start with a free 24h trial →",
        message:
          "Hi! I read the 'Is IPTV legal in SA' guide. Please activate my free 24-hour Mzansi Stream trial.",
        ref: "Pillar-Legal-Hero",
      },
      secondary: { label: "Read the legal framework →", href: "#framework" },
    },
    sections: [
      {
        id: "short-answer",
        h2: "The short answer",
        paragraphs: [
          "IPTV — Internet Protocol Television — is a delivery technology. This page is not legal advice. Copyright concerns the unauthorised distribution of copyrighted content (films, series, channel feeds) without the rights-holder's licence, under the Copyright Act 98 of 1978 (as amended), not the delivery technology itself.",
          "A provider you can question on WhatsApp, with traceable payment and a written refund page, is easier to check than an anonymous Telegram channel that only takes crypto and changes names every 6 months. This page does not state that Mzansi Stream holds channel licences.",
        ],
      },
      {
        id: "framework",
        h2: "The legal framework in 2026",
        paragraphs: [
          "Four pieces of SA legislation are relevant to IPTV: (1) the Copyright Act 98 of 1978 (governing distribution rights), (2) the Electronic Communications Act 36 of 2005 (regulating broadcasting), (3) the Protection of Personal Information Act 4 of 2013 (POPIA) (governing how subscriber data is handled), and (4) the Consumer Protection Act 68 of 2008 (governing the subscriber relationship).",
          "There is no SA law that bans 'IPTV' as a category. Copyright questions concern unauthorised distribution of protected content. This page does not report prosecutions or a subscriber risk score.",
        ],
      },
      {
        id: "what-makes-legit",
        h2: "What makes an IPTV provider legitimate in 2026?",
        bullets: [
          "Will tell you, on WhatsApp, which folders are in the line-up before you pay.",
          "Gives you a way to ask for company details before you pay.",
          "Publishes a privacy page and a WhatsApp number you can use to ask about personal information.",
          "Accepts traceable SA payment methods (EFT, SnapScan, Ozow, Capitec Pay), not crypto-only.",
          "Publishes a real WhatsApp / phone support channel staffed by humans.",
          "Publishes a refund page and does not auto-debit.",
          "Doesn't claim impossible things ('every channel in the world for R49/month').",
        ],
      },
      {
        id: "what-to-avoid",
        h2: "Red flags — providers to walk away from",
        bullets: [
          "Crypto-only payments via Telegram — designed to evade KYC and traceability.",
          "Domain that changes every 3-6 months.",
          "No way to ask who you are paying before you send money.",
          "Claims 'over 50,000 channels' (most will be dead, geo-blocked or duplicate).",
          "Charges under R50/month — unsustainable and signals oversold reseller link.",
          "Refuses to put refund / cancellation terms in writing.",
          "Asks for your ID number 'to verify your account' (not required).",
          "Pushes 'lifetime' subscriptions paid upfront — almost always a vanish-with-the-money scheme.",
        ],
      },
      {
        id: "subscribers",
        h2: "Is it illegal for me as a subscriber?",
        paragraphs: [
          "This page is not legal advice and does not report court statistics or a subscriber risk score. Copyright risk sits with unauthorised distribution of protected content.",
          "This page does not state that Mzansi Stream holds named channel licences.",
        ],
      },
      {
        id: "vpn",
        h2: "Do I need a VPN to use IPTV in South Africa?",
        paragraphs: [
          "No. A VPN is not required for IPTV in South Africa. Mzansi Stream isn't geo-blocked on SA fibre. Some users prefer a VPN for general privacy reasons (the same way some users prefer a VPN for browsing) — that's a personal choice, not an IPTV requirement.",
          "If you're an SA expat watching from abroad, a VPN may help if a destination network blocks a feed. This page does not publish a country count or a 'no geo-blocking' guarantee.",
        ],
      },
    ],
    faq: [
      {
        q: "Is IPTV legal in South Africa in 2026?",
        a: "This page is not legal advice and makes no legality claim. What's unlawful is unauthorised distribution of copyrighted content. This answer does not say Mzansi Stream holds channel licences.",
      },
      {
        q: "Can I be prosecuted for using IPTV in SA?",
        a: "This page is not legal advice and does not report prosecutions or a 'zero risk' score. Copyright questions are about unauthorised distribution, not a promise that a subscriber cannot be affected.",
      },
      {
        q: "Is Mzansi Stream a legitimate IPTV provider?",
        a: "We do not publish a channel-licence schedule on this page. Payment methods shown on the site include EFT, SnapScan, Ozow and Capitec Pay. The refund page describes a 7-day window.",
      },
      {
        q: "What law governs IPTV in South Africa?",
        a: "The Copyright Act 98 of 1978, the Electronic Communications Act 36 of 2005, the Protection of Personal Information Act 4 of 2013 (POPIA), and the Consumer Protection Act 68 of 2008 are the four pieces of legislation directly relevant to IPTV in SA in 2026.",
      },
      {
        q: "Do I need a VPN for IPTV in South Africa?",
        a: "No. A VPN is not required for IPTV in SA. Mzansi Stream works without a VPN on every major SA fibre network.",
      },
      {
        q: "Is it legal to watch SuperSport via IPTV without DStv?",
        a: "Watching a channel is lawful when the distributor has the rights. This page does not state that Mzansi Stream holds a SuperSport redistribution licence. Confirm what plays on the trial.",
      },
      {
        q: "What's the difference between legitimate and illegitimate IPTV?",
        a: "Easier to question: traceable payment, a written refund page, and a WhatsApp number that answers. Walk away from crypto-only Telegram channels and R49/month lifetime deals.",
      },
      {
        q: "Is downloading IPTV apps like TiviMate or IPTV Smarters illegal?",
        a: "No. TiviMate, IPTV Smarters Pro, GSE Smart IPTV and Smart IPTV are apps available in the Amazon and Google Play stores. They're M3U players — the same way VLC is an M3U player. Legality depends entirely on the source you connect them to.",
      },
    ],
    related: [
      {
        label: "Best IPTV in South Africa 2026 — buyer's guide",
        href: "/best-iptv-south-africa-2026",
      },
      { label: "DStv alternative — complete 2026 guide", href: "/dstv-alternative" },
      {
        label: "IPTV EFT, SnapScan & Capitec Pay",
        href: "/iptv-eft-snapscan-payment",
      },
      {
        label: "Watch SuperSport without DStv",
        href: "/iptv-supersport-without-dstv",
      },
      { label: "Mzansi Stream POPIA policy", href: "/legal/popia" },
    ],
    hasHowTo: false,
    datePublished: "2026-02-12",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  // ─── 1. BEST IPTV SOUTH AFRICA 2026 ─────────────────────────────────
  {
    slug: "best-iptv-south-africa-2026",
    eyebrow: "Best IPTV · 2026 buyer's guide",
    h1: "Best IPTV in South Africa 2026 — Honest Buyer's Guide",
    metaTitle:
      "Best IPTV South Africa 2026 — Buyer's Guide, Live TV in 4K",
    metaDescription:
      "The honest 2026 buyer's guide to the best IPTV in South Africa. Compare price, channels, sport, 4K, support and what to check before you pay. USD 15 for one month with a free 24h trial.",
    lead:
      "Choosing the best IPTV in South Africa in 2026 means weighing price, channel lineup, sport coverage, 4K stability on Vumatel and Openserve, support quality and the simple question — can you actually cancel without a fight? This guide ranks what to look for, what to ignore and why Mzansi Stream tops the practical short-list for SA households cutting the DStv cord.",
    trustLine:
      "SuperSport-style folders to trial · WhatsApp activation · No contract · 7-day money-back guarantee",
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
          "South African households now have satellite, free-to-view and internet TV options. Check your actual monthly bill alongside your broadband and device costs.",
          "Ignore vanity claims like '50,000 channels' — most are dead, geo-blocked or duplicate language tracks. What matters is how many of the channels you actually watch every week are stable in 4K on your fibre line, on your specific TV or stick.",
        ],
        bullets: [
          "Channel lineup that maps to what you actually watch (SABC, e.tv, SuperSport, kykNET, Mzansi Magic, Premier League).",
          "4K UHD on every plan, not gated behind a R+200 'premium' tier.",
          "Stable streaming on your fibre line — Vumatel, Openserve and Frogfoot are the standard test.",
          "Support that replies on WhatsApp, not a 5-day email queue.",
          "Local payment methods — EFT, SnapScan, Ozow, Capitec Pay — without a forced credit card.",
          "Trial without a card so you can verify before you pay.",
          "Know the provider’s cancellation process, the effective date and any costs tied to a fixed-term deal.",
        ],
      },
      {
        id: "comparison",
        h2: "Best IPTV providers in South Africa — 2026 short-list",
        paragraphs: [
          "Most of the SA IPTV market is private, so a fully objective benchmark is impossible without paying for every provider for 30 days. This short-list is our own reading of the market, not a measured benchmark.",
          "Mzansi Stream is a no-contract option for households who want one subscription with SA, SuperSport-style and international folders — line-up to confirm on WhatsApp and to test on the 24-hour trial.",
        ],
        bullets: [
          "Mzansi Stream offers a USD 15 one-month prepaid plan and a free 24-hour trial without a card.",
          "Reseller marketplaces (Facebook groups, Gumtree) — cheap (R50-R80/mo) but typically 720p, frequent outages and no recourse when the link dies.",
          "DStv Stream starts at R99 per month for Starter. Premium Stream costs R799 a month. Standard Premium satellite costs R979 per month.",
          "Showmax closed as a standalone service in April 2026. Selected Showmax titles are available on DStv Stream.",
          "Imported IPTV with US/EU IPs — high buffering risk on SA fibre, geo-blocking on SuperSport feeds.",
        ],
      },
      {
        id: "price-quality",
        h2: "Price vs. quality — the 2026 IPTV pricing reality",
        paragraphs: [
          "The first payment and the price per month can be very different. Compare equal periods, and check whether equipment or data will add to your total.",
          "Mzansi costs USD 65 upfront for twelve months or USD 5 for a day pass. A single month costs USD 15.",
        ],
      },
      {
        id: "sport",
        h2: "Sport coverage — SuperSport, Premier League and beyond",
        paragraphs: [
          "If sport matters, look up the specific fixture and broadcaster in your country. Check the programme listing and local start time. A long channel list cannot confirm the match.",
          "Mzansi Stream lists SuperSport-style sport folders on every plan. Which PSL, Premier League, URC and Currie Cup matches are available is to confirm on WhatsApp — rights and blackouts still apply. Test a live match on the 24-hour trial.",
        ],
        bullets: [
          "PSL — SuperSport PSL + Variety folders, matches to confirm on WhatsApp.",
          "Premier League — full coverage, 4K UHD.",
          "URC + Currie Cup — fixtures to confirm on WhatsApp.",
          "Cricket — Proteas + SA20 + ICC tournaments.",
          "Formula 1 — race weekends to confirm on WhatsApp.",
          "Springboks — Tests to confirm on WhatsApp.",
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
          "This page is not legal advice and makes no legality or licence claim. IPTV is a delivery technology, like an internet browser; copyright questions concern the unauthorised distribution of protected content. Rights and blackouts still apply, so check the channels and matches you need during the 24-hour trial before you pay.",
          "Payment methods shown on the site include EFT, SnapScan, Capitec Pay and Ozow. The privacy page is linked from the footer. This page does not claim a channel licence.",
        ],
      },
      {
        id: "support",
        h2: "Support — the deciding factor most buyers underweight",
        paragraphs: [
          "The single biggest difference between a frustrated IPTV customer and a happy one is how fast support replies when something breaks at 9 PM on a Saturday before a big match. Phone IVR (DStv) and email-only (most resellers) both fail this test. WhatsApp support with a real human reply is the better test.",
          "Mzansi Stream support runs on WhatsApp. This page does not publish a response-time figure — ask your question during the 24-hour trial and judge the reply yourself.",
        ],
      },
      {
        id: "verdict",
        h2: "Verdict — which IPTV is best in South Africa in 2026?",
        paragraphs: [
          "For a SA household watching SuperSport, kykNET, SABC and Premier League on a Samsung Smart TV, Firestick or Android TV box in 2026, test Mzansi Stream on the 24-hour trial: no contract, 7-day money-back guarantee, traceable SA payment methods, WhatsApp support. Confirm the line-up you need before you pay.",
          "The 24-hour free trial without a credit card removes the only real risk of trying. Cancel by replying to the same WhatsApp thread — no installer to send away, no 30-day notice period, no SMS chase from a sales team trying to retain you.",
        ],
      },
    ],
    faq: [
      {
        q: "Which is the best IPTV in South Africa in 2026?",
        a: "Use the 24-hour trial on your own device. Compare the programmes you use, picture quality and guide before deciding on a prepaid term.",
      },
      {
        q: "How much does a good IPTV cost in South Africa?",
        a: "Mzansi charges USD 15 for one month or USD 65 in one prepaid annual payment. Compare additional equipment and data costs yourself.",
      },
      {
        q: "Is IPTV legal in South Africa?",
        a: "This page is not legal advice and makes no legality claim. Unauthorised distribution of copyrighted content is the copyright issue. This answer does not state that Mzansi Stream holds channel licences.",
      },
      {
        q: "Will an IPTV work with my Vumatel / Openserve / Frogfoot fibre line?",
        a: "It runs over the major SA fibre networks — Vumatel, Openserve, Frogfoot, Octotel, MetroFibre, MTN Fibre, Vodacom Fibre and Rain 5G — like any home internet. 4K depends on your line and Wi-Fi; test it on the 24-hour trial.",
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
        a: "SuperSport-style folders (PSL, Variety, Rugby, Cricket, Premier League) are in the line-up without a DStv subscription. Specific feeds and matches are to confirm on WhatsApp; rights and blackouts still apply.",
      },
      {
        q: "How do I pay for IPTV in South Africa?",
        a: "Mzansi Stream accepts EFT, SnapScan, Zapper, Yoco, Ozow, Capitec Pay, Visa, Mastercard, PayPal and Bitcoin. No credit card is required for the 24-hour free trial.",
      },
      {
        q: "Is there a 24h free IPTV trial without a credit card?",
        a: "Yes. Message Mzansi Stream on WhatsApp and we activate a 24-hour trial — same line-up as the paid plans, 4K UHD where the source supports it, EPG, no card required.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes — there is no contract, no auto-renewal and no 30-day notice period. Your subscription expires at the end of the period you've paid for. A 7-day money-back guarantee covers the first week.",
      },
    ],
    related: [
      { label: "DStv alternative — complete 2026 guide", href: "/dstv-alternative" },
      {
        label: "Best IPTV for Firestick in South Africa",
        href: "/iptv-firestick-south-africa",
      },
      {
        label: "IPTV for Samsung Smart TV (Tizen)",
        href: "/iptv-samsung-smart-tv",
      },
      {
        label: "Watch SuperSport without DStv",
        href: "/iptv-supersport-without-dstv",
      },
      { label: "IPTV in Johannesburg", href: "/cities/johannesburg" },
      { label: "IPTV in Cape Town", href: "/cities/cape-town" },
      { label: "Mzansi Stream vs DStv Premium", href: "/vs/dstv-premium" },
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
      "IPTV Firestick South Africa 2026 — TiviMate Setup in 10 Min",
    metaDescription:
      "Step-by-step IPTV Firestick setup for South Africa in 2026 — TiviMate Premium, M3U link, EPG, 4K SuperSport. Works on Vumatel, Openserve, Frogfoot. One month USD 15.",
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
            text: "Find SuperSport PSL or Premier League in the channel list and start the stream. If the picture stutters, use the troubleshooting section below. This step does not promise a buffer-free 4K picture.",
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
          "On SA fibre (Vumatel, Openserve, Frogfoot), 4K mostly depends on your Wi-Fi and router. This page does not publish a latency figure — test 4K SuperSport on the 24-hour trial before you pay.",
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
          "SuperSport feeds buffer during a big match — reboot the Firestick, check 5 GHz Wi-Fi, and message us on WhatsApp with the channel name if it persists.",
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
        a: "One month costs USD 15. The day pass costs USD 5 and a year costs USD 65 upfront. Confirm the current catalogue on the device during the free trial.",
      },
    ],
    related: [
      {
        label: "Best IPTV in South Africa 2026 — buyer's guide",
        href: "/best-iptv-south-africa-2026",
      },
      {
        label: "IPTV for Samsung Smart TV (Tizen) — full guide",
        href: "/iptv-samsung-smart-tv",
      },
      {
        label: "Watch SuperSport without DStv",
        href: "/iptv-supersport-without-dstv",
      },
      { label: "DStv alternative — complete 2026 guide", href: "/dstv-alternative" },
      { label: "IPTV in Johannesburg", href: "/cities/johannesburg" },
      { label: "IPTV in Cape Town", href: "/cities/cape-town" },
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
      "IPTV Samsung Smart TV South Africa 2026 — Tizen Install",
    metaDescription:
      "Install IPTV on a Samsung Smart TV (Tizen) in South Africa — IPTV Smarters Pro, M3U link, 4K SuperSport, kykNET. Works on every 2022+ Samsung. One month USD 15.",
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
            text: "Tizen can take a while to load the channel list the first time. Later launches are usually faster.",
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
        a: "One month costs USD 15. A day pass is USD 5 and a twelve-month term is USD 65 upfront. Check that your TV and player are supported before paying.",
      },
      {
        q: "Does IPTV on Samsung work with SuperSport in 4K?",
        a: "SuperSport-style folders (PSL, Premier League, Rugby, Cricket) play on Samsung Tizen 2022+ in 4K UHD where the source feed supports it. Specific matches are to confirm on WhatsApp.",
      },
      {
        q: "How do I remove IPTV from my Samsung TV?",
        a: "Long-press the app icon in the Smart Hub → Delete. Your Mzansi Stream subscription is unaffected — you can re-install or move to another device anytime.",
      },
    ],
    related: [
      {
        label: "Best IPTV in South Africa 2026 — buyer's guide",
        href: "/best-iptv-south-africa-2026",
      },
      {
        label: "IPTV Firestick South Africa — 10-min setup",
        href: "/iptv-firestick-south-africa",
      },
      {
        label: "Watch SuperSport without DStv",
        href: "/iptv-supersport-without-dstv",
      },
      { label: "DStv alternative — complete 2026 guide", href: "/dstv-alternative" },
      { label: "IPTV in Johannesburg", href: "/cities/johannesburg" },
      { label: "IPTV in Pretoria", href: "/cities/pretoria" },
    ],
    hasHowTo: true,
    datePublished: "2026-01-18",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  // ─── 4. IPTV SUPERSPORT WITHOUT DSTV ────────────────────────────────
  {
    slug: "iptv-supersport-without-dstv",
    eyebrow: "Sport viewing guide",
    h1: "Can you watch SuperSport without DStv?",
    metaTitle: "SuperSport without DStv – find a match in your country",
    metaDescription: "Check the broadcaster for a specific fixture, compare DStv Stream with satellite and see where South Africans abroad can watch live or on replay.",
    lead: "Start with the match, date and country where you will watch. The company showing a tournament in South Africa may differ from the company showing it overseas. A listing for a channel or a highlight clip does not establish access to the entire live match.",
    trustLine: "South Africa · Checked 26 November 2026",
    cta: {
      primary: {
        label: "Try Mzansi on my device free for 24 hours",
        message: "I’m in [country] using [device]. I’d like to try Mzansi Stream for 24 hours before I pay.",
        ref: "Pillar-iptv-supersport-without-dstv"
      },
      secondary: {
        label: "Read the guide",
        href: "#find-match"
      }
    },
    sections: [
      {
        id: "find-match",
        h2: "Find the broadcaster for your fixture",
        steps: [
          {
            title: "Look up the fixture",
            text: "Use the competition or national federation’s schedule. Check the teams, local date and time zone."
          },
          {
            title: "Select the viewing country",
            text: "Follow the tournament’s broadcast information for that territory. Use the local broadcaster’s own schedule to confirm the match."
          },
          {
            title: "Check the coverage",
            text: "Confirm the offer includes the full match live or on replay, and check the package or individual pass required before you pay."
          }
        ]
      },
      {
        id: "stream",
        h2: "What if I only want to avoid a satellite dish?",
        paragraphs: [
          "DStv Stream is the broadcaster’s internet service. South African Stream prices include R99 a month for Starter and R399 for Sports. Use the local guide for the particular fixture, as entry packages can carry selected matches."
        ]
      },
      {
        id: "overseas",
        h2: "Where can I watch outside South Africa?",
        paragraphs: [
          "For the 2026 Nations Championship finals, Rugby Australia lists Stan Sport for viewers in Australia. That listing applies to that competition and territory. A South African DStv account does not make its live service available in Australia or the UK."
        ]
      },
      {
        id: "trial",
        h2: "What can a Mzansi trial tell me?",
        paragraphs: [
          "A trial lets you see how a compatible device, connection and catalogue perform during the test. For an upcoming event, check its local broadcaster independently. Do not rely on a folder name to determine future coverage."
        ]
      }
    ],
    faq: [
      {
        q: "Does every South African DStv package carry the same sport?",
        a: "Programme access depends on the package and broadcast schedule. Check the match against your package before upgrading."
      },
      {
        q: "Will a highlights clip include the full live match?",
        a: "A highlights listing refers to edited coverage. Look for the live programme and start time for full-match coverage."
      },
      {
        q: "How much does a Mzansi trial cost?",
        a: "The advertised 24-hour trial is free and no card is needed. A one-month subscription is USD 15."
      }
    ],
    related: [
      {
        label: "DStv South African prices and reception types",
        href: "https://www.dstv.com/en-za/news/149536/how-to-change-upgrade-dstv-package/"
      },
      {
        label: "DStv’s explanation of travel restrictions",
        href: "https://www.dstv.com/en-za/help/faqs/services/dstv-app/what-is-the-dstv-stream-app/"
      },
      {
        label: "Compare DStv satellite and streaming prices",
        href: "/en-za/blog/dstv-price-south-africa"
      },
      {
        label: "Find the Australian broadcaster and kick-off time",
        href: "/en-au/blog/dstv-australia-find-the-broadcaster"
      },
      {
        label: "Find a programme in France or Germany",
        href: "/fr/blog/dstv-en-europe-par-programme"
      }
    ],
    hasHowTo: true,
    datePublished: "2026-01-22",
    dateModified: "2026-11-26",
    preferredLocale: "en-za"
  },

  // ─── 9. CHEAP IPTV SOUTH AFRICA ─────────────────────────────────────
  {
    slug: "cheap-iptv-south-africa",
    eyebrow: "South African prices",
    h1: "Cheap IPTV in South Africa – what you pay upfront",
    metaTitle: "Cheap IPTV in South Africa – monthly and annual costs",
    metaDescription: "Compare Mzansi’s one-month and prepaid prices in rand with DStv Starter. Check the first payment, device compatibility and data cost before choosing.",
    lead: "A month of Mzansi Stream costs USD 15. The annual price is USD 65 paid in one transaction, equivalent to USD 5.42 per month. If R100 is your total budget today, the annual Mzansi plan exceeds it. DStv Stream Starter is advertised at R99 for a month.",
    trustLine: "South Africa · Checked 26 November 2026",
    cta: {
      primary: {
        label: "Try Mzansi on my device free for 24 hours",
        message: "I’m in [country] using [device]. I’d like to try Mzansi Stream for 24 hours before I pay.",
        ref: "Pillar-cheap-iptv-south-africa"
      },
      secondary: {
        label: "Read the guide",
        href: "#pricing"
      }
    },
    sections: [
      {
        id: "pricing",
        h2: "Compare the payment due today",
        bullets: [
          "One month costs USD 15 upfront.",
          "A day pass costs USD 5 upfront.",
          "Twelve months cost USD 65 upfront, equivalent to USD 5.42 per month."
        ]
      },
      {
        id: "annual",
        h2: "Which is cheaper over a full year?",
        paragraphs: [
          "At unchanged monthly prices, twelve months of DStv Stream Starter cost R1,188. Mzansi’s annual payment costs R11 more. The comparison covers subscription prices only. Check the programmes, data allowance and equipment you require."
        ]
      },
      {
        id: "test",
        h2: "How to check a streaming offer before paying",
        paragraphs: [
          "Use an existing device first. Open a programme you actually want, check sound and picture at your usual viewing time, and ask for the paid total and end date in writing. Check the refund terms before committing to the year."
        ]
      }
    ],
    faq: [
      {
        q: "Can I pay USD 5.42 for just one month of Mzansi?",
        a: "One month is USD 15. USD 5.42 is the rounded monthly equivalent after paying USD 65 for a year."
      },
      {
        q: "Can I test it before paying?",
        a: "Request the advertised free 24-hour trial on WhatsApp with your device model and country."
      }
    ],
    related: [
      {
        label: "Compare DStv and Mzansi prices",
        href: "/en-za/blog/dstv-price-south-africa"
      },
      {
        label: "SABC’s direct viewing options",
        href: "/en-za/blog/sabc-without-dstv"
      },
      {
        label: "DStv South Africa package guide",
        href: "https://www.dstv.com/en-za/news/149536/how-to-change-upgrade-dstv-package/"
      },
      {
        label: "Review Mzansi refund terms",
        href: "/legal/refund"
      }
    ],
    hasHowTo: false,
    datePublished: "2026-03-01",
    dateModified: "2026-11-26",
    preferredLocale: "en-za"
  },

  // ─── 10. 4K IPTV SOUTH AFRICA ────────────────────────────────────────
  {
    slug: "4k-iptv-south-africa",
    eyebrow: "4K UHD · Streaming quality 2026",
    h1: "4K IPTV in South Africa — native UHD on every channel that broadcasts it",
    metaTitle:
      "4K IPTV South Africa — Native UHD SuperSport & Premier League",
    metaDescription:
      "4K UHD IPTV in South Africa. SuperSport, Premier League and kykNET folders to confirm on WhatsApp. One month USD 15. No promise of zero buffering.",
    lead:
      "Real 4K IPTV in South Africa means three things at the same time: a CDN bandwidth budget that can sustain 25 Mbps per stream, channels that broadcast in native UHD (not upscaled 1080p), and a home connection that holds 25 Mbps. Mzansi offers a USD 15 one-month plan. The available picture quality depends on the source, device and connection — test it on your own line during the 24-hour trial.",
    trustLine:
      "4K where the source supports it · No quality tier · Test on the 24h trial",
    cta: {
      primary: {
        label: "Test 4K on your Smart TV — Free 24h trial →",
        message:
          "Hi! I want to test the 4K Mzansi Stream feeds on my [Samsung/LG/Sony] Smart TV. Can you send the free 24h trial?",
        ref: "Pillar-4K-Hero",
      },
      secondary: { label: "Pricing", href: "#pricing" },
    },
    sections: [
      {
        id: "what-4k-means",
        h2: "Native 4K vs upscaled 1080p — what you're actually paying for",
        paragraphs: [
          "Half the 'IPTV' services on local Facebook groups claim 4K and serve 1080p with software sharpening. The picture looks slightly crisper than 1080p but it's not real UHD — the source feed never carried 2160 lines. You see it most clearly on fast pans (Premier League corner kicks, F1 cornering): the image smears.",
          "Native 4K means the broadcaster's master feed is 3840×2160 at 50fps or higher, encoded in HEVC (H.265), and delivered to your TV as ~20-25 Mbps. Which 4K feeds are in the Mzansi Stream line-up is to confirm on WhatsApp before you pay.",
        ],
      },
      {
        id: "what-broadcasts-in-4k",
        h2: "4K feeds people ask for in 2026",
        bullets: [
          "SuperSport PSL and Premier League in 4K — fixtures to confirm on WhatsApp.",
          "SuperSport Rugby in 4K — Springboks and URC fixtures to confirm on WhatsApp.",
          "Other sport and documentary 4K feeds — to confirm on WhatsApp.",
          "4K only where the broadcaster's source feed is native UHD.",
        ],
      },
      {
        id: "minimum-spec",
        h2: "Minimum spec to actually watch 4K IPTV in SA",
        bullets: [
          "Internet: 25 Mbps sustained per 4K stream (50 Mbps fibre comfortable, 100 Mbps ideal).",
          "TV: any 2018+ Smart TV with HEVC (H.265) decode — Samsung, LG, Sony, Hisense, TCL.",
          "Hardware streaming box (if Smart TV is older): Firestick 4K Max, Apple TV 4K, Nvidia Shield, Chromecast with Google TV 4K.",
          "Connection: wired Ethernet preferred for 4K. Wi-Fi 5 GHz acceptable for single-stream households.",
          "App: TiviMate Premium (best 4K UI) or IPTV Smarters Pro (free tier works).",
        ],
      },
      {
        id: "why-no-buffering",
        h2: "Why 4K buffers on some IPTV services",
        paragraphs: [
          "Most overseas IPTV providers route 4K traffic from Europe or the US. A 4K SuperSport stream from a Frankfurt server hits SA at 180-220ms one-way latency. The moment the network blip — and SA fibre has plenty of micro-blips — the stream re-buffers because the player's 4-second buffer empties before the next chunk arrives.",
          "Mzansi Stream's pages describe CDN edges at NAPAfrica in Johannesburg and Cape Town, the same exchange many SA fibre networks peer at. This page does not quote an end-to-end latency or claim the picture never freezes.",
        ],
      },
      {
        id: "how-to-enable-4k",
        h2: "How to enable 4K on your device in 5 steps",
        steps: [
          {
            title: "Pick a 4K-capable player",
            text: "TiviMate Premium on Firestick / Android TV is the gold standard. IPTV Smarters Pro works free.",
          },
          {
            title: "Connect over Ethernet (if possible)",
            text: "Buy a USB-to-Ethernet adapter for Firestick (R250). It removes Wi-Fi from the chain, which often helps 4K.",
          },
          {
            title: "Set the player's max resolution to 'Auto' or '4K'",
            text: "In TiviMate: Settings → Playback → Preferred resolution → 4K. In IPTV Smarters: enable 'Best Player' mode.",
          },
          {
            title: "Tune in to a 4K-tagged channel",
            text: "Look for the '4K' suffix on channel names: 'SuperSport PSL 4K', 'Eurosport 4K', 'BT Sport Ultimate 4K'.",
          },
          {
            title: "Confirm 4K is playing",
            text: "Most TVs show a '4K HDR' badge top-right when receiving native UHD. If you see 1080p, switch player or check your fibre line.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Is 4K available on every Mzansi Stream plan?",
        a: "Every plan — including USD 5.42/month effective on the 12-month — has the same line-up, with 4K where the source supports it. There is no 4K surcharge.",
      },
      {
        q: "What internet speed do I need for 4K IPTV?",
        a: "25 Mbps sustained per active 4K stream. A 50 Mbps Vumatel or Openserve line comfortably runs one 4K + one HD stream simultaneously.",
      },
      {
        q: "Does Mzansi Stream upscale 1080p to fake 4K?",
        a: "4K is only offered where the source feed is native UHD; other channels play at their source resolution. Check the picture on the 24-hour trial.",
      },
      {
        q: "Will 4K work on my older Samsung Smart TV?",
        a: "If the TV is 2018 or newer with HEVC decode, yes. Older models without H.265 hardware should pair a Firestick 4K Max for 4K playback.",
      },
      {
        q: "Why does my 4K stream drop to 1080p?",
        a: "Usually a Wi-Fi jitter issue. Switch to 5 GHz, move closer to the router, or hard-wire over Ethernet. Check the line too if the drop persists.",
      },
      {
        q: "Does the EPG show 4K availability?",
        a: "Yes — the channel name carries the '4K' suffix when a feed is native UHD.",
      },
      {
        q: "Do I need a separate 4K subscription for Premier League?",
        a: "No separate 4K price. Which Premier League fixtures are available in 4K is to confirm on WhatsApp.",
      },
    ],
    related: [
      { label: "Best IPTV for SuperSport without DStv", href: "/iptv-supersport-without-dstv" },
      { label: "IPTV buffering on SA fibre", href: "/iptv-no-buffering-south-africa" },
      { label: "Best IPTV for Vumatel / Openserve / Frogfoot", href: "/iptv-vumatel-openserve-frogfoot" },
      { label: "IPTV Firestick install guide", href: "/iptv-firestick-south-africa" },
      { label: "IPTV for Samsung Smart TV", href: "/iptv-samsung-smart-tv" },
      { label: "Cheap IPTV South Africa", href: "/cheap-iptv-south-africa" },
    ],
    hasHowTo: true,
    datePublished: "2026-03-02",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  // ─── 11. IPTV NO BUFFERING SOUTH AFRICA ─────────────────────────────
  {
    slug: "iptv-no-buffering-south-africa",
    eyebrow: "Streaming quality · Stability 2026",
    h1: "IPTV without buffering in South Africa — what actually causes it and how to fix it",
    metaTitle:
      "IPTV No Buffering South Africa — Causes and Fixes",
    metaDescription:
      "Why IPTV buffers in South Africa, and what to check at home. NAPAfrica-peered CDN. Setup checklist. No measured latency or uptime on this page.",
    lead:
      "Buffering is the single most common complaint in every SA IPTV WhatsApp group. The fix usually isn't your fibre — it's the provider's CDN, your home Wi-Fi, or your streaming app's buffer settings. This guide walks through every cause in order of likelihood, and how to test any provider — including Mzansi Stream — on your own line before you pay.",
    trustLine:
      "NAPAfrica-peered CDN · Vumatel, Openserve, Frogfoot, Octotel · test 4K on your line",
    cta: {
      primary: {
        label: "Test 4K on your line — Free 24h trial →",
        message:
          "Hi! I've had buffering issues with another IPTV provider. Can you send me the Mzansi Stream 24h free trial so I can test?",
        ref: "Pillar-NoBuffer-Hero",
      },
      secondary: { label: "Diagnostic checklist", href: "#fix-it" },
    },
    sections: [
      {
        id: "what-causes-buffering",
        h2: "What actually causes IPTV buffering in South Africa",
        paragraphs: [
          "Buffering is the visible symptom of one thing: the streaming app's local buffer empties faster than the network can refill it. Every other variable — provider, fibre line, router, TV — feeds back into that one equation.",
          "There are five common bottlenecks, ranked by how often they're the real culprit on SA fibre lines in 2026.",
        ],
        bullets: [
          "1. Provider CDN routes overseas (no NAPAfrica peering) — 180-220ms latency to SA.",
          "2. Wi-Fi router caps real throughput below 100 Mbps (especially old 2.4 GHz only).",
          "3. Streaming app's buffer setting is too small (TiviMate default is 2s; raise it to 8s for 4K).",
          "4. Background traffic (game console download, Windows Update) saturating the line.",
          "5. ISP-side congestion event (rare on Vumatel and Openserve in 2026).",
        ],
      },
      {
        id: "why-mzansi-doesnt-buffer",
        h2: "How routing and player settings affect buffering",
        paragraphs: [
          "NAPAfrica is the public peering exchange where the major SA ISPs — Vumatel, Openserve, Frogfoot, Octotel, MetroFibre, MTN, Vodacom, Rain — interconnect. A stream routed from far away crosses more hops, and every micro-blip can turn into a re-buffer.",
          "This page does not publish a measured latency or uptime for Mzansi Stream. A larger player buffer and adaptive bitrate (dropping from 4K to 1080p instead of stalling) help on any provider. The 24-hour trial is how you check your own line.",
        ],
      },
      {
        id: "fix-it",
        h2: "The buffering fix checklist — work through it in order",
        steps: [
          {
            title: "Switch the streaming app to a 5 GHz Wi-Fi band",
            text: "Most home routers still default to 2.4 GHz. Force the streaming device onto the 5 GHz SSID. If unsure, name the bands differently in router settings — e.g. 'MyHome' and 'MyHome-5G' — and connect your Firestick to the -5G one.",
          },
          {
            title: "Hard-wire over Ethernet for 4K streams",
            text: "A USB-to-Ethernet adapter for Firestick (R250 on Takealot) is the single biggest stability upgrade. Eliminates Wi-Fi jitter entirely. Mandatory for households streaming 4K SuperSport during peak Saturday traffic.",
          },
          {
            title: "Raise the player buffer to 8 seconds",
            text: "In TiviMate: Settings → Playback → Buffer Size → 8 sec. In IPTV Smarters: Settings → Player Settings → Time-shift Buffer → 6-10 sec. Adds a couple of seconds of channel-change delay and often reduces re-buffers.",
          },
          {
            title: "Disable Smart TV DLNA / SmartShare",
            text: "Samsung Smart TVs run DLNA service in the background. It occasionally hijacks bandwidth mid-stream. Disable: Smart TV Settings → Network → AllShare / SmartShare → Off.",
          },
          {
            title: "Run a speed test during the buffer event",
            text: "speedtest.net from the same Wi-Fi network the TV uses. If you're getting <25 Mbps on a 100 Mbps line, your router is the bottleneck. Replace with Wi-Fi 6 (TP-Link Archer AX55, ASUS RT-AX55).",
          },
          {
            title: "Check for a Rain 5G / fibre backup",
            text: "If your primary fibre line has chronic congestion, a R299/mo Rain 5G mobile router is a clean backup. Switch streams over via a dual-WAN router (TP-Link ER605 R1,200).",
          },
        ],
      },
      {
        id: "provider-shopping-list",
        h2: "How to vet an IPTV provider for stability before you pay",
        bullets: [
          "Ask: 'Do you peer at NAPAfrica?' — if the answer is no or vague, walk away.",
          "Ask what happens if a PSL stream drops. A written answer is more useful than an uptime slogan.",
          "Demand a 24-hour free trial of the full channel pack. If the trial is restricted, the production feed is probably worse.",
          "Test on a Saturday afternoon during a SuperSport PSL fixture and a Premier League fixture. Peak load reveals every weakness.",
          "Watch a 4K stream + a 1080p stream simultaneously on two devices. Real CDNs handle this without breaking sweat.",
        ],
      },
    ],
    faq: [
      {
        q: "Why does my IPTV buffer during the Premier League but not movies?",
        a: "Live sport is bandwidth-heavier than VOD because the player can't pre-fetch. Live 4K sport requires sustained throughput; movies tolerate brief network drops because the player can buffer ahead.",
      },
      {
        q: "Is buffering my fibre line's fault?",
        a: "Sometimes, but often not. The bottleneck is usually the provider's CDN routing overseas, your home Wi-Fi, or the streaming app's buffer setting.",
      },
      {
        q: "How fast does my connection need to be?",
        a: "25 Mbps sustained per 4K stream. A 50 Mbps Vumatel line comfortably runs one 4K + one HD stream. Below 15 Mbps, drop to 1080p for stable playback.",
      },
      {
        q: "Will a VPN reduce buffering?",
        a: "No — a VPN adds latency. Mzansi Stream is not geo-blocked on SA fibre, so a VPN only hurts. Only use one if streaming from outside SA.",
      },
      {
        q: "What's the difference between buffering and freezing?",
        a: "Buffering = the player spinner shows for a few seconds then resumes (network drop, recoverable). Freezing = the picture locks completely and the stream restarts (provider feed died or app crashed). Persistent freezing usually means a bad provider.",
      },
      {
        q: "Does TiviMate's buffer setting really matter?",
        a: "Yes — it is an under-rated fix. Raising the buffer from 2s to 8s often reduces micro-re-buffers, at the cost of a slightly slower channel change.",
      },
      {
        q: "Does Mzansi Stream guarantee no buffering?",
        a: "No. Home Wi-Fi and ISP congestion are outside any provider's control, and this page does not quote a latency or an uptime percentage.",
      },
    ],
    related: [
      { label: "Best IPTV for Vumatel / Openserve / Frogfoot", href: "/iptv-vumatel-openserve-frogfoot" },
      { label: "4K IPTV in South Africa", href: "/4k-iptv-south-africa" },
      { label: "Best IPTV in South Africa 2026", href: "/best-iptv-south-africa-2026" },
      { label: "IPTV Firestick install guide", href: "/iptv-firestick-south-africa" },
      { label: "Cheap IPTV South Africa", href: "/cheap-iptv-south-africa" },
      { label: "Watch SuperSport without DStv", href: "/iptv-supersport-without-dstv" },
    ],
    hasHowTo: true,
    datePublished: "2026-03-03",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  // ─── 12. IPTV FOR MOVIES & SERIES ───────────────────────────────────
  {
    slug: "iptv-for-movies-and-series",
    eyebrow: "Movies & Series · VOD to check on the trial",
    h1: "IPTV for movies and series — VOD on demand, plus live movie channels",
    metaTitle:
      "IPTV for Movies & Series South Africa — VOD and Live Movies",
    metaDescription:
      "IPTV for movies and series in South Africa — on-demand VOD plus live movie-channel folders. Catalogue to confirm on WhatsApp. 4K where the source supports it, no contract. One month USD 15.",
    lead:
      "If you watch more movies and series than live sport, ask about Mzansi Stream's VOD catalogue and live movie-channel folders before you pay. This page does not publish a title count or promise any studio's or streaming service's catalogue — browse what is actually there during the 24-hour trial, then decide.",
    trustLine:
      "VOD + live movie folders · Catalogue to confirm on WhatsApp · 4K where the source supports it",
    cta: {
      primary: {
        label: "Browse the movie catalogue — Free 24h trial →",
        message:
          "Hi! I'm interested in Mzansi Stream mainly for movies and series. Can I get the 24h free trial to browse the VOD catalogue?",
        ref: "Pillar-Movies-Hero",
      },
      secondary: { label: "Pricing", href: "#pricing" },
    },
    sections: [
      {
        id: "vs-streaming-services",
        h2: "Mzansi Stream VOD vs Netflix, Disney+, HBO Max, Showmax",
        paragraphs: [
          "The standalone Showmax service closed on 30 April 2026. Selected titles moved to DStv Stream. For other services, check the title’s official local listing and price.",
          "Mzansi Stream is not a substitute for those services and does not claim their catalogues. Keep the apps you rely on; use the 24-hour trial to see what the Mzansi Stream VOD section actually holds.",
        ],
      },
      {
        id: "what-is-included",
        h2: "What's in the VOD catalogue",
        bullets: [
          "Movies and series in categories (genre, year, language).",
          "African and SA series folders — catalogue to confirm on WhatsApp.",
          "Bollywood, Tamil and Telugu folders — catalogue to confirm on WhatsApp.",
          "Documentaries — catalogue to confirm on WhatsApp.",
          "No title count is published; ask for the titles you want before you pay.",
        ],
      },
      {
        id: "live-movie-channels",
        h2: "Live movie channels (the bit Netflix can't give you)",
        bullets: [
          "M-Net movie channels — folders to confirm on WhatsApp.",
          "Other live movie and series channels — folders to confirm on WhatsApp.",
          "Live channels follow the broadcaster's schedule, not on-demand.",
        ],
      },
      {
        id: "quality",
        h2: "Quality — 4K HDR where the source supports it",
        paragraphs: [
          "Movies and series play at the resolution the source carries. Many titles are 1080p; 4K only where the source is 4K.",
          "Mzansi Stream doesn't tier quality — there's no 'Premium 4K' upsell on top of the plan price.",
        ],
      },
      {
        id: "how-to-browse",
        h2: "How to browse the VOD catalogue",
        steps: [
          {
            title: "Install a VOD-friendly player",
            text: "IPTV Smarters Pro has the cleanest VOD grid on Firestick / Android TV / Samsung Tizen. TiviMate Premium handles live + VOD in one app.",
          },
          {
            title: "Load your Xtream Codes credentials",
            text: "We send the username/password via WhatsApp after sign-up. Enter once — the VOD library appears as a grid.",
          },
          {
            title: "Use the search / categories",
            text: "Filter by genre or year. Watchlist + resume-watching are saved per device in most players.",
          },
          {
            title: "Stream in 4K when available",
            text: "Look for the '4K' badge on the title card. Without it, the title plays at its source resolution.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "How big is the VOD catalogue?",
        a: "This site does not publish a title count. Ask on WhatsApp for the titles you want and browse the catalogue during the 24-hour trial.",
      },
      {
        q: "Can I watch new Netflix releases on Mzansi Stream?",
        a: "Netflix originals are Netflix's own catalogue. This page does not claim them — keep Netflix if you rely on it.",
      },
      {
        q: "Does the VOD catalogue include local SA shows?",
        a: "Ask on WhatsApp for the specific shows you want; the catalogue is to confirm before you pay.",
      },
      {
        q: "Can I watch movies in 4K on Mzansi Stream?",
        a: "Only where the source is 4K and your TV supports it. Many titles are 1080p.",
      },
      {
        q: "Is there a resume-watching feature?",
        a: "Yes — IPTV Smarters Pro and TiviMate Premium both save resume points per device and per profile.",
      },
      {
        q: "Can I download titles for offline viewing?",
        a: "Not by default — Mzansi Stream is a streaming service, not a download store. Some VOD players support pre-fetching for offline use; we explain how on WhatsApp on request.",
      },
      {
        q: "Why is Mzansi Stream cheaper than the streaming services combined?",
        a: "It is a different product: one IPTV plan, not a bundle of the official streaming apps. Compare what you actually watch on the 24-hour trial before you cancel anything.",
      },
    ],
    related: [
      { label: "Best IPTV in South Africa 2026", href: "/best-iptv-south-africa-2026" },
      { label: "4K IPTV in South Africa", href: "/4k-iptv-south-africa" },
      { label: "Cheap IPTV South Africa", href: "/cheap-iptv-south-africa" },
      { label: "Mzansi Stream vs Netflix", href: "/vs/netflix" },
      { label: "Mzansi Stream vs Showmax", href: "/vs/showmax" },
      { label: "DStv alternative — complete guide", href: "/dstv-alternative" },
    ],
    hasHowTo: true,
    datePublished: "2026-03-04",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },
];

export const PILLAR_SLUGS = PILLARS.map((p) => p.slug);

export function getPillar(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}
