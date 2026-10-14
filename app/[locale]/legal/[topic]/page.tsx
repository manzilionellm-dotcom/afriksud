// app/[locale]/legal/[topic]/page.tsx
// Skeleton legal pages: popia, terms, refund, cookies, about.

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { hreflangForProgrammatic, localeUrl } from "../../../../lib/url";
import { robotsForProgrammatic } from "../../../../lib/seo/indexability";
import {
  LEGAL_DETAILS_PENDING,
  LEGAL_SLUGS,
  getLegalTopic,
  isNoindexLegal,
} from "../../../../lib/seo/legal";
import { LongformShell } from "../../../../components/client/LongformShell";

type Props = { params: Promise<{ locale: string; topic: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    LEGAL_SLUGS.map((topic) => ({ locale, topic }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, topic } = await params;
  const data = getLegalTopic(topic);
  if (!(LOCALES as readonly string[]).includes(locale) || !data) return {};
  return {
    title: data.title,
    description: data.metaDescription,
    alternates: {
      canonical: localeUrl(locale as Locale, `/legal/${topic}`),
      languages: data.needsOwnerInput
        ? undefined
        : hreflangForProgrammatic(locale as Locale, `/legal/${topic}`),
    },
    openGraph: {
      type: "article",
      url: localeUrl(locale as Locale, `/legal/${topic}`),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title: data.title,
      description: data.metaDescription,
    },
    robots: isNoindexLegal(topic)
      ? { index: false, follow: false }
      : robotsForProgrammatic(locale as Locale),
  };
}

export default async function LegalPage({ params }: Props) {
  const { locale, topic } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const data = getLegalTopic(topic);
  if (!data) notFound();

  return (
    <LongformShell locale={locale as Locale}>
      <article className="section">
        <header className="longformHeader">
          <p className="longformEyebrow">Legal</p>
          <h1>{data.title}</h1>
          <p className="longformLead">{data.lead}</p>
          {data.needsOwnerInput ? <p>{LEGAL_DETAILS_PENDING}</p> : null}
        </header>

        {data.sections.map((s) => (
          <section key={s.h2} className="longformSection">
            <h2>{s.h2}</h2>
            {s.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        ))}
      </article>
    </LongformShell>
  );
}
