// app/[locale]/layout.tsx
// Locale-aware metadata wrapper. The `<html>` element lives in the root
// app/layout.tsx; this child layout owns per-locale canonical, hreflang
// and OpenGraph headers, plus a `<meta x-mz-locale>` hint the client
// LanguageProvider reads to align with the URL on first render.

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, LOCALE_META, type Locale } from "../../lib/locales";
import { hreflangFor, localeUrl } from "../../lib/url";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  const meta = LOCALE_META[locale as Locale];
  return {
    alternates: {
      canonical: localeUrl(locale as Locale, "/"),
      languages: hreflangFor("/"),
    },
    openGraph: {
      locale: meta.ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => LOCALE_META[l].ogLocale
      ),
    },
    other: {
      "x-mz-locale": locale,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  return <>{children}</>;
}

// Default locale config also exported so child pages can detect the
// fallback when they receive a malformed `params.locale`.
export { DEFAULT_LOCALE };
