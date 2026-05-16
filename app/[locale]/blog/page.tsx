// app/[locale]/blog/page.tsx
// Blog index — lists the 10 pillar posts.

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { LOCALES, LOCALE_META, type Locale } from "../../../lib/locales";
import { hreflangFor, localeUrl } from "../../../lib/url";
import { robotsForProgrammatic } from "../../../lib/seo/indexability";
import { BLOG_POSTS } from "../../../lib/seo/blog-posts";
import { LongformShell } from "../../../components/client/LongformShell";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  return {
    title: "Mzansi Stream Blog — IPTV guides, sport, devices",
    description:
      "Guides for IPTV in South Africa and SADC — DStv alternatives, Firestick setup, PSL streaming, Springbok rugby, Vumatel and Openserve compatibility.",
    alternates: {
      canonical: localeUrl(locale as Locale, "/blog/"),
      languages: hreflangFor("/blog/"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(locale as Locale, "/blog/"),
      locale: LOCALE_META[locale as Locale].ogLocale,
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function BlogIndex({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();

  return (
    <LongformShell locale={locale as Locale}>
      <article className="section">
        <header className="longformHeader">
          <p className="longformEyebrow">Blog</p>
          <h1>Mzansi Stream Blog — IPTV guides for SA & SADC</h1>
          <p className="longformLead">
            Guides to streaming TV in South Africa and across SADC — DStv
            alternatives, device setup, sport coverage and what to look for
            in a reliable IPTV service.
          </p>
        </header>

        <section className="longformSection">
          <ul className="blogIndex">
            {BLOG_POSTS.map((p) => (
              <li key={p.slug} className="blogIndexItem">
                <h2>
                  <Link href={`/${locale}/blog/${p.slug}/`}>{p.title}</Link>
                </h2>
                <p className="blogIndexLead">{p.lead}</p>
                <p className="blogIndexMeta">
                  <time dateTime={p.datePublished}>{p.datePublished}</time>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </LongformShell>
  );
}
