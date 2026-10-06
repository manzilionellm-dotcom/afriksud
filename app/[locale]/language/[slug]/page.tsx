// app/[locale]/language/[slug]/page.tsx
// 4 SA-language landing pages: afrikaans, zulu, xhosa, portuguese-mozambique.
// Slug stays English for URL stability; body is rendered in the matching
// language.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { localeUrl } from "../../../../lib/url";
import {
  SA_LANGUAGE_SLUGS,
  getSALanguagePage,
} from "../../../../lib/seo/sa-languages";
import { LongformShell } from "../../../../components/client/LongformShell";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SA_LANGUAGE_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = getSALanguagePage(slug);
  if (!(LOCALES as readonly string[]).includes(locale) || !data) return {};
  // Body is written in `preferredLocale` (af / zu / xh / pt-mz). That URL
  // is the only indexable version. Other locales 301 here (next.config)
  // and, if reached, canonicalise without joining a noindex hreflang cluster.
  const owner = data.preferredLocale as Locale;
  const canonical = localeUrl(owner, `/language/${slug}`);
  const selfCanonical = locale === owner;
  return {
    title: data.title,
    description: data.metaDescription,
    alternates: {
      canonical,
      languages: selfCanonical
        ? {
            [LOCALE_META[owner].hreflang]: canonical,
            "x-default": canonical,
          }
        : undefined,
    },
    openGraph: {
      type: "article",
      url: canonical,
      locale: LOCALE_META[owner].ogLocale,
      title: data.title,
      description: data.metaDescription,
    },
    robots: selfCanonical
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default async function SALanguagePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const data = getSALanguagePage(slug);
  if (!data) notFound();

  return (
    <LongformShell locale={locale as Locale}>
      <article className="section" lang={data.preferredLocale}>
        <header className="longformHeader">
          <h1>{data.hero.h1}</h1>
          <p className="longformLead">{data.hero.lead}</p>
          <div className="ctaRow">
            <a href="#trial" className="btnPrimary">
              {data.hero.cta} →
            </a>
          </div>
        </header>

        <section className="longformSection">
          <h2>Featured channels</h2>
          <ul className="longformList">
            {data.featuredChannels.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        {data.body.map((s) => (
          <section key={s.h2} className="longformSection">
            <h2>{s.h2}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        ))}
      </article>
    </LongformShell>
  );
}
