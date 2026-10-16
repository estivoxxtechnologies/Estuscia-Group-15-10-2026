import { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Split from '../components/ui/Split';
import { WHY } from '../data/why';
import { S } from '../scene/state';
import { clamp } from '../utils/scroll';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useShown } from '../hooks/useShown';
gsap.registerPlugin(ScrollTrigger);

/**
 * Desktop: sticky scene — pillars rise in 3D while each strength lights up as you scroll.
 * Mobile / reduced motion: a normal section (no pinning, no overlap) — items and pillars fade in once when it comes into view.
 */
export default function WhyUs({ reduce }: { reduce: boolean }) {
  const mobile = useMediaQuery('(max-width: 900px)'), plain = reduce || mobile;
  const [lit, setLit] = useState(reduce ? WHY.length : 0);
  const [listRef, shown] = useShown<HTMLOListElement>(plain && !reduce, '0px 0px -15% 0px');

  useLayoutEffect(() => {                                   // desktop: scroll-driven
    if (plain) return;
    const st = ScrollTrigger.create({ trigger: '#why', start: 'top top', end: 'bottom bottom', onUpdate: s => {
      S.pillars = clamp(s.progress * 1.15) * 5; setLit(S.pillars > 0.15 ? Math.min(WHY.length, Math.floor(S.pillars - 0.15) + 1) : 0);
    } });
    return () => st.kill();
  }, [plain]);

  useEffect(() => {                                         // mobile: time-based fade-in when the section is reached
    if (reduce) { S.pillars = WHY.length; setLit(WHY.length); return; }
    if (!plain || !shown) return;
    setLit(WHY.length);
    const t = gsap.to(S, { pillars: 5, duration: 3.4, ease: 'power2.out', delay: 0.3 });
    return () => { t.kill(); };
  }, [plain, shown, reduce]);

  return (
    <section className={'scene' + (plain ? ' plain' : '')} id="why"><div className="stick"><div className="wrap"><div className="why-l">
      <span className="eyebrow">Why Estuscia</span>
      <Split text="Built on Trust. *Powered by Partnership.*" />
      <ol ref={listRef} className="whylist">{WHY.map((w, i) => (
        <li key={w.title} className={i < lit ? 'on' : ''} style={plain ? { transitionDelay: `${0.2 + i * 0.18}s` } : undefined}>
          <small>{String(i + 1).padStart(2, '0')}</small><div><h3>{w.title}</h3><p>{w.text}</p></div></li>))}</ol>
    </div></div></div></section>
  );
}
