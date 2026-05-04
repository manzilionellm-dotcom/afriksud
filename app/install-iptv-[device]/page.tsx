// app/install-iptv-[device]/page.tsx
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
const infoBlockStyle: React.CSSProperties = { display: 'flex', gap: 20, flexWrap: 'wrap', padding: 16, background: '#0a0a0a', borderRadius: 10, fontSize: 14, marginBottom: 24 };

import { DEVICES_DATA, devicePageData } from '@/content/programmatic-pages';

export async function generateStaticParams() {
  return DEVICES_DATA.map((d) => ({ device: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ device: string }> }): Promise<Metadata> {
  const { device } = await params;
  const data = devicePageData(device);
  if (!data) return { title: 'Device not found' };
  return {
    title: data.metadata.title,
    description: data.metadata.description,
    keywords: data.metadata.keywords,
    alternates: { canonical: `/install-iptv-${device}` },
    openGraph: { title: data.metadata.title, description: data.metadata.description, url: `${SITE_URL}/install-iptv-${device}`, type: 'article' },
  };
}

export default async function DevicePage({ params }: { params: Promise<{ device: string }> }) {
  const { device } = await params;
  const data = devicePageData(device);
  if (!data) notFound();
  const wa = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

  const howToSchema = {
    '@context': 'https://schema.org', '@type': 'HowTo',
    name: data.metadata.h1, description: data.content.intro,
    totalTime: `PT${data.content.time}M`,
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'ZAR', value: '0' },
    inLanguage: 'en-ZA',
    tool: [{ '@type': 'HowToTool', name: data.content.app }],
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Contact us on WhatsApp', text: 'Send us a WhatsApp message and tell us you have ' + device + '.' },
      { '@type': 'HowToStep', position: 2, name: `Install the ${data.content.app.split('/')[0].trim()} app`, text: `Install ${data.content.app} from the device app store.` },
      { '@type': 'HowToStep', position: 3, name: 'Add the M3U link', text: 'Paste the M3U link we sent you on WhatsApp into the app.' },
      { '@type': 'HowToStep', position: 4, name: 'Start watching', text: `In less than ${data.content.time} minutes the 20,000+ channels load in 4K.` },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: data.content.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <main style={mainStyle}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article style={articleStyle}>
        <p style={breadcrumbStyle}><Link href="/">Home</Link> / <Link href="/how-to-install-iptv">IPTV Install</Link> / {device}</p>
        <h1 style={h1Style}>{data.metadata.h1}</h1>
        <p style={leadStyle}>{data.content.intro}</p>
        <div style={infoBlockStyle}>
          <span>⏱ Time: <strong>{data.content.time} min</strong></span>
          <span>🎯 Difficulty: <strong>{data.content.difficulty}</strong></span>
          <span>📱 Recommended app: <strong>{data.content.app}</strong></span>
        </div>
        <a style={ctaStyle} href={wa(`Hi! I want to install IPTV on ${device}.`)} target="_blank" rel="noreferrer">💬 Get install help</a>
        <h2 style={h2Style}>Installation steps</h2>
        <ol style={{ paddingLeft: 22, lineHeight: 1.8 }}>
          <li>Contact us on WhatsApp and tell us you have {device}.</li>
          <li>Install the <strong>{data.content.app}</strong> app from the device app store.</li>
          <li>Paste the M3U link we sent you on WhatsApp.</li>
          <li>In less than <strong>{data.content.time} minutes</strong> you are watching 20,000+ channels in 4K.</li>
        </ol>
        <h2 style={h2Style}>Frequently asked questions</h2>
        {data.content.faqs.map((f, i) => (
          <details key={i} style={faqStyle}>
            <summary style={faqSummaryStyle}>{f.q}</summary>
            <p style={faqAnswerStyle}>{f.a}</p>
          </details>
        ))}
        <div style={ctaBlockStyle}>
          <h3 style={{ marginTop: 0 }}>Stuck?</h3>
          <p>We help on WhatsApp in under 10 minutes. English support, 7 days a week.</p>
          <a style={ctaStyle} href={wa(`Hi! I need help installing IPTV on ${device}.`)} target="_blank" rel="noreferrer">🆘 Immediate WhatsApp help</a>
        </div>
        <p style={{ marginTop: 32 }}><Link href="/">← Back to home</Link></p>
      </article>
    </main>
  );
}
