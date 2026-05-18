// app/[locale]/blog/[slug]/page.tsx
// One page per pillar blog post.

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../../lib/url";
import { robotsForProgrammatic } from "../../../../lib/seo/indexability";
import { BLOG_SLUGS, getBlogPost } from "../../../../lib/seo/blog-posts";
import {
  AUTHORS,
  DEFAULT_AUTHOR_SLUG,
} from "../../../../lib/seo/authors";
import { LongformShell } from "../../../../components/client/LongformShell";
import { AuthorBio } from "../../../../components/seo/AuthorBio";
import { PricingCtaBlock } from "../../../../components/seo/PricingCtaBlock";
import { SITE } from "../../../../components/shared/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    BLOG_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!(LOCALES as readonly string[]).includes(locale) || !post) return {};
  return {
    title: `${post.title} | Mzansi Stream`,
    description: post.metaDescription,
    alternates: {
      canonical: localeUrl(locale as Locale, `/blog/${slug}/`),
      languages: hreflangFor(`/blog/${slug}/`),
    },
    openGraph: {
      type: "article",
      url: localeUrl(locale as Locale, `/blog/${slug}/`),
      locale: LOCALE_META[locale as Locale].ogLocale,
      title: post.title,
      description: post.metaDescription,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const post = getBlogPost(slug);
  if (!post) notFound();

  const author = AUTHORS[DEFAULT_AUTHOR_SLUG];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: `${SITE_URL}/og-image.jpg`,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      ...(author.profiles?.length ? { sameAs: author.profiles } : {}),
      ...(author.image ? { image: author.image } : {}),
      worksFor: { "@type": "Organization", name: SITE.brand, url: SITE_URL },
    },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
    },
    mainEntityOfPage: localeUrl(locale as Locale, `/blog/${slug}/`),
    inLanguage: LOCALE_META[locale as Locale].hreflang,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(locale as Locale, "/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: localeUrl(locale as Locale, "/blog/") },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: localeUrl(locale as Locale, `/blog/${slug}/`),
      },
    ],
  };

  const faqSchema =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <LongformShell locale={locale as Locale}>
        <article className="section">
          <header className="longformHeader">
            <p className="longformEyebrow">
              <Link href={`/${locale}/blog/`}>Blog</Link>
              {" · "}
              <time dateTime={post.datePublished}>{post.datePublished}</time>
            </p>
            <h1>{post.title}</h1>
            <p className="longformLead">{post.lead}</p>
            <AuthorBio author={author} dateLabel={post.datePublished} />
          </header>

          {post.sections.map((s) => (
            <section key={s.h2} className="longformSection">
              <h2>{s.h2}</h2>
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}

          {post.faq && post.faq.length > 0 ? (
            <section className="longformSection" id="faq">
              <h2>Frequently asked questions</h2>
              {post.faq.map((f) => (
                <details key={f.q} className="faqItem">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </section>
          ) : null}

          <PricingCtaBlock
            locale={locale as Locale}
            ref={`Blog-${slug}`}
          />

          <section className="longformSection">
            <h2>Related</h2>
            <ul className="longformList">
              {post.relatedLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </LongformShell>
    </>
  );
}
