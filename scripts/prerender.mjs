// Runs after `vite build` (see package.json "build"). Turns the empty React shell into real HTML for search engines, link previews and AI assistants:
//   1. renders the real page (same components as the browser) into dist/index.html  → H1, About, Why Us, Ecosystem, Sectors, Leadership, Contact are in the HTML
//   2. writes static pages (privacy, terms, 404 …) from scripts/content/pages.mjs
//   3. injects the JSON-LD (built from src/config/seo.ts) and optional Search Console tag, writes sitemap.xml with lastmod
//   4. self-checks the output and FAILS the build if the content is missing.
// No browser, no extra dependencies: esbuild already ships with Vite and react-dom/server with React.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const tmp = path.join(root, '.prerender-tmp');
const fail = m => { console.error('\n[prerender] ✖ ' + m + '\n'); process.exit(1); };
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

if (!existsSync(path.join(dist, 'index.html'))) fail('dist/index.html not found — run `vite build` first.');
let esbuild; try { esbuild = await import('esbuild'); } catch { fail('esbuild not found (it is installed with Vite). Run `npm install`.'); }

// ---- 1. bundle the server entry (browser-only libraries are stubbed: they are never needed to produce static markup) ----
const stub = {
  name: 'stub-browser-libs',
  setup(b) {
    b.onResolve({ filter: /^(gsap|three|@emailjs\/browser)(\/.*)?$/ }, a => ({ path: a.path, namespace: 'stub' }));
    b.onLoad({ filter: /.*/, namespace: 'stub' }, () => ({ loader: 'js', contents: 'const f=function(){return p};const p=new Proxy(f,{get:()=>p,apply:()=>p});export default p;export const ScrollTrigger=p;' }));
  },
};
await rm(tmp, { recursive: true, force: true });
const out = path.join(tmp, 'entry-server.mjs');
await esbuild.build({
  entryPoints: [path.join(root, 'src/entry-server.tsx')], outfile: out, bundle: true, platform: 'node', format: 'esm', target: 'node18', jsx: 'automatic', logLevel: 'error',
  external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime'], plugins: [stub],
  define: { 'import.meta.env': JSON.stringify({ BASE_URL: '/', MODE: 'production', DEV: false, PROD: true, SSR: true }) },
});
const server = await import(pathToFileURL(out).href);
const { renderPage, renderChrome, buildJsonLd, SITE, ORIGIN, POSTS = [] } = server;

// ---- 2. home page ----
const indexPath = path.join(dist, 'index.html');
let html = await readFile(indexPath, 'utf8');
if (!html.includes('<div id="root"></div>')) fail('Expected an empty <div id="root"></div> in dist/index.html (already pre-rendered?).');
const app = renderPage();
html = html.replace('<div id="root"></div>', () => `<div id="root">${app}</div>`);
const ld = `<script type="application/ld+json">\n${buildJsonLd()}\n</script>`;
html = /<!--jsonld-->[\s\S]*?<!--\/jsonld-->/.test(html) ? html.replace(/<!--jsonld-->[\s\S]*?<!--\/jsonld-->/, () => ld) : html.replace('</head>', () => ld + '\n</head>');
await writeFile(indexPath, html);

// ---- 3. static pages (same stylesheet, navbar and footer as the site) ----
const headLinks = (html.match(/<link [^>]*>/g) || []).filter(l => /rel="(stylesheet|preconnect|icon|apple-touch-icon)"/.test(l)).join('\n');
const { PAGES, NOT_FOUND } = await import(pathToFileURL(path.join(root, 'scripts/content/pages.mjs')).href);
const chrome = renderChrome();
const gaTag = (html.match(/<!-- Google tag \(gtag\.js\) -->[\s\S]*?<\/script>\s*<script>[\s\S]*?<\/script>/) || [''])[0];   // same GA4 snippet as the home page
const pageCss = `.doc{max-width:46rem;margin:0 auto}.doc h1{font-size:clamp(2rem,5vw,3.4rem);margin:.2rem 0 1rem}.doc h2{font:400 1.3rem/1.3 Sora,system-ui,sans-serif;letter-spacing:-.01em;margin:2.2rem 0 .6rem}.doc p,.doc li{color:var(--mute)}.doc p{margin:.6rem 0 0}.doc ul{margin:.6rem 0 0 1.2rem;display:grid;gap:.4rem}.doc a:not(.btn){color:var(--g);text-decoration:underline}.doc b{color:var(--ink);font-weight:500}main.page>section{padding-top:clamp(7rem,16vh,9rem)}.doc .lead{margin-bottom:1rem}.doc .btn{margin-top:1.6rem}`;
const menuJs = `document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.bg2');if(b){var n=b.closest('nav');var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)}})`;
function pageHtml(p, { index = true } = {}) {
  const url = p.slug ? `${ORIGIN}/${p.slug}` : null;
  return `<!DOCTYPE html>
<html lang="en-IN" class="nogl js-off">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="robots" content="${index ? 'index, follow' : 'noindex, follow'}">
<meta name="theme-color" content="#05030d">
${url ? `<link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Estuscia Group"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${ORIGIN}/og-image.png">` : ''}
${headLinks}
${gaTag}
<style>${pageCss}</style>
</head>
<body>
${chrome.nav}
<main class="page"><section><div class="doc">
<span class="eyebrow">${esc(p.eyebrow)}</span>
<h1>${esc(p.h1)}</h1>
<p class="lead">${esc(p.lead)}</p>
${p.body({ SITE })}
</div></section></main>
${chrome.footer}
<script>${menuJs}</script>
</body>
</html>
`;
}
for (const p of PAGES) {
  const h = pageHtml(p);
  await mkdir(path.join(dist, p.slug), { recursive: true });
  await writeFile(path.join(dist, p.slug, 'index.html'), h);   // /privacy/
  await writeFile(path.join(dist, p.slug + '.html'), h);       // /privacy  (hosts that map clean URLs to .html)
}
await writeFile(path.join(dist, '404.html'), pageHtml(NOT_FOUND, { index: false }));

// ---- 4. sitemap.xml (home + every page, with lastmod from the last commit that touched site content) ----
let lastmod = new Date().toISOString().slice(0, 10);
try { const d = execSync('git log -1 --format=%cs -- src public scripts index.html', { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); if (/^\d{4}-\d{2}-\d{2}$/.test(d)) lastmod = d; } catch { /* no git history on the build host: build date is used */ }
const urls = [{ loc: ORIGIN + '/', priority: '1.0' }, ...PAGES.map(p => ({ loc: `${ORIGIN}/${p.slug}`, priority: '0.3' })),
  ...(POSTS.length ? [{ loc: `${ORIGIN}/blog/`, lastmod: POSTS[0].date }] : []), ...POSTS.map(p => ({ loc: `${ORIGIN}/blog/${p.slug}/`, lastmod: p.date }))];
await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod || lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`);

// ---- 5. self-check: fail the deploy if crawlers would get an empty page ----
const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/<!--.*?-->/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
const must = ['Building a Trusted Ecosystem.', 'About Estuscia Group', 'Built on Trust.', 'One Ecosystem. Nine Brands.', 'Where We Invest.', 'Leadership & Executive Team', 'Start the Conversation', SITE.email, SITE.office.address,
  'Estuscia Capital', 'Estivoxx Technology', 'Prodxtoria Pictures', 'Zedeo Cart', 'AnWild Fashion', 'Estuscia Global', 'Chai With Trade', 'MaQcala Perfumes', 'Shahzeen Khalid'];
const missing = must.filter(m => !text.includes(m));
if (missing.length) fail('Pre-rendered home page is missing: ' + missing.join(' | '));
if (!/<h1[ >]/.test(html)) fail('No <h1> in the pre-rendered page.');
await rm(tmp, { recursive: true, force: true });
console.log(`[prerender] ✔ home page + ${PAGES.length} pages + 404 + sitemap (lastmod ${lastmod}); ${(app.length / 1024).toFixed(0)} KB of HTML rendered`);
