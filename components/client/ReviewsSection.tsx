"use client";

import { useLang } from "./LanguageProvider";
import { dict } from "../shared/dict";

/** Process proof — no invented star ratings. */
export function ReviewsSection() {
  const { lang } = useLang();
  const t = dict[lang];
  const process = [
    { title: "24h trial", text: "WhatsApp us. No card. Test on your device first." },
    { title: "Clear prices", text: "USD 15 for one month, or USD 65 prepaid for twelve months (USD 5.42 per month)." },
    { title: "HelloPeter", text: "Customers can share their experience after 30 days of use." },
  ];
  return (
    <section className="section">
      <div className="sectionHead">
        <h2>{t.reviews.title}</h2>
        <p>{t.reviews.sub}</p>
      </div>
      <div className="reviewsGrid">
        {process.map((r) => (
          <article key={r.title} className="reviewCard">
            <h3 className="reviewName">{r.title}</h3>
            <p className="reviewText">{r.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
