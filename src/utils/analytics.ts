/** Google Analytics 4. Loads only when a measurement ID is configured (VITE_GA4_ID in the build environment), after the page is idle so it never delays first paint. */
declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } }
const ID = import.meta.env.VITE_GA4_ID as string | undefined;

export function initAnalytics() {
  if (!ID || !/^G-[A-Z0-9]+$/.test(ID)) return;
  const load = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer!.push(arguments); };
    window.gtag('js', new Date()); window.gtag('config', ID);
    const s = document.createElement('script'); s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`; document.head.appendChild(s);
  };
  if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 4000 }); else setTimeout(load, 2000);
}

/** Key event for a successful contact-form submit (mark `generate_lead` as a key event in GA4). */
export const trackLead = () => { window.gtag?.('event', 'generate_lead', { form_name: 'contact' }); };
