import { useState } from 'react';
import Split from '../components/ui/Split';
import { ECOSYSTEM } from '../data/ecosystem';
import { S } from '../scene/state';

/** Plain section: the selected entity changes only when a brand is clicked — scrolling never changes it. */
export default function Ecosystem() {
  const [idx, setIdx] = useState(0), e = ECOSYSTEM[idx];
  const pick = (i: number) => { S.focus = i; setIdx(i); };
  return (
    <section className="ecoplain" id="eco"><div className="wrap">
      <span className="eyebrow">Our Business Ecosystem</span>
      <Split text="One Ecosystem. *Nine Brands.*" />
      <div className="glass eco-card" aria-live="polite"><span className="tg">{e.tag}</span><h3>{e.name}</h3><p>{e.description}</p></div>
      <div className="dots" role="tablist" aria-label="Business entities">{ECOSYSTEM.map((x, i) => <button key={x.name} role="tab" aria-selected={i === idx} className={i === idx ? 'on' : ''} onClick={() => pick(i)}>{x.name}</button>)}</div>
    </div></section>
  );
}
