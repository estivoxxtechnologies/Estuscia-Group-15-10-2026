import Reveal from '../components/ui/Reveal';
import Split from '../components/ui/Split';

const MISSION = [
  'Empower early-stage and growth startups with capital and guidance',
  'Optimize operational, legal, and regulatory compliance',
  'Foster cross-border trade and technological advancement',
];

const VISION = [
  'Global benchmark in diversified business incubation',
  'Commitment to institutional transparency',
  'Long-term value creation for partners and investors',
];

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <Reveal as="span" className="eyebrow">
          About Estuscia Group
        </Reveal>

        <Split text="Building Innovative Companies *Across Industries*" />

        <Reveal as="p" className="lead">
          Estuscia Group, also known as Estuscia, is a diversified business ecosystem spanning financial services, business consulting, technology, media, trade, and startup development.
        </Reveal>

        <div className="cols">
          <Reveal>
            <h3>Our Mission</h3>
            <p>
              Creating businesses that solve real-world challenges while
              empowering entrepreneurs, startups and organizations through
              strategic financial, legal and operational support.
            </p>
            <ul className="chk">
              {MISSION.map(m => <li key={m}>{m}</li>)}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h3>Our Vision</h3>
            <p>
              To build a trusted global business ecosystem that drives
              sustainable innovation and long-term value creation.
            </p>
            <ul className="chk">
              {VISION.map(m => <li key={m}>{m}</li>)}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <h3>Core Belief</h3>
            <p className="v quote">
              “Sustainable growth is achieved through transparency,
              innovation, and strong business foundations.”
            </p>
            <p>
              Built on institutional governance, scalable technology and
              risk-managed capital structuring.
            </p>
          </Reveal>
        </div>

        <Reveal className="trust">
          <span>Transparency</span>
          <span>Governance</span>
          <span>Responsibility</span>
        </Reveal>
      </div>
    </section>
  );
}
