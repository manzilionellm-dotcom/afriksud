# Owner setup and evidence required

This branch changes the existing Next.js site. It does not create a new domain. Do not label the verification gate, native translations, measurements or customer evidence as complete until the checks actually pass.

## Search Console and Bing

There is no `app/layout.tsx` in this repository. Root layouts are `app/[locale]/layout.tsx`, `app/(australia)/australia/layout.tsx` and `app/(clusters)/layout.tsx`. They share `lib/seo/verification.ts`, which renders verification meta tags in initial HTML for all locales.

1. In Google Search Console, add/select the **URL-prefix property `https://iptvmzansi.com/`**. Choose HTML tag verification. Copy only the `content` value, not the whole tag. Domain properties (`sc-domain:…`) require DNS verification; they cannot be verified using a meta tag.
2. In Bing Webmaster Tools, add/select the same site and copy its HTML meta verification `content` value.
3. In the hosting project (Vercel: **Project → Settings → Environment Variables**), paste the two values into `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION`. Select **Production**; add Preview only if wanted for testing. Rebuild/redeploy: these tokens are read during static generation. Confirm the public HTML contains `google-site-verification` and `msvalidate.01`, then complete verification in both consoles. Tokens are public ownership proofs, not API keys.
4. For Google API access, enable Search Console API in the owner's Google Cloud project. Obtain an OAuth refresh token for the verified owner with `https://www.googleapis.com/auth/webmasters.readonly`, using an OAuth client configured for that owner. A standalone Google API key cannot prove Search Console ownership. Keep the OAuth app in an appropriate production/internal state; short-lived testing-mode refresh tokens will eventually fail the gate.
5. In GitHub **afriksud → Settings → Secrets and variables → Actions → New repository secret**, paste each exact value under the names below. Never put credentials in a commit, issue, screenshot, public env variable or browser bundle.

| Name | Value | Where required |
| --- | --- | --- |
| `GOOGLE_SITE_VERIFICATION` | Google HTML-tag content | Hosting build env + Actions secret |
| `BING_SITE_VERIFICATION` | Bing HTML-tag content | Hosting build env + Actions secret |
| `GSC_OAUTH_CLIENT_ID` | Owner OAuth client ID | Actions secret only |
| `GSC_OAUTH_CLIENT_SECRET` | OAuth client secret | Actions secret only |
| `GSC_OAUTH_REFRESH_TOKEN` | Owner refresh token with readonly scope | Actions secret only |
| `BING_WEBMASTER_API_KEY` | Bing Webmaster Tools → Settings → API access key | Actions secret only |
| `GSC_SITE_URL` | `https://iptvmzansi.com/` | Already set in CI; local env if needed |

For local checks, use an ignored `.env.local` and an env loader, or export variables in your shell. `node scripts/gsc-check.mjs` reads process env; it does not silently read a committed credentials file. With Node 20.12+, `node --env-file=.env.local scripts/gsc-check.mjs` loads that file explicitly.

The gate computes `gsc_key_present` from actual OAuth configuration. The old `.company/state.json` flag is historical, not proof. Merely changing that file to `true` cannot pass. The gate requires Google's `siteOwner` permission and Bing's `IsVerified: true`, fails on missing configuration/API errors, and logs only booleans and sanitized failure messages. Configure branch protection to require **check**, **webmaster-verification** and **evidence-readiness** if these must block merges. Secrets are intentionally unavailable to fork PRs, so their verification check fails closed.

A first-time meta-verification bootstrap needs the meta-bearing build to be served before consoles can verify it. Alternatively verify the URL-prefix property by a supported DNS method first. Do not bypass the gate by inventing a key or setting the historical flag.

References: https://developers.google.com/webmaster-tools/v1/sites/get and https://learn.microsoft.com/en-us/dotnet/api/microsoft.bing.webmaster.api.interfaces.iwebmasterapi.getusersites?view=bing-webmaster-dotnet

## Bitrate and latency

`public/tech-specs.json` intentionally has null measurements. The old 25 Mbps recommendation describes the customer's connection, not an HLS rendition bitrate. Supply authorized manifest observations for SD, HD, Full HD and UHD/4K: peak/average Mbps, codec, resolution, frame rate, observation time and a non-secret evidence reference. Divide manifest BANDWIDTH values by 1,000,000. Redact signed stream URLs and credentials. Do not infer encoded bitrate from an internet speed test.

The Australia comparison distinguishes service availability from measured performance. All Perth/Sydney/Melbourne latency cells currently say **Not measured**. Actual tests need an authorized account, one documented device/player, local connection details, timestamp, repeated samples and a defined metric (startup time versus live-edge delay). Ping is not live video latency. No provider has been claimed as personally tested.

## Reviews, events and native language

Populate `lib/seo/evidence.json` only from authentic evidence. `VerifiedEvidence` renders visible text and matching server JSON-LD together. Empty arrays emit neither testimonials nor event claims. It does not invent ratings or aggregateRating.

Review record fields: `id`, `name`, `city`, `country` (`ZA`, `GB`, `AU`, `US`), `text`, ISO `date`, original public `source` URL, and `consent: true`. Require twelve distinct, consented records and verify the city against the source/owner record. Do not infer a customer's location or invent a Person. Avoid publishing private evidence; reference consent securely outside the repository.

Broadcast record fields: `id`, `name`, ISO `startDate` and `endDate` **with time zone**, at least two `competitors`, `broadcaster`, broadcaster viewing `url`, official fixture `source`, and `confirmed: true`. Confirm the actual broadcast and territory, not just the fixture. The renderer identifies the real broadcaster and does not claim Mzansi redistribution rights. Past fixtures are not upcoming events. Check Soweto Derby, Currie Cup Final and Proteas schedules before entering dates. Rebuild after fixture changes; expired broadcasts are omitted on the next render/build.

Existing owner-approved FAQ dictionary copy is now open in af/zu/en-GB/en-AU/en-US. It has not been certified as native-reviewed; some existing locale content inherits English. No new machine translation was substituted for the required native FAQ copy. Supply native revisions and record reviewer, revision and approval date in `nativeReview.af` and `.zu`. New cluster AF/ZU drafts also need this review. Repository `AGENTS.md` explicitly requires native-speaker review for Zulu before production exposure.

## Cluster publication

There are 240 draft route variants: the 15 Australia pages plus 25 hubs × 3 pages × 3 languages. New routes remain `noindex,follow` and outside the sitemap until `SEO_CLUSTERS_PUBLISHED=true` is set at build time. They serve the same visible content to people and crawlers. This is a publication switch, not user-agent cloaking. Review factual sources, unique usefulness, duplication with existing pages and native copy first; do not mass-publish similar pages merely because they exist.

Country hreflang follows the owner's selected country-specific policy: AU, GB, US, NZ, CA, AE and NL; topic hubs use ZA. An editorial Organization is used as author because the owner chose the team. No unrelated Wikidata entity, fabricated Person or unverified social `sameAs` is added. Supply actual identity/profile evidence if that changes.

The generated `internal-anchors.csv` lists links extracted from the rendered cluster pages and three existing entry pages. Re-run `node scripts/cluster-check.mjs http://localhost:3000` after changes.

## Performance evidence

The unused fake visitor counter and its PRNG have been removed. There is no mounted chat input in the production page; the two legacy chat components are unreferenced. Re-enabling them or adding a worker would not improve the current page. Channel tabs coalesce updates through requestAnimationFrame; below-fold sections use content-visibility:auto while retaining server HTML.

No INP under 200 ms claim has been established. Lighthouse navigation tests provide lab diagnostics such as Total Blocking Time; they do not supply a before/after field INP measurement. No Chrome/Lighthouse runner or production CrUX baseline was available in this workspace, so no screenshot is fabricated. For acceptance, collect real interaction traces (tabs, pricing, FAQ, trial sheet) on the same mobile device/network before and after, and compare p75 INP in CrUX/RUM after rollout. Keep lab screenshots labeled TBT, not INP. Reference: https://web.dev/articles/inp
