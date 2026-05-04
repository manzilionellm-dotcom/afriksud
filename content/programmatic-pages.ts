/**
 * Programmatic SEO templates — South Africa
 * 4 templates → 25+ generated pages (cities, sports, devices, vs-competitors)
 */

const BRAND = 'Mzansi Stream' as const;
const DOMAIN = 'https://espg.vercel.app' as const;

// ─── 1. CITY PAGES ───────────────────────────────────────────────────────────
export const SA_CITIES_DATA = [
  { slug: 'cape-town',    name: 'Cape Town',    team: 'Cape Town City FC, Stormers (rugby)',           isp: 'Vumatel, Frogfoot, Openserve', province: 'Western Cape',  channel: 'SABC 1, kykNET', pop: 4600000 },
  { slug: 'johannesburg', name: 'Johannesburg', team: 'Kaizer Chiefs, Orlando Pirates, Lions (rugby)', isp: 'Openserve, Vumatel, MTN',      province: 'Gauteng',       channel: 'SABC 1, e.tv',   pop: 5635000 },
  { slug: 'durban',       name: 'Durban',       team: 'AmaZulu FC, Sharks (rugby)',                    isp: 'Openserve, Vumatel, MTN',      province: 'KwaZulu-Natal', channel: 'SABC 2, e.tv',   pop: 3650000 },
  { slug: 'pretoria',     name: 'Pretoria',     team: 'Mamelodi Sundowns, Bulls (rugby)',              isp: 'Openserve, Vumatel, Telkom',   province: 'Gauteng',       channel: 'SABC 1, kykNET', pop: 2470000 },
  { slug: 'gqeberha',     name: 'Gqeberha',     team: 'Chippa United, EP Elephants',                   isp: 'Openserve, MTN, Cell C',       province: 'Eastern Cape',  channel: 'SABC 2, e.tv',   pop: 1260000 },
  { slug: 'bloemfontein', name: 'Bloemfontein', team: 'Bloemfontein Celtic, Free State Cheetahs',      isp: 'Openserve, Telkom',            province: 'Free State',    channel: 'SABC 2, kykNET', pop: 555000 },
  { slug: 'east-london',  name: 'East London',  team: 'Bidvest Wits',                                  isp: 'Openserve, MTN',               province: 'Eastern Cape',  channel: 'SABC 1, e.tv',   pop: 480000 },
  { slug: 'polokwane',    name: 'Polokwane',    team: 'Black Leopards',                                isp: 'Openserve, MTN, Vodacom',      province: 'Limpopo',       channel: 'SABC 1, e.tv',   pop: 130000 },
];

export function cityPageData(slug: string) {
  const city = SA_CITIES_DATA.find(c => c.slug === slug);
  if (!city) return null;
  return {
    metadata: {
      title: `IPTV ${city.name} 2026 — From R199/month · 10-Min Activation`,
      description: `Premium IPTV for ${city.name}. 20,000+ channels in 4K including ${city.channel}, SuperSport (DStv Premiership), Premier League and ${city.team}. Compatible with ${city.isp}. 24h free trial.`,
      h1: `IPTV in ${city.name} — The Premium DStv Alternative`,
      keywords: [
        `iptv ${city.slug}`,
        `iptv ${city.slug} cheap`,
        `iptv ${city.slug} 2026`,
        `best iptv ${city.slug}`,
      ],
    },
    content: {
      intro: `If you live in ${city.name} (${city.province}, population ${(city.pop / 1000).toFixed(0)}k) and you are tired of paying R899+ per month for DStv Premium, ${BRAND} is the answer. 20,000+ live channels, all the SuperSport DStv Premiership matches, ${city.team} games, ${city.channel} and every major South African and international channel. Works with all local ISPs (${city.isp}).`,
      whyHere: `Our edge servers are tuned for the major fibre nodes in ${city.name} — low latency, no buffering during big matches, stable 4K even during peak hours. More than 200 households in ${city.name} have already switched from DStv to ${BRAND}.`,
      faqs: [
        { q: `Does IPTV work with my ${city.isp.split(',')[0]} fibre line in ${city.name}?`, a: `Yes. We have tested the service with all major ISPs in ${city.name}: ${city.isp}. No throttling, no blocking.` },
        { q: `Can I watch ${city.team} matches?`, a: `Yes — every match. SuperSport coverage of the DStv Premiership and URC, plus all knockout cup competitions.` },
        { q: `Is ${city.channel} included?`, a: `Yes, ${city.channel} is included in HD along with SABC 1, SABC 2, SABC 3, e.tv and all the regional broadcasters.` },
      ],
    },
  };
}

// ─── 2. SPORT PAGES ──────────────────────────────────────────────────────────
export const SPORTS_DATA = [
  {
    slug: 'dstv-premiership',
    name: 'DStv Premiership',
    nameLong: 'DStv Premiership (PSL) 2026/27',
    teams: 'Mamelodi Sundowns, Kaizer Chiefs, Orlando Pirates, SuperSport United, Stellenbosch FC and all 16 PSL clubs',
    channelsIncluded: ['SuperSport PSL', 'SuperSport Variety 1', 'SuperSport Variety 2'],
    competitor: 'DStv Premium (R899/month)',
    season: '2026/27',
    matchday: 'every weekend from August to May',
  },
  {
    slug: 'urc-rugby',
    name: 'URC Rugby',
    nameLong: 'United Rugby Championship (URC) 2026/27',
    teams: 'Stormers, Bulls, Sharks, Lions and the European franchises',
    channelsIncluded: ['SuperSport Rugby', 'SuperSport Grandstand'],
    competitor: 'DStv Premium with the Sport add-on',
    season: '2026/27',
    matchday: 'Friday and Saturday from October to June',
  },
  {
    slug: 'premier-league',
    name: 'Premier League',
    nameLong: 'English Premier League 2026/27',
    teams: 'Manchester City, Arsenal, Liverpool, Manchester United, Chelsea and the rest of the EPL',
    channelsIncluded: ['SuperSport Premier League', 'SuperSport Variety 3'],
    competitor: 'DStv Premium (R899/month) or DStv Compact Plus (R549/month)',
    season: '2026/27',
    matchday: 'every weekend from August to May',
  },
  {
    slug: 'cricket',
    name: 'Cricket',
    nameLong: 'Cricket South Africa — Proteas + SA20',
    teams: 'Proteas (national side), MI Cape Town, Joburg Super Kings, Durban Super Giants and the SA20 franchises',
    channelsIncluded: ['SuperSport Cricket', 'SuperSport Action'],
    competitor: 'DStv Premium',
    season: 'Year-round',
    matchday: 'most weekdays during international tours and SA20 season',
  },
];

export function sportPageData(slug: string) {
  const sport = SPORTS_DATA.find(s => s.slug === slug);
  if (!sport) return null;
  return {
    metadata: {
      title: `IPTV ${sport.name} ${sport.season} — Watch Every Match in 4K · ${BRAND}`,
      description: `How to watch ${sport.nameLong} without paying ${sport.competitor}. 20,000+ channels including ${sport.channelsIncluded.slice(0, 3).join(', ')} in 4K. From R199/month.`,
      h1: `IPTV ${sport.name} ${sport.season} — The Cheapest Way to Watch Every Match`,
      keywords: [
        `iptv ${sport.slug}`,
        `watch ${sport.slug} live`,
        `iptv ${sport.slug} 4k`,
        `${sport.name.toLowerCase()} streaming cheap south africa`,
      ],
    },
    content: {
      intro: `Watching ${sport.nameLong} costs ${sport.competitor} in South Africa. With ${BRAND} you pay from R199/month and get the same channels: ${sport.channelsIncluded.join(', ')}. 4K quality, no buffering, no contract.`,
      whatIncluded: `You get ${sport.teams}. Every match ${sport.matchday}, live, in English commentary, in 4K UHD.`,
      faqs: [
        { q: `Can I watch ${sport.name} on any device?`, a: `Yes. Works on Firestick, Smart TV (Samsung, LG, Sony), Android TV, iPhone, iPad, Android, MAG Box and PC.` },
        { q: `Is it legal to watch ${sport.name} via IPTV?`, a: `IPTV itself is a legal technology. We provide the M3U link and the responsibility for use lies with each user, the same as any other media player.` },
        { q: `Is there buffering during big matches?`, a: `No. Our servers are sized for the peak loads of PSL Soweto Derby and Premier League fixtures. Stable 4K even during finals.` },
      ],
    },
  };
}

// ─── 3. DEVICE PAGES ─────────────────────────────────────────────────────────
export const DEVICES_DATA = [
  { slug: 'firestick',         name: 'Amazon Firestick 4K',                  app: 'TiviMate / IPTV Smarters', time: 10, difficulty: 'Easy' },
  { slug: 'smart-tv-samsung',  name: 'Samsung Smart TV (Tizen)',             app: 'IPTV Smarters Pro',        time: 15, difficulty: 'Medium' },
  { slug: 'smart-tv-lg',       name: 'LG Smart TV (webOS)',                  app: 'Smart IPTV / SS IPTV',     time: 12, difficulty: 'Medium' },
  { slug: 'android-tv-box',    name: 'Android TV Box (MiBox / Nvidia Shield)', app: 'TiviMate Premium',       time: 8,  difficulty: 'Easy' },
  { slug: 'iphone-ipad',       name: 'iPhone / iPad',                        app: 'IPTV Smarters Player',     time: 5,  difficulty: 'Very easy' },
  { slug: 'android',           name: 'Android (phone/tablet)',               app: 'TiviMate / IPTV Smarters', time: 5,  difficulty: 'Very easy' },
  { slug: 'mag-box',           name: 'MAG Box (322, 524, 540)',              app: 'Built-in Stalker portal',  time: 7,  difficulty: 'Medium' },
  { slug: 'macbook-windows',   name: 'MacBook / Windows PC',                 app: 'VLC / Kodi / IPTV Smarters', time: 8, difficulty: 'Easy' },
];

export function devicePageData(slug: string) {
  const dev = DEVICES_DATA.find(d => d.slug === slug);
  if (!dev) return null;
  return {
    metadata: {
      title: `How to Install IPTV on ${dev.name} in ${dev.time} Minutes — 2026 Guide`,
      description: `Step-by-step guide to set up IPTV on ${dev.name} using ${dev.app}. Difficulty: ${dev.difficulty}. Compatible with ${BRAND}. WhatsApp support in English.`,
      h1: `Install IPTV on ${dev.name} — Complete 2026 Tutorial`,
      keywords: [
        `install iptv ${dev.slug}`,
        `iptv ${dev.slug} tutorial`,
        `iptv ${dev.slug} setup south africa`,
        `how to put iptv on ${dev.slug}`,
      ],
    },
    content: {
      intro: `Setting up IPTV on ${dev.name} takes less than ${dev.time} minutes with the ${dev.app} app. This guide covers every step, with screenshots, common errors and tips so the install works first time.`,
      difficulty: dev.difficulty,
      time: dev.time,
      app: dev.app,
      faqs: [
        { q: `Does ${dev.name} support 4K UHD?`, a: `Yes — every recent model of ${dev.name} plays IPTV in 4K HDR without issues.` },
        { q: `Do I need to root or jailbreak?`, a: `No. The install is fully legal and does not require modifying the operating system.` },
        { q: `What if I get stuck?`, a: `We help by WhatsApp in English, 7 days a week. Most installs are sorted in under 10 minutes.` },
      ],
    },
  };
}

// ─── 4. VERSUS PAGES ─────────────────────────────────────────────────────────
export const COMPETITORS_DATA = [
  {
    slug: 'dstv-premium',
    name: 'DStv Premium',
    price: 899,
    pros: ['Full SuperSport line-up', 'Official 24/7 support', 'Polished apps'],
    cons: ['R899/month is steep', '24-month contract on most decoders', 'Geo-locked outside SA', 'PVR limited'],
  },
  {
    slug: 'dstv-compact',
    name: 'DStv Compact',
    price: 449,
    pros: ['Decent middle tier', 'Includes some SuperSport'],
    cons: ['No Premier League full coverage', 'No 4K', 'Long install delays in major metros'],
  },
  {
    slug: 'showmax',
    name: 'Showmax',
    price: 99,
    pros: ['Cheap streaming', 'Local Mzansi originals'],
    cons: ['Only on-demand, no live TV', 'Sport tier costs extra', 'No EPG'],
  },
  {
    slug: 'netflix',
    name: 'Netflix Premium',
    price: 199,
    pros: ['International originals', 'Polished app'],
    cons: ['No live TV', 'No sport', 'No South African free-to-air channels'],
  },
];

export function versusPageData(slug: string) {
  const c = COMPETITORS_DATA.find(c => c.slug === slug);
  if (!c) return null;
  return {
    metadata: {
      title: `${BRAND} vs ${c.name} 2026 — Honest Comparison of Price, Channels & Quality`,
      description: `${BRAND} or ${c.name}? Honest comparison: price, channels, devices, 4K quality. You save R${(c.price - 199).toFixed(0)}/month with ${BRAND}.`,
      h1: `${BRAND} vs ${c.name} — 2026 Comparison`,
      keywords: [
        `iptv vs ${c.slug}`,
        `${c.slug} alternative`,
        `${c.slug} vs iptv`,
        `cheaper than ${c.slug}`,
      ],
    },
    content: {
      intro: `${c.name} costs R${c.price}/month. ${BRAND} costs from R199/month with more channels, no contract and WhatsApp support in English. Here is the honest difference.`,
      pricingDelta: `Monthly saving: R${(c.price - 199).toFixed(0)}. Annual saving: R${((c.price - 199) * 12).toFixed(0)}.`,
      pros: c.pros,
      cons: c.cons,
      faqs: [
        { q: `Why is ${BRAND} cheaper than ${c.name}?`, a: `${c.name} carries proprietary infrastructure, decoder rentals, broadcast licenses and traditional TV marketing. ${BRAND} is lean — direct distribution via WhatsApp, no middlemen, no decoder hardware.` },
        { q: `Is the quality the same as ${c.name}?`, a: `Yes. Same 4K source, same channel feeds, same latency. The difference is the commercial structure, not the picture.` },
        { q: `Can I cancel easily?`, a: `Yes — no contract, no auto-renewal. You pay once and the service expires at the end of the chosen period.` },
      ],
    },
  };
}
