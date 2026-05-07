"use client";
// components/client/LocalizedSections.tsx
// All localized page sections (Hero, Trial, Trust, Offers, VOD, Compare, Reviews, SACities, QuickSetup, FAQ, Footer, TopBar)

import React, { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { dict } from "../shared/dict";
import { plans } from "../shared/plans";
import { SITE } from "../shared/site";
import { MzansiLogo } from "../shared/MzansiLogo";
import { generateWhatsAppLink } from "../shared/utils";

function useUA() {
  const [ua, setUA] = useState("");
  useEffect(() => { setUA(navigator.userAgent); }, []);
  return ua;
}

// ─── TOP BAR ────────────────────────────────────────────────────────
export function TopBar() {
  const { lang } = useLang();
  const t = dict[lang];
  return (
    <div className="topBar">
      <div className="topBarInner">
        <span><span className="greenDot" /> {t.top.status}</span>
        <span className="urgency">{t.top.urgency}</span>
      </div>
    </div>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────
export function Hero() {
  const { lang } = useLang();
  const t = dict[lang];
  const ua = useUA();
  return (
    <section className="hero">
      <div className="heroContent">
        <div className="heroLogo">
          <MzansiLogo size={52} showText={false} />
        </div>
        <p className="pill">{t.hero.pill}</p>
        <h1>
          {t.hero.titleA}<br />
          <span className="accent">{t.hero.titleB}</span>
        </h1>
        <p className="lead">{t.hero.lead}</p>
        <div className="actions">
          <a className="btnPrimary" href="#offers">{t.hero.ctaPrices}</a>
        </div>
        <a
          className="btnGhost"
          href={generateWhatsAppLink(t.whatsapp.generic, ua, "Hero-Generic")}
          target="_blank"
          rel="noreferrer"
        >
          {t.hero.ctaAdvisor} →
        </a>
        <div className="heroTrust">{t.hero.trust}</div>

        <div className="trustStrip" aria-label="Mzansi Stream trust signals">
          <span className="trustStripItem">
            <span className="gold">★ 4.9/5</span>&nbsp;·&nbsp;
            <strong>1,200+</strong> {t.trustStrip.customers}
          </span>
          <span className="trustStripDot" aria-hidden="true" />
          <span className="trustStripItem">⚡ <strong>{t.trustStrip.activated}</strong></span>
          <span className="trustStripDot" aria-hidden="true" />
          <span className="trustStripItem">🌍 <strong>50+ {t.trustStrip.countries}</strong></span>
          <span className="trustStripDot" aria-hidden="true" />
          <span className="trustStripItem">🛡️ <strong>{t.trustStrip.guarantee}</strong></span>
        </div>
      </div>
    </section>
  );
}

// ─── TRIAL BANNER ───────────────────────────────────────────────────
export function TrialBanner() {
  const { lang } = useLang();
  const t = dict[lang];
  const ua = useUA();
  return (
    <div className="trialBanner">
      <span className="trialBadge">{t.trial.badge}</span>
      <div className="trialContent">
        <h3>{t.trial.title}</h3>
        <p>{t.trial.sub}</p>
        <p className="trialNote">{t.trial.note}</p>
      </div>
      <a
        className="trialCta"
        href={generateWhatsAppLink(t.whatsapp.trial, ua, "Trial-Banner")}
        target="_blank"
        rel="noreferrer"
      >
        {t.trial.cta}
      </a>
    </div>
  );
}

// ─── TRUST SECTION ──────────────────────────────────────────────────
export function TrustSection() {
  const { lang } = useLang();
  const t = dict[lang];
  return (
    <section className="section trustSection">
      <div className="sectionHead"><h2>{t.trust.title}</h2></div>
      <div className="trustGrid">
        {t.trust.items.map(item => (
          <div key={item.title} className="trustCard">
            <span className="trustIcon">{item.icon}</span>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── OFFERS / PRICING ───────────────────────────────────────────────
export function Offers() {
  const { lang } = useLang();
  const t = dict[lang];
  const ua = useUA();
  return (
    <section id="offers" className="section">
      <div className="sectionHead">
        <h2>{t.offers.title}</h2>
        <p>{t.offers.sub}</p>
      </div>
      <div className="grid">
        {plans.map(p => {
          const pricePerMonth = Math.round(p.price / p.months);
          const saving = Math.round((1 - pricePerMonth / 199) * 100);
          return (
            <article key={p.key} className={`card ${p.highlight ? "highlight" : ""}`}>
              {saving > 0 && (
                <div className="saveBadge">{t.offers.save} {saving}%</div>
              )}
              <div className="cardHeader">
                <h3>{t.planNames[p.key]}</h3>
                {p.highlight && (
                  <span className="bestSellerBadge">{t.offers.bestSeller}</span>
                )}
              </div>
              <div className="priceLockup">
                <span className="currency">{SITE.currencyLabel}</span>
                <span className="bigNumber">{pricePerMonth}</span>
                <span className="perMonth">{t.offers.perMonth}</span>
              </div>
              <div className="billedInfo">
                {t.offers.billedOnce} {SITE.currencyLabel}{p.price}
                {p.months > 1 && ` (${t.offers.totalLabel})`}
              </div>
              <ul className="perks">
                {t.planPerks[p.key].map(perk => (
                  <li key={perk}><span className="check">✓</span> {perk}</li>
                ))}
              </ul>
              <a
                className="btnPlan"
                href={generateWhatsAppLink(
                  t.whatsapp.orderMessage(t.planNames[p.key], p.price, SITE.currencyLabel),
                  ua,
                  `Plan-${p.key}`
                )}
                target="_blank"
                rel="noreferrer"
              >
                {t.offers.order}
              </a>
            </article>
          );
        })}
      </div>

      <div className="paymentBadges" aria-label="Accepted payment methods">
        <div className="paymentLabel">{t.payments.label}</div>
        <div className="paymentList">
          <span className="payBadge">🏦 EFT</span>
          <span className="payBadge">📱 SnapScan</span>
          <span className="payBadge">⚡ Zapper</span>
          <span className="payBadge">💳 Yoco</span>
          <span className="payBadge">🔄 Ozow</span>
          <span className="payBadge">🟢 Capitec Pay</span>
          <span className="payBadge">💳 Visa</span>
          <span className="payBadge">💳 Mastercard</span>
          <span className="payBadge">💰 PayPal</span>
          <span className="payBadge">₿ Bitcoin</span>
        </div>
      </div>
    </section>
  );
}

// ─── VOD STATS ──────────────────────────────────────────────────────
export function VODSection() {
  const { lang } = useLang();
  const t = dict[lang];
  return (
    <section className="section vodSection">
      <div className="sectionHead">
        <h2>{t.vod.title}</h2>
        <p>{t.vod.sub}</p>
      </div>
      <div className="statsGrid">
        {t.vod.stats.map(s => (
          <div key={s.label} className="statCard">
            <div className="statValue">{s.value}</div>
            <div className="statLabel">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── COMPARE TABLE ──────────────────────────────────────────────────
export function CompareSection() {
  const { lang } = useLang();
  const t = dict[lang];
  return (
    <section className="section">
      <div className="sectionHead">
        <h2>{t.compare.title}</h2>
        <p>{t.compare.sub}</p>
      </div>
      <div className="compareWrap">
        <table className="compareTable">
          <thead>
            <tr>{t.compare.headers.map(h => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {t.compare.rows.map(row => (
              <tr key={row.service} className={row.highlight ? "highlightRow" : ""}>
                <td className="serviceName">
                  {row.highlight && <span className="bestTag">✓ </span>}
                  {row.service}
                </td>
                <td className={row.highlight ? "accentPrice" : ""}>{row.price}</td>
                <td>{row.live}</td>
                <td style={{ color: row.vod ? "#22c55e" : "#ef4444" }}>{row.vod ? "✓" : "✗"}</td>
                <td style={{ color: row.hd4k ? "#22c55e" : "#ef4444" }}>{row.hd4k ? "✓" : "✗"}</td>
                <td>{row.support}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── REVIEWS ────────────────────────────────────────────────────────
export function ReviewsSection() {
  const { lang } = useLang();
  const t = dict[lang];
  return (
    <section className="section">
      <div className="sectionHead">
        <h2>{t.reviews.title}</h2>
        <p>{t.reviews.sub}</p>
      </div>
      <div className="reviewsGrid">
        {t.reviews.items.map((r, i) => (
          <article key={i} className="reviewCard">
            <div className="reviewStars">{"⭐".repeat(r.stars)}</div>
            <p className="reviewText">&ldquo;{r.text}&rdquo;</p>
            <div className="reviewMeta">
              <span className="reviewName">{r.name}</span>
              <span className="reviewCity">— {r.city}</span>
              <span className="reviewPlan">{r.plan}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── DEVICE SECTION ─────────────────────────────────────────────────
export function DeviceSection() {
  const { lang } = useLang();
  const t = dict[lang];
  const ua = useUA();
  return (
    <section id="devices" className="section">
      <div className="sectionHead">
        <h2>{t.devices.title}</h2>
        <p>{t.devices.sub}</p>
      </div>
      <div className="deviceGrid">
        {t.devices.list.map(d => (
          <div key={d.name} className="deviceCard">
            <span className="deviceIcon">{d.icon}</span>
            <span className="deviceName">{d.name}</span>
          </div>
        ))}
      </div>
      <div className="stepsCtaWrap" style={{ marginTop: 28 }}>
        <a
          className="btnSecondary"
          href={generateWhatsAppLink(t.whatsapp.generic, ua, "Device-Section")}
          target="_blank"
          rel="noreferrer"
        >
          {t.setup.button}
        </a>
      </div>
    </section>
  );
}

// ─── SA CITIES ──────────────────────────────────────────────────────
export function SACities() {
  const { lang } = useLang();
  const t = dict[lang];
  const ua = useUA();
  return (
    <section id="cities" className="section">
      <div className="sectionHead">
        <h2>{t.cities.title}</h2>
        <p>{t.cities.sub}</p>
      </div>
      <div className="grid">
        {t.cities.items.map(city => (
          <article key={city.name} className="card">
            <div className="cardHeader"><h3>{city.name}</h3></div>
            <p className="cityText">{city.text}</p>
            <a
              className="btnPlan"
              href={generateWhatsAppLink(`Hi! I want Mzansi Stream in ${city.name}.`, ua, `City-${city.name}`)}
              target="_blank"
              rel="noreferrer"
            >
              {t.cities.button} — {city.name}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── QUICK SETUP ────────────────────────────────────────────────────
export function QuickSetup() {
  const { lang } = useLang();
  const t = dict[lang];
  const ua = useUA();
  return (
    <section id="setup" className="section">
      <div className="sectionHead">
        <h2>{t.setup.title}</h2>
        <p>{t.setup.sub}</p>
      </div>
      <div className="stepsGrid">
        {t.setup.steps.map(item => (
          <div key={item.step} className="stepCard">
            <div className="stepNumber">{item.step}</div>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <div className="stepsCtaWrap">
        <a
          className="btnPrimary"
          href={generateWhatsAppLink(t.whatsapp.generic, ua, "Setup-CTA")}
          target="_blank"
          rel="noreferrer"
        >
          {t.setup.button}
        </a>
      </div>
    </section>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────
export function FaqSection() {
  const { lang } = useLang();
  const t = dict[lang];
  return (
    <section id="faq" className="section">
      <div className="sectionHead"><h2>{t.faq.title}</h2></div>
      <div className="faq">
        {t.faq.items.map((f, i) => (
          <details key={i} className="faqItem">
            <summary className="faqSummary">{f.q}</summary>
            <p className="faqAnswer">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────
export function FooterSection() {
  const { lang } = useLang();
  const t = dict[lang];
  return (
    <footer className="footer">
      <div className="footerLogo"><MzansiLogo size={32} showText={true} /></div>
      <p>© {new Date().getFullYear()} {SITE.brand}. {t.footer.rights}</p>
      <p style={{ marginTop: 6 }}>{t.footer.note}</p>
      <div className="footerLinks">
        <a href="#faq">{t.footer.legal}</a>
        <a href="#faq">{t.footer.privacy}</a>
        <a href="#faq">{t.footer.terms}</a>
        <a href="#faq">{t.footer.refund}</a>
      </div>
    </footer>
  );
}
