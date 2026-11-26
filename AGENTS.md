# AGENTS.md

Notes for AI coding agents (Claude Code, Cursor, GitHub Copilot Workspace)
working on this repository.

## What this is

`afriksud` is the Next.js 15 codebase behind https://iptvmzansi.com — a
South African IPTV streaming service ("Mzansi Stream"). The site
targets SA and the SADC region across 12 priority locales.

## Project structure

- `app/` — Next.js App Router. Per-locale routes live under
  `app/[locale]/`. The bare `/` route 308-redirects to `/{DEFAULT_LOCALE}/`.
- `app/[locale]/page.tsx` — homepage per locale, server-renders all
  JSON-LD schemas (Product, FAQPage, Organization, WebSite,
  OnlineBusiness, BreadcrumbList).
- `app/[locale]/dstv-alternative/` — pillar SEO page (single hand-written page).
- `app/[locale]/sadc/[country]/` — 8 SADC country pages, data-driven from
  `lib/seo/sadc-countries.ts`.
- `app/[locale]/cities/[city]/` — 12 SA cities, data-driven from
  `lib/seo/cities.ts`.
- `app/[locale]/vs/[competitor]/` — 8 competitor comparison pages,
  data-driven from `lib/seo/competitors.ts`.
- `app/[locale]/blog/[slug]/` — 10 pillar blog posts, data-driven from
  `lib/seo/blog-posts.ts`.
- `app/[locale]/legal/[topic]/` — POPIA, terms, refund, cookies, about.
- `app/[locale]/language/[slug]/` — 4 SA-language landing pages
  (Afrikaans, isiZulu, isiXhosa, Portuguese-Mozambique).
- `lib/locales.ts` — single source of truth for the 12 locales
  (hreflang, dir, native names, country code, per-locale WhatsApp env keys).
- `lib/url.ts` — `localeUrl()` and `hreflangFor()` for canonical / alt-lang URLs.
- `lib/seo/*.ts` — content data files. Edit these to update
  programmatic page content; never hand-edit the page templates unless
  the structure changes.
- `components/client/` — interactive islands. `LongformShell` wraps every
  programmatic page with the header / footer / FAB / sticky CTA / consent
  banner.

## Conventions

- **Never** add fake reviews, fabricated `aggregateRating`, fake "active
  users" counters, or fake countdown banners. The project has explicit
  POPIA + Omnibus compliance requirements and prior PRs cleaned out
  invented social proof. Real testimonials only land via HelloPeter /
  Trustpilot integrations with consent.
- **TO_FILL_BY_OWNER**: search for this string before shipping. Used for
  placeholders the human owner must fill in (WhatsApp number,
  Information Officer, CIPC reg #, founder bio, payment IDs, analytics IDs).
- **WhatsApp numbers** come from `NEXT_PUBLIC_WHATSAPP_*` env vars —
  never hardcode. See `.env.example` for the full list.
- **Locale routing**: when adding a new page, always emit
  `generateStaticParams` for every locale in `LOCALES`, set
  `alternates.canonical` to `localeUrl(locale, path)`, and
  `alternates.languages` to `hreflangFor(path)`.
- **Type-check, lint, build** before shipping: `pnpm type-check && pnpm
  lint && pnpm build`. The build produces 600+ static pages — watch for
  generateStaticParams misconfigurations.

## Out-of-scope reminders

- Per-locale translation of every programmatic page is **content work**,
  not a routing concern. The English copy ships as the fallback for
  non-localised locales; native copy lands when the owner provides it.
- Native-speaker review is required for zu/xh/pt-mz copy before
  production exposure. The current strings are owner-approved from the
  SEO playbook but have not been independently verified.
- Mobile UX has been pared down to: WhatsApp FAB + sticky bottom CTA +
  POPIA consent banner. Do **not** re-introduce the old
  LeratoChat/LiveActivity/PWABar overlays without explicit owner sign-off.

## Useful commands

```sh
pnpm install
pnpm dev           # http://localhost:3000
pnpm type-check
pnpm lint
pnpm build         # generates 600+ static pages
```
