import { CSSProperties, ElementType } from 'react';
import { useShown } from '../../hooks/useShown';

/** Masked word-by-word headline. Use *text* for violet emphasis. Reveal runs once, when scrolled into view. */
export default function Split({ text, as = 'h2', enabled = true, delay = 0 }: { text: string; as?: ElementType; enabled?: boolean; delay?: number }) {
  const Tag = as, [ref, shown] = useShown<HTMLElement>(enabled);
  let k = 0;
  return (
    <Tag ref={ref} className={'split' + (shown ? ' shown' : '')} style={{ ['--d' as string]: delay + 's' } as CSSProperties}>
      {text.split('*').map((seg, pi) => {
        const words = seg.split(/\s+/).filter(Boolean).map((w, wi) => (
          <span key={wi}><span className="w"><i style={{ ['--i' as string]: k++ } as CSSProperties}>{w}</i></span>{' '}</span>));
        return pi % 2 ? <span key={pi} className="v">{words}</span> : <span key={pi}>{words}</span>;
      })}
    </Tag>
  );
}
