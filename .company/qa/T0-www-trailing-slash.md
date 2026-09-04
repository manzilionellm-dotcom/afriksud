# T0 — www 308 vs trailing-slash (run-004)

Date: 2026-09-04 · Branch: `cursor/www-308-before-slash-2f3d` · Base: `origin/main` `18c1b50` (PR #12 merged)

Commandes réelles (Loi #1).

## Live after PR #12 + www added on Vercel

Cert www SAN = `DNS:www.iptvmzansi.com` (TLS OK).

| Request | First hop |
|---|---|
| `https://www.iptvmzansi.com/` | **308** `https://iptvmzansi.com/` (host redirect works) |
| `https://www.iptvmzansi.com/en-za` | **308** `https://iptvmzansi.com/en-za` |
| `https://www.iptvmzansi.com/en-za/` | **308 `Location: /en-za`** — **same host** |
| `https://www.iptvmzansi.com/af/` | 308 `/af` same host |
| `https://www.iptvmzansi.com/zu/` | 308 `/zu` same host |
| `https://www.iptvmzansi.com/fr/dstv-alternative/` | 308 `/fr/dstv-alternative` same host |
| `https://www.iptvmzansi.com/en-za/?utm=x` | 308 `/en-za?utm=x` same host |

Cause: Next.js trailing-slash 308 (relative) runs **before** `vercel.json` / `next.config.js` host redirects and before middleware. Slashless www URLs leave the host; slashed ones stay on www. Locale 307 `/` → `/en-za/` is the same class of relative hop if the host redirect does not fire.

12 locales unchanged. WhatsApp unchanged. Canonicals/sitemap already apex.

## Fix (this run)

`skipTrailingSlashRedirect: true` so middleware/edge host 308 runs first. Middleware: www → apex (path+query, including trailing slash) then, on apex only, restore slash-strip. `vercel.json` adds an explicit `/:path+/` host rule.
