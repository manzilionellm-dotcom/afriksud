// app/[locale]/knowledge-base/page.tsx — Knowledge Base hub.
// Rolls up the most-searched how/which/what questions into one crawlable
// index and captures informational IPTV queries that funnel toward the
// trial and money pages.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../lib/url";
import { robotsForProgrammatic } from "../../../lib/seo/indexability";
import { KB_ARTICLES } from "../../../lib/seo/knowledge-base";
import { HubListing } from "../../../components/seo/HubListing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  const title =
    "IPTV Knowledge Base — How to Install, Choose, Set Up & Improve";
  const description =
    "Answers to the most-asked IPTV questions — how to install, which platform to choose, network requirements, improving video quality, features, profiles and favourites. Mzansi Stream.";
  return {
    title,
    description,
    alternates: {
      canonical: localeUrl(locale as Locale, "/knowledge-base/"),
      languages: hreflangFor("/knowledge-base/"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(locale as Locale, "/knowledge-base/"),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title,
      description,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function KnowledgeBaseHub({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();

  const items = KB_ARTICLES.map((a) => ({
    href: `/knowledge-base/${a.slug}/`,
    label: a.h1,
    caption: a.eyebrow.replace(/^Knowledge Base · /, ""),
  }));

  return (
    <HubListing
      locale={locale as Locale}
      eyebrow="Knowledge Base · how it works"
      h1="IPTV Knowledge Base — everything you need to know"
      lead="Clear answers to the questions people ask most about IPTV in South Africa — how to install it, which device to choose, what internet you need, how to get the sharpest picture, and what's actually included. Every answer leads with the short version, then explains the detail."
      itemListName="Knowledge Base articles"
      basePath="/knowledge-base/"
      intro={[
        "New to IPTV? Start with how to install and which platform to choose. Already set up and want it better? Jump to network requirements and improving video quality. Curious what you get? See the features, profiles and favourites guides.",
        "If your question is a 'something's not working' problem rather than a 'how does it work' question, the Help Center has an answer-first fix for buffering, black screen, connection errors and more.",
      ]}
      extraSections={[
        {
          h2: "Still have a question?",
          paragraphs: [
            "If your question isn't answered here, message us on WhatsApp — we reply in plain English and can start you on a free 24-hour trial so you can see the channels, EPG, catch-up and 4K for yourself before you pay.",
          ],
        },
      ]}
      items={items}
    />
  );
}
