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
