import Split from '../components/ui/Split';
import { WHY } from '../data/why';
import { useShown } from '../hooks/useShown';

/** Low-contrast static gradient graph behind the section — decorative only, it never builds or moves on scroll. */
function WhyGraph() {
  return (
    <svg className="whygraph" viewBox="0 0 600 300" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="wgA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7c5cff" stopOpacity=".42" /><stop offset="1" stopColor="#7c5cff" stopOpacity="0" /></linearGradient>
        <linearGradient id="wgB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b9a7ff" stopOpacity=".28" /><stop offset="1" stopColor="#b9a7ff" stopOpacity="0" /></linearGradient>
      </defs>
      <g fill="url(#wgB)">{[[40, 100], [100, 120], [160, 110], [220, 150], [280, 140], [340, 180], [400, 170], [460, 210], [520, 230]].map(([x, h]) => <rect key={x} x={x} y={300 - h} width="34" height={h} />)}</g>
      <path d="M0 240 C80 225 120 200 190 185 S310 150 370 115 S510 60 600 40 L600 300 L0 300Z" fill="url(#wgA)" />
      <path d="M0 240 C80 225 120 200 190 185 S310 150 370 115 S510 60 600 40" fill="none" stroke="rgba(185,167,255,.5)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** A normal section on every screen size: the strengths fade in once when reached (no pinning, no scroll-built graph). */
export default function WhyUs({ reduce }: { reduce: boolean }) {
  const [listRef, shown] = useShown<HTMLOListElement>(!reduce, '0px 0px -15% 0px'), on = reduce || shown;
  return (
    <section className="whyplain" id="why">
      <WhyGraph />
      <div className="wrap"><div className="why-l">
        <span className="eyebrow">Why Estuscia</span>
        <Split text="Built on Trust. *Powered by Partnership.*" />
        <ol ref={listRef} className="whylist">{WHY.map((w, i) => (
          <li key={w.title} className={on ? 'on' : ''} style={{ transitionDelay: `${0.2 + i * 0.18}s` }}>
            <small>{String(i + 1).padStart(2, '0')}</small><div><h3>{w.title}</h3><p>{w.text}</p></div></li>))}</ol>
      </div></div>
    </section>
  );
}
