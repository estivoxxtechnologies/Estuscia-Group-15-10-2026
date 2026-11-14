# Hosting setup (items 16, 17, 23, 24) — done in Render / Cloudflare, not in code

These need a person with access to the Render dashboard (and Cloudflare). Nothing here changes how the site looks.

## Render (static site) — Settings → Headers
| Path | Name | Value |
|---|---|---|
| `/assets/*` | `Cache-Control` | `public, max-age=31536000, immutable` |
| `/images/*` | `Cache-Control` | `public, max-age=86400` |
| `/videos/*` | `Cache-Control` | `public, max-age=86400` |
| `/*` | `Cache-Control` | `public, max-age=0, must-revalidate` |
| `/*` | `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |
| `/*` | `X-Frame-Options` | `SAMEORIGIN` |
| `/*` | `X-Content-Type-Options` | `nosniff` |
| `/*` | `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `/*` | `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` |

(`/assets/*` files have hashed names, so a year-long cache is safe. The `/*` cache rule is for the HTML.)

## Render — Settings → Redirects/Rewrites
- Redirect `/index.html` → `/` (type: Redirect, 301).
- If `/privacy` or `/terms` (without a trailing slash) does not return 200, add a Rewrite `/privacy` → `/privacy.html` and `/terms` → `/terms.html`. The build writes both `privacy.html` and `privacy/index.html`.
- The build writes `dist/404.html`; Render serves it with a 404 status for unknown URLs.

## If Cloudflare sits in front (it does for the main domain)
Rules → Transform Rules → Modify Response Header: add the same security headers above (Cloudflare can also add HSTS under SSL/TLS → Edge Certificates). Do **not** add a blanket `X-Robots-Tag: noindex` there — it would hit the real domain too.

## Old onrender.com copies (item 23)
- Code: `index.html` adds `noindex, nofollow` whenever the page is opened on a `*.onrender.com` host (works for any copy that is redeployed from this repo).
- Best fix: after the client agrees, suspend the two unused services "Estuscia" and "Estuscia-Group-Latest". Keep the service that holds estusciagroup.com untouched.

## Environment variables (Render → Environment)
- `VITE_GA4_ID` — GA4 measurement ID (`G-XXXXXXXXXX`). Empty = no analytics.
- `GSC_TOKEN` — Search Console meta token (only if verifying by meta tag; DNS TXT in Cloudflare needs no code).
- Keep the existing EmailJS values as they are.
