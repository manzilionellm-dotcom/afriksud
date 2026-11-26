// lib/seo/competitors.ts
// Data for /[locale]/vs/[competitor] programmatic pages.

export type Competitor = {
  slug: string;
  name: string;
  priceMonthly: string;
  source?: { label: string; url: string };
  /** Row data for the comparison table: feature → competitor value. */
  features: { label: string; them: string; us: string }[];
  /** The one or two things this competitor genuinely does well — credibility builds trust. */
  theirStrengths: string[];
  /** Where Mzansi Stream specifically beats them. */
  ourEdge: string[];
  meta: { title: string; description: string };
  /** Short hero hook. */
  hook: string;
};

export const COMPETITORS: Competitor[] = [
  {
    slug: "dstv-premium",
    name: "DStv Premium",
    priceMonthly: "R799 Stream or R979 standard satellite per month",
    features: [
      {
        label: "First month",
        them: "R799 Stream or R979 standard satellite",
        us: "USD 15 for one month"
      },
      {
        label: "Full year at current prices",
        them: "R9,588 Stream or R11,748 standard satellite before extras",
        us: "USD 65 prepaid"
      },
      {
        label: "Long-term satellite deal",
        them: "R799/month on 24-month contract including access fee",
        us: "Prepaid terms of 1, 3, 6 or 12 months"
      },
      {
        label: "Programme listings",
        them: "Consult DStv’s guide for the exact event",
        us: "Check the title and territory before paying"
      }
    ],
    theirStrengths: [
      "Satellite is an option when home internet is unreliable.",
      "Premium offers a published sports and entertainment line-up."
    ],
    ourEdge: [
      "Use your own compatible streaming device.",
      "Choose a short prepaid term after testing your own connection."
    ],
    meta: {
      title: "Mzansi Stream vs DStv Premium – compare real costs",
      description: "Compare South African Premium satellite and Stream prices with the amount Mzansi charges upfront for a month or a year."
    },
    hook: "Which Premium price is on your bill? The R799 monthly Stream tariff, R979 standard satellite tariff and R799 satellite contract represent different payment commitments.",
    source: {
      label: "Check the official DStv package guide",
      url: "https://www.dstv.com/en-za/news/149536/how-to-change-upgrade-dstv-package/"
    }
  },
  {
    slug: "dstv-compact-plus",
    name: "DStv Compact Plus",
    priceMonthly: "Existing customers – check your current invoice",
    features: [
      {
        label: "New customers",
        them: "Closed to new subscriptions",
        us: "Trial and prepaid terms available"
      },
      {
        label: "Existing customer",
        them: "Can keep the package under DStv’s migration policy",
        us: "Independent streaming service"
      },
      {
        label: "Cash due today",
        them: "See your account balance",
        us: "USD 15 for one month"
      },
      {
        label: "Annual Mzansi option",
        them: "Compare against twelve actual billing periods",
        us: "USD 65 prepaid"
      }
    ],
    theirStrengths: [
      "Existing subscribers can keep their current package.",
      "The account and TV guide show the package and channel selection."
    ],
    ourEdge: [
      "Try Mzansi before changing an existing package.",
      "Use your own compatible TV or streaming player."
    ],
    meta: {
      title: "DStv Compact Plus – keep it or compare alternatives?",
      description: "See what happened to Compact Plus in South Africa. Check the price on your existing account before changing to a current DStv or Mzansi plan."
    },
    hook: "DStv kept Compact Plus for existing customers and closed it to new subscriptions. Before changing away, confirm with DStv whether you could ever return to that package.",
    source: {
      label: "Read the DStv migration guide",
      url: "https://www.dstv.com/en-za/news/149042/complete-guide-to-new-dstv-packages/"
    }
  },
  {
    slug: "dstv-compact",
    name: "DStv Compact",
    priceMonthly: "Migrated to Sports – R399 Stream or R479 satellite",
    features: [
      {
        label: "Current successor",
        them: "DStv Sports",
        us: "Independent streaming service"
      },
      {
        label: "Monthly price",
        them: "R399 Stream or R479 satellite",
        us: "USD 15 for one month"
      },
      {
        label: "Twelve months at constant price",
        them: "R4,788 Stream or R5,748 satellite before extras",
        us: "USD 65 prepaid"
      },
      {
        label: "Match selection",
        them: "Check fixture and package in DStv’s guide",
        us: "Check broadcaster by event and country"
      }
    ],
    theirStrengths: [
      "DStv publishes the sports bouquet and official listings.",
      "Satellite and internet reception are available."
    ],
    ourEdge: [
      "A compatible existing streaming device can be used.",
      "You can assess the service on your own connection during the free trial."
    ],
    meta: {
      title: "DStv Compact became Sports – prices and alternatives",
      description: "Find the South African successor to DStv Compact, compare satellite and streaming prices, and check your next bill before switching."
    },
    hook: "Since the September 2026 migration, the successor to Compact is Sports. If your account still displays an old name, confirm the actual package and payment on your account before changing it.",
    source: {
      label: "Check the official DStv package guide",
      url: "https://www.dstv.com/en-za/news/149536/how-to-change-upgrade-dstv-package/"
    }
  },
  {
    slug: "showmax",
    name: "Showmax",
    priceMonthly: "Standalone service closed 30 April 2026",
    features: [
      {
        label: "Standalone subscription",
        them: "Closed on 30 April 2026",
        us: "USD 15 for one month"
      },
      {
        label: "Finding a title",
        them: "Look for selected Showmax titles in DStv Stream",
        us: "Ask about the exact season or episode"
      },
      {
        label: "Access",
        them: "Check the DStv package that includes the title",
        us: "Test on a compatible device"
      }
    ],
    theirStrengths: [
      "DStv lists selected returning Showmax titles in its own app.",
      "Individual title pages can confirm a season or episode."
    ],
    ourEdge: [
      "A separate catalogue to explore on your own device.",
      "A single prepaid month costs USD 15."
    ],
    meta: {
      title: "Where to find Showmax shows after the app closed",
      description: "The standalone Showmax service closed in April 2026. Check the new DStv Stream listing for your show before choosing another subscription."
    },
    hook: "The standalone Showmax service closed on 30 April 2026. For a particular show, check the Showmax section on DStv Stream and the package required for your episode.",
    source: {
      label: "Showmax transition and official FAQ",
      url: "https://www.dstv.com/en-za/watch/showmax/"
    }
  },
  {
    slug: "supersport",
    name: "SuperSport",
    priceMonthly: "Depends on event, country and package",
    features: [
      {
        label: "Looking for a fixture",
        them: "Use the official broadcast schedule",
        us: "Confirm exact fixture and territory independently"
      },
      {
        label: "Finding a replay",
        them: "Look for full-match replay and expiry",
        us: "Ask about the programme before subscribing"
      },
      {
        label: "Reception",
        them: "Selected coverage on DStv satellite or Stream",
        us: "Compatible internet-connected devices"
      }
    ],
    theirStrengths: [
      "Official listings identify the competition, territory and package.",
      "Match schedules distinguish full broadcasts, highlights and replays."
    ],
    ourEdge: [
      "Try the player, remote and internet connection on your own device.",
      "Choose a one-month prepaid term if it suits the household."
    ],
    meta: {
      title: "SuperSport coverage – find the match and broadcaster",
      description: "Find the broadcaster for a specific fixture and compare your viewing options in South Africa or overseas."
    },
    hook: "A search for SuperSport may mean a professional match, a school event or a highlights clip. Start with the event and viewing country, then check its actual broadcaster."
  },
  {
    slug: "starsat",
    name: "StarSat",
    priceMonthly: "Check current local availability",
    features: [
      {
        label: "Availability",
        them: "Verify local service status before paying",
        us: "Check the catalogue in your location"
      },
      {
        label: "Equipment",
        them: "Check your decoder and agreement",
        us: "Existing compatible streaming device"
      },
      {
        label: "First payment",
        them: "Request a current quote",
        us: "USD 15 for one month"
      }
    ],
    theirStrengths: [
      "Check local service notices for decoder availability."
    ],
    ourEdge: [
      "A trial is available before choosing a prepaid term."
    ],
    meta: {
      title: "StarSat alternatives for South African households",
      description: "Check service status, hardware and an actual quote before comparing with a prepaid streaming offer."
    },
    hook: "A historical decoder package price is a poor guide to what you can buy today. Check current service availability before spending on hardware."
  },
  {
    slug: "openview",
    name: "Openview",
    priceMonthly: "Free-to-view after equipment and setup",
    features: [
      {
        label: "Monthly subscription",
        them: "Free-to-view once installed",
        us: "USD 15 for one month"
      },
      {
        label: "Hardware",
        them: "Check dish, decoder and installation costs",
        us: "Compatible internet-connected device"
      },
      {
        label: "Data",
        them: "Satellite reception",
        us: "Internet data used while watching"
      }
    ],
    theirStrengths: [
      "A prepaid TV subscription is unnecessary for free-to-view satellite services.",
      "Satellite viewing can suit homes with limited internet data."
    ],
    ourEdge: [
      "A household with a compatible TV can try streaming over its existing internet."
    ],
    meta: {
      title: "Openview vs Mzansi Stream – monthly and setup costs",
      description: "Compare free-to-view satellite with prepaid internet television, including hardware, data and the first payment."
    },
    hook: "Compare the cost of installing Openview against a prepaid streaming plan on an existing TV. Check both line-ups for the programmes your household watches."
  },
  {
    slug: "netflix",
    name: "Netflix",
    priceMonthly: "Check the current South African plan",
    features: [
      {
        label: "Catalogue",
        them: "Search Netflix for the title and territory",
        us: "Ask about the exact title and season"
      },
      {
        label: "Pricing",
        them: "Confirm current local price at sign-up",
        us: "USD 15 for one month"
      },
      {
        label: "Playback",
        them: "Plan and device affect video quality",
        us: "Test your network and device before prepaying"
      }
    ],
    theirStrengths: [
      "The official title listing lets you check seasons and episodes."
    ],
    ourEdge: [
      "Live television and on-demand options can be tried on a compatible device."
    ],
    meta: {
      title: "Netflix vs Mzansi Stream – compare your watchlist",
      description: "Use a list of shows, live programmes and device needs to compare Netflix with a prepaid streaming service in South Africa."
    },
    hook: "Start with a list of titles and note whether you watch them live or on demand. Service catalogues can differ by country."
  },
];

export function getCompetitor(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}

export const COMPETITOR_SLUGS = COMPETITORS.map((c) => c.slug);
