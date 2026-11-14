import { CSSProperties, useState } from 'react';
import Reveal from '../components/ui/Reveal';
import Split from '../components/ui/Split';
import { SECTORS } from '../data/sectors';

const N = SECTORS.length;
/** Position of node i on the ring, in % of the square (starts at 12 o'clock, clockwise). */
const at = (i: number, r = 40) => { const a = (-90 + (360 / N) * i) * Math.PI / 180; return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) }; };
const Icon = ({ d, size }: { d: string; size: number }) => <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>;

/** "Where We Invest" — sectors sit on a ring around a glowing core (echoing the ecosystem diagram). Hover / tap / focus a node to read it; no auto-play. */
export default function Sectors() {
  const [i, setI] = useState(0), s = SECTORS[i], num = String(i + 1).padStart(2, '0');
  return (
    <section id="sectors"><div className="wrap">
      <Reveal as="span" className="eyebrow">Investment Sectors</Reveal>
      <Split text="Where We *Invest.*" />
      <Reveal className="orb-wrap">
        <div className="orb" role="group" aria-label="Investment sectors">
          <svg className="orb-bg" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="48" className="r3" /><circle cx="50" cy="50" r="40" className="r1" /><circle cx="50" cy="50" r="24" className="r2" />
            {SECTORS.map((_, k) => { const a = at(k, 24), b = at(k, 33.6); return <line key={k} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={k === i ? 'sp on' : 'sp'} />; })}
          </svg>
          <div className="orb-core" aria-live="polite">
            <span className="oc-i"><Icon d={s.d} size={30} /></span>
            <span className="oc-n">{num} / {String(N).padStart(2, '0')}</span>
            <strong key={s.name}>{s.name}</strong>
          </div>
          {SECTORS.map((x, k) => {
            const p = at(k); return (
              <button key={x.name} type="button" className={'orb-node' + (k === i ? ' on' : '')} style={{ left: p.x + '%', top: p.y + '%' } as CSSProperties}
                aria-label={x.name} aria-pressed={k === i} onClick={() => setI(k)} onFocus={() => setI(k)} onMouseEnter={() => setI(k)}>
                <Icon d={x.d} size={20} />
              </button>);
          })}
        </div>
        <ul className="vh" aria-label="All investment sectors">
          {SECTORS.map(x => (
            <li key={x.name}>
              <h3>{x.name}</h3>
              <p>{x.desc}</p>
            </li>
          ))}
        </ul>
        <div className="orb-detail">
          <span className="od-n" aria-hidden="true">{num}</span>
          <h3 key={'h' + s.name}>{s.name}</h3>
          <p key={'p' + s.name}>{s.desc}</p>
          <ul className="od-chips" aria-label="All sectors">
            {SECTORS.map((x, k) => <li key={x.name}><button type="button" className={k === i ? 'on' : ''} onClick={() => setI(k)} onMouseEnter={() => setI(k)}>{x.name}</button></li>)}
          </ul>
        </div>
      </Reveal>
    </div></section>
  );
}
