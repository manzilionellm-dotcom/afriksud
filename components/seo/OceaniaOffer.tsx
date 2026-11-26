import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { OCEANIA_MARKETS, OCEANIA_PLANS, type OceaniaMarket } from "../../lib/oceania-offer";
import { MzansiLogo } from "../shared/MzansiLogo";
import { waMeLink } from "../shared/utils";
import { LanguageProvider } from "../client/LanguageProvider";
import { SkipLink } from "../client/SkipLink";
import { PopiaConsentBanner } from "../client/PopiaConsentBanner";
import styles from "./OceaniaOffer.module.css";

type OfferView = "home" | "guide" | "trial" | "terms";

type Props = {
  market: OceaniaMarket;
  view?: OfferView;
  children?: ReactNode;
};

function introduction(country: string, view: OfferView) {
  switch (view) {
    case "guide":
      return {
        title: `Watching South African TV in ${country}`,
        text: "Send the name of a programme you miss and the make and model of your TV. We’ll check what you can watch where you live and help you try it on your own connection.",
      };
    case "trial":
      return {
        title: "Try it on your own TV for 24 hours.",
        text: `Request your free trial from ${country}, Monday to Friday. Tell us which device you use and what you’d like to watch. We’ll confirm availability and send the setup instructions on WhatsApp.`,
      };
    case "terms":
      return {
        title: `Your prepaid TV terms in ${country}`,
        text: "Each pass is a single payment in US dollars. Access ends after the period you choose. Check the price, your device and the programmes available in your country with us before paying.",
      };
    default:
      return {
        title: `South African TV in ${country}.`,
        text: "Which programme do you miss? Tell us the title, your device and the language you watch in, whether that’s English, Afrikaans, isiZulu or isiXhosa. We’ll check availability where you live before you pay.",
      };
  }
}

export function OceaniaOffer({ market, view = "home", children }: Props) {
  const { country, slug } = OCEANIA_MARKETS[market];
  const { title, text } = introduction(country, view);
  const trialHref = waMeLink(`I’m in ${country} and would like the free 24-hour weekday trial. Device: __. Programme: __. Please confirm availability.`);

  return (
    <LanguageProvider initialLocale={market}>
      <SkipLink />
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <MzansiLogo size={30} />
            <nav aria-label="Viewing country" className={styles.markets}>
              {Object.entries(OCEANIA_MARKETS).map(([locale, item]) => (
                <Link key={locale} href={`/${locale}`} aria-current={locale === market ? "true" : undefined}>
                  {item.country}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main id="main-content" className={styles.content}>
          <section className={styles.hero} aria-labelledby="offer-title">
            <div>
              <p className={styles.kicker}>Prepaid TV in {country}</p>
              <h1 id="offer-title">{title}</h1>
              <p className={styles.intro}>{text}</p>
            </div>
            <aside className={styles.trial} aria-label="Free trial">
              <p className={styles.trialTitle}>24 hours free</p>
              <p>Start Monday to Friday. Try the picture, sound and programmes on your own screen. No card required.</p>
              <a href={trialHref} className={styles.trialAction}>
                <MessageCircle size={18} aria-hidden="true" />
                Request a trial on WhatsApp
              </a>
            </aside>
          </section>

          <section className={styles.pricing} id="plans" aria-labelledby="offer-plans">
            <h2 id="offer-plans">Choose your pass</h2>
            <p className={styles.billing}>All prices are in US dollars. Pay once. No automatic renewal.</p>
            <div className={styles.cards}>
              {OCEANIA_PLANS.map((plan) => (
                <article key={plan.id} className={`${styles.card} ${plan.id === "month" ? styles.month : ""}`}>
                  <h3>{plan.name}</h3>
                  <p className={styles.price}><span>USD</span> {plan.usd}</p>
                  <p className={styles.description}>{plan.description}</p>
                  <a
                    href={waMeLink(`I’m in ${country} and would like the ${plan.name.toLowerCase()} plan at USD ${plan.usd}. Device: __. Programme: __. Please confirm availability and the total before I pay.`)}
                    aria-label={`${plan.action} on WhatsApp`}
                  >
                    {plan.action}<ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </section>

          {(view === "guide" || view === "trial") && (
            <section className={styles.details} aria-labelledby="offer-check">
              <h2 id="offer-check">What to check during your trial</h2>
              <p>Open a programme you watch regularly on your usual TV and Wi-Fi. Check the picture, sound and language at the time you normally watch. If something is missing, give us the title on WhatsApp before choosing a pass.</p>
            </section>
          )}
          {children && <div className={styles.details}>{children}</div>}
        </main>
        <footer className={styles.footer}>
          <nav aria-label="Viewing guides and policies">
            <Link href={`/${market}/sa-abroad/${slug}`}>Viewing guide</Link>
            <Link href={`/${market}/free-trial`}>Free trial</Link>
            <Link href={`/${market}/legal/terms`}>Terms</Link>
            <Link href={`/${market}/legal/refund`}>Refund policy</Link>
            <Link href={`/${market}/legal/popia`}>Privacy</Link>
            <Link href="/en-za">South Africa</Link>
          </nav>
        </footer>
      </div>
      <PopiaConsentBanner />
    </LanguageProvider>
  );
}
