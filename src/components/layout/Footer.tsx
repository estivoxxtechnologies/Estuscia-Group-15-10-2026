import type { MouseEvent } from 'react';
import { ASSETS, LOGO, SITE } from '../../config/site';
import { CLIENT } from '../../config/client';
import { NAV_ITEMS } from '../../config/sections';
import { scrollToSection } from '../../utils/scroll';

const SOCIAL = ([['Instagram', CLIENT.social.instagram], ['LinkedIn', CLIENT.social.linkedin], ['Estivoxx', CLIENT.social.estivoxx]] as const).filter(([, url]) => url);

export default function Footer({ reduce }: { reduce: boolean }) {
  const go = (e: MouseEvent, id: string) => { e.preventDefault(); scrollToSection(id, reduce); };
  return (
    <footer>
      <div className="fg">
        <div><img src={ASSETS.logo} alt="Estuscia Group" width={LOGO.width} height={LOGO.height} /><p>Building a Trusted Ecosystem — a multi-business ecosystem driving sustainable growth across finance, consulting, technology, trade, and venture incubation.</p></div>
        <div><p className="fh">Navigate</p><ul>{NAV_ITEMS.map(i => <li key={i.id}><a href={`/#${i.id}`} onClick={e => go(e, i.id)}>{i.label}</a></li>)}</ul></div>
        <div><p className="fh">Contact</p><ul><li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>{SITE.phones.map(p => <li key={p.tel}><a href={`tel:${p.tel}`}>{p.label}</a></li>)}<li>{SITE.office.address}</li>
          {SOCIAL.map(([name, url]) => <li key={name}><a href={url!} target="_blank" rel="noopener noreferrer">{name}</a></li>)}</ul></div>
      </div>
      <p className="copy">© {new Date().getFullYear()} Estuscia Group. <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms of Use</a></p>
    </footer>
  );
}
