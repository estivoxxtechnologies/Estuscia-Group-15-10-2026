import { ReactNode } from 'react';
import { SITE } from '../../config/site';
import Reveal from '../../components/ui/Reveal';

const Icon = ({ children }: { children: ReactNode }) => <i><svg viewBox="0 0 24 24" aria-hidden="true">{children}</svg></i>;

export default function ContactInfo() {
  return (
    <Reveal className="glass cpanel">
      <div><span className="eyebrow">Headquarters</span><p className="hq">{SITE.name}</p><p className="sm">A multi-business ecosystem driving sustainable growth across finance, consulting, tech, trade, and venture incubation.</p></div>
      <div className="ci"><Icon><path d="M3 21h18M5 21V4l8-1v18M13 8h6v13M8 8h2M8 12h2M8 16h2" /></Icon><div><h3>Registered Office</h3><b>{SITE.office.name}</b><p className="sm">{SITE.office.address}</p></div></div>
      <div className="ci"><Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Icon><div><h3>Email Communications</h3><a href={`mailto:${SITE.email}`} className="v">{SITE.email}</a><p className="sm">{SITE.responseTime}</p></div></div>
      <div className="ci"><Icon><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" /></Icon><div><h3>Corporate Hotline</h3><b>{SITE.phones.map((p, i) => <span key={p.tel}>{i > 0 && ' | '}<a href={`tel:${p.tel}`}>{p.label}</a></span>)}</b></div></div>
      <div className="ci"><Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon><div><h3>Business Hours</h3><b>{SITE.hours.line}</b><p className="sm">{SITE.hours.note}</p></div></div>
    </Reveal>
  );
}
