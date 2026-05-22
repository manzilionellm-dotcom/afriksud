// components/seo/DirectAnswerBlock.tsx
// Server-rendered direct-answer block. Optimised for AI Overviews,
// Gemini, Perplexity, ChatGPT Search and voice retrieval — gives those
// crawlers an extraction-ready Q/A pair at the top of the page that
// stands alone if quoted out of context.
//
// Schema: emits a tightly-scoped Question + Answer pair so the block is
// individually addressable by Google's `passage indexing`, and adds a
// SpeakableSpecification to mark the answer for voice surfaces.

import { JsonLd } from "../../lib/seo/jsonld";

type Props = {
  question: string;
  answer: string;
  /** Optional secondary key facts rendered as a short bulleted list
   *  under the answer. Each bullet should be a complete sentence so an
   *  AI engine can quote one line in isolation. */
  keyFacts?: string[];
};

export function DirectAnswerBlock({ question, answer, keyFacts }: Props) {
  const qaSchema = {
    "@context": "https://schema.org",
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".direct-answer"],
    },
  };

  return (
    <section
      className="longformSection direct-answer"
      aria-labelledby="direct-answer-q"
      style={{
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 14,
        padding: "18px 18px 14px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))",
      }}
    >
      <JsonLd data={qaSchema} />
      <p
        style={{
          fontSize: 12,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          opacity: 0.6,
          margin: 0,
        }}
      >
        Quick answer
      </p>
      <h2 id="direct-answer-q" style={{ marginTop: 6, fontSize: "1.2rem" }}>
        {question}
      </h2>
      <p style={{ marginTop: 8, fontSize: "1rem", lineHeight: 1.55 }}>
        {answer}
      </p>
      {keyFacts && keyFacts.length > 0 ? (
        <ul
          className="longformList"
          style={{ marginTop: 10, marginBottom: 0 }}
        >
          {keyFacts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
