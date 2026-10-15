import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ASSETS } from '../../config/site';

/** Short, honest loader (≈1.3s min, 3s max). The page is already rendering underneath it. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let alive = true;
    const ready = Promise.race([Promise.all([document.fonts?.ready, new Promise(r => setTimeout(r, 1300))]), new Promise(r => setTimeout(r, 3000))]);
    ready.then(() => { if (alive) gsap.to(ref.current, { opacity: 0, duration: 0.7, onComplete: onDone }); });
    return () => { alive = false; };
  }, [onDone]);
  return <div id="ld" ref={ref} role="status" aria-label="Loading"><img src={ASSETS.logo} alt="Estuscia" /><i /></div>;
}
