import { useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Split from '../components/ui/Split';
import { ECOSYSTEM } from '../data/ecosystem';
import { S } from '../scene/state';
import { clamp } from '../utils/scroll';
gsap.registerPlugin(ScrollTrigger);

/** Sticky scene: scrolling orbits the 3D network and brings each business entity into focus. */
export default function Ecosystem({ reduce }: { reduce: boolean }) {
  const [idx, setIdx] = useState(0), e = ECOSYSTEM[idx];
  useLayoutEffect(() => {
    if (reduce) return;
    const st = ScrollTrigger.create({ trigger: '#eco', start: 'top top', end: 'bottom bottom', onUpdate: s => {
      S.orbit = s.progress * Math.PI * 1.4; const i = clamp(Math.floor(s.progress * 9.99), 0, 8); S.focus = i; setIdx(i);
    } });
    return () => st.kill();
  }, [reduce]);
  const jump = (i: number) => {
    S.focus = i; setIdx(i);
    const el = document.getElementById('eco'); if (!el || reduce) return;
    window.scrollTo({ top: el.offsetTop + ((i + 0.5) / 9.99) * (el.offsetHeight - innerHeight), behavior: 'smooth' });
  };
  return (
    <section className="scene eco" id="eco"><div className="stick"><div className="wrap">
      <span className="eyebrow">Our Business Ecosystem</span>
      <Split text="One Ecosystem. *Nine Brands.*" />
      <div className="glass eco-card" aria-live="polite"><span className="tg">{e.tag}</span><h3>{e.name}</h3><p>{e.description}</p></div>
      <div className="dots" role="tablist" aria-label="Business entities">{ECOSYSTEM.map((x, i) => <button key={x.name} role="tab" aria-selected={i === idx} className={i === idx ? 'on' : ''} onClick={() => jump(i)}>{x.name}</button>)}</div>
    </div></div></section>
  );
}
