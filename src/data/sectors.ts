/** Investment sectors. `d` = stroke-only SVG path(s) on a 24×24 grid (line icons, currentColor). */
export interface Sector { name: string; desc: string; d: string }
export const SECTORS: Sector[] = [
  { name: 'Edtech', desc: 'Digital learning platforms and technology-led education.', d: 'M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5' },
  { name: 'Software & Technology', desc: 'Scalable software products and technology services.', d: 'M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14' },
  { name: 'FinTech', desc: 'Payments, lending and modern financial technology.', d: 'M3 6.5h18v11H3zM3 10.5h18M7 14.5h3' },
  { name: 'Ecommerce, B2B & D2C', desc: 'Online marketplaces, B2B trade and direct-to-consumer brands.', d: 'M3 4h2l2.4 10h9.6l2-7.5H6.2M9 19.2a1.2 1.2 0 100 .01M17 19.2a1.2 1.2 0 100 .01' },
  { name: 'Healthcare', desc: 'Healthcare services, diagnostics and digital health.', d: 'M9 3h6v6h6v6h-6v6H9v-6H3V9h6z' },
  { name: 'Logistics & Supply Chain', desc: 'Warehousing, transport and end-to-end supply chain solutions.', d: 'M2 6h11v9H2zM13 9h4l3.5 3.2V15H13zM6.5 18.2a1.8 1.8 0 100 .01M17 18.2a1.8 1.8 0 100 .01' },
  { name: 'Real Estate', desc: 'Property development, management and asset-backed opportunities.', d: 'M4 21V6l8-3v18M12 9h8v12M7.5 9h1M7.5 13h1M7.5 17h1M15.5 13h1M15.5 17h1M3 21h18' },
  { name: 'Media & Creatives', desc: 'Content, production and creative-led businesses.', d: 'M3 5h18v14H3zM10 9l5 3-5 3z' },
  { name: 'AI & Deep Tech', desc: 'Artificial intelligence and frontier technology ventures.', d: 'M7 7h10v10H7zM10 10h4v4h-4zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4' },
  { name: 'Travel & Tourism', desc: 'Travel experiences, hospitality and tourism ventures.', d: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3.2 3 3.2 15 0 18M12 3c-3.2 3-3.2 15 0 18' },
  { name: 'Fashion Manufacturing', desc: 'Apparel design and manufacturing at scale.', d: 'M12 8.5a2 2 0 10-2-2M12 8.5v2M12 10.5L3.2 17c-.9.7-.4 2 .7 2h16.2c1.1 0 1.6-1.3.7-2z' },
  { name: 'Business Solutions', desc: 'Consulting, compliance and operational support for growth.', d: 'M3 8h18v12H3zM9 8V5h6v3M3 13.5h18' },
  { name: 'Aroma Research Centre', desc: 'Research and development in aromatics and natural fragrance.', d: 'M9 3h6M10 3v6L4.6 18.6A1.6 1.6 0 006 21h12a1.6 1.6 0 001.4-2.4L14 9V3M7.5 15h9' },
];
