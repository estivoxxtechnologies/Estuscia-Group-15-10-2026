# Hosting setup — things done in Render / Cloudflare, not in code

Nothing here changes how the site looks. Last updated for the SEO re-check of 19 November (round 3).

## 1. Cache headers for /assets/* (SEO item 3)  — Render dashboard
Render → your static site → **Settings → Headers**.
1. **Delete** any row with path `/*` and name `Cache-Control` (an older note of ours suggested one). Render already sends a short cache (`public, max-age=0, must-revalidate`) for HTML by default, and a `/*` row can override the `/assets/*` row — that is the most likely reason `/assets/*` still shows `max-age=0`.
2. Make sure there is exactly one row: Path `/assets/*` · Name `Cache-Control` · Value `public, max-age=31536000, immutable`.
3. Optional: `/images/*` and `/videos/*` · `Cache-Control` · `public, max-age=86400`.
4. Save, then trigger a deploy (Manual Deploy → Deploy latest commit). Header changes apply on the next deploy.
5. Check: `curl -sI https://www.estusciagroup.com/assets/<any-file-from-dist/assets>.js | grep -i cache-control` → must show `max-age=31536000, immutable`. HTML (`curl -sI https://www.estusciagroup.com/`) stays `max-age=0, must-revalidate`.
6. If it still shows a short time and Cloudflare is in front: Cloudflare → Caching → Configuration → **Browser Cache TTL = "Respect Existing Headers"**.

The security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) are already live — keep them as they are.

## 2. Old onrender.com copies (SEO item 4)
**Why not an X-Robots-Tag header:** a Render static-site header applies to *every* address of that service, including www.estusciagroup.com. Adding `X-Robots-Tag: noindex` to the main service would remove the real site from Google. Render cannot add a header only for `*.onrender.com`. So use these two steps instead:
1. **Main service → Settings → Custom Domains → Render Subdomain → Disable** (the `xxxx.onrender.com` address then stops answering; www.estusciagroup.com keeps working). Do this only after you have checked that the custom domain loads.
2. **The two unused services ("Estuscia" and "Estuscia-Group-Latest")** → open each → **Settings → Suspend Service** (do *not* delete). Their onrender.com addresses will stop returning the site.
Until those are done, the page itself adds `noindex, nofollow` when opened on a `*.onrender.com` address (JavaScript backup in `index.html`), and every page has a canonical link to https://www.estusciagroup.com/.

## 3. Redirects / rewrites — Render → Settings → Redirects/Rewrites
- Redirect `/index.html` → `/` (301).
- If `/privacy` or `/terms` (no trailing slash) does not return 200, add Rewrites `/privacy` → `/privacy.html` and `/terms` → `/terms.html`. The build writes both `privacy.html` and `privacy/index.html`.
- The build writes `404.html`; Render serves it with a 404 status for unknown URLs.

## 4. Environment variables
Nothing new is needed. Google Analytics and Search Console are now written directly in `index.html`, so `VITE_GA4_ID` and `GSC_TOKEN` are **no longer used** (if you added them in Render, you can delete them). Keep the EmailJS values as they are.

## 5. After the deploy — quick checks
- View source of the home page: the `google-site-verification` meta tag and the `googletagmanager.com/gtag/js?id=G-HVWF5TRJNG` script are inside `<head>`.
- Search Console → click **Verify**.
- Analytics → Reports → Realtime: open the site, you should appear within a minute. Submit the contact form once and you should see a `generate_lead` event; in Admin → Events mark `generate_lead` as a key event.
- Search Console → Sitemaps → submit `sitemap.xml` (if not already).
