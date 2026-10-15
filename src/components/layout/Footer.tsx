import type { MouseEvent } from 'react';
import { ASSETS, SITE } from '../../config/site';
import { NAV_ITEMS } from '../../config/sections';
import { scrollToSection } from '../../utils/scroll';

export default function Footer({ reduce }: { reduce: boolean }) {
  const go = (e: MouseEvent, id: string) => { e.preventDefault(); scrollToSection(id, reduce); };
  return (
    <footer>
      <div className="fg">
        <div><img src={ASSETS.logo} alt="Estuscia Group" /><p>Building a Trusted Ecosystem — a multi-business ecosystem driving sustainable growth across finance, consulting, technology, trade, and venture incubation.</p></div>
        <div><h4>Navigate</h4><ul>{NAV_ITEMS.map(i => <li key={i.id}><a href="/" onClick={e => go(e, i.id)}>{i.label}</a></li>)}</ul></div>
        <div><h4>Contact</h4><ul><li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>{SITE.phones.map(p => <li key={p.tel}><a href={`tel:${p.tel}`}>{p.label}</a></li>)}<li>{SITE.office.address}</li></ul></div>
      </div>
      <p className="copy">© {new Date().getFullYear()} Estuscia Group. {/* TODO: add legal, privacy and disclosure links from the live site */}</p>
    </footer>
  );
}
