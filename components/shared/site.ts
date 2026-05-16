// components/shared/site.ts
// Global config for Mzansi Stream / iptvmzansi.com

const WHATSAPP_DEFAULT = "447307410512";

export const SITE = {
  domain: "https://iptvmzansi.com",
  brand: "Mzansi Stream",
  whatsappPhone:
    process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT || WHATSAPP_DEFAULT,
  currencyCode: "ZAR" as const,
  currencyLabel: "R",
  countryCode: "ZA",
  defaultLocale: "en-za" as const,
} as const;
