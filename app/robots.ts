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
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "GoogleOther", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "Cohere-AI", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "Meta-ExternalFetcher", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "Diffbot", allow: "/" },
      { userAgent: "Mistralai-User", allow: "/" },
      { userAgent: "DuckAssistBot", allow: "/" },
      { userAgent: "Kagibot", allow: "/" },

      // Social / preview unfurlers (LinkedIn, Discord, X) — allow so
      // shared links render rich cards instead of a bare URL.
      { userAgent: "LinkedInBot", allow: "/" },
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "Discordbot", allow: "/" },
      { userAgent: "TelegramBot", allow: "/" },
      { userAgent: "WhatsApp", allow: "/" },
      { userAgent: "Slackbot-LinkExpanding", allow: "/" },
      { userAgent: "Slackbot", allow: "/" },
      { userAgent: "facebookexternalhit", allow: "/" },

      // SEO competitor scrapers — keep blocked. They consume crawl
      // budget without contributing to ranking, indexation or AI
      // citations and reveal competitive intel to competitors who pay
      // for their dashboards.
      { userAgent: "AhrefsBot", disallow: "/" },
      { userAgent: "AhrefsSiteAudit", disallow: "/" },
      { userAgent: "SemrushBot", disallow: "/" },
      { userAgent: "SemrushBot-SA", disallow: "/" },
      { userAgent: "MJ12bot", disallow: "/" },
      { userAgent: "DotBot", disallow: "/" },
      { userAgent: "BLEXBot", disallow: "/" },
      { userAgent: "PetalBot", disallow: "/" },
      { userAgent: "DataForSeoBot", disallow: "/" },
      { userAgent: "ZoominfoBot", disallow: "/" },
      { userAgent: "barkrowler", disallow: "/" },
      { userAgent: "SerpstatBot", disallow: "/" },

      // Default — everything else.
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"], crawlDelay: 5 },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
