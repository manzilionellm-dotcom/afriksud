// components/seo/PricingCtaBlock.tsx
// Server-rendered pricing + risk-reversal block reused on every longform
// SEO page (pillars, /vs/, blog posts, dstv-alternative). Keeps the four
// plans visible from any high-intent page without the carousel JS, and
// links straight to the homepage pricing anchor for the full sheet.

import Link from "next/link";
import { plans } from "../shared/plans";
import { SITE } from "../shared/site";
import { generateWhatsAppLink } from "../shared/utils";
import type { Locale } from "../../lib/locales";

type Props = {
  locale: Locale;
  /** Tracking ref appended to the WhatsApp link (e.g. "Pillar-CheapIPTV"). */
  ref: string;
  /** Optional H2 override — defaults to a generic pricing headline. */
  heading?: string;
  /** Optional sub-headline override. */
  sub?: string;
  /** Optional tail trust line under the plan grid. */
  trustLine?: string;
};

export function PricingCtaBlock({
  locale,
  ref,
  heading = "Plans from R99/month — no contract, free 24h trial",
  sub = "Same channels on every plan. 4K UHD. Pay once, watch the full period — no auto-renew, no card stored.",
  trustLine = "7-day satisfaction guarantee · POPIA compliant · EFT, SnapScan, Ozow, Yoco, Visa, Mastercard, PayPal, Bitcoin",
}: Props) {
  const trialHref = generateWhatsAppLink(
    "Hi! I'd like the free 24-hour Mzansi Stream trial — no card.",
    "",
    `${ref}-Trial`
  );

  return (
    <section className="longformSection" id="pricing" aria-labelledby="pricing-heading">
      <h2 id="pricing-heading">{heading}</h2>
      <p>{sub}</p>

      <div className="pricingCtaGrid" role="list">
        {plans.map((p) => {
          const pricePerMonth = Math.round(p.price / p.months);
          const saving = Math.round((1 - pricePerMonth / 199) * 100);
          const orderHref = generateWhatsAppLink(
            `Hi! I want the ${p.months}-month Mzansi Stream plan (${SITE.currencyLabel}${p.price}). How do I activate it?`,
            "",
            `${ref}-Plan-${p.key}`
          );
          return (
            <article
              key={p.key}
              role="listitem"
              className={`pricingCtaCard${p.highlight ? " is-highlight" : ""}`}
            >
              {p.highlight ? (
                <span className="pricingCtaBadge">Most popular</span>
              ) : saving > 0 ? (
                <span className="pricingCtaBadge pricingCtaBadge--save">
                  Save {saving}%
                </span>
              ) : null}
              <div className="pricingCtaLabel">
                {p.months === 1
                  ? "1 month"
                  : p.months === 12
                  ? "12 months · best value"
                  : `${p.months} months`}
              </div>
              <div className="pricingCtaPrice">
                <span className="pricingCtaCurrency">
                  {SITE.currencyLabel}
                </span>
                <span className="pricingCtaAmount">{pricePerMonth}</span>
                <span className="pricingCtaUnit">/mo</span>
              </div>
              <div className="pricingCtaBilled">
                One-off {SITE.currencyLabel}
                {p.price.toLocaleString("en-ZA")}
              </div>
              <a
                href={orderHref}
                target="_blank"
                rel="noreferrer"
                className="pricingCtaButton"
              >
                Order on WhatsApp →
              </a>
            </article>
          );
        })}
      </div>

      <div className="pricingCtaTrust">{trustLine}</div>

      <div className="ctaRow" style={{ marginTop: 24 }}>
        <a
          href={trialHref}
          target="_blank"
          rel="noreferrer"
          className="btnPrimary"
        >
          Start free 24h trial →
        </a>
        <Link href={`/${locale}/#offers`} className="btnSecondary">
          See full plan details →
        </Link>
      </div>
    </section>
  );
}
