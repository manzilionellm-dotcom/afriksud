// app/iptv-[sport]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const SITE_URL = 'https://espg.vercel.app';
const WHATSAPP = '447307410512';

const mainStyle: React.CSSProperties = {
  background: '#000', color: '#f5f5f5', minHeight: '100vh', padding: '40px 20px',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
};
const articleStyle: React.CSSProperties = { maxWidth: 760, margin: '0 auto', lineHeight: 1.65 };
const breadcrumbStyle: React.CSSProperties = { fontSize: 13, color: '#8a8a8a', marginBottom: 16 };
const h1Style: React.CSSProperties = { fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 900, margin: '0 0 20px', letterSpacing: '-0.02em' };
const h2Style: React.CSSProperties = { fontSize: '1.4rem', fontWeight: 800, margin: '40px 0 14px' };
const leadStyle: React.CSSProperties = { fontSize: '1.1rem', color: '#b8b8b8', marginBottom: 28 };
const ctaStyle: React.CSSProperties = { display: 'inline-block', background: '#007749', color: '#fff', padding: '14px 28px', borderRadius: 4, textDecoration: 'none', fontWeight: 700, fontSize: 15, marginBottom: 8 };
const faqStyle: React.CSSProperties = { background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '14px 18px', marginBottom: 10 };
const faqSummaryStyle: React.CSSProperties = { cursor: 'pointer', fontWeight: 600, fontSize: 15 };
const faqAnswerStyle: React.CSSProperties = { marginTop: 10, color: '#b8b8b8', fontSize: 14 };
const ctaBlockStyle: React.CSSProperties = { marginTop: 40, padding: 28, background: 'linear-gradient(180deg, rgba(0,119,73,0.08), transparent)', border: '1px solid rgba(0,119,73,0.4)', borderRadius: 12, textAlign: 'center' };
import { SPORTS_DATA, sportPageData } from '@/content/programmatic-pages';

export async function generateStaticParams() {
  return SPORTS_DATA.map((s) => ({ sport: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ sport: string }> }): Promise<Metadata> {
  const { sport } = await params;
  const data = sportPageData(sport);
  if (!data) return { title: 'Sport not found' };
  return {
    title: data.metadata.title,
    description: data.metadata.description,
    keywords: data.metadata.keywords,
    alternates: { canonical: `/iptv-${sport}` },
    openGraph: { title: data.metadata.title, description: data.metadata.description, url: `${SITE_URL}/iptv-${sport}`, type: 'website' },
  };
}

export default async function SportPage({ params }: { params: Promise<{ sport: string }> }) {
  const { sport } = await params;
  const data = sportPageData(sport);
  if (!data) notFound();
  const wa = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

  const productSchema = {
    '@context': 'https://schema.org', '@type': 'Product',
    name: `Mzansi Stream — ${sport.toUpperCase()} streaming`,
    description: data.content.intro,
    brand: { '@type': 'Brand', name: 'Mzansi Stream' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '1200', bestRating: '5' },
    offers: { '@type': 'AggregateOffer', lowPrice: '199', highPrice: '1199', priceCurrency: 'ZAR', offerCount: 4, availability: 'https://schema.org/InStock' },
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: data.content.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <main style={mainStyle}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article style={articleStyle}>
        <p style={breadcrumbStyle}><Link href="/">Home</Link> / <Link href="/iptv-south-africa">IPTV South Africa</Link> / {sport}</p>
        <h1 style={h1Style}>{data.metadata.h1}</h1>
        <p style={leadStyle}>{data.content.intro}</p>
        <a style={ctaStyle} href={wa(`Hi! I want to watch ${sport} with Mzansi Stream.`)} target="_blank" rel="noreferrer">💬 Order via WhatsApp</a>
        <h2 style={h2Style}>What is included</h2>
        <p>{data.content.whatIncluded}</p>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {data.content.faqs.map((f, i) => (
          <details key={i} style={faqStyle}>
            <summary style={faqSummaryStyle}>{f.q}</summary>
            <p style={faqAnswerStyle}>{f.a}</p>
          </details>
        ))}
        <div style={ctaBlockStyle}>
          <h3 style={{ marginTop: 0 }}>Get started today</h3>
          <p>20,000+ channels · 4K · 10-minute activation · No contract.</p>
          <a style={ctaStyle} href={wa(`Hi! I want a free trial of Mzansi Stream for ${sport}.`)} target="_blank" rel="noreferrer">🧪 Free 24h trial</a>
        </div>
        <p style={{ marginTop: 32 }}><Link href="/">← Back to home</Link></p>
      </article>
    </main>
  );
}
