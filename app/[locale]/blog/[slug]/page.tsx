// app/[locale]/blog/[slug]/page.tsx
// One page per pillar blog post.

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../../lib/url";
import { robotsForProgrammatic } from "../../../../lib/seo/indexability";
import { BLOG_SLUGS, getBlogPost } from "../../../../lib/seo/blog-posts";
import { LongformShell } from "../../../../components/client/LongformShell";
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: `${SITE_URL}/og-image.jpg`,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    author: { "@type": "Organization", name: SITE.brand },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
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
          </header>

          {post.sections.map((s) => (
            <section key={s.h2} className="longformSection">
              <h2>{s.h2}</h2>
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}

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
