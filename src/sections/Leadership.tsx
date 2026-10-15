import { CSSProperties, useState } from 'react';
import Reveal from '../components/ui/Reveal';
import Split from '../components/ui/Split';
import { useShown } from '../hooks/useShown';
import { TEAM } from '../data/team';
import { ASSETS } from '../config/site';
import type { Leader } from '../types';

function Portrait({ leader }: { leader: Leader }) {
  const [bad, setBad] = useState(false), initials = leader.name.split(' ').map(x => x[0]).slice(0, 2).join('');
  return <div className="ph">{initials}{!bad && <img src={ASSETS.team(leader.photo)} alt={leader.name} loading="lazy" onError={() => setBad(true)} />}</div>;
}

/** Cards reveal via a CSS class on the grid, so every profile always appears (no competing animations). */
export default function Leadership() {
  const [ref, shown] = useShown<HTMLDivElement>(true, '0px 0px -5% 0px');
  return (
    <section id="leaders"><div className="wrap">
      <Reveal as="span" className="eyebrow">Leadership &amp; Executive Team</Reveal>
      <Split text="The People *Behind the Ecosystem*" />
      <div ref={ref} className={'team' + (shown ? ' shown' : '')}>
        {TEAM.map((p, i) => (
          <article className="pc" key={p.name} style={{ ['--i' as string]: i } as CSSProperties}>
            <Portrait leader={p} /><h3>{p.name}</h3><span className="eyebrow">{p.role}</span><p>{p.summary}</p>
            <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
          </article>))}
      </div>
    </div></section>
  );
}
