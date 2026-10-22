import { useRef } from 'react';
import { ASSETS } from '../../config/site';
import { useFilmVideo } from '../../hooks/useFilmVideo';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/** "Coming soon" feature panel — no popup. The teaser film plays in the background (its black is blended away so the site's purple shows through);
 *  copy sits above and below the film's own "Coming soon" text. Nine filled dots + one dashed = a tenth brand on its way. Reveals no name. */
export default function ComingSoon() {
  const vid = useRef<HTMLVideoElement>(null), reduce = useReducedMotion();
  useFilmVideo(vid, reduce ? 'still' : 'play');   // poster only when the visitor prefers reduced motion
  return (
    <div className="soon" id="soon" role="note" aria-label="Coming soon: a new chapter in the Estuscia ecosystem. Stay tuned.">
      <video ref={vid} className="soon-vid" muted loop playsInline autoPlay={!reduce} preload="auto" poster={ASSETS.poster} aria-hidden="true"><source src={ASSETS.video} type="video/mp4" /></video>
      <i className="cx tl" /><i className="cx tr" /><i className="cx bl" /><i className="cx br" />
      <div className="soon-top">
        <span className="soon-tag"><b />Chapter 10</span>
        <h3>A new chapter is <em>on its way.</em></h3>
      </div>
      <div className="soon-gap" aria-hidden="true" />
      <div className="soon-bot">
        <p>Nine brands today. A tenth is taking shape inside the Estuscia ecosystem.</p>
        <div className="soon-dots" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} />)}<i className="new" /></div>
      </div>
      <div className="soon-ticks" aria-hidden="true" />
    </div>
  );
}
