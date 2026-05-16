/** @type {import('next').NextConfig} */
const nextConfig = {
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
