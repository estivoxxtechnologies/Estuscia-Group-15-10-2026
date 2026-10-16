import { useState, type MouseEvent } from 'react';
import { ASSETS } from '../../config/site';
import { NAV_ITEMS } from '../../config/sections';
import { scrollToSection } from '../../utils/scroll';

/** Compact single-row glass navbar with scroll-spy highlight. Links never change the URL. */
export default function Navbar({ active, onNavigate, reduce }: { active: string; onNavigate: (id: string) => void; reduce: boolean }) {
  const [open, setOpen] = useState(false);
  const go = (e: MouseEvent, id: string) => { e.preventDefault(); setOpen(false); onNavigate(id); scrollToSection(id, reduce); };
  return (
    <nav className={open ? 'open' : ''} aria-label="Primary">
      <a className="lg" href="/" aria-label="Estuscia Group home" onClick={e => go(e, 'hero')}><img src={ASSETS.logo} alt="Estuscia Group" /></a>
      <ul id="menu">{NAV_ITEMS.map(i => <li key={i.id}><a href="/" className={active === i.id ? 'on' : ''} aria-current={active === i.id ? 'true' : undefined} onClick={e => go(e, i.id)}>{i.label}</a></li>)}</ul>
      <a className="btn p" href="/" onClick={e => go(e, 'contact')}>Get in Touch</a>
      <button className="bg2" aria-label="Menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(o => !o)}><span /><span /></button>
    </nav>
  );
}
