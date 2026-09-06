// components/seo/DstvSoftSellCta.tsx
// Mid-article aside + end-of-guide commercial close for the PR #14
// ZA blog guides. WhatsApp href goes through generateWhatsAppLink
// (SITE.whatsappPhone → 447307410512). No mailto. No AggregateRating.

import { SITE } from "../shared/site";
import { generateWhatsAppLink } from "../shared/utils";
import {
  DSTV_SOFT_SELL_END_BODY,
  DSTV_SOFT_SELL_END_HEADLINE,
  DSTV_SOFT_SELL_END_PRICE,
  DSTV_SOFT_SELL_MID,
  DSTV_SOFT_SELL_WA_MESSAGE,
} from "../../lib/seo/dstv-soft-sell";

type Variant = "mid" | "end";

export function DstvSoftSellCta({
  variant,
  slug,
}: {
  variant: Variant;
  slug: string;
}) {
  const ref = `Blog-${slug}-DstvSoftSell-${variant === "mid" ? "Mid" : "End"}`;
  const waHref = generateWhatsAppLink(DSTV_SOFT_SELL_WA_MESSAGE, "", ref);
  const waDisplay = `https://wa.me/${SITE.whatsappPhone}`;

  if (variant === "mid") {
    return (
      <aside
        className="longformSection longformWarning"
        aria-label="DStv or IPTV"
        data-dstv-soft-sell="mid"
      >
        <p style={{ margin: 0 }}>{DSTV_SOFT_SELL_MID}</p>
      </aside>
    );
  }

  return (
    <section
      className="longformSection"
      id="dstv-soft-sell"
      aria-labelledby="dstv-soft-sell-h"
      data-dstv-soft-sell="end"
      style={{
        border: "1px solid rgba(255,184,28,0.35)",
        borderRadius: 14,
        padding: "18px 18px 16px",
        background:
          "linear-gradient(180deg, rgba(255,184,28,0.08) 0%, rgba(255,255,255,0.02) 100%)",
      }}
    >
      <h2 id="dstv-soft-sell-h" style={{ marginTop: 0 }}>
        {DSTV_SOFT_SELL_END_HEADLINE}
      </h2>
      <p>{DSTV_SOFT_SELL_END_BODY}</p>
      <p>
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          data-track-ref={ref}
          data-track-placement={`Blog-${slug}-DstvSoftSell-End`}
        >
          {waDisplay}
        </a>
        {" · "}
        <a href={SITE.domain}>{SITE.domain}</a>
      </p>
      <p>{DSTV_SOFT_SELL_END_PRICE}</p>
      <div className="ctaRow">
        <a
          href={waHref}
          className="btnPrimary"
          target="_blank"
          rel="noreferrer"
          data-track-ref={ref}
          data-track-placement={`Blog-${slug}-DstvSoftSell-End-Btn`}
        >
          WhatsApp us your device + leagues →
        </a>
      </div>
    </section>
  );
}
