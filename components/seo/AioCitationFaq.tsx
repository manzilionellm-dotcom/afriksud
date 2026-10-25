// Server-rendered Citation Hooks for the en-ZA sales homepage.
// Questions are h3 + an immediate <p> (40–60 words). No accordion,
// no client gate, so the answers are in the no-JS HTML.

import { faqFor } from "../../lib/aio";

export function AioCitationFaq({ items = faqFor("en"), title = "Frequently asked questions" }: { items?: {q: string; a: string}[]; title?: string }) {
  const faq = items;
  return (
    <section id="faq" className="section" aria-labelledby="aio-faq-title">
      <div className="sectionHead">
        <h2 id="aio-faq-title">{title}</h2>
      </div>
      <div className="faq">
        {faq.map((item) => (
          <div className="faqItem" key={item.q}>
            <h3>{item.q}</h3>
            <p className="faqAnswer">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
