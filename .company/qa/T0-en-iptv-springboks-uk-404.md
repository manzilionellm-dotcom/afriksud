# T0 — `/en/iptv-springboks-uk` live 404 (run-013)

Date: 2026-09-06 · mesuré `curl -sI` · Loi #1

Canon (cible, déjà 200) :

| URL | HTTP |
|---|---|
| `https://iptvmzansi.com/en-za/blog/watch-springboks-from-london/` | **308** → `/en-za/blog/watch-springboks-from-london` |
| `https://iptvmzansi.com/en-za/blog/watch-springboks-from-london` | **200** `x-matched-path: /[locale]/blog/[slug]` |

Alias demandé (live, avant ce run) :

| URL | HTTP | Notes |
|---|---|---|
| `https://iptvmzansi.com/en/iptv-springboks-uk` | **404** | `x-matched-path: /_not-found` · `x-mz-path: /en/iptv-springboks-uk` |
| `https://iptvmzansi.com/en/iptv-springboks-uk/` | **308** | `location: /en/iptv-springboks-uk` puis 404 (slash-strip only) |
| `https://www.iptvmzansi.com/en/iptv-springboks-uk` | **308** | `https://iptvmzansi.com/en/iptv-springboks-uk` puis 404 |
| `https://www.iptvmzansi.com/en/iptv-springboks-uk/` | **308** | `https://iptvmzansi.com/en/iptv-springboks-uk/` puis slash-strip puis 404 |

Autres mêmes-intent (non demandés, encore 404) :

| URL | HTTP |
|---|---|
| `/en/watch-springboks-uk` | 404 |
| `/en-za/iptv-springboks-uk` | 404 |
| `/en-gb/iptv-springboks-uk` | 404 |
| `/iptv-springboks-uk` | **308** → `/en-za/cities/springboks-uk/` (catch `/iptv-:city`) |

Git `origin/main` @ `94c3097` (#21) contient déjà les 308 #19 (`next.config.js` + middleware). Live `x-mz-path` sans Location = **deploy prod ≠ git**. `next.config.ts` vide coexiste avec `next.config.js`. `vercel.json` n'a que www→apex — l'alias n'est pas à l'edge.

0 URL indexée à préserver sur l'alias (404 mesuré).
