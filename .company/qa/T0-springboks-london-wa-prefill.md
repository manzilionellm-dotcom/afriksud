# T0 — Machine WA re-audit 8.6/10 (run-014)

Date: 2026-09-06 · Branch: `cursor/springboks-london-wa-prefill-8366` · Base: `6213cb1` (#22)

Toutes les lignes = commandes exécutées (Loi #1).

## Live (apex)

| Check | Résultat |
|---|---|
| `https://iptvmzansi.com/en-za/blog/watch-springboks-from-london` | **200** `x-matched-path: /[locale]/blog/[slug]` |
| trailing `/` | 308 → `/en-za/blog/watch-springboks-from-london` |
| Title | Watch the Springboks from London — IPTV FAQ for SA rugby fans \| Mzansi Stream |
| Canonical | `https://iptvmzansi.com/en-za/blog/watch-springboks-from-london/` |
| FAQ visible / FAQPage | **8Q** (pack pré-#17). Git `main` = P1 6Q (#21). Deploy ≠ git. |
| Target prefill `Hi — London UK…` | **0** |
| Weak `Hi! I…` wa.me | hero/footer + DiasporaSoftSell + chrome FAB (client) |
| `wa.me/447307410512` | 16 |
| `+44 7307 410512` visible | 26 |
| mailto / AggregateRating | 0 / 0 |
| Body `M3U` | 1 (dead-seller « M3U 401s ») |
| TiviMate in body/HowTo | HowTo step + footer nav label (not FAQ-only) |
| `20,000+` | InlinePricingBlock planPerks (template on this URL) |

### Live 8Q (visible = FAQPage) — encore le pack pré-#17

1. Can I watch Springboks Tests on IPTV from London?
2. Do I get URC (Stormers, Sharks, Bulls, Lions) from the UK?
3. Is Super Rugby still a South African competition?
4. Can I watch English Premiership rugby as well as the Boks?
5. What time is a 17:00 SAST Test in London?
6. Do I need a VPN in London?
7. How do I start the 24-hour trial from the UK?
8. Is this the same as the Springboks page for South Africa?

## Alias (live vs git)

| URL | Live HTTP | Git `6213cb1` (#22) |
|---|---|---|
| `/en/iptv-springboks-uk` | **404** `x-matched-path: /_not-found` | 308 → blog (`vercel.json` + `route.ts` + next.config) |
| `/en/iptv-springboks-uk/` | 308 slash-strip → 404 | 308 → blog |

0 soft landing à ajouter. Hobby may delay live.

## Repo `origin/main` @ `6213cb1`

- CTA London = `Hi! I'm in London…` + `waMeLink(..., ref)` → pas le href locked.
- DiasporaSoftSellCta = `Hi! I'm a South African watching from…`
- FAB / HeaderNav = `Hi! I'd like…` / `Hi! I need information…` (chrome qui bleed)
- FAQ source = `SPRINGBOKS_LONDON_P1_FAQ` 6Q (déjà #21)
- Alias 308 déjà #22 — ne pas restaurer, ne pas ajouter de landing.

## GSC

Absente — volumes NON OBSERVÉS.
