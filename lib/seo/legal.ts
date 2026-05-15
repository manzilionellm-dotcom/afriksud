// lib/seo/legal.ts
// Skeleton legal pages. Every field tagged `TO_FILL_BY_OWNER` must be
// populated by the owner / legal counsel before the site goes live —
// these are placeholders, not legal advice.

export type LegalTopic = {
  slug: string;
  title: string;
  metaDescription: string;
  /** One-paragraph intro shown above the body. */
  lead: string;
  /** Body sections with H2 + paragraphs. */
  sections: { h2: string; body: string[] }[];
  /** Whether to badge the page as `TO_FILL_BY_OWNER`. */
  needsOwnerInput: boolean;
};

export const LEGAL_TOPICS: LegalTopic[] = [
  {
    slug: "popia",
    title: "Privacy Policy (POPIA)",
    metaDescription: "Mzansi Stream POPIA-compliant privacy policy — data collected, retention, rights, complaints to the Information Regulator.",
    lead: "This policy explains how Mzansi Stream collects, uses and protects personal information under the Protection of Personal Information Act 4 of 2013 (POPIA). It applies to every visitor of iptvmzansi.com and every Mzansi Stream subscriber.",
    needsOwnerInput: true,
    sections: [
      {
        h2: "Who we are",
        body: [
          "Mzansi Stream is operated by [TO_FILL_BY_OWNER: Legal entity name], registered in South Africa under CIPC number [TO_FILL_BY_OWNER]. Our registered address is [TO_FILL_BY_OWNER]. Our Information Officer is [TO_FILL_BY_OWNER: Name + email].",
        ],
      },
      {
        h2: "What personal information we collect",
        body: [
          "When you contact us on WhatsApp we collect your phone number and the content of your messages. When you order a plan we collect your email, the name on the payment instrument, and the plan you purchased.",
          "We do not collect ID numbers, banking detail beyond the transaction reference, or biometric data.",
        ],
      },
      {
        h2: "Why we collect it",
        body: [
          "To activate and maintain your subscription, to send the M3U link and setup guide, to respond to support questions, to process payments, and to comply with applicable tax and accounting law.",
        ],
      },
      {
        h2: "How long we keep it",
        body: [
          "Payment records: 5 years (SARS retention rule). WhatsApp conversation: 12 months. Email correspondence: 24 months. After these periods data is permanently deleted from our systems.",
        ],
      },
      {
        h2: "Your rights under POPIA",
        body: [
          "You may access the information we hold on you, request correction or deletion, object to processing, and lodge a complaint with the Information Regulator (https://inforegulator.org.za).",
          "Requests should be sent to [TO_FILL_BY_OWNER: privacy@iptvmzansi.com] — we'll respond within 30 days as required by POPIA.",
        ],
      },
      {
        h2: "Cross-border data transfer",
        body: [
          "Some of our processors (payment gateway, email provider) may be located outside South Africa. We only use providers that offer POPIA-equivalent protection.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms & Conditions",
    metaDescription: "Mzansi Stream terms and conditions — what you get, how to cancel, refund policy and acceptable use.",
    lead: "By subscribing to Mzansi Stream you agree to these terms. They cover what the service includes, how to cancel, our refund policy, and acceptable use.",
    needsOwnerInput: true,
    sections: [
      {
        h2: "The service",
        body: [
          "Mzansi Stream is an internet-delivered TV streaming service. We supply an M3U playlist link, EPG access and WhatsApp-based setup support. Devices, internet connection and the player app of your choice are not part of the service.",
        ],
      },
      {
        h2: "Subscription and cancellation",
        body: [
          "Plans are pre-paid for the period selected (1, 3, 6 or 12 months). There is no auto-renewal and no contract.",
          "You may stop using the service at any time. The service ends at the end of the paid period; no notice is required.",
        ],
      },
      {
        h2: "Refunds",
        body: [
          "We offer a 7-day money-back guarantee on every plan if the service does not work for you. See the refund policy page for the full process.",
        ],
      },
      {
        h2: "Acceptable use",
        body: [
          "One paid connection per household account, unless you have purchased a multi-screen plan. Sharing your M3U link publicly will void your subscription without refund. We may revoke service for misuse without notice.",
        ],
      },
      {
        h2: "Governing law",
        body: [
          "These terms are governed by the laws of the Republic of South Africa. Disputes will be heard in the courts of [TO_FILL_BY_OWNER: jurisdiction].",
        ],
      },
    ],
  },
  {
    slug: "refund",
    title: "Refund Policy — 7-day money-back",
    metaDescription: "Mzansi Stream 7-day money-back refund policy — how to claim, processing time and exceptions.",
    lead: "We offer a 7-day money-back guarantee. If Mzansi Stream isn't working for you within the first 7 days, message us on WhatsApp and we'll refund you in full.",
    needsOwnerInput: false,
    sections: [
      {
        h2: "How to claim",
        body: [
          "Reply on your WhatsApp order thread, or message our support number from any device. Include your order reference and the reason. We don't ask for a long justification — if you say it's not working for you, we refund.",
        ],
      },
      {
        h2: "How long it takes",
        body: [
          "EFT and card refunds: 3-5 working days. SnapScan / Zapper / Ozow: usually within 2 working days. Crypto refunds are made in the same coin at the value received.",
        ],
      },
      {
        h2: "Exceptions",
        body: [
          "Refunds outside the 7-day window are at our discretion and are not guaranteed. Refunds are not offered where the M3U link has been shared with third parties.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    metaDescription: "How Mzansi Stream uses cookies — essential, analytics and marketing categories — and how to manage your preferences.",
    lead: "We use cookies to keep the site working and to understand how visitors use it. This policy explains what each cookie does and how to opt out.",
    needsOwnerInput: false,
    sections: [
      {
        h2: "Essential cookies",
        body: [
          "These are required for the site to function — for example, the `NEXT_LOCALE` cookie that remembers your language choice. Disabling these will break parts of the site.",
        ],
      },
      {
        h2: "Analytics cookies",
        body: [
          "If you accept analytics, we load Google Analytics 4 and PostHog. These help us understand which pages people use, which devices they're on, and where they get stuck. You can reject these without affecting site functionality.",
        ],
      },
      {
        h2: "Marketing cookies",
        body: [
          "If you accept marketing, we load Meta Pixel and TikTok Pixel so we can measure ad performance. You can reject these without affecting site functionality.",
        ],
      },
      {
        h2: "Managing your preferences",
        body: [
          "Use the cookie banner at the bottom of the page to accept, reject or customise your choices. You can change your mind at any time by clearing your browser cookies.",
        ],
      },
    ],
  },
  {
    slug: "about",
    title: "About Mzansi Stream",
    metaDescription: "About Mzansi Stream — the team, the mission and how we built South Africa's IPTV alternative to DStv.",
    lead: "Mzansi Stream is a South African team building a better TV experience than the one DStv has been charging too much for.",
    needsOwnerInput: true,
    sections: [
      {
        h2: "Why we built this",
        body: [
          "DStv Premium is R899/month. For most households that's groceries, school fees, or a fibre upgrade. We started Mzansi Stream because the technology to deliver the same channels in 4K already exists — at a fraction of the price.",
        ],
      },
      {
        h2: "The team",
        body: [
          "Founded by [TO_FILL_BY_OWNER: founder name + LinkedIn]. [TO_FILL_BY_OWNER: bio — 2-3 sentences].",
        ],
      },
      {
        h2: "Company information",
        body: [
          "Legal name: [TO_FILL_BY_OWNER]. CIPC registration: [TO_FILL_BY_OWNER]. VAT number: [TO_FILL_BY_OWNER]. Registered address: [TO_FILL_BY_OWNER].",
        ],
      },
      {
        h2: "How to reach us",
        body: [
          "WhatsApp: see the floating button on every page. Email: [TO_FILL_BY_OWNER: hello@iptvmzansi.com]. We reply 7 days a week between 08:00 and 23:00 SAST.",
        ],
      },
    ],
  },
];

export function getLegalTopic(slug: string): LegalTopic | undefined {
  return LEGAL_TOPICS.find((t) => t.slug === slug);
}

export const LEGAL_SLUGS = LEGAL_TOPICS.map((t) => t.slug);
