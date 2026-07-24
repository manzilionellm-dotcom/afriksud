# Hypothèses (Loi #2 — ambiguïté → hypothèse la plus probable, on continue)

## run-001
- **A1.** CONFIG du prompt laissée en placeholders → déduite du code. DOMAINE=`iptvmzansi.com` (`lib/url.ts`), marchés = les 12 locales de `lib/locales.ts` avec ZA (en-za) principal et x-default, CONVERSION = WhatsApp.
- **A2.** Les locales anglophones diaspora (en-gb/au/us/ae/nz) ciblent des Sud-Africains à l'étranger → proposition « regarder la TV sud-africaine depuis {pays} ». Titres homepage différenciés en ce sens.
- **A3.** en-zw (Zimbabwe) = marché anglophone distinct avec rails de paiement locaux (USD/EcoCash/OneMoney), déjà reflété dans `dict.ts`.
- **A4.** Cible de déploiement = Vercel (présence de `next.config.js`, projet Next). Non confirmé par `.vercel/` dans le repo → à valider (CHECKLIST_HUMAINE).
- **A5.** Absence de clé GSC → indexation non mesurée, jamais estimée en « fait ».
