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
export const expatCountries: (ExpatCountry & { guidePath: string })[] = [
  { flag: "🇬🇧", code: "gb", name: "United Kingdom", desc: "Moving from SA, household subscriptions and UK viewing.", guidePath: "/en-gb/sa-abroad/uk" },
  { flag: "🇦🇺", code: "au", name: "Australia", desc: "Check your device and local programme availability. See prepaid plans in US dollars.", guidePath: "/en-au/sa-abroad/australia" },
  { flag: "🇳🇿", code: "nz", name: "New Zealand", desc: "Ask about a programme in New Zealand and try the service on your home connection.", guidePath: "/en-nz/sa-abroad/new-zealand" },
  { flag: "🇺🇸", code: "us", name: "United States", desc: "Local listings and time zones from New York to Los Angeles.", guidePath: "/en-us/sa-abroad/usa" },
  { flag: "🇨🇦", code: "ca", name: "Canada", desc: "Checking a programme in Toronto, Calgary or Vancouver.", guidePath: "/en-us/sa-abroad/canada" },
  { flag: "🇦🇪", code: "ae", name: "United Arab Emirates", desc: "Viewing times in Dubai and Abu Dhabi and the price in rand.", guidePath: "/en-ae/sa-abroad/uae" },
  { flag: "🇩🇪", code: "de", name: "Germany", desc: "Find the German broadcaster for a South African fixture.", guidePath: "/en-za/sa-abroad/germany" },
  { flag: "🇮🇪", code: "ie", name: "Ireland", desc: "Local programme times for Dublin, Cork and Galway.", guidePath: "/en-gb/sa-abroad/ireland" },
  { flag: "🇳🇱", code: "nl", name: "Netherlands", desc: "Programme availability and local time in the Netherlands.", guidePath: "/en-za/sa-abroad/netherlands" },
  { flag: "🇧🇪", code: "be", name: "Belgium", desc: "Find a programme from Brussels, Antwerp or Ghent.", guidePath: "/en-za/sa-abroad/belgium" },
  { flag: "🇨🇭", code: "ch", name: "Switzerland", desc: "Viewing times and payment currency for Swiss households.", guidePath: "/en-za/sa-abroad/switzerland" },
  { flag: "🇲🇿", code: "mz", name: "Mozambique", desc: "Regional guide for viewers in Maputo and Beira.", guidePath: "/en-za/sadc/mozambique" },
  { flag: "🇿🇼", code: "zw", name: "Zimbabwe", desc: "Regional guide for households in Harare and Bulawayo.", guidePath: "/en-za/sadc/zimbabwe" },
  { flag: "🇧🇼", code: "bw", name: "Botswana", desc: "Regional guide for Gaborone and Francistown.", guidePath: "/en-za/sadc/botswana" },
  { flag: "🇳🇦", code: "na", name: "Namibia", desc: "Regional guide for Windhoek, Walvis Bay and Swakopmund.", guidePath: "/en-za/sadc/namibia" },
  { flag: "🇸🇬", code: "sg", name: "Singapore", desc: "Convert a fixture time and check local viewing options.", guidePath: "/en-za/sa-abroad/singapore" },
];
