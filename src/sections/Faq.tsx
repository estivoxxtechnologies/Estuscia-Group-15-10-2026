import Reveal from '../components/ui/Reveal';
import Split from '../components/ui/Split';
import { FAQ } from '../data/faq';

/** Short visible FAQ (also written as FAQPage schema). Renders only once questions are supplied (src/data/faq.ts). */
export default function Faq() {
  if (!FAQ.length) return null;
  return (
    <section id="faq"><div className="wrap">
      <Reveal as="span" className="eyebrow">FAQ</Reveal>
      <Split text="Frequently *Asked Questions*" />
      <div className="faq">{FAQ.map(f => <Reveal className="fq" key={f.q}><h3>{f.q}</h3><p>{f.a}</p></Reveal>)}</div>
    </div></section>
  );
}
