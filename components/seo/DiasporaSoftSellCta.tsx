// components/seo/DiasporaSoftSellCta.tsx
// Mid + end WhatsApp close for the London / UK / abroad rugby cluster.
// Always https://wa.me/447307410512. No mailto. No AggregateRating.
// Does not replace DstvSoftSellCta on the 12 ZA blog guides.

import { SITE } from "../shared/site";
import { waMeLink } from "../shared/utils";

type Variant = "mid" | "end";

const WA_DISPLAY = `https://wa.me/${SITE.whatsappPhone}`;
const WA_HUMAN = "+44 7307 410512";

export function DiasporaSoftSellCta({
  variant,
  slug,
  place = "London / the UK",
  waHrefOverride,
}: {
  variant: Variant;
  slug: string;
  /** City or country for the pre-filled chat (sa-abroad pages). */
  place?: string;
  /** Character-exact href for the London blog (0 Ref). */
  waHrefOverride?: string;
}) {
  const ref = `Diaspora-${slug}-${variant === "mid" ? "Mid" : "End"}`;
  const message = `Hi! I'm a South African watching from ${place}. Device: [Firestick / Samsung / LG / Hisense]. I want the free 24-hour trial — Springboks / URC / SA channels.`;
  const waHref = waHrefOverride ?? waMeLink(message, ref);

  if (variant === "mid") {
    return (
      <aside
        className="longformSection longformWarning"
        aria-label="WhatsApp trial from abroad"
        data-diaspora-soft-sell="mid"
      >
        <p style={{ margin: 0 }}>
          Watching the Boks from {place} is a category-and-setup question —
          SuperSport Rugby in the playlist, kickoff on London time, Firestick
          or Smart TV on local Wi-Fi. Message WhatsApp ({WA_HUMAN}) for a
          24-hour trial. We list channel categories, not exclusive licences.
        </p>
        <p style={{ margin: "12px 0 0" }}>
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            data-track-ref={ref}
            data-track-placement={`Diaspora-${slug}-Mid`}
          >
            WhatsApp {WA_HUMAN} — 24h trial →
          </a>
        </p>
      </aside>
    );
  }

  return (
    <section
      className="longformSection"
      id="diaspora-whatsapp"
      aria-labelledby="diaspora-whatsapp-h"
      data-diaspora-soft-sell="end"
      style={{
        border: "1px solid rgba(255,184,28,0.35)",
        borderRadius: 14,
        padding: "18px 18px 16px",
        background:
          "linear-gradient(180deg, rgba(255,184,28,0.08) 0%, rgba(255,255,255,0.02) 100%)",
      }}
    >
      <h2 id="diaspora-whatsapp-h" style={{ marginTop: 0 }}>
        Still deciding from {place}?
      </h2>
      <p>
        WhatsApp {SITE.brand} on {WA_HUMAN}. Say your device, your ISP, and
        whether you care about Springboks, URC, or Premiership-style rugby.
        24-hour trial, no card, no email thread.
      </p>
      <p>
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          data-track-ref={ref}
          data-track-placement={`Diaspora-${slug}-End`}
        >
          {WA_DISPLAY}
        </a>
        {" · "}
        {WA_HUMAN}
      </p>
      <div className="ctaRow">
        <a
          href={waHref}
          className="btnPrimary"
          target="_blank"
          rel="noreferrer"
          data-track-ref={ref}
          data-track-placement={`Diaspora-${slug}-End-Btn`}
        >
          WhatsApp the 24h trial — {WA_HUMAN} →
        </a>
      </div>
    </section>
  );
}
