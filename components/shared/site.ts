// components/shared/site.ts
// Global config for Mzansi Stream / iptvmzansi.com

export const SITE = {
  domain: "https://iptvmzansi.com",
  brand: "Mzansi Stream",
  whatsappPhone: "447307410512", // ⚠️ TO REPLACE with SA number (+27)
  currencyCode: "ZAR" as const,
  currencyLabel: "R",
  countryCode: "ZA",
  defaultLocale: "en" as const,
} as const;
