// app/[locale]/opengraph-image.tsx
// One share card per locale, generated at build time from the SAME
// dictionary strings the homepage hero renders (brand, H1, pill). No
// ratings, no counters, no viewer numbers. The hand-made public/og-image.jpg
// stays in place for JSON-LD `image` references.

import { ImageResponse } from "next/og";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "../../lib/locales";
import { APEX_HOST } from "../../lib/url";
import { dict } from "../../components/shared/dict";

export const alt = "Mzansi Stream — live TV in 4K, activated on WhatsApp";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const ACCENT = "#22c55e";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved = (LOCALES as readonly string[]).includes(locale)
    ? (locale as Locale)
    : DEFAULT_LOCALE;
  const t = dict[resolved];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #000000 0%, #0f172a 60%, #000000 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9999, background: ACCENT, display: "flex" }} />
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5, display: "flex" }}>{t.brand}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5, display: "flex", maxWidth: 1040 }}>
            {`${t.hero.titleA} ${t.hero.titleB}`}
          </div>
          <div style={{ fontSize: 30, color: ACCENT, fontWeight: 600, display: "flex" }}>{t.hero.pill}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#94a3b8" }}>
          <div style={{ display: "flex" }}>{`${APEX_HOST}/${resolved}`}</div>
          <div style={{ display: "flex" }}>WhatsApp</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
