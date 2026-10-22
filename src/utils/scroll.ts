/** Smooth scroll to a section WITHOUT touching the URL (no #hash). */
export function scrollToSection(id: string, reduce = false) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop, behavior: reduce ? 'auto' : 'smooth' });
}
export const clearHash = () => { if (location.hash) history.replaceState(null, '', location.pathname + location.search); };
export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
/** Smooth scroll so an element sits centred in the viewport (no #hash). */
export function scrollToCentered(id: string, reduce = false) {
  const el = document.getElementById(id); if (!el) return;
  const r = el.getBoundingClientRect(), top = r.top + window.scrollY - Math.max(0, (window.innerHeight - r.height) / 2);
  window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' });
}
