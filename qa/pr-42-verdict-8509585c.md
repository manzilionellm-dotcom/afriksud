# FAIL

QA white-hat de la PR brouillon [#42](https://github.com/manzilionellm-dotcom/afriksud/pull/42) (`fix/noindex-legal-placeholders` → `main`), head `8509585c80aa6d01403dfa646dd3151d8319fda8`. Diff mesuré : **+162 / −138, 18 fichiers**. Dépôt **public** (`gh repo view --json visibility` → `PUBLIC`).

Le mécanisme noindex des trois pages légales est en place sur les URLs préfixées locale. Le verdict est FAIL à cause de trois écarts au cahier de contrôle, dont deux déjà vrais sur `main` et un laissé par le diff lui-même (`llms.txt`).

Chaque constat est étiqueté **FAIT** (observé), **INFÉRENCE** (déduit d'une observation) ou **HYPOTHÈSE**.

## Gates

| Cible | SHA | install `--frozen-lockfile` | `pnpm lint` | `tsc --noEmit` | `validate:content` | `pnpm build` |
| --- | --- | --- | --- | --- | --- | --- |
| Head | `8509585` | exit 0 | exit 0 | exit 0 | absent | exit 0 |
| Merge-base `origin/main` | `ba0521b` | exit 0 | exit 0 | exit 0 | absent | exit 0 |

- **FAIT.** `package.json` n'a pas de script `validate:content`. Non exécuté. Scripts présents : `dev`, `build`, `start`, `lint`, `type-check`, `aio:llms`, `aio:check`.
- **FAIT.** Les deux builds Next 15.3.8 affichent `Generating static pages (1679/1679)` puis exit 0. Le lint des deux est « No ESLint warnings or errors ».
- **FAIT.** Rien de rouge n'est préexistant sur le merge-base : `main` est déjà vert sur ces gates. Le head ne casse pas ce vert.
- **FAIT.** `pnpm install` avertit « Ignored build scripts: sharp, unrs-resolver » et sort quand même 0. Node local `v22.14.0`, pnpm `10.6.2`.
- **FAIT.** CI du SHA (`gh api .../commits/8509585c.../check-runs` et `.../status`) : état combiné `success`. Check-runs : `check` success (Actions [run 37570149605](https://github.com/manzilionellm-dotcom/afriksud/actions/runs/37570149605/job/112626719777)), `Vercel Preview Comments` success. Status : `Vercel` success, déploiement terminé. Le workflow `.github/workflows/ci.yml` lance `pnpm install --frozen-lockfile`, `pnpm run lint`, `pnpm run build` sur Node 20. Il ne lance pas `tsc --noEmit` à part (le build vérifie les types).

## Bloquants

1. **`soft-sell` est dans le HTML visiteur (456 URLs).** Préexistant : ces fichiers ne sont pas dans le diff.
   - `components/seo/DstvSoftSellCta.tsx:34` `data-dstv-soft-sell="mid"`
   - `components/seo/DstvSoftSellCta.tsx:44` `id="dstv-soft-sell"`
   - `components/seo/DstvSoftSellCta.tsx:46` `data-dstv-soft-sell="end"`
   - `components/seo/DstvSoftSellCta.tsx:65` `data-track-placement` contient `DstvSoftSell`
   - `components/seo/DiasporaSoftSellCta.tsx:36` `data-diaspora-soft-sell="mid"`
   - `components/seo/DiasporaSoftSellCta.tsx:64` `data-diaspora-soft-sell="end"`
   - **FAIT.** Crawl production (`next start`, 1 673 réponses 200) : le motif `soft-sell` est dans 456 corps HTML, sous la classe `longformWarning`. Les pages `/en-za`, `/en-za/legal/popia`, `/terms` et `/about` ne le contiennent pas. Le mot visible « soft-sell » a été retiré de `free-trial` par ce diff ; les attributs des guides blog restent.
   - **INFÉRENCE.** Un visiteur qui affiche la source voit le jargon interne de placement commercial.

2. **`/ops` est servi et expose des scripts internes.** La route existait déjà ; ce diff ne change que la phrase d'intro.
   - `app/ops/page.tsx:8` tableau `SCRIPTS` (relances J+0 / J+1 / J+2, parrainage « 1 mois offert »)
   - `app/ops/page.tsx:18` titre « Scripts — un numéro 447307410512 »
   - `app/ops/page.tsx:19` le diff remplace « Page noindex. Copier-coller. Pas d’envoi auto. » par « Copy by hand. Nothing is sent automatically. »
   - **FAIT.** `GET /ops` et `curl -I /ops` → **200**. `<meta name="robots" content="noindex, nofollow">`. Pas d'en-tête `X-Robots-Tag` sur ce host (le middleware ne le pose, hors `*.vercel.app`, que pour `/{locale}/legal/{popia,terms,about}`). 0 `<loc>` sitemap contenant `/ops`. Le corps affiche les quatre scripts de closing.
   - **FAIT.** Dépôt `PUBLIC`. Le même texte est donc lisible sur GitHub et sur l'URL du site.
   - **FAIT.** `app/robots.ts:71` : `User-Agent: *` a `Disallow: /ops`. `app/robots.ts:17` : le groupe `Googlebot` est `Allow: /` sans ce Disallow.
   - **INFÉRENCE.** Googlebot n'hérite pas du groupe `*`. Il peut crawler `/ops` et y lire le noindex. Le Disallow ne cache pas la page à Google ; il la cache aux agents qui tombent dans `*`.
   - **FAIT.** Aucun import de `app/ops/page.tsx` ailleurs. La page est une route App Router, pas un fichier de `public/`.

3. **`/en-za/legal/popia` est encore cité dans `llms.txt`.** Le diff a édité ce paragraphe et a laissé l'URL. `terms` et `about` n'y figurent pas.
   - `public/llms.txt:136` — `Privacy copy is at /en-za/legal/popia.`
   - `aio.config.json:204` — la même ligne (source du paragraphe Compliance).
   - **FAIT.** `GET /llms.txt` → 200, corps identique à `public/llms.txt`. Sitemap : 0 href `/legal/popia`, `/legal/terms`, `/legal/about`.

## Réserves

- **FAIT.** `GET /legal/popia`, `/legal/terms`, `/legal/about` → **404**. Les routes qui répondent 200 sont `/{locale}/legal/...` (mesuré : `/en-za`, `/af`, `/fr`, `/zu`). **HYPOTHÈSE :** le cahier et le journal disent `/legal/popia` comme raccourci du segment, pas comme URL sans locale. Le footer et `PillarTemplate.tsx:261` préfixent le locale (`/${locale}${r.href}`), donc le lien « POPIA policy » de `lib/seo/pillars.ts:588` devient une URL 200.
- **FAIT.** Le HTML 404 (dont ces trois URLs nues) contient à la fois `<meta name="robots" content="noindex">`, `<meta name="robots" content="index, follow">` et un `googlebot` `index, follow`. Préexistant (layout racine). Les 200 légales n'ont qu'un seul meta : `noindex, nofollow`.
- **FAIT.** JSON-LD : 0 nœud `AggregateRating`, 0 `@type: Review`, 0 `@type: Rating` sur 1 673 pages 200. **62** nœuds `Offer` sur **13** URLs (homepage par locale). Préexistant : `app/[locale]/page.tsx:113`, `lib/aio.ts:33`. Fichiers hors diff.
- **FAIT.** `PostalAddress` sans rue : pays `ZA`, région `Gauteng` (`app/[locale]/page.tsx:159-163`) et localité de ville (`app/[locale]/cities/[city]/page.tsx:136-141`). Pas un numéro CIPC ni une adresse de siège inventée par ce diff. Localisation d'entreprise non prouvée dans les 18 fichiers. Préexistant.
- **FAIT.** 0 fichier `.m3u`, `.m3u8` ou `get.php` dans `public/` et `app/`. Le motif `get.php` apparaît sur 12 URLs (une fiche × 12 locales) : `lib/seo/blog-guides.ts:362` décrit une forme `https://…/get.php?…` à coller dans TiviMate. **INFÉRENCE :** ce n'est pas une playlist hébergée par le site. `public/llms.txt:152` dit encore « paste the Mzansi Stream M3U URL » (ligne non touchée par le diff).
- **FAIT.** WhatsApp Mzansi dans le HTML et `public/` : `+44 7307 410512` et `wa.me/447307410512` seulement (aussi `447307410512` dans le `<h1>` de `/ops`). Autres numéros, attribués à DStv dans le texte, préexistants : `060 060 3788` (`public/llms.txt:154`, guides d'annulation) et `083 900 8000` (centre d'appel DStv dans le guide blog). Aucun e-mail dans les 1 673 HTML.
- **FAIT.** Chiffres non sourcés toujours publiés (hors invention de ce diff, sauf qu'ils restent en ligne) : `R899/month` sur About (`lib/seo/legal.ts:186`, page désormais noindex), barème `R99` / `R449` / `R699` / `R1,199` et `R99.92` (`lib/seo/blog-posts.ts`), bande TiviMate `R150–R199` (`lib/seo/blog-guides.ts:355`).
- **FAIT.** 0 occurrence de `anti-freeze` / `99.9%` d'uptime. Le motif `99.9` du crawl est le prix `R99.92`. `lib/seo/blog-posts.ts:120` cite « Server uptime » comme critère d'achat, sans pourcentage Mzansi. D'autres pages disent explicitement qu'elles ne promettent pas un pourcentage d'uptime ni une image « buffer-free » (`public/llms.txt:47`, guide Firestick).
- **FAIT.** « à confirmer » sur 5 pages `fr` est du français (« catalogue à confirmer sur WhatsApp »), pas le jeton `À CONFIRMER`.

## Contrôles

### 0. Gates et CI

Voir le tableau. **FAIT.**

### 1. Pages légales, sitemap, llms, footer, robots

Serveur : `pnpm exec next start -p 3000` après le build du head.

| URL | Statut | `<meta name="robots">` | `X-Robots-Tag` (`curl -I`) |
| --- | --- | --- | --- |
| `/legal/popia`, `/legal/terms`, `/legal/about` | 404 | conflit noindex + index (page 404) | absent |
| `/en-za/legal/popia`, `/terms`, `/about` | 200 | `noindex, nofollow` | `noindex, nofollow` |
| `/af/legal/popia`, `/fr/legal/terms`, `/zu/legal/about` | 200 | `noindex, nofollow` | `noindex, nofollow` |
| `/en-za/legal/refund`, `/en-za/legal/cookies` | 200 | `index, follow` | absent |

- **FAIT.** Meta posée par `app/[locale]/legal/[topic]/page.tsx:46-48` (`isNoindexLegal` → `{ index: false, follow: false }`). En-tête posé par `middleware.ts:73-78`.
- **FAIT.** Sitemap head et merge-base : fichiers **octet-identiques**, **147** `<loc>` des deux côtés. 0 loc et 0 href pour popia, terms, about. Refund et cookies : 1 `<loc>` chacun (canonical `en-za`) plus des href hreflang. `/ops` absent. **INFÉRENCE :** `isNoindexLegal` couvre les trois slugs qui avaient déjà `needsOwnerInput: true`, donc le compte ne bouge pas.
- **FAIT.** Footer de `/en-za` et des trois pages légales : liens `/{locale}/legal/about`, `/popia`, `/terms` (aussi refund et cookies). `components/client/LocalizedSections.tsx:453-455`.
- **FAIT.** `robots.txt` servi : aucun `Disallow` de `/legal`. Googlebot `Allow: /`. Le noindex n'est pas masqué par un Disallow. Ce point n'est pas bloquant.

### 2. Placeholders et phrase WhatsApp

- **FAIT.** `rg -i` sur 1 673 HTML 200 et sur `public/` : 0 `TO_FILL`, 0 `TO_FILL_BY_OWNER`, 0 `placeholder`, 0 jeton `À CONFIRMER`, 0 `TODO`, 0 `TBD`, 0 `lorem`, 0 « owner must », 0 `⚠️`. Le bandeau `longformWarning` + `TO_FILL_BY_OWNER` de la page légale est retiré (`app/[locale]/legal/[topic]/page.tsx:65`).
- **FAIT.** Phrase, `lib/seo/legal.ts:6-7`, rendue telle quelle :

  > Company details will be published here. For questions, message us on WhatsApp (+44 7307 410512).

  Comptage dans le HTML : popia 2 fois (bandeau `needsOwnerInput` + section « Who we are »), terms 1 fois (bandeau), about 3 fois (bandeau + « The team » + « Company information »). About a en plus : « WhatsApp: +44 7307 410512 (also the floating button on every page). » (`lib/seo/legal.ts:204`).
- **INFÉRENCE.** La phrase est naturelle, neutre, et ne promet ni raison sociale, ni CIPC, ni adresse, ni TVA, ni délai, ni uptime, ni licence. Elle annonce seulement que des détails seront publiés et donne le WhatsApp. La répétition sur About est redondante, pas trompeuse.

### 3. Données légales inventées

- **FAIT.** Le diff retire les crochets `[TO_FILL_BY_OWNER]` (entité, CIPC, adresse, VAT, Information Officer, `privacy@iptvmzansi.com`, `hello@iptvmzansi.com`, juridiction). Il n'ajoute ni `Pty`, ni `Ltd`, ni numéro d'enregistrement, ni rue, ni e-mail, ni nom d'Information Officer.
- **FAIT.** HTML : 0 `Pty` / `Ltd`, 0 « Information Officer », 0 e-mail. Le mot `CIPC` reste sur 144 pages ville dans une **négation** (« does not state … a CIPC registration »), fichier hors diff. `VAT` reste sur 12 URLs du guide légal dans une négation (« does not state a VAT number »), hors diff. Aucune entité nouvelle.

### 4. Fichiers internes

| Cible | HTTP | Dans `public/` | Importé par une page |
| --- | --- | --- | --- |
| `/.company/assumptions.md` | 404 | non | non |
| `/.company/state.json` | 404 | non | non |
| `/runs/run-018.journal` | 404 | non | non |
| `/ops` | 200 | non | la route est `app/ops/page.tsx` |

- **FAIT.** Mots internes dans les 1 673 HTML : 0 `Lionel`, 0 `assumptions`, 0 `fleet`, 0 `flotte`, 0 `AggregateRating`. `agent` : une seule URL, `/robots.txt`, dans `User-Agent`. `soft-sell` : bloquant n°1.
- **FAIT / INFÉRENCE.** `run-018` et `Lionel` ne sont que dans `.company/assumptions.md` (et le journal pour le run). L'URL du journal est 404 et aucun module de page ne l'importe. Le mot anglais « run » n'a pas été compté seul (il est du vocabulaire ordinaire, ex. une saison qui « runs »).
- **Ce que le diff change.**
  - `.company/assumptions.md` : ajoute A46 (noindex, phrase neutre, rien d'inventé, levée quand Lionel fournit les données) et A47 (les guides qui disent que le lien de playlist part sur WhatsApp ne sont pas une M3U publique ; pas de promesse d'uptime trouvée par l'auteur).
  - `runs/run-018.journal` : journal nouveau, cases cochées, lien vers la PR 42. Non servi.
  - `app/ops/page.tsx` : une phrase. Les scripts restent publics. Voir bloquant n°2.

### 5. JSON-LD, M3U, WhatsApp, promesses

Couvert par les réserves et les bloquants. **FAIT.** 0 AggregateRating / Review / Rating. 0 playlist publique. Numéro Mzansi unique. Offers, prix et numéros DStv signalés en réserve, préexistants.

### 6. Autres PR ouvertes

- **FAIT.** `gh pr list --state open --limit 100` : une seule PR, la #42 (brouillon). Aucun autre couple de branches à croiser.
- **FAIT.** `git merge-tree --write-tree origin/main 8509585` exit 0 (arbre `e9ae84b`). La #42 se marie à `main` sans conflit. Pas de conflit avec une autre PR ouverte, faute d'autre PR.

## Hors verdict

Cette QA n'a pas fusionné, n'a pas retiré le brouillon de #42, et n'a pas poussé `fix/noindex-legal-placeholders` ni `main`.
