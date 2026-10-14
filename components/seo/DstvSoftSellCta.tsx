// Mid-article note + end-of-guide WhatsApp close for the ZA blog guides.
// Href is always https://wa.me/447307410512. No mailto. No AggregateRating.

import { SITE } from "../shared/site";
import { waMeLink } from "../shared/utils";
import {
  DSTV_GUIDE_END_BODY,
  DSTV_GUIDE_END_HEADLINE,
  DSTV_GUIDE_MID,
  DSTV_GUIDE_WA_MESSAGE,
} from "../../lib/seo/dstv-soft-sell";

type Variant = "mid" | "end";

const WA_HUMAN = "+44 7307 410512";

export function DstvSoftSellCta({
  variant,
  slug,
}: {
  variant: Variant;
  slug: string;
}) {
  const ref = `Blog-${slug}-Wa-${variant === "mid" ? "Mid" : "End"}`;
  const waHref = waMeLink(DSTV_GUIDE_WA_MESSAGE, ref);
  const waDisplay = `https://wa.me/${SITE.whatsappPhone}`;

  if (variant === "mid") {
    return (
      <aside className="longformSection" aria-label="WhatsApp trial">
        <p style={{ margin: 0 }}>{DSTV_GUIDE_MID}</p>
        <p style={{ margin: "12px 0 0" }}>
          <a href={waHref} target="_blank" rel="noreferrer">
            WhatsApp {WA_HUMAN}
          </a>
        </p>
      </aside>
    );
  }

  return (
    <section
      className="longformSection"
      id="guide-whatsapp"
      aria-labelledby="guide-whatsapp-h"
      style={{
        border: "1px solid rgba(255,184,28,0.35)",
        borderRadius: 14,
        padding: "18px 18px 16px",
        background:
          "linear-gradient(180deg, rgba(255,184,28,0.08) 0%, rgba(255,255,255,0.02) 100%)",
      }}
    >
      <h2 id="guide-whatsapp-h" style={{ marginTop: 0 }}>
        {DSTV_GUIDE_END_HEADLINE}
      </h2>
      <p>{DSTV_GUIDE_END_BODY}</p>
      <p>
        <a href={waHref} target="_blank" rel="noreferrer">
          {waDisplay}
        </a>
        {" · "}
        {WA_HUMAN}
        {" · "}
        <a href={SITE.domain}>{SITE.domain}</a>
      </p>
      <div className="ctaRow">
        <a
          href={waHref}
          className="btnPrimary"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp {WA_HUMAN}
        </a>
      </div>
    </section>
  );
}
