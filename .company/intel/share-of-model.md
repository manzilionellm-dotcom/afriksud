# Share of Model (I11)

## Statut
- run-001 : NON MESURÉ.
- **run-003 (2026-08-18) : 2 leads d'origine IA observés, sur 2 moteurs distincts,
  dont 1 commande payante.** Le canal est prouvé. Le volume reste non mesuré.

## Signaux observés (1 ligne = 1 fait ; aucune donnée personnelle consignée)

| date | moteur | landing | ref CTA | issue |
|---|---|---|---|---|
| 2026-08-14 (jeu.) | ChatGPT | `/en-za/4k-iptv-south-africa` | `Pillar-4K-Hero` | demande d'essai 24 h (Smart TV) |
| 2026-08-16 (sam.) | Microsoft Copilot | `/en-au/sa-abroad/australia` | — (parcours vers `/en-za`) | **commande 1 mois R199** (Hisense VIDAA / SIPTV) |

Source : captures d'écran du fil WhatsApp fournies par l'owner. Numéros et noms
volontairement non consignés (POPIA — la mémoire du dépôt n'a pas besoin de PII).

## Ce que ces 2 faits établissent

1. **Ce n'est pas ChatGPT seul.** Copilot cite aussi. Deux moteurs indépendants
   sur deux jours = un comportement de moteur, pas une anomalie.
2. **L'attribution est plus solide que prévu.** Les deux moteurs ajoutent
   eux-mêmes `?utm_source=chatgpt.com` / `?utm_source=copilot.com` aux liens
   sortants. L'attribution ne dépend donc pas seulement du `document.referrer` :
   le paramètre UTM survit même si le référent est nettoyé.
3. **Le canal va jusqu'à l'encaissement.** Le lead Copilot n'est pas une demande
   d'info : plan choisi (1 mois R199), device (Hisense VIDAA), app (SIPTV).
4. **Le trafic IA est diaspora, pas ZA.** Numéro US et numéro australien
   (Perth). Les deux pages d'atterrissage servent des Sud-Africains à
   l'étranger — dont une page `/sa-abroad/` explicitement diaspora.
5. **Parcours multi-pages observé.** Le lead Copilot atterrit sur
   `/en-au/sa-abroad/australia` puis commande depuis `/en-za`. La page citée
   par l'IA n'est pas forcément la page de conversion : c'est la porte d'entrée.

## Ce que ces 2 faits n'établissent pas
Ni le volume, ni la récurrence, ni la part de marché face aux concurrents dans
les réponses des moteurs. Deux points ne font pas une tendance.

## Undercount structurel
Le référent/UTM n'apparaît **que si la personne clique le lien dans la réponse**.
Quand le moteur cite « Mzansi Stream » et que la personne tape le nom, le lead
retombe en `Source: direct`. L'acquisition réellement pilotée par l'IA est donc
**≥** ce compteur, jamais inférieure.

## Panel de prompts « argent » à jouer (non exécuté — CI-COMPETITIVE)
Format : prompt | moteurs cités | nous O/N | date.
Priorité déduite des faits ci-dessus : requêtes **diaspora** d'abord
(« watch SuperSport in Australia », « SABC abroad », « DStv alternative UK »),
pas seulement les requêtes ZA.
