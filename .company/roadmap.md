# Roadmap — Mzansi Stream (iptvmzansi.com)

## Fait (run-001)
- Backbone opérationnel : `.company/` memory, `CLAUDE.md` (LOIS), `scripts/qa-gates.mjs`, `scripts/incremental-check.mjs`, hook `.claude/settings.json`.
- T1 (borné) : métadonnées homepage localisées natives sur 12 locales → 12 titres uniques, cohérence lang↔titre.

## Prochain run (MODE C — sprint ≤8 items, scoring backlog.json)
1. L10N-META-PILLARS (fr, pt-mz, af d'abord).
2. HREFLANG-DEDUP (rapide, propre).
3. CWV-LIGHTHOUSE (baseline réelle + smoke).
4. CI-COMPETITIVE (teardown SERP réel).

## Actifs liables (I13, 1/trimestre)
- Calculateur d'économie DStv vs IPTV (ZAR) — attire liens + mentions IA. À planifier.

## Trimestre
- Localisation native progressive des pages non-home (fr/pt-mz/af prioritaires).
- Branchement GSC + Bing Webmaster (déblocage humain requis).

## Fait (run-003) — GEO-AMPLIFY, piloté par l'observé
- 2 leads IA mesurés (ChatGPT + Copilot), dont 1 commande R199. Canal prouvé.
- `/sa-abroad/[country]` : DirectAnswerBlock + FAQPage visible + speakable (20 pays × 12 locales).
- 2 fuites de placeholder corrigées (CTA WhatsApp pré-remplis ; bloc Pricing diaspora).
- qa-gates GATE 1b : les placeholders owner ne peuvent plus atteindre la production silencieusement.

## Re-priorisation (D13)
L'argent observé vient des pages **anglaises diaspora**, pas des marchés af/fr/pt-mz
que la roadmap plaçait en tête. Ordre révisé :
1. GEO-SURFACE-ROLLOUT — étendre les surfaces d'extraction aux gabarits encore nus, diaspora d'abord.
2. CI-COMPETITIVE — jouer le panel de prompts « argent » diaspora, remplir share-of-model.md.
3. LEGAL-OWNER-DATA — BLOQUÉ OWNER, effort 1, pèse sur l'E-E-A-T que les moteurs IA pondèrent.
4. L10N-BODY-PILLARS — recule jusqu'à observation d'un lead non-anglophone.
