// app/[locale]/knowledge-base/[slug]/page.tsx
// Knowledge Base — the most-searched how/which/what questions. Re-uses
// PillarTemplate with showUpdated so each answer carries a visible
// "Last updated" date (part of the KB format spec), plus the answer-first
// DirectAnswerBlock, FAQPage schema and the funnel. pathPrefix keeps the
// JSON-LD canonical in sync with the /knowledge-base/ route.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../../lib/url";
import { robotsForProgrammatic } from "../../../../lib/seo/indexability";
import { KB_SLUGS, getKbArticle } from "../../../../lib/seo/knowledge-base";
import { PillarTemplate } from "../../../../components/seo/PillarTemplate";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    KB_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = getKbArticle(slug);
  if (!(LOCALES as readonly string[]).includes(locale) || !data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: localeUrl(locale as Locale, `/knowledge-base/${slug}/`),
      languages: hreflangFor(`/knowledge-base/${slug}/`),
    },
    openGraph: {
      type: "article",
      url: localeUrl(locale as Locale, `/knowledge-base/${slug}/`),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title: data.metaTitle,
      description: data.metaDescription,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function KbPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const data = getKbArticle(slug);
  if (!data) notFound();
  return (
    <PillarTemplate
      pillar={data}
      locale={locale as Locale}
      pathPrefix="/knowledge-base"
      showUpdated
    />
  );
}
