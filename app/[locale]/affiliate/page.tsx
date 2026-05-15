// app/[locale]/affiliate/page.tsx

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
    title: "Mzansi Stream Affiliate Programme — R200 per referral",
    description:
      "Earn R200 per paying customer you refer to Mzansi Stream — 20% commission, monthly payout via EFT or Mobile Money.",
    alternates: {
      canonical: localeUrl(locale as Locale, "/affiliate/"),
      languages: hreflangFor("/affiliate/"),
    },
    openGraph: {
      type: "website",
      url: localeUrl(locale as Locale, "/affiliate/"),
      locale: LOCALE_META[locale as Locale].ogLocale,
    },
  };
}

export default async function AffiliatePage({ params }: Props) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();

  return (
    <LongformShell locale={locale as Locale}>
      <article className="section">
        <header className="longformHeader">
          <p className="longformEyebrow">Affiliate Programme</p>
          <h1>Earn R200 per referral as a Mzansi Stream affiliate</h1>
          <p className="longformLead">
            Built for TikTok and YouTube SA creators, sports community
            admins and group chat operators. 20% commission on every paid
            subscription you refer. Monthly payout via EFT or Mobile Money.
          </p>
        </header>

        <section className="longformSection">
          <h2>What you get</h2>
          <ul className="longformList">
            <li>
              <strong>20% commission</strong> on every paying subscriber.
              That&apos;s ~R40 on a 1-month plan, R240 on a 12-month plan.
            </li>
            <li>
              <strong>Monthly payout</strong> via EFT, Capitec Pay, Yoco,
              SnapScan or Mobile Money (MTN MoMo, Airtel Money, EcoCash,
              M-Pesa).
            </li>
            <li>
              <strong>Custom referral link</strong> that tracks for 60 days
              — so the customer doesn&apos;t have to subscribe immediately.
            </li>
            <li>
              <strong>Live dashboard</strong> showing clicks, signups and
              earnings.
            </li>
          </ul>
        </section>

        <section className="longformSection">
          <h2>Who we work with</h2>
          <ul className="longformList">
            <li>TikTok and YouTube creators with SA audiences (no minimum follower count).</li>
            <li>WhatsApp / Telegram group admins (PSL, Premier League, SA expat groups).</li>
            <li>Sport bloggers, tech reviewers, tech support consultants.</li>
            <li>Anyone who already recommends Mzansi Stream to people they know.</li>
          </ul>
        </section>

        <section className="longformSection">
          <h2>Apply</h2>
          <p>
            Open WhatsApp using the floating button at the bottom-right
            and tell us about your audience. We get back to most applicants
            within 24 hours.
          </p>
          <p className="longformWarning">
            ⚠️ Programme details (commission rate, payout schedule, cookie
            window) are subject to change. Final terms are confirmed in
            writing when your application is approved.{" "}
            <code>TO_FILL_BY_OWNER</code> if you decide to change the
            structure.
          </p>
        </section>
      </article>
    </LongformShell>
  );
}
