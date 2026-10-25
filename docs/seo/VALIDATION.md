# Diff summary and validation — 2026-10-25

Base: `4f8b7bdb46ac262cbe8915dea44d3cc439f188f7`. These are local checks against the final candidate, not a claim that production has been deployed or external webmaster ownership has been verified.

## Requested repairs

| Request | Change / status |
| --- | --- |
| Google + Bing | Shared root-layout verification metadata, env examples, owner setup and a fail-closed OAuth/Bing CI job. **Blocked externally:** all credentials/tokens missing; `gsc_key_present=false`. |
| Price consistency | R199 one-month entry copy; totals preserved at R199/R449/R699/R1199. Annual equivalent clarified as R99.92 prepaid. Config and todo updated. |
| HLS ladder | `/tech-specs.json`, visible 4K table and llms link. **Measurement pending:** null values; 25 Mbps connection advice is not falsely relabeled as bitrate. |
| Open multilingual FAQ | Server-rendered citation hooks on af/zu/en-GB/en-AU/en-US using existing dictionary copy; exactly one FAQPage per home URL. **Native translation/review pending**, no claim of human translation. |
| BroadcastEvent | Visible, server-rendered broadcast/SportsEvent component with dates, live flag, broadcaster and competitors. **No records emitted:** upcoming schedules and broadcast confirmation missing. |
| Twelve reviews | Visible review + Person/city schema renderer. **No records emitted:** twelve genuine consented sources were not supplied. No fake stars/ratings. |
| INP | Removed unused fabricated visitor counter/PRNG, rAF-coalesced channel tabs, below-fold content-visibility. No mounted chat input exists, so no artificial input delay or new overlay was introduced. **No verified INP <200 ms or before/after screenshot.** |
| Hreflang | Self-canonical reciprocal English circles for abroad/community pages; full built-HTML parser and negative tests. |
| Sales wording purge | Removed forbidden terms from visible bodies; retained old URLs; TiviMate survives only in FAQ text. No mailto links in rendered audit. |
| llms | No noindexed legal targets, corrected Mozambique target, WhatsApp privacy contact, technical evidence link. |
| run-005 blog guides | All twelve were already reconstructed in `blog-guides.ts` and included in BLOG_POSTS. Verified all 48 ZA/GB/AU/US rendered routes; no duplicate slugs created. |
| SSR schema | Initial HTML audited, matching FAQ answers; new review/events tied to visible content. Removed obsolete HowTo output from pillar/blog templates. |

## Automated results

| Gate | Result |
| --- | --- |
| TypeScript (`tsc --noEmit`) | PASS |
| ESLint (`next lint`) | PASS — no warnings/errors; fixed pnpm plugin resolution |
| Production build (`next build`) | PASS — 1,943 generation entries including metadata/routes |
| Verification + hreflang unit tests | PASS — 8 tests, including missing secrets, owner permissions, Bing unverified, secret redaction and broken return tags |
| All built HTML hreflang | PASS — 1,671 HTML files, zero errors |
| Sales copy, FAQ/schema, llms and technical links | PASS — 1,671 HTML files, zero problems |
| Request-rendered cluster audit | PASS — 240/240 HTTP 200 pages; correct language/canonical, reciprocal alternates and internal links |
| Satellite editorial lengths | PASS — 162 localized satellite articles, 301–403 words |
| Webmaster API ownership | **FAIL / expected blocker** — no credentials or meta tokens supplied |
| Evidence readiness | **FAIL / expected blocker** — missing genuine reviews, confirmed future broadcasts, native approval and measured bitrate data |
| Production Lighthouse/INP screenshot | **NOT RUN / unavailable** — no browser runner or baseline; no image fabricated |

The same commands are wired into `.github/workflows/ci.yml`. Read [OWNER-SETUP.md](OWNER-SETUP.md) for exact secret locations, evidence contracts and performance measurement steps. Machine-readable local results are in [validation-results.json](validation-results.json).

## Earlier cluster scope included

Australia: one pillar and four city satellites, in EN/AF/ZU. Additional families: six countries, five channels, five sports, five devices and four troubleshooting topics; each has a pillar and two question-specific satellites in three languages. Total: 240 route variants. Country hreflang uses the region selected by the owner; topic pages use ZA.

New clusters remain noindex and outside the sitemap until native/editorial approval. Setting the publication env flag without native approvals fails the build. Editorial Organization author retained as requested; no fictitious Person, Wikidata identity or social profile was added. Latency table explicitly says unmeasured.

New links are bidirectional with the matching-language homepage, devices and SA-abroad hubs. Full extracted anchor list: [internal-anchors.csv](internal-anchors.csv); compact mapping: [INTERNAL-LINKS.md](INTERNAL-LINKS.md).

## Material limits

This branch is a reviewable implementation, not a completed evidence collection exercise. Its intentionally failing external/evidence gates must not be changed to green by inserting fabricated data. The newly drafted translated content and broad cluster set need editorial review for native wording, distinct usefulness and overlap with existing pages before indexing. Existing legal/company identity placeholders and missing hero video are documented in aio.todo.md.

Lighthouse navigation scores/TBT are not field INP. A valid before/after comparison needs actual interactions and consistent conditions, followed by real-user p75 INP after rollout. Removing dormant code does not establish a measured performance gain.
