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
