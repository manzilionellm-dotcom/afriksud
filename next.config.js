/** @type {import('next').NextConfig} */
const nextConfig = {
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
      // www Springboks UK aliases FIRST — 1 hop to the live blog, not
      // www→apex then a second 308. Must sit above `/:path*`.
      {
        source: "/en/iptv-springboks-uk",
        has: [{ type: "host", value: "www.iptvmzansi.com" }],
        destination:
          "https://iptvmzansi.com/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source: "/en/iptv-springboks-uk/",
        has: [{ type: "host", value: "www.iptvmzansi.com" }],
        destination:
          "https://iptvmzansi.com/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source: "/en/watch-springboks-uk",
        has: [{ type: "host", value: "www.iptvmzansi.com" }],
        destination:
          "https://iptvmzansi.com/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source: "/en/watch-springboks-uk/",
        has: [{ type: "host", value: "www.iptvmzansi.com" }],
        destination:
          "https://iptvmzansi.com/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source: "/iptv-springboks-uk",
        has: [{ type: "host", value: "www.iptvmzansi.com" }],
        destination:
          "https://iptvmzansi.com/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      {
        source: "/iptv-springboks-uk/",
        has: [{ type: "host", value: "www.iptvmzansi.com" }],
        destination:
          "https://iptvmzansi.com/en-za/blog/watch-springboks-from-london",
        permanent: true,
      },
      // www → apex before trailing-slash normalisation so `/en-za/` on
      // www does not 308 to `/en-za` on the same (www) host first.
      {
        source: "/",
        has: [{ type: "host", value: "www.iptvmzansi.com" }],
        destination: "https://iptvmzansi.com/",
        permanent: true,
      },
      {
        source: "/:path+/",
        has: [{ type: "host", value: "www.iptvmzansi.com" }],
        destination: "https://iptvmzansi.com/:path+/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.iptvmzansi.com" }],
        destination: "https://iptvmzansi.com/:path*",
        permanent: true,
      },
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
        destination: "/en-za/cities/:city/",
        permanent: true,
      },
      {
        source: "/install-iptv-:device",
        destination: "/en-za/devices/:device/",
        permanent: true,
      },
      {
        source: "/iptv-vs-:competitor",
        destination: "/en-za/vs/:competitor/",
        permanent: true,
      },
      // Sport-specific legacy slug → SuperSport pillar (the most-trafficked
      // sport landing post-migration). Specific slugs that match other
      // pillars can be added explicitly later.
      {
        source: "/iptv-:sport(dstv-premiership|urc-rugby|premier-league|cricket)",
        destination: "/en-za/iptv-supersport-without-dstv/",
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
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
