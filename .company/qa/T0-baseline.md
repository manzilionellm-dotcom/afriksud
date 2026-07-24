# T0 — RECON & BASELINE (run-001)
Date: 2026-07-24 · Branch: `claude/usine-v8-prompt-fh8zoz` · Point de rollback: HEAD `a18aa71`

Toutes les lignes ci-dessous proviennent de commandes réellement exécutées (Loi #1).

## Config auto-déduite (Tier A)
| Champ | Valeur | Source |
|---|---|---|
| DOMAINE | `iptvmzansi.com` | `lib/url.ts` `SITE_URL` |
| Marque | Mzansi Stream | `components/shared/dict.ts` |
| Marché principal / x-default | ZA (en-za) | `lib/locales.ts` `DEFAULT_LOCALE` |
| Langues | en-za, en-gb, en-au, en-us, af, zu, xh, pt-mz, en-zw, fr, en-ae, en-nz (12) | `lib/locales.ts` |
| Devise | ZAR (R) | copie + schema |
| CONVERSION | Bouton/lien WhatsApp | `lib/locales.ts` `whatsappForLocale`, FAB |

## 1. Inventaire réel
- `pnpm build` → **exit 0** (baseline verte, sert de point de rollback).
- `N_pages_réelles` = **128 URLs canoniques** dans `/sitemap.xml` (serveur prod local), chaque page localisée portée comme alternate `hreflang` de l'ancre en-za.
- Familles de routes : home, pillars (dstv-alternative, best-iptv…, cheap…, 4k…, no-buffering…, movies, legal, supersport, firestick, samsung, vumatel, cancel-dstv, eft-snapscan), hubs+enfants (cities, vs, sadc, sa-abroad, communities, devices, language), blog.

## 2. Indexation
- Pas de clé GSC configurée dans l'environnement → taux d'indexation réel **NON MESURABLE** ici (à brancher via `GSC_KEY`, cf. CHECKLIST_HUMAINE). Non simulé (Loi #3).

## 3. Matrice langue (page × lang déclaré × langue affichée) — SUSPECT #1
Commande : `curl -sL http://localhost/<locale>` → extraction `<html lang>` + `<title>`.

| Locale | `<html lang>` | Titre servi | MATCH langue |
|---|---|---|---|
| en-za | en-ZA | "DStv Alternative — 20,000+ Channels from R99 \| Mzansi Stream" | ✅ |
| af | af | idem (anglais) | ❌ FAIL |
| zu | zu | idem (anglais) | ❌ FAIL |
| xh | xh | idem (anglais) | ❌ FAIL |
| pt-mz | pt-MZ | idem (anglais) | ❌ FAIL |
| fr | fr | idem (anglais) | ❌ FAIL |

**Constat :** `<html lang>` est correctement posé par locale (le middleware fonctionne), MAIS le **`<title>` et la meta description de la homepage sont codés en dur en anglais pour les 12 locales** (`app/[locale]/page.tsx` `generateMetadata`). Conséquences :
1. **12 pages partagent un titre identique** → échec « titles uniques » (qa-gate).
2. **Incohérence lang↔contenu** sur af/zu/xh/pt-mz/fr → suspect n°1 de non-indexation (Loi #9).

Le même schéma est **systémique** : les pillars (ex. `/fr/dstv-alternative`, `/zu/dstv-alternative`) rendent à 200 avec un titre anglais identique à `/en-za/…`. Le corps de la homepage est partiellement natif (hero/trial/checkout traduits dans `dict.ts`) ; les métadonnées et les corps des pillars restent anglais.

## 4. hreflang
- Balises `hreflang` présentes : self-référentes + réciproques + `x-default` (→ en-za). **OK structurellement.**
- **Défaut mineur observé :** double émission des balises `hreflang` (jeu proper-case via Next Metadata + jeu lowercase dupliqué dans le HTML). À dédupliquer (backlog, non bloquant).

## 5. CWV / Lighthouse
- Non exécuté ce run (pas de Chrome headless lancé ici). À brancher via smoke Playwright + lighthouse (backlog). Non simulé.

## Ordre de dépendance appliqué
Recon → **Langue (T1)** en premier car suspect n°1 d'indexation. Périmètre borné de ce run : métadonnées homepage (page prioritaire 1.0, 12 locales). Le reste de la localisation (métadonnées + corps des pillars par langue) → backlog scoré, jamais par traduction machine (Loi #9).

## Décision de périmètre (run borné, finissable)
Ce run livre : backbone opérationnel manquant (`.company/`, `CLAUDE.md`, `scripts/qa-gates.mjs`) + correctif T1 borné (métadonnées homepage natives, 12 locales). La localisation systémique du reste du site est documentée et backloggée — pas noyée dans un run qui meurt à 60 %.
