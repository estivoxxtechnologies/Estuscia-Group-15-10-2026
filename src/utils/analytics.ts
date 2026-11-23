/** Google Analytics 4 is loaded by the gtag.js snippet in index.html (<head>). This file only sends the conversion event. */
declare global { interface Window { gtag?: (...args: unknown[]) => void } }

/** GA4 event for a successful contact-form submit (mark `generate_lead` as a key event in GA4). */
export const trackLead = () => { window.gtag?.('event', 'generate_lead', { form_name: 'contact' }); };
