// lib/seo/communities.ts
// Section B.5.2 — Foreign communities living in SA, served at
// /[locale]/communities/[nationality]/.

export type CommunityChannel = {
  /** Display name in its native script where applicable. */
  native: string;
  /** Latin transliteration / English label if `native` is non-Latin. */
  latin?: string;
};

export type CommunityPage = {
  slug: string;
  /** "Zimbabwean", "Indian", "Nollywood" etc. */
  demonym: string;
  /** "Zimbabwe", "India", "Nigeria" etc. — used in the H1 phrasing. */
  homeCountry: string;
  flag: string;
  /** Languages the community typically watches in. */
  languages: string[];
  /** SA cities with notable concentration of this community. */
  hubCities: string[];
  /** Featured broadcasters, grouped natively + transliterated. */
  channels: CommunityChannel[];
  /** SEO meta. */
  meta: { title: string; description: string };
};

export const COMMUNITIES: CommunityPage[] = [
  {
    slug: "zimbabwean",
    demonym: "Zimbabwean",
    homeCountry: "Zimbabwe",
    flag: "🇿🇼",
    languages: ["English", "Shona", "Ndebele"],
    hubCities: ["Johannesburg", "Pretoria", "Cape Town"],
    channels: [
      { native: "ZBC TV" },
      { native: "ZBC News" },
      { native: "ZTV" },
      { native: "Star FM TV" },
      { native: "ZiFM Stereo TV" },
      { native: "3KTV" },
      { native: "NRTV" },
      { native: "Tele Network" },
    ],
    meta: {
      title: "Zimbabwean TV in South Africa — ZBC, Star FM, ZTV",
      description:
        "Watch Zimbabwean TV in South Africa — ZBC TV, Star FM TV, ZTV, ZiFM and the full Zim broadcaster line-up in HD. Built for the Zim community in Joburg, Pretoria and Cape Town.",
    },
  },
  {
    slug: "mozambican",
    demonym: "Mozambican",
    homeCountry: "Moçambique",
    flag: "🇲🇿",
    languages: ["Português", "English"],
    hubCities: ["Johannesburg", "Pretoria", "Nelspruit"],
    channels: [
      { native: "TVM" },
      { native: "RTP África" },
      { native: "SIC" },
      { native: "TVI" },
      { native: "STV" },
      { native: "RTP1" },
      { native: "Record Internacional" },
    ],
    meta: {
      title: "Moçambicano TV em África do Sul — TVM, RTP África, SIC",
      description:
        "Assistir TVM, RTP África, SIC e TVI em África do Sul. Canais portugueses para a comunidade moçambicana em Joanesburgo, Pretória e Nelspruit.",
    },
  },
  {
    slug: "indian",
    demonym: "Indian",
    homeCountry: "India",
    flag: "🇮🇳",
    languages: ["हिन्दी (Hindi)", "தமிழ் (Tamil)", "తెలుగు (Telugu)", "English"],
    hubCities: ["Durban", "Johannesburg", "Pretoria"],
    channels: [
      { native: "स्टार प्लस", latin: "Star Plus" },
      { native: "ज़ी टीवी", latin: "Zee TV" },
      { native: "सोनी एंटरटेनमेंट टेलीविजन", latin: "Sony Entertainment" },
      { native: "Star Bharat" },
      { native: "Colors TV" },
      { native: "&TV" },
      { native: "சன் டிவி", latin: "Sun TV" },
      { native: "Sun News" },
      { native: "Asianet" },
      { native: "Star Vijay" },
      { native: "Zee Cinema" },
      { native: "Star Sports India" },
    ],
    meta: {
      title: "Indian TV in South Africa — Star Plus, Zee, Sun TV",
      description:
        "Watch Star Plus, Zee TV, Sony, Sun TV, Asianet and 200+ Indian channels in Hindi, Tamil and Telugu. For the SA-Indian community in Durban, Joburg and Pretoria.",
    },
  },
  {
    slug: "nigerian",
    demonym: "Nigerian",
    homeCountry: "Nigeria",
    flag: "🇳🇬",
    languages: ["English", "Yoruba", "Igbo", "Hausa"],
    hubCities: ["Johannesburg", "Cape Town", "Pretoria"],
    channels: [
      { native: "Channels TV" },
      { native: "AIT (Africa Independent Television)" },
      { native: "TVC" },
      { native: "Nollywood TV" },
      { native: "Africa Magic Showcase" },
      { native: "Africa Magic Yoruba" },
      { native: "Africa Magic Igbo" },
      { native: "Africa Magic Hausa" },
      { native: "ROK TV" },
      { native: "NTA" },
    ],
    meta: {
      title: "Nollywood & Nigerian TV in South Africa — Channels, AIT, NTA",
      description:
        "Watch Channels TV, AIT, NTA, Nollywood TV and the full Africa Magic line-up in South Africa. For the Nigerian community in Joburg, Cape Town and Pretoria.",
    },
  },
  {
    slug: "british",
    demonym: "British",
    homeCountry: "United Kingdom",
    flag: "🇬🇧",
    languages: ["English"],
    hubCities: ["Cape Town", "Johannesburg", "Plettenberg Bay"],
    channels: [
      { native: "BBC One" },
      { native: "BBC Two" },
      { native: "BBC News" },
      { native: "BBC iPlayer catalogue" },
      { native: "ITV1" },
      { native: "Channel 4" },
      { native: "Sky News" },
      { native: "Sky Sports Main Event" },
      { native: "Sky Sports Premier League" },
      { native: "Sky Sports Cricket" },
      { native: "Dave" },
      { native: "GB News" },
    ],
    meta: {
      title: "British TV in South Africa — BBC, ITV, Sky Sports",
      description:
        "Watch BBC, ITV, Channel 4, Sky News and Sky Sports in South Africa. Built for the British expat community in Cape Town, Johannesburg and the Garden Route.",
    },
  },
  {
    slug: "pakistani",
    demonym: "Pakistani",
    homeCountry: "Pakistan",
    flag: "🇵🇰",
    languages: ["اردو (Urdu)", "English"],
    hubCities: ["Johannesburg", "Pretoria", "Cape Town"],
    channels: [
      { native: "اے آر وائی نیوز", latin: "ARY News" },
      { native: "اے آر وائی ڈیجیٹل", latin: "ARY Digital" },
      { native: "جیو نیوز", latin: "Geo News" },
      { native: "جیو انٹرٹینمنٹ", latin: "Geo Entertainment" },
      { native: "ہم ٹی وی", latin: "HUM TV" },
      { native: "ایکسپریس نیوز", latin: "Express News" },
      { native: "PTV Home" },
      { native: "PTV Sports" },
    ],
    meta: {
      title: "Pakistani TV in South Africa — ARY, Geo, HUM TV",
      description:
        "Watch ARY News, Geo, HUM TV, PTV Sports and the full Pakistani drama line-up in Urdu. For the Pakistani community in Joburg and Pretoria.",
    },
  },
  {
    slug: "bangladeshi",
    demonym: "Bangladeshi",
    homeCountry: "Bangladesh",
    flag: "🇧🇩",
    languages: ["বাংলা (Bengali)", "English"],
    hubCities: ["Johannesburg", "Pretoria", "Durban"],
    channels: [
      { native: "Channel i" },
      { native: "একুশে টিভি", latin: "Ekushey TV" },
      { native: "এনটিভি", latin: "NTV" },
      { native: "এটিএন বাংলা", latin: "ATN Bangla" },
      { native: "Somoy TV" },
      { native: "Independent TV" },
      { native: "BTV" },
    ],
    meta: {
      title: "Bangladeshi TV in South Africa — Channel i, ATN, NTV",
      description:
        "Watch Channel i, NTV, ATN Bangla, Ekushey TV and the full Bengali line-up in South Africa. For the Bangladeshi community in Joburg, Pretoria and Durban.",
    },
  },
  {
    slug: "congolese-drc",
    demonym: "Congolese",
    homeCountry: "Democratic Republic of the Congo",
    flag: "🇨🇩",
    languages: ["Français", "Lingala", "Swahili", "Tshiluba"],
    hubCities: ["Johannesburg", "Cape Town", "Pretoria"],
    channels: [
      { native: "RTNC1" },
      { native: "RTNC2" },
      { native: "Antenne A" },
      { native: "B-One" },
      { native: "Tropicana TV" },
      { native: "RTGA" },
      { native: "Digital Congo TV" },
      { native: "TV5 Monde Afrique" },
      { native: "Canal+ Afrique" },
    ],
    meta: {
      title: "Congolese / DRC TV in South Africa — RTNC, Antenne A, B-One",
      description:
        "Regardez RTNC1, RTNC2, B-One et la TV congolaise en Afrique du Sud. Pour la communauté congolaise à Joburg, Cape Town et Pretoria.",
    },
  },
  {
    slug: "ethiopian",
    demonym: "Ethiopian",
    homeCountry: "Ethiopia",
    flag: "🇪🇹",
    languages: ["አማርኛ (Amharic)", "Oromiffa", "English"],
    hubCities: ["Johannesburg", "Pretoria", "Cape Town"],
    channels: [
      { native: "ኢቢሲ", latin: "EBC (Ethiopian Broadcasting Corp)" },
      { native: "ኢቢኤስ", latin: "EBS TV" },
      { native: "Fana TV" },
      { native: "Kana TV" },
      { native: "ETV" },
      { native: "Walta TV" },
      { native: "OMN" },
    ],
    meta: {
      title: "Ethiopian TV in South Africa — EBC, EBS, Kana",
      description:
        "Watch EBC, EBS, Kana, Fana and the full Ethiopian line-up in Amharic and Oromiffa in South Africa. For the Ethiopian community in Joburg and Pretoria.",
    },
  },
  {
    slug: "somali",
    demonym: "Somali",
    homeCountry: "Somalia",
    flag: "🇸🇴",
    languages: ["Soomaali", "العربية (Arabic)", "English"],
    hubCities: ["Johannesburg", "Pretoria", "Cape Town"],
    channels: [
      { native: "SNTV (Somali National TV)" },
      { native: "Universal TV" },
      { native: "Horn Cable TV" },
      { native: "Royal TV" },
      { native: "Hidig TV" },
      { native: "Astaan TV" },
      { native: "Eastern TV" },
    ],
    meta: {
      title: "Somali TV in South Africa — SNTV, Universal, Horn Cable",
      description:
        "Watch SNTV, Universal TV, Horn Cable, Royal and the full Somali line-up in South Africa. For the Somali community in Joburg, Pretoria and Cape Town.",
    },
  },
  {
    slug: "chinese",
    demonym: "Chinese",
    homeCountry: "China",
    flag: "🇨🇳",
    languages: ["普通话 (Mandarin)", "粵語 (Cantonese)", "English"],
    hubCities: ["Johannesburg", "Cape Town", "Pretoria"],
    channels: [
      { native: "中国中央电视台", latin: "CCTV1" },
      { native: "CCTV-4 (国际频道)" },
      { native: "CCTV-9 纪录频道", latin: "CCTV-9 Documentary" },
      { native: "CGTN" },
      { native: "湖南卫视", latin: "Hunan TV" },
      { native: "浙江卫视", latin: "Zhejiang TV" },
      { native: "东方卫视", latin: "Dragon TV / Shanghai" },
      { native: "鳳凰衛視", latin: "Phoenix TV (HK)" },
      { native: "TVB Jade (HK)" },
    ],
    meta: {
      title: "Chinese TV in South Africa — CCTV, CGTN, Hunan TV, Phoenix",
      description:
        "Watch CCTV, CGTN, Hunan TV, Phoenix TV and TVB in Mandarin and Cantonese in South Africa. For the Chinese community in Joburg and Cape Town.",
    },
  },
  {
    slug: "portuguese",
    demonym: "Portuguese",
    homeCountry: "Portugal",
    flag: "🇵🇹",
    languages: ["Português"],
    hubCities: ["Johannesburg", "Pretoria", "Cape Town"],
    channels: [
      { native: "RTP1" },
      { native: "RTP2" },
      { native: "RTP África" },
      { native: "RTP Internacional" },
      { native: "SIC" },
      { native: "SIC Notícias" },
      { native: "TVI" },
      { native: "TVI Internacional" },
      { native: "Benfica TV" },
      { native: "Sporting TV" },
      { native: "Porto Canal" },
    ],
    meta: {
      title: "Portuguese TV in South Africa — RTP, SIC, TVI, Benfica TV",
      description:
        "Assistir RTP, SIC, TVI, RTP África, Benfica TV e Sporting TV em África do Sul. Para a comunidade portuguesa em Joanesburgo, Pretória e Cape Town.",
    },
  },
  {
    slug: "greek",
    demonym: "Greek",
    homeCountry: "Greece",
    flag: "🇬🇷",
    languages: ["Ελληνικά (Greek)", "English"],
    hubCities: ["Johannesburg", "Pretoria", "Cape Town"],
    channels: [
      { native: "ΕΡΤ1", latin: "ERT 1" },
      { native: "ΕΡΤ2", latin: "ERT 2" },
      { native: "ΕΡΤ Sports" },
      { native: "Mega Channel" },
      { native: "ANT1" },
      { native: "Star Channel Greece" },
      { native: "Open Beyond" },
      { native: "Skai" },
    ],
    meta: {
      title: "Greek TV in South Africa — ERT, Mega, ANT1, Skai",
      description:
        "Watch ERT, Mega, ANT1, Star and Skai in Greek in South Africa. For the historic Greek community in Joburg, Pretoria and Cape Town.",
    },
  },
  {
    slug: "french",
    demonym: "French",
    homeCountry: "France & Francophone Africa",
    flag: "🇫🇷",
    languages: ["Français"],
    hubCities: ["Cape Town", "Johannesburg", "Pretoria"],
    channels: [
      { native: "TF1" },
      { native: "France 2" },
      { native: "France 3" },
      { native: "France 24" },
      { native: "M6" },
      { native: "Canal+" },
      { native: "Canal+ Afrique" },
      { native: "TV5 Monde" },
      { native: "BFM TV" },
      { native: "CNews" },
      { native: "RMC Sport" },
    ],
    meta: {
      title: "French TV in South Africa — TF1, France 2, Canal+, TV5",
      description:
        "Regardez TF1, France 2, Canal+, France 24, TV5 Monde et BFM TV en Afrique du Sud. Pour la communauté francophone à Cape Town, Joburg et Pretoria.",
    },
  },
  {
    slug: "german",
    demonym: "German",
    homeCountry: "Germany",
    flag: "🇩🇪",
    languages: ["Deutsch", "English"],
    hubCities: ["Cape Town", "Johannesburg", "Hermanus"],
    channels: [
      { native: "ARD (Das Erste)" },
      { native: "ZDF" },
      { native: "RTL" },
      { native: "Sat.1" },
      { native: "ProSieben" },
      { native: "Deutsche Welle" },
      { native: "n-tv" },
      { native: "Sky Sport Bundesliga" },
    ],
    meta: {
      title: "German TV in South Africa — ARD, ZDF, RTL, Deutsche Welle",
      description:
        "Watch ARD, ZDF, RTL, ProSieben, Sky Sport Bundesliga and Deutsche Welle in South Africa. For the German community in Cape Town, Joburg and Hermanus.",
    },
  },
];

export function getCommunity(slug: string): CommunityPage | undefined {
  return COMMUNITIES.find((c) => c.slug === slug);
}

export const COMMUNITY_SLUGS = COMMUNITIES.map((c) => c.slug);

/** Top 3 communities per major SA city — used for cross-linking. */
export const CITY_TOP_COMMUNITIES: Record<string, string[]> = {
  johannesburg: ["zimbabwean", "indian", "nigerian"],
  pretoria: ["zimbabwean", "mozambican", "indian"],
  "cape-town": ["british", "portuguese", "chinese"],
  durban: ["indian", "zimbabwean", "british"],
};
