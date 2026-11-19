# SEO fixes — implementation record (audit of 12 November 2026)

Rule followed: **no visual or design change.** With JavaScript on, every element was measured before/after at desktop and phone widths and is identical.
The build now runs `vite build` and then `scripts/prerender.mjs`, which writes the real page into `dist/index.html`.

## Verify after deploy
`curl -s https://www.estusciagroup.com/ | head -c 4000` → title, H1, JSON-LD; `curl -s https://www.estusciagroup.com/ | grep -c "Estuscia Capital"` → >0.
In the Render build log look for: `[prerender] ✔ home page + 2 pages + 404 + sitemap`. The build **fails** if the content is missing from the HTML.

## Status by item
| # | Item | Status | Where / note |
|---|---|---|---|
| 1 | Pre-render home page | Done | `scripts/prerender.mjs`, `src/entry-server.tsx`; all 9 brands and 13 sectors are in the HTML (screen-reader-only lists; the visible UI is unchanged) |
| 2 | Text visible without JS/animation | Done | Reveal states apply only under `html.js` (set by a one-line script in `<head>`); loader overlay is hidden when JS is off |
| 3 | Crawlable navigation | Done | nav + footer links are `/#about`, `/#eco`, … ; clicking still smooth-scrolls; opening `/#contact` now scrolls there after the loader |
| 4 | Title + description | Done — wording approved by the client | `index.html` (56 / 160 characters) |
| 5 | Social share tags + 1200×630 image | Done — **image is a stand-in** | `public/og-image.png`; replace with the SEO team's file (same name) |
| 6 | Expanded JSON-LD | Done — **pending client values** | `src/config/seo.ts`. Left out until supplied: legalName, geo, hasMap, areaServed, sameAs, founder LinkedIn → fill `src/config/client.ts` |
| 7 | Contact details as crawlable text | Done — confirmed by client | Both phone numbers are active and shown; address is now "HiLITE City, HiLITE Business Park, Tower 1, 7th Floor, Kozhikode – 673014" everywhere (page, footer, schema, legal pages, llms.txt). **Google Business Profile must be changed to the same address** (it currently says Tower 2, 4th floor) |
| 8 | /privacy and /terms | Done — text approved by the client | `scripts/content/pages.mjs`; footer links; in sitemap |
| 9 | GA4 + key event + Search Console | Code ready — **needs IDs** | `src/utils/analytics.ts` (`generate_lead` on a successful form send); set `VITE_GA4_ID`; `GSC_TOKEN` or DNS TXT |
| 10 | Sitemap with lastmod + pages | Done | generated at build; robots.txt unchanged; submit in Search Console |
| 11 | /llms.txt | Done — **draft** | `public/llms.txt`; replace with the SEO team's text |
| 12 | TODO wording / finance wording | Done — client confirmed no further changes | TODO notes removed from the code; response time changed to 12 business hours; the NDA line removed |
| 13 | Speed on phones | Partly done | Three.js is its own chunk loaded after first paint; the intro still waits for it; video loads only when scrolled to (poster first); 3D skipped on save-data/2G. See note |
| 14 | Real pages | Infrastructure done — **copy needed** | add an object to `scripts/content/pages.mjs`; it gets its own title/description/H1, sitemap entry, pre-rendered file |
| 15 | Image sizes + WebP logo | Done | `width`/`height` on logo and team photos; `images/logo.webp` (31 KB vs 75 KB) |
| 16 | Cache headers | Config provided — **apply in Render** | `docs/HOSTING-SETUP.md` |
| 17 | Security headers | Config provided — **apply in Render/Cloudflare** | `docs/HOSTING-SETUP.md` |
| 18 | "What we do" + FAQ | Components ready — **text needed** | `src/data/whatWeDo.ts`, `src/data/faq.ts` (also writes FAQPage schema); nothing shows until filled |
| 19 | Leadership LinkedIn + Person schema | Done | all four leaders link to their LinkedIn and the Person schema carries it |
| 20 | Footer social + sameAs | Done (Instagram, LinkedIn) | Estivoxx link not supplied, so not shown |
| 21 | favicon.ico | Done | `/favicon.ico` (16/32/48), `favicon-48.png`, `favicon.png`, `apple-touch-icon.png` (180) |
| 22 | Heading outline | Done | footer `h4` → `p` (same look); outline is H1 › H2 › H3 › H4 with no skips |
| 23 | onrender.com duplicates | Code done; **dashboard step remains** | see `docs/HOSTING-SETUP.md` |
| 24 | Branded 404 + /index.html redirect | 404 page done; **redirect in Render** | `dist/404.html` |
| 25 | Content roadmap | Plan below | built after items 1–12 |

## Item 12 — closed
The client confirmed the finance wording is accurate and answered the open questions (see Round 2). Nothing else is pending here.

## Item 13 — note on speed
The loader (≥1.3 s) and the hero word-by-word reveal are part of the design and were kept as they are, so the headline appears after them. If the SEO team's mobile LCP target (< 2.5 s) is not met after measuring, the next step is a design decision (shorter loader / earlier hero reveal), not a code fix.

## Item 25 — content roadmap (copy and keywords from the SEO team)
1. Service pages (business consulting, startup support, trade) — `/services/...`
2. One page per brand (9) with its own title, description and H1
3. About page; short articles / brand stories
Each is added as an entry in `scripts/content/pages.mjs`, then appears in the sitemap automatically.

## Round 2 (SEO re-check, 19 November 2026)
| SEO item | Result |
|---|---|
| `lang="en-IN"` | Done (home page and static pages) |
| Duplicate headings in the sliders | Done: the all-brands / all-sectors lists are normal text, not headings. Contact block re-tagged so there are no duplicate headings and no skipped levels (looks identical) |
| 12 business hours / NDA | Done (response promise now "12 business hours"; NDA line removed). Business hours Mon–Sat 09:30–17:30 unchanged |
| Address, both phones, email | Done (see item 7) |
| Instagram, LinkedIn, leader LinkedIn | Done (company links in the footer, leader links on the cards, sameAs in the schema) |
| Cache + security headers, X-Robots-Tag on old services | Must be set in Render/Cloudflare — exact steps in `docs/HOSTING-SETUP.md` |
| GA4 + Search Console | Code ready; waiting for the IDs |
| Test enquiry | After the next deploy, from the live site (contact form not modified apart from the analytics event) |
