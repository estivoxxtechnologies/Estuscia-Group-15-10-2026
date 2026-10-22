import type { EcosystemEntity } from '../types';
// Ecosystem structure (order matters). The last item is a deliberate teaser — it must NOT reveal any name or detail until launch.
// TODO: confirm the Prodxtoria Pictures description below (placeholder wording) and the other descriptions against the live site.
export const ECOSYSTEM: EcosystemEntity[] = [
  { name: 'Estuscia Group', tag: 'Parent ecosystem & governance holding', description: 'Group strategy, cross-entity synergies, executive advisory and global venture incubation.' },
  { name: 'Estuscia Capital', tag: 'Financial services & capital advisory', description: 'Financial engineering, debt and equity advisory, venture funding and capital structuring.' },
  { name: 'Estivoxx Technology', tag: 'Technology company', description: 'Enterprise software, AI integration, cloud infrastructure and automated workflows.' },
  { name: 'Prodxtoria Pictures', tag: 'Media & production', description: 'Creative media and production within the Estuscia ecosystem.' },
  { name: 'Zedeo Cart', tag: 'E-commerce', description: 'Digital storefronts, cross-border payment integration, inventory logistics and merchant growth.' },
  { name: 'AnWild Fashion', tag: 'Fashion & apparel', description: 'Apparel and textile production, premium streetwear and international retail.' },
  { name: 'Estuscia Global', tag: 'Global trade division', description: 'International distribution, supply-chain logistics, trade finance and customs clearance.' },
  { name: 'Chai With Trade', tag: 'B2B trade networking platform', description: 'Connecting traders, exporters, manufacturers and corporate buyers.' },
  { name: 'MaQcala Perfumes', tag: 'Luxury fragrance', description: 'Artisanal scents, signature formulations and luxury retail distribution.' },
  { name: 'Something is coming…', tag: 'Coming soon', description: 'A new chapter in the Estuscia ecosystem is taking shape. Stay tuned.', comingSoon: true },
];
