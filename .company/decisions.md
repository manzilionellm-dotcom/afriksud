# Décisions (additif, jamais réécrit)

## run-001 (2026-07-24)
- **D1.** Config non fournie par l'utilisateur (placeholders `<ex: …>`). Auto-déduite depuis le code (Loi #2) : DOMAINE=iptvmzansi.com, marché principal=ZA/en-za, CONVERSION=WhatsApp. Voir `assumptions.md`.
- **D2.** Périmètre borné pour ce run : backbone opérationnel manquant + correctif T1 sur la homepage seulement. Raison : la localisation native complète (5 langues × N pages) n'est ni finissable en un run, ni autorisée par traduction machine (Loi #9). Le reste → backlog scoré.
- **D3.** Localisation des métadonnées via un module dédié `lib/seo/home-meta.ts` plutôt que d'alourdir `dict.ts`/`types.ts` — moins de risque de régression sur la copie existante (Loi #4 paranoïa sur l'existant).
- **D4.** `qa-gates.mjs` vérifie l'unicité des titres au niveau des **routes canoniques distinctes** (en-za), pas entre alternates hreflang d'une même page — c'est la vraie exigence SEO. La duplication cross-locale sur pages non-home est un défaut lang-mismatch distinct, documenté et backloggé, pas masqué.
- **D5.** Pas de création de PR ce run (règle harness : PR seulement si demandé explicitement). Push sur la branche désignée + proposition à l'utilisateur.
- **D6.** GSC/Bing/IndexNow non soumis : aucun accès configuré. Signalé `BLOQUÉ : accès`, jamais « soumis » simulé (Loi #3).
