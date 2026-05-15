// app/[locale]/referral/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES, LOCALE_META, type Locale } from "../../../lib/locales";
import { hreflangFor, localeUrl } from "../../../lib/url";
import { LongformShell } from "../../../components/client/LongformShell";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) return {};
  return {
    title: "Refer a friend — 1 month free | Mzansi Stream",
    description:
      "Refer a friend to Mzansi Stream and you both get 1 free month when they subscribe. No limit on referrals.",
    alternates: {
      canonical: localeUrl(locale as Locale, "/referral/"),
      languages: hreflangFor("/referral/"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(locale as Locale, "/referral/"),
      locale: LOCALE_META[locale as Locale].ogLocale,
    },
  };
}

export default async function ReferralPage({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();

  return (
    <LongformShell locale={locale as Locale}>
      <article className="section">
        <header className="longformHeader">
          <p className="longformEyebrow">Refer a friend</p>
          <h1>Invite a friend → both get 1 month free</h1>
          <p className="longformLead">
            Send a Mzansi Stream invite to anyone in your circle. When they
            subscribe to any plan, you both get an extra month added to
            your subscription — automatically.
          </p>
        </header>

        <section className="longformSection">
          <h2>How it works</h2>
          <ol className="longformList">
            <li>Message us on WhatsApp with your friend&apos;s name + WhatsApp number.</li>
            <li>We message them with a 24-hour free trial link.</li>
            <li>When they subscribe to any plan, you both get 1 month free.</li>
          </ol>
        </section>

        <section className="longformSection">
          <h2>The fine print</h2>
          <ul className="longformList">
            <li>No cap on the number of friends you can refer.</li>
            <li>Bonus months are added to your active subscription period.</li>
            <li>Your friend must subscribe to a paid plan (the 24h trial alone doesn&apos;t trigger the bonus).</li>
            <li>
              Self-referrals don&apos;t qualify — the friend&apos;s WhatsApp number
              must be different from yours.
            </li>
          </ul>
        </section>

        <section className="longformSection">
          <h2>Get started</h2>
          <p>
            Open WhatsApp using the floating button at the bottom-right.
            Mention &ldquo;referral&rdquo; and we&apos;ll handle the rest.
          </p>
        </section>
      </article>
    </LongformShell>
  );
}
