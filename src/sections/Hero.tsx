
import Reveal from '../components/ui/Reveal';
import Split from '../components/ui/Split';
import Button from '../components/ui/Button';
import { scrollToSection, scrollToCentered } from '../utils/scroll';

export default function Hero({ ready, reduce }: { ready: boolean; reduce: boolean }) {
  return (
    <section id="hero">
      <Reveal as="span" className="eyebrow" enabled={ready} delay={0.9}>
        Estuscia Group
      </Reveal>

      <Split
        as="h1"
        text="Building a Trusted *Ecosystem.*"
        enabled={ready}
        delay={1}
      />

      <Reveal as="p" className="lead" enabled={ready} delay={1.5}>
        Connecting capital, businesses, partnerships, and opportunities for sustainable growth.
      </Reveal>

      <div className="hero-actions">
        <Reveal className="cta" enabled={ready} delay={1.7}>
          <Button
            primary
            onClick={() => scrollToSection('eco', reduce)}
          >
            Explore Our Ecosystem
          </Button>
        </Reveal>

        <Reveal className="newch-wrap" enabled={ready} delay={1.85}>
          <button
            type="button"
            className="newch"
            onClick={() => scrollToCentered('soon', reduce)}
            aria-label="A new chapter is coming — go to the announcement"
          >
            <span className="nc-badge">New</span>

            <span className="nc-txt">
              <strong>A new chapter is coming</strong>
              <small>Something new is joining the Estuscia ecosystem.</small>
            </span>

            <span className="nc-arrow" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </button>
        </Reveal>
      </div>

      <div className="cue" aria-hidden="true">
        Scroll
      </div>
    </section>
  );
}
