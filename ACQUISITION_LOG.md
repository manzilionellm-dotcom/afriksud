# Acquisition Log

Living record of every revenue-impacting change to iptvmzansi.com.
Future agent passes MUST read this file before acting.

---

## Pass 003 — 2026-05-19 — Funnel telemetry + AI-Overview extraction + /vs link hub

### Pre-pass baseline (verified)

- **Static pages**: 1437 (12 locales × 24 longform routes + programmatic).
- **Pricing surfaces**: home `PricingCarousel`, `InlinePricingBlock` on
  every pillar + blog post via PillarTemplate / blog/[slug] page
  (shipped pass 002 by parallel branch + this branch).
- **Schema in place**: Organization, WebSite, Product (home), Article,
  FAQPage, HowTo (where steps exist), BreadcrumbList, SpeakableSpecification
  (cookies page only).
- **WhatsApp contact**: `+44 7307 410512` already configured as default
  in `components/shared/site.ts:4` and `lib/locales.ts:272`. **No conflict
  with brief.**
- **Analytics status**: **ZERO** — cookies legal page promises GA4 + PostHog
  but no SDK was installed. Every CTA click was invisible. Highest-value
  gap this pass.
- **AI-search readiness**: pillars carry `lead` paragraphs but no
  extraction-ready Q/A block above the TOC. AI Overviews / Gemini /
  Perplexity have no anchor passage to quote.
- **Internal link wiring on /vs/**: `InternalLinkHub` shipped to pillars
  and blog posts via pass 002 but never extended to /vs/[competitor]/ —
  the highest-purchase-intent page type was the only template without it.

### Hypotheses

| # | Hypothesis | Validation method | Expected lift |
|---|------------|-------------------|---------------|
| H1 | Tracking WhatsApp clicks with attribution will reveal which page types convert. | GA4/PostHog event volume by `placement` after 14 days of traffic. | N/A (visibility, not lift) |
| H2 | UTM/landing/referrer suffix in WhatsApp message lets support attribute leads in CRM. | Manual review of WhatsApp inbox after 14 days. | Directly attributable leads → revenue |
| H3 | `DirectAnswerBlock` at top of every pillar increases AI-Overview citation rate. | GSC "AI Overviews" / "Discover" panel + Perplexity citation audit at 30 days. | +AI referral traffic |
| H4 | `InternalLinkHub` on /vs/ pages routes 8 high-intent comparison pages' link equity to the buyer-intent pillars. | GSC clicks to `/cheap-iptv-south-africa/`, `/4k-iptv-south-africa/`, etc. at 30 days. | +impressions and clicks to new pillars |

### Implementation

**System 1 — POPIA-gated funnel tracking**

New files:
- `lib/analytics/track.ts` — sink registry, event queue, attribution capture, `attributionSummary()` helper.
- `lib/analytics/AnalyticsProvider.tsx` — mounted at root layout. Loads GA4 + PostHog (only if env keys present, only after consent). Document-level click delegate on `wa.me` and `api.whatsapp.com/send` links rewrites the WhatsApp message to append the lead-source line before navigation and fires `whatsapp_click` event.

Wiring:
- `app/layout.tsx` — mounts `<AnalyticsProvider />` in `<body>` (above children).
- `components/ux/PricingCarousel.tsx` — fires `pricing_view` (IntersectionObserver, threshold 0.3) and `plan_card_click` (with plan_key, months, price).
- `components/seo/PillarTemplate.tsx` — adds `data-track-ref` / `data-track-placement` on hero and footer primary CTAs.
- `components/seo/InlinePricingBlock.tsx` — adds `data-track-*` on every plan WhatsApp order button.
- `components/client/StickyBottomCta.tsx` — adds `data-track-*` on both buttons.
- `components/client/WhatsAppFab.tsx` — adds `data-track-*`.
- `app/[locale]/vs/[competitor]/page.tsx` — adds `data-track-*` on hero CTAs.

Tracking events emitted automatically:
- `page_view` (on every mount)
- `whatsapp_click` (every wa.me / api.whatsapp.com click, via delegate)
- `pricing_view` (when #offers enters viewport, fires once per session)
- `plan_card_click` (when a plan card opens the details sheet)
- `consent_grant` / `consent_reject` (POPIA banner choice)

Network behaviour:
- **No third-party script loads until consent is granted.** Initial server
  render emits nothing third-party; on consent, GA4 + PostHog inline scripts
  initialise via `next/script` `afterInteractive`. Both gated on env vars
  so dev/staging is a true no-op.

Lead-source attribution suffix appended to WhatsApp message:
```
... | Source: google | utm: google/cpc/launch-q2 | landing: /en-za/cheap-iptv-south-africa/
```
- `Source` falls back to referrer host or `direct`.
- The suffix appears in the support agent's WhatsApp client and pastes
  cleanly into a CRM record.

**System 2 — AI-Overview / LLM extraction surface**

New file:
- `components/seo/DirectAnswerBlock.tsx` — Q/A schema with
  `SpeakableSpecification`, rendered visually as a "Quick answer" card.

Wiring:
- `components/seo/PillarTemplate.tsx` — DirectAnswerBlock inserted between
  hero and TOC on every pillar (12 routes, 7 indexable locales = 84
  surfaces). Uses pillar.h1 as question, pillar.lead as answer.
- `app/[locale]/vs/[competitor]/page.tsx` — DirectAnswerBlock inserted
  between hero and comparison table with a bespoke "Is X a real
  alternative to {competitor}?" Q/A pair (8 routes × 7 locales = 56
  surfaces).

**System 3 — Internal link hub on /vs/ pages**

- `app/[locale]/vs/[competitor]/page.tsx` — `InternalLinkHub` inserted
  before the closing CTA section, with the current competitor slug
  excluded so the user never lands back on the page they're on.

### Files modified (this pass)

- `app/layout.tsx`
- `app/[locale]/vs/[competitor]/page.tsx`
- `components/client/StickyBottomCta.tsx`
- `components/client/WhatsAppFab.tsx`
- `components/seo/InlinePricingBlock.tsx`
- `components/seo/PillarTemplate.tsx`
- `components/ux/PricingCarousel.tsx`
- `.env.example`

### Files created (this pass)

- `lib/analytics/track.ts`
- `lib/analytics/AnalyticsProvider.tsx`
- `components/seo/DirectAnswerBlock.tsx`
- `ACQUISITION_LOG.md`

### Validation

- `pnpm type-check` — passes.
- `pnpm build` — 1449 static pages, no errors, no warnings.
- Manual schema sanity — DirectAnswerBlock JSON-LD is syntactically
  valid via the rendered `Question` + `Answer` shape.
- No new dependencies added.

### Rollback

- Single git commit on `claude/iptv-conversion-seo-overhaul-oNnfC`. Revert
  with `git revert <hash>`. Analytics provider is gated on consent + env,
  so leaving it in place but unsetting env vars also disables it entirely.

### Unresolved / manual follow-ups

1. **Provision GA4 + PostHog accounts.** Set `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   and `NEXT_PUBLIC_POSTHOG_KEY` in Vercel project env. Until then, the
   tracker is a no-op (events queue + drop).
2. **CRM hook.** WhatsApp messages now carry attribution; next pass should
   add a webhook to push WhatsApp Cloud API messages into a CRM (HubSpot /
   Pipedrive / Salesforce) so attribution is structured instead of
   message-body text.
3. **Server-side conversion event.** A `purchase` event needs to fire when
   the support team marks an order paid. Requires backend hook to GA4
   Measurement Protocol + PostHog server SDK. Not in this pass.
4. **HelloPeter / Trustpilot integration.** Legal page mentions review
   collection; no widget shipped. Real reviews would unlock
   `aggregateRating` JSON-LD on Product schema — explicitly noindexed in
   `app/[locale]/page.tsx:118` until verified data exists.
5. **A/B testing harness.** PostHog feature flags would let us run hero
   copy experiments. Not in this pass.

### Next recommended pass

Once analytics has 14+ days of data:
- Identify the top 3 placements by `whatsapp_click` volume.
- Identify the lowest-converting pricing surfaces (high `pricing_view`,
  low `plan_card_click`).
- Test variant copy / pricing position via PostHog flags.
- Wire the WhatsApp Cloud API webhook → CRM bridge.
