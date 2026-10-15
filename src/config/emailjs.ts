// EmailJS public config (the public key is designed to be used in the browser). Override with VITE_* env vars.
export const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'support_estuscia_2026',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_estuscia_new',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '8sMHg-Kgo0C5ooSg-',
};
