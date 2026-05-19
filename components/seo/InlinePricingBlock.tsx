// components/seo/InlinePricingBlock.tsx
// Server component. Drop-in pricing block for longform SEO surfaces
// (pillars, blog posts, competitor and city pages). Keeps the user one
// tap away from a WhatsApp purchase without scrolling back to the home
// page. Renders the four canonical plans, anchors the "best value"
// option, and includes risk-reversal copy + payment methods.

import { dict } from "../shared/dict";
import { plans } from "../shared/plans";
import { SITE } from "../shared/site";
import { generateWhatsAppLink } from "../shared/utils";
import type { Locale } from "../../lib/locales";

const PAYMENTS =
  "EFT · SnapScan · Zapper · Yoco · Ozow · Capitec Pay · Visa · Mastercard · PayPal · Bitcoin";

function pct(plan: { price: number; months: number }) {
  const perMonth = Math.round(plan.price / plan.months);
  return Math.max(0, Math.round((1 - perMonth / 199) * 100));
}

export function InlinePricingBlock({
  locale,
  refTag = "InlinePricing",
  eyebrow,
  heading,
  sub,
}: {
  locale: Locale;
  refTag?: string;
  eyebrow?: string;
  heading?: string;
  sub?: string;
}) {
  const t = dict[locale];

  return (
    <section id="pricing" className="longformSection" aria-label={t.offers.title}>
      {eyebrow ? <p className="longformEyebrow">{eyebrow}</p> : null}
      <h2 style={{ marginTop: 0 }}>{heading ?? t.offers.title}</h2>
      <p className="longformLead" style={{ marginTop: 8 }}>
        {sub ?? t.offers.sub}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
          margin: "20px 0 8px",
        }}
      >
        {plans.map((p) => {
          const perMonth = Math.round(p.price / p.months);
          const orderHref = generateWhatsAppLink(
            t.whatsapp.orderMessage(t.planNames[p.key], p.price, SITE.currencyLabel),
            "",
            `${refTag}-${p.key}`
          );
          const saving = pct(p);
          const isBest = p.highlight === true;
          return (
            <div
              key={p.key}
              className="priceCard"
              style={{
                position: "relative",
                background: isBest
                  ? "linear-gradient(180deg, rgba(255,184,28,0.10) 0%, rgba(0,0,0,0.0) 100%)"
                  : "rgba(255,255,255,0.02)",
                border: isBest
                  ? "1px solid rgba(255,184,28,0.55)"
                  : "1px solid rgba(255,255,255,0.10)",
                borderRadius: 18,
                padding: "18px 16px",
                color: "var(--mz-cream, #fff)",
              }}
            >
              {isBest ? (
                <span
                  style={{
                    position: "absolute",
                    top: -10,
                    insetInlineStart: 14,
                    background: "#FFB81C",
                    color: "#000",
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    padding: "4px 8px",
                    borderRadius: 999,
                  }}
                >
                  {t.offers.bestSeller}
                </span>
              ) : null}
              {!isBest && saving > 0 ? (
                <span
                  style={{
                    position: "absolute",
                    top: -10,
                    insetInlineEnd: 14,
                    background: "#E0152D",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    padding: "4px 8px",
                    borderRadius: 999,
                  }}
                >
                  −{saving}%
                </span>
              ) : null}

              <div style={{ fontSize: 13, opacity: 0.7 }}>{t.planNames[p.key]}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 6 }}>
                <span style={{ fontSize: 14, opacity: 0.6 }}>{SITE.currencyLabel}</span>
                <span style={{ fontSize: "2.25rem", fontWeight: 800, lineHeight: 1 }}>
                  {perMonth}
                </span>
                <span style={{ fontSize: 13, opacity: 0.65 }}>{t.offers.perMonth}</span>
              </div>
              <div style={{ fontSize: 12, opacity: 0.55, marginTop: 4 }}>
                {t.offers.billedOnce} {SITE.currencyLabel}
                {p.price}
                {p.months > 1 ? ` (${t.offers.totalLabel})` : ""}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "14px 0 16px",
                  display: "grid",
                  gap: 6,
                  fontSize: 14,
                  opacity: 0.92,
                }}
              >
                {t.planPerks[p.key].slice(0, 3).map((perk) => (
                  <li key={perk}>✓ {perk}</li>
                ))}
              </ul>
              <a
                href={orderHref}
                target="_blank"
                rel="noreferrer"
                className={isBest ? "btnPrimary" : "btnSecondary"}
                style={{ width: "100%", justifyContent: "center" }}
                data-track-ref={`${refTag}-${p.key}`}
                data-track-placement={refTag}
              >
                {t.offers.order} →
              </a>
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: 12, opacity: 0.6, marginTop: 14 }}>
        {t.trial.note} · {t.payments.label}: {PAYMENTS}
      </p>
    </section>
  );
}
