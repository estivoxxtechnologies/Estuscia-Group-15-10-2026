/** Single source for everything search engines read: page title/description, social tags, structured data (JSON-LD).
 *  Pure data + string building (no browser APIs) so it can run at build time. Visible-page values come from SITE / ECOSYSTEM / TEAM,
 *  so the schema always matches what visitors see. Fields set to `null` are NOT written anywhere until the client supplies them. */
import { SITE } from './site';
import { ECOSYSTEM } from '../data/ecosystem';
import { TEAM } from '../data/team';
import { FAQ } from '../data/faq';
import { CLIENT } from './client';

export const ORIGIN = 'https://www.estusciagroup.com';
export const abs = (path: string) => ORIGIN + (path.startsWith('/') ? path : '/' + path);

export { CLIENT };

/** Visible-page office address, split into schema fields (street line = what the page shows). */
const OFFICE = { streetAddress: 'Hilite Business Park', addressLocality: 'Kozhikode', addressRegion: 'Kerala', postalCode: '673014', addressCountry: 'IN' };

const clean = <T,>(o: T): T => JSON.parse(JSON.stringify(o, (_k, v) => (v === null || v === undefined || v === '' ? undefined : v)));
export const sameAs = () => [CLIENT.social.instagram, CLIENT.social.linkedin, CLIENT.social.estivoxx].filter(Boolean) as string[];

export function buildJsonLd(): string {
  const phone = SITE.phones[0].tel;
  const brands = ECOSYSTEM.filter(e => !e.comingSoon && e.name !== SITE.name);
  const hq = TEAM[0];
  const graph = [
    { '@type': 'WebSite', '@id': ORIGIN + '/#website', name: 'Estuscia Group', alternateName: ['Estuscia', 'Estusciagroup', 'www.estusciagroup.com'], url: ORIGIN + '/', inLanguage: 'en-IN' },
    {
      '@type': 'Organization', '@id': ORIGIN + '/#org', name: 'Estuscia Group', alternateName: 'Estuscia', legalName: CLIENT.legalName, url: ORIGIN + '/',
      logo: { '@type': 'ImageObject', url: abs('/images/logo.png'), width: 2236, height: 403 },
      email: SITE.email, telephone: phone,
      address: { '@type': 'PostalAddress', ...OFFICE },
      founder: { '@type': 'Person', name: hq.name, jobTitle: hq.role, sameAs: CLIENT.linkedinFounder, worksFor: { '@id': ORIGIN + '/#org' } },
      employee: TEAM.map(p => ({ '@type': 'Person', name: p.name, jobTitle: p.role, sameAs: p.linkedin })),
      sameAs: sameAs(),
      subOrganization: brands.map(b => ({ '@type': 'Organization', name: b.name, url: b.name === 'Estivoxx Technology' ? 'https://estivoxx.com/' : undefined })),
    },
    {
      '@type': 'ProfessionalService', '@id': ORIGIN + '/#local', name: 'Estuscia Group', url: ORIGIN + '/', image: abs('/images/logo.png'),
      parentOrganization: { '@id': ORIGIN + '/#org' }, telephone: phone, email: SITE.email,
      address: { '@type': 'PostalAddress', ...OFFICE },
      geo: CLIENT.geo ? { '@type': 'GeoCoordinates', ...CLIENT.geo } : null,
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:30', closes: '17:30' }],
      hasMap: CLIENT.hasMap, areaServed: CLIENT.areaServed,
    },
    FAQ.length ? { '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) } : null,
  ];
  return JSON.stringify(clean({ '@context': 'https://schema.org', '@graph': graph.filter(Boolean) }), null, 2);
}
