// app/robots.ts
// AI Mode 2026: explicitly allow LLM crawlers we want to be cited by
// (ChatGPT, Claude, Perplexity, Google AI Overviews). Their default
// posture is "off"; we opt in. SEO competitor scrapers stay blocked.
//
// Static: the preview-deployment guard reads VERCEL_ENV at build time
// instead of the request Host header, so /robots.txt is prerendered and
// edge-cacheable. Preview hosts (*.vercel.app) additionally get
// `X-Robots-Tag: noindex` from middleware.ts.

import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/url";

const ALLOW_ALL = [
  "Googlebot",
  "Googlebot-Image",
  "Googlebot-News",
  "Bingbot",
  "DuckDuckBot",
  "Slurp",
  "Applebot",
  "YandexBot",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "Claude-SearchBot",
  "anthropic-ai",
  "Google-Extended",
  "GoogleOther",
  "Applebot-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "YouBot",
  "cohere-ai",
  "Cohere-AI",
  "CCBot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  "Bytespider",
  "Amazonbot",
  "Diffbot",
  "Mistralai-User",
  "DuckAssistBot",
  "Kagibot",
  "LinkedInBot",
  "Twitterbot",
  "Discordbot",
  "TelegramBot",
  "WhatsApp",
  "Slackbot-LinkExpanding",
  "Slackbot",
  "facebookexternalhit",
];

const BLOCK_ALL = [
  "AhrefsBot",
  "AhrefsSiteAudit",
  "SemrushBot",
  "SemrushBot-SA",
  "MJ12bot",
  "DotBot",
  "BLEXBot",
  "PetalBot",
  "DataForSeoBot",
  "ZoominfoBot",
  "barkrowler",
  "SerpstatBot",
];

// Internal routes no crawler needs: API handlers (incl. the SSE status
// stream) and the 404-only /ops path.
const PRIVATE_PATHS = ["/api/", "/ops"];

export default function robots(): MetadataRoute.Robots {
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv && vercelEnv !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      ...ALLOW_ALL.map((userAgent) => ({ userAgent, allow: "/", disallow: PRIVATE_PATHS })),
      ...BLOCK_ALL.map((userAgent) => ({ userAgent, disallow: "/" })),
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/", "/ops"], crawlDelay: 5 },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
