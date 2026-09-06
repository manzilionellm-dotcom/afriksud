// lib/seo/blog-diaspora.ts
// run-007 — London / UK / abroad rugby FAQ cluster. New slugs only.
// run-008 — watch-springboks-from-london FAQ is the locked Seo P1 6Q pack
// (verbatim visible + FAQPage). English body. FAQPage via the blog template.
// run-010 — /en/iptv-springboks-uk is a 308 onto this blog (no 2nd FAQ hub).
// MID+END WA is DiasporaSoftSellCta (wa.me/447307410512), not DstvSoftSellCta.

import type { BlogFaq, BlogPost } from "./blog-posts";

const PUB = "2026-09-06";

/** Seo P1 6Q pack — locked verbatim. Visible accordion + FAQPage on
 *  `/blog/watch-springboks-from-london`. `/en/iptv-springboks-uk` 308s
 *  here. Do not rewrite. */
export const SPRINGBOKS_LONDON_P1_FAQ: BlogFaq[] = [
  {
    q: "Can I watch Springboks and URC matches from London without a South African cable subscription?",
    a: "Many SA fans in the UK use IPTV on a Firestick or Smart TV to follow Springboks and URC over home broadband instead of keeping an SA cable package. Rights and blackouts still apply — we don’t promise every official feed for every fixture. Use a short trial to see what actually plays on your UK connection.",
  },
  {
    q: "Will I get every SuperSport-style feed for rugby?",
    a: "We understand the SuperSport-style ask, but we don’t guarantee every channel or every match feed. Lineups change and UK/SA rights differ. Tell us the upcoming fixtures you care about on WhatsApp and we’ll be straight about what you can test.",
  },
  {
    q: "Do time zones / kick-off times work for live matches in the UK?",
    a: "Live means live — kick-offs follow the host broadcast clock. You’ll watch in real time on UK evenings or weekends depending on the fixture. Check the guide during your trial so you’re not guessing.",
  },
  {
    q: "Can I set this up on a Firestick or Smart TV in the UK?",
    a: "Yes — Firestick and many Smart TVs are the usual London-apartment setup. Install a player, enter the access we send, and test on your Wi‑Fi. Message +44 7307 410512 with your device model if you want a simple walkthrough.",
  },
  {
    q: "Is there a 24-hour trial before I pay?",
    a: "Yes. WhatsApp +44 7307 410512 or https://wa.me/447307410512, say you’re in the UK watching SA rugby, and ask for a 24h trial. Confirm stability and the matches/channels that matter before you subscribe.",
  },
  {
    q: "Soft legal — is this “free illegal streams” or 100% cleared for every Springboks game?",
    a: "No. We don’t offer or market “free illegal streams,” and we never claim “100% legal streams of [network/event].” IPTV technology is legal; licensing, rights, and blackouts still apply. Trial first, keep expectations honest, then decide.",
  },
];

export const BLOG_DIASPORA: BlogPost[] = [
  {
    slug: "watch-springboks-from-london",
    title: "Watch the Springboks from London — IPTV FAQ for SA rugby fans",
    metaDescription:
      "Can you watch Springboks, URC and Premiership-style rugby on IPTV from London? Categories, kickoff on UK time, 24h WhatsApp trial. No exclusive-rights claims.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "South Africans in London do not need a DStv decoder in someone's Joburg lounge to follow the Boks. This page answers the diaspora questions: which playlist categories to look for (Springboks, URC, Super Rugby Pacific, English club rugby), how kickoff lands on a UK clock, and how a 24-hour WhatsApp trial proves the folders before you pay. We list categories — not exclusive Sky, TNT or SuperSport licences.",
    keyFacts: [
      "Springbok Tests and URC sit in SuperSport Rugby / Variety / Grandstand folders on the Mzansi Stream pack — confirm names on the trial.",
      "SAST is UTC+2 all year. A 17:00 SAST kickoff is 15:00 GMT in winter and 16:00 BST in summer.",
      "24-hour trial on WhatsApp +44 7307 410512. No card. No mailto.",
    ],
    cta: {
      label: "WhatsApp the London rugby trial — +44 7307 410512 →",
      message:
        "Hi! I'm in London. I want the 24-hour Mzansi Stream trial for Springboks / URC / SA channels. Device: [Firestick / Smart TV].",
      ref: "Blog-Boks-London",
    },
    howTo: {
      name: "Watch Springboks rugby from London on Mzansi Stream",
      description:
        "Request a WhatsApp trial from the UK, favourite SuperSport Rugby, and test a live or next fixture on London time.",
      totalTime: "PT10M",
      supply: ["WhatsApp on a UK number", "Home Wi-Fi in the UK"],
      tool: ["Firestick, Smart TV, or phone with TiviMate or IPTV Smarters"],
    },
    sections: [
      {
        id: "short-answer",
        h2: "Short answer — can I watch the Boks from London?",
        body: [
          "Yes: the same SuperSport Rugby, Variety and Grandstand categories a household uses in South Africa are the folders diaspora viewers test from a London flat. Open the 24-hour trial, favourite those names, and watch a Test or a URC fixture on the lounge screen — not only on a phone.",
          "This is not a claim that Mzansi Stream holds exclusive UK or SA broadcast licences. A folder in a playlist is a category label. If a seller cannot show SuperSport Rugby on the trial, they do not have the product you came for.",
        ],
      },
      {
        id: "categories",
        h2: "Springboks, URC, Super Rugby Pacific, Premiership-style — what to favourite",
        body: [
          "The existing Springboks post on this site is written for viewers in South Africa. From London the shopping list is the same folders plus honesty about which competition is which in 2026.",
        ],
        bullets: [
          "Springboks / Rugby Championship / incoming Tours — SuperSport Rugby is the headline category. Overflow often sits on SuperSport Variety.",
          "URC — Stormers, Sharks, Bulls and Lions live here now, not in Super Rugby. Favourite SuperSport Rugby and Variety before a Saturday 15:00 SAST slot.",
          "Super Rugby Pacific — New Zealand / Australia / Pacific franchises. SA sides are not in that competition. Ask WhatsApp to confirm a Super Rugby Pacific folder if that is what you actually want.",
          "Premiership-style English club rugby — a UK-facing sports category some households want next to the Boks. Confirm the folder name on the trial. A category is not a TNT Sports or Sky licence.",
          "Currie Cup and Six Nations — SuperSport Grandstand / Variety on the published SA pack. Test the names you care about; do not assume every overflow tile is populated every week.",
        ],
      },
      {
        id: "london-vs-za",
        h2: "How this differs from watching in South Africa",
        body: [
          "In Johannesburg the fight is fibre peering and load shedding. In London the fight is time zone, UK Wi-Fi, and a seller who only staffs WhatsApp on SAST evenings. Kickoff conversion is its own guide. UK Firestick / Smart TV setup is its own guide. This page is the rugby map.",
          "Payment from the UK is card, PayPal or Wise — the rails already listed on the South African TV in the United Kingdom page — not a Capitec EFT you cannot originate from a UK current account.",
        ],
      },
      {
        id: "howto",
        h2: "10-minute path from a London WhatsApp to SuperSport Rugby",
        body: [
          "Use the site button so the chat is pre-filled. Replace the brackets. Do not send a passport photo.",
        ],
        steps: [
          {
            title: "Message +44 7307 410512",
            text: "Say you are in London, name the device (Firestick 4K, Samsung, LG, Hisense), and ask for the free 24-hour trial. Rugby + SA channels is enough.",
          },
          {
            title: "Load the trial on the TV you actually watch",
            text: "TiviMate on Firestick, IPTV Smarters on Samsung / LG / Hisense. Favourite SuperSport Rugby, Variety, Grandstand.",
          },
          {
            title: "Check the next Bok or URC slot on UK time",
            text: "Convert SAST → GMT/BST (see the kickoff guide). If no live ball, confirm the folder exists and the EPG row is populated.",
          },
          {
            title: "Pay only after the folders are real",
            text: "Same WhatsApp thread. Card, PayPal or Wise. Plans are the published ZAR terms — 1 / 3 / 6 / 12 months — not a UK contract.",
          },
        ],
      },
      {
        id: "rights",
        h2: "Categories, not licences",
        body: [
          "Mzansi Stream does not sell you the exclusive right to SuperSport, Sky Sports or TNT Sports. Those words on a box or a billboard are other companies' licences. What you get is a playlist with category folders. The dedicated categories-not-licences guide is the longer version. The trial is the proof.",
        ],
      },
      {
        id: "dead-seller",
        h2: "If your current playlist died while you were already abroad",
        body: [
          "A reseller who took a year up-front and vanished is a different problem from 'which folder is the Boks'. The switch-from-a-dead-seller guide covers credentials, overlapping trials, and what not to send in chat. Short version: do not wait for a Saturday Test to discover the M3U 401s.",
        ],
      },
    ],
    // Seo P1 6Q pack — locked verbatim (visible FAQ + FAQPage JSON-LD).
    faq: SPRINGBOKS_LONDON_P1_FAQ,
    relatedLinks: [
      { label: "Rugby kickoff times from London (SAST → GMT/BST)", href: "/en-za/blog/rugby-kickoff-times-london/" },
      { label: "Best IPTV setup in the UK — Firestick and Smart TV", href: "/en-za/blog/iptv-uk-firestick-smart-tv-sa-sports/" },
      { label: "South African TV in the United Kingdom", href: "/en-gb/sa-abroad/uk/" },
      { label: "Watch the Springboks live — South Africa guide", href: "/en-za/blog/watch-springboks-live-online/" },
      { label: "IPTV categories are not broadcast licences", href: "/en-za/blog/iptv-uk-categories-not-licences/" },
    ],
  },
  {
    slug: "iptv-uk-firestick-smart-tv-sa-sports",
    title: "Best IPTV setup in the UK for SA + rugby — Firestick and Smart TV",
    metaDescription:
      "Firestick and Smart TV setup in the UK for SuperSport, Springboks and SA channels. TiviMate vs Smarters, Virgin/BT Wi-Fi, 24h WhatsApp trial.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "The Firestick guide already on this site is a South African buyer's path (Takealot SKUs, Vumatel). This page is the UK living-room version: a stick from Amazon UK or a Curry's shelf, a Samsung or LG that came with the flat, Virgin or BT Wi-Fi, and a playlist that has to hold SuperSport Rugby and SABC on the same remote.",
    keyFacts: [
      "Firestick 4K / 4K Max + TiviMate is the cleanest UK lounge setup for 4K sport.",
      "Samsung Tizen, LG webOS and Hisense VIDAA use IPTV Smarters from the TV store — same Xtream/M3U as TiviMate.",
      "WhatsApp +44 7307 410512 sends the device-specific taps after you name the model.",
    ],
    cta: {
      label: "WhatsApp UK setup + 24h trial — +44 7307 410512 →",
      message:
        "Hi! I'm in the UK. Device: [Firestick 4K / Samsung / LG / Hisense]. ISP: [Virgin / BT / Sky / EE]. Please send the 24-hour trial and setup steps.",
      ref: "Blog-UK-Setup",
    },
    howTo: {
      name: "Set up Mzansi Stream on a UK Firestick or Smart TV",
      description:
        "Name the device on WhatsApp, load Xtream or M3U, favourite SuperSport Rugby and SABC, test on the lounge HDMI.",
      totalTime: "PT15M",
      supply: ["WhatsApp", "UK Wi-Fi (name the ISP)"],
      tool: ["Firestick 4K / 4K Max, or Samsung / LG / Hisense Smart TV"],
    },
    sections: [
      {
        id: "who",
        h2: "Who this setup page is for",
        body: [
          "South Africans in London, Manchester, Birmingham and the rest of the UK who already know they want SuperSport and SABC, and need the remote to work on Saturday. It is not the ZA Firestick pillar and not the 4K Max vs Lite shopping post.",
        ],
      },
      {
        id: "firestick",
        h2: "Firestick in the UK — TiviMate first",
        body: [
          "Buy the stick locally (Amazon UK, high-street electronics). We do not publish a live GBP price here — retail moves. You want 4K or 4K Max, not the oldest Lite, if Saturday rugby is the point.",
          "Enable apps from unknown sources only if you sideload TiviMate. Add the Xtream Codes or M3U we send on WhatsApp. TiviMate Premium (one-time in-app) is optional; one playlist is enough for a trial.",
        ],
        bullets: [
          "Settings → Playback → buffer 8 seconds before a 4K SuperSport Test.",
          "Force 5 GHz Wi-Fi. Ethernet via USB adapter if Virgin or BT stutters in the lounge.",
          "Favourite SuperSport Rugby, Variety, Grandstand, SABC 1/2/3, kykNET — or the remote drowns in 20,000+ categories.",
        ],
      },
      {
        id: "smart-tv",
        h2: "Samsung, LG, Hisense — skip the Firestick if the store app holds",
        body: [
          "UK flats often inherit a Samsung or LG. IPTV Smarters (or Smarters Lite on Tizen) takes the same login as TiviMate. The ZA Smart TV stutter guide still applies for screensaver and DNS habits; the ISP names change.",
          "If the TV store app is weak on 4K, a Firestick in the HDMI port is the usual upgrade — same playlist, better player. That is a setup choice, not a second subscription.",
        ],
      },
      {
        id: "folders",
        h2: "SA categories and UK sports categories on one remote",
        body: [
          "One pack. Two folders. 'SA' holds SuperSport, SABC, e.tv, kykNET. A separate 'UK sport' folder is only useful if those categories actually populate on your trial — confirm rather than assuming a Sky or TNT tile means a licence.",
        ],
      },
      {
        id: "howto",
        h2: "Setup checklist from a UK WhatsApp",
        body: [
          "Ten to fifteen minutes when the first message names the device.",
        ],
        steps: [
          {
            title: "WhatsApp the model and the ISP",
            text: "Firestick 4K Max / Samsung Q60 / LG C2 + Virgin / BT / Sky / EE. Ask for the 24-hour trial.",
          },
          {
            title: "Paste Xtream or M3U into TiviMate or Smarters",
            text: "We send the taps for that OS. Do not install a random APK from a drive link that is not in the same chat.",
          },
          {
            title: "Favourite rugby + SABC on the lounge TV",
            text: "If SuperSport Rugby is empty, stop and reply in the thread before you pay.",
          },
          {
            title: "Set buffer and 5 GHz",
            text: "Then leave it. Renewals stay in the same WhatsApp — +44 7307 410512.",
          },
        ],
      },
      {
        id: "not-za-guide",
        h2: "What we are not repeating from the SA Firestick pages",
        body: [
          "Takealot pricing, Vumatel peering, and Eskom load-shedding are SA problems. They have their own posts. This page stops at UK retail, UK Wi-Fi, and the two-folder remote.",
        ],
      },
    ],
    faq: [
      {
        q: "What is the best IPTV device in the UK for Springboks and SABC?",
        a: "Firestick 4K or 4K Max with TiviMate if you can add a stick. Samsung / LG / Hisense with IPTV Smarters if you will not. Same WhatsApp playlist.",
      },
      {
        q: "Does TiviMate work on a UK Firestick?",
        a: "Yes. Sideload or install as we describe in the chat. Buffer 8 seconds for 4K SuperSport.",
      },
      {
        q: "Can I use the Smart TV that came with a London rental?",
        a: "Usually. Name the brand on WhatsApp. If the store app cannot hold 4K, plug in a Firestick — do not buy a second subscription.",
      },
      {
        q: "Do I need a UK VPN for the Firestick?",
        a: "No VPN is shipped or required to start. A VPN is your choice if a network interferes.",
      },
      {
        q: "Virgin Media vs BT — which is better for this?",
        a: "Both work when the player is on 5 GHz or Ethernet. The buffering guide covers UK Wi-Fi. Line speed alone is not the metric.",
      },
      {
        q: "Can I run SA sport and a UK sports category on one Firestick?",
        a: "Yes — two favourite folders, one playlist. Confirm the UK folder on the trial. Categories are not exclusive licences.",
      },
      {
        q: "How do I get the setup steps?",
        a: "WhatsApp +44 7307 410512 with the exact model. The 24-hour trial includes the taps. No mailto.",
      },
    ],
    relatedLinks: [
      { label: "Watch the Springboks from London", href: "/en-za/blog/watch-springboks-from-london/" },
      { label: "IPTV buffering on UK Wi-Fi", href: "/en-za/blog/iptv-buffering-uk-wifi/" },
      { label: "Firestick IPTV setup — South Africa guide", href: "/en-za/iptv-firestick-south-africa/" },
      { label: "South African TV in the United Kingdom", href: "/en-gb/sa-abroad/uk/" },
      { label: "TiviMate vs IPTV Smarters Pro", href: "/en-za/blog/tivimate-vs-iptv-smarters-pro-2026/" },
    ],
  },
  {
    slug: "rugby-kickoff-times-london",
    title: "Rugby kickoff times in London — SAST to GMT and BST",
    metaDescription:
      "Convert SuperSport rugby kickoffs from SAST to London time. SAST is UTC+2 all year. 17:00 SAST = 15:00 GMT or 16:00 BST. No invented 2026 fixtures.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "The question from every South African in London is not 'is the Test on' — it is 'what time do I tell the pub'. South Africa stays on SAST (UTC+2) all year. The UK switches GMT and BST. This page is the conversion, not a fixture list we would have to invent.",
    keyFacts: [
      "SAST = UTC+2 with no daylight-saving change.",
      "UK winter (GMT, UTC+0): subtract 2 hours from SAST. UK summer (BST, UTC+1): subtract 1 hour.",
      "A 17:00 SAST SuperSport kickoff is 15:00 GMT or 16:00 BST.",
    ],
    cta: {
      label: "WhatsApp when the next Bok slot is — +44 7307 410512 →",
      message:
        "Hi! I'm in London. Please confirm the next Springboks / URC slot on UK time and send the 24-hour trial. Device: [Firestick / Smart TV].",
      ref: "Blog-Kickoff-London",
    },
    howTo: {
      name: "Convert a SuperSport rugby kickoff to London time",
      description:
        "Read the SAST time on the EPG, apply GMT (−2) or BST (−1), then favourite SuperSport Rugby before that local hour.",
      totalTime: "PT2M",
      supply: ["EPG or SuperSport listing in SAST"],
      tool: ["Phone clock set to Europe/London"],
    },
    sections: [
      {
        id: "rule",
        h2: "The only rule you need",
        body: [
          "Read the kickoff as SAST. If the UK is on GMT, subtract two hours. If the UK is on BST, subtract one hour. SAST does not spring forward or fall back.",
          "We do not publish a 2026 Test calendar here. Dates move; the offset does not. Confirm the next slot in the WhatsApp thread or on the EPG after the trial loads.",
        ],
      },
      {
        id: "table",
        h2: "Common SuperSport slots → London clock",
        body: [
          "These are clock conversions, not promises that a named fixture sits in that hour every week.",
        ],
        bullets: [
          "13:00 SAST → 11:00 GMT / 12:00 BST",
          "15:00 SAST → 13:00 GMT / 14:00 BST (typical URC / afternoon Test window)",
          "17:00 SAST → 15:00 GMT / 16:00 BST (late-afternoon Test)",
          "19:00 SAST → 17:00 GMT / 18:00 BST",
          "21:00 SAST → 19:00 GMT / 20:00 BST (evening kickoff stays prime time in London)",
        ],
      },
      {
        id: "when-uk-changes",
        h2: "When the UK clock changes",
        body: [
          "The UK uses BST from the last Sunday in March to the last Sunday in October, and GMT the rest of the year. South Africa does not follow that switch. The first weekend after a UK clock change is when diaspora group chats get the Test time wrong — apply the rule again, do not reuse last month's subtraction.",
        ],
      },
      {
        id: "super-rugby",
        h2: "Super Rugby Pacific and northern-hemisphere kickoffs",
        body: [
          "Super Rugby Pacific fixtures are set on NZ / AU clocks. Those land as UK mornings, not as SAST afternoon Tests. Convert from the competition's listed local time, not from SAST, unless the EPG already shows SAST.",
          "URC games in Ireland, Wales, Scotland or Italy are already on a European clock — often the same hour you would see in London, or one hour off. Do not subtract two hours from a Dublin listing.",
        ],
      },
      {
        id: "howto",
        h2: "Before Saturday — two minutes",
        body: [
          "Do this once per clock-change season.",
        ],
        steps: [
          {
            title: "Read the EPG time zone",
            text: "If the guide is SAST, use the table. If it already shows Europe/London, trust that row.",
          },
          {
            title: "Check whether the UK is on GMT or BST",
            text: "Phone clock region Europe/London is enough. Last Sunday March / October is the trap.",
          },
          {
            title: "Set a reminder on UK time",
            text: "Tell the group chat the London hour, not 'five o'clock SA time'.",
          },
          {
            title: "Open SuperSport Rugby ten minutes early",
            text: "Favourite the folder on Friday. The trial WhatsApp is +44 7307 410512 if the playlist is not loaded yet.",
          },
        ],
      },
      {
        id: "not-a-calendar",
        h2: "Why there is no scraped 2026 fixture grid",
        body: [
          "A fake calendar would violate the house rule against invented facts. World Rugby, URC and SuperSport publish lists; they change. This page stays useful in March and in October because it only teaches the offset.",
        ],
      },
    ],
    faq: [
      {
        q: "What time is 17:00 SAST in London?",
        a: "15:00 when the UK is on GMT, 16:00 when the UK is on BST. SAST never moves.",
      },
      {
        q: "Does South Africa use daylight saving?",
        a: "No. SAST stays UTC+2. Only the UK side of the subtraction changes.",
      },
      {
        q: "When does the UK switch between GMT and BST?",
        a: "Last Sunday in March (GMT → BST) and last Sunday in October (BST → GMT). Re-apply the offset that weekend.",
      },
      {
        q: "A URC game is listed as 15:00 in Dublin. Do I subtract two hours?",
        a: "No. That listing is already European. London is usually the same hour or one hour off — not a SAST conversion.",
      },
      {
        q: "Why is Super Rugby on in the morning in London?",
        a: "Super Rugby Pacific is NZ/AU local time. Morning UK is normal. It is not a 15:00 SAST Test.",
      },
      {
        q: "Will you text me the next Bok kickoff?",
        a: "WhatsApp +44 7307 410512 after the trial is loaded and we can read the same EPG you have. We will not invent a season list on this page.",
      },
      {
        q: "Does the playlist EPG show London time?",
        a: "Ask in the trial chat. Some guides stay SAST. If yours does, keep this table pinned.",
      },
    ],
    relatedLinks: [
      { label: "Watch the Springboks from London", href: "/en-za/blog/watch-springboks-from-london/" },
      { label: "Best IPTV setup in the UK", href: "/en-za/blog/iptv-uk-firestick-smart-tv-sa-sports/" },
      { label: "South African TV in the United Kingdom", href: "/en-gb/sa-abroad/uk/" },
      { label: "Watch the Springboks live — South Africa guide", href: "/en-za/blog/watch-springboks-live-online/" },
    ],
  },
  {
    slug: "iptv-buffering-uk-wifi",
    title: "IPTV buffering on UK Wi-Fi — London, Virgin, BT, Sky",
    metaDescription:
      "IPTV buffering in London on Virgin Media, BT, Sky or EE. Firestick buffer, 5 GHz, Ethernet. Different from the South Africa fibre guide. WhatsApp trial.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "The no-buffering pillar on this site is a NAPAfrica / Vumatel / Openserve document. It does not help a flat in Zone 2 on Virgin Media. This page is the UK Wi-Fi version: 5 GHz vs 2.4, Ethernet into the Firestick, player buffer, and when the playlist is the problem rather than the router.",
    keyFacts: [
      "Name the ISP (Virgin, BT, Sky, EE, TalkTalk) in the WhatsApp trial so support is not debugging Vumatel.",
      "5 GHz or Ethernet beats a '500 Mbps' sticker on 2.4 GHz.",
      "TiviMate / Smarters buffer 8 seconds before you blame the provider.",
    ],
    cta: {
      label: "WhatsApp a UK-line trial — +44 7307 410512 →",
      message:
        "Hi! IPTV will be on [Virgin / BT / Sky / EE] in [London / city]. Device: [Firestick / Smart TV]. Please send the 24-hour trial.",
      ref: "Blog-UK-Buffer",
    },
    howTo: {
      name: "Stop IPTV buffering on UK home Wi-Fi",
      description:
        "Move the stick to 5 GHz or Ethernet, raise the player buffer, then test SuperSport Rugby on the trial.",
      totalTime: "PT15M",
      supply: ["UK home Wi-Fi admin or the ISP app"],
      tool: ["Firestick or Smart TV", "Optional USB-Ethernet adapter"],
    },
    sections: [
      {
        id: "not-sa",
        h2: "Why the South Africa buffering guide is the wrong tab",
        body: [
          "That guide ranks NAPAfrica peering first because SA fibre often routes overseas. A London viewer is already next to the London edge the UK diaspora page already names (LON-1). Your first suspects are the ISP router, the 2.4 GHz band, and a 2-second player buffer — not Eskom.",
        ],
      },
      {
        id: "isps",
        h2: "Virgin, BT, Sky, EE, TalkTalk — what to tell WhatsApp",
        body: [
          "We do not publish invented peak-hour charts per UK ISP. We do need the name. A trial message that says 'UK Wi-Fi' wastes a round. 'Virgin in Hackney, Firestick 4K Max' is a diagnosis.",
        ],
        bullets: [
          "Virgin Media — often strong throughput; still put sport on 5 GHz or Ethernet if the lounge is far from the hub.",
          "BT / EE Smart Hub — split or rename 2.4 vs 5 GHz so the stick cannot roam to 2.4 mid-Test.",
          "Sky Broadband — same 5 GHz rule; avoid the TV and the stick fighting on the same congested band as a busy mesh node.",
          "TalkTalk and others — Ethernet is the tie-breaker when the app buffer is already at 8 seconds.",
        ],
      },
      {
        id: "fixes",
        h2: "Fixes in the order that actually works",
        body: [
          "Do these before you pay a new seller.",
        ],
        steps: [
          {
            title: "Put the Firestick or TV on 5 GHz",
            text: "Rename the bands in the router app. Connect to the 5 GHz name only.",
          },
          {
            title: "Raise the player buffer to 8 seconds",
            text: "TiviMate → Settings → Playback. Smarters → Player / time-shift buffer. The ZA app posts show the same taps.",
          },
          {
            title: "Ethernet if the lounge is a dead zone",
            text: "USB-Ethernet on a Firestick, or a cable into the Smart TV. Powerline is a fallback, not a miracle.",
          },
          {
            title: "Pause the console download",
            text: "Xbox / PS5 patches saturate a busy evening line. QoS if your hub has it.",
          },
          {
            title: "Then test SuperSport Rugby on the trial",
            text: "If Ethernet + 8-second buffer still dies on one category, reply in WhatsApp. If every category dies, the playlist is the suspect — see the dead-seller guide.",
          },
        ],
      },
      {
        id: "4k",
        h2: "4K vs 1080p on UK Wi-Fi",
        body: [
          "If 4K SuperSport stutters and 1080p holds, stay on 1080p for the Test and fix the radio later. That is not a new subscription. The 4K pillar is written for SA fibre; the principle (bitrate vs radio) is the same.",
        ],
      },
      {
        id: "mobile",
        h2: "Watching on EE or Vodafone 5G instead of home Wi-Fi",
        body: [
          "A phone hotspot will hold a match in a pinch. It is not a Saturday plan for a 4K lounge TV. If you are travelling, say so in the trial chat so nobody tunes a Firestick guide for a phone.",
        ],
      },
    ],
    faq: [
      {
        q: "Why does IPTV buffer on Virgin Media in London?",
        a: "Usually 2.4 GHz, a far lounge, or a 2-second player buffer — not 'Virgin is incompatible'. Move to 5 GHz or Ethernet and set an 8-second buffer.",
      },
      {
        q: "Is this the same as the South Africa no-buffering page?",
        a: "No. That page is NAPAfrica and SA fibre. This page is UK ISP Wi-Fi.",
      },
      {
        q: "Do I need a new router?",
        a: "Only after 5 GHz + Ethernet + buffer fail. We do not invent a UK SKU list here.",
      },
      {
        q: "Does Mzansi Stream peer in London?",
        a: "The UK diaspora page already names a London (LON-1) edge. We do not add unpublished PoP claims on this guide.",
      },
      {
        q: "Should I use a VPN to fix buffering?",
        a: "A VPN often adds latency. Try Ethernet and buffer first. We do not ship a VPN.",
      },
      {
        q: "Buffering on one rugby category only — what now?",
        a: "That is a feed/category issue. WhatsApp the channel name during the trial. If the whole pack dies, treat it as a dead playlist.",
      },
      {
        q: "How do I get a trial on my actual UK line?",
        a: "WhatsApp +44 7307 410512 with city, ISP and device. No card.",
      },
    ],
    relatedLinks: [
      { label: "Best IPTV setup in the UK", href: "/en-za/blog/iptv-uk-firestick-smart-tv-sa-sports/" },
      { label: "Watch the Springboks from London", href: "/en-za/blog/watch-springboks-from-london/" },
      { label: "Why IPTV buffers — South Africa fibre guide", href: "/en-za/blog/why-is-my-iptv-buffering-fix-2026/" },
      { label: "No-buffering pillar — South Africa", href: "/en-za/iptv-no-buffering-south-africa/" },
      { label: "Switch from a dead IPTV seller while abroad", href: "/en-za/blog/switch-iptv-seller-abroad-whatsapp/" },
    ],
  },
  {
    slug: "switch-iptv-seller-abroad-whatsapp",
    title: "Switch IPTV seller while abroad — 24h WhatsApp trial from the UK",
    metaDescription:
      "Dead IPTV seller while you are in the UK? 24-hour WhatsApp trial, what to send, what never to send, PayPal/Wise pay. No email. +44 7307 410512.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "The WhatsApp order walkthrough already on this blog assumes you are in South Africa with EFT and SnapScan. This page is the abroad version: the playlist 401'd on a Friday night in London, the old seller is gone, and you still want SuperSport Rugby tomorrow. 24-hour trial first. Pay on a rail you can actually use from the UK.",
    keyFacts: [
      "24-hour trial on WhatsApp +44 7307 410512 — no card, no mailto.",
      "Say you are abroad, name the city, the dead-app symptom, and the device. Do not send OTPs or ID.",
      "UK-reachable rails already published on diaspora pages: Visa, Mastercard, PayPal, Wise — not a ZA EFT you cannot originate.",
    ],
    cta: {
      label: "WhatsApp a 24h trial from abroad — +44 7307 410512 →",
      message:
        "Hi! I'm in [London / city]. My old IPTV playlist died. Device: [Firestick / Smart TV]. Please send the free 24-hour Mzansi Stream trial.",
      ref: "Blog-Switch-Abroad",
    },
    howTo: {
      name: "Replace a dead IPTV seller from the UK",
      description:
        "Leave the old app installed, load a Mzansi Stream trial playlist beside it, test SuperSport Rugby, then remove the dead login.",
      totalTime: "PT15M",
      supply: ["WhatsApp on the number you travel with"],
      tool: ["The same Firestick or Smart TV that still has the dead app"],
    },
    sections: [
      {
        id: "symptoms",
        h2: "Dead seller vs bad Wi-Fi vs empty rugby folder",
        body: [
          "Empty EPG on one category is not a dead seller. Every channel 401 / 'cannot play this stream' after a month that used to work usually is. UK Wi-Fi stutter that dies on Ethernet is a radio problem — use the UK buffering guide first.",
        ],
      },
      {
        id: "first-message",
        h2: "The first WhatsApp from abroad",
        body: [
          "A complete first bubble gets a trial instead of a quiz. Four facts.",
        ],
        bullets: [
          "City — London, Manchester, Dubai, Sydney. Not 'overseas'.",
          "Device — Firestick 4K, Samsung Tizen, LG, Hisense, iPhone.",
          "Symptom — 'M3U expired', 'seller ghosted', or 'new setup'.",
          "What you need tomorrow — Springboks / URC / SABC / kykNET.",
        ],
      },
      {
        id: "do-not-send",
        h2: "What you never send — even when you are desperate for Saturday",
        body: [
          "The ZA order guide already bans ID books and card photos. Abroad, people also send passport scans 'for geo verification'. Mzansi Stream does not need that to activate a trial.",
        ],
        bullets: [
          "No passport, BRP, or driver's licence photos.",
          "No bank OTP, WhatsApp two-factor codes, or CVV.",
          "No payment to a personal name that does not match the invoice in the same thread.",
          "No second app from a random APK the old seller mailed you last year.",
        ],
      },
      {
        id: "howto",
        h2: "Overlap the trial — do not wipe the dead app first",
        body: [
          "If Saturday is close, keep the old playlist sitting there until the new one plays SuperSport Rugby. Then delete the dead login.",
        ],
        steps: [
          {
            title: "WhatsApp +44 7307 410512",
            text: "Use the site button or wa.me/447307410512. Ask for the 24-hour trial. No card.",
          },
          {
            title: "Add a second playlist in TiviMate / Smarters",
            text: "Do not overwrite the old one until rugby plays. TiviMate Premium helps if you need two lists; a second Smarters profile also works.",
          },
          {
            title: "Test SuperSport Rugby and one SABC channel on the lounge TV",
            text: "Phone-only tests lie. If the folder is empty, reply in the same thread.",
          },
          {
            title: "Pay on a UK-reachable rail",
            text: "Card, PayPal or Wise after the trial. Published ZAR plans — 1 / 3 / 6 / 12 months. No auto-renew DStv contract.",
          },
          {
            title: "Remove the dead seller login",
            text: "Pin the Mzansi Stream chat. Renewals happen here, not by email.",
          },
        ],
      },
      {
        id: "pay",
        h2: "Paying from the UK (and other diaspora cities)",
        body: [
          "The South African TV abroad pages already list Visa, Mastercard, PayPal, Apple Pay, Google Pay and Wise. EFT / SnapScan / Ozow remain for people who still have a ZA account. Do not let a dead seller talk you into anonymous crypto as the only path.",
        ],
      },
      {
        id: "legal",
        h2: "You are switching a playlist, not buying a licence",
        body: [
          "A new M3U is not an exclusive SuperSport or Sky contract. Read the categories-not-licences guide if that distinction is why you hesitated. Soft version: trial the folders, then pay.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I get a 24-hour IPTV trial on WhatsApp from the UK?",
        a: "Yes. WhatsApp +44 7307 410512. Device + city + '24-hour trial'. No card. No mailto.",
      },
      {
        q: "My seller vanished and the Test is tomorrow. What first?",
        a: "Request the trial now. Load it as a second playlist. Do not factory-reset the Firestick before rugby plays.",
      },
      {
        q: "Can I pay with a UK card or PayPal?",
        a: "Yes — card, PayPal and Wise are already listed on the SA-abroad pages. ZA EFT is optional if you still have that account.",
      },
      {
        q: "Should I email support instead?",
        a: "No. Conversion on this site is WhatsApp only. There is no published mailto for activation.",
      },
      {
        q: "Do you need my passport because I am not in South Africa?",
        a: "No. Do not send ID. City, device and the folders you care about are enough.",
      },
      {
        q: "What if only rugby is dead and Netflix-style VOD still works?",
        a: "That can be a single category outage. Message the channel name. If the seller never replies, treat the whole login as dead.",
      },
      {
        q: "Is the trial the full pack?",
        a: "Ask for the full pack and confirm SuperSport Rugby + SABC on the lounge TV. A sports-only teaser is not a test of kykNET.",
      },
    ],
    relatedLinks: [
      { label: "Watch the Springboks from London", href: "/en-za/blog/watch-springboks-from-london/" },
      { label: "Order IPTV on WhatsApp — South Africa walkthrough", href: "/en-za/blog/order-iptv-whatsapp-south-africa/" },
      { label: "IPTV categories are not broadcast licences", href: "/en-za/blog/iptv-uk-categories-not-licences/" },
      { label: "South African TV in the United Kingdom", href: "/en-gb/sa-abroad/uk/" },
      { label: "IPTV buffering on UK Wi-Fi", href: "/en-za/blog/iptv-buffering-uk-wifi/" },
    ],
  },
  {
    slug: "iptv-uk-categories-not-licences",
    title: "IPTV in the UK — categories, not exclusive licences (soft FAQ)",
    metaDescription:
      "IPTV playlists list channel categories, not Sky, TNT or SuperSport exclusive licences. Soft legality FAQ for SA rugby fans in the UK. 24h WhatsApp trial.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "Diaspora buyers ask a fair question: 'are you selling me Sky? SuperSport? TNT?' The honest soft answer: an IPTV playlist is a list of category folders. It is not a transfer of exclusive broadcast rights. This page is that distinction for people watching from the UK. It is not UK legal advice and it is not the South Africa Copyright Act pillar.",
    keyFacts: [
      "A folder named SuperSport Rugby or a UK sports category is a label in a playlist — not an exclusive licence we can sell you.",
      "Confirm the folders you care about on a 24-hour trial. If they are empty, walk away.",
      "The SA legal pillar remains the ZA law page. This page does not invent Ofcom rulings.",
    ],
    cta: {
      label: "Trial the folders on WhatsApp — +44 7307 410512 →",
      message:
        "Hi! I want the 24-hour trial to confirm SuperSport Rugby / SA categories from [London / city]. Device: [Firestick / Smart TV]. I understand this is categories, not exclusive licences.",
      ref: "Blog-Categories-UK",
    },
    howTo: {
      name: "Verify IPTV categories on a UK trial",
      description:
        "Request a 24-hour trial, open the named folders, and only pay if SuperSport Rugby and your SA channels populate.",
      totalTime: "PT10M",
      supply: ["WhatsApp"],
      tool: ["Firestick or Smart TV"],
    },
    sections: [
      {
        id: "plain",
        h2: "Plain language — what you are buying",
        body: [
          "You are buying access to a playlist and support on WhatsApp. You are not buying SuperSport's exclusive SA rights, Sky's UK rights, or TNT Sports' club-rugby rights. Those licences sit with those companies. We will not claim otherwise to win a Saturday.",
        ],
      },
      {
        id: "why-it-matters",
        h2: "Why diaspora rugby fans hit this question",
        body: [
          "In London you already see Sky and TNT brands on buses. A seller who says 'we are the official SuperSport in the UK' is making a claim this site will not copy. The useful question is: does the SuperSport Rugby category play on your Firestick during the trial?",
        ],
      },
      {
        id: "what-we-do-not-claim",
        h2: "Claims you will not find on these pages",
        body: [
          "No exclusive UK rights. No 'official broadcaster' badge. No fabricated court outcomes. No AggregateRating. No invented subscriber counts.",
        ],
        bullets: [
          "We do not sell Sky, TNT Sports, or SuperSport licences.",
          "We do not tell you IPTV is 'fully licensed everywhere' as a slogan.",
          "We do not give UK solicitor advice. If you need that, hire one.",
          "The South Africa legal pillar covers ZA copyright / POPIA framing — different country, different page.",
        ],
      },
      {
        id: "howto",
        h2: "How to use the distinction on Saturday",
        body: [
          "Treat the trial as a folder audit.",
        ],
        steps: [
          {
            title: "Write the three folders you actually need",
            text: "Example: SuperSport Rugby, SABC 2, kykNET. Optional: a UK club-rugby category.",
          },
          {
            title: "WhatsApp the trial",
            text: "+44 7307 410512. Name the folders. No card.",
          },
          {
            title: "Open each folder on the lounge TV",
            text: "Empty tile = not your product, even if a logo looks familiar.",
          },
          {
            title: "Pay only for a pack that showed those categories",
            text: "Same chat. Card / PayPal / Wise. Pin the thread.",
          },
        ],
      },
      {
        id: "vpn",
        h2: "VPN, geo-blocks, and what we will not do",
        body: [
          "Mzansi Stream does not ship a VPN. If a network or a feed behaves badly from the UK, a VPN is your decision — the same sentence already used on the SA legal pages. We will not coach you to 'bypass' a named UK rightsholder.",
        ],
      },
      {
        id: "next",
        h2: "Where to go next",
        body: [
          "If you wanted the Bok map, use the London Springboks FAQ. If the old seller died, use the abroad switch guide. If you wanted ZA statute language, use Is IPTV legal in South Africa.",
        ],
      },
    ],
    faq: [
      {
        q: "Does Mzansi Stream sell exclusive SuperSport or Sky rights?",
        a: "No. We sell a playlist with category folders plus WhatsApp setup. Exclusive licences stay with those brands.",
      },
      {
        q: "Is IPTV legal in the UK?",
        a: "No — we don’t offer or market “free illegal streams,” and we never claim “100% legal streams of [network/event].” IPTV technology is legal; licensing, rights, and blackouts still apply. This page is not UK legal advice and does not invent an Ofcom ruling. Trial first, keep expectations honest, then decide. Read the SA legal pillar for ZA law only.",
      },
      {
        q: "Why do folders use brand names then?",
        a: "That is how viewers find sport in a 20,000+ list. A label is still not a licence we can transfer to you.",
      },
      {
        q: "What if a competitor claims official UK rights?",
        a: "We will not copy that claim. Ask them to show the licence. Ask us to show the folder on a 24-hour trial.",
      },
      {
        q: "Can I watch Springboks from London without you claiming SuperSport exclusivity?",
        a: "Yes — that is the point of the London rugby FAQ. Trial SuperSport Rugby. No exclusive-rights slogan.",
      },
      {
        q: "Do I need a VPN to make it 'legal'?",
        a: "We do not ship a VPN and we do not sell legality-via-VPN. A VPN is a personal network choice.",
      },
      {
        q: "Where is the South Africa legal write-up?",
        a: "The pillar 'Is IPTV legal in South Africa' and the 2026 blog post. Those pages are ZA. This page is the diaspora soft framing.",
      },
      {
        q: "How do I start without emailing a lawyer or the company?",
        a: "WhatsApp +44 7307 410512 for the 24-hour trial. No mailto on this conversion path.",
      },
    ],
    relatedLinks: [
      { label: "Watch the Springboks from London", href: "/en-za/blog/watch-springboks-from-london/" },
      { label: "Is IPTV legal in South Africa? — 2026 pillar", href: "/en-za/is-iptv-legal-south-africa/" },
      { label: "Switch from a dead IPTV seller while abroad", href: "/en-za/blog/switch-iptv-seller-abroad-whatsapp/" },
      { label: "South African TV in the United Kingdom", href: "/en-gb/sa-abroad/uk/" },
      { label: "Is Mzansi Stream legit? — 2026 answer", href: "/en-za/blog/is-mzansi-stream-legit-2026/" },
    ],
  },
];

export const BLOG_DIASPORA_SLUGS: readonly string[] = BLOG_DIASPORA.map(
  (g) => g.slug
);
