// components/shared/countries.ts
// 9 main diaspora communities living IN South Africa.
// These are the foreign communities that need TV in their language.
// Tier 1 = highest search volume / ROI.

import type { Country, ExpatCountry } from "./types";

export const countries: Country[] = [
  // ─── TIER 1 — High search volume in SA ──────────────────────────────
  {
    slug: "zimbabwean",
    flag: "🇿🇼",
    name: "Zimbabwean",
    sub: "ZBC News, Star FM, ZTV",
    desc: "Full Zimbabwean channel pack — ZBC News, ZTV1, Star FM, Capitalk, sport and Shona/Ndebele content for the Zimbabwean community in South Africa.",
    wa: "Hi! I want Zimbabwean channels in South Africa.",
    keywords: [
      ["zimbabwean iptv south africa", "1 800/mo"],
      ["zbc tv johannesburg", "1 100/mo"],
      ["star fm streaming sa", "640/mo"],
      ["zim tv channels jhb", "480/mo"],
    ],
    channels: [
      { n: "ZBC News", c: "📰" }, { n: "ZTV1", c: "🎬" }, { n: "Star FM", c: "🎵" },
      { n: "ZBC Live", c: "🎬" }, { n: "Capitalk", c: "📰" }, { n: "ZTN Prime", c: "🎬" },
      { n: "1ZTV", c: "🎬" }, { n: "Joy TV", c: "🎬" },
    ],
  },
  {
    slug: "indian",
    flag: "🇮🇳",
    name: "Indian (हिंदी / தமிழ்)",
    sub: "Star Plus, Zee, Sun TV, Sony",
    desc: "Indian channel pack for Durban, Johannesburg and Cape Town — Bollywood, Star Plus, Zee, Sony, Sun TV (Tamil), Asianet (Malayalam).",
    wa: "Hi! I want Indian / Bollywood channels in South Africa.",
    keywords: [
      ["indian iptv south africa", "1 600/mo"],
      ["bollywood streaming durban", "880/mo"],
      ["zee tv south africa", "720/mo"],
      ["sun tv durban", "560/mo"],
    ],
    channels: [
      { n: "Star Plus HD", c: "🎬" }, { n: "Zee TV HD", c: "🎬" }, { n: "Sony TV", c: "🎬" },
      { n: "Colors TV", c: "🎬" }, { n: "Star Sports 1", c: "🏏" }, { n: "Sun TV (Tamil)", c: "🎬" },
      { n: "Asianet (Malayalam)", c: "🎬" }, { n: "Aaj Tak", c: "📰" }, { n: "Zee Cinema", c: "🎬" },
      { n: "Star Gold", c: "🎬" },
    ],
  },
  {
    slug: "nigerian",
    flag: "🇳🇬",
    name: "Nigerian (Nollywood)",
    sub: "Nollywood TV, AIT, Channels",
    desc: "Nigerian channel pack — Nollywood movies, Channels TV, AIT, Africa Magic Yoruba/Igbo for the large Nigerian community in SA.",
    wa: "Hi! I want Nigerian / Nollywood channels in South Africa.",
    keywords: [
      ["nollywood iptv south africa", "1 300/mo"],
      ["nigerian channels johannesburg", "720/mo"],
      ["channels tv south africa", "480/mo"],
    ],
    channels: [
      { n: "Africa Magic Showcase", c: "🎬" }, { n: "Africa Magic Yoruba", c: "🎬" },
      { n: "Africa Magic Igbo", c: "🎬" }, { n: "Channels TV", c: "📰" },
      { n: "AIT", c: "📰" }, { n: "TVC News Nigeria", c: "📰" }, { n: "Nollywood TV", c: "🎬" },
      { n: "ROK", c: "🎬" },
    ],
  },
  // ─── TIER 2 — Medium volume ─────────────────────────────────────────
  {
    slug: "british",
    flag: "🇬🇧",
    name: "British TV",
    sub: "BBC, ITV, Sky Sports",
    desc: "Full British TV pack — BBC, ITV, Channel 4, Sky Sports for British expats in Cape Town, Joburg and Pretoria.",
    wa: "Hi! I want British TV channels in South Africa.",
    keywords: [
      ["british tv south africa", "980/mo"],
      ["bbc cape town", "560/mo"],
      ["sky sports south africa", "420/mo"],
    ],
    channels: [
      { n: "BBC One HD", c: "🎬" }, { n: "BBC Two", c: "🎬" }, { n: "BBC News", c: "📰" },
      { n: "ITV 1 HD", c: "🎬" }, { n: "Channel 4", c: "🎬" }, { n: "Channel 5", c: "🎬" },
      { n: "Sky Sports Main", c: "⚽" }, { n: "Sky News", c: "📰" }, { n: "BT Sport 1", c: "⚽" },
    ],
  },
  {
    slug: "portuguese",
    flag: "🇵🇹",
    name: "Português / Mozambican",
    sub: "RTP, SIC, TVI, TVM",
    desc: "Portuguese and Mozambican channels — RTP Internacional, SIC, TVI, TVM, STV for Lusophone families across SA.",
    wa: "Hi! I want Portuguese / Mozambican channels in South Africa.",
    keywords: [
      ["portuguese tv south africa", "640/mo"],
      ["tvm mozambique south africa", "320/mo"],
      ["rtp pretoria", "210/mo"],
    ],
    channels: [
      { n: "RTP 1", c: "🎬" }, { n: "RTP Internacional", c: "🎬" }, { n: "SIC", c: "🎬" },
      { n: "TVI", c: "🎬" }, { n: "TVM Mozambique", c: "🎬" }, { n: "STV", c: "🎬" },
    ],
  },
  {
    slug: "french-african",
    flag: "🇨🇩",
    name: "Francophone Africa",
    sub: "Canal+ Afrique, RTNC, RTI",
    desc: "Francophone African channels — Canal+ Afrique, RTNC (DRC), RTI Côte d'Ivoire, Africanews for the growing French-speaking African community in SA.",
    wa: "Hi! I want Francophone African channels in South Africa.",
    keywords: [
      ["congolese iptv south africa", "440/mo"],
      ["canal afrique johannesburg", "260/mo"],
    ],
    channels: [
      { n: "Canal+ Afrique", c: "🎬" }, { n: "RTNC DRC", c: "🎬" }, { n: "RTI Côte d'Ivoire", c: "🎬" },
      { n: "Africa24", c: "📰" }, { n: "Trace Africa", c: "🎵" },
    ],
  },
  // ─── TIER 3 — Niche but loyal ───────────────────────────────────────
  {
    slug: "chinese",
    flag: "🇨🇳",
    name: "中文 Chinese",
    sub: "CCTV, Phoenix, TVB",
    desc: "Chinese channels — CCTV, Phoenix, TVB Jade, Mandarin and Cantonese programming for the Chinese diaspora in SA.",
    wa: "Hi! I want Chinese channels in South Africa.",
    keywords: [
      ["chinese iptv south africa", "320/mo"],
      ["cctv south africa", "180/mo"],
    ],
    channels: [
      { n: "CCTV 1", c: "🎬" }, { n: "CCTV 4 Intl", c: "🎬" },
      { n: "Phoenix InfoNews", c: "📰" }, { n: "Phoenix Chinese", c: "🎬" },
      { n: "TVB Jade", c: "🎬" }, { n: "CCTV Sport", c: "⚽" },
    ],
  },
  {
    slug: "arabic",
    flag: "🇦🇪",
    name: "العربية Arabic",
    sub: "MBC, Al Jazeera, beIN Sports",
    desc: "Full Arabic channel pack — MBC, Al Jazeera, beIN Sports 4K, OSN, Rotana for the Arabic-speaking community in SA.",
    wa: "Hi! I want Arabic channels in South Africa.",
    keywords: [
      ["arabic iptv south africa", "260/mo"],
      ["mbc cape town", "180/mo"],
      ["bein sports johannesburg", "140/mo"],
    ],
    channels: [
      { n: "MBC 1", c: "🎬" }, { n: "MBC 2", c: "🎬" }, { n: "MBC Drama", c: "📺" },
      { n: "Al Jazeera", c: "📰" }, { n: "Al Arabiya", c: "📰" },
      { n: "beIN Sports 1 4K", c: "⚽" }, { n: "OSN Sports", c: "⚽" }, { n: "Rotana Cinema", c: "🎬" },
    ],
  },
  {
    slug: "greek",
    flag: "🇬🇷",
    name: "Ελληνικά Greek",
    sub: "ERT, MEGA, ANT1",
    desc: "Greek channels for the SA Greek community — ERT, MEGA, ANT1, Nova Sports.",
    wa: "Hi! I want Greek channels in South Africa.",
    keywords: [
      ["greek iptv south africa", "180/mo"],
      ["ert johannesburg", "110/mo"],
    ],
    channels: [
      { n: "ERT 1", c: "🎬" }, { n: "MEGA Channel", c: "🎬" }, { n: "ANT1", c: "🎬" },
      { n: "SKAI TV", c: "📰" }, { n: "Nova Sports GR", c: "⚽" },
    ],
  },
];

// ─── EXPATS — DESTINATIONS FOR SOUTH AFRICANS ABROAD ────────────────
// Where SA diaspora lives. Big SEO opportunity: "watch SuperSport in UK", etc.
export const expatCountries: ExpatCountry[] = [
  { flag: "🇬🇧", code: "gb", name: "United Kingdom", desc: "Full SA TV in London, Manchester, Birmingham — SuperSport, SABC, kykNET with no geo-blocking." },
  { flag: "🇦🇺", code: "au", name: "Australia",       desc: "SuperSport and SA channels in Perth, Sydney, Melbourne — perfect for the SA expat community." },
  { flag: "🇳🇿", code: "nz", name: "New Zealand",     desc: "South African channels in Auckland, Wellington, Christchurch — low-latency stream." },
  { flag: "🇺🇸", code: "us", name: "United States",   desc: "Watch SuperSport and SABC in Houston, NYC, LA — large SA community supported." },
  { flag: "🇨🇦", code: "ca", name: "Canada",          desc: "SA TV in Toronto, Vancouver, Calgary, Montreal." },
  { flag: "🇦🇪", code: "ae", name: "UAE / Dubai",     desc: "Stable 4K stream for South Africans in the Emirates." },
  { flag: "🇩🇪", code: "de", name: "Germany",         desc: "SuperSport and SABC in Berlin, Munich, Frankfurt." },
  { flag: "🇮🇪", code: "ie", name: "Ireland",         desc: "SA channels in Dublin, Cork, Galway — growing SA expat community." },
  { flag: "🇳🇱", code: "nl", name: "Netherlands",     desc: "South African TV in Amsterdam, The Hague, Rotterdam — without VPN." },
  { flag: "🇧🇪", code: "be", name: "Belgium",         desc: "SA channels for the diaspora in Brussels and Antwerp." },
  { flag: "🇨🇭", code: "ch", name: "Switzerland",     desc: "Low-latency streaming for SA expats in Zurich, Geneva, Lausanne." },
  { flag: "🇲🇿", code: "mz", name: "Mozambique",      desc: "Cross-border SA + Portuguese channels for Maputo and Beira." },
  { flag: "🇿🇼", code: "zw", name: "Zimbabwe",        desc: "South African channels in Harare and Bulawayo with edge servers." },
  { flag: "🇧🇼", code: "bw", name: "Botswana",        desc: "SA channels in Gaborone and Francistown — same package, regional pricing." },
  { flag: "🇳🇦", code: "na", name: "Namibia",         desc: "South African TV across Windhoek, Walvis Bay, Swakopmund." },
  { flag: "🇸🇬", code: "sg", name: "Singapore",       desc: "SA channels for expats in Singapore — optimised for Asia latency." },
];
