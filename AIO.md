# AIO (Sprint) — source unique : aio.config.json

- `pnpm aio:llms` régénère `public/llms.txt` (les sections déjà publiées sont dans `appendix`, pas réinventées).
- `pnpm build && pnpm start` puis `node scripts/aio-check.mjs http://localhost:3000/` : preuve sur HTML brut (Citation Hooks 40–60 mots, JSON-LD parsable, alt, transcription vidéo, /llms.txt).
- Les h3 de la FAQ + `<p>` sont rendus par `components/seo/AioCitationFaq.tsx` (Server Component) sur `/en-za` seulement. Le JSON-LD FAQPage + Product est dans `app/layout.tsx` pour cette homepage, et le FAQPage historique de `app/[locale]/page.tsx` est retiré sur `en-za` pour qu'il n'y en ait qu'un.
- HowTo n'est pas ajouté sur la homepage : les tutoriels d'installation ont déjà leur HowTo sur les pages devices / pillars.
