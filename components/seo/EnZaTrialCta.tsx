// components/seo/EnZaTrialCta.tsx
// Soft-sell WhatsApp trial CTAs for /en-za (hero + after FAQ).
// Only the fleet number wa.me/447307410512. No prices, no ratings.

import type { CSSProperties } from "react";
import Link from "next/link";

export const EN_ZA_TRIAL_WA_HREF =
  "https://wa.me/447307410512?text=Hi%2C%2024h%20trial%20please%20-%20Device%3A%20Firestick%20-%20Country%3A%20South%20Africa";

const wrap: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px 20px",
  margin: "24px auto",
  padding: "0 16px",
  maxWidth: 960,
  textAlign: "center",
};

const button: CSSProperties = {
  display: "inline-block",
  padding: "14px 24px",
  borderRadius: 999,
  background: "#25D366",
  color: "#0b1f12",
  fontWeight: 700,
  textDecoration: "none",
};

const link: CSSProperties = {
  color: "inherit",
  textDecoration: "underline",
  fontWeight: 600,
};

type Props = { variant: "hero" | "after-faq" };

export function EnZaTrialCta({ variant }: Props) {
  return (
    <section
      aria-label="Free 24h trial on WhatsApp"
      data-cta={`en-za-trial-${variant}`}
      style={variant === "after-faq" ? { ...wrap, margin: "40px auto" } : wrap}
    >
      {variant === "after-faq" ? (
        <p style={{ width: "100%", margin: 0, fontSize: 20, fontWeight: 700 }}>
          Not sure yet? Test it on your own TV and Wi-Fi first.
        </p>
      ) : null}
      <a
        href={EN_ZA_TRIAL_WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        style={button}
      >
        Try it free for 24h on WhatsApp
      </a>
      <Link href="/en-za/free-trial" style={link}>
        How the free trial works
      </Link>
    </section>
  );
}
