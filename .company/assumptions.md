# Hypothèses (Loi #2 — ambiguïté → hypothèse la plus probable, on continue)

## run-001
- **A1.** CONFIG du prompt laissée en placeholders → déduite du code. DOMAINE=`iptvmzansi.com` (`lib/url.ts`), marchés = les 12 locales de `lib/locales.ts` avec ZA (en-za) principal et x-default, CONVERSION = WhatsApp.
- **A2.** Les locales anglophones diaspora (en-gb/au/us/ae/nz) ciblent des Sud-Africains à l'étranger → proposition « regarder la TV sud-africaine depuis {pays} ». Titres homepage différenciés en ce sens.
- **A3.** en-zw (Zimbabwe) = marché anglophone distinct avec rails de paiement locaux (USD/EcoCash/OneMoney), déjà reflété dans `dict.ts`.
- **A4.** Cible de déploiement = Vercel (présence de `next.config.js`, projet Next). Non confirmé par `.vercel/` dans le repo → à valider (CHECKLIST_HUMAINE).
- **A5.** Absence de clé GSC → indexation non mesurée, jamais estimée en « fait ».

## run-003
- **A6.** `www.iptvmzansi.com` n'est pas attaché au projet Vercel : le certificat live n'a que `DNS:iptvmzansi.com`. DNS www (CNAME → apex) existe déjà. L'ajout du domaine + provisioning SSL est une action dashboard, pas ce PR.
- **A8.** Live 2026-09-04 post-#12 : TLS www OK, mais Next trailing-slash 308 relatif gagne sur les host-redirects (`www/en-za/` → `/en-za` same-host). `skipTrailingSlashRedirect` + middleware www-first est le correctif in-repo ; le redirect domaine Vercel (www → apex 308) reste le garde-fou edge.

## run-005
- **A9.** « MANY high-quality SEO blogs » = 12 guides **nouveaux** (8–12 demandé). Les 17 posts existants restent en scaffolding : Loi #4 interdit de reconstruire des URLs live 200.
- **A10.** Autres locales = bas risque via `generateStaticParams` + `robotsForProgrammatic` (index EN only). Corps EN, pas de traduction machine (Loi #9).
- **A11.** SERP concurrente non mesurée (intel vide, pas de GSC). Originalité = angle opérationnel absent des pillars/blogs internes, pas un claim de volume.

## run-007
- **A12.** Cluster diaspora rugby = 6 slugs **nouveaux** sous `/blog/` (pattern repo, pas `/guides/`). Le template `sa-abroad/[country]` est upgradé en additif (FAQ + WA) sans reconstruire H1/sections live.
- **A13.** Légalité « soft » = catégories de playlist ≠ licences exclusives. Pas d'avis juridique UK inventé ; le pillar SA `is-iptv-legal-south-africa` reste la page droit ZA.
- **A14.** SERP London/rugby non mesurée (GSC absente). Originalité = angles London/UK absents des pages internes (timezone, ISP UK, vendeur mort abroad).
- **A15.** Super Rugby en 2026 = Super Rugby Pacific (NZ/AU) ; les franchises SA sont en URC. Ne pas prétendre le contraire. « Premiership-style » = rugby club anglais / catégories UK, pas une licence Sky/TNT.

## run-006
- **A12.** « Prefer DStv/sport/switch/load-shedding ; all 12 OK if clean » → les 12 guides PR #14 sont clean (pas de mailto / AggregateRating, prix déjà publiés) → injection sur les 12.
- **A13.** « From about €5/mo on 12 months » est la copie owner fournie (EXACT). Ce n'est pas un nouveau tarif ZAR : les plans publiés restent R199 / R449 / R699 / R1,199. Le €5 n'est pas un taux de change mesuré ce run.

## run-008
- **A16.** Pack Seo P1 6Q = copie owner verbatim pour `watch-springboks-from-london` seulement (visible + FAQPage). Ne pas cloner les 6Q sur les siblings (cannibalisation FAQ rich results).
- **A17.** « Soft-align if FAQ differs wildly » → siblings topic-specific déjà alignés (0 « every feed » / 0 « 100% legal »). Seul `iptv-uk-categories-not-licences` Q2 manquait le cadre « free illegal streams » / « 100% cleared » → answer soft-alignée, question distincte conservée.
- **A18.** Corps H2 (catégories / URC / Super Rugby Pacific) conservé — Loi #4 : on remplace la FAQ, on ne reconstruit pas la page.

## run-009
- **A19.** `/en` n'est pas une locale live (12 codes figés). Seo `/en/iptv-springboks-uk` = 308 1 hop vers `/en-za/iptv-springboks-uk` (routing site). `watch-springboks-uk` = alias, pas un 2e 200.
- **A20.** Hub 200 plutôt que redirect-only : « register in sitemap » n'accepte pas les 308. Blog live non reconstruit. Même pack P1 6Q (source unique) — A16 reste pour les siblings blog ; le hub EST le slug Seo demandé.
- **A21.** Prod 2026-09-06 sert encore la FAQ 8Q pré-#17 sur le blog London. Git `790efe0` a le pack 6Q. Hub et blog repo partagent l'export. Volume GSC NON OBSERVÉ.

## run-010
- **A22.** « Prefer 308 alias to live blog if simpler » + hub #18 jamais 200 live → retrait du hub, toutes les aliases 308 vers `/en-za/blog/watch-springboks-from-london`. Pack P1 6Q reste sur le blog seulement (A16 siblings inchangé).

## run-011
- **A23.** « Soften /en-gb/ » = homepage locale `en-gb` seulement (`dict.ts` override). Pas de clone du pack P1 6Q sur la home (cannibalisation vs blog London). Ton aligné, questions home conservées + 1 Q soft-legal additive.
- **A24.** 1,200+ expats = volume non sourcé (GSC absente, aucun compteur repo) → retiré. Catalogue déjà publié (20,000+ channels, R99–R1,199) conservé. H1 / CTAs / sticky / pricing inchangés.
- **A25.** AggregateRating déjà absent du schema homepage — on n'en ajoute pas. Reviews `items: []` inchangé.
- **A26.** Les sections homepage sont des client islands (`useLang()`). Sans `initialLocale`, le HTML SSR de `/en-gb` restait en-za. Le câblage homepage est le minimum pour que la copie soft soit crawlable, pas une refonte du provider.

## run-012
- **A27.** « Exact 6Q » = les 6 questions Seo P1 (run-008 / #17) byte-identiques. « align/merge existing FAQ » = absorber les faits uniques de la live 8Q (URC noms, Super Rugby Pacific, Premiership folder, 17:00 SAST, VPN, pas-la-page-ZA) dans ces 6 answers, sans ajouter de Question.
- **A28.** Prod 2026-09-06 sert encore la FAQ 8Q pré-#17. Git a déjà les questions P1. Ce run force le merge + schema pour le prochain deploy. Volume GSC NON OBSERVÉ.
- **A29.** Couper le schema DirectAnswer `Question` sur ce slug seulement — pas une refonte du bloc visible. Les autres blogs gardent le Question + FAQPage historique.

## run-013
- **A30.** Git `94c3097` (#21, inclut #19) a déjà les 308 Next/middleware ; live 2026-09-06 `curl` = **404** (`x-matched-path: /_not-found`). Prod ≠ git. `vercel.json` n'avait que www→apex → l'alias n'existait pas à l'edge.
- **A31.** `next.config.ts` vide + `next.config.js` : Next 15 charge l'un des deux. Un seul fichier (js) pour que skipTrailingSlashRedirect + redirects #19 ne puissent pas être ignorés.
