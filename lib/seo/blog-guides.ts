// lib/seo/blog-guides.ts
// Long-form buyer guides (run-005). New slugs only — do not reuse live
// blog or pillar paths. English body; en-za is the indexed primary.
// run-006: DStv soft-sell MID/END is injected by the blog template for
// BLOG_GUIDE_SLUGS — do not duplicate that copy in section bodies.

import type { BlogPost } from "./blog-posts";

const PUB = "2026-09-05";

export const BLOG_GUIDES: BlogPost[] = [
  {
    slug: "order-iptv-whatsapp-south-africa",
    title: "How to order IPTV on WhatsApp in South Africa — 2026 walkthrough",
    metaDescription:
      "Order IPTV on WhatsApp in South Africa: what to send, what not to send, EFT/SnapScan/Ozow payment, and the 10-minute activation checklist.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "In South Africa, a serious IPTV order happens on WhatsApp — not a web checkout and not an email thread. This walkthrough is the exact chat ritual: the first message that gets you a 24-hour trial, the payment proof that clears, the credentials you should receive, and the five things you should never paste into the chat.",
    keyFacts: [
      "Mzansi Stream activates on WhatsApp, usually within 10 minutes of a clear first message.",
      "Pay with EFT, SnapScan, Zapper, Ozow, Capitec Pay, Yoco, Visa, Mastercard or PayPal after the trial — not by mailing a card number.",
      "You should receive an M3U link or Xtream Codes login plus a device-specific setup note. If you only get a random APK, walk away.",
    ],
    cta: {
      label: "Start the WhatsApp order — free 24h trial →",
      message:
        "Hi! I want to order Mzansi Stream on WhatsApp. Device: [Firestick / Samsung / LG / Hisense / iPhone]. City: [e.g. Johannesburg]. Please send the free 24-hour trial.",
      ref: "Blog-WA-Order",
    },
    howTo: {
      name: "Order Mzansi Stream on WhatsApp",
      description:
        "Send a complete first message, test the 24-hour trial, pay on a local rail, and load the playlist on your device.",
      totalTime: "PT10M",
      supply: [
        "WhatsApp on a phone that can receive files",
        "A local payment method (EFT, SnapScan, Ozow, Capitec Pay, or card)",
      ],
      tool: ["Smart TV, Firestick, phone, MAG box or PC"],
    },
    sections: [
      {
        id: "why-whatsapp",
        h2: "Why IPTV in South Africa is ordered on WhatsApp",
        body: [
          "A web form cannot see your TV model, your fibre ISP, or whether you are sitting in Soweto on Vumatel or in a res on campus Wi-Fi. WhatsApp can. The same thread that takes the order also ships the M3U, the Xtream Codes login, the EPG URL and the one-page setup for that exact device.",
          "Mzansi Stream does not ask you to email a credit-card photo or open a ticket on a foreign helpdesk. The conversion path on iptvmzansi.com is WhatsApp only — the site buttons open a pre-filled chat so the first message is already useful.",
        ],
      },
      {
        id: "first-message",
        h2: "What to put in the first message",
        body: [
          "A complete first message gets you a trial instead of a round of clarifying questions. Four facts are enough.",
        ],
        bullets: [
          "Device: Firestick 4K Max, Samsung Tizen, LG webOS, Hisense VIDAA, iPhone, Android, MAG, or PC.",
          "City or suburb — so support can sanity-check fibre vs LTE if the trial buffers.",
          "ISP if you know it (Vumatel, Openserve, Frogfoot, Octotel, MetroFibre, Rain, Vodacom, MTN).",
          "What you want today: 24-hour trial, or a 1 / 3 / 6 / 12-month plan after you have already tested.",
        ],
      },
      {
        id: "templates",
        h2: "Copy-paste WhatsApp templates",
        body: [
          "Use one of these as the first bubble. Replace the brackets. Do not add ID numbers or card details.",
        ],
        bullets: [
          "Trial: “Hi! I want the free 24-hour Mzansi Stream trial. Device: [Samsung 55Q60 / Firestick 4K Max]. City: [Pretoria]. ISP: [Openserve].”",
          "Paid after trial: “Trial worked on the lounge TV. I want the 12-month plan. Please send EFT / SnapScan / Ozow details.”",
          "Second screen: “Please add a second connection for the bedroom Firestick. Same account.”",
        ],
      },
      {
        id: "do-not-send",
        h2: "What you should never send in the chat",
        body: [
          "WhatsApp is convenient. It is also a file inbox. Treat it like a till point, not a folder of your life.",
        ],
        bullets: [
          "Never send a photo of your ID book, passport or driver's licence unless a licensed business has a written POPIA reason — Mzansi Stream does not need that to activate a playlist.",
          "Never send a bank OTP, WhatsApp two-factor code, or the CVV on the back of a card.",
          "Never pay a 'verification fee' to a personal FNB/Capitec name that does not match the invoice in the same thread.",
          "If a seller only accepts anonymous crypto via Telegram and will not publish terms, that is a different risk profile — walk away.",
        ],
      },
      {
        id: "pay",
        h2: "How payment works after the chat",
        body: [
          "On Mzansi Stream you can test for 24 hours with no card. When you are ready, the same WhatsApp thread sends local rails already listed on the site: EFT, SnapScan, Zapper, Ozow, Capitec Pay, Yoco, Visa, Mastercard, PayPal. Bitcoin is listed as an option; it is not required.",
          "Plans are billed once per term — R199 for 1 month, R449 for 3 months, R699 for 6 months, R1,199 for 12 months (R99.92/month effective on the year). There is no auto-renewal contract in the DStv sense. Proof of payment in the same chat is enough; you should not need to mail anything.",
        ],
      },
      {
        id: "you-receive",
        h2: "What a complete activation looks like",
        body: [
          "A complete reply is boring on purpose. You want credentials and a setup note, not a mystery APK from a random drive link.",
        ],
        bullets: [
          "M3U playlist URL, or Xtream Codes (server URL + username + password).",
          "EPG / XMLTV URL if the playlist does not embed the guide.",
          "A short setup path for your device (TiviMate, Smarters, MAG portal, or Smart TV store app).",
          "A human still on the thread if SuperSport PSL is blank at 15:00 on Saturday.",
        ],
      },
      {
        id: "howto",
        h2: "10-minute activation checklist",
        body: [
          "This is the full path from a cold WhatsApp to a live SuperSport channel. Most households finish inside ten minutes when the first message is complete.",
        ],
        steps: [
          {
            title: "Open the site WhatsApp button",
            text: "Use the button on iptvmzansi.com so the chat is pre-filled. Add your device, city and ISP. Ask for the free 24-hour trial.",
          },
          {
            title: "Load the trial on the TV you actually watch",
            text: "Paste the M3U or Xtream login into TiviMate, IPTV Smarters Pro or the Smart TV app. Test SuperSport PSL and one entertainment channel on the lounge screen — not only on your phone.",
          },
          {
            title: "Pay on a local rail in the same thread",
            text: "Pick 1 / 3 / 6 / 12 months. Send proof of EFT, SnapScan, Ozow or card in the same WhatsApp. Do not send OTPs or card photos.",
          },
          {
            title: "Confirm the paid credentials",
            text: "If the trial login becomes the paid login, say so in the chat. If you receive a new M3U, replace the playlist and refresh EPG.",
          },
          {
            title: "Save the chat",
            text: "Pin the Mzansi Stream thread. Renewals, extra connections and EPG resyncs happen here — not by email.",
          },
        ],
      },
      {
        id: "after",
        h2: "Renewals, extra TVs and when to message again",
        body: [
          "Before the term ends, send “renew 12-month” in the same chat. For a second TV, ask for an extra connection and name the new device. If the EPG goes empty after a Firestick crash, ask for the XMLTV URL again rather than re-ordering a new subscription.",
          "If you are still deciding between DStv Premium at R899/month and a once-off R1,199 year, run the Saturday trial during a SuperSport fixture. That is the only honest test.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I order Mzansi Stream without a credit card?",
        a: "Yes. Request the 24-hour trial on WhatsApp with no card. To pay later, use EFT, SnapScan, Zapper, Ozow, Capitec Pay or Yoco — card is optional.",
      },
      {
        q: "How fast is WhatsApp activation?",
        a: "A complete first message is usually live within 10 minutes. Peak Saturday afternoons can take longer; stay in the same thread.",
      },
      {
        q: "Do I need to email anything?",
        a: "No. Mzansi Stream does not use mailto checkout. Payment proof and credentials stay on WhatsApp.",
      },
      {
        q: "What if the trial buffers on my fibre?",
        a: "Tell us the ISP and whether the TV is on 5 GHz Wi-Fi or Ethernet. That is a routing or router issue more often than a 'slow line'. See the buffering and Wi-Fi guides.",
      },
      {
        q: "Can I add a second device later?",
        a: "Yes. Message the same chat with the new device name. Multi-screen plans are arranged on WhatsApp — do not share one login across the whole house if you were sold a single connection.",
      },
      {
        q: "Is the WhatsApp number on the website the only one I should use?",
        a: "Yes. Use the buttons on iptvmzansi.com. If a forwarded chat asks you to pay a different personal account with no invoice, stop.",
      },
    ],
    relatedLinks: [
      { label: "Pay via EFT, SnapScan, Ozow & Capitec Pay", href: "/en-za/iptv-eft-snapscan-payment/" },
      { label: "IPTV on multiple devices", href: "/en-za/blog/iptv-multiple-devices-south-africa/" },
      { label: "Switch from DStv in one weekend", href: "/en-za/blog/switch-from-dstv-to-iptv-weekend/" },
      { label: "Pricing — from R99/mo", href: "/en-za/" },
    ],
  },
  {
    slug: "iptv-multiple-devices-south-africa",
    title: "IPTV on multiple devices in South Africa — household connections 2026",
    metaDescription:
      "How IPTV connections work in a South African household — lounge TV, bedroom Firestick, phone, and what to ask for on WhatsApp.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "A South African household is rarely one screen. Granny wants kykNET on the Hisense, the kids want a Firestick in the bedroom, and someone will open SuperSport PSL on a phone when the inverter holds the lights but not the decoder. This guide explains what a 'connection' actually means, how to add a second device without breaking the first, and what to tell WhatsApp so you are not sold one login for four simultaneous streams.",
    keyFacts: [
      "One plan can cover more than one device — ask WhatsApp for the connection count before you pay.",
      "Do not paste the same Xtream password onto every TV if you were sold a single connection.",
      "During load shedding, phones hop to LTE while the lounge TV dies with the ONT — plan the fallback device, not just the fallback decoder.",
    ],
    cta: {
      label: "Ask WhatsApp for a multi-device plan →",
      message:
        "Hi! I need Mzansi Stream on more than one device. Devices: [lounge TV] + [bedroom Firestick] + [phone]. Please confirm connections and send the 24h trial.",
      ref: "Blog-Multi-Device",
    },
    howTo: {
      name: "Add a second IPTV device on Mzansi Stream",
      description:
        "Confirm your connection count on WhatsApp, load the second playlist, and test both screens during the same fixture.",
      totalTime: "PT15M",
      supply: ["Active Mzansi Stream account", "Second device on the same or a backup network"],
      tool: ["TiviMate, IPTV Smarters Pro, or the Smart TV store app"],
    },
    sections: [
      {
        id: "connection",
        h2: "What an IPTV 'connection' actually is",
        body: [
          "A connection is a simultaneous stream slot — not a physical HDMI cable. If two TVs play live SuperSport at the same moment, that is two connections. If you pause the lounge TV and open the same channel on your phone, many providers still count that as one slot once the first stream is released.",
          "Mzansi Stream's comparison copy already states the default: one connection per plan, with multi-screen plans available. The honest move is to name every screen in the WhatsApp order so the slot count matches the house, not a guess.",
        ],
      },
      {
        id: "households",
        h2: "Three typical South African households",
        body: [
          "These are patterns we see in the chat — not invented user counts. Match the one that looks like your lounge.",
        ],
        bullets: [
          "Township / suburb family: one Smart TV on fibre + one phone for late PSL. Often one connection is enough if nobody watches two live matches at once.",
          "Two-lounge house: Hisense in the dining room + Firestick on the bedroom TV. Ask for two connections before Saturday's 15:00 kick-off.",
          "Split household: parents in Joburg, student in a res. That is two locations and two networks — treat it as two connections and say so on WhatsApp.",
        ],
      },
      {
        id: "devices",
        h2: "Which device should be the 'primary' screen",
        body: [
          "Put the most reliable player on the screen that must not fail during a derby. On Firestick and Android TV that is TiviMate. On Samsung / LG / Hisense that is usually IPTV Smarters from the TV store. Phones are the backup, not the primary, unless load shedding has already killed the ONT.",
          "A MAG box is a good second screen for a parent who only wants the remote to work like DStv. We whitelist the MAC on WhatsApp — do not 'share' a Firestick M3U onto a MAG portal and hope.",
        ],
      },
      {
        id: "load-shed-hop",
        h2: "When load shedding hops the household onto two networks",
        body: [
          "Fibre ONTs die when the estate inverter does not cover the DB board that feeds the router. The phone stays on LTE. Suddenly the 'one connection' house is trying to watch the same match on a dying Smart TV and a live hotspot.",
          "Decide the fallback screen in advance. If the lounge TV is on an inverter but the ONT is not, a Firestick on phone hotspot is more useful than a second Smart TV app. The load-shedding guide covers the power order; this page is about not burning two slots by accident.",
        ],
      },
      {
        id: "howto",
        h2: "How to add a second device without breaking the first",
        body: [
          "Do this on a weeknight if you can, then re-test both screens during a SuperSport fixture.",
        ],
        steps: [
          {
            title: "List the screens in WhatsApp",
            text: "Name each device (lounge Samsung, bedroom Firestick, iPhone). Ask how many simultaneous connections that plan includes.",
          },
          {
            title: "Load the second playlist as a new profile",
            text: "In TiviMate use a second playlist slot if you have Premium. In Smarters, add a new user profile rather than overwriting the lounge login.",
          },
          {
            title: "Play two live channels at once",
            text: "Open SuperSport PSL on screen A and an entertainment channel on screen B. If one kicks the other off, you still have a single slot — message WhatsApp before you pay for a year.",
          },
          {
            title: "Pin the thread",
            text: "When a phone is replaced or a MAG is reset, the MAC or playlist changes. The same WhatsApp thread is the record — not an email inbox.",
          },
        ],
      },
      {
        id: "dont",
        h2: "What does not work",
        body: [
          "Sharing one Xtream password in a family WhatsApp group looks cheap and then fails on a Soweto Derby. Reselling your login is also how accounts get banned. If a cousin in Durban needs SuperSport, they need their own order — the SADC pages exist for a reason.",
        ],
      },
    ],
    faq: [
      {
        q: "How many devices can I use with Mzansi Stream?",
        a: "The default plan is one simultaneous connection. Multi-screen plans are arranged on WhatsApp — list every TV and phone before you pay.",
      },
      {
        q: "Can I watch on my phone and the TV at the same time?",
        a: "Only if your plan includes two connections. Sequential use (TV off, then phone) is usually fine on a single slot.",
      },
      {
        q: "Does a Firestick plus a Smart TV need two subscriptions?",
        a: "Not always. It needs two connections if both play live at once. Ask in the order chat; do not assume.",
      },
      {
        q: "Can I use the same M3U on a MAG box?",
        a: "MAG boxes typically need a portal + MAC whitelist, not a pasted M3U. Send the MAG MAC on WhatsApp instead of cloning the Firestick playlist.",
      },
      {
        q: "What happens if we exceed the connection limit?",
        a: "The newest stream usually kicks the oldest off, or the player shows a connection error. Message support rather than creating a second pirate-style account.",
      },
      {
        q: "Is there a family plan price on the website?",
        a: "Published plans are 1 / 3 / 6 / 12 months for the full channel pack. Extra connections are confirmed in the WhatsApp thread so the quote matches your screens.",
      },
    ],
    relatedLinks: [
      { label: "Order IPTV on WhatsApp — walkthrough", href: "/en-za/blog/order-iptv-whatsapp-south-africa/" },
      { label: "IPTV during load shedding", href: "/en-za/blog/iptv-load-shedding-south-africa/" },
      { label: "TiviMate setup — South Africa", href: "/en-za/blog/tivimate-setup-south-africa-2026/" },
      { label: "Firestick IPTV pillar", href: "/en-za/iptv-firestick-south-africa/" },
    ],
  },
  {
    slug: "tivimate-setup-south-africa-2026",
    title: "TiviMate setup in South Africa — playlist, EPG and 4K SuperSport",
    metaDescription:
      "Install TiviMate for IPTV in South Africa: Downloader on Firestick, Xtream login, XMLTV EPG, and the buffer setting for 4K SuperSport.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "TiviMate is the player we recommend on Firestick and Android TV in South Africa — not because it is trendy, but because the remote layout, 7-day EPG and buffer control survive a SuperSport 4K bitrate spike. This is the install path from a WhatsApp M3U to a stable PSL picture, including the XMLTV step most generic TiviMate blogs skip.",
    keyFacts: [
      "TiviMate is for Firestick, Android TV and Nvidia Shield — not iPhone and not Samsung Tizen.",
      "Use Xtream Codes if we sent them; otherwise paste the M3U URL from WhatsApp with no trailing space.",
      "Raise the playback buffer to 8 seconds for 4K SuperSport. The factory 2-second buffer is why corners look like they 'stick'.",
    ],
    cta: {
      label: "Get the TiviMate playlist on WhatsApp →",
      message:
        "Hi! I want Mzansi Stream on TiviMate. Device: [Firestick 4K Max / Android TV]. Please send Xtream or M3U + EPG and the free 24h trial.",
      ref: "Blog-TiviMate-Setup",
    },
    howTo: {
      name: "Set up TiviMate with Mzansi Stream",
      description:
        "Sideload TiviMate on Firestick or install from Play Store on Android TV, add the WhatsApp playlist, set EPG and the 8-second buffer.",
      totalTime: "PT10M",
      supply: ["Mzansi Stream M3U or Xtream Codes from WhatsApp", "Home Wi-Fi or Ethernet"],
      tool: ["Firestick 4K / Android TV", "Downloader app (Firestick)", "TiviMate"],
    },
    sections: [
      {
        id: "where",
        h2: "Where TiviMate belongs (and where it does not)",
        body: [
          "Install TiviMate on Amazon Firestick, Fire TV, Android TV boxes and Google TV (Sony Bravia, Chromecast with Google TV). That is the gold path for 4K SuperSport.",
          "Do not hunt for TiviMate on iPhone, iPad or Samsung Tizen — it is not there. Those households use IPTV Smarters Player. The app-comparison post covers the three-way choice; this page is only the TiviMate install.",
        ],
      },
      {
        id: "firestick",
        h2: "Firestick path: Downloader, then TiviMate",
        body: [
          "On Firestick, enable Apps from Unknown Sources, install Downloader from the Amazon Appstore, and sideload TiviMate. The Firestick pillar on this site walks the same sequence. When TiviMate opens, you add a playlist — you do not type a South African 'activation code' from a Facebook ad.",
          "TiviMate Premium is a once-off player licence (the site already quotes the R150–R199 band). It unlocks extra playlists, recording and a cleaner EPG. The free tier is enough for one Mzansi Stream playlist.",
        ],
      },
      {
        id: "playlist",
        h2: "M3U vs Xtream Codes — use what WhatsApp sent",
        body: [
          "If the chat contains a server URL, username and password, choose 'Xtream Codes' / login with API. If it contains a single https://…/get.php?… link, choose M3U URL. Do not mix them. Do not add a space at the end of the URL — Firestick's remote loves trailing spaces and then the channel list is empty.",
        ],
      },
      {
        id: "epg",
        h2: "EPG: the XMLTV URL most people skip",
        body: [
          "A playlist without a guide is just a channel dump. If the EPG is empty after the first load, open the playlist settings and paste the XMLTV URL from the same WhatsApp message. Wait a minute. If it is still empty, send 'EPG empty on TiviMate' in the thread — we resend the guide URL rather than pretending the player is broken.",
        ],
      },
      {
        id: "buffer",
        h2: "The SuperSport 4K buffer setting",
        body: [
          "TiviMate ships with a short playback buffer. That is fine for 1080p news. It is tight for 4K SuperSport when a corner kick spikes the bitrate. Set Settings → Playback → Buffer Size to 8 seconds. Channel-change delay grows slightly; Saturday re-buffers drop for most Vumatel / Openserve / Frogfoot lines.",
          "If it still hitch-hikes, the cause is usually the ISP router or 2.4 GHz Wi-Fi — not TiviMate. Use the buffering guide and the Wi-Fi 6 guide before you blame the playlist.",
        ],
      },
      {
        id: "howto",
        h2: "TiviMate setup steps",
        body: [
          "Do this once. After that, TiviMate remembers the playlist across Firestick reboots.",
        ],
        steps: [
          {
            title: "Install TiviMate",
            text: "Android TV: Play Store → TiviMate. Firestick: Downloader → sideload TiviMate after enabling unknown sources.",
          },
          {
            title: "Add the Mzansi Stream playlist",
            text: "Add playlist → Xtream Codes or M3U URL → paste exactly what WhatsApp sent. Name it 'Mzansi Stream' so you can find it later.",
          },
          {
            title: "Attach the EPG",
            text: "If the guide is empty, paste the XMLTV URL from WhatsApp and update EPG. Wait 60 seconds.",
          },
          {
            title: "Set the 8-second buffer",
            text: "Settings → Playback → Buffer Size → 8 seconds. Then open SuperSport PSL or SuperSport Premier League in 4K.",
          },
          {
            title: "Favourite the sport folders",
            text: "Star SuperSport PSL, Premier League, Rugby and Cricket so Saturday nights are two clicks, not a scroll through 20,000+ channels.",
          },
        ],
      },
      {
        id: "after",
        h2: "When TiviMate is the wrong fix",
        body: [
          "If every channel is black, the playlist expired — message WhatsApp, do not reinstall TiviMate. If only 4K SuperSport fails while SABC is fine, that is bandwidth or Wi-Fi. If the app itself will not open, clear cache or soft-restart the Firestick (the Firestick fix post lists the button combo).",
        ],
      },
    ],
    faq: [
      {
        q: "Is TiviMate free in South Africa?",
        a: "The basic player is free for one playlist. Premium is a once-off player licence in the R150–R199 band already quoted on this site. It is not an IPTV subscription.",
      },
      {
        q: "Does Mzansi Stream work in TiviMate?",
        a: "Yes. We send Xtream Codes or an M3U plus EPG on WhatsApp. TiviMate is the preferred player on Firestick and Android TV.",
      },
      {
        q: "Why is my TiviMate EPG empty?",
        a: "Update EPG on the playlist, or paste the XMLTV URL from WhatsApp. If it stays empty, ask us to resend the guide link.",
      },
      {
        q: "Can I use TiviMate on a Samsung Smart TV?",
        a: "No. Use IPTV Smarters from the Samsung store, or plug in a Firestick and run TiviMate on the stick.",
      },
      {
        q: "What buffer should I use for 4K SuperSport?",
        a: "8 seconds in TiviMate Playback settings. The default 2-second buffer is the usual cause of micro-stutters on 4K.",
      },
      {
        q: "TiviMate vs IPTV Smarters Pro — which one?",
        a: "TiviMate on Firestick / Android TV. Smarters on iPhone, iPad, Samsung and LG. The comparison post covers the rest.",
      },
    ],
    relatedLinks: [
      { label: "TiviMate vs IPTV Smarters Pro vs GSE", href: "/en-za/blog/tivimate-vs-iptv-smarters-pro-2026/" },
      { label: "Firestick IPTV South Africa — pillar", href: "/en-za/iptv-firestick-south-africa/" },
      { label: "Firestick 4K Max vs Lite — which to buy", href: "/en-za/blog/firestick-4k-max-vs-lite-south-africa/" },
      { label: "Why IPTV buffers — SA fix guide", href: "/en-za/blog/why-is-my-iptv-buffering-fix-2026/" },
    ],
  },
  {
    slug: "iptv-load-shedding-south-africa",
    title: "IPTV during load shedding in South Africa — stay on air in 2026",
    metaDescription:
      "Keep IPTV alive during load shedding: what dies first (ONT, router, TV), inverter vs UPS, and LTE/5G failover for SuperSport.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "Load shedding does not 'break IPTV'. It breaks the weakest box in the chain — usually the fibre ONT or the ISP router — while the TV and the phone fail at different times. This guide is the South African power-order: what goes dark first, what an inverter actually covers, and how to fail over to LTE or 5G without buying another DStv decoder.",
    keyFacts: [
      "The fibre ONT and the ISP router die first if they are not on the inverter circuit. The Smart TV dying later does not help.",
      "A phone on LTE can finish a match on hotspot when the estate lights stay on but the DB board that feeds fibre does not.",
      "We do not publish fake Eskom stage timetables. Check EskomSePush for the day's slots; use this page for the hardware order.",
    ],
    cta: {
      label: "Test IPTV on your setup — WhatsApp trial →",
      message:
        "Hi! I want to test Mzansi Stream through load shedding. Fibre: [Vumatel/Openserve/Frogfoot]. Backup: [inverter / LTE]. Please send the 24h trial.",
      ref: "Blog-Load-Shedding",
    },
    howTo: {
      name: "Build a load-shedding IPTV fallback",
      description:
        "Map what dies first, put the router on backup power if you can, and keep a phone-hotspot path for SuperSport.",
      totalTime: "PT20M",
      supply: ["Inverter, UPS or power station (optional)", "Phone with LTE/5G data"],
      tool: ["Router", "Firestick or phone player", "Mzansi Stream playlist"],
    },
    sections: [
      {
        id: "order",
        h2: "The order things die (this is the whole game)",
        body: [
          "DStv households experience load shedding as 'the decoder went off'. IPTV households experience it as a chain. Typical order when the estate inverter does not feed your DB board:",
        ],
        bullets: [
          "Fibre ONT / router: no internet. The TV can stay on and still show a spinner.",
          "Smart TV / Firestick: dies next if they are on the same plugs as the kettle circuit.",
          "Phone: stays on LTE/5G on battery. That is now your match screen or your hotspot.",
          "Inverter lights: the room is bright and the stream is still dead if the ONT was never on the inverter.",
        ],
      },
      {
        id: "inverter",
        h2: "Inverter, UPS and 'the lights are on but SuperSport is not'",
        body: [
          "An inverter that only feeds lights and a few plugs will not save IPTV unless the ONT and router sit on those plugs. A small UPS under the router (the kind people buy for a PC) is often enough to ride a slot if the fibre street cabinet still has power.",
          "We do not quote watt-hour sizes we have not measured on your unit. Rule of thumb already used in the industry: keep the network alive first, the TV second. A Firestick sips less than a 65-inch Smart TV.",
        ],
      },
      {
        id: "lte",
        h2: "LTE and 5G when fibre is dark",
        body: [
          "When the ONT is dead, a phone hotspot or a dedicated LTE/5G router is the fallback. Prefer HD over 4K on mobile data — 4K SuperSport is hungrier and we are not going to invent a GB-per-hour figure we have not metered on your SIM.",
          "Rain, Vodacom and MTN all work as a backup path for Mzansi Stream because the CDN is on the public internet, not inside a DStv smartcard. The LTE/5G guide covers hotspot hygiene; this page is about deciding the fallback before 20:00 on a derby night.",
        ],
      },
      {
        id: "player",
        h2: "Player settings that survive a reconnect",
        body: [
          "TiviMate with an 8-second buffer will usually resume after a short blip. If the ONT is off for the whole slot, no buffer saves you — switch the Firestick onto the phone hotspot SSID you prepared. Name the backup Wi-Fi clearly (for example Home-LTE) so you are not guessing passwords in the dark.",
        ],
      },
      {
        id: "howto",
        h2: "Weekend match fallback — do this once",
        body: [
          "Spend twenty minutes on a weeknight. Saturday you only flip SSIDs.",
        ],
        steps: [
          {
            title: "Walk the plugs",
            text: "Find the fibre ONT and the ISP router. If they are not on the inverter or a UPS, that is why 'the lights stayed on' and SuperSport died.",
          },
          {
            title: "Move the network onto backup power if you can",
            text: "Plug ONT + router into the inverter circuit or a UPS. Leave the big TV off that circuit if you are short on watts — use a Firestick or phone instead.",
          },
          {
            title: "Save a phone-hotspot SSID",
            text: "Create a hotspot name you will recognise. Connect the Firestick to it once while fibre is still up, so the password is stored.",
          },
          {
            title: "Install the player on the phone",
            text: "IPTV Smarters or TiviMate companion on the phone is the last-resort screen when both TVs are dark.",
          },
          {
            title: "Tell WhatsApp your fallback",
            text: "If a slot hits during a trial, say 'ONT down, on LTE hotspot' — that is a power issue, not a 'bad provider' ticket.",
          },
        ],
      },
      {
        id: "dstv",
        h2: "Load shedding does not make DStv cheaper",
        body: [
          "A DStv decoder on an inverter still needs the dish and the same household power politics. IPTV's advantage in a slot is the phone: SuperSport can move to LTE without a truck roll. The bill stays R99–R199/month on Mzansi Stream versus R899/month Premium — load shedding does not change that arithmetic.",
        ],
      },
    ],
    faq: [
      {
        q: "Does Mzansi Stream work during load shedding?",
        a: "Yes, if a path to the internet stays up — inverter on the ONT/router, or a phone on LTE/5G. If every radio in the house is dead, no stream works, including DStv internet apps.",
      },
      {
        q: "Should I buy a UPS or an inverter first?",
        a: "If you already have an inverter, move the ONT and router onto it. If you do not, a small UPS for the router is the cheapest IPTV-specific fix. We do not sell power gear.",
      },
      {
        q: "Will 4K SuperSport work on a hotspot?",
        a: "Sometimes. Prefer HD on LTE to save radio stability. Fibre + NAPAfrica peering is still the 4K path.",
      },
      {
        q: "Do you publish load-shedding schedules?",
        a: "No. Use EskomSePush or your municipality. This page is the hardware order, not a stage timetable.",
      },
      {
        q: "My estate has backup lights but no fibre. What now?",
        a: "That is an ONT-off situation. Use phone LTE/5G or a dedicated LTE router. Message WhatsApp if you need the mobile setup steps.",
      },
      {
        q: "Does auto-resume work after power returns?",
        a: "Players usually reconnect when the network returns. If the playlist looks empty, refresh it — do not reorder a new subscription.",
      },
    ],
    relatedLinks: [
      { label: "IPTV on LTE and 5G — fibre-down fallback", href: "/en-za/blog/iptv-on-lte-5g-south-africa/" },
      { label: "IPTV on multiple devices", href: "/en-za/blog/iptv-multiple-devices-south-africa/" },
      { label: "No-buffering IPTV pillar", href: "/en-za/iptv-no-buffering-south-africa/" },
      { label: "Wi-Fi 6 and Ethernet for IPTV", href: "/en-za/blog/iptv-wifi-6-router-south-africa/" },
    ],
  },
  {
    slug: "watch-premier-league-south-africa-no-dstv",
    title: "Watch the Premier League in South Africa without DStv — 2026",
    metaDescription:
      "Stream the Premier League in South Africa without DStv Premium. Why Compact drops PL, and how IPTV carries SuperSport Premier League in 4K.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "DStv Compact does not give you the Premier League. Compact Plus only covers it in part. Premium at R899/month is the MultiChoice package that carries the full SuperSport Premier League slate — which is why so many SA fans keep a decoder they barely use for anything else. This guide is the 2026 way to watch every PL fixture without that decoder.",
    keyFacts: [
      "DStv Compact skips the Premier League entirely. Compact Plus is partial. Full PL on DStv means Premium.",
      "Mzansi Stream carries SuperSport Premier League on every plan — sport is not gated behind a higher tier.",
      "Test a Saturday 18:30 and a Sunday fixture on the 24-hour WhatsApp trial before you cancel anything.",
    ],
    cta: {
      label: "Watch PL this weekend — WhatsApp trial →",
      message:
        "Hi! I want to watch the Premier League without DStv. Please activate the free 24-hour trial and tell me how to open SuperSport Premier League.",
      ref: "Blog-PL-No-DStv",
    },
    howTo: {
      name: "Watch this weekend's Premier League on Mzansi Stream",
      description:
        "Order a WhatsApp trial, load SuperSport Premier League, and confirm both the early and late kick-offs.",
      totalTime: "PT10M",
      supply: ["WhatsApp", "A 4K or HD screen", "Fibre or a stable LTE backup"],
      tool: ["TiviMate or IPTV Smarters Pro"],
    },
    sections: [
      {
        id: "dstv-gap",
        h2: "The DStv package gap (this is why people overpay)",
        body: [
          "The site already publishes the 2026 package picture: Premium R899, Compact Plus R549, Compact R449, Family R329. Compact drops Premier League entirely. Compact Plus only partially covers it. The full SuperSport Premier League slate sits on Premium — plus a decoder and a 24-month contract habit.",
          "If you kept DStv 'for the soccer' and you are not on Premium, you are already missing fixtures. IPTV is not the downgrade in that story. The downgrade was the package you were sold.",
        ],
      },
      {
        id: "what-you-get",
        h2: "What you actually watch on IPTV",
        body: [
          "Mzansi Stream carries SuperSport Premier League and the Variety overflow channels used when two matches collide. Kick-offs that DStv Compact Plus 'partially blocks' — including the early, the 16:30 and the evening games called out on the SuperSport pillar — are the test, not a midweek replay.",
          "You also keep SuperSport PSL on the same plan. That is the point for a South African weekend: Kaizer Chiefs or Orlando Pirates at 15:00, then a PL match without changing subscription.",
        ],
      },
      {
        id: "howto",
        h2: "This-weekend setup",
        body: [
          "Do not cancel DStv on Friday night if your notice period would cut Saturday. Overlap the trial. The weekend-switch guide covers the cancel calendar; this is the football path.",
        ],
        steps: [
          {
            title: "Message WhatsApp for a 24-hour trial",
            text: "Say you care about Premier League + PSL and name your device. No card.",
          },
          {
            title: "Open SuperSport Premier League first",
            text: "Favourite it in TiviMate or Smarters. Then favourite SuperSport PSL and Variety 1–4 for overflow.",
          },
          {
            title: "Watch one early and one late kick-off",
            text: "If both hold on your fibre, the provider is doing the job Compact Plus would not.",
          },
          {
            title: "Only then pick a plan",
            text: "12-month at R1,199 is the published cheap year. Pay in the same WhatsApp thread.",
          },
        ],
      },
      {
        id: "4k",
        h2: "4K vs HD — what your line must do",
        body: [
          "The SuperSport pillar already states a 25 Mbps floor for stable 4K. Vumatel, Openserve, Frogfoot, Octotel and MetroFibre are enough when the CDN peers at NAPAfrica. If your router is an old ISP Huawei on 2.4 GHz, fix the Wi-Fi before you decide IPTV 'can't do PL in 4K'.",
        ],
      },
      {
        id: "vs-showmax",
        h2: "This is not a Showmax-only problem",
        body: [
          "Showmax and other apps shuffle football rights. This page is about SuperSport Premier League as South Africans already know it on DStv — the same feeds, a different commercial wrapper. Compare Showmax on the vs page if that is your question; do not mix the two products in one Saturday panic.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I watch the Premier League in South Africa without DStv?",
        a: "Yes. Mzansi Stream carries SuperSport Premier League on every plan, in 4K where the source supports it, activated on WhatsApp.",
      },
      {
        q: "Does DStv Compact include the Premier League?",
        a: "No. Compact skips it. Compact Plus is partial. Full PL on DStv is a Premium-tier problem.",
      },
      {
        q: "Do I also get PSL on the same IPTV plan?",
        a: "Yes. SuperSport PSL and Variety overflow sit on the same Mzansi Stream pack as Premier League.",
      },
      {
        q: "Will it buffer on a Saturday?",
        a: "On a NAPAfrica-peered provider with 5 GHz or Ethernet, Saturday load is the design case. Overseas resellers fail here first.",
      },
      {
        q: "Is sport extra on Mzansi Stream?",
        a: "No. Published plans all carry the full SuperSport line-up — sport is not an add-on tier.",
      },
      {
        q: "Can I try before the big kick-off?",
        a: "Yes. Ask for the 24-hour trial on WhatsApp and test on the lounge TV, not only on a phone.",
      },
    ],
    relatedLinks: [
      { label: "Watch SuperSport without DStv — pillar", href: "/en-za/iptv-supersport-without-dstv/" },
      { label: "How to watch PSL online", href: "/en-za/blog/how-to-watch-psl-online-2026/" },
      { label: "DStv vs IPTV — complete guide", href: "/en-za/blog/dstv-vs-iptv-2026-complete-guide/" },
      { label: "Mzansi Stream vs DStv Premium", href: "/en-za/vs/dstv-premium/" },
    ],
  },
  {
    slug: "switch-from-dstv-to-iptv-weekend",
    title: "Switch from DStv to IPTV in one weekend — 2026 SA checklist",
    metaDescription:
      "Switch from DStv to IPTV in one South African weekend: overlap the trial, avoid the 30-day notice trap, keep Saturday PSL, return the decoder.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "The dangerous way to leave DStv is to cancel on Friday and discover Saturday that the 30-day notice ate your PSL. The safe way is a weekend overlap: IPTV trial live on the lounge TV before you touch MyDStv. This is that checklist — cancel calendar, decoder leftover, and the WhatsApp messages that keep SuperSport on air the whole time.",
    keyFacts: [
      "DStv's 30-day notice is already documented on this site: cancel on day 1 of the billing cycle, not day 25.",
      "Run the Mzansi Stream 24-hour trial on Friday night. Pay Saturday only if SuperSport holds.",
      "Do not email MultiChoice or Mzansi Stream to switch. DStv cancel is WhatsApp 060 060 3788 or MyDStv; Mzansi Stream is the site WhatsApp button.",
    ],
    cta: {
      label: "Overlap this weekend — WhatsApp trial →",
      message:
        "Hi! I am switching from DStv this weekend. Please activate the free 24-hour trial on my [device] so I can overlap before I cancel.",
      ref: "Blog-Weekend-Switch",
    },
    howTo: {
      name: "Switch from DStv to Mzansi Stream over one weekend",
      description:
        "Trial Friday, watch Saturday, cancel on the correct billing day, return the decoder only after IPTV is stable.",
      totalTime: "PT48H",
      supply: ["Active DStv account (for overlap)", "WhatsApp", "A Smart TV or Firestick"],
      tool: ["MyDStv app or DStv WhatsApp 060 060 3788", "Mzansi Stream WhatsApp from iptvmzansi.com"],
    },
    sections: [
      {
        id: "overlap",
        h2: "Why you overlap — not 'rip the plaster'",
        body: [
          "Saturday PSL and Sunday Premier League are the two fixtures that make people rage-reorder DStv. Overlap means both stacks work for a few days. You are not paying double forever; you are buying one insurance weekend.",
          "Mzansi Stream's trial is 24 hours with no card. If Friday night looks good, pay the 1-month or 3-month plan on Saturday so you still have cover while DStv winds down.",
        ],
      },
      {
        id: "calendar",
        h2: "The cancel calendar (do this before you message MultiChoice)",
        body: [
          "The cancel-DStv pages on this site already warn: notice is 30 days on a paid month. Cancel on day 1 of your cycle, not day 25, or you donate another Premium month. Look at the MyDStv billing date first. If day 1 is next Thursday, your 'weekend switch' is still the trial-and-pay weekend — the cancel tap waits until Thursday.",
        ],
      },
      {
        id: "howto",
        h2: "Weekend sequence",
        body: [
          "Print this in your head. The only date that moves is your DStv billing day.",
        ],
        steps: [
          {
            title: "Friday — trial on the lounge TV",
            text: "WhatsApp Mzansi Stream from the site button. Load TiviMate or Smarters. Watch SuperSport PSL or a midweek leftover. Confirm EPG.",
          },
          {
            title: "Saturday — live match test, then pay",
            text: "If the 15:00 holds, pay a plan in the same chat (EFT / SnapScan / Ozow). Do not cancel DStv yet unless your billing day 1 is today.",
          },
          {
            title: "Find day 1 of the DStv cycle",
            text: "MyDStv → billing date. If it is not today, diarise it. Cancel on that day via WhatsApp 060 060 3788 or the app, and keep the written confirmation.",
          },
          {
            title: "Return the decoder last",
            text: "Only after IPTV has survived a full SuperSport weekend. The cancel pillar lists return options — do not leave an Explora running 'just in case' for six months.",
          },
          {
            title: "Pin both chats",
            text: "DStv confirmation in one thread, Mzansi Stream credentials in the other. No mailto, no lost SMS.",
          },
        ],
      },
      {
        id: "money",
        h2: "What the year looks like if the switch sticks",
        body: [
          "DStv Premium is R899 × 12 = R10,788, plus a decoder in the R1,500+ band. Mzansi Stream's 12-month plan is R1,199 once. Those figures are already on the SuperSport and vs pages — this checklist does not invent a new saving. It just stops you paying both for a quarter because you cancelled on the wrong day.",
        ],
      },
      {
        id: "keep-dstv",
        h2: "When you should not switch this weekend",
        body: [
          "If nobody in the house will use WhatsApp, or the only TV is a non-smart CRT with no HDMI, DStv may still fit. If your fibre is down and you have no LTE, fix connectivity first. IPTV is not a decoder; it will not resurrect a dead ONT.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I switch from DStv to IPTV without missing a PSL match?",
        a: "Yes, if you overlap. Trial and pay Mzansi Stream first; cancel DStv on day 1 of the billing cycle, not the night before a derby.",
      },
      {
        q: "What is the DStv 30-day notice trap?",
        a: "Cancel late in the paid month and MultiChoice bills another month. Cancel on day 1. Details are on the cancel-DStv guides.",
      },
      {
        q: "Do I email DStv to cancel?",
        a: "No. Use MyDStv or WhatsApp 060 060 3788 and keep the written reply. Mzansi Stream also does not use mailto.",
      },
      {
        q: "When do I return the decoder?",
        a: "After IPTV has survived a SuperSport weekend. Returning it first is how people panic-reinstall DStv on Sunday.",
      },
      {
        q: "Which Mzansi Stream plan should I buy for the overlap month?",
        a: "1-month (R199) or 3-month (R449) if you want a short bridge; 12-month (R1,199) if the Friday trial already convinced you.",
      },
      {
        q: "Can I keep DStv EasyView and add IPTV for sport?",
        a: "Some households do that for a month. It is your budget. Sport on Mzansi Stream does not require a DStv add-on.",
      },
    ],
    relatedLinks: [
      { label: "How to cancel DStv — step by step", href: "/en-za/blog/cancel-dstv-step-by-step-2026/" },
      { label: "Cancel DStv 2026 — pillar", href: "/en-za/cancel-dstv-2026/" },
      { label: "Order IPTV on WhatsApp", href: "/en-za/blog/order-iptv-whatsapp-south-africa/" },
      { label: "DStv alternative — full guide", href: "/en-za/dstv-alternative/" },
    ],
  },
  {
    slug: "iptv-on-lte-5g-south-africa",
    title: "IPTV on LTE and 5G in South Africa — fibre-down fallback 2026",
    metaDescription:
      "Use IPTV on LTE and 5G in South Africa when fibre is down — phone hotspot, HD vs 4K, Rain / Vodacom / MTN as a SuperSport backup.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "Fibre is the right path for 4K SuperSport. LTE and 5G are the path that keeps the match alive when the ONT dies, the estate inverter ignores your DB board, or you are in a res with congested Wi-Fi. This guide is the mobile fallback — hotspot hygiene, HD vs 4K, and what to tell WhatsApp so we do not treat an LTE spinner like a broken CDN.",
    keyFacts: [
      "Mzansi Stream works on the public internet — Rain, Vodacom and MTN can carry it when fibre is dark.",
      "Prefer HD on a hotspot. We do not publish a GB-per-hour number we have not metered on your SIM.",
      "Connect the Firestick to the hotspot SSID once while fibre still works, so Saturday is a toggle, not a typing exercise.",
    ],
    cta: {
      label: "Get mobile setup on WhatsApp →",
      message:
        "Hi! I need Mzansi Stream as an LTE/5G fallback when fibre is down. Phone: [Android/iPhone]. Please send the 24h trial and the phone player steps.",
      ref: "Blog-LTE-5G",
    },
    howTo: {
      name: "Fail over IPTV from fibre to LTE/5G",
      description:
        "Install a phone player, store the hotspot SSID on the Firestick, and switch to HD when the ONT dies.",
      totalTime: "PT15M",
      supply: ["Phone with LTE or 5G data", "Hotspot capable handset or LTE router"],
      tool: ["IPTV Smarters (iPhone/Android)", "Firestick optional"],
    },
    sections: [
      {
        id: "when",
        h2: "When LTE is the right screen",
        body: [
          "Use LTE/5G when the fibre ONT is off, when you are travelling inside SA, or when the campus Wi-Fi cannot hold a live match. Do not use a congested 2.4 GHz hotspot as your everyday 4K path — that is how people write 'IPTV is bad' reviews that are actually radio reviews.",
        ],
      },
      {
        id: "hotspot",
        h2: "Phone hotspot vs a dedicated LTE router",
        body: [
          "A phone hotspot is enough for one Firestick or one phone player. It shares battery and heat with the match. A dedicated LTE/5G router is calmer if load shedding is a lifestyle and fibre is a bonus.",
          "We do not rank Rain vs Vodacom vs MTN with invented speed tests. Use the SIM that already has coverage in your suburb. If the trial buffers only on hotspot and not on fibre, say that in WhatsApp — it is a radio issue.",
        ],
      },
      {
        id: "hd",
        h2: "HD on mobile, 4K on fibre",
        body: [
          "4K SuperSport wants a stable pipe. On LTE, pick the 1080p variant if the player exposes it, or let the stream step down. Inventing a '2 GB per half' claim would violate the no-fabrication rule — watch your operator app if you need a data number.",
        ],
      },
      {
        id: "howto",
        h2: "Fail-over steps",
        body: [
          "Do this while the lights are still on.",
        ],
        steps: [
          {
            title: "Install a player on the phone",
            text: "iPhone/iPad: IPTV Smarters Player. Android: Smarters or TiviMate companion. Paste the same WhatsApp credentials.",
          },
          {
            title: "Store the hotspot on the Firestick",
            text: "Settings → Network → join the hotspot once. Name it clearly (Home-LTE) so you can find it when the fibre SSID vanishes.",
          },
          {
            title: "When the ONT dies, switch SSID",
            text: "Firestick → Home-LTE. Or watch on the phone. Prefer HD.",
          },
          {
            title: "Tell WhatsApp if both paths fail",
            text: "Fibre + LTE both buffering is a different ticket to 'ONT off'. Mention both.",
          },
        ],
      },
      {
        id: "roam",
        h2: "Outside the house — still South Africa",
        body: [
          "A phone on Vodacom in a taxi can open SuperSport. Hotel Wi-Fi varies; if it is captive-portal nasty, use LTE. Diaspora use (UK, AU, US) is a different page — sa-abroad — because the question there is 'SA TV overseas', not load shedding.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I watch Mzansi Stream on Vodacom or MTN LTE?",
        a: "Yes. It is an internet stream. Coverage and congestion in your suburb decide quality, not a DStv smartcard.",
      },
      {
        q: "Will 5G give me 4K SuperSport?",
        a: "It can, on a quiet cell. Treat 4K as a fibre feature and HD as the mobile default.",
      },
      {
        q: "Does a hotspot count as a second connection?",
        a: "If the lounge TV is still playing on fibre while the phone plays on LTE, that is two streams. If the TV is off, it is usually one.",
      },
      {
        q: "Should I buy extra data for a match weekend?",
        a: "That is your operator plan. We will not invent a gigabyte forecast. Check the operator app after one half and decide.",
      },
      {
        q: "Rain 5G vs fibre for IPTV?",
        a: "Fibre with NAPAfrica peering is the everyday 4K path. Rain 5G is a strong backup when the ONT is dead.",
      },
      {
        q: "Can you send a lighter playlist for mobile?",
        a: "The same credentials work. Pick HD in the player. Message WhatsApp if you need the phone-specific tap path.",
      },
    ],
    relatedLinks: [
      { label: "IPTV during load shedding", href: "/en-za/blog/iptv-load-shedding-south-africa/" },
      { label: "IPTV on iPhone & iPad", href: "/en-za/devices/iphone-ipad/" },
      { label: "IPTV on Android phone", href: "/en-za/devices/android-mobile/" },
      { label: "No-buffering pillar", href: "/en-za/iptv-no-buffering-south-africa/" },
    ],
  },
  {
    slug: "watch-proteas-cricket-online-south-africa",
    title: "Watch the Proteas live online — cricket without DStv in 2026",
    metaDescription:
      "Stream Proteas Tests, ODIs, T20, SA20 and ICC cricket in South Africa without DStv — SuperSport Cricket via IPTV from R99/mo.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "Proteas cricket is a SuperSport Cricket problem, not a 'find a random stream' problem. Tests run all day, SA20 packs a weeknight, and ICC tournaments collide with PSL. This guide is how to keep that slate in 4K without a DStv Premium decoder — and how it differs from the Springbok rugby post already on this blog.",
    keyFacts: [
      "SuperSport Cricket carries Proteas tours, SA20 and ICC tournaments on Mzansi Stream.",
      "All-day Tests are where weak Wi-Fi shows: Ethernet or 5 GHz matters more than on a 90-minute football match.",
      "Same WhatsApp trial as any other sport — cricket is not a higher tier.",
    ],
    cta: {
      label: "Watch SuperSport Cricket — WhatsApp trial →",
      message:
        "Hi! I want to watch Proteas / SA20 cricket without DStv. Please activate the free 24-hour trial and point me to SuperSport Cricket.",
      ref: "Blog-Proteas",
    },
    howTo: {
      name: "Watch Proteas cricket on Mzansi Stream",
      description:
        "Get the WhatsApp trial, favourite SuperSport Cricket, and test a live session on the lounge TV.",
      totalTime: "PT10M",
      supply: ["WhatsApp", "Screen you will actually watch a Test on"],
      tool: ["TiviMate or IPTV Smarters Pro"],
    },
    sections: [
      {
        id: "feeds",
        h2: "Which SuperSport feeds carry the cricket",
        body: [
          "The SuperSport pillar already lists SuperSport Cricket for Proteas tours, SA20, ICC World Cups and county leftovers, with Variety channels for overflow. You do not need a separate 'cricket app' if the IPTV pack includes those feeds.",
          "This is different from the Springboks post (SuperSport Rugby / Grandstand) and the PSL post (SuperSport PSL). Favourite the cricket folder so a five-day Test is not a scroll.",
        ],
      },
      {
        id: "tests",
        h2: "Why Tests punish bad Wi-Fi more than PSL does",
        body: [
          "A 90-minute PSL match can limp through a mediocre router. A Test session is hours of sustained bitrate. If the picture ladders after tea, look at 2.4 GHz interference and the ISP router cap — the buffering and Wi-Fi guides — before you decide cricket 'isn't on IPTV'.",
        ],
      },
      {
        id: "howto",
        h2: "Setup for the next session",
        body: [
          "If a Test is already on, you still have time. The trial is 24 hours.",
        ],
        steps: [
          {
            title: "Order the trial on WhatsApp",
            text: "Say 'Proteas / SuperSport Cricket' and your device.",
          },
          {
            title: "Favourite SuperSport Cricket",
            text: "Also star Variety 1–4 for overflow during ICC match piles.",
          },
          {
            title: "Sit on Ethernet or 5 GHz",
            text: "Especially for a day-night session. 2.4 GHz next to a microwave is how people miss a last-over.",
          },
          {
            title: "Pay if the session holds",
            text: "Use the same chat. 12-month at R1,199 is the published year price for the full pack, not a cricket add-on.",
          },
        ],
      },
      {
        id: "sa20",
        h2: "SA20 and weeknights",
        body: [
          "SA20 is a weeknight product: people come home, inverter may already be in play, kids want the Hisense. Put the player on the screen that survives the slot (see load shedding) and keep the phone as the backup for the last five overs.",
        ],
      },
      {
        id: "legal",
        h2: "Rights, not random links",
        body: [
          "We source SuperSport feeds via licensed partners and take local payment. A Facebook 'free Proteas 4K' link is a different product and a different risk. The legality pages on this site are the honest version of that sentence.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I watch the Proteas without DStv?",
        a: "Yes. Mzansi Stream carries SuperSport Cricket — Proteas tours, SA20 and ICC events — on every plan.",
      },
      {
        q: "Is SA20 included?",
        a: "Yes, via SuperSport Cricket, as already stated on the SuperSport pillar.",
      },
      {
        q: "Do I need a cricket-only subscription?",
        a: "No. Cricket is part of the same pack as PSL, Premier League and rugby.",
      },
      {
        q: "Will a Test last all day on IPTV?",
        a: "The feed will. Your router might not, if it is on 2.4 GHz. Fix the network for long sessions.",
      },
      {
        q: "What about IPL or overseas leagues?",
        a: "Overflow sits on SuperSport Variety when SuperSport has the rights. Ask WhatsApp during that window rather than trusting a screenshot from last season.",
      },
      {
        q: "Can I watch from the UK or Australia?",
        a: "Diaspora pages cover SA TV abroad. The stream is not geo-locked the way a DStv smartcard is; use the sa-abroad guides for country context.",
      },
    ],
    relatedLinks: [
      { label: "Watch SuperSport without DStv", href: "/en-za/iptv-supersport-without-dstv/" },
      { label: "Watch the Springboks live", href: "/en-za/blog/watch-springboks-live-online/" },
      { label: "Premier League without DStv", href: "/en-za/blog/watch-premier-league-south-africa-no-dstv/" },
      { label: "Load-shedding stream tips", href: "/en-za/blog/iptv-load-shedding-south-africa/" },
    ],
  },
  {
    slug: "iptv-epg-catchup-south-africa",
    title: "IPTV EPG and catch-up TV in South Africa — vs Explora PVR 2026",
    metaDescription:
      "How IPTV EPG and catch-up work in South Africa versus a DStv Explora PVR — XMLTV, restart match, timeshift, and TiviMate guide fixes.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "The Explora trained South Africa to treat TV as a disk in the lounge: pause, rewind, record the derby. IPTV does the same job with an EPG and catch-up on the server — if the provider sent an XMLTV URL and the player is allowed to timeshift. This guide is that difference, plus the exact TiviMate / Smarters taps when the guide is empty.",
    keyFacts: [
      "EPG is the TV guide. Catch-up / timeshift is 'start the match from the beginning' — not a second subscription.",
      "Mzansi Stream sends M3U or Xtream plus an EPG URL on WhatsApp. If the guide is empty, ask for XMLTV again; do not reinstall the app first.",
      "Explora records to a box in your house. Catch-up lives on the provider side — useful when load shedding killed the decoder mid-match.",
    ],
    cta: {
      label: "Get EPG + playlist on WhatsApp →",
      message:
        "Hi! Please send Mzansi Stream with EPG/XMLTV for [TiviMate / Smarters] on my [device]. I want the free 24h trial and catch-up if available.",
      ref: "Blog-EPG-Catchup",
    },
    howTo: {
      name: "Attach EPG and test catch-up on Mzansi Stream",
      description:
        "Paste the WhatsApp XMLTV URL, refresh the guide, and test restart/timeshift on a SuperSport channel.",
      totalTime: "PT5M",
      supply: ["EPG / XMLTV URL from WhatsApp"],
      tool: ["TiviMate or IPTV Smarters Pro"],
    },
    sections: [
      {
        id: "epg",
        h2: "What EPG is (and what it is not)",
        body: [
          "EPG is the grid: channel, start time, programme name. It is not the video. You can have a perfect SuperSport picture and an empty guide if the XMLTV URL was never pasted. You can also have a full guide and a dead picture if the stream URL expired.",
          "Xtream logins often pull a guide automatically. M3U playlists often need the XMLTV field filled once. WhatsApp should contain both.",
        ],
      },
      {
        id: "catchup",
        h2: "Catch-up vs Explora PVR",
        body: [
          "Explora PVR writes the match to a disk in your lounge. If load shedding kills the decoder at 16:00, the recording can die with it. Catch-up / restart on IPTV starts the programme from the server. That is the feature people mean when they say 'I missed the first half'.",
          "Not every channel offers the same catch-up window. Sport is the honest test: open SuperSport PSL after kick-off and look for restart / catch-up in TiviMate (programme long-press or the catch-up row). If it is missing, ask WhatsApp whether that feed exposes catch-up — do not assume a Facebook screenshot.",
        ],
      },
      {
        id: "howto",
        h2: "Fix an empty guide, then test restart",
        body: [
          "Five minutes. Do not factory-reset the Firestick.",
        ],
        steps: [
          {
            title: "Update EPG in the player",
            text: "TiviMate: playlist → Update EPG. Smarters: log out and in with Xtream Codes.",
          },
          {
            title: "Paste XMLTV if still empty",
            text: "Use the EPG URL from the same WhatsApp that sent the M3U. No extra spaces.",
          },
          {
            title: "Open a live SuperSport programme",
            text: "If the guide now shows the match name, EPG works. Then look for catch-up / restart on that programme.",
          },
          {
            title: "Message WhatsApp if the grid is still blank",
            text: "Send a screenshot of the empty guide. We resend XMLTV. Reinstalling TiviMate rarely fixes a missing URL.",
          },
        ],
      },
      {
        id: "timeshift",
        h2: "Timeshift buffer (pause live)",
        body: [
          "TiviMate can pause live TV if the player buffer and the provider allow it. Raise the playback buffer to 8 seconds for 4K as in the TiviMate guide. Pause is not the same as a three-hour Explora record — think 'kettle pause', not 'record the whole Test'.",
        ],
      },
      {
        id: "vod",
        h2: "VOD is a different shelf",
        body: [
          "Catch-up is live TV shifted. VOD is the movies-and-series catalogue (the site already describes a 100,000+ title library on the movies pillar). Do not hunt for a Proteas Test inside VOD if it is still in the live EPG.",
        ],
      },
    ],
    faq: [
      {
        q: "Why is my IPTV guide empty?",
        a: "The XMLTV / EPG URL is missing or stale. Update EPG, paste the WhatsApp URL, or ask us to resend it.",
      },
      {
        q: "Can I restart a PSL match I joined late?",
        a: "If that SuperSport feed exposes catch-up, TiviMate / Smarters will show restart. Ask WhatsApp if the button is missing on that channel.",
      },
      {
        q: "Is catch-up as good as an Explora PVR?",
        a: "Different tool. Explora is a disk in the house. Catch-up is server-side and still works if the decoder would have died in a slot. Windows vary by channel.",
      },
      {
        q: "Does Mzansi Stream include EPG?",
        a: "Yes. We send EPG with the playlist. Empty grids are almost always a player URL step, not a missing product.",
      },
      {
        q: "Do I pay extra for catch-up?",
        a: "No separate catch-up SKU on the published plans. If a specific channel has no catch-up, that is a feed limit, not an upsell.",
      },
      {
        q: "Smarters vs TiviMate for EPG?",
        a: "TiviMate's 7-day guide is the nicer sport grid on Firestick. Smarters is the one that exists on iPhone and Samsung. Both accept the same EPG URL.",
      },
    ],
    relatedLinks: [
      { label: "TiviMate setup — EPG and buffer", href: "/en-za/blog/tivimate-setup-south-africa-2026/" },
      { label: "IPTV for movies & series", href: "/en-za/iptv-for-movies-and-series/" },
      { label: "Firestick IPTV not working — EPG fixes", href: "/en-za/blog/iptv-not-working-firestick-fix/" },
      { label: "Order on WhatsApp", href: "/en-za/blog/order-iptv-whatsapp-south-africa/" },
    ],
  },
  {
    slug: "firestick-4k-max-vs-lite-south-africa",
    title: "Firestick 4K Max vs Lite in South Africa — which to buy in 2026",
    metaDescription:
      "Firestick 4K Max vs Lite for IPTV in South Africa — Takealot/Game price band, SuperSport 4K, Ethernet adapter, and when Lite is enough.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "The Firestick setup pillar tells you how to install TiviMate. This page answers the earlier question: which stick to buy in South Africa so 4K SuperSport is not a lottery. Short version — Lite is a backup bedroom stick; 4K Max is the lounge stick. Prices below are the Takealot/Game band already published on this site, not a live scrape.",
    keyFacts: [
      "Firestick 4K Max is the stick this site already recommends for 4K SuperSport (published band R900–R1,400 at Takealot or Game).",
      "Lite is the wrong primary device if you care about 4K HDR sport.",
      "A USB-Ethernet adapter (published around R250) removes Wi-Fi jitter on either stick.",
    ],
    cta: {
      label: "I already have a Firestick — WhatsApp setup →",
      message:
        "Hi! I have a [Firestick 4K Max / 4K / Lite]. Please send the TiviMate M3U and the free 24-hour trial.",
      ref: "Blog-Firestick-SKU",
    },
    howTo: {
      name: "Pick a Firestick and load Mzansi Stream",
      description:
        "Buy 4K Max for the lounge, optionally add Ethernet, then load TiviMate from the WhatsApp playlist.",
      totalTime: "PT15M",
      supply: ["Firestick 4K Max (recommended)", "Optional USB-Ethernet adapter"],
      tool: ["4K HDMI TV", "TiviMate", "WhatsApp credentials"],
    },
    sections: [
      {
        id: "sku",
        h2: "Which SKU for which room",
        body: [
          "Lounge + SuperSport 4K: Firestick 4K Max. That is the device the Firestick pillar and the existing setup post already assume.",
          "Bedroom / kids / HD-only: Lite can play IPTV. It runs hotter, has weaker Wi-Fi, and is the unit the troubleshooting post already calls out for summer lock-ups. Do not make Lite the only stick in a house that cancelled DStv Premium for sport.",
        ],
      },
      {
        id: "price",
        h2: "What South Africans actually pay (already published)",
        body: [
          "This site already quotes Firestick 4K Max around R900–R1,400 at Takealot or Game. We are not refreshing that band from a live scrape in this article. If a marketplace listing is far below that and ships from an unnamed warehouse, treat it like cheap IPTV — too low usually means a Lite, a grey import, or a stick that will not stay on unknown-sources long enough to install TiviMate.",
        ],
      },
      {
        id: "ethernet",
        h2: "The R250 adapter that beats a new router",
        body: [
          "The buffering guide already names a USB-Ethernet adapter for Firestick at about R250. If the lounge TV sits next to the router, that cable removes most '4K drops to 1080p' tickets. Buy the adapter before you buy a second stick.",
        ],
      },
      {
        id: "howto",
        h2: "Buy, plug, play",
        body: [
          "Installation detail lives on the Firestick pillar. Here is the buying-to-WhatsApp path only.",
        ],
        steps: [
          {
            title: "Buy Firestick 4K Max for the lounge",
            text: "Takealot or Game. Keep the Lite for a bedroom if you already own one.",
          },
          {
            title: "Plug into HDMI and join 5 GHz Wi-Fi — or Ethernet",
            text: "Rename bands so you can see 5 GHz. Or use the USB-Ethernet adapter.",
          },
          {
            title: "Sideload TiviMate",
            text: "Unknown sources → Downloader → TiviMate. Follow the TiviMate guide for buffer and EPG.",
          },
          {
            title: "WhatsApp the trial",
            text: "Say 'Firestick 4K Max' so we send the right note. Test SuperSport PSL in 4K.",
          },
        ],
      },
      {
        id: "vs-smart-tv",
        h2: "When a stick beats the Smart TV app",
        body: [
          "Samsung, LG and Hisense apps stutter for reasons the Smart TV fix post already lists (Smart Hub scans, screensaver, tiny buffers). A Max on HDMI bypasses that OS. If you were about to 'replace the Hisense', try a Max first — it is cheaper than a new panel and cheaper than another year of DStv Premium.",
        ],
      },
    ],
    faq: [
      {
        q: "Is Firestick 4K Max worth it for IPTV in South Africa?",
        a: "Yes, if SuperSport 4K is the reason you left DStv. Lite is a backup stick, not the lounge stick.",
      },
      {
        q: "Where should I buy a Firestick in SA?",
        a: "This site already points at Takealot or Game for the R900–R1,400 4K Max band. We do not endorse random marketplace grey imports.",
      },
      {
        q: "Do I need Ethernet?",
        a: "Not required. It is the cleanest fix for Wi-Fi jitter. Adapter price is already quoted around R250.",
      },
      {
        q: "Can I use the Lite I already own?",
        a: "Yes for HD and for a second room. If it overheats or drops 4K, move Lite to the bedroom and put a Max in the lounge.",
      },
      {
        q: "TiviMate or Smarters on Firestick?",
        a: "TiviMate. Smarters is the fallback and the iPhone/Samsung app.",
      },
      {
        q: "Will a Firestick work during load shedding?",
        a: "If the TV and a network path have power — inverter or phone hotspot. The stick itself uses little power compared with a big Smart TV.",
      },
    ],
    relatedLinks: [
      { label: "Firestick IPTV setup — pillar", href: "/en-za/iptv-firestick-south-africa/" },
      { label: "TiviMate setup guide", href: "/en-za/blog/tivimate-setup-south-africa-2026/" },
      { label: "Firestick IPTV not working — fixes", href: "/en-za/blog/iptv-not-working-firestick-fix/" },
      { label: "Wi-Fi 6 / Ethernet for IPTV", href: "/en-za/blog/iptv-wifi-6-router-south-africa/" },
    ],
  },
  {
    slug: "iptv-wifi-6-router-south-africa",
    title: "Best Wi-Fi setup for IPTV in South Africa — 5 GHz, Ethernet and Wi-Fi 6",
    metaDescription:
      "Stop IPTV stutter on SA fibre: 5 GHz SSID, Ethernet, and Wi-Fi 6 routers (AX55 band already published) for 4K SuperSport.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "Most 'IPTV is buffering' tickets we see on WhatsApp are router tickets. The line is Vumatel or Openserve. The TV is 4K. The box in the passage is still a 2021 ISP Huawei that caps real 5 GHz throughput and parks the Firestick on 2.4 GHz next to the microwave. This guide is the living-room network for IPTV — Ethernet first, 5 GHz second, Wi-Fi 6 if you must stay wireless.",
    keyFacts: [
      "Ethernet beats every Wi-Fi upgrade. A cheap cable to the TV or a USB-Ethernet adapter on the Firestick is the first fix.",
      "Force the streaming stick onto 5 GHz by renaming the bands (Home and Home-5G) — already taught in the buffering post.",
      "Wi-Fi 6 models already quoted on this site: TP-Link Archer AX55 (R1,300), ASUS RT-AX55 (R1,500), TP-Link AX73 (R2,000).",
    ],
    cta: {
      label: "Test 4K on your line — WhatsApp trial →",
      message:
        "Hi! I want to test 4K SuperSport on my [Vumatel/Openserve/Frogfoot] line. Router is [ISP router / Wi-Fi 6]. Please send the 24h trial.",
      ref: "Blog-Wifi6",
    },
    howTo: {
      name: "Stabilise IPTV on a South African home network",
      description:
        "Prefer Ethernet, split 5 GHz, and only then replace the ISP router with a Wi-Fi 6 box.",
      totalTime: "PT20M",
      supply: ["Optional Ethernet cable (~R200) or Firestick USB-Ethernet adapter (~R250)"],
      tool: ["Router admin page", "Firestick or Smart TV"],
    },
    sections: [
      {
        id: "ethernet",
        h2: "Ethernet first (yes, even in 2026)",
        body: [
          "Smart TVs ship with modest Wi-Fi radios. The Smart TV stutter post already says a 10 m flat Ethernet cable is about R200, and a powerline kit about R900 if you cannot run cable. Do that before you buy a mesh system for one Firestick.",
        ],
      },
      {
        id: "5ghz",
        h2: "Split the bands so the stick cannot hide on 2.4 GHz",
        body: [
          "The buffering guide already gives the rename trick: MyHome and MyHome-5G, then connect the Firestick to the 5G SSID. Microwaves, baby monitors and the neighbour's printer live on 2.4 GHz. SuperSport 4K does not want that neighbourhood.",
        ],
      },
      {
        id: "wifi6",
        h2: "When to replace the ISP router",
        body: [
          "The buffering post already names the 2020–2023 Huawei/ZTE ISP routers that cap real 5 GHz throughput around 60–80 Mbps even on a 500 Mbps line. If you have tried Ethernet and 5 GHz and 4K still ladders, replace the router. Published options: TP-Link Archer AX55 (R1,300), ASUS RT-AX55 (R1,500), TP-Link AX73 (R2,000).",
          "Those rand figures are site copy, not a Takealot scrape. Mesh is for multi-floor houses; one Wi-Fi 6 box in the passage is enough for a single-storey lounge.",
        ],
      },
      {
        id: "qos",
        h2: "QoS: make the Firestick the VIP",
        body: [
          "The buffering guide already says it: Xbox patches, Windows Update and iCloud can saturate a 100 Mbps line. On a Wi-Fi 6 router, prioritise the streaming device MAC. That is a one-tap setting on AX55-class boxes — do it before you blame NAPAfrica.",
        ],
      },
      {
        id: "howto",
        h2: "Stabilise the lounge in twenty minutes",
        body: [
          "Order the work: cable, then SSID, then router. Buying mesh first is how money disappears.",
        ],
        steps: [
          {
            title: "Run Ethernet if the TV is near the router",
            text: "Flat 10 m cable (~R200) into the Smart TV, or USB-Ethernet on the Firestick (~R250).",
          },
          {
            title: "Rename 2.4 GHz and 5 GHz",
            text: "Connect the stick to the 5G name only. Forget the old combined SSID on that device.",
          },
          {
            title: "Turn on QoS for the stick",
            text: "Prioritise its MAC. Pause game downloads during a derby.",
          },
          {
            title: "Replace the ISP router only if 4K still ladders",
            text: "AX55 / RT-AX55 / AX73 band already published. Put the ISP unit in bridge mode if your fibre login requires it — your ISP documents that, not this page.",
          },
          {
            title: "Re-test SuperSport 4K",
            text: "If it is still ugly on Ethernet, that is a provider CDN ticket. Say 'on Ethernet' in WhatsApp so we do not debug Wi-Fi.",
          },
        ],
      },
      {
        id: "fibre",
        h2: "The line was never the villain",
        body: [
          "Vumatel, Openserve and Frogfoot will carry 4K when the provider peers at NAPAfrica. The fibre pillar explains peering. This page is the last hop: the box in your passage and the cable to the TV.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need Wi-Fi 6 for IPTV?",
        a: "No. Ethernet is better. Wi-Fi 6 helps when the TV cannot be cabled and the ISP router is the bottleneck.",
      },
      {
        q: "Which router does this site already quote?",
        a: "TP-Link Archer AX55 (R1,300), ASUS RT-AX55 (R1,500), TP-Link AX73 (R2,000). Those are existing site figures, not a new price list.",
      },
      {
        q: "2.4 GHz or 5 GHz for Firestick?",
        a: "5 GHz. Rename the bands so the stick cannot roam back to 2.4 GHz.",
      },
      {
        q: "Will a mesh system fix SuperSport stutter?",
        a: "Only if the problem is coverage in a far room. In one lounge, Ethernet or a single Wi-Fi 6 box is the usual fix.",
      },
      {
        q: "Does Mzansi Stream need port forwarding?",
        a: "No. It is outbound HLS / Xtream. Do not open random ports because a Facebook group said so.",
      },
      {
        q: "Fibre is 200 Mbps and 4K still buffers. Why?",
        a: "Peering or the router. Ask 'do you peer at NAPAfrica?' and test on Ethernet. Line speed alone is not the metric.",
      },
    ],
    relatedLinks: [
      { label: "Why IPTV buffers — SA troubleshooting", href: "/en-za/blog/why-is-my-iptv-buffering-fix-2026/" },
      { label: "IPTV for Vumatel / Openserve / Frogfoot", href: "/en-za/iptv-vumatel-openserve-frogfoot/" },
      { label: "No-buffering pillar", href: "/en-za/iptv-no-buffering-south-africa/" },
      { label: "Firestick 4K Max vs Lite", href: "/en-za/blog/firestick-4k-max-vs-lite-south-africa/" },
    ],
  },
  {
    slug: "watch-kyknet-online-without-dstv",
    title: "Watch kykNET and Afrikaans TV online without DStv — 2026",
    metaDescription:
      "Watch kykNET, kykNET & kie, VIA and Afrikaans SABC online without DStv. IPTV for Afrikaans households from R99/mo on WhatsApp.",
    datePublished: PUB,
    dateModified: PUB,
    lead:
      "A lot of South African households did not buy DStv for Premier League. They bought it for kykNET, kykNET & kie, VIA, and the Afrikaans soaps that still live on SABC 2. This guide is that cluster — how to keep Afrikaans TV on the Hisense without Premium at R899/month, and how it sits next to SuperSport if the rest of the family still wants PSL.",
    keyFacts: [
      "kykNET, kykNET & kie and VIA are part of the Mzansi Stream pack — not a language add-on.",
      "SABC 2 and the free-to-air Afrikaans stack stay in the same playlist as Mzansi Magic and e.tv.",
      "English body on purpose (Loi #9: no machine-translated Afrikaans). The /language/afrikaans landing is the language door; this is the how-to.",
    ],
    cta: {
      label: "Keep kykNET — WhatsApp trial →",
      message:
        "Hi! I want kykNET / Afrikaans TV without DStv on my [Hisense / Samsung / Firestick]. Please send the free 24-hour trial.",
      ref: "Blog-Kyknet",
    },
    howTo: {
      name: "Watch kykNET on Mzansi Stream",
      description:
        "Order a WhatsApp trial, favourite the Afrikaans folder, and test kykNET on the lounge TV.",
      totalTime: "PT10M",
      supply: ["WhatsApp", "Smart TV or Firestick"],
      tool: ["IPTV Smarters or TiviMate"],
    },
    sections: [
      {
        id: "who",
        h2: "Who this page is for",
        body: [
          "Parents who kept DStv Compact or Family 'for the Afrikaans channels' while the rest of the house streams on phones. Students who went home for the weekend and realised the soaps are not on a free app. Anyone who searched 'watch kykNET online' and found a Facebook group instead of a setup.",
          "If you want a full Afrikaans-language site experience, use the language landing. This article stays in English so the how-to is exact — we do not machine-translate player menus.",
        ],
      },
      {
        id: "channels",
        h2: "The Afrikaans cluster you are actually paying DStv for",
        body: [
          "The homepage channel preview already lists kykNET, Mzansi Magic, SABC 1/2/3, e.tv. On a full pack you also look for kykNET & kie and VIA — the 'and kie' channel is the one people notice is missing when a cheap reseller sends a sports-only list.",
          "Ask WhatsApp to confirm those names in the trial. If a seller cannot show kykNET in the 24-hour test, they do not have your household's product, even if SuperSport looks fine.",
        ],
      },
      {
        id: "devices",
        h2: "Hisense, Samsung and the remote that still feels like DStv",
        body: [
          "Afrikaans-majority households often have a Hisense or Samsung, not a Firestick. Use IPTV Smarters from the TV store (VIDAA / Tizen). A parent who only wants two buttons can get a MAG — we whitelist the MAC on WhatsApp. Teenagers can keep TiviMate on a bedroom Max.",
        ],
      },
      {
        id: "howto",
        h2: "From WhatsApp to kykNET",
        body: [
          "Same ten-minute path as sport, different favourites.",
        ],
        steps: [
          {
            title: "Message WhatsApp for a trial",
            text: "Say 'kykNET / Afrikaans TV' and the TV brand. No card.",
          },
          {
            title: "Favourite kykNET, kykNET & kie, VIA, SABC 2",
            text: "Put them in a folder named Afrikaans so the remote does not drown in 20,000+ channels.",
          },
          {
            title: "Watch an evening slot on the lounge TV",
            text: "If the soap holds, the pack is real. Then add SuperSport PSL for the rest of the family on the same plan.",
          },
          {
            title: "Pay on a local rail",
            text: "EFT, SnapScan, Ozow, Capitec Pay. 12-month at R1,199 is the published year — not a language surcharge.",
          },
        ],
      },
      {
        id: "family",
        h2: "One pack, two motivations",
        body: [
          "This is why IPTV beats a DStv downsell: Compact may keep some Afrikaans entertainment and still drop Premier League. Mzansi Stream does not split the family into 'sport house' and 'soap house'. One WhatsApp plan carries both. Extra connections are a household question — see the multi-device guide — not a language question.",
        ],
      },
      {
        id: "af",
        h2: "Afrikaans on the site vs Afrikaans on the TV",
        body: [
          "The TV channels are Afrikaans. This article is English so the TiviMate and Smarters steps stay accurate. Native Afrikaans homepage and language-landing copy already exist elsewhere on iptvmzansi.com. We will not auto-translate this guide into thin Afrikaans and pretend it is a second market page.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I watch kykNET without DStv?",
        a: "Yes. Mzansi Stream includes kykNET in the same pack as SABC, e.tv and SuperSport. Ask WhatsApp to confirm kykNET & kie and VIA on the trial.",
      },
      {
        q: "Is there an extra fee for Afrikaans channels?",
        a: "No. Published plans are 1 / 3 / 6 / 12 months for the full pack. Language is not a tier.",
      },
      {
        q: "Will it work on a Hisense?",
        a: "Yes. Use IPTV Smarters on VIDAA, or plug in a Firestick. The Hisense device page has the taps.",
      },
      {
        q: "Do I need Afrikaans support in the WhatsApp chat?",
        a: "Message in Afrikaans if you prefer. Setup menus in TiviMate / Smarters stay in the app's own language.",
      },
      {
        q: "What about M-Net and Afrikaans movies?",
        a: "The movies pillar covers the VOD shelf. Live M-Net-family entertainment sits in the same playlist — confirm the names you care about during the trial.",
      },
      {
        q: "Can granny use this without a smartphone?",
        a: "Someone in the house needs WhatsApp once for the order. After that a MAG or a Smart TV app is remote-only. Pin the chat for renewals.",
      },
    ],
    relatedLinks: [
      { label: "Afrikaans language landing", href: "/en-za/language/iptv-afrikaans/" },
      { label: "IPTV on Hisense VIDAA", href: "/en-za/devices/hisense-vidaa/" },
      { label: "IPTV on multiple devices", href: "/en-za/blog/iptv-multiple-devices-south-africa/" },
      { label: "DStv alternative — full guide", href: "/en-za/dstv-alternative/" },
    ],
  },
];

export const BLOG_GUIDE_SLUGS: readonly string[] = BLOG_GUIDES.map((g) => g.slug);
