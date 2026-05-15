// lib/seo/blog-posts.ts
// Data for the 10 pillar blog posts. The body text is intentionally
// shorter than the SEO playbook's 1500-word target — these ship as
// editorial scaffolding for the owner / copy team to expand. Each post
// already has its own canonical URL, JSON-LD Article schema, hreflang
// alternates and an internal link to a relevant programmatic page.

export type BlogPost = {
  slug: string;
  title: string;
  metaDescription: string;
  /** Date the article is dated (publish ISO date for JSON-LD). */
  datePublished: string;
  /** Single-paragraph lead used as og:description and on the index page. */
  lead: string;
  /** Section headings + paragraphs. Owner-editable. */
  sections: { h2: string; body: string[] }[];
  /** Internal link slugs the post should point at. Used to render the
   *  "Related" footer block on each post automatically. */
  relatedLinks: { label: string; href: string }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-watch-psl-online-2026",
    title: "How to watch PSL online in 2026 — every match, no DStv",
    metaDescription: "Stream every DStv Premiership match in 4K without a DStv subscription — SuperSport PSL feeds via Mzansi Stream, from R99/mo.",
    datePublished: "2026-01-20",
    lead: "The DStv Premiership runs from August through May with 240+ fixtures across the season. Here's how to watch every match online in 2026 without a DStv decoder, a 24-month contract, or paying R899/month for Premium.",
    sections: [
      {
        h2: "Why so many fans are dropping DStv",
        body: [
          "DStv Premium is currently R899/month — R10,788 a year. With load-shedding, decoder failures and inflation, more PSL fans are looking for streaming that works on the devices they already own.",
          "Mzansi Stream carries every SuperSport feed — PSL, Variety 1-4, Rugby, Cricket — in 4K. No decoder, no installer, no 24-month contract.",
        ],
      },
      {
        h2: "Every PSL feed you need",
        body: [
          "SuperSport PSL is the headline channel for every Premiership match. Variety 1-4 catches every cup, mid-week game and Nedbank Cup fixture. All of them stream in 4K on Mzansi Stream.",
          "Add SuperSport Rugby and Cricket and you've got the full SA sport calendar in one subscription.",
        ],
      },
      {
        h2: "Devices you can watch on",
        body: [
          "Firestick, Android TV, Apple TV, Smart TVs (Samsung, LG, Sony, Hisense), iPhone, iPad, Android phones, MAG Box, PC and Mac. Use TiviMate, IPTV Smarters Pro, GSE Smart IPTV or any standard M3U app.",
        ],
      },
      {
        h2: "How to set it up in 10 minutes",
        body: [
          "Message us on WhatsApp, pick a plan (1 / 3 / 6 / 12 months), pay via EFT, SnapScan, Ozow or card, and we send the M3U link plus a one-page setup guide for your specific device. Usually live within 10 minutes.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Compare DStv Premium vs Mzansi Stream", href: "/en-za/vs/dstv-premium/" },
      { label: "DStv alternative — full guide", href: "/en-za/dstv-alternative/" },
    ],
  },
  {
    slug: "dstv-vs-iptv-2026-complete-guide",
    title: "DStv vs IPTV in 2026 — the complete guide",
    metaDescription: "Side-by-side comparison of DStv and IPTV in 2026 — pricing, channels, sport, 4K and what to look for in a reliable IPTV provider.",
    datePublished: "2026-01-22",
    lead: "If you're weighing DStv against IPTV in 2026, here's the honest comparison — pricing, channel mix, sport coverage, devices, and what to check before you sign up.",
    sections: [
      {
        h2: "The 2026 pricing reality",
        body: [
          "DStv Premium is R899/month, Compact Plus R549, Compact R449, Family R329. All require a 24-month contract and a decoder (R1,500+ upfront).",
          "Reliable IPTV in SA sits between R99 and R200/month, with no contract and no decoder.",
        ],
      },
      {
        h2: "Sport coverage compared",
        body: [
          "DStv Premium carries every SuperSport feed plus Premier League. Compact Plus partially covers Premier League and URC. Compact skips the Premier League entirely.",
          "Mzansi Stream carries every SuperSport feed plus Premier League on every plan, in 4K.",
        ],
      },
      {
        h2: "What makes IPTV reliable",
        body: [
          "Server uptime, EPG quality, support response time, and 4K bandwidth are the four metrics that matter. Don't pay for an IPTV provider that ghosts you on WhatsApp.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Mzansi Stream vs DStv Premium", href: "/en-za/vs/dstv-premium/" },
      { label: "How to cancel DStv", href: "/en-za/blog/cancel-dstv-step-by-step-2026/" },
    ],
  },
  {
    slug: "firestick-iptv-setup-south-africa",
    title: "Firestick IPTV setup in South Africa — 2026 guide",
    metaDescription: "Step-by-step Firestick IPTV setup for South Africa in 2026 — TiviMate, IPTV Smarters Pro, M3U links, EPG and 4K playback.",
    datePublished: "2026-01-24",
    lead: "The Amazon Firestick is the cheapest 4K IPTV box in South Africa today. Here's how to set up Mzansi Stream on a Firestick in 10 minutes, using TiviMate or IPTV Smarters Pro.",
    sections: [
      {
        h2: "What you need",
        body: [
          "A Firestick 4K Max (R900-R1,400 at Takealot or Game), home WiFi, and an active Mzansi Stream M3U link.",
        ],
      },
      {
        h2: "Installing TiviMate",
        body: [
          "Enable Apps from Unknown Sources, install the Downloader app from the Amazon Appstore, paste the TiviMate APK URL, and add your M3U playlist URL when prompted.",
          "TiviMate Premium (one-time payment, ~R150) unlocks the proper EPG layout, recording and multi-playlist support.",
        ],
      },
      {
        h2: "Switching between TiviMate and Smarters Pro",
        body: [
          "TiviMate is the better player overall — faster channel switching, cleaner EPG, multi-playlist. IPTV Smarters Pro is free but more cluttered.",
          "Both accept the same M3U link we send you on WhatsApp.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Mzansi Stream plans from R99/mo", href: "/en-za/" },
      { label: "DStv alternative — full guide", href: "/en-za/dstv-alternative/" },
    ],
  },
  {
    slug: "watch-springboks-live-online",
    title: "Watch the Springboks live online — every Test in 2026",
    metaDescription: "Stream every Springbok Test and URC fixture in 4K — SuperSport Rugby feeds via Mzansi Stream, from R99/mo. No DStv required.",
    datePublished: "2026-01-26",
    lead: "Every Springbok Test, Rugby Championship fixture, URC, Currie Cup and Six Nations match is on SuperSport. Here's how to stream them all in 4K without DStv.",
    sections: [
      {
        h2: "Which channels carry the Boks",
        body: [
          "SuperSport Rugby is the headline channel — every Springbok Test, the Rugby Championship, the British & Irish Lions tours.",
          "SuperSport Variety 1-4 picks up overflow matches and the URC. SuperSport Grandstand carries the Currie Cup.",
        ],
      },
      {
        h2: "Streaming setup",
        body: [
          "Order any Mzansi Stream plan, drop the M3U link into TiviMate or IPTV Smarters, and SuperSport Rugby lands in your channel list within 10 minutes.",
        ],
      },
    ],
    relatedLinks: [
      { label: "DStv alternative — full guide", href: "/en-za/dstv-alternative/" },
      { label: "How to watch PSL online", href: "/en-za/blog/how-to-watch-psl-online-2026/" },
    ],
  },
  {
    slug: "is-iptv-legal-in-south-africa-2026",
    title: "Is IPTV legal in South Africa in 2026?",
    metaDescription: "Honest answer on IPTV legality in South Africa in 2026 — what's lawful, what's grey, and how Mzansi Stream sources its content.",
    datePublished: "2026-01-28",
    lead: "IPTV legality in South Africa is a fair question. Here's an honest answer — what the law says, what it doesn't say, and how Mzansi Stream handles content sourcing, POPIA and payment traceability.",
    sections: [
      {
        h2: "What the law actually says",
        body: [
          "Streaming TV in South Africa is not illegal per se. What is illegal is distributing copyrighted content without authorisation. The Films and Publications Act and the Copyright Act govern what providers can and can't carry.",
          "A reputable IPTV provider sources its channels via licensed CDNs, transparent middleware partners, and pays for the rights they redistribute.",
        ],
      },
      {
        h2: "Mzansi Stream's position",
        body: [
          "We source through licensed partners, accept traceable payment (EFT, SnapScan, card), are registered for VAT in South Africa, and process all customer data under POPIA.",
          "We do not promote bypassing geo-blocks for content where rights are clearly held elsewhere. If you're outside SA, a VPN is your decision — we don't ship one.",
        ],
      },
    ],
    relatedLinks: [
      { label: "POPIA privacy policy", href: "/en-za/legal/popia/" },
      { label: "About Mzansi Stream", href: "/en-za/legal/about/" },
    ],
  },
  {
    slug: "best-iptv-for-vumatel-openserve",
    title: "Best IPTV for Vumatel, Openserve and Frogfoot in 2026",
    metaDescription: "Which IPTV providers work best on Vumatel, Openserve and Frogfoot fibre in South Africa in 2026 — 4K stability, latency, peak-hour performance.",
    datePublished: "2026-01-30",
    lead: "Vumatel, Openserve and Frogfoot are the three biggest SA fibre networks. Here's how to pick an IPTV provider that streams 4K without buffering on each of them.",
    sections: [
      {
        h2: "What matters on SA fibre",
        body: [
          "Peering. An IPTV provider with poor SA peering will buffer at peak hours (18:00-22:00) regardless of how fast your line is. Look for providers with local CDN edges in Johannesburg, Cape Town and Durban.",
        ],
      },
      {
        h2: "How Mzansi Stream peers",
        body: [
          "We use local CDN edges in JNB and CPT, peered at NAPAfrica. That puts our 4K bitrate within ~5ms of every major SA fibre ISP.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Pricing — from R99/mo", href: "/en-za/" },
      { label: "DStv alternative — full guide", href: "/en-za/dstv-alternative/" },
    ],
  },
  {
    slug: "cancel-dstv-step-by-step-2026",
    title: "How to cancel DStv — step-by-step 2026 guide",
    metaDescription: "How to cancel DStv in 2026 — WhatsApp, MyDStv, USSD and call centre options. Avoid the 30-day notice trap.",
    datePublished: "2026-02-01",
    lead: "Cancelling DStv is intentionally awkward. Here's the fastest 2026 method — WhatsApp, MyDStv app or call centre — plus how to avoid the 30-day notice trap.",
    sections: [
      {
        h2: "Three ways to cancel",
        body: [
          "WhatsApp 060 060 3788 — fastest, get written confirmation. MyDStv app — Manage subscription → Cancel. Call centre 083 900 8000 — longest queues.",
        ],
      },
      {
        h2: "Avoiding the 30-day notice trap",
        body: [
          "DStv requires 30 days' notice on a paid month. Cancel on day 1 of your billing cycle, not day 25, or you'll pay an extra full month.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Switch to Mzansi Stream from R99/mo", href: "/en-za/" },
      { label: "DStv vs Mzansi Stream comparison", href: "/en-za/vs/dstv-premium/" },
    ],
  },
  {
    slug: "iptv-zimbabwe-complete-guide",
    title: "IPTV Zimbabwe in 2026 — complete guide",
    metaDescription: "Complete IPTV guide for Zimbabwe in 2026 — pricing in USD, EcoCash payment, DStv alternative, SuperSport in 4K.",
    datePublished: "2026-02-03",
    lead: "Streaming TV in Zimbabwe in 2026 — pricing in USD, paying with EcoCash and OneMoney, getting around load shedding, and watching SuperSport without DStv Africa's US$96/month bill.",
    sections: [
      {
        h2: "Why DStv Africa is expensive in ZW",
        body: [
          "DStv Premium Africa runs around US$96/month in Zimbabwe. That's R1,800+ at the bond rate, locked behind a 24-month contract.",
          "Mzansi Stream is US$11/month with no contract, paid in USD or EcoCash.",
        ],
      },
      {
        h2: "Load shedding and IPTV",
        body: [
          "Streaming over 4G/5G (Econet, NetOne) keeps you watching when ZESA cuts power and your home fibre router goes off. Mzansi Stream auto-resumes on reconnect.",
        ],
      },
    ],
    relatedLinks: [
      { label: "IPTV Zimbabwe — order now", href: "/en-za/sadc/zimbabwe/" },
      { label: "DStv alternative — full guide", href: "/en-za/dstv-alternative/" },
    ],
  },
  {
    slug: "iptv-mozambique-pt-guide",
    title: "IPTV Moçambique 2026 — guia completo em português",
    metaDescription: "Guia IPTV Moçambique 2026 — preços em MT e USD, pagamento M-Pesa e mKesh, alternativa DStv com SuperSport em 4K.",
    datePublished: "2026-02-05",
    lead: "IPTV em Moçambique em 2026 — preços em meticais e USD, pagamento via M-Pesa e mKesh, e como assistir SuperSport sem assinar a DStv África.",
    sections: [
      {
        h2: "Pagamento em Moçambique",
        body: [
          "M-Pesa Moçambique e mKesh são os métodos mais usados. Aceitamos também USD em numerário, Visa, Mastercard e PayPal.",
        ],
      },
      {
        h2: "Canais portugueses incluídos",
        body: [
          "TVM, RTP África, SIC, TVI, STV e os canais desportivos SuperSport — tudo num só pacote, em 4K.",
        ],
      },
    ],
    relatedLinks: [
      { label: "IPTV Moçambique — encomendar", href: "/pt-mz/sadc/mozambique/" },
      { label: "Alternativa DStv", href: "/en-za/dstv-alternative/" },
    ],
  },
  {
    slug: "dstv-premium-vs-mzansi-stream",
    title: "DStv Premium vs Mzansi Stream — honest 2026 review",
    metaDescription: "Honest 2026 comparison of DStv Premium and Mzansi Stream — same channels, fraction of the price, no decoder, no contract.",
    datePublished: "2026-02-07",
    lead: "An honest side-by-side of DStv Premium and Mzansi Stream in 2026 — pricing, channel coverage, sport, 4K availability, support quality, and whether the savings actually hold up over a year.",
    sections: [
      {
        h2: "The annual cost",
        body: [
          "DStv Premium: R899 × 12 = R10,788/year, plus a R1,500+ decoder upfront.",
          "Mzansi Stream 12-month plan: R1,199/year. Savings over year one: roughly R10,000.",
        ],
      },
      {
        h2: "Where DStv still wins",
        body: [
          "Brand familiarity, a stable phone-based support call centre, and PVR via the Explora decoder.",
          "If you can't use WhatsApp or a Smart TV, DStv may still suit you.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Mzansi Stream vs DStv Premium — full comparison", href: "/en-za/vs/dstv-premium/" },
      { label: "Pricing — from R99/mo", href: "/en-za/" },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export const BLOG_SLUGS = BLOG_POSTS.map((p) => p.slug);
