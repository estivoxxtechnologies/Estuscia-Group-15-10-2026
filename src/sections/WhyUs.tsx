import { useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Split from '../components/ui/Split';
import { WHY } from '../data/why';
import { S } from '../scene/state';
import { clamp } from '../utils/scroll';
gsap.registerPlugin(ScrollTrigger);

/** Sticky scene: pillars rise in 3D while each strength lights up. */
export default function WhyUs({ reduce }: { reduce: boolean }) {
  const [lit, setLit] = useState(reduce ? WHY.length : 0);
  useLayoutEffect(() => {
    if (reduce) { S.pillars = WHY.length; return; }
    const st = ScrollTrigger.create({ trigger: '#why', start: 'top top', end: 'bottom bottom', onUpdate: s => {
      S.pillars = clamp(s.progress * 1.15) * 5;
      const n = Math.floor(S.pillars - 0.15) + 1; setLit(Math.max(0, Math.min(WHY.length, S.pillars > 0.15 ? n : 0)));
    } });
    return () => st.kill();
  }, [reduce]);
  return (
    <section className="scene" id="why"><div className="stick"><div className="wrap"><div className="why-l">
      <span className="eyebrow">Why Estuscia</span>
      <Split text="Built on Trust. *Powered by Partnership.*" />
      <ol className="whylist">{WHY.map((w, i) => <li key={w.title} className={i < lit ? 'on' : ''}><small>{String(i + 1).padStart(2, '0')}</small><div><h3>{w.title}</h3><p>{w.text}</p></div></li>)}</ol>
    </div></div></div></section>
  );
}
