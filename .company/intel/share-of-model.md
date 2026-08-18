# Share of Model (I11)

## Statut
- run-001 : NON MESURÉ.
- **2026-08-17 : PREMIER SIGNAL POSITIF OBSERVÉ.** Un lead entrant sur WhatsApp
  portait le suffixe d'attribution avec ChatGPT comme source (rapporté par
  l'owner). Preuve de conversion, pas encore de volume.

## Signaux observés (1 ligne = 1 fait, jamais d'estimation)

| date | source | landing | issue | preuve |
|---|---|---|---|---|
| 2026-08-17 | ChatGPT (référent) | `{{À_DÉFINIR}}` — à relire dans le fil WhatsApp | lead entrant | suffixe `attributionSummary()` dans le message WhatsApp, rapporté par l'owner |

**À compléter :** le champ `landing:` du même message nomme la page exacte que
ChatGPT a citée. C'est l'information la plus utile disponible aujourd'hui et
elle est gratuite — relire le message et remplir la case.

## Ce que ce signal prouve / ne prouve pas

**Prouve.** La chaîne GEO complète fonctionne de bout en bout : `robots.ts`
autorise les crawlers IA → une page a été indexée puis citée → l'utilisateur a
cliqué le lien dans la réponse → `document.referrer` a été capté → le suffixe
d'attribution a survécu jusqu'au message WhatsApp → l'owner a pu identifier la
source. Aucun maillon n'a cassé.

**Ne prouve pas.** Ni le volume, ni la répétabilité, ni quelle page porte la
citation, ni si les autres moteurs (Perplexity, Gemini, Copilot) citent aussi.
Un point n'est pas une courbe.

## Undercount structurel (important)

Le référent `chatgpt.com` n'apparaît **que si l'utilisateur clique le lien dans
la réponse**. Si le modèle nomme « Mzansi Stream » et que la personne tape le
nom dans son navigateur, le lead arrive en `Source: direct`. L'acquisition
réellement pilotée par l'IA est donc **supérieure ou égale** à ce que ce
compteur montre — jamais inférieure. Ne pas lire les `direct` comme du hasard.

## Panel de prompts « argent » à jouer (non exécuté)
Format : prompt | moteurs cités | nous O/N | date.
