# T0 — www SSL / canonical hygiene (run-003)

Date: 2026-09-04 · Branch: `cursor/www-ssl-canonical-hygiene-2f3d` · Rollback: `c795105` (`main`)

Toutes les lignes ci-dessous proviennent de commandes réellement exécutées (Loi #1). Aucun chiffre inventé.

## Live apex — OK

`curl -sI https://iptvmzansi.com` → **HTTP/2 307** `location: /en-za/` (`server: Vercel`, `x-mz-path: /`).

Follow: 307 `/en-za/` → 308 `/en-za` → 200 `/[locale]`.

Certificat apex (`openssl s_client -servername iptvmzansi.com`):

- CN = `iptvmzansi.com`
- SAN = **DNS:iptvmzansi.com uniquement**
- Let's Encrypt YR2 · notBefore=2026-07-05 · notAfter=2026-10-03

## Live www — TLS SAN mismatch (le bug)

DNS (2026-09-04):

- `iptvmzansi.com` A → `216.198.79.1`
- `www.iptvmzansi.com` CNAME → `iptvmzansi.com.` → même A `216.198.79.1`

`curl -svI https://www.iptvmzansi.com` :

- Handshake TLS aboutit, mais **`subjectAltName does not match www.iptvmzansi.com`**
- Cert présenté = le certificat apex (SAN apex only)
- Curl abort : `SSL: no alternative certificate subject name matches target host name 'www.iptvmzansi.com'`

`curl -sI http://www.iptvmzansi.com` → **308** `Location: https://www.iptvmzansi.com/` (upgrade HTTPS Vercel **avant** le handshake, donc le navigateur tombe sur le SAN mismatch).

`curl -skI https://www.iptvmzansi.com/en-za/` (TLS ignoré) → **307** `location: https://iptvmzansi.com/en-za/` (Vercel tente déjà un redirect path-preserving, **temporaire**). Idem pour `/af/dstv-alternative/`. Le navigateur n'atteint jamais ce 307 tant que le SAN www est absent.

## Canonical + hreflang live (à préserver)

`curl -sL https://iptvmzansi.com/en-za` :

- canonical = `https://iptvmzansi.com/en-za/` (apex)
- hreflang réciproques + `x-default` → `https://iptvmzansi.com/en-za/`
- 12 locales réelles, toutes **HTTP 200** : `en-za en-gb en-au en-us af zu xh pt-mz en-zw fr en-ae en-nz`

Sitemap live : `loc` et `xhtml:link` sont déjà apex. Aucune URL `www.` dans les canonicals observés.

## In-repo T0

- `SITE_URL` / `SITE.domain` = `https://iptvmzansi.com` (apex) — OK
- `middleware.ts` : headers locale seulement, **pas** de redirect www
- **Pas de `vercel.json`**
- WhatsApp fallback code = `447307410512` (`lib/locales.ts`, `components/shared/site.ts`)
- FAQPage + ContactPoint homepage ; HowTo sur pillars avec `steps[]` ; pas de `mailto:` publié ; pas d'`aggregateRating` inventé

## Cause

`www.iptvmzansi.com` n'est pas un domaine projet Vercel (certificat émis pour l'apex seul). Le CNAME www existe, donc le trafic arrive sur l'edge Vercel avec un certificat sans SAN www.

## Hors de ce PR (action humaine Vercel)

Ajouter `www.iptvmzansi.com` au projet (Settings → Domains) **sans** inverser le canonique vers www. Documenté dans `docs/WWW-DOMAIN.md`. Ce PR ne peut pas émettre le certificat.
