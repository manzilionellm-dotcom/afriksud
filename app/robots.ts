// app/robots.ts
// AI Mode 2026: explicitly allow LLM crawlers we want to be cited by
// (ChatGPT, Claude, Perplexity, Google AI Overviews). Their default
// posture is "off"; we opt in. SEO competitor scrapers stay blocked.

import type { MetadataRoute } from "next";

const SITE_URL = "https://iptvmzansi.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Mainstream search — full access.
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Googlebot-News", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "Slurp", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "YandexBot", allow: "/" },

      // AI Mode crawlers — ALLOW so we can be cited by ChatGPT / Claude /
      // Perplexity / Google AI Overviews. Mzansi Stream wants the visibility.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "CCBot", allow: "/" },

      // SEO competitor scrapers — keep blocked.
      { userAgent: "AhrefsBot", disallow: "/" },
      { userAgent: "SemrushBot", disallow: "/" },
      { userAgent: "MJ12bot", disallow: "/" },
      { userAgent: "DotBot", disallow: "/" },

      // Default — everything else.
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"], crawlDelay: 5 },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
