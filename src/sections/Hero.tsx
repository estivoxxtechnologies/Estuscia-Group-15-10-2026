import Reveal from '../components/ui/Reveal';
import Split from '../components/ui/Split';
import Button from '../components/ui/Button';
import { scrollToSection } from '../utils/scroll';

export default function Hero({ ready, reduce }: { ready: boolean; reduce: boolean }) {
  return (
    <section id="hero">
      <Reveal as="span" className="eyebrow" enabled={ready} delay={0.9}>Estuscia Group</Reveal>
      <Split as="h1" text="Building a Trusted *Ecosystem.*" enabled={ready} delay={1} />
      <Reveal as="p" className="lead" enabled={ready} delay={1.5}>Connecting capital, businesses, partnerships, and opportunities for sustainable growth.</Reveal>
      <Reveal className="cta" enabled={ready} delay={1.7}><Button primary onClick={() => scrollToSection('eco', reduce)}>Explore Our Ecosystem</Button></Reveal>
      <Reveal as="p" className="cap" enabled={ready} delay={2}>Illustrative visual of business growth — not investment performance.</Reveal>
      <div className="cue" aria-hidden="true">Scroll</div>
    </section>
  );
}
