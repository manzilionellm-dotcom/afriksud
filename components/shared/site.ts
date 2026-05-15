// components/shared/site.ts
// Global config for Mzansi Stream / iptvmzansi.com

// WhatsApp number defaults to a +27 placeholder so the production build never
// silently surfaces the legacy UK number again. The real value should come
// from `NEXT_PUBLIC_WHATSAPP_DEFAULT` in the deployment env — until that's
// filled in by the owner, the placeholder makes the omission obvious.
const WHATSAPP_PLACEHOLDER_ZA = "27000000000"; // TO_FILL_BY_OWNER

export const SITE = {
  domain: "https://iptvmzansi.com",
  brand: "Mzansi Stream",
  // ⚠️ TO_FILL_BY_OWNER — set NEXT_PUBLIC_WHATSAPP_DEFAULT to the real +27 number.
  whatsappPhone:
    process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT || WHATSAPP_PLACEHOLDER_ZA,
  currencyCode: "ZAR" as const,
  currencyLabel: "R",
  countryCode: "ZA",
  defaultLocale: "en-za" as const,
} as const;
