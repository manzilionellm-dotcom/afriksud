# PASS

Re-QA white-hat de la PR brouillon [#42](https://github.com/manzilionellm-dotcom/afriksud/pull/42) (`fix/noindex-legal-placeholders` → `main`), head `4bbadd7370f2d34b9a0ab360484f655bbde768e5`. Diff mesuré contre `origin/main` (`ba0521b`) : **+206 / −203, 21 fichiers**. Dépôt **public**. La PR est **brouillon**. Ce verdict ne la fusionne pas et ne la sort pas du brouillon.

Le FAIL du verdict [#43](https://github.com/manzilionellm-dotcom/afriksud/pull/43) (head `8509585c`) portait sur trois points. Les trois sont levés sur ce head. Le noindex des pages `/{locale}/legal/{popia,terms,about}` tient.

Chaque constat est étiqueté **FAIT** (observé), **INFÉRENCE** (déduit d'une observation) ou **HYPOTHÈSE**.

## Gates

| Cible | Commande | Exit |
| --- | --- | --- |
| Head `4bbadd73` | `pnpm install --frozen-lockfile` | 0 |
| Head | `pnpm lint` | 0 |
| Head | `pnpm exec tsc --noEmit` | 0 |
| Head | `pnpm build` | 0 |

- **FAIT.** Node local `v22.14.0`, pnpm `10.6.2`, Next `15.3.8`. Lint : « No ESLint warnings or errors ». Build : `Generating static pages (1679/1679)` puis exit 0. `pnpm install` avertit « Ignored build scripts: sharp, unrs-resolver » et sort 0.
- **FAIT.** `package.json` n'a pas de script `validate:content`. Non exécuté. `type-check` est `tsc --noEmit` ; c'est cette commande qui a été lancée.
- **FAIT.** CI du SHA `4bbadd73` : état combiné `success`. Check-run `check` success (Actions [run 37571629274](https://github.com/manzilionellm-dotcom/afriksud/actions/runs/37571629274/job/112631340720)). Check-run `Vercel Preview Comments` success. Status `Vercel` success. Le workflow `.github/workflows/ci.yml` lance install, lint et build sur Node 20. Il ne lance pas `tsc` à part ; le `tsc --noEmit` local ci-dessus couvre ce trou.
- **FAIT.** Ce run n'a pas relancé les gates sur le merge-base. Le verdict #43 les avait déjà mesurées vertes sur `ba0521b`. `git merge-tree --write-tree origin/main 4bbadd73` exit 0 (arbre `ab5113d`).

## Bloquants du FAIL #43

### 1. `soft-sell` — 0 dans le HTML

Le correctif retire les attributs `data-dstv-soft-sell`, `id="dstv-soft-sell"` et `data-diaspora-soft-sell`. Les CTA restent sur les pages.

- **FAIT.** `components/seo/DstvSoftSellCta.tsx` rend `id="guide-whatsapp"` (l. 44). Aucun attribut dont le nom ou la valeur contient `soft-sell`. Le texte vient de `lib/seo/dstv-soft-sell.ts` (appareil, ligues, essai 24 h, `+44 7307 410512`). Pas de « about €5/mo ».
- **FAIT.** `components/seo/DiasporaSoftSellCta.tsx` rend `id="diaspora-whatsapp"`. `data-track-placement` vaut `Diaspora-${slug}-Mid|End`, sans le jeton.
- **FAIT.** Grep du build servi : 0 fichier sous `.next/server` et `.next/static` ne contient `soft-sell`, `SoftSell`, `data-dstv-soft-sell`, `data-diaspora-soft-sell` ni `dstv-soft-sell`. Le build n'écrit pas les HTML SSG sur disque (`prerender-manifest.json` : 2 routes, `sitemap.xml` et `favicon.ico`). Le grep porte donc sur les modules compilés qui produisent le HTML, pas sur 1 679 fichiers `.html`.
- **FAIT.** Le sous-chaîne `soft-sell` n'apparaît dans `.next` que comme nom de fichier source `dstv-soft-sell.ts`, dans `.next/trace`, `.next/cache/.tsbuildinfo`, le pack webpack et le cache ESLint. Ces chemins ne sont pas des pages.
- **FAIT.** HTML servi (`next start -p 3000`), échantillon des routes qui montent les CTA, plus accueil, essai, pilier et légal. 0 `soft-sell` partout :

  | URL | Statut | Marqueur CTA | `soft-sell` |
  | --- | --- | --- | --- |
  | `/en-za/blog/order-iptv-whatsapp-south-africa` | 200 | `id="guide-whatsapp"` | 0 |
  | `/af/blog/tivimate-setup-south-africa-2026` | 200 | `id="guide-whatsapp"` | 0 |
  | `/en-za/blog/watch-springboks-from-london` | 200 | `id="diaspora-whatsapp"` | 0 |
  | `/en-gb/blog/iptv-uk-firestick-smart-tv-sa-sports` | 200 | `id="diaspora-whatsapp"` | 0 |
  | `/en-gb/sa-abroad/uk`, `/en-za/sa-abroad/uk` | 200 | `id="diaspora-whatsapp"` | 0 |
  | `/en-za`, `/en-za/free-trial`, `/en-za/dstv-alternative` | 200 | — | 0 |

- **INFÉRENCE.** Le jeton n'est plus émis par les modules de page. L'échantillon prouve que les CTA sont bien rendus et que leur HTML n'a plus le jeton. Ce n'est pas un recompte des 456 URLs du FAIL.

Le mot reste dans des commentaires source (`lib/seo/blog-guides.ts:4`, `lib/seo/blog-diaspora.ts:36`, `components/shared/dict.ts:551`) et dans `.company/` / `runs/`. **FAIT.** Ces commentaires ne sortent pas dans le HTML mesuré.

### 2. `GET /ops` → 404

- **FAIT.** `app/ops/page.tsx:18` appelle `notFound()`. La route est dynamique (`ƒ /ops` dans le build).
- **FAIT.** `GET /ops` → **404**. `HEAD /ops` → **404**, corps vide. Le corps GET (15 905 octets) ne contient pas `J+0`, `J+1`, `Parrainage`, `1 mois offert`, `CLOSER`, `447307410512`, ni « Copy by hand ». Les 4 occurrences de `Scripts` sont les clés internes Next `errorScripts` / `templateScripts` dans le payload RSC, pas les scripts de closing.
- **FAIT.** Le texte visible du 404, une fois les `<script>` retirés, est le titre par défaut « DStv Alternative — Live TV in 4K from R99 | Mzansi Stream ». Pas de tableau de relances.
- **FAIT.** Le module compilé `.next/server/app/ops/page.js` contient encore `J+0` (1) et `Parrainage` (2), parce que le tableau `CLOSER_SCRIPTS` reste dans la source. Ce module n'est pas le corps HTTP : le GET ne le renvoie pas.
- **FAIT.** Sitemap : 0 `<loc>` contenant `/ops`. `robots.txt` garde `Disallow: /ops` sur `User-Agent: *`. Le groupe `Googlebot` est `Allow: /` sans ce Disallow (inchangé).
- **INFÉRENCE.** Un visiteur du site ne reçoit plus les scripts. Le dépôt étant public, le fichier source les montre encore sur GitHub. Le critère rejoué ici est le GET, et il passe.

### 3. `llms.txt` ne cite plus POPIA

- **FAIT.** `public/llms.txt:136` : `Privacy questions go to WhatsApp: https://wa.me/447307410512.`
- **FAIT.** `aio.config.json:204` : la même ligne.
- **FAIT.** `GET /llms.txt` → 200, corps **identique** à `public/llms.txt`. Comptages : `/en-za/legal/popia` 0, `/legal/popia` 0, `legal/popia` 0, `legal/terms` 0, `legal/about` 0.
- **FAIT.** `rg` sur `public/llms.txt` et `aio.config.json` : 0 `popia`, 0 `legal/`.

## Conservé du PASS partiel

### Pages légales

Serveur : `pnpm exec next start -p 3000` après le build du head. Les 12 locales × `{popia, terms, about}` = **36/36**.

- **FAIT.** Chaque URL `/{locale}/legal/{popia,terms,about}` → **200**, un seul `<meta name="robots" content="noindex, nofollow">`, en-tête `X-Robots-Tag: noindex, nofollow`. Locales : `en-za`, `en-gb`, `en-au`, `en-us`, `af`, `zu`, `xh`, `pt-mz`, `en-zw`, `fr`, `en-ae`, `en-nz`.
- **FAIT.** Contrôle : `/en-za/legal/refund` et `/en-za/legal/cookies` → 200, meta `index, follow`, pas de `X-Robots-Tag`. Le noindex ne s'est pas étendu à ces deux slugs.
- **FAIT.** `GET /legal/popia`, `/legal/terms`, `/legal/about` → **404**. Les URLs qui répondent 200 sont préfixées par la locale. Le pied de page de `/en-za/legal/popia` contient un `href` vers `/en-za/legal/popia`, `/terms`, `/about`, `/refund` et `/cookies`.
- **FAIT.** Meta posée par `app/[locale]/legal/[topic]/page.tsx:46-48`. En-tête posé par `middleware.ts:73-78` pour `/^\/[^/]+\/legal\/(popia|terms|about)$/`.
- **FAIT.** Phrase, `lib/seo/legal.ts:6-7`, rendue telle quelle :

  > Company details will be published here. For questions, message us on WhatsApp (+44 7307 410512).

  Hors balises `<script>` : popia **2** (bandeau + « Who we are »), terms **1** (bandeau), about **3** (bandeau + « The team » + « Company information »). Le document brut double ces comptes (4 / 2 / 6) parce que le payload RSC répète le même texte. **INFÉRENCE.** La phrase visible est celle déjà acceptée au verdict #43.
- **FAIT.** Sur ces 36 HTML : 0 `TO_FILL`, 0 `Pty`, 0 `Ltd`, 0 `soft-sell`.
- **FAIT.** Sitemap servi : **147** `<loc>`. 0 loc dont le chemin contient `legal/popia`, `legal/terms` ou `legal/about`. Une loc pour `https://iptvmzansi.com/en-za/legal/refund`, une pour `.../legal/cookies`. 0 `/ops`. La phrase « Company details will be published » est absente du XML. Filtre : `app/sitemap.ts:160-163` (`isNoindexLegal` → `continue`).

### WhatsApp, JSON-LD, M3U

- **FAIT.** Sur l'échantillon (accueil, guide ZA, guide diaspora, sa-abroad UK, popia, about, free-trial) les seuls liens `wa.me` et le seul numéro Mzansi sont `https://wa.me/447307410512` et `+44 7307 410512`. Sur `/en-za`, le flux RSC coupe le numéro du FAB en `44730741` puis `0512` au chunk suivant (`self.__next_f.push([1,"0512?text=Hello…`) : c'est le même numéro, pas un second.
- **FAIT.** 0 `AggregateRating` dans tout `.next/server`. Sur l'échantillon : 0 `"@type":"Review"`, 0 `"@type":"Rating"`.
- **FAIT.** 0 fichier `.m3u` ou `.m3u8` sous `public/` et `app/`. 0 `get.php` hébergé. Le mot `m3u` reste dans le HTML de guides préexistants (accueil : 15, guide commande : 16, TiviMate `/af` : 30 dont `get.php` × 2). **INFÉRENCE.** Ce sont des phrases de guide, pas une playlist publiée par le site. Même lecture qu'au verdict #43.

## Réserves (hors bloquant)

- **FAIT.** `/en-za` porte **9** nœuds `"@type":"Offer"`. `app/[locale]/page.tsx` n'est pas dans le diff. Préexistant.
- **FAIT.** Le diff ne crée pas de prix. Il retire le suffixe `(TO_FILL_BY_OWNER for live FX)` de `localPriceNote` dans `lib/seo/sa-abroad.ts`. Les montants (`~£5`, `~€6`, `~AU$8`, etc.) étaient déjà sur `main`. Le CTA guide ne contient plus « about €5/mo » (0 `€5` sur les guides échantillonnés).
- **FAIT.** `060 060 3788` reste dans une réponse de guide d'annulation DStv. Le diff enlève seulement « Mzansi Stream also does not use mailto. » Le numéro n'est pas nouveau.
- **FAIT.** Le HTML 404 (dont `/ops` et `/legal/popia`) a deux meta robots : `noindex` et `index, follow`. Déjà noté au verdict #43 sur la page 404. Les 200 légales n'ont qu'un meta, `noindex, nofollow`.
- **FAIT.** `GET /.company/assumptions.md` et `GET /runs/run-018.journal` → 404.
- **FAIT.** `gh pr list --state open` : #42 (brouillon, vers `main`) et #43 (brouillon de verdict, vers `fix/noindex-legal-placeholders`). Pas d'autre PR de code ouverte.

## Hors verdict

Cette QA n'a pas fusionné #42, ne l'a pas sortie du brouillon, et n'a pas poussé `fix/noindex-legal-placeholders` ni `main`.
