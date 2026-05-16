// lib/locales.ts
// Single source of truth for the 12 priority locales served by Mzansi Stream.
// Each entry carries everything the rest of the app needs: BCP-47 hreflang,
// HTML lang attribute, text direction, native display name, default country
// code, and the WhatsApp number to surface. Add a new locale here and the
// switcher, sitemap, hreflang map and dictionary key resolver all stay in sync.

export const LOCALES = [
  "en-za",
  "en-gb",
  "en-au",
  "en-us",
  "af",
  "zu",
  "xh",
  "pt-mz",
  "en-zw",
  "fr",
  "en-ae",
  "en-nz",
] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en-za";

export type LocaleMeta = {
  /** Canonical locale code used internally and in URLs (`?lang=`). */
  code: Locale;
  /** BCP-47 tag for `hreflang` and `<html lang>` (proper case). */
  hreflang: string;
  /** Text direction. All P0 locales are LTR — incl. zu/xh/af. */
  dir: "ltr" | "rtl";
  /** Native-language display name shown in the LocaleSwitcher. */
  nativeName: string;
  /** ISO-3166 country code used for geo-targeted defaults. */
  country: string;
  /** Flag emoji for compact rendering. */
  flag: string;
  /** Country-specific WhatsApp env var key. Falls back to default if unset. */
  whatsappEnvKey: string;
  /** Open Graph `og:locale` value. */
  ogLocale: string;
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  "en-za": {
    code: "en-za",
    hreflang: "en-ZA",
    dir: "ltr",
    nativeName: "English (ZA)",
    country: "ZA",
    flag: "🇿🇦",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_ZA",
    ogLocale: "en_ZA",
  },
  "en-gb": {
    code: "en-gb",
    hreflang: "en-GB",
    dir: "ltr",
    nativeName: "English (UK)",
    country: "GB",
    flag: "🇬🇧",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_DEFAULT",
    ogLocale: "en_GB",
  },
  "en-au": {
    code: "en-au",
    hreflang: "en-AU",
    dir: "ltr",
    nativeName: "English (AU)",
    country: "AU",
    flag: "🇦🇺",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_DEFAULT",
    ogLocale: "en_AU",
  },
  "en-us": {
    code: "en-us",
    hreflang: "en-US",
    dir: "ltr",
    nativeName: "English (US)",
    country: "US",
    flag: "🇺🇸",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_DEFAULT",
    ogLocale: "en_US",
  },
  af: {
    code: "af",
    hreflang: "af",
    dir: "ltr",
    nativeName: "Afrikaans",
    country: "ZA",
    flag: "🇿🇦",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_ZA",
    ogLocale: "af_ZA",
  },
  zu: {
    code: "zu",
    hreflang: "zu",
    dir: "ltr",
    nativeName: "isiZulu",
    country: "ZA",
    flag: "🇿🇦",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_ZA",
    ogLocale: "zu_ZA",
  },
  xh: {
    code: "xh",
    hreflang: "xh",
    dir: "ltr",
    nativeName: "isiXhosa",
    country: "ZA",
    flag: "🇿🇦",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_ZA",
    ogLocale: "xh_ZA",
  },
  "pt-mz": {
    code: "pt-mz",
    hreflang: "pt-MZ",
    dir: "ltr",
    nativeName: "Português (MZ)",
    country: "MZ",
    flag: "🇲🇿",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_MZ",
    ogLocale: "pt_MZ",
  },
  "en-zw": {
    code: "en-zw",
    hreflang: "en-ZW",
    dir: "ltr",
    nativeName: "English (ZW)",
    country: "ZW",
    flag: "🇿🇼",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_ZW",
    ogLocale: "en_ZW",
  },
  fr: {
    code: "fr",
    hreflang: "fr",
    dir: "ltr",
    nativeName: "Français",
    country: "FR",
    flag: "🇫🇷",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_DEFAULT",
    ogLocale: "fr_FR",
  },
  "en-ae": {
    code: "en-ae",
    hreflang: "en-AE",
    dir: "ltr",
    nativeName: "English (AE)",
    country: "AE",
    flag: "🇦🇪",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_DEFAULT",
    ogLocale: "en_AE",
  },
  "en-nz": {
    code: "en-nz",
    hreflang: "en-NZ",
    dir: "ltr",
    nativeName: "English (NZ)",
    country: "NZ",
    flag: "🇳🇿",
    whatsappEnvKey: "NEXT_PUBLIC_WHATSAPP_DEFAULT",
    ogLocale: "en_NZ",
  },
};

/** Geo → preferred locale (used when the visitor has no explicit choice). */
const GEO_TO_LOCALE: Record<string, Locale> = {
  ZA: "en-za",
  NA: "en-za", // Namibia: ZAR parity, English-majority business
  BW: "en-za",
  LS: "en-za",
  SZ: "en-za",
  ZW: "en-zw",
  MZ: "pt-mz",
  GB: "en-gb",
  IE: "en-gb",
  AU: "en-au",
  NZ: "en-nz",
  US: "en-us",
  CA: "en-us",
  AE: "en-ae",
  SA: "en-ae",
  QA: "en-ae",
  KW: "en-ae",
  FR: "fr",
  BE: "fr",
  CH: "fr",
  LU: "fr",
  CI: "fr",
  SN: "fr",
  CD: "fr",
  CM: "fr",
};

export function localeFromCountry(country: string | null | undefined): Locale {
  if (!country) return DEFAULT_LOCALE;
  return GEO_TO_LOCALE[country.toUpperCase()] ?? DEFAULT_LOCALE;
}

/**
 * Normalise an arbitrary string (URL param, cookie, Accept-Language entry)
 * into a known Locale, or null if no match. Accepts legacy short codes
 * (`en` → `en-za`) and any BCP-47 casing.
 */
export function normalizeLocale(input: string | null | undefined): Locale | null {
  if (!input) return null;
  const lower = input.toLowerCase().trim();
  if (!lower) return null;

  if ((LOCALES as readonly string[]).includes(lower)) return lower as Locale;

  // Legacy short codes from the old EN/AF/FR switcher.
  if (lower === "en") return "en-za";

  // Region-only or language-only forms — pick the best match.
  const [lang, region] = lower.split(/[-_]/);
  if (region) {
    const composite = `${lang}-${region}`;
    if ((LOCALES as readonly string[]).includes(composite)) return composite as Locale;
    // Map English by region.
    if (lang === "en") {
      const match = (LOCALES as readonly string[]).find(
        (l) => l.startsWith("en-") && l.endsWith(`-${region}`)
      );
      if (match) return match as Locale;
    }
    // Map Portuguese variants to pt-mz (only Portuguese locale we serve).
    if (lang === "pt") return "pt-mz";
  }

  if (lang === "en") return "en-za";
  if (lang === "af") return "af";
  if (lang === "zu") return "zu";
  if (lang === "xh") return "xh";
  if (lang === "fr") return "fr";
  if (lang === "pt") return "pt-mz";
  return null;
}

/** Parse a raw Accept-Language header and pick the best-supported locale. */
export function localeFromAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null;
  const entries = header.split(",").map((part) => {
    const [tag, ...params] = part.trim().split(";");
    const qParam = params.find((p) => p.trim().startsWith("q="));
    const q = qParam ? parseFloat(qParam.split("=")[1]) || 0 : 1;
    return { tag: tag.trim(), q };
  });
  entries.sort((a, b) => b.q - a.q);
  for (const { tag } of entries) {
    const normalised = normalizeLocale(tag);
    if (normalised) return normalised;
  }
  return null;
}

/**
 * Read the WhatsApp number for a locale, falling back to the global default.
 * Numbers are sourced from env so they can be configured per environment
 * without redeploying.
 */
export function whatsappForLocale(
  locale: Locale,
  env: Record<string, string | undefined> = process.env as Record<string, string | undefined>
): string {
  const meta = LOCALE_META[locale];
  const specific = env[meta.whatsappEnvKey];
  if (specific) return specific;
  return env.NEXT_PUBLIC_WHATSAPP_DEFAULT ?? "447307410512";
}

/** Build the alternate-language map used in `<link rel="alternate" hreflang>`. */
export function hreflangAlternates(buildUrl: (locale: Locale) => string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const locale of LOCALES) {
    map[LOCALE_META[locale].hreflang] = buildUrl(locale);
  }
  map["x-default"] = buildUrl(DEFAULT_LOCALE);
  return map;
}
