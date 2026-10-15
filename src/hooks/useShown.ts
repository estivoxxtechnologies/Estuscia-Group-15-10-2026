import { useEffect, useRef, useState } from 'react';
/** Adds a one-time "shown" flag when the element scrolls into view (drives CSS reveal transitions). */
export function useShown<T extends HTMLElement>(enabled = true, margin = '0px 0px -8% 0px') {
  const ref = useRef<T>(null), [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el || !enabled || shown) return;
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }), { rootMargin: margin, threshold: 0.05 });
    io.observe(el); return () => io.disconnect();
  }, [enabled, shown, margin]);
  return [ref, shown] as const;
}
