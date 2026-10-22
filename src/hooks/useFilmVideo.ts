import { RefObject, useEffect } from 'react';
export type FilmMode = 'play' | 'still';

/** The teaser film simply plays (muted, looping) while it is on screen and pauses when it is not. 'still' = poster only (reduced motion). */
export function useFilmVideo(vid: RefObject<HTMLVideoElement>, mode: FilmMode) {
  useEffect(() => {
    const v = vid.current; if (!v) return;
    v.muted = true;
    if (mode === 'still') { v.pause(); return; }
    v.loop = true;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => { /* autoplay blocked */ }); else v.pause(); }, { threshold: 0.3 });
    io.observe(v);
    return () => { io.disconnect(); v.pause(); };
  }, [vid, mode]);
}
