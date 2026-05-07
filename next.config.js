/** @type {import('next').NextConfig} */
const nextConfig = {
    // Don't fail Vercel build on ESLint warnings — production safety net.
    // TypeScript errors will still fail the build (which is what we want).
    eslint: {
          ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
