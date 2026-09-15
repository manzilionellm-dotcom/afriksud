"use client";

import { useLang } from "./LanguageProvider";
import { dict } from "../shared/dict";

/** Process proof — no invented star ratings. */
export function ReviewsSection() {
  const { lang } = useLang();
  const t = dict[lang];
  const process = [
    { title: "24h trial", text: "WhatsApp us. No card. Test on your device first." },
    { title: "Clear prices", text: "From R99/mo on the 12-month plan. Paid once per term." },
    { title: "HelloPeter", text: "We invite customers to leave a review after 30 days. We do not invent stars." },
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
