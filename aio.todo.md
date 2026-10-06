# À compléter (non lisible comme fait unique — rien n'a été inventé)

- Débit exact du flux (bitrate ladder HLS, Mbps par palier) : la homepage ne le donne pas. `tech.bitrate` reprend seulement la phrase déjà publiée sur la page 4K (« 25 Mbps sustained per 4K stream »). Pas de mesure nouvelle.
- « From R99 » est le titre et la ligne du tableau comparatif. Les totaux publiés dans `components/shared/plans.ts` sont R199 / R449 / R699 / R1199. Le sélecteur de prix affiche `Math.round(price / months)`, donc R100 pour le plan 12 mois, pas R99. Aucun prix mensuel R99 n'a été réécrit comme tarif exact du plan 12 mois.
- Numéro WhatsApp : le fallback du dépôt est `447307410512` (`components/shared/site.ts`). Le numéro réellement servi dépend de `NEXT_PUBLIC_WHATSAPP_*`. À confirmer par l'éditeur pour le llms.txt de production.
- HowTo homepage : non généré. La section « 10-minute install » a 3 étapes sans ancres. Les guides device (Firestick, Samsung, etc.) ont déjà un HowTo sur leur propre URL. Ne pas dupliquer ici.
- Vidéo : `HeroV2` ne monte `<video>` qu'après hydratation desktop (`/videos/hero-loop.mp4`, commentaire TO_FILL_BY_OWNER). Le HTML sans JS n'a pas de `<video>`. Pas de transcription ajoutée. Fichier réel et transcript à fournir par l'éditeur si la boucle devient un tutoriel.
- Image produit : `/og-image.jpg` est le poster déjà utilisé par la homepage et le schema Service. Pas d'avis, pas d'`aggregateRating` (interdit par le dépôt).
- FAQ des autres locales : l'accordéon historique reste en place (pas de traduction machine). Seule `/en-za` a les Citation Hooks ouverts. Si une locale doit les avoir dans sa langue, copie native à fournir.
- Horaires support 08:00–23:00 SAST : déjà dans le schema OnlineBusiness et l'ancien llms.txt. Pas de calendrier férié distinct.
- Nom légal / CIPC / Information Officer : toujours des placeholders `TO_FILL_BY_OWNER` ailleurs. Non copiés ici.
