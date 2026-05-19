// components/seo/TrustReversalBlock.tsx
// Server component. Risk-reversal block — drops the user's perceived
// purchase risk to near-zero right before the pricing CTA. Used on
// longform SEO pages where the visitor lands cold and needs the trust
// vocabulary the home page surfaces above the fold.

import { dict } from "../shared/dict";
import type { Locale } from "../../lib/locales";

export function TrustReversalBlock({ locale }: { locale: Locale }) {
  const t = dict[locale];
  // Limit to the 4 strongest reassurance points so the block stays compact.
  const items = t.trust.items.slice(0, 4);

  return (
    <section className="longformSection" aria-label={t.trust.title}>
      <h2 style={{ marginTop: 0 }}>{t.trust.title}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          marginTop: 16,
        }}
      >
        {items.map((it) => (
          <div
            key={it.title}
            className="trustCard"
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 14,
              padding: "14px 16px",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div style={{ fontSize: 22 }} aria-hidden="true">
              {it.icon}
            </div>
            <div style={{ fontWeight: 700, marginTop: 6 }}>{it.title}</div>
            <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>
              {it.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
