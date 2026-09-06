// app/[locale]/blog/[slug]/page.tsx
// One page per blog post. Long-form guides emit FAQPage + HowTo when
// the post carries faq[] / section steps. Conversion is WhatsApp only.
// watch-springboks-from-london: reinforced FAQPage (@id + inLanguage);
// DirectAnswer stays visible without a competing Question schema.
// Primary WA href = SPRINGBOKS_LONDON_WA_HREF (character-exact, 0 Ref).

import { Fragment } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { LOCALES, LOCALE_META, type Locale } from "../../../../lib/locales";
import { hreflangFor, localeUrl, SITE_URL } from "../../../../lib/url";
import { robotsForProgrammatic } from "../../../../lib/seo/indexability";
import { BLOG_SLUGS, getBlogPost } from "../../../../lib/seo/blog-posts";
import { BLOG_GUIDE_SLUGS } from "../../../../lib/seo/blog-guides";
import {
  BLOG_DIASPORA_SLUGS,
  SPRINGBOKS_LONDON_WA_HREF,
  SPRINGBOKS_LONDON_WA_PREFILL,
} from "../../../../lib/seo/blog-diaspora";
import { DstvSoftSellCta } from "../../../../components/seo/DstvSoftSellCta";
import { DiasporaSoftSellCta } from "../../../../components/seo/DiasporaSoftSellCta";
import {
  AUTHORS,
  DEFAULT_AUTHOR_SLUG,
} from "../../../../lib/seo/authors";
import { JsonLd } from "../../../../lib/seo/jsonld";
import { buildFaqPageSchema } from "../../../../lib/seo/faq-page";
import { LongformShell } from "../../../../components/client/LongformShell";
import { AuthorBio } from "../../../../components/seo/AuthorBio";
import { DirectAnswerBlock } from "../../../../components/seo/DirectAnswerBlock";
import { InlinePricingBlock } from "../../../../components/seo/InlinePricingBlock";
import { TrustReversalBlock } from "../../../../components/seo/TrustReversalBlock";
import { InternalLinkHub } from "../../../../components/seo/InternalLinkHub";
import { SITE } from "../../../../components/shared/site";
import { generateWhatsAppLink, waMeLink } from "../../../../components/shared/utils";

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
    title: post.title,
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
    ...(slug === "watch-springboks-from-london"
      ? {
          twitter: {
            title: post.title,
            description: post.metaDescription,
          },
        }
      : {}),
    robots: robotsForProgrammatic(locale as Locale),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const post = getBlogPost(slug);
  if (!post) notFound();

  const author = AUTHORS[DEFAULT_AUTHOR_SLUG];
  const loc = locale as Locale;
  const canonical = localeUrl(loc, `/blog/${slug}/`);
  const dateModified = post.dateModified ?? post.datePublished;

  const cta = post.cta ?? {
    label: `Free 24h trial on WhatsApp — ${SITE.brand}`,
    message: `Hi! I read "${post.title}" and I want the free 24-hour Mzansi Stream trial.`,
    ref: `Blog-${slug}`,
  };
  const showDiasporaSoftSell = BLOG_DIASPORA_SLUGS.includes(slug);
  const isSpringboksLondon = slug === "watch-springboks-from-london";
  const waHref = isSpringboksLondon
    ? SPRINGBOKS_LONDON_WA_HREF
    : showDiasporaSoftSell
      ? waMeLink(cta.message, cta.ref)
      : generateWhatsAppLink(cta.message, "", cta.ref);
  const londonWaOverride = isSpringboksLondon
    ? { href: SPRINGBOKS_LONDON_WA_HREF, message: SPRINGBOKS_LONDON_WA_PREFILL }
    : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: `${SITE_URL}/og-image.jpg`,
    datePublished: post.datePublished,
    dateModified,
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
    mainEntityOfPage: canonical,
    inLanguage: LOCALE_META[loc].hreflang,
    ...(isSpringboksLondon
      ? { hasPart: { "@id": `${canonical}#faqpage` } }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(loc, "/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: localeUrl(loc, "/blog/") },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonical,
      },
    ],
  };

  const faqSchema =
    post.faq && post.faq.length > 0
      ? buildFaqPageSchema({
          faq: post.faq,
          canonical,
          inLanguage: LOCALE_META[loc].hreflang,
          reinforce: isSpringboksLondon,
        })
      : null;

  const howToSection = post.sections.find((s) => s.steps && s.steps.length);
  const howToSchema =
    post.howTo && howToSection?.steps
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: post.howTo.name,
          description: post.howTo.description ?? post.metaDescription,
          totalTime: post.howTo.totalTime ?? "PT10M",
          supply: (post.howTo.supply ?? []).map((name) => ({
            "@type": "HowToSupply",
            name,
          })),
          tool: (post.howTo.tool ?? []).map((name) => ({
            "@type": "HowToTool",
            name,
          })),
          step: howToSection.steps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.title,
            text: s.text,
          })),
        }
      : null;

  const tocSections = post.sections.filter((s) => s.id);
  const showDstvSoftSell = BLOG_GUIDE_SLUGS.includes(slug);
  const midAfterIndex = Math.floor((post.sections.length - 1) / 2);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema ? (
        <JsonLd
          data={faqSchema}
          id={isSpringboksLondon ? "faqpage-jsonld" : undefined}
        />
      ) : null}
      {howToSchema ? <JsonLd data={howToSchema} /> : null}

      <LongformShell locale={loc} waOverride={londonWaOverride}>
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
            <div className="ctaRow">
              <a
                href={waHref}
                className="btnPrimary"
                target="_blank"
                rel="noreferrer"
                data-track-ref={cta.ref}
                data-track-placement={`Blog-${slug}-Hero`}
              >
                {cta.label}
              </a>
              <a
                href="#pricing"
                className="btnSecondary"
                data-track-ref={`Blog-${slug}-Hero-Pricing`}
                data-track-placement={`Blog-${slug}-Hero`}
              >
                See plans from R99/mo →
              </a>
            </div>
          </header>

          <DirectAnswerBlock
            question={post.title}
            answer={post.lead}
            emitSchema={!isSpringboksLondon}
            keyFacts={
              post.keyFacts ?? [
                "From R99/month on the 12-month plan. 24-hour free trial, no credit card.",
                "Activated on WhatsApp — no mailto, no call centre queue.",
              ]
            }
          />

          {tocSections.length > 0 ? (
            <nav aria-label="On this page" className="longformSection">
              <h2 className="sr-only">On this page</h2>
              <ul className="longformList">
                {tocSections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>{s.h2}</a>
                  </li>
                ))}
                {post.faq && post.faq.length > 0 ? (
                  <li>
                    <a href="#faq">FAQ</a>
                  </li>
                ) : null}
              </ul>
            </nav>
          ) : null}

          {post.sections.map((s, i) => (
            <Fragment key={s.h2}>
              <section id={s.id} className="longformSection">
                <h2>{s.h2}</h2>
                {s.body.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
                {s.bullets ? (
                  <ul className="longformList">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
                {s.steps ? (
                  <ol className="longformList">
                    {s.steps.map((st) => (
                      <li key={st.title}>
                        <strong>{st.title}.</strong> {st.text}
                      </li>
                    ))}
                  </ol>
                ) : null}
              </section>
              {showDstvSoftSell && i === midAfterIndex ? (
                <DstvSoftSellCta variant="mid" slug={slug} />
              ) : null}
              {showDiasporaSoftSell && i === midAfterIndex ? (
                <DiasporaSoftSellCta
                  variant="mid"
                  slug={slug}
                  place="London / the UK"
                  waHrefOverride={
                    isSpringboksLondon ? SPRINGBOKS_LONDON_WA_HREF : undefined
                  }
                />
              ) : null}
            </Fragment>
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

          {showDstvSoftSell ? <DstvSoftSellCta variant="end" slug={slug} /> : null}
          {showDiasporaSoftSell ? (
            <DiasporaSoftSellCta
              variant="end"
              slug={slug}
              place="London / the UK"
              waHrefOverride={
                isSpringboksLondon ? SPRINGBOKS_LONDON_WA_HREF : undefined
              }
            />
          ) : null}

          <TrustReversalBlock locale={loc} />

          <InlinePricingBlock
            locale={loc}
            refTag={`Blog-${slug}`}
            heading={`Get started with ${SITE.brand} — from R99/month`}
            sub="Same channel pack on every plan. Pay once, no auto-renewal, no contract. 24-hour free trial available on WhatsApp."
            softenCatalogClaims={isSpringboksLondon}
          />

          <section className="longformSection" id="next-step">
            <h2>Ready? Message us on WhatsApp</h2>
            <p>
              {SITE.brand} activates a free 24-hour trial within 10 minutes —
              full channel pack, 4K where the source supports it, no credit
              card. Tell us your device and we send the setup steps in the
              same chat.
            </p>
            <div className="ctaRow">
              <a
                href={waHref}
                className="btnPrimary"
                target="_blank"
                rel="noreferrer"
                data-track-ref={cta.ref}
                data-track-placement={`Blog-${slug}-Footer-CTA`}
              >
                {cta.label}
              </a>
            </div>
          </section>

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

          <InternalLinkHub
            locale={loc}
            heading="More buyer-intent guides"
          />
        </article>
      </LongformShell>
    </>
  );
}
