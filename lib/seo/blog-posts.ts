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
  /** Optional FAQ block rendered at the bottom of the post and emitted
   *  as FAQPage JSON-LD. Reddit/forum-style pain-point posts ship with
   *  one — leave empty for narrative pieces. */
  faq?: { q: string; a: string }[];
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

  // ───────────────────────────────────────────────────────────────────────
  // Reddit / forum pain-point posts — capture buyer-intent troubleshooting
  // queries that bring high-intent users to the site without targeting
  // the brand. Each carries FAQ schema for SERP rich results.
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: "iptv-buffering-how-to-fix",
    title: "IPTV buffering in South Africa — how to fix it in 2026",
    metaDescription: "Why IPTV buffers in South Africa and how to fix it — router settings, ISP peering, Wi-Fi vs Ethernet, 4K bitrate and provider stability checks.",
    datePublished: "2026-02-10",
    lead: "If your IPTV stream is buffering, freezing or dropping to 720p mid-match, the cause is almost always one of five things — and four of them are fixable in 10 minutes without changing provider. Here's the 2026 checklist that solves it for most South African households.",
    sections: [
      {
        h2: "1. Your router is the bottleneck (most common)",
        body: [
          "ISP-branded routers (Huawei B315s, ZTE H168N, older Vodacom and MTN units) cap 5GHz throughput at 60-80 Mbps — even on a 500 Mbps Vumatel or Openserve line. 4K IPTV needs 25-30 Mbps of clean bandwidth with low jitter. If your router can't deliver that to your TV, the stream buffers.",
          "Fix: hard-wire the TV/Firestick via Ethernet, or replace the router with a Wi-Fi 6 unit (TP-Link Archer AX55 around R1,300, ASUS RT-AX55 around R1,500). A R250 USB-to-Ethernet adapter for your Firestick eliminates Wi-Fi jitter entirely.",
        ],
      },
      {
        h2: "2. Your IPTV provider's CDN doesn't peer in SA",
        body: [
          "Most overseas IPTV providers route streams via Amsterdam or London. That's 180-220ms one-way latency to South Africa — enough to make a fast counter-attack stutter even on a perfect fibre line.",
          "Fix: pick an IPTV provider with CDN edges peered at NAPAfrica in Johannesburg and Cape Town. Mzansi Stream peers directly at NAPAfrica, so the stream travels under 15ms from edge to TV.",
        ],
      },
      {
        h2: "3. You're on 2.4GHz, not 5GHz",
        body: [
          "2.4GHz Wi-Fi is crowded with microwaves, baby monitors and neighbours. It can't carry 4K reliably. Always connect your TV and IPTV box to the 5GHz SSID — even if it has slightly shorter range.",
        ],
      },
      {
        h2: "4. Your IPTV app is set to auto-quality and keeps downgrading",
        body: [
          "TiviMate and IPTV Smarters Pro both default to adaptive bitrate. On a marginal line they'll drop the stream from 4K to 1080p mid-match. Lock the player to 1080p manually if your line can't hold 4K, and you'll trade resolution for stability — much smoother watching.",
        ],
      },
      {
        h2: "5. Peak-hour congestion at your ISP",
        body: [
          "Some smaller fibre ISPs over-subscribe their NAPAfrica capacity between 19:00 and 22:00. If buffering only happens during PSL kick-offs, this is the cause.",
          "Fix: run an Ookla speed test at 20:00 vs 02:00 — if peak speeds drop more than 30%, raise it with your ISP or move to Vumatel / Openserve, both of which hold capacity well.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Best IPTV for Vumatel, Openserve and Frogfoot", href: "/en-za/iptv-vumatel-openserve-frogfoot/" },
      { label: "Firestick IPTV setup — South Africa", href: "/en-za/iptv-firestick-south-africa/" },
      { label: "Pricing — from R99/mo with NAPAfrica peering", href: "/en-za/" },
    ],
    faq: [
      {
        q: "Why does my IPTV keep buffering even on fast fibre?",
        a: "Speed isn't the only metric — peering and jitter matter more once you're past 50 Mbps. If your provider's CDN routes via Europe instead of NAPAfrica in Johannesburg or Cape Town, 4K IPTV will buffer regardless of your line speed.",
      },
      {
        q: "Will a VPN fix IPTV buffering?",
        a: "Usually not. A VPN adds latency rather than removing it. The exception is if your ISP is throttling specific IPTV ports — a VPN bypasses that. Otherwise, fix the router and peering first.",
      },
      {
        q: "Is buffering worse on Firestick than Smart TV?",
        a: "Only if the Firestick is on Wi-Fi. A Firestick on Ethernet (via the R250 USB adapter) is the single most reliable 4K IPTV box available in South Africa.",
      },
      {
        q: "How much bandwidth does 4K IPTV use?",
        a: "Roughly 25-30 Mbps per stream on Mzansi Stream's CDN. A 100 Mbps Vumatel line can hold three 4K streams concurrently if the router is up to spec.",
      },
      {
        q: "Does Mzansi Stream buffer on SA fibre?",
        a: "Mzansi Stream's CDN edges are peered at NAPAfrica in Johannesburg and Cape Town, so 4K streams travel under 15ms to every major SA fibre ISP. Buffering on our service almost always traces back to a router or Wi-Fi issue — we'll walk you through the diagnostic on WhatsApp.",
      },
    ],
  },

  {
    slug: "tivimate-vs-iptv-smarters-which-app",
    title: "TiviMate vs IPTV Smarters Pro — which IPTV app is best in 2026?",
    metaDescription: "Side-by-side IPTV app comparison for South Africa in 2026 — TiviMate vs IPTV Smarters Pro on Firestick, Android TV, Smart TV and iPhone.",
    datePublished: "2026-02-12",
    lead: "TiviMate and IPTV Smarters Pro are the two IPTV players almost everyone in South Africa ends up choosing between. Here's the 2026 head-to-head — what each does well, where the other wins, and what to install on your specific device.",
    sections: [
      {
        h2: "The short answer",
        body: [
          "If you have an Android TV box, Firestick or Android TV-based Sony / Hisense / Skyworth Smart TV — install TiviMate. It's the better player.",
          "If you have an iPhone, iPad, Samsung Tizen or LG webOS Smart TV — install IPTV Smarters Pro (TiviMate isn't available on those platforms).",
        ],
      },
      {
        h2: "Where TiviMate wins",
        body: [
          "Channel switching is roughly 2-3x faster than Smarters Pro on the same hardware. For sport, this matters — half-time channel hops are instant instead of laggy.",
          "The EPG layout is the cleanest in the category. Multi-day forward view, recording timeline, accurate now/next markers.",
          "Multi-playlist support — one app holds several M3U sources if you ever add a second provider.",
          "Premium unlock is a once-off ~R150 in-app purchase. No subscription.",
        ],
      },
      {
        h2: "Where IPTV Smarters Pro wins",
        body: [
          "Available on every platform — Firestick, Android, iPhone, iPad, Samsung Tizen, LG webOS, web browser. TiviMate is Android-only.",
          "Free to use with full feature set — no premium tier.",
          "Built-in VPN integration (one tap) on Android.",
        ],
      },
      {
        h2: "Installing TiviMate on Firestick",
        body: [
          "Settings → My Fire TV → Developer Options → Apps from Unknown Sources → On.",
          "Install the Downloader app from the Amazon Appstore.",
          "Open Downloader, paste the TiviMate APK URL, install.",
          "Open TiviMate → Add Playlist → paste the M3U URL we send on WhatsApp. Done.",
        ],
      },
      {
        h2: "Installing IPTV Smarters Pro",
        body: [
          "iPhone / iPad: install from the App Store.",
          "Samsung Tizen: search 'Smarters Lite' in the Samsung app store.",
          "LG webOS: search 'IPTV Smarters' in the LG Content Store.",
          "Open the app → Add new user → paste the Xtream Codes username, password and server URL we send on WhatsApp.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Firestick IPTV setup — South Africa", href: "/en-za/iptv-firestick-south-africa/" },
      { label: "Samsung Smart TV IPTV — Tizen guide", href: "/en-za/iptv-samsung-smart-tv/" },
      { label: "Pricing — from R99/mo", href: "/en-za/" },
    ],
    faq: [
      {
        q: "Is TiviMate free?",
        a: "TiviMate is free to install. Premium unlock (recording, multi-playlist, advanced EPG layout) is a once-off in-app purchase around R150. Most users get by on the free tier.",
      },
      {
        q: "Can I use TiviMate on Samsung Smart TV?",
        a: "No — Samsung uses Tizen OS and TiviMate is Android-only. Use IPTV Smarters Pro or Smarters Lite on Tizen instead.",
      },
      {
        q: "Does TiviMate work on Firestick 4K?",
        a: "Yes — Firestick 4K and Firestick 4K Max both run TiviMate flawlessly. It's the best IPTV combo available in South Africa under R1,500 of hardware.",
      },
      {
        q: "Will Mzansi Stream work in both apps?",
        a: "Yes. We send both the M3U link (for TiviMate, GSE Smart IPTV, OTT Navigator) and Xtream Codes credentials (for IPTV Smarters Pro) — use whichever you prefer.",
      },
    ],
  },

  {
    slug: "iptv-not-working-firestick-fix",
    title: "IPTV not working on Firestick — 2026 fix guide for South Africa",
    metaDescription: "Step-by-step Firestick IPTV troubleshooting for 2026 — black screen, channel won't load, EPG missing, buffering and Smarters / TiviMate fixes.",
    datePublished: "2026-02-14",
    lead: "Firestick is the most popular 4K IPTV box in South Africa — but when something breaks, it's usually one of six things. Here's how to diagnose every common Firestick IPTV failure in under 5 minutes, with the exact fix for each.",
    sections: [
      {
        h2: "Symptom: 'No channels' or empty channel list",
        body: [
          "Cause 1: your M3U link expired. Most IPTV subscriptions tie the M3U to a fixed expiry. Message your provider on WhatsApp and ask them to confirm the link is active.",
          "Cause 2: you pasted the link with a trailing space. Re-copy and paste it fresh.",
          "Cause 3: Firestick lost network. Settings → Network — verify Wi-Fi is connected to the 5GHz SSID.",
        ],
      },
      {
        h2: "Symptom: 'Cannot play this stream' on every channel",
        body: [
          "Your provider's server may be temporarily down (rare for Mzansi Stream — NAPAfrica edges run 99.95% uptime). Try a single channel after 60 seconds.",
          "If only some channels fail: that channel's source feed is down at the broadcaster (e.g. a SuperSport feed mid-restream). Switch to a sister channel and retry.",
          "If every channel fails for more than 5 minutes — message your provider on WhatsApp. Mzansi Stream resolves outages typically within an hour.",
        ],
      },
      {
        h2: "Symptom: EPG (channel guide) is empty",
        body: [
          "In TiviMate: Settings → Playlist → Tap your playlist → 'Update EPG'. Wait 60 seconds.",
          "In Smarters Pro: log out and log back in with your Xtream Codes credentials. EPG re-syncs on login.",
          "If still empty after both: the EPG XML URL may not be set. Ask your provider for the EPG URL alongside the M3U — Mzansi Stream sends both by default.",
        ],
      },
      {
        h2: "Symptom: Firestick frozen / app won't open",
        body: [
          "Hold the play button + select button together for 10 seconds — soft restart.",
          "Settings → Applications → TiviMate / Smarters → Clear Cache. Reopen the app.",
          "If the Firestick still locks up: unplug the power for 60 seconds. Older Firestick Lite units overheat in summer — switch to a Firestick 4K Max.",
        ],
      },
      {
        h2: "Symptom: 4K stream drops to 1080p constantly",
        body: [
          "Almost always a router / Wi-Fi issue, not a Firestick issue. See our full buffering guide for the 5-step diagnostic. Short version: hardwire the Firestick via the R250 USB-Ethernet adapter and the problem disappears.",
        ],
      },
      {
        h2: "Symptom: audio is out of sync",
        body: [
          "In TiviMate: open the channel → press Up on the remote → Audio Sync → adjust by ±200ms until lips match.",
          "In Smarters Pro: long-press the channel → Audio Track → switch decoder. Often fixes Dolby vs. AAC mismatches.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Firestick IPTV setup — South Africa", href: "/en-za/iptv-firestick-south-africa/" },
      { label: "Why IPTV buffers and how to fix it", href: "/en-za/blog/iptv-buffering-how-to-fix/" },
      { label: "TiviMate vs IPTV Smarters Pro", href: "/en-za/blog/tivimate-vs-iptv-smarters-which-app/" },
    ],
    faq: [
      {
        q: "Why does my Firestick keep saying 'cannot play this stream'?",
        a: "Either that specific channel's source feed is down (try a sister channel), your M3U has expired, or your provider's server is briefly offline. Mzansi Stream customers can WhatsApp us and we'll diagnose in under 5 minutes.",
      },
      {
        q: "Does Firestick 4K Max work better than Firestick Lite for IPTV?",
        a: "Yes — Firestick 4K Max has more RAM, Wi-Fi 6 and doesn't overheat. For 4K SuperSport it's worth the extra R400 over Lite.",
      },
      {
        q: "Can I get my Firestick to wake up to IPTV?",
        a: "Yes — in Firestick Settings → Applications → Manage Installed Applications → TiviMate → 'Launch on startup'. The Firestick will boot straight into your IPTV channel list.",
      },
      {
        q: "Will Mzansi Stream work on my Firestick from anywhere in the world?",
        a: "Yes — the same Firestick configuration works in the UK, AU, US, UAE, NZ and any country with internet. No geo-blocking, no VPN required for SA channels.",
      },
    ],
  },

  {
    slug: "how-to-choose-iptv-service-south-africa",
    title: "How to choose an IPTV service in South Africa — 2026 buyer's guide",
    metaDescription: "What to look for in an IPTV provider in South Africa in 2026 — peering, support, payment methods, refund policy, channel mix and 4K stability.",
    datePublished: "2026-02-16",
    lead: "Choosing an IPTV provider in South Africa in 2026 isn't about who's cheapest — it's about who's still around in 12 months. Here's the seven-point checklist most people skip, and exactly what to ask a provider before you pay them anything.",
    sections: [
      {
        h2: "1. Do they peer in South Africa?",
        body: [
          "Ask: 'Do you have CDN edges at NAPAfrica in Johannesburg and Cape Town?' If the answer is vague — walk away. Overseas-only providers will buffer at peak hours regardless of your line speed.",
          "Mzansi Stream peers at NAPAfrica with redundant edges in JNB and CPT.",
        ],
      },
      {
        h2: "2. Do they offer a real trial?",
        body: [
          "A real trial is the channel lineup unlocked for at least 24 hours, with no credit card. If the 'trial' is a 5-minute demo channel or asks for card details upfront, that's a red flag — they're either farming card numbers or the service can't survive its own demo.",
          "Mzansi Stream offers a 24-hour free trial on WhatsApp, no card required.",
        ],
      },
      {
        h2: "3. Are payment methods traceable?",
        body: [
          "EFT, SnapScan, Ozow, Yoco, Capitec Pay, Visa, Mastercard — all leave a paper trail with the provider's South African bank. Crypto-only or 'gift card only' providers are usually grey-market — if they vanish, you have no recourse.",
          "Mzansi Stream accepts every SA payment method plus PayPal and Bitcoin.",
        ],
      },
      {
        h2: "4. Where does support live?",
        body: [
          "Direct WhatsApp support is the gold standard — you message a human and get a reply, not an IVR. Email-only or Telegram-only providers usually go dark when something breaks.",
          "Ask for the support response time SLA before you pay.",
        ],
      },
      {
        h2: "5. Channel mix — what's actually included?",
        body: [
          "Don't trust '20,000 channels' as a metric on its own — what matters is whether the specific channels you watch are on the list. Ask for the channel list before you pay, and look for: every SuperSport feed, Premier League, kykNET, Mzansi Magic, SABC 1/2/3, and the international channels your household watches.",
          "Mzansi Stream publishes the full channel lineup on WhatsApp on request.",
        ],
      },
      {
        h2: "6. 4K availability — across all plans or top tier only?",
        body: [
          "Some providers gate 4K behind a 'premium' tier at 2-3x the base price. Check whether 4K is included on every plan or only the most expensive one.",
          "Mzansi Stream ships 4K on every plan from R99/month.",
        ],
      },
      {
        h2: "7. Refund / satisfaction policy",
        body: [
          "A short trial isn't a refund policy. Ask: 'If the service doesn't work on my router, do I get my money back inside the first 7 days?' Reputable SA providers say yes in writing.",
          "Mzansi Stream offers a 7-day satisfaction guarantee from the first paid day.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Best IPTV South Africa 2026 — full guide", href: "/en-za/best-iptv-south-africa-2026/" },
      { label: "Is IPTV legal in South Africa?", href: "/en-za/is-iptv-legal-south-africa/" },
      { label: "Mzansi Stream plans — from R99/mo", href: "/en-za/" },
    ],
    faq: [
      {
        q: "What's the most important thing to check in an IPTV provider?",
        a: "South African peering. A provider with CDN edges at NAPAfrica delivers 4K cleanly to every major SA fibre ISP. Without it, every other feature is theoretical.",
      },
      {
        q: "Is cheaper always worse?",
        a: "No. R99/month is realistic for a fully-peered SA IPTV provider. Below R50/month, the maths usually means they're skipping licensed CDN costs — which is where the trouble starts.",
      },
      {
        q: "How do I check an IPTV provider before paying?",
        a: "Ask for the 24-hour free trial, run a channel list check, test during peak hours (19:00-22:00) on a Saturday, and confirm payment goes to a registered South African business.",
      },
      {
        q: "Is Mzansi Stream a reliable IPTV provider in South Africa?",
        a: "Mzansi Stream peers at NAPAfrica with edges in Johannesburg and Cape Town, accepts every major SA payment method, offers WhatsApp support 7 days a week and a 24-hour free trial with no card. Plans start at R99/month.",
      },
    ],
  },

  {
    slug: "cheap-iptv-south-africa-2026",
    title: "Cheap IPTV in South Africa in 2026 — what's realistic, what's a scam",
    metaDescription: "Cheap IPTV in South Africa in 2026 — the price floor for a reliable provider, the red flags below R50, and how Mzansi Stream stays at R99/mo.",
    datePublished: "2026-02-18",
    lead: "Cheap IPTV in South Africa is everywhere — but most under-R50 providers vanish inside 3 months. Here's the realistic 2026 floor for cheap-but-reliable IPTV, what to look for, and why R99/month is the sweet spot.",
    sections: [
      {
        h2: "What 'cheap IPTV' really costs to run",
        body: [
          "A reputable IPTV CDN with NAPAfrica peering, licensed channel feeds and WhatsApp support has fixed costs around R40-R60 per active subscriber per month. Anything below that means either the provider is skipping licensed feeds, oversubscribing the CDN (which is why peak-hour buffering is so common in cheap services) or they're running a short-term cash grab.",
        ],
      },
      {
        h2: "The R99/month sweet spot",
        body: [
          "R99/month is the price point where you get 20,000+ channels, full SuperSport, 4K, NAPAfrica peering and live WhatsApp support without subsidising the service from the provider's side.",
          "Mzansi Stream's 12-month plan works out to R99.92/mo effective — cheaper still if you can commit to the year.",
        ],
      },
      {
        h2: "Red flags on cheap IPTV providers",
        body: [
          "Crypto-only or gift-card-only payment, no real address, no free trial, no WhatsApp support, channel list 'on request only' that never arrives, and pricing so low (under R50/mo) that the maths can't work.",
        ],
      },
      {
        h2: "How Mzansi Stream stays at R99",
        body: [
          "Direct CDN peering at NAPAfrica cuts our infrastructure costs by roughly 60% vs. routing through Europe. Volume discounts on licensed feeds. WhatsApp-first support (no expensive call centre overhead).",
        ],
      },
    ],
    relatedLinks: [
      { label: "Best IPTV South Africa 2026 — full guide", href: "/en-za/best-iptv-south-africa-2026/" },
      { label: "DStv alternative — save R800+/month", href: "/en-za/dstv-alternative/" },
      { label: "Pricing — from R99/mo", href: "/en-za/" },
    ],
    faq: [
      {
        q: "What's the cheapest reliable IPTV in South Africa?",
        a: "R99/month is the cheapest realistic price for a reliable, NAPAfrica-peered IPTV service in South Africa. Below R50, the maths usually doesn't work — expect peak-hour buffering, missing channels or the provider vanishing.",
      },
      {
        q: "Why are some IPTV providers R30 a month?",
        a: "Usually because they're skipping licensed CDN costs and oversubscribing a single server. They survive 1-3 months and then either vanish or hike the price.",
      },
      {
        q: "Is R99 too cheap to be real?",
        a: "No — Mzansi Stream's direct NAPAfrica peering and WhatsApp-first support model keep operating costs low enough to maintain R99/month sustainably.",
      },
      {
        q: "Can I get a free trial before paying?",
        a: "Yes — Mzansi Stream offers a 24-hour free trial on WhatsApp, no credit card required.",
      },
    ],
  },

  {
    slug: "iptv-stuttering-smart-tv-fix",
    title: "IPTV stuttering on Samsung, LG or Hisense Smart TV — 2026 fix",
    metaDescription: "Why your Smart TV stutters on IPTV in 2026 and how to fix it — Tizen, webOS and VIDAA settings, buffer size, Wi-Fi vs Ethernet, app picks.",
    datePublished: "2026-02-20",
    lead: "Samsung, LG and Hisense Smart TVs all run their own operating system — and each has its own quirks with IPTV stuttering. Here's the per-platform 2026 fix that solves it for the vast majority of South African households.",
    sections: [
      {
        h2: "Samsung (Tizen) — most common cause",
        body: [
          "Samsung Tizen TVs default to letting Smart Hub and DLNA scan the network in the background. On older 2019-2021 models this hijacks bandwidth mid-stream.",
          "Fix: Settings → General → Network → Expert → IP Settings → set DNS to 1.1.1.1 manually. Then Settings → General → External Device Manager → disable Smart Hub auto-scan. Stutter usually disappears.",
          "Best IPTV app on Samsung: Smarters Lite, available in the Samsung app store.",
        ],
      },
      {
        h2: "LG (webOS) — second most common cause",
        body: [
          "LG webOS aggressively throttles background apps. Some IPTV apps lose their buffer the moment the screensaver fires.",
          "Fix: Settings → System → Screensaver → set to 'Off' or 'After 4 hours'. Settings → All Settings → General → Power Saving → set 'Auto Power Off' to 'Off' while watching live.",
          "Best IPTV app on LG: IPTV Smarters Pro from the LG Content Store.",
        ],
      },
      {
        h2: "Hisense (VIDAA) — buffer is too small by default",
        body: [
          "VIDAA's default video buffer for third-party apps is around 2 seconds — enough to stutter on a marginal line.",
          "Fix: open your IPTV app → Settings → Player Settings → Buffer size → set to 8-10 seconds. Slightly slower channel switching, dramatically more stable streams.",
          "Best IPTV app on Hisense VIDAA: Smarters Pro or GSE Smart IPTV.",
        ],
      },
      {
        h2: "All Smart TVs: stop using Wi-Fi for IPTV",
        body: [
          "Smart TVs ship with budget Wi-Fi chipsets that struggle with sustained 4K bitrate. The single biggest stability upgrade is to plug an Ethernet cable from the router (or a powerline adapter) into the TV.",
          "Cost: ~R200 for a 10m flat Ethernet cable, ~R900 for a TP-Link powerline kit if you can't run cable.",
        ],
      },
      {
        h2: "Or: skip the Smart TV app entirely",
        body: [
          "A Firestick 4K Max (~R1,400) plugged into the TV's HDMI port runs TiviMate — a far better IPTV player than anything available on Samsung, LG or Hisense. Often the cleanest fix is to bypass the Smart TV's OS altogether.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Samsung Smart TV IPTV — Tizen guide", href: "/en-za/iptv-samsung-smart-tv/" },
      { label: "LG webOS IPTV setup", href: "/en-za/devices/lg-webos/" },
      { label: "Hisense VIDAA IPTV setup", href: "/en-za/devices/hisense-vidaa/" },
      { label: "Firestick IPTV setup", href: "/en-za/iptv-firestick-south-africa/" },
    ],
    faq: [
      {
        q: "Why does my Samsung TV stutter on IPTV but Netflix is fine?",
        a: "Netflix uses Samsung's certified decoder pipeline; IPTV apps use the generic Tizen pipeline which is more sensitive to background scans. Disable Smart Hub auto-scan and set DNS to 1.1.1.1 — that fixes it for most users.",
      },
      {
        q: "Should I get a Firestick or use my Smart TV's built-in app?",
        a: "If your Smart TV is 2022 or newer with Ethernet plugged in, the built-in app is usually fine. Older units (2019-2021) are noticeably more stable when you bypass them with a Firestick 4K Max.",
      },
      {
        q: "Does Hisense VIDAA support TiviMate?",
        a: "No — TiviMate is Android-only. On Hisense use Smarters Pro or GSE Smart IPTV from the VIDAA app store, or plug in a Firestick to get TiviMate.",
      },
      {
        q: "Will Mzansi Stream stutter on my Smart TV?",
        a: "Our NAPAfrica-peered CDN delivers a clean 4K stream to your line — but the last 10m (router → TV) is on your side. If you're stuttering, message us on WhatsApp and we'll walk through the platform-specific fix in 5 minutes.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export const BLOG_SLUGS = BLOG_POSTS.map((p) => p.slug);
