import { CSSProperties, useState } from 'react';
import Reveal from '../components/ui/Reveal';
import Split from '../components/ui/Split';
import { useShown } from '../hooks/useShown';
import { TEAM } from '../data/team';
import { ASSETS } from '../config/site';
import type { Leader } from '../types';

function Portrait({ leader }: { leader: Leader }) {
  const [bad, setBad] = useState(false), initials = leader.name.split(' ').map(x => x[0]).slice(0, 2).join('');
  return <div className="ph">{initials}{!bad && <img src={ASSETS.team(leader.photo)} alt={leader.name} width={800} height={800} loading="lazy" decoding="async" onError={() => setBad(true)} />}</div>;
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
            <div className="pc-footer">
              <div className="tags">
                {p.tags.map(t => <span key={t}>{t}</span>)}
              </div>

              {p.linkedin && (
                <a
                  className="in"
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} on LinkedIn`}
                  title={`${p.name} on LinkedIn`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="19"
                    height="19"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.44c.98 0 1.79-.77 1.79-1.73V1.73C24 .77 23.19 0 22.22 0Z" />
                  </svg>
                </a>
              )}
            </div>
          </article>))}
      </div>
    </div></section>
  );
}
