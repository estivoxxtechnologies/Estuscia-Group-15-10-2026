import Reveal from '../components/ui/Reveal';
import Split from '../components/ui/Split';
import { WHAT_WE_DO } from '../data/whatWeDo';

/** Plain-text "What we do" paragraph near the top. Renders only once the text is supplied (src/data/whatWeDo.ts). */
export default function WhatWeDo() {
  if (!WHAT_WE_DO.text) return null;
  return (
    <section id="what"><div className="wrap">
      <Reveal as="span" className="eyebrow">What we do</Reveal>
      {WHAT_WE_DO.heading && <Split text={WHAT_WE_DO.heading} />}
      <Reveal as="p" className="lead">{WHAT_WE_DO.text}</Reveal>
    </div></section>
  );
}
