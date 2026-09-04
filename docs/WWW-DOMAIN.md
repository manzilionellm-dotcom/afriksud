# Add `www.iptvmzansi.com` on Vercel (SSL SAN)

Canonical host for this site is the **apex**: `https://iptvmzansi.com`.
`www` is not a second site. After TLS works, `www` must **308** to the apex
and keep the path (including the 12 real locales).

This file is the human checklist. Git cannot issue the certificate.

## Why this is required

Measured 2026-09-04 (see `.company/qa/T0-www-ssl.md`):

| Check | Result |
|---|---|
| `https://iptvmzansi.com` | 307 → `/en-za/` |
| Apex certificate SAN | `DNS:iptvmzansi.com` only |
| `www.iptvmzansi.com` DNS | CNAME → `iptvmzansi.com` (same Vercel IP) |
| `https://www.iptvmzansi.com` | TLS abort: **subjectAltName does not match** |
| `http://www.iptvmzansi.com` | 308 → `https://www.iptvmzansi.com/` (HTTPS upgrade, then SAN fail) |

Browsers never reach the app on `www` until Vercel has a certificate whose
SAN includes `www.iptvmzansi.com`. In-repo 308s (`vercel.json` + middleware)
only run **after** the handshake succeeds.

## Do not

- Do **not** make `www` the canonical host. Live canonicals, sitemap and
  hreflang already use `https://iptvmzansi.com/…`.
- Do **not** accept Vercel’s default prompt to redirect **apex → www**.
  If the dashboard offers that, decline it. Redirect **www → apex**.
- Do **not** add, rename, or remove locales. These 12 are live (HTTP 200):
  `en-za`, `en-gb`, `en-au`, `en-us`, `af`, `zu`, `xh`, `pt-mz`, `en-zw`,
  `fr`, `en-ae`, `en-nz`.
- Do **not** point `www` at a different Vercel project.

## Dashboard steps

Official references:

- [Add a custom domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [CLI: `vercel domains add`](https://vercel.com/docs/domains/set-up-custom-domain)

1. Open the **iptvmzansi.com** project on Vercel → **Settings** → **Domains**.
2. **Add** `www.iptvmzansi.com` (subdomain, not a new apex).
3. When Vercel asks to add `www` as the primary domain and redirect the apex
   to `www`, **refuse**. Keep `iptvmzansi.com` as the production domain.
4. On the `www.iptvmzansi.com` row, set **Redirect to** `iptvmzansi.com`
   (308 if the UI offers a status; otherwise 308 is also in `vercel.json`).
5. DNS (already observed as CNAME `www` → `iptvmzansi.com`). If Vercel
   shows Invalid Configuration, set at the registrar:

   ```
   www  CNAME  cname.vercel-dns.com
   ```

   (or the project-specific `*.vercel-dns-*.com` target shown in the domain
   card). Do not delete the apex `A` record that already serves
   `iptvmzansi.com`.
6. Wait until the domain card shows a valid SSL certificate. Confirm SAN:

   ```sh
   echo | openssl s_client -servername www.iptvmzansi.com \
     -connect www.iptvmzansi.com:443 2>/dev/null \
     | openssl x509 -noout -ext subjectAltName
   ```

   Expect `DNS:www.iptvmzansi.com` (alone or together with the apex).

CLI equivalent from a linked project:

```sh
vercel domains add www.iptvmzansi.com
vercel domains inspect www.iptvmzansi.com
vercel certs ls
```

## After SSL is valid — verify the 308

In-repo (`vercel.json` at the Vercel edge, plus `next.config.js` and
`middleware.ts`) 308 `www` → apex and preserve path and query. Edge
redirects run **before** Next.js trailing-slash normalisation, so
`https://www.iptvmzansi.com/en-za/` becomes `https://iptvmzansi.com/en-za/`
in one hop. After the cert includes www:

```sh
curl -sI https://www.iptvmzansi.com/
# 308  Location: https://iptvmzansi.com/

curl -sI https://www.iptvmzansi.com/en-za/
# 308  Location: https://iptvmzansi.com/en-za/

curl -sI https://www.iptvmzansi.com/af/dstv-alternative/
# 308  Location: https://iptvmzansi.com/af/dstv-alternative/

curl -sI https://iptvmzansi.com/en-za/
# still 200 — do not disturb locale routes
```

No redirect chain longer than: HTTP `www` → HTTPS `www` → HTTPS apex
(then the existing apex `/` → `/en-za/` 307, unchanged).

## What this repo already guarantees

- `SITE_URL` / `metadataBase` / sitemap / robots `host` = `https://iptvmzansi.com`
- `hreflangFor()` emits the 12 real locales + `x-default` → `/en-za/`
- Contact remains WhatsApp-only (existing number in code; no `mailto:`)
- No invented `aggregateRating`
