# T0 — Springboks UK short slugs (run-009)

Date: 2026-09-06 · Branch: `cursor/iptv-springboks-uk-faq-hub-b972` · Base: `790efe0`

Toutes les lignes = commandes exécutées (Loi #1).

## Live blog (cible existante)

| Check | Résultat |
|---|---|
| `https://iptvmzansi.com/en-za/blog/watch-springboks-from-london/` | 308 → `/en-za/blog/watch-springboks-from-london` puis **200** |
| Title | Watch the Springboks from London — IPTV FAQ for SA rugby fans \| Mzansi Stream |
| Canonical | `https://iptvmzansi.com/en-za/blog/watch-springboks-from-london/` |
| FAQ visible / FAQPage | **8Q** (pack pré-#17). Repo main = P1 6Q. Deploy ≠ git. |
| `wa.me/447307410512` | 16 |
| mailto / AggregateRating | 0 / 0 |

## Aliases demandés (avant ce run)

| URL | HTTP |
|---|---|
| `/en/iptv-springboks-uk` | 404 |
| `/en/watch-springboks-uk` | 404 |
| `/en-za/iptv-springboks-uk` | 404 |
| `/en-za/watch-springboks-uk` | 404 |
| `/en-gb/iptv-springboks-uk` | 404 |
| `/en` | 404 (`en` ∉ LOCALES) |

## Sitemap prod

`https://iptvmzansi.com/sitemap.xml` 200. `watch-springboks-from-london` présent. `iptv-springboks-uk` = 0.

## Risque catch existant

`next.config.js` `/iptv-:city` → `/en-za/cities/:city/`. Un hit `/iptv-springboks-uk` (sans locale) irait vers une city 404. Règle spécifique ajoutée **avant**.
