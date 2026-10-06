/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  // Next's built-in slash 308 is relative and beats host redirects, so
  // `www/en-za/` stayed on www. Handle slash-strip in middleware AFTER
  // the absolute www→apex 308.
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  eslint: {
    // Don't fail Vercel build on ESLint warnings — production safety net.
    // TypeScript errors will still fail the build (which is what we want).
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [48, 64, 96, 128, 192, 256, 384, 512],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    // Legacy flat routes that shipped with fake aggregateRating, a stale
    // Vercel preview SITE_URL, and duplicate content with the canonical
    // /[locale]/* tree. 301 to the canonical English equivalents.
    return [
      // Lot1 ETAPE2-404
      { source: "/firestick", destination: "/en-za/iptv-firestick-south-africa", permanent: true },
      // www → apex before trailing-slash normalisation so `/en-za/` on
      // www does not 308 to `/en-za` on the same (www) host first.
      {
        source: "/",
        has: [{ type: "host", value: "www.iptvmzansi.com" }],
        destination: "https://iptvmzansi.com/en-za",
        permanent: true,
      },
      {
        source: "/:path+/",
        has: [{ type: "host", value: "www.iptvmzansi.com" }],
        destination: "https://iptvmzansi.com/:path+",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.iptvmzansi.com" }],
        destination: "https://iptvmzansi.com/:path*",
        permanent: true,
      },
      // P0: unprefixed free-trial → canonical en-za landing
      {
        source: "/free-trial",
        destination: "/en-za/free-trial",
        permanent: true,
      },
      {
        source: "/free-trial/",
        destination: "/en-za/free-trial",
        permanent: true,
      },
      {
        source: "/trial",
        destination: "/en-za/free-trial",
        permanent: true,
      },
      {
        source: "/essai",
        destination: "/en-za/free-trial",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/en-za/free-trial",
        permanent: true,
      },
      {
        source: "/prix",
        destination: "/en-za/free-trial",
        permanent: true,
      },
      {
        source: "/compare",
        destination: "/en-za/free-trial",
        permanent: true,
      },
      // Native-language landings. The body is af/zu/xh/pt-mz; the en-za
      // URL was the sitemap target while those locales were noindex.
      // 308 keeps the old URL's equity on the indexable native URL.
      {
        source:
          "/:locale(en-za|en-gb|en-au|en-us|zu|xh|pt-mz|en-zw|fr|en-ae|en-nz)/language/iptv-afrikaans",
        destination: "/af/language/iptv-afrikaans",
        permanent: true,
      },
      {
        source:
          "/:locale(en-za|en-gb|en-au|en-us|zu|xh|pt-mz|en-zw|fr|en-ae|en-nz)/language/iptv-afrikaans/",
        destination: "/af/language/iptv-afrikaans",
        permanent: true,
      },
      {
        source:
          "/:locale(en-za|en-gb|en-au|en-us|af|xh|pt-mz|en-zw|fr|en-ae|en-nz)/language/iptv-zulu",
        destination: "/zu/language/iptv-zulu",
        permanent: true,
      },
      {
        source:
          "/:locale(en-za|en-gb|en-au|en-us|af|xh|pt-mz|en-zw|fr|en-ae|en-nz)/language/iptv-zulu/",
        destination: "/zu/language/iptv-zulu",
        permanent: true,
      },
      {
        source:
          "/:locale(en-za|en-gb|en-au|en-us|af|zu|pt-mz|en-zw|fr|en-ae|en-nz)/language/iptv-xhosa",
        destination: "/xh/language/iptv-xhosa",
        permanent: true,
      },
      {
        source:
          "/:locale(en-za|en-gb|en-au|en-us|af|zu|pt-mz|en-zw|fr|en-ae|en-nz)/language/iptv-xhosa/",
        destination: "/xh/language/iptv-xhosa",
        permanent: true,
      },
      {
        source:
          "/:locale(en-za|en-gb|en-au|en-us|af|zu|xh|en-zw|fr|en-ae|en-nz)/language/iptv-portuguese-mozambique",
        destination: "/pt-mz/language/iptv-portuguese-mozambique",
        permanent: true,
      },
      {
        source:
          "/:locale(en-za|en-gb|en-au|en-us|af|zu|xh|en-zw|fr|en-ae|en-nz)/language/iptv-portuguese-mozambique/",
        destination: "/pt-mz/language/iptv-portuguese-mozambique",
        permanent: true,
      },
      // Dead links found on the live site (crawl 2026-10-06): /legal/privacy
      // never existed (POPIA page is /legal/popia); communities pages linked
      // /cities/plettenberg-bay and /cities/hermanus, which have no page.
      // Slash variants too: next.config runs before the middleware slash-strip.
      { source: "/:locale(en-za|en-gb|en-au|en-us|af|zu|xh|pt-mz|en-zw|fr|en-ae|en-nz)/legal/privacy", destination: "/:locale/legal/popia", permanent: true },
      { source: "/:locale(en-za|en-gb|en-au|en-us|af|zu|xh|pt-mz|en-zw|fr|en-ae|en-nz)/legal/privacy/", destination: "/:locale/legal/popia", permanent: true },
      { source: "/:locale(en-za|en-gb|en-au|en-us|af|zu|xh|pt-mz|en-zw|fr|en-ae|en-nz)/cities/:city(plettenberg-bay|hermanus)", destination: "/:locale/cities", permanent: true },
      { source: "/:locale(en-za|en-gb|en-au|en-us|af|zu|xh|pt-mz|en-zw|fr|en-ae|en-nz)/cities/:city(plettenberg-bay|hermanus)/", destination: "/:locale/cities", permanent: true },
      // /en-za/sports was linked from /en-za/free-trial but never had a page.
      { source: "/en-za/sports", destination: "/en-za/iptv-supersport-without-dstv", permanent: true },
      { source: "/en-za/sports/", destination: "/en-za/iptv-supersport-without-dstv", permanent: true },
      // Seo Springboks UK short slugs — 308 one hop onto the live blog
      // (P1 6Q). MUST sit above `/iptv-:city` or `/iptv-springboks-uk`
      // would 301 into /cities/springboks-uk/. No trailing slash on dest.
      {
        source: "/en/iptv-springboks-uk",
        destination: "/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source: "/en/iptv-springboks-uk/",
        destination: "/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source: "/en/watch-springboks-uk",
        destination: "/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source: "/en/watch-springboks-uk/",
        destination: "/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source: "/iptv-springboks-uk",
        destination: "/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source: "/iptv-springboks-uk/",
        destination: "/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source: "/watch-springboks-uk",
        destination: "/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source: "/watch-springboks-uk/",
        destination: "/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source:
          "/:locale(en-za|en-gb|en-au|en-us|af|zu|xh|pt-mz|en-zw|fr|en-ae|en-nz)/iptv-springboks-uk",
        destination: "/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source:
          "/:locale(en-za|en-gb|en-au|en-us|af|zu|xh|pt-mz|en-zw|fr|en-ae|en-nz)/iptv-springboks-uk/",
        destination: "/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source:
          "/:locale(en-za|en-gb|en-au|en-us|af|zu|xh|pt-mz|en-zw|fr|en-ae|en-nz)/watch-springboks-uk",
        destination: "/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source:
          "/:locale(en-za|en-gb|en-au|en-us|af|zu|xh|pt-mz|en-zw|fr|en-ae|en-nz)/watch-springboks-uk/",
        destination: "/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source: "/iptv-:city",
        destination: "/en-za/cities/:city",
        permanent: true,
      },
      {
        source: "/install-iptv-:device",
        destination: "/en-za/devices/:device",
        permanent: true,
      },
      {
        source: "/iptv-vs-:competitor",
        destination: "/en-za/vs/:competitor",
        permanent: true,
      },
      // Sport-specific legacy slug → SuperSport pillar (the most-trafficked
      // sport landing post-migration). Specific slugs that match other
      // pillars can be added explicitly later.
      {
        source: "/iptv-:sport(dstv-premiership|urc-rugby|premier-league|cricket)",
        destination: "/en-za/iptv-supersport-without-dstv",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000",
          },
          {
            key: "Content-Security-Policy-Report-Only",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://eu.i.posthog.com https://connect.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://eu.i.posthog.com https://connect.facebook.net https://graph.facebook.com https://wa.me; frame-src https://www.facebook.com https://www.youtube.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://wa.me; object-src 'none'; upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
