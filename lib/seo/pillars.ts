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
      "IPTV for Vumatel, Openserve & Frogfoot 2026 — 4K Stable | Mzansi Stream",
    metaDescription:
      "Best IPTV for Vumatel, Openserve, Frogfoot, Octotel and MetroFibre fibre in South Africa. 4K SuperSport with no buffering. NAPAfrica-peered CDN. From R99/mo.",
    lead:
      "If you're on Vumatel, Openserve, Frogfoot, Octotel, MetroFibre, MTN Fibre, Vodacom Fibre or Rain 5G, your fibre line is more than capable of streaming Mzansi Stream's 4K SuperSport, Premier League and 20,000+ international channels without buffering — provided the IPTV provider's CDN actually peers with NAPAfrica. This guide explains why most overseas IPTV providers stutter on SA fibre, how the Mzansi Stream CDN is provisioned, and what to check on your router if 4K streams drop to 1080p.",
    trustLine:
      "NAPAfrica-peered · Edges in Johannesburg + Cape Town · 4K stable on every major SA fibre line",
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
          "Mzansi Stream's CDN edges sit at NAPAfrica in Johannesburg and Cape Town — the same exchange every major SA ISP peers at. That means a Vumatel, Openserve or Frogfoot customer's 4K SuperSport stream travels less than 15ms from edge to TV. Compare that to a typical 'EU/US IPTV' service routing via Amsterdam (180-220ms one-way to SA), which buffers visibly during a fast PSL counter-attack.",
        ],
      },
      {
        id: "isps",
        h2: "Best IPTV performance by SA fibre ISP — 2026 benchmark",
        bullets: [
          "Vumatel — direct NAPAfrica peering, 4K stable, <10ms to Mzansi Stream edge.",
          "Openserve (Telkom) — direct NAPAfrica peering, 4K stable, <15ms.",
          "Frogfoot — direct NAPAfrica peering, 4K stable, <12ms.",
          "Octotel (Cape Town) — direct peering, 4K stable on Cape Town edge.",
          "MetroFibre — direct peering, 4K stable.",
          "MTN Fibre — direct peering, 4K stable.",
          "Vodacom Fibre — direct peering, 4K stable.",
          "Rain 5G — wireless, slightly higher jitter but 4K SuperSport plays cleanly on most home setups.",
          "Telkom LTE — variable, HD recommended over 4K.",
        ],
      },
      {
        id: "router-setup",
        h2: "Router setup — get 4K stable on Vumatel and Openserve",
        paragraphs: [
          "Most 4K IPTV streaming problems on SA fibre aren't the fibre — they're the router. The Huawei B315s, Huawei B535, ZTE H168N, ZTE F660 and many Vodacom-branded routers shipped 2020-2023 cap 5GHz throughput at 60-80 Mbps even on a 500 Mbps line. Either replace with a Wi-Fi 6 router (TP-Link Archer AX55 R1,300, ASUS RT-AX55 R1,500) or hard-wire your Smart TV / Firestick over Ethernet.",
          "A Firestick 4K connected via USB-Ethernet adapter (R250 on Takealot) is the single biggest 4K stability upgrade most SA households can make. Eliminates Wi-Fi jitter completely.",
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
          "Fibre outages happen. The Vumatel Joburg outages in early 2026 reminded everyone that no single fibre line is bulletproof. The best practical defence: a Rain 5G or MTN Wi-Fi mobile router as backup. Both stream Mzansi Stream's HD feeds cleanly during a fibre outage.",
          "If you're a heavy SuperSport household, consider a dual-WAN router (TP-Link ER605 or MikroTik hEX) with fibre as primary and Rain 5G as failover — IPTV switches WAN in <2 seconds and you don't miss a goal.",
        ],
      },
    ],
    faq: [
      {
        q: "Does Mzansi Stream work on Vumatel?",
        a: "Yes. Mzansi Stream peers at NAPAfrica with edges in Johannesburg — Vumatel routes there directly. 4K SuperSport runs at <10ms one-way latency on Vumatel.",
      },
      {
        q: "Does Mzansi Stream work on Openserve?",
        a: "Yes. Openserve (Telkom) peers directly at NAPAfrica. 4K stable across the Openserve network.",
      },
      {
        q: "Does Mzansi Stream work on Frogfoot?",
        a: "Yes. Frogfoot peers at NAPAfrica. 4K stable.",
      },
      {
        q: "Does Mzansi Stream work on Octotel (Cape Town)?",
        a: "Yes. Octotel peers locally in Cape Town. Mzansi Stream's Cape Town edge serves Octotel customers with <15ms latency for 4K.",
      },
      {
        q: "What internet speed do I need for 4K IPTV?",
        a: "Minimum 25 Mbps sustained for stable 4K UHD streaming. 100 Mbps gives comfortable headroom for a household streaming multiple devices in parallel.",
      },
      {
        q: "My SuperSport stream buffers — is it my fibre?",
        a: "Almost certainly not — Vumatel, Openserve and Frogfoot all carry Mzansi Stream at <15ms. The bottleneck is usually your Wi-Fi router or 2.4GHz interference. Switch to 5GHz or hard-wire over Ethernet.",
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
        href: "/best-iptv-south-africa-2026/",
      },
      {
        label: "Watch SuperSport without DStv",
        href: "/iptv-supersport-without-dstv/",
      },
      {
        label: "IPTV Firestick South Africa — install guide",
        href: "/iptv-firestick-south-africa/",
      },
      { label: "IPTV in Johannesburg", href: "/cities/johannesburg/" },
      { label: "IPTV in Cape Town", href: "/cities/cape-town/" },
      { label: "IPTV in Durban", href: "/cities/durban/" },
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
      "IPTV EFT, SnapScan, Ozow, Capitec Pay — No Credit Card | Mzansi Stream",
    metaDescription:
      "Pay for IPTV in South Africa with EFT, SnapScan, Ozow, Zapper, Yoco or Capitec Pay — no credit card required. Mzansi Stream — full 4K SuperSport from R99/mo.",
    lead:
      "Most international IPTV providers require a Visa or Mastercard. Mzansi Stream accepts every standard South African payment method without forcing a credit card — EFT, SnapScan, Ozow, Zapper, Yoco, Capitec Pay, plus Visa, Mastercard, PayPal and Bitcoin. This guide covers each payment method, how fast it activates, what the receipt looks like, and which one to pick if your priority is speed (Ozow), privacy (Bitcoin), or zero card details (Capitec Pay).",
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
          "EFT (manual bank transfer) — slowest (1-4 hours business hours), zero fees, full POPIA-compliant audit trail.",
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
          "Ozow, SnapScan, Zapper, Capitec Pay, Yoco and card payments all activate your Mzansi Stream subscription in under 2 minutes — typically you're streaming within 10 minutes of clicking pay.",
          "Manual EFT takes 1-4 business hours because we wait for the funds to clear in our account. If you need immediate activation, pick Ozow — it's instant EFT and bypasses the clearing delay.",
        ],
      },
      {
        id: "privacy",
        h2: "Which payment is most private?",
        paragraphs: [
          "If your priority is minimum information shared, the privacy ranking is: Bitcoin > Capitec Pay > Ozow > SnapScan > Yoco > Visa/Mastercard direct entry.",
          "Mzansi Stream is POPIA-compliant — we collect only what's required to deliver your subscription (your phone number for WhatsApp delivery, your name on the payment, the plan you purchased). We do not sell or share your data.",
        ],
      },
      {
        id: "no-recurring",
        h2: "No recurring billing trap",
        paragraphs: [
          "Mzansi Stream does not enrol your card or bank in any recurring debit order. Every plan is paid once for the period you selected. When the period ends, your subscription expires unless you actively renew via WhatsApp — no surprise R1,199 charge at midnight on month 13.",
          "This is the opposite of the DStv / Netflix / Showmax model and it's deliberate. We'd rather you actively choose to renew than 'forget' you're paying.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I pay for IPTV via EFT in South Africa?",
        a: "Yes. Mzansi Stream accepts manual EFT into our SA business bank account. Activation takes 1-4 business hours after the funds clear. For instant activation, use Ozow instead.",
      },
      {
        q: "Does Mzansi Stream accept SnapScan?",
        a: "Yes. SnapScan is one of our most popular payment methods. Scan the QR code we send on WhatsApp, pay in under 60 seconds, and your subscription activates within minutes.",
      },
      {
        q: "Can I pay with Capitec Pay?",
        a: "Yes. Pay directly from your Capitec banking app without sharing card details. Activation in under 60 seconds after payment confirmation.",
      },
      {
        q: "Does Mzansi Stream accept Ozow?",
        a: "Yes. Ozow is the fastest payment method we offer — instant EFT via your bank's OTP, no manual clearing delay. Subscription activates in under 2 minutes.",
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
        a: "Yes. We are POPIA-compliant, collect only the data needed to deliver your subscription, and never share your payment details with third parties.",
      },
      {
        q: "Can I pay in cash?",
        a: "Not directly — but Capitec, FNB and Standard Bank cash deposit ATMs all accept cash that lands in our account in real time. Use the EFT reference we provide.",
      },
    ],
    related: [
      {
        label: "Best IPTV in South Africa 2026 — buyer's guide",
        href: "/best-iptv-south-africa-2026/",
      },
      { label: "DStv alternative — complete 2026 guide", href: "/dstv-alternative/" },
      {
        label: "Is IPTV legal in South Africa?",
        href: "/is-iptv-legal-south-africa/",
      },
      {
        label: "Watch SuperSport without DStv",
        href: "/iptv-supersport-without-dstv/",
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
    eyebrow: "Cancel DStv · 2026 step-by-step",
    h1: "How to Cancel DStv in 2026 — Without Paying Another R899",
    metaTitle:
      "How to Cancel DStv 2026 — Step-by-Step + Switch to IPTV | Mzansi Stream",
    metaDescription:
      "Cancel DStv in 2026 — exact WhatsApp number, 30-day notice trick, and how to switch to IPTV with no contract from R99/mo. Save R9,500+ a year.",
    lead:
      "Cancelling DStv is harder than signing up — by design. This guide walks through the exact 2026 cancellation process, the WhatsApp number that works (060 060 3788), the 30-day notice timing trick that saves you a wasted month, and how to switch to Mzansi Stream so you don't miss a single SuperSport match during the transition.",
    trustLine:
      "WhatsApp 060 060 3788 · 30-day notice · Switch to IPTV from R99/mo",
    cta: {
      primary: {
        label: "Switch to IPTV — Free 24h trial →",
        message:
          "Hi! I'm about to cancel DStv. Please activate my free 24-hour Mzansi Stream trial so I can test before I commit.",
        ref: "Pillar-CancelDStv-Hero",
      },
      secondary: { label: "Jump to cancel steps →", href: "#cancel" },
    },
    sections: [
      {
        id: "why-now",
        h2: "Why cancel DStv in 2026?",
        paragraphs: [
          "DStv Premium is R899/month — R10,788/year. Compact Plus R549, Compact R449. Pricing has risen roughly 12% cumulatively since 2024 while SA household disposable income hasn't kept pace. The 24-month decoder contract locks you in, the 30-day cancellation notice extracts one more billing cycle, and the support process actively makes leaving hard.",
          "In 2026, no DStv tier delivers anything you can't get from a credible IPTV provider at a fraction of the cost — same SuperSport feeds, same kykNET, same SABC, same Premier League, in 4K, on the devices you already own.",
        ],
      },
      {
        id: "cancel",
        h2: "How to cancel DStv — exact 2026 step-by-step",
        steps: [
          {
            title: "Decide your cancellation date",
            text: "DStv requires 30 days' notice on a paid month. To minimise wasted billing, give notice on Day 1 of your billing cycle — not the last day. Check your billing date in the MyDStv app under Account → Billing.",
          },
          {
            title: "Open MyDStv app or whatsapp 060 060 3788",
            text: "The WhatsApp number is the fastest channel and creates a written record. The MyDStv app's cancellation flow is buried under 4 menu layers — search for 'Cancel subscription' or 'Disconnect'.",
          },
          {
            title: "Send the cancellation request",
            text: "Use this exact wording on WhatsApp: 'I want to cancel my DStv subscription. Please action a 30-day cancellation effective [DATE]. Send written confirmation.' Insist on written confirmation — verbal cancellation does not always action.",
          },
          {
            title: "Confirm in writing",
            text: "Within 24 hours you should receive an SMS or email confirming the cancellation. If not, escalate by replying 'Following up on cancellation reference XXXX, please confirm in writing today.'",
          },
          {
            title: "Activate Mzansi Stream the same day",
            text: "Don't wait the full 30 days — start your Mzansi Stream trial immediately. You can run both side by side until the DStv cancellation takes effect, so you don't miss a single match.",
          },
          {
            title: "Return decoder (if applicable)",
            text: "If your decoder is rented (not purchased), DStv will instruct you to return it to a SuperSport store, Pick n Pay smart-shop or specific outlet. Keep the return receipt — DStv sometimes claims non-return and charges R1,500+.",
          },
        ],
      },
      {
        id: "common-traps",
        h2: "Cancellation traps to avoid",
        bullets: [
          "Verbal cancellation that's never recorded — always demand written confirmation.",
          "'Pause' offered instead of 'cancel' — they're not the same; pause keeps you in the system and resumes billing automatically.",
          "Decoder non-return charge — keep the return receipt for 12 months.",
          "Retention discount that locks you in for another 12 months — politely decline if you're committed to switching.",
          "Last-day notice that wastes a full extra month of billing — give notice on Day 1 of your cycle.",
          "Auto-renewal on your linked card — verify the card is removed after cancellation.",
        ],
      },
      {
        id: "switch",
        h2: "Switching to Mzansi Stream — zero gap",
        paragraphs: [
          "The smart move is to start Mzansi Stream's 24-hour free trial before you send the DStv cancellation. Verify the lineup works on your fibre line, your Smart TV / Firestick / Android box, and that every SuperSport feed plays cleanly in 4K. Once you're confident, pay for a Mzansi Stream plan (1 / 3 / 6 / 12 months) — then send the DStv cancellation.",
          "During the 30-day DStv notice period, you'll have both running. After day 30, DStv is gone and you've saved R800/month for the rest of the year.",
        ],
      },
    ],
    faq: [
      {
        q: "How do I cancel DStv on WhatsApp?",
        a: "Send 'I want to cancel my DStv subscription, please action a 30-day cancellation effective [DATE]' to 060 060 3788. Always demand written confirmation.",
      },
      {
        q: "Do I have to give 30 days' notice?",
        a: "Yes, DStv requires 30 days' notice on the paid month. Give notice on Day 1 of your billing cycle to avoid wasting an additional month of billing.",
      },
      {
        q: "Will DStv charge me for the decoder if I cancel?",
        a: "If your decoder is rented, you must return it to a DStv-approved outlet. Keep the return receipt — DStv occasionally bills R1,500+ for 'non-return' even when the decoder was returned.",
      },
      {
        q: "Can I cancel DStv mid-contract?",
        a: "Yes, but if you're on a decoder finance contract there may be an early-termination fee on the remaining decoder instalments. The subscription itself can always be cancelled with 30 days' notice.",
      },
      {
        q: "What do I switch to after cancelling DStv?",
        a: "Mzansi Stream is the leading SA IPTV alternative — same SuperSport, kykNET, SABC, Premier League in 4K, from R99/month with no contract.",
      },
      {
        q: "Will I miss matches during the switch?",
        a: "No. Start your Mzansi Stream trial before sending the DStv cancellation. You'll have both running during the 30-day notice period, so coverage is continuous.",
      },
      {
        q: "Can I cancel DStv online?",
        a: "Through the MyDStv app, yes — but the option is buried under 4 menu layers. WhatsApp on 060 060 3788 is faster and creates a written record.",
      },
      {
        q: "What if DStv keeps billing after cancellation?",
        a: "Dispute via WhatsApp with the written cancellation confirmation as proof. If unresolved, escalate to the National Consumer Commission. Your bank can also reverse unauthorised debit orders.",
      },
    ],
    related: [
      { label: "DStv alternative — complete 2026 guide", href: "/dstv-alternative/" },
      {
        label: "Best IPTV in South Africa 2026",
        href: "/best-iptv-south-africa-2026/",
      },
      {
        label: "Watch SuperSport without DStv",
        href: "/iptv-supersport-without-dstv/",
      },
      { label: "Mzansi Stream vs DStv Premium", href: "/vs/dstv-premium/" },
      {
        label: "Mzansi Stream vs DStv Compact Plus",
        href: "/vs/dstv-compact-plus/",
      },
    ],
    hasHowTo: true,
    datePublished: "2026-02-08",
    dateModified: "2026-05-16",
    preferredLocale: ZA,
  },

  // ─── 8. IS IPTV LEGAL IN SOUTH AFRICA ───────────────────────────────
  {
    slug: "is-iptv-legal-south-africa",
    eyebrow: "Legal · IPTV in South Africa 2026",
    h1: "Is IPTV Legal in South Africa in 2026? — The Honest Answer",
    metaTitle:
      "Is IPTV Legal in South Africa 2026? — Honest Legal Guide | Mzansi Stream",
    metaDescription:
      "Is IPTV legal in South Africa in 2026? The honest legal answer — IPTV is a legal technology; unlicensed redistribution is not. What to check before subscribing.",
    lead:
      "The single most-asked question about IPTV in South Africa is whether it's legal. The honest answer in 2026: IPTV is a legal technology — the same way an internet browser is. What's illegal is the unauthorised distribution of copyrighted content without a licence. This guide separates the technology from the licensing question, explains what makes one IPTV provider legitimate and another a SAPS-DPCI target, and what to check before paying any provider in SA.",
    trustLine:
      "Licensed source · POPIA-compliant · Traceable SA payments · Operating openly",
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
          "IPTV — Internet Protocol Television — is a legal technology. South African law does not prohibit streaming television over the internet. What is illegal is the unauthorised distribution of copyrighted content (films, series, channel feeds) without the rights-holder's licence, under the Copyright Act 98 of 1978 (as amended).",
          "A legitimate IPTV provider in SA in 2026 sources its content via licensed partners, accepts traceable payment, operates a real business under POPIA, and discloses its information officer. An illegitimate provider does none of those things — they accept anonymous crypto via a Telegram channel, change names every 6 months, and never answer the licensing question.",
        ],
      },
      {
        id: "framework",
        h2: "The legal framework in 2026",
        paragraphs: [
          "Four pieces of SA legislation are relevant to IPTV: (1) the Copyright Act 98 of 1978 (governing distribution rights), (2) the Electronic Communications Act 36 of 2005 (regulating broadcasting), (3) the Protection of Personal Information Act 4 of 2013 (POPIA) (governing how subscriber data is handled), and (4) the Consumer Protection Act 68 of 2008 (governing the subscriber relationship).",
          "There is no SA law that bans 'IPTV' as a category. The legal exposure for an IPTV provider arises specifically when content is redistributed without licence. The legal exposure for a subscriber is far smaller — SA enforcement focuses on distributors, not end-users, and there has been no reported prosecution of an individual SA IPTV subscriber in 2024-2026.",
        ],
      },
      {
        id: "what-makes-legit",
        h2: "What makes an IPTV provider legitimate in 2026?",
        bullets: [
          "Sources content via named, licensed partners — not anonymous reseller chains.",
          "Operates under a registered SA business name (CIPC searchable).",
          "POPIA-compliant — has a published Information Officer and privacy policy.",
          "Accepts traceable SA payment methods (EFT, SnapScan, Ozow, Capitec Pay), not crypto-only.",
          "Publishes a real WhatsApp / phone support channel staffed by humans.",
          "Honours the Consumer Protection Act — refunds, cancellations, no auto-debit trap.",
          "Doesn't claim impossible things ('every channel in the world for R49/month').",
        ],
      },
      {
        id: "what-to-avoid",
        h2: "Red flags — providers to walk away from",
        bullets: [
          "Crypto-only payments via Telegram — designed to evade KYC and traceability.",
          "Domain that changes every 3-6 months.",
          "No published business name, no CIPC registration, no address.",
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
          "SA enforcement focuses on the distributors of unauthorised content, not on end-users. There has been no reported prosecution of an individual SA IPTV subscriber in recent years. The legal risk to a subscriber paying a legitimate IPTV provider via traceable payment is effectively zero.",
          "That said, the safer position is always to subscribe to a provider that operates openly with named licensing partners. That's the standard Mzansi Stream meets, and it's the standard you should look for in any provider you consider in 2026.",
        ],
      },
      {
        id: "vpn",
        h2: "Do I need a VPN to use IPTV in South Africa?",
        paragraphs: [
          "No. A VPN is not required for IPTV in South Africa. Mzansi Stream isn't geo-blocked on SA fibre. Some users prefer a VPN for general privacy reasons (the same way some users prefer a VPN for browsing) — that's a personal choice, not an IPTV requirement.",
          "If you're an SA expat watching SA content from abroad, a VPN may help if the destination country geo-blocks certain feeds. Mzansi Stream works in 50+ countries without geo-blocking on our side.",
        ],
      },
    ],
    faq: [
      {
        q: "Is IPTV legal in South Africa in 2026?",
        a: "Yes — IPTV is a legal technology in South Africa. What's illegal is the unauthorised distribution of copyrighted content without a licence. A legitimate IPTV provider sources via licensed partners, operates under POPIA, and accepts traceable SA payment.",
      },
      {
        q: "Can I be prosecuted for using IPTV in SA?",
        a: "SA enforcement focuses on distributors, not subscribers. There has been no reported prosecution of an individual SA IPTV subscriber in recent years. The legal risk for a subscriber to a legitimate provider is effectively zero.",
      },
      {
        q: "Is Mzansi Stream a legitimate IPTV provider?",
        a: "Yes. Mzansi Stream sources channels via licensed partners, operates under POPIA, accepts traceable SA payment methods (EFT, SnapScan, Ozow, Capitec Pay), publishes a real WhatsApp support channel, and honours the Consumer Protection Act with a 7-day refund guarantee.",
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
        a: "It's legal to watch SuperSport via an IPTV provider that holds the redistribution licence. Mzansi Stream sources SuperSport feeds via licensed partners and accepts traceable SA payment — meeting the standards SA copyright law contemplates.",
      },
      {
        q: "What's the difference between legitimate and illegitimate IPTV?",
        a: "Legitimate IPTV: named licensing chain, registered SA business, POPIA-compliant, traceable payment, published support, sustainable pricing. Illegitimate IPTV: crypto-only payment, anonymous Telegram channel, R49/month 'lifetime' deals, no published business name.",
      },
      {
        q: "Is downloading IPTV apps like TiviMate or IPTV Smarters illegal?",
        a: "No. TiviMate, IPTV Smarters Pro, GSE Smart IPTV and Smart IPTV are all legal apps available in the Amazon and Google Play stores. They're M3U players — the same way VLC is an M3U player. Legality depends entirely on the source you connect them to.",
      },
    ],
    related: [
      {
        label: "Best IPTV in South Africa 2026 — buyer's guide",
        href: "/best-iptv-south-africa-2026/",
      },
      { label: "DStv alternative — complete 2026 guide", href: "/dstv-alternative/" },
      {
        label: "IPTV EFT, SnapScan & Capitec Pay",
        href: "/iptv-eft-snapscan-payment/",
      },
      {
        label: "Watch SuperSport without DStv",
        href: "/iptv-supersport-without-dstv/",
      },
      { label: "Mzansi Stream POPIA policy", href: "/legal/popia/" },
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

// ─── BUYER-INTENT PILLARS (cheap / 4K / no-buffering / movies) ──────────
// These target high-purchase-intent head terms that aren't covered by the
// brand-led pillars above. Each one funnels straight to the pricing CTA
// block and the WhatsApp activation flow.

PILLARS.push(
  {
    slug: "cheap-iptv-south-africa",
    eyebrow: "Cheap IPTV · 2026 guide",
    h1: "Cheap IPTV in South Africa — R99/month with no buffering",
    metaTitle:
      "Cheap IPTV South Africa 2026 — From R99/mo, 4K, No Contract | Mzansi Stream",
    metaDescription:
      "Cheapest reliable IPTV in South Africa 2026 — R99/month, 20,000+ channels in 4K, NAPAfrica-peered for no buffering. Free 24h trial, no card.",
    lead:
      "Cheap IPTV in South Africa doesn't have to mean unreliable. Mzansi Stream is R99/month for 20,000+ live channels in 4K with NAPAfrica peering, full SuperSport, full Premier League and WhatsApp support — the cheapest realistic price point for a provider that actually stays online during peak hours. Here's how the pricing works, what's included, and where the cheaper-than-R99 'IPTV scam' usually falls apart.",
    trustLine:
      "From R99/mo · 24h free trial · NAPAfrica-peered · No contract · No card to start",
    cta: {
      primary: {
        label: "Start cheap IPTV — free 24h trial →",
        message:
          "Hi! I want the cheap IPTV plan — free 24-hour trial, no card. Can you activate me on Mzansi Stream?",
        ref: "Pillar-CheapIPTV-Hero",
      },
      secondary: { label: "Jump to pricing →", href: "#pricing" },
    },
    sections: [
      {
        id: "what-cheap-means",
        h2: "What 'cheap IPTV' actually means in 2026",
        paragraphs: [
          "R99/month is the realistic floor for a reliable South African IPTV provider in 2026. Below that, the maths stops working — licensed CDN feeds cost real money, NAPAfrica peering costs real money, and WhatsApp support costs real time. Providers under R50/month either skip licensed feeds (channels start disappearing), oversubscribe a single server (you get peak-hour buffering) or churn through customers in 1-3 months before vanishing.",
          "Mzansi Stream's 12-month plan works out to R99.92/mo effective. That's the cheapest price you'll see on a provider that has direct NAPAfrica peering, WhatsApp support 7 days a week, and a 24-hour free trial with no credit card.",
        ],
      },
      {
        id: "what-you-get",
        h2: "What's included at R99 — every plan, no upsell tiers",
        bullets: [
          "20,000+ live channels — SuperSport, kykNET, SABC, Premier League, M-Net, international.",
          "100,000+ movies and series on demand, refreshed weekly.",
          "4K UHD on every plan — no premium tier required.",
          "EPG (electronic programme guide) included.",
          "Works on Firestick, Samsung Tizen, LG webOS, Hisense VIDAA, iPhone, iPad, Android, MAG Box, PC and Mac.",
          "WhatsApp support 7 days a week.",
          "24-hour free trial, no credit card required.",
        ],
      },
      {
        id: "vs-cheaper",
        h2: "Why Mzansi Stream is cheaper than DStv, Compact and even Showmax Pro",
        bullets: [
          "DStv Premium — R899/mo (R10,788/year). Mzansi Stream 12-month plan: R1,199/year. Save ~R9,500.",
          "DStv Compact — R449/mo. Mzansi Stream: R99/mo with more sport, more channels, 4K and no contract.",
          "Showmax Pro — R299/mo for partial Premier League. Mzansi Stream: R99/mo with full Premier League, full SuperSport and 20,000+ extra channels.",
          "StarSat — R199-R399/mo with a decoder upfront. Mzansi Stream: no decoder, no contract, R99/mo.",
        ],
      },
      {
        id: "red-flags",
        h2: "Cheap IPTV red flags — what to avoid",
        bullets: [
          "Crypto-only or gift-card-only payment — no traceable recourse.",
          "No real free trial (or 'trial' demands card details upfront).",
          "Pricing below R50/mo with no explanation of how peering works.",
          "Channel list 'on request' that never arrives.",
          "Email-only support, no WhatsApp.",
          "No registered SA business address or contact.",
        ],
      },
      {
        id: "payment",
        h2: "How to pay — every SA method accepted",
        paragraphs: [
          "Mzansi Stream accepts EFT, SnapScan, Zapper, Yoco, Ozow, Capitec Pay, Visa, Mastercard, PayPal and Bitcoin. Every payment is traceable, every payment hits a registered South African business account, and every payment is covered by our 7-day satisfaction guarantee.",
        ],
      },
    ],
    faq: [
      {
        q: "What is the cheapest IPTV in South Africa?",
        a: "R99/month is the cheapest realistic price for a reliable, NAPAfrica-peered IPTV service. Mzansi Stream's 1-month plan starts at R199 and the 12-month plan effective rate is R99.92/mo.",
      },
      {
        q: "Is cheap IPTV legal in South Africa?",
        a: "Streaming TV is not illegal per se in South Africa — what's illegal is distributing copyrighted content without authorisation. Mzansi Stream sources channels via licensed partners, accepts traceable payment and is POPIA-compliant.",
      },
      {
        q: "Can I get cheap IPTV with SuperSport included?",
        a: "Yes — every Mzansi Stream plan from R99/month includes every SuperSport feed (PSL, Premier League, Variety 1-4, Rugby, Cricket, Motorsport, Tennis, Golf) in 4K UHD.",
      },
      {
        q: "Is there a really free IPTV trial?",
        a: "Mzansi Stream offers a 24-hour free trial on WhatsApp with no credit card required. Full 20,000+ channel access for 24 hours — pay only if it works for you.",
      },
      {
        q: "Why is cheap IPTV often unreliable?",
        a: "Below R50/month the provider can't afford licensed CDN feeds or NAPAfrica peering — so streams buffer at peak hours or the service vanishes inside 3 months. R99 is the price floor for a sustainable SA IPTV operation.",
      },
      {
        q: "Can I cancel any time on Mzansi Stream?",
        a: "Yes — there's no contract and no auto-renewal. You pay for the chosen period, the service runs for that period, and you renew manually if you want to continue.",
      },
    ],
    related: [
      { label: "Best IPTV South Africa 2026 — full guide", href: "/best-iptv-south-africa-2026/" },
      { label: "DStv alternative — save R800+/month", href: "/dstv-alternative/" },
      { label: "Is IPTV legal in South Africa?", href: "/is-iptv-legal-south-africa/" },
      { label: "How to choose an IPTV service", href: "/blog/how-to-choose-iptv-service-south-africa/" },
    ],
    hasHowTo: false,
    datePublished: "2026-02-18",
    dateModified: "2026-05-18",
    preferredLocale: ZA,
  },

  {
    slug: "4k-iptv-south-africa",
    eyebrow: "4K IPTV · 2026 guide",
    h1: "4K IPTV in South Africa — every channel in UHD on every plan",
    metaTitle:
      "4K IPTV South Africa 2026 — UHD on Every Plan from R99 | Mzansi Stream",
    metaDescription:
      "Best 4K IPTV in South Africa 2026 — every SuperSport, Premier League and kykNET channel in native UHD. NAPAfrica-peered, stable 4K on Vumatel and Openserve. From R99/mo.",
    lead:
      "4K IPTV in South Africa used to mean paying DStv Premium prices for a handful of UHD channels. In 2026 it doesn't. Mzansi Stream ships every SuperSport feed, every Premier League match, kykNET and the major international channels in native 4K UHD on every plan from R99/month — provided your fibre line and router can keep up. Here's exactly what's available in 4K, what bandwidth you need, and what to fix if your stream keeps dropping back to 1080p.",
    trustLine:
      "4K on every plan · NAPAfrica-peered · Stable on Vumatel, Openserve and Frogfoot",
    cta: {
      primary: {
        label: "Test 4K IPTV — free 24h trial →",
        message:
          "Hi! I want to test 4K IPTV on Mzansi Stream — free 24-hour trial, no card. Can you activate me?",
        ref: "Pillar-4KIPTV-Hero",
      },
      secondary: { label: "What you need for 4K →", href: "#requirements" },
    },
    sections: [
      {
        id: "whats-in-4k",
        h2: "Which channels are available in 4K UHD",
        bullets: [
          "Every SuperSport feed — PSL, Premier League, Variety 1-4, Rugby, Cricket, Motorsport, Tennis, Golf, F1, UFC.",
          "Premier League — every match in native 4K on the dedicated SuperSport Premier League channel.",
          "Springbok Test matches and URC fixtures — SuperSport Rugby in 4K.",
          "M-Net Movies Premiere and Action+ in 4K HDR.",
          "Major international channels — BBC One UHD, Sky News, Eurosport 4K, DAZN.",
          "100,000+ on-demand movies, with the major Hollywood and Netflix-mirror titles in 4K HDR.",
        ],
      },
      {
        id: "requirements",
        h2: "What you need for stable 4K streaming",
        paragraphs: [
          "Bandwidth: roughly 25-30 Mbps of clean throughput per concurrent 4K stream. Any modern Vumatel, Openserve, Frogfoot, Octotel, MetroFibre, MTN or Vodacom fibre line easily delivers this — provided the router and Wi-Fi don't bottleneck.",
          "Router: a Wi-Fi 6 router (TP-Link Archer AX55 around R1,300, ASUS RT-AX55 around R1,500) or a hardwired Ethernet connection. ISP-issued routers from 2020-2022 frequently cap 5GHz throughput well below 100 Mbps — they're the most common reason 4K IPTV drops to 1080p mid-match.",
          "Device: any Firestick 4K Max, Android TV box, modern Samsung Tizen / LG webOS / Hisense VIDAA Smart TV, or 4K-capable iPad will play the stream cleanly.",
        ],
      },
      {
        id: "fibre-by-isp",
        h2: "4K stability by South African fibre ISP",
        bullets: [
          "Vumatel — direct NAPAfrica peering, 4K stable, <10ms to Mzansi Stream edge.",
          "Openserve (Telkom) — direct peering, 4K stable, <15ms.",
          "Frogfoot — direct peering, 4K stable, <12ms.",
          "Octotel — Cape Town edge, 4K stable.",
          "MetroFibre / MTN Fibre / Vodacom Fibre — all peer directly, 4K stable.",
          "Rain 5G — wireless, slightly higher jitter but 4K plays cleanly on most home setups.",
        ],
      },
      {
        id: "fix-1080p",
        h2: "Why your 4K stream might drop to 1080p — and how to fix it",
        steps: [
          {
            title: "Check the player",
            text: "Open TiviMate or IPTV Smarters → Settings → Player → set 'Quality' to 4K (lock manually if needed). Adaptive bitrate often downgrades streams on marginal Wi-Fi.",
          },
          {
            title: "Hardwire the device",
            text: "Plug a 10m Ethernet cable from the router into the TV or Firestick. The R250 Firestick USB-Ethernet adapter eliminates Wi-Fi jitter entirely.",
          },
          {
            title: "Replace ISP-branded router",
            text: "Most ISP routers cap 5GHz throughput at 60-80 Mbps. A Wi-Fi 6 router (Archer AX55, ASUS RT-AX55) clears 300+ Mbps to a single device.",
          },
          {
            title: "Switch to 5GHz",
            text: "Always connect the TV and IPTV box to the 5GHz Wi-Fi SSID — 2.4GHz is too crowded to hold 4K bitrate.",
          },
          {
            title: "Run a peak-hour test",
            text: "If 4K only drops between 19:00 and 22:00, your ISP may be over-subscribing NAPAfrica capacity. Raise it with the ISP or move to Vumatel / Openserve.",
          },
        ],
      },
      {
        id: "vs-dstv-4k",
        h2: "Mzansi Stream 4K vs DStv 4K",
        bullets: [
          "DStv Premium offers 4K on a limited subset of channels — Mzansi Stream ships 4K on every channel where the broadcaster provides a UHD feed.",
          "DStv 4K requires the Explora Ultra decoder (R3,500+ upfront) — Mzansi Stream 4K runs on a R900 Firestick.",
          "DStv contract: 24 months. Mzansi Stream: no contract.",
          "DStv Premium 4K total cost year one: R10,788 + R3,500 = R14,288. Mzansi Stream 12-month 4K: R1,199.",
        ],
      },
    ],
    faq: [
      {
        q: "Is 4K IPTV available on every Mzansi Stream plan?",
        a: "Yes — 4K UHD is included on every plan from R99/month. There is no premium tier required to unlock 4K.",
      },
      {
        q: "How much bandwidth does 4K IPTV use in South Africa?",
        a: "Approximately 25-30 Mbps per concurrent 4K stream on Mzansi Stream's NAPAfrica-peered CDN. A 100 Mbps Vumatel or Openserve line can hold three 4K streams at once.",
      },
      {
        q: "Will 4K IPTV work on my Samsung or LG Smart TV?",
        a: "Yes — modern Samsung Tizen, LG webOS and Hisense VIDAA Smart TVs support 4K IPTV via Smarters Lite or IPTV Smarters Pro. For best results, hardwire the TV via Ethernet.",
      },
      {
        q: "Why does my 4K IPTV keep dropping to 1080p?",
        a: "Almost always a router or Wi-Fi bottleneck — not the stream. Lock the player to 4K manually, hardwire the device via Ethernet, or replace an ISP-issued router with a Wi-Fi 6 model.",
      },
      {
        q: "Is Mzansi Stream 4K stable during PSL kick-off?",
        a: "Yes — our CDN edges peer directly at NAPAfrica in Johannesburg and Cape Town, so peak-hour latency stays under 15ms for every major SA fibre ISP. 4K SuperSport PSL plays cleanly.",
      },
      {
        q: "Can I watch Premier League in 4K on Mzansi Stream?",
        a: "Yes — every Premier League match is carried in native 4K on the dedicated SuperSport Premier League channel, included on every plan from R99/month.",
      },
    ],
    related: [
      { label: "Best IPTV South Africa 2026", href: "/best-iptv-south-africa-2026/" },
      { label: "Best IPTV for Vumatel, Openserve, Frogfoot", href: "/iptv-vumatel-openserve-frogfoot/" },
      { label: "Firestick IPTV setup — South Africa", href: "/iptv-firestick-south-africa/" },
      { label: "Why your IPTV keeps buffering", href: "/blog/iptv-buffering-how-to-fix/" },
    ],
    hasHowTo: true,
    datePublished: "2026-02-20",
    dateModified: "2026-05-18",
    preferredLocale: ZA,
  },

  {
    slug: "iptv-no-buffering",
    eyebrow: "Stable IPTV · 2026 guide",
    h1: "IPTV with no buffering in South Africa — how Mzansi Stream stays stable",
    metaTitle:
      "IPTV No Buffering South Africa 2026 — NAPAfrica-Peered 4K | Mzansi Stream",
    metaDescription:
      "Stable IPTV in South Africa 2026 — no buffering, NAPAfrica-peered 4K with under 15ms to every major fibre ISP. From R99/mo. Free 24h trial.",
    lead:
      "If you've cycled through three IPTV providers because every one of them buffers at peak hours, the problem usually isn't your fibre line — it's where the IPTV provider's CDN lives. Mzansi Stream's CDN edges sit directly at NAPAfrica in Johannesburg and Cape Town, the exchange every major South African ISP peers at. That's why our 4K SuperSport, Premier League and kykNET streams stay stable when overseas IPTV providers stutter. Here's exactly how it works, and the five-step diagnostic that fixes most buffering issues outside the CDN.",
    trustLine:
      "NAPAfrica-peered · <15ms to every major SA ISP · 4K stable on Vumatel, Openserve, Frogfoot",
    cta: {
      primary: {
        label: "Test stable IPTV — free 24h trial →",
        message:
          "Hi! I want to test Mzansi Stream IPTV for stability — free 24-hour trial, no card.",
        ref: "Pillar-NoBuffering-Hero",
      },
      secondary: { label: "Run the diagnostic →", href: "#diagnostic" },
    },
    sections: [
      {
        id: "why-iptv-buffers",
        h2: "Why most IPTV in South Africa buffers",
        paragraphs: [
          "Most IPTV providers sold to South Africans are based in Europe or the US. Their CDN edges sit in Amsterdam, Frankfurt or Dallas. The stream has to travel 180-220ms one-way to reach South Africa — and on a marginal connection, that's enough latency to make a fast PSL counter-attack visibly stutter.",
          "It gets worse at peak hours. SA ISPs over-subscribe their international transit capacity to manage cost, so between 19:00 and 22:00 — exactly when sport kicks off — international latency spikes further. That's why so many IPTV services 'work great in the morning' but buffer every evening.",
        ],
      },
      {
        id: "napafrica",
        h2: "How NAPAfrica peering fixes it",
        paragraphs: [
          "NAPAfrica is the largest internet exchange in Africa, sitting in two physical locations: Teraco Johannesburg and Teraco Cape Town. Every major SA ISP — Vumatel, Openserve, Frogfoot, Octotel, MTN, Vodacom, MetroFibre — peers there directly.",
          "Mzansi Stream's CDN has dedicated edges at both NAPAfrica locations. That means a Vumatel customer's 4K stream travels under 10ms from edge to TV, an Openserve customer's under 15ms, and a Cape Town Frogfoot or Octotel customer's under 12ms. Peak hour or 3am, the latency doesn't change — because we never leave South Africa.",
        ],
      },
      {
        id: "diagnostic",
        h2: "Five-step buffering diagnostic — fix it in 10 minutes",
        steps: [
          {
            title: "Check your speed at peak",
            text: "Run Ookla speed test at 20:00 vs 02:00. If peak speed drops more than 30%, your ISP is the bottleneck, not the IPTV provider.",
          },
          {
            title: "Hardwire the device",
            text: "Plug an Ethernet cable from router to TV/Firestick. Most 'buffering' is Wi-Fi jitter — the cable eliminates it.",
          },
          {
            title: "Switch to 5GHz only",
            text: "2.4GHz Wi-Fi cannot hold 4K reliably in 2026. Always pair the TV / IPTV box with the 5GHz SSID.",
          },
          {
            title: "Replace ISP router",
            text: "ISP-branded routers cap 5GHz at 60-80 Mbps. Replace with TP-Link Archer AX55 (R1,300) or ASUS RT-AX55 (R1,500).",
          },
          {
            title: "Lock the player to a fixed resolution",
            text: "In TiviMate or IPTV Smarters: set quality manually to 1080p or 4K. Adaptive bitrate keeps downgrading on marginal Wi-Fi.",
          },
        ],
      },
      {
        id: "guarantee",
        h2: "Our peak-hour stability guarantee",
        paragraphs: [
          "We back the NAPAfrica peering with a 24-hour free trial and a 7-day satisfaction guarantee. Test the service on a Saturday night at PSL kick-off — exactly when other IPTV providers fall over. If it doesn't hold up cleanly for you, we refund inside the first 7 days, no questions.",
        ],
      },
    ],
    faq: [
      {
        q: "Why does my IPTV buffer even on fast fibre?",
        a: "Speed isn't the only metric — peering and jitter matter more once you're past 50 Mbps. If your provider's CDN routes via Europe instead of NAPAfrica in Johannesburg or Cape Town, 4K IPTV will buffer regardless of your line speed.",
      },
      {
        q: "Does Mzansi Stream buffer at peak hours?",
        a: "Our CDN edges peer directly at NAPAfrica with edges in Johannesburg and Cape Town. Peak-hour latency stays under 15ms to every major SA fibre ISP — so 4K SuperSport PSL plays cleanly at 20:00 just like at 02:00.",
      },
      {
        q: "Is Mzansi Stream stable on Vumatel and Openserve?",
        a: "Yes — both Vumatel and Openserve peer directly at NAPAfrica. Mzansi Stream's edge sits at the same exchange, so the stream travels under 15ms end-to-end. 4K stays stable.",
      },
      {
        q: "Will a VPN reduce IPTV buffering?",
        a: "Usually not. A VPN adds latency rather than removing it. The exception is if your ISP is throttling specific IPTV ports — in which case a VPN bypasses that. Fix the router and check peering first.",
      },
      {
        q: "What internet speed do I need for stable 4K IPTV?",
        a: "Approximately 25-30 Mbps of clean throughput per 4K stream. A 50 Mbps Vumatel or Openserve line holds one 4K stream comfortably; 100 Mbps holds three concurrent 4K streams.",
      },
      {
        q: "Can I get a free trial to test stability?",
        a: "Yes — Mzansi Stream offers a 24-hour free trial on WhatsApp with no credit card. Test it during a Saturday night PSL kick-off — that's the hardest stability test and the one most providers fail.",
      },
    ],
    related: [
      { label: "Best IPTV for Vumatel, Openserve, Frogfoot", href: "/iptv-vumatel-openserve-frogfoot/" },
      { label: "4K IPTV South Africa", href: "/4k-iptv-south-africa/" },
      { label: "Why your IPTV keeps buffering — full guide", href: "/blog/iptv-buffering-how-to-fix/" },
      { label: "Best IPTV South Africa 2026", href: "/best-iptv-south-africa-2026/" },
    ],
    hasHowTo: true,
    datePublished: "2026-02-22",
    dateModified: "2026-05-18",
    preferredLocale: ZA,
  },

  {
    slug: "iptv-for-movies-series",
    eyebrow: "Movies & series · 2026 guide",
    h1: "IPTV for movies and series in South Africa — 100,000+ on demand in 4K",
    metaTitle:
      "IPTV Movies & Series South Africa 2026 — 100,000+ on Demand in 4K | Mzansi Stream",
    metaDescription:
      "Best IPTV for movies and series in South Africa 2026 — 100,000+ titles in 4K HDR, Netflix mirror, M-Net Movies, HBO Max, Disney+. From R99/mo.",
    lead:
      "If you're choosing IPTV mainly for movies and series — not sport — the metric that matters is catalogue size and how often it's refreshed. Mzansi Stream ships 100,000+ on-demand titles in 4K HDR alongside the live TV bundle, refreshed weekly, with the major streamer catalogues mirrored: Netflix, HBO Max, Disney+, Showtime, Paramount+, plus M-Net Movies and AMC live. Here's what's actually in the catalogue, how the VOD library is updated, and how the bundle compares to running Netflix + Showmax + Disney+ separately.",
    trustLine:
      "100,000+ VOD · 4K HDR · Catalogue refreshed weekly · No ads on premium tier",
    cta: {
      primary: {
        label: "Start free 24h movies trial →",
        message:
          "Hi! I want to test Mzansi Stream for movies and series — free 24-hour trial, no card.",
        ref: "Pillar-MoviesIPTV-Hero",
      },
      secondary: { label: "Browse what's included →", href: "#catalogue" },
    },
    sections: [
      {
        id: "catalogue",
        h2: "What's in the 100,000+ VOD catalogue",
        bullets: [
          "Hollywood box office releases (typically 30-60 days after theatrical).",
          "Netflix originals mirrored in 4K HDR — including SA-region exclusives.",
          "HBO Max library — Succession, House of the Dragon, The Last of Us, every Warner title.",
          "Disney+ library — Marvel, Star Wars, Pixar, National Geographic.",
          "Showtime — Yellowjackets, Billions, Dexter.",
          "Paramount+ — Star Trek, Yellowstone universe (1883, 1923), Sonic, Top Gun.",
          "Showmax originals — every SA drama and reality series.",
          "M-Net Movies Premiere, Action+, Smile, Stars — live + on-demand.",
          "AMC — Breaking Bad, Better Call Saul, The Walking Dead universe.",
          "Anime — Crunchyroll catalogue mirror.",
          "African cinema — Nollywood, Mzansi Magic originals, Africa Magic Showcase.",
        ],
      },
      {
        id: "refresh",
        h2: "How often the catalogue refreshes",
        paragraphs: [
          "New titles are added weekly. Hollywood box office releases typically land 30-60 days after theatrical release. New Netflix originals and HBO Max releases land within a few days of their global launch. Discontinued or geo-restricted titles are rotated out — the catalogue holds steady around 100,000+ titles at any given time.",
        ],
      },
      {
        id: "vs-streamers",
        h2: "Mzansi Stream movies bundle vs Netflix + Showmax + Disney+ separately",
        bullets: [
          "Netflix Standard (with ads): R99/mo",
          "Showmax Entertainment: R99/mo",
          "Disney+ Standard: R119/mo",
          "Apple TV+: R85/mo",
          "Total: R402/mo across four apps, with different remotes, different searches, different watchlists.",
          "Mzansi Stream: R99/mo for all four catalogues plus 20,000 live channels plus full SuperSport.",
        ],
      },
      {
        id: "4k-hdr",
        h2: "4K HDR — what's actually in UHD",
        paragraphs: [
          "Roughly 18,000 of the 100,000+ titles ship in native 4K HDR. That includes all major Hollywood box office releases since 2018, every Netflix original tagged 4K, every Disney+ Premier Access title, the full HBO Max 4K library and most Showtime / Paramount+ tentpole series.",
          "Older titles ship in 1080p or upscaled HD. The IPTV player (TiviMate, Smarters Pro) auto-detects the source resolution.",
        ],
      },
      {
        id: "devices",
        h2: "Where to watch — every screen in the house",
        bullets: [
          "Smart TV: Samsung Tizen, LG webOS, Hisense VIDAA, Sony Bravia (via Smarters Lite or Smarters Pro).",
          "Streaming stick: Firestick 4K Max (best app: TiviMate). Roku, Apple TV (Smarters Pro).",
          "Mobile: iPhone, iPad, Android phone, Android tablet (Smarters Pro, GSE Smart IPTV).",
          "Desktop: PC + Mac browser via Smarters Web.",
          "Android TV box: MX Q Pro, Skystream, Nvidia Shield (TiviMate).",
        ],
      },
    ],
    faq: [
      {
        q: "How many movies are on Mzansi Stream?",
        a: "Approximately 100,000+ on-demand titles, refreshed weekly. Roughly 18,000 are in native 4K HDR.",
      },
      {
        q: "Does Mzansi Stream include Netflix originals?",
        a: "Yes — the Netflix catalogue is mirrored in 4K HDR including SA-region titles. The VOD library updates within days of Netflix's global launch for new originals.",
      },
      {
        q: "Can I watch HBO Max series on Mzansi Stream?",
        a: "Yes — Succession, House of the Dragon, The Last of Us, Euphoria and the full Warner / HBO Max library are in the VOD catalogue.",
      },
      {
        q: "Is the VOD library updated regularly?",
        a: "Yes — new titles land weekly. Box office releases typically arrive 30-60 days after theatrical; new streaming originals within a few days of global launch.",
      },
      {
        q: "Are there ads on Mzansi Stream movies?",
        a: "No — every Mzansi Stream plan from R99/month is ad-free across both live channels and the on-demand VOD library.",
      },
      {
        q: "Can I watch on multiple TVs at once?",
        a: "The standard plan includes one concurrent connection. For households that need 2-3 concurrent streams, message us on WhatsApp and we'll set up a tailored multi-screen plan.",
      },
    ],
    related: [
      { label: "Best IPTV South Africa 2026", href: "/best-iptv-south-africa-2026/" },
      { label: "Mzansi Stream vs Netflix", href: "/vs/netflix/" },
      { label: "Mzansi Stream vs Showmax", href: "/vs/showmax/" },
      { label: "DStv alternative — full guide", href: "/dstv-alternative/" },
    ],
    hasHowTo: false,
    datePublished: "2026-02-24",
    dateModified: "2026-05-18",
    preferredLocale: ZA,
  },
);

export const PILLAR_SLUGS = PILLARS.map((p) => p.slug);

export function getPillar(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}
