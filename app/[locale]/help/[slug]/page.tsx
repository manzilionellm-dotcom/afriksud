// app/[locale]/help/[slug]/page.tsx
// Help Center — troubleshooting articles (buffering, black screen, can't
// connect, network error, etc.). Re-uses PillarTemplate so each article
// inherits the answer-first DirectAnswerBlock, HowTo schema for the fix
// steps, FAQPage schema and the WhatsApp support funnel. pathPrefix
// keeps the JSON-LD canonical in sync with the /help/ route.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../../lib/url";
import { robotsForProgrammatic } from "../../../../lib/seo/indexability";
import { HELP_SLUGS, getHelpArticle } from "../../../../lib/seo/help-center";
import { PillarTemplate } from "../../../../components/seo/PillarTemplate";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    HELP_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = getHelpArticle(slug);
  if (!(LOCALES as readonly string[]).includes(locale) || !data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: localeUrl(locale as Locale, `/help/${slug}/`),
      languages: hreflangFor(`/help/${slug}/`),
    },
    openGraph: {
      type: "article",
      url: localeUrl(locale as Locale, `/help/${slug}/`),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title: data.metaTitle,
      description: data.metaDescription,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function HelpPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const data = getHelpArticle(slug);
  if (!data) notFound();
  return (
    <PillarTemplate pillar={data} locale={locale as Locale} pathPrefix="/help" />
  );
}
