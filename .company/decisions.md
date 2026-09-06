# Décisions (additif, jamais réécrit)

## run-001 (2026-07-24)
- **D1.** Config non fournie par l'utilisateur (placeholders `<ex: …>`). Auto-déduite depuis le code (Loi #2) : DOMAINE=iptvmzansi.com, marché principal=ZA/en-za, CONVERSION=WhatsApp. Voir `assumptions.md`.
- **D2.** Périmètre borné pour ce run : backbone opérationnel manquant + correctif T1 sur la homepage seulement. Raison : la localisation native complète (5 langues × N pages) n'est ni finissable en un run, ni autorisée par traduction machine (Loi #9). Le reste → backlog scoré.
- **D3.** Localisation des métadonnées via un module dédié `lib/seo/home-meta.ts` plutôt que d'alourdir `dict.ts`/`types.ts` — moins de risque de régression sur la copie existante (Loi #4 paranoïa sur l'existant).
- **D4.** `qa-gates.mjs` vérifie l'unicité des titres au niveau des **routes canoniques distinctes** (en-za), pas entre alternates hreflang d'une même page — c'est la vraie exigence SEO. La duplication cross-locale sur pages non-home est un défaut lang-mismatch distinct, documenté et backloggé, pas masqué.
- **D5.** Pas de création de PR ce run (règle harness : PR seulement si demandé explicitement). Push sur la branche désignée + proposition à l'utilisateur.
- **D6.** GSC/Bing/IndexNow non soumis : aucun accès configuré. Signalé `BLOQUÉ : accès`, jamais « soumis » simulé (Loi #3).

## run-002 (2026-07-24) — MODE C sprint L10N-META-PILLARS
- **D7.** Localisation des métadonnées des 13 pages pillars via un module central `lib/seo/pillar-meta-i18n.ts` + getter `pillarMetaLocalized(slug, locale, fallback?)`, plutôt que 13 blocs codés en dur. Wire uniforme par codemod (les 12 pages `getPillar` partagent un pattern identique) ; `dstv-alternative` (hors set getPillar) câblée avec fallback anglais explicite.
- **D8.** Couverture native : af/fr/pt-mz = title+description complets (langues à haute confiance rédactionnelle) ; zu/xh = title+description natifs alignés sur le hero owner-approved de `dict.ts`, à faire relire par un locuteur natif (Loi #3 : signalé, pas présenté comme validé). en-* (diaspora+za+zw) = fallback anglais assumé (même langue → alternates hreflang légitimes).
- **D9.** Corps des pillars (contenu long) toujours anglais : hors périmètre de ce sprint (borné), reste backloggé `L10N-BODY-PILLARS`. Le gain métadonnées est réel et vérifiable dès maintenant sans toucher au corps qui ranke (Loi #4).

## run-003 (2026-09-04) — www SSL / canonical hygiene
- **D10.** Hôte canonique = apex `iptvmzansi.com`. `www` n'est pas un site parallèle : 308 path-preserving vers l'apex (`vercel.json` edge + `middleware.ts` app). Pas de 301/307 pour ce hop (308 demandé, cacheable, méthode préservée).
- **D11.** Les 12 locales live (`en-za en-gb en-au en-us af zu xh pt-mz en-zw fr en-ae en-nz`) restent la source de vérité hreflang. Ce run ne touche pas `LOCALES`, les pages programmatiques, ni les schémas FAQPage/HowTo/ContactPoint. Conversion WhatsApp only, numéro existant `447307410512`.
- **D12.** Le SAN mismatch www ne se corrige pas dans Git : il faut ajouter `www.iptvmzansi.com` au projet Vercel (doc `docs/WWW-DOMAIN.md`). PR ouverte, **non mergée** par l'agent.

## run-004 (2026-09-04) — www 308 before trailing-slash
- **D13.** `skipTrailingSlashRedirect: true` + middleware : 308 www→apex (path+query, y compris slash) **puis** slash-strip apex. `vercel.json` / `next.config.js` ajoutent `/:path+/`. Locales et WhatsApp inchangés.

## run-005 (2026-09-05) — 12 guides blog ZA
- **D14.** Nouveaux slugs seulement. Posts existants et pillars inchangés (Loi #4).
- **D15.** Type `BlogPost` étendu (faq/howTo/cta optionnels) pour ne pas casser les 17 posts. Template émet FAQPage/HowTo seulement si données présentes.
- **D16.** Conversion = WhatsApp only (`generateWhatsAppLink` + `InlinePricingBlock`). 0 mailto, 0 AggregateRating.
- **D17.** Chiffres (R99 / R1,199 / DStv R899 / 20,000+ / NAPAfrica) = déjà publiés sur le site. Aucun volume GSC / avis inventé.

## run-006 (2026-09-05) — DStv soft-sell on PR #14 blog guides
- **D18.** MID + END commercial DStv injectés via `DstvSoftSellCta` dans le template blog, uniquement si `BLOG_GUIDE_SLUGS` (12 guides PR #14). Les 17 posts live et les blocks TrustReversal / InlinePricing / hero+footer WA restent.
- **D19.** WhatsApp du bloc = `generateWhatsAppLink` + `SITE.whatsappPhone` (défaut `447307410512`). Texte visible END = `https://wa.me/${SITE.whatsappPhone}` · `SITE.domain`. 0 mailto, 0 AggregateRating.

## run-007 (2026-09-06) — diaspora rugby London FAQ
- **D20.** Nouveaux slugs `/blog/` seulement. `watch-springboks-live-online` et les 12 guides ZA inchangés (Loi #4) — related-link additif uniquement.
- **D21.** Conversion diaspora = `waMeLink` → `https://wa.me/447307410512`. DstvSoftSell reste limité à `BLOG_GUIDE_SLUGS`. 0 mailto, 0 AggregateRating.
- **D22.** Pages `sa-abroad/[country]` : FAQPage + CTA WA mid/end additifs ; hero « Start 24h free trial » et pricing conservés.
- **D23.** Chiffres / edges / paiements = déjà publiés (R199–R1,199, LON-1, Visa/PayPal/Wise, 20,000+). Offsets SAST↔GMT/BST = faits fuseau, pas un calendrier 2026 inventé.

## run-008 (2026-09-06) — Seo P1 6Q on Springboks London
- **D24.** `watch-springboks-from-london` `faq[]` remplacé par le pack P1 6Q verbatim. Même source pour accordion + FAQPage. Slug / H1 / sections / CTA WA inchangés.
- **D25.** Sibling légal `iptv-uk-categories-not-licences` : answer Q2 soft-alignée aux claims P1 Q6. Autres FAQ siblings inchangées.
- **D26.** Conversion inchangée : `wa.me/447307410512`. 0 mailto. 0 AggregateRating. Related labels humains.

## run-009 (2026-09-06) — Seo short slugs Springboks UK
- **D27.** Hub FAQ dédié `/[locale]/iptv-springboks-uk/` (canon en-za). Accordion + FAQPage = `SPRINGBOKS_LONDON_P1_FAQ`. Titre/H1 distincts du blog London. Related vers le blog.
- **D28.** 308 1 hop : `/en/iptv-springboks-uk`, `/en/watch-springboks-uk`, `/iptv-springboks-uk` (avant `/iptv-:city`), `/:locale/watch-springboks-uk`. Destinations sans slash. Sitemap = hub 200 seulement.
- **D29.** Conversion : `wa.me/447307410512`. 0 mailto. 0 AggregateRating. Labels humains. 0 stats inventées.

## run-010 (2026-09-06) — 308 aliases onto London blog
- **D30.** `/en/iptv-springboks-uk`, `/en/watch-springboks-uk`, `/:locale/iptv-springboks-uk`, bare `/iptv-springboks-uk` (avant `/iptv-:city`) → 308 1 hop `/en-za/blog/watch-springboks-from-london`. Hub 200 retiré. Sitemap = blog only. WA `447307410512`. 0 AR.

## run-011 (2026-09-06) — soften /en-gb/ homepage claims
- **D31.** Copie seule : override `enGB` dans `dict.ts`. `en-za` et les autres locales inchangés. Templates / schemas / LOCALES / WhatsApp helper inchangés.
- **D32.** FAQPage reste branchée sur `t.faq.items`. Answers soft-sell (rights/blackouts, trial first). 0 « every Springboks/URC/match ». 0 « 100x ». 0 « 1,200+ ». 0 AggregateRating. 0 mailto.
- **D33.** Conversion inchangée : `447307410512` / visible FAQ `+44 7307 410512`. CTAs trial / pricing / WhatsApp / sticky conservés.
- **D34.** `LanguageProvider` accepte `initialLocale` (homepage seulement). Sans ça le SSR de `/en-gb` rendait `en-za` (hard claims) alors que FAQPage était déjà soft.

## run-012 (2026-09-06) — FAQPage 6Q reinforce on Springboks London
- **D35.** Questions Seo P1 6Q verbatim (`SPRINGBOKS_LONDON_P1_QUESTIONS`). Answers = P1 soft-sell + merge des faits uniques de la FAQ live 8Q. Pas de 7e/8e Question. Slug / H1 / sections inchangés.
- **D36.** FAQPage renforcée sur ce slug seulement (`@id`, `url`, `inLanguage`, `@id` par Question, Article `hasPart`). DirectAnswer visible conservé ; son schema `Question` est coupé pour que FAQPage soit le seul graphe Q&A.
- **D37.** Conversion inchangée : `wa.me/447307410512` / `+44 7307 410512`. 0 mailto. 0 AggregateRating. 0 promesse every-feed. Siblings non clonés (A16).
