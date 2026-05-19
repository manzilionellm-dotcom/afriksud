// components/seo/InternalLinkHub.tsx
// Server component. High-density internal link block that pushes
// PageRank from longform SEO pages back into the highest-converting
// destinations (pricing anchor on home, DStv alternative pillar, the
// new buyer-intent pillars, competitor compares). Drops at the bottom
// of pillars + blog posts so every leaf has a path to revenue.

import Link from "next/link";
import type { Locale } from "../../lib/locales";

type CommercialLink = { label: string; href: string };

const COMMERCIAL_LINKS: CommercialLink[] = [
  { label: "Pricing — see plans from R99/mo", href: "/#offers" },
  { label: "Cheap IPTV South Africa (under R100)", href: "/cheap-iptv-south-africa/" },
  { label: "4K IPTV in South Africa", href: "/4k-iptv-south-africa/" },
  { label: "IPTV with no buffering", href: "/iptv-no-buffering-south-africa/" },
  { label: "Best IPTV in South Africa 2026", href: "/best-iptv-south-africa-2026/" },
  { label: "DStv alternative — full guide", href: "/dstv-alternative/" },
  { label: "Watch SuperSport without DStv", href: "/iptv-supersport-without-dstv/" },
  { label: "IPTV for Firestick / Fire TV", href: "/iptv-firestick-south-africa/" },
  { label: "IPTV for movies & series", href: "/iptv-for-movies-and-series/" },
  { label: "Mzansi Stream vs DStv Premium", href: "/vs/dstv-premium/" },
  { label: "Mzansi Stream vs Showmax", href: "/vs/showmax/" },
  { label: "Mzansi Stream vs Netflix", href: "/vs/netflix/" },
];

export function InternalLinkHub({
  locale,
  heading = "Explore more — buyer guides",
  exclude = [],
}: {
  locale: Locale;
  heading?: string;
  exclude?: string[];
}) {
  const links = COMMERCIAL_LINKS.filter((l) => !exclude.includes(l.href));
  return (
    <section className="longformSection" aria-label={heading}>
      <h2 style={{ marginTop: 0 }}>{heading}</h2>
      <ul
        className="longformList"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          listStyle: "none",
          margin: "12px 0 0",
          padding: 0,
          gap: 8,
        }}
      >
        {links.map((l) => (
          <li key={l.href} style={{ margin: 0 }}>
            <Link href={`/${locale}${l.href}`}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
