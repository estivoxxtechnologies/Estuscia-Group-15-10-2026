import { useState } from 'react';
import Split from '../components/ui/Split';
import { ECOSYSTEM } from '../data/ecosystem';
import { S } from '../scene/state';

/** Ecosystem: brand details change only when a brand is selected. */
export default function Ecosystem({ reduce: _reduce }: { reduce: boolean }) {
  const [idx, setIdx] = useState(0);
  const e = ECOSYSTEM[idx];

  const selectBrand = (i: number) => {
    setIdx(i);
    S.focus = i;
  };

  return (
    <section className="scene eco" id="eco">
      <div className="stick">
        <div className="wrap">
          <span className="eyebrow">Our Business Ecosystem</span>

          <Split text="One Ecosystem. *Nine Brands.*" />

          <div className="glass eco-card" aria-live="polite">
            <span className="tg">{e.tag}</span>
            <h3>{e.name}</h3>
            <p>{e.description}</p>
          </div>

          <div
            className="dots"
            role="tablist"
            aria-label="Business entities"
          >
            {ECOSYSTEM.map((x, i) => (
              <button
                key={x.name}
                type="button"
                role="tab"
                aria-selected={i === idx}
                className={i === idx ? 'on' : ''}
                onClick={() => selectBrand(i)}
              >
                {x.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}