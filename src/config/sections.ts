export interface SectionDef { id: string; label?: string }
export const SECTIONS: SectionDef[] = [
  { id: 'hero' }, { id: 'about', label: 'About' }, { id: 'why', label: 'Why Us' },
  { id: 'eco', label: 'Ecosystem' }, { id: 'leaders', label: 'Leadership' }, { id: 'contact', label: 'Contact' },
];
export const NAV_ITEMS = SECTIONS.filter(s => s.label) as Required<SectionDef>[];
