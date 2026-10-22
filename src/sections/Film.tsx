import { useRef } from 'react';
import { ASSETS } from '../config/site';
import { useFilmVideo, FilmMode } from '../hooks/useFilmVideo';

/** Teaser film right after Home. Not in the navbar. Plays on its own; reveals no name or detail. */
export default function Film({ reduce }: { reduce: boolean }) {
  const vid = useRef<HTMLVideoElement>(null), mode: FilmMode = reduce ? 'still' : 'play';
  useFilmVideo(vid, mode);
  return (
    <section id="film" className="film" aria-label="Coming soon teaser">
      <div className="film-frame">
        <video ref={vid} muted loop playsInline autoPlay={!reduce} preload="auto" poster={ASSETS.poster} aria-hidden="true"><source src={ASSETS.video} type="video/mp4" /></video>
      </div>
    </section>
  );
}
