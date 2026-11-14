/** Values that must come from / be confirmed by the client. Everything is optional: `null` = not yet provided, so it is left out of the footer, meta tags and structured data (nothing is guessed). */
export const CLIENT = {
  legalName: null as string | null,            // e.g. "Estuscia Group LLP" (Google Business Profile) — registration details to be confirmed
  geo: null as { latitude: number; longitude: number } | null,
  hasMap: null as string | null,               // Google Maps link of the Business Profile
  areaServed: null as string | null,
  social: { instagram: null as string | null, linkedin: null as string | null, estivoxx: null as string | null },   // footer links + sameAs
  linkedinFounder: null as string | null,
  gscToken: null as string | null,             // Search Console meta-tag token (or set GSC_TOKEN in the build environment)
};
