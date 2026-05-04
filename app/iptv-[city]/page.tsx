// app/iptv-[city]/page.tsx
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
const priceBoxStyle: React.CSSProperties = { background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 10, padding: '14px 18px', marginBottom: 22, fontSize: 16 };

import { SA_CITIES_DATA, cityPageData } from '@/content/programmatic-pages';

export async function generateStaticParams() {
  return SA_CITIES_DATA.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const data = cityPageData(city);
  if (!data) return { title: 'City not found' };
  return {
    title: data.metadata.title,
    description: data.metadata.description,
    keywords: data.metadata.keywords,
    alternates: { canonical: `/iptv-${city}` },
    openGraph: { title: data.metadata.title, description: data.metadata.description, url: `${SITE_URL}/iptv-${city}`, type: 'website' },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const data = cityPageData(city);
  if (!data) notFound();
  const wa = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  const cityName = data.metadata.h1.split(' in ')[1]?.split(' —')[0] ?? city;

  const localBusinessSchema = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness',
    name: `Mzansi Stream — ${cityName}`, description: data.content.intro,
    url: `${SITE_URL}/iptv-${city}`,
    address: { '@type': 'PostalAddress', addressLocality: cityName, addressCountry: 'ZA' },
    priceRange: 'R199-R1199',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '1200', bestRating: '5' },
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: data.content.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <main style={mainStyle}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article style={articleStyle}>
        <p style={breadcrumbStyle}><Link href="/">Home</Link> / <Link href="/iptv-south-africa">IPTV South Africa</Link> / {cityName}</p>
        <h1 style={h1Style}>{data.metadata.h1}</h1>
        <p style={leadStyle}>{data.content.intro}</p>
        <a style={ctaStyle} href={wa(`Hi! I want Mzansi Stream in ${city}.`)} target="_blank" rel="noreferrer">💬 Order via WhatsApp</a>
        <h2 style={h2Style}>Why Mzansi Stream in your city?</h2>
        <p>{data.content.whyHere}</p>
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
          <a style={ctaStyle} href={wa(`Hi! I want a free Mzansi Stream trial in ${city}.`)} target="_blank" rel="noreferrer">🧪 Free 24h trial</a>
        </div>
        <p style={{ marginTop: 32 }}><Link href="/">← Back to home</Link></p>
      </article>
    </main>
  );
}
