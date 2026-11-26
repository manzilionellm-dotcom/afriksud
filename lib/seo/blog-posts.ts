// lib/seo/blog-posts.ts
// Existing 17 scaffolding posts (live URLs — do not reconstruct) plus
// the long-form guides in blog-guides.ts. Each post has a canonical URL,
// JSON-LD Article schema, hreflang alternates and related internal links.

import { BLOG_GUIDES } from "./blog-guides";
import { BLOG_DIASPORA } from "./blog-diaspora";

export type BlogFaq = { q: string; a: string };
export type BlogHowToStep = { title: string; text: string };

export type BlogSection = {
  /** Optional anchor for in-page TOC. */
  id?: string;
  h2: string;
  body: string[];
  bullets?: string[];
  steps?: BlogHowToStep[];
};

export type BlogPost = {
  slug: string;
  title: string;
  metaDescription: string;
  /** Date the article is dated (publish ISO date for JSON-LD). */
  datePublished: string;
  /** Optional freshness signal for sitemap + JSON-LD. */
  dateModified?: string;
  /** Single-paragraph lead used as og:description and on the index page. */
  lead: string;
  /** Optional extractable facts under the lead (DirectAnswer / AI Overviews). */
  keyFacts?: string[];
  /** Section headings + paragraphs. Owner-editable. */
  sections: BlogSection[];
  /** FAQ accordion + FAQPage schema. Omit on older scaffolding posts. */
  faq?: BlogFaq[];
  /** HowTo schema wrapper. Steps live on a section; this names the recipe. */
  howTo?: {
    name: string;
    description?: string;
    totalTime?: string;
    supply?: string[];
    tool?: string[];
  };
  /** Soft WhatsApp hero/footer CTA. Falls back to a generic trial message. */
  cta?: {
    label: string;
    message: string;
    ref: string;
  };
  /** Internal link slugs the post should point at. Used to render the
   *  "Related" footer block on each post automatically. */
  relatedLinks: { label: string; href: string }[];
};

const EXISTING_BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-watch-psl-online-2026",
    title: "How to watch PSL online in 2026 — no DStv decoder",
    metaDescription: "DStv Premiership without a DStv subscription — SuperSport PSL folders via Mzansi Stream in 4K, matches to confirm on WhatsApp, with a free 24-hour trial.",
    datePublished: "2026-01-20",
    lead: "Check the South African TV guide for the exact PSL fixture before choosing a package. A decoder is one way to watch a broadcaster; the streaming offer has its own guide and price.",
    sections: [
      {
        h2: "Why so many fans are dropping DStv",
        body: [
          "DStv Stream Starter costs R99 per month and Sports costs R399. Confirm the fixture on the package before paying.",
          "Mzansi Stream lists SuperSport-style folders — PSL, Variety, Rugby, Cricket — in 4K where the source supports it; matches to confirm on WhatsApp. No decoder, no installer, no 24-month contract.",
        ],
      },
      {
        h2: "The PSL feeds people ask for",
        body: [
          "SuperSport PSL is the headline Premiership channel; Variety picks up cup, mid-week and Nedbank Cup fixtures. Which of these are in the Mzansi Stream line-up is to confirm on WhatsApp — test a match on the 24-hour trial.",
          "Rugby and Cricket folders sit in the same subscription — fixtures to confirm on WhatsApp.",
        ],
      },
      {
        h2: "Devices you can watch on",
        body: [
          "Firestick, Android TV, Apple TV, Smart TVs (Samsung, LG, Sony, Hisense), iPhone, iPad, Android phones, MAG Box, PC and Mac. Use TiviMate, IPTV Smarters Pro, GSE Smart IPTV or any standard M3U app.",
        ],
      },
      {
        h2: "How to set it up",
        body: [
          "Message us on WhatsApp, pick a plan (1 / 3 / 6 / 12 months), pay via EFT, SnapScan, Ozow or card, and we send the M3U link plus a one-page setup guide for your specific device.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Compare DStv Premium vs Mzansi Stream", href: "/en-za/vs/dstv-premium" },
      { label: "DStv alternative — full guide", href: "/en-za/dstv-alternative" },
    ],
  },
  {
    slug: "dstv-vs-iptv-2026-complete-guide",
    title: "DStv vs prepaid IPTV in South Africa",
    metaDescription: "Compare the initial bill, streaming devices and programme checks for DStv and Mzansi. Prices in rand and a checklist for your household.",
    datePublished: "2026-01-22",
    dateModified: "2026-11-26",
    lead: "DStv itself sells streaming subscriptions. The useful comparison is between the service, its catalogue and the amount due for your preferred term.",
    sections: [
      {
        h2: "Compare month-to-month prices",
        body: [
          "DStv Stream Starter costs R99 for a month and Premium Stream R799. Mzansi’s one-month plan costs R199. Check the specific package and programme you need."
        ]
      },
      {
        h2: "Calculate prepaid cash flow",
        body: [
          "Mzansi’s R1,199 annual payment works out to R99.92 per month. Twelve R99 payments for DStv Stream Starter would be R1,188 if the rate holds. Extra costs can include data, devices and some satellite services."
        ]
      },
      {
        h2: "Test the programmes you care about",
        body: [
          "Write down three shows and one live event, including the episode or match. Check their listing for your viewing country, preferred language and device before cancelling another account."
        ]
      }
    ],
    relatedLinks: [
      {
        label: "Official DStv package guide",
        href: "https://www.dstv.com/en-za/news/149536/how-to-change-upgrade-dstv-package/"
      },
      {
        label: "South African price comparison",
        href: "/en-za/blog/dstv-price-south-africa"
      },
      {
        label: "SABC direct viewing",
        href: "/en-za/blog/sabc-without-dstv"
      }
    ]
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
      { label: "Compare Mzansi prepaid terms", href: "/en-za" },
      { label: "DStv alternative — full guide", href: "/en-za/dstv-alternative" },
    ],
  },
  {
    slug: "watch-springboks-live-online",
    title: "Watch the Springboks live online in 2026",
    metaDescription: "Springbok Tests and URC fixtures via SuperSport Rugby-style folders on Mzansi Stream in 4K — fixtures to confirm on WhatsApp. R199 for one month. No DStv required.",
    datePublished: "2026-01-26",
    lead: "Springbok Tests, Rugby Championship, URC, Currie Cup and Six Nations matches are broadcast on SuperSport in SA. Here's how to check what plays on Mzansi Stream in 4K without DStv.",
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
          "Order any Mzansi Stream plan, drop the M3U link into TiviMate or IPTV Smarters, and check the SuperSport Rugby folder in your channel list — fixtures to confirm on WhatsApp.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Watch the Springboks from London — diaspora FAQ", href: "/en-za/blog/watch-springboks-from-london" },
      { label: "DStv alternative — full guide", href: "/en-za/dstv-alternative" },
      { label: "How to watch PSL online", href: "/en-za/blog/how-to-watch-psl-online-2026" },
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
          "This page is not legal advice and makes no legality claim. The copyright issue is distributing copyrighted content without authorisation. The Films and Publications Act and the Copyright Act govern what providers can and can't carry.",
          "This page does not state that Mzansi Stream holds channel licences.",
        ],
      },
      {
        h2: "Mzansi Stream's position",
        body: [
          "We accept traceable payment (EFT, SnapScan, card). This page does not state a VAT number or a channel licence.",
          "We do not promote bypassing geo-blocks for content where rights are clearly held elsewhere. If you're outside SA, a VPN is your decision — we don't ship one.",
        ],
      },
    ],
    relatedLinks: [
      { label: "POPIA privacy policy", href: "/en-za/legal/popia" },
      { label: "About Mzansi Stream", href: "/en-za/legal/about" },
    ],
  },
  {
    slug: "best-iptv-for-vumatel-openserve",
    title: "Best IPTV for Vumatel, Openserve and Frogfoot in 2026",
    metaDescription: "How to judge IPTV on Vumatel, Openserve and Frogfoot fibre in South Africa in 2026 — peering, peak hours and what to test on a trial.",
    datePublished: "2026-01-30",
    lead: "Vumatel, Openserve and Frogfoot are the three biggest SA fibre networks. Here's how to judge an IPTV provider and test 4K on each of them.",
    sections: [
      {
        h2: "What matters on SA fibre",
        body: [
          "Peering. An IPTV provider with poor SA peering will buffer at peak hours (18:00-22:00) regardless of how fast your line is. Look for providers with local CDN edges in Johannesburg, Cape Town and Durban.",
        ],
      },
      {
        h2: "How to test Mzansi Stream on your line",
        body: [
          "This page does not publish a measured latency. Request the 24-hour trial and test a 4K channel during peak hours (18:00-22:00) on your own fibre line.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Mzansi Stream prepaid prices", href: "/en-za" },
      { label: "DStv alternative — full guide", href: "/en-za/dstv-alternative" },
    ],
  },
  {
    slug: "cancel-dstv-step-by-step-2026",
    title: "How to verify your DStv cancellation date",
    metaDescription: "Find the next payment date in MyDStv, choose the correct package and keep your confirmation. Includes an example of what to check on your next bill.",
    datePublished: "2026-02-01",
    dateModified: "2026-11-26",
    lead: "If you are planning a move or a change of service, start by checking the date on your own DStv account. The South African disconnection FAQ schedules an ordinary cancellation at the next payment date.",
    sections: [
      {
        h2: "Find the effective date",
        body: [
          "Sign in to DStv’s Self Service website, go to My Products, select your package and open Disconnect. Review the date the account shows before submitting."
        ]
      },
      {
        h2: "Check the product you selected",
        body: [
          "A household can have a television subscription alongside an internet bundle or a contract. Confirm which services will end and what costs apply with DStv."
        ]
      },
      {
        h2: "Keep a record of the change",
        body: [
          "Save the confirmation or reference. If a payment still appears after the date, give DStv the date, reference and amount and ask which billing period it covers."
        ]
      }
    ],
    relatedLinks: [
      {
        label: "Main DStv cancellation guide",
        href: "/en-za/cancel-dstv-2026"
      },
      {
        label: "Official disconnection instructions",
        href: "https://www.dstv.com/en-za/help/faqs/viewing/my-dstv-viewing/how-can-i-cancel-my-dstv-packageservice/"
      },
      {
        label: "Leaving for the UK",
        href: "/en-gb/blog/dstv-uk-moving-from-south-africa"
      }
    ]
  },
  {
    slug: "iptv-zimbabwe-complete-guide",
    title: "IPTV Zimbabwe in 2026 — complete guide",
    metaDescription: "Complete IPTV guide for Zimbabwe in 2026 — pricing in USD, EcoCash payment, DStv alternative, SuperSport in 4K.",
    datePublished: "2026-02-03",
    lead: "Compare the local price and payment currency, and test your own connection during your normal viewing hours. A South African package price cannot tell you what a household in Zimbabwe will pay.",
    sections: [
      {
        h2: "Why DStv Africa is expensive in ZW",
        body: [
          "Check the DStv Zimbabwe package and account balance in your own billing currency. Ask for the full charge including equipment or other fees.",
          "Ask for a written Mzansi quote in your currency with the term, total payment and accepted method before you pay.",
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
      { label: "IPTV Zimbabwe — order now", href: "/en-za/sadc/zimbabwe" },
      { label: "DStv alternative — full guide", href: "/en-za/dstv-alternative" },
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
          "Verifique o programa e o horário no guia do canal em Moçambique antes de escolher uma assinatura. A disponibilidade muda de acordo com o território e o pacote.",
        ],
      },
    ],
    relatedLinks: [
      { label: "IPTV Moçambique — encomendar", href: "/pt-mz/sadc/mozambique" },
      { label: "Alternativa DStv", href: "/en-za/dstv-alternative" },
    ],
  },
  {
    slug: "dstv-premium-vs-mzansi-stream",
    title: "DStv Premium vs Mzansi Stream – the first payment",
    metaDescription: "Compare Premium satellite, Premium Stream and Mzansi on current South African prices. See how monthly and annual plans affect cash flow.",
    datePublished: "2026-02-07",
    dateModified: "2026-11-26",
    lead: "Premium has more than one price. The standard satellite plan is R979 per month and Premium Stream is R799. The advertised R799 satellite deal involves a 24-month commitment and includes the access fee.",
    sections: [
      {
        h2: "How much is due upfront?",
        body: [
          "Mzansi costs R199 for one month or R1,199 upfront for twelve. On a monthly DStv Premium subscription, check your account to see whether equipment, access fees or other products are included."
        ]
      },
      {
        h2: "What if the rates stay fixed for a year?",
        body: [
          "Twelve R799 Premium Stream payments total R9,588. Twelve standard R979 Premium satellite payments total R11,748, before any applicable fees. A R1,199 Mzansi plan is a distinct service with its own catalogue."
        ]
      },
      {
        h2: "Which account should a household keep?",
        body: [
          "Check each must-have event or programme using the broadcaster’s own listing. If a service already delivers what you need within budget, changing solely for a larger advertised catalogue may add little value."
        ]
      }
    ],
    relatedLinks: [
      {
        label: "Official Premium rates",
        href: "https://www.dstv.com/en-za/news/149536/how-to-change-upgrade-dstv-package/"
      },
      {
        label: "Compare all packages",
        href: "/en-za/blog/dstv-price-south-africa"
      },
      {
        label: "DStv household options",
        href: "/en-za/dstv-alternative"
      }
    ]
  },
  {
    slug: "why-is-my-iptv-buffering-fix-2026",
    title: "Why is my IPTV buffering? The 2026 SA troubleshooting guide",
    metaDescription: "Why your IPTV buffers in South Africa in 2026 — every cause ranked by likelihood, every fix, and how to vet a provider before you pay.",
    datePublished: "2026-03-08",
    lead: "If your IPTV stream buffers during the PSL or freezes mid-Premier League match, the cause is often not your fibre line. This guide ranks every realistic cause in order of likelihood on a 2026 South African fibre setup, with the fix for each.",
    sections: [
      {
        h2: "First — is it really buffering, or is it freezing?",
        body: [
          "Buffering = the player spinner shows for a few seconds and the stream resumes on its own. That's a brief network drop the player can recover from.",
          "Freezing = the picture locks completely and the stream restarts (or doesn't). That's a provider feed dying, an app crash, or a router that needs rebooting. Persistent freezing on the same channel = the provider is the issue.",
        ],
      },
      {
        h2: "Cause #1 — the provider's CDN routes overseas",
        body: [
          "This is the single biggest cause of South African IPTV buffering in 2026. If your provider's servers sit in Frankfurt, Amsterdam or the US, every chunk of video travels 180-220ms one-way to your TV. The player's buffer is 2-4 seconds. The moment the SA fibre has a micro-blip (and they all do), the buffer empties before the next chunk arrives.",
          "Fix: ask the provider how it routes to SA and test on your own line. This page does not publish a measured latency for Mzansi Stream — use the 24-hour trial.",
        ],
      },
      {
        h2: "Cause #2 — your Wi-Fi router is the bottleneck",
        body: [
          "The ISP-branded Huawei and ZTE routers shipped 2020-2023 cap real 5GHz throughput at 60-80 Mbps even when your fibre line is 500 Mbps. The router itself is the choke point.",
          "Fix: replace with a Wi-Fi 6 router. TP-Link Archer AX55 (R1,300), ASUS RT-AX55 (R1,500), TP-Link AX73 (R2,000) all unlock the full line speed. Or hard-wire your Smart TV / Firestick over Ethernet — a USB-Ethernet adapter for Firestick (R250) eliminates Wi-Fi jitter entirely.",
        ],
      },
      {
        h2: "Cause #3 — your player buffer is too small for 4K",
        body: [
          "TiviMate ships with a 2-second buffer by default. Fine for 1080p. Not enough headroom for 4K SuperSport when a Premier League corner kick spikes the bitrate.",
          "Fix: TiviMate → Settings → Playback → Buffer Size → 8 seconds. IPTV Smarters → Settings → Player → Time-shift Buffer → 6-10 seconds. This change often reduces micro-re-buffers, at the cost of slightly slower channel changes.",
        ],
      },
      {
        h2: "Cause #4 — background traffic on your line",
        body: [
          "Xbox / PS5 downloading a game patch. Windows Update. iCloud syncing photos. All of these can briefly saturate a 100 Mbps line.",
          "Fix: enable QoS on your router and prioritise the streaming device's MAC address. On most Wi-Fi 6 routers this is a one-tap setting.",
        ],
      },
      {
        h2: "Cause #5 — Wi-Fi interference",
        body: [
          "Microwaves, baby monitors, Bluetooth speakers and neighbours' Wi-Fi all share the 2.4GHz band. If your streaming device is on 2.4GHz, it's competing with all of them.",
          "Fix: force the streaming device onto 5GHz (rename the bands in router settings — 'MyHome' and 'MyHome-5G' — and connect to the -5G SSID).",
        ],
      },
      {
        h2: "How to vet a provider for stability before you pay",
        body: [
          "Ask: 'Do you peer at NAPAfrica?' Vague answer = walk away.",
          "Demand a 24-hour free trial of the full channel pack. If the trial is restricted, the production feed is probably worse.",
          "Test on a Saturday during a SuperSport PSL fixture and a Premier League fixture. Peak load reveals every weakness.",
          "Mzansi Stream's free 24h trial uses the same channel pack as the paid plans. No card. Request on WhatsApp.",
        ],
      },
    ],
    relatedLinks: [
      { label: "IPTV buffering — full pillar guide", href: "/en-za/iptv-no-buffering-south-africa" },
      { label: "Best IPTV for Vumatel / Openserve / Frogfoot", href: "/en-za/iptv-vumatel-openserve-frogfoot" },
      { label: "Mzansi Stream prepaid prices", href: "/en-za" },
    ],
  },
  {
    slug: "how-to-choose-iptv-service-south-africa-2026",
    title: "How to choose an IPTV service in South Africa — the 2026 checklist",
    metaDescription: "How to choose an IPTV service in South Africa in 2026 — the 9-point checklist for stability, channel pack, price, support and payment safety.",
    datePublished: "2026-03-10",
    lead: "Asked daily on every South African streaming subreddit and WhatsApp group: 'which IPTV service is actually worth paying for?' Here's the 9-point checklist that separates the legitimate providers from the resellers who'll ghost you after the first payment.",
    sections: [
      {
        h2: "1. Does the provider have its own CDN?",
        body: [
          "Re-sellers buy a stream feed from someone upstream and re-sell it. Their stability depends entirely on the upstream provider's infrastructure — which they have zero control over.",
          "Ask how the provider routes streams to SA and test on your own line. This page does not publish a latency figure for Mzansi Stream.",
        ],
      },
      {
        h2: "2. Is the channel list published publicly?",
        body: [
          "If you have to message WhatsApp to find out which channels are included, the provider is hiding something. A legitimate service publishes the channel pack on its website.",
        ],
      },
      {
        h2: "3. Is there a free trial?",
        body: [
          "A 24-hour free trial of the full channel pack is the single most reliable trust signal in IPTV. Providers who refuse a trial don't trust their own production feed.",
          "Mzansi Stream offers a no-card 24h trial. Request on WhatsApp.",
        ],
      },
      {
        h2: "4. Is there real support — not just a Telegram bot?",
        body: [
          "Your stream will eventually have an issue (DNS hiccup, EPG resync, channel re-shuffle after a broadcaster contract change). The question is whether the provider responds or whether you're ghosted on a Saturday afternoon.",
          "Test pre-purchase: message support during peak hours (8pm Saturday). If you don't get a reply within 30 minutes, that's the SLA you're buying.",
        ],
      },
      {
        h2: "5. Is the company a real entity?",
        body: [
          "Read the refund page and ask on WhatsApp for any company detail you need before you pay. This page does not publish a registration number.",
        ],
      },
      {
        h2: "6. Is the pricing locked?",
        body: [
          "Avoid month-to-month pricing that escalates after the first cycle. Pay once per term (1 / 3 / 6 / 12 months) and the price for that term doesn't change.",
        ],
      },
      {
        h2: "7. Are local payment methods supported?",
        body: [
          "Confirm the payment options available for your order on WhatsApp before paying.",
        ],
      },
      {
        h2: "8. Does it work on the devices you already own?",
        body: [
          "Smart TV, Firestick, iPhone, Android, MAG box, PC. Provider must publish device compatibility and offer setup help for the device you actually have.",
        ],
      },
      {
        h2: "9. Has the service been running for at least 12 months?",
        body: [
          "Fly-by-night IPTV resellers come and go in 3-6 month cycles. A service that's been operating for 12+ months under the same brand has paid its infrastructure bills, survived a content-rights renegotiation and proven the team is real.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Best IPTV in South Africa 2026", href: "/en-za/best-iptv-south-africa-2026" },
      { label: "Cheap IPTV South Africa — under R100", href: "/en-za/cheap-iptv-south-africa" },
      { label: "IPTV buffering on SA fibre", href: "/en-za/iptv-no-buffering-south-africa" },
      { label: "Mzansi Stream prepaid prices", href: "/en-za" },
    ],
  },
  {
    slug: "tivimate-vs-iptv-smarters-pro-2026",
    title: "TiviMate vs IPTV Smarters Pro vs GSE Smart IPTV — which app in 2026?",
    metaDescription: "Honest 2026 comparison of TiviMate, IPTV Smarters Pro and GSE Smart IPTV for South African IPTV. UI, EPG quality, 4K, VOD, device support.",
    datePublished: "2026-03-12",
    lead: "The three apps every SA IPTV user encounters: TiviMate, IPTV Smarters Pro and GSE Smart IPTV. Here's the honest 2026 comparison — UI quality, EPG handling, 4K performance, VOD support, paid vs free, and which one to install for your specific device.",
    sections: [
      {
        h2: "TiviMate — the gold standard for Firestick and Android TV",
        body: [
          "TiviMate is the most polished IPTV player on Firestick, Android TV and Nvidia Shield. The UI is built around remote-control navigation — every action is two clicks away. EPG handling is best-in-class: 7-day guide, instant catch-up TV, picture-in-picture preview.",
          "Premium tier is R199 once-off (lifetime). Worth it for multi-playlist support, recording and unlimited playlists. Free tier supports one playlist, which is enough for most households.",
          "Best for: Firestick 4K, Firestick 4K Max, Nvidia Shield, Chromecast with Google TV. Not available on iOS or Samsung Tizen.",
        ],
      },
      {
        h2: "IPTV Smarters Pro — the cross-platform workhorse",
        body: [
          "IPTV Smarters Pro runs on everything. iOS, Android, Firestick, Android TV, Smart TVs (Samsung Tizen, LG webOS), Windows, Mac. Same UI everywhere.",
          "Free. Ad-free. Supports Xtream Codes credentials directly (Mzansi Stream sends Xtream Codes by default). VOD grid is the cleanest in the category — looks like Netflix.",
          "Best for: iPhone, iPad, Samsung Smart TV, LG Smart TV, mixed-device households.",
        ],
      },
      {
        h2: "GSE Smart IPTV — solid free fallback",
        body: [
          "GSE Smart IPTV is the free fallback when TiviMate isn't available on your device. Reliable, no-frills, EPG works.",
          "Best for: older Android TV boxes, MAG boxes (sort of — most MAGs run their own portal), backup option when other apps fail.",
        ],
      },
      {
        h2: "Performance comparison on 4K SuperSport",
        body: [
          "TiviMate has the lowest re-buffer rate on 4K — better internal buffer management and faster HEVC decode path.",
          "IPTV Smarters Pro is a close second; performance is identical for 1080p, slightly behind TiviMate on 4K HDR.",
          "GSE Smart IPTV handles 1080p well; 4K HDR has slightly higher re-buffer rate but is still acceptable on a stable line.",
        ],
      },
      {
        h2: "Which one should you install?",
        body: [
          "Firestick 4K Max + 4K SuperSport household → TiviMate Premium (R199 once).",
          "iPhone / iPad → IPTV Smarters Pro (free).",
          "Samsung Smart TV / LG Smart TV → IPTV Smarters Pro (free, native Tizen / webOS app).",
          "Mzansi Stream sends an Xtream Codes login that works directly in all three apps. We send the device-specific setup guide on WhatsApp after sign-up.",
        ],
      },
    ],
    relatedLinks: [
      { label: "IPTV Firestick setup — full guide", href: "/en-za/iptv-firestick-south-africa" },
      { label: "IPTV for Samsung Smart TV (Tizen)", href: "/en-za/iptv-samsung-smart-tv" },
      { label: "4K IPTV in South Africa", href: "/en-za/4k-iptv-south-africa" },
      { label: "Mzansi Stream prepaid prices", href: "/en-za" },
    ],
  },
  {
    slug: "is-mzansi-stream-legit-2026",
    title: "Is Mzansi Stream legit? An honest 2026 answer",
    metaDescription: "Is Mzansi Stream a legitimate IPTV service in South Africa? What the site does and does not state, payment safety and the refund policy.",
    datePublished: "2026-03-14",
    lead: "Every prospective customer Googles 'is Mzansi Stream legit' before they pay. Here's the honest 2026 answer — what we are, what we're not, how to verify us, and how the 24h free trial removes all upfront risk.",
    sections: [
      {
        h2: "What Mzansi Stream is",
        body: [
          "Mzansi Stream is an IPTV streaming service for customers in SA, the SADC region and the SA diaspora worldwide, with live channels and VOD — line-up to confirm on WhatsApp.",
          "The site publishes a refund / satisfaction policy (7 days) and WhatsApp support.",
        ],
      },
      {
        h2: "How to verify us before paying",
        body: [
          "Read the refund policy on the site. Ask on WhatsApp for any business detail you need before paying.",
          "Request the free 24-hour trial. We send the setup on WhatsApp. No card. Use the same channel pack as the paid plans for 24 hours.",
          "Pay only after the trial, only via a local SA payment method (EFT, SnapScan, Zapper, Ozow, Capitec Pay, Yoco). All of these give you fraud / chargeback protection that anonymous crypto-only sellers don't.",
          "Read the refund policy under /legal/refund/.",
        ],
      },
      {
        h2: "What Mzansi Stream is not",
        body: [
          "Check the channel or programme with the broadcaster for your country. A player can show a title in its guide without proving who can distribute it.",
          "Not a torrent service. The streams are delivered over standard HLS.",
          "This page makes no legality or licence claim and does not state a company registration.",
        ],
      },
      {
        h2: "The refund / satisfaction policy",
        body: [
          "Within the first 7 days of paying, if the service isn't working for you for any reason and we can't fix it on WhatsApp, we issue a refund. Published in our Satisfaction Policy under /legal/refund/.",
          "The 24h free trial means most customers never reach the paid stage without already knowing the service works on their devices.",
        ],
      },
      {
        h2: "Verified social proof",
        body: [
          "Mzansi Stream invites every customer to leave a review on HelloPeter and Trustpilot after 30 days of use, with their consent.",
          "If you find a third-party site claiming Mzansi Stream has fake reviews, please WhatsApp us with the link. We'll investigate and respond publicly.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Is IPTV legal in South Africa? — 2026 guide", href: "/en-za/is-iptv-legal-south-africa" },
      { label: "Best IPTV in South Africa 2026", href: "/en-za/best-iptv-south-africa-2026" },
      { label: "Mzansi Stream prepaid prices", href: "/en-za" },
      { label: "Privacy / POPIA policy", href: "/en-za/legal/popia" },
    ],
  },
  {
    slug: "iptv-not-working-firestick-fix",
    title: "IPTV not working on Firestick — 2026 fix guide for South Africa",
    metaDescription: "Step-by-step Firestick IPTV troubleshooting for 2026 — black screen, channel won't load, EPG missing, buffering and Smarters / TiviMate fixes.",
    datePublished: "2026-03-12",
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
          "The server may be temporarily down. This page does not quote an uptime percentage. Try a single channel after 60 seconds.",
          "If only one channel fails, note the time, device and any on-screen error. Test another programme and give support those details.",
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
          "Almost always a router / Wi-Fi issue, not a Firestick issue. Hardwire the Firestick via the R250 USB-Ethernet adapter and the problem disappears for most households. Full diagnostic in our buffering guide.",
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
      { label: "Firestick IPTV setup — South Africa", href: "/en-za/iptv-firestick-south-africa" },
      { label: "Why your IPTV keeps buffering", href: "/en-za/blog/why-is-my-iptv-buffering-fix-2026" },
      { label: "TiviMate vs IPTV Smarters Pro", href: "/en-za/blog/tivimate-vs-iptv-smarters-pro-2026" },
      { label: "Mzansi Stream prepaid prices", href: "/en-za" },
    ],
  },
  {
    slug: "iptv-stuttering-smart-tv-fix",
    title: "IPTV stuttering on Samsung, LG or Hisense Smart TV — 2026 fix",
    metaDescription: "Why your Smart TV stutters on IPTV in 2026 and how to fix it — Tizen, webOS and VIDAA settings, buffer size, Wi-Fi vs Ethernet, app picks.",
    datePublished: "2026-03-14",
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
      { label: "Samsung Smart TV IPTV — Tizen guide", href: "/en-za/iptv-samsung-smart-tv" },
      { label: "LG webOS IPTV setup", href: "/en-za/devices/lg-webos" },
      { label: "Hisense VIDAA IPTV setup", href: "/en-za/devices/hisense-vidaa" },
      { label: "IPTV buffering pillar guide", href: "/en-za/iptv-no-buffering-south-africa" },
    ],
  },
  {
    slug: "cheap-iptv-south-africa-realistic-pricing",
    title: "Cheap IPTV in South Africa in 2026 — what's realistic, what's a scam",
    metaDescription: "Compare prepaid IPTV prices in South Africa, check the amount due upfront and use a trial before buying a longer term.",
    datePublished: "2026-03-16",
    lead: "For a budget close to R100 per month, compare how much is due today. Mzansi’s annual plan costs R1,199 in one payment. The minimum one-month purchase is R199.",
    sections: [
      {
        h2: "What 'cheap IPTV' really costs to run",
        body: [
          "Running IPTV infrastructure with WhatsApp support has real fixed costs per subscriber; this page does not publish a figure.",
          "A price alone cannot establish reliability or programme availability. Ask for the full prepaid amount, the service terms and a trial on your own device.",
        ],
      },
      {
        h2: "The first payment and the yearly total",
        body: [
          "Mzansi offers one month for R199 and a year for R1,199 upfront. Internet access and a compatible device are needed for both.",
          "Dividing R1,199 by twelve gives R99.92 per month to the nearest cent. The renewal price is the price shown when you place the next order.",
        ],
      },
      {
        h2: "Red flags on cheap IPTV providers",
        body: [
          "Crypto-only or gift-card-only payment, no real address, no free trial, no WhatsApp support, channel list 'on request only' that never arrives, and pricing so low (under R50/mo) that the maths can't work.",
        ],
      },
      {
        h2: "What to check before a longer term",
        body: [
          "WhatsApp-first support — no call centre overhead — and one-off payments with no decoder hardware. This page does not publish a cost breakdown.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Cheap IPTV South Africa — full pillar guide", href: "/en-za/cheap-iptv-south-africa" },
      { label: "Best IPTV South Africa 2026", href: "/en-za/best-iptv-south-africa-2026" },
      { label: "DStv alternative — compare your options", href: "/en-za/dstv-alternative" },
      { label: "Mzansi Stream prepaid prices", href: "/en-za" },
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  ...EXISTING_BLOG_POSTS,
  ...BLOG_GUIDES,
  ...BLOG_DIASPORA,
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export const BLOG_SLUGS = BLOG_POSTS.map((p) => p.slug);
