import { CSSProperties, ElementType, ReactNode } from 'react';
import { useShown } from '../../hooks/useShown';

/** Fade/slide-in wrapper. `enabled` lets the hero wait for the loader. */
export default function Reveal({ as = 'div', className = '', delay = 0, enabled = true, children }: { as?: ElementType; className?: string; delay?: number; enabled?: boolean; children: ReactNode }) {
  const Tag = as, [ref, shown] = useShown<HTMLElement>(enabled);
  return <Tag ref={ref} className={`rv ${className} ${shown ? 'shown' : ''}`} style={{ ['--d' as string]: delay + 's' } as CSSProperties}>{children}</Tag>;
}
