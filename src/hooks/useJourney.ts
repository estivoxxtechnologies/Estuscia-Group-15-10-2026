import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { C, S } from '../scene/state';
import { CAMERA_PATH } from '../scene/cameraPath';
gsap.registerPlugin(ScrollTrigger);

/** Scroll-driven camera path through the 3D world + fades for the floating icons and logo. */
export function useJourney(enabled: boolean) {
  useLayoutEffect(() => {
    if (!enabled) return;
    let tl: gsap.core.Timeline | undefined, timer = 0;
    const ctx = gsap.context(() => {
      const build = () => {
        tl?.scrollTrigger?.kill(); tl?.kill();
        const root = document.getElementById('story'); if (!root) return;
        const H = root.scrollHeight - innerHeight; if (H <= 0) return;
        const t = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 1.2 } });
        CAMERA_PATH.forEach(({ id, pose }) => {
          const el = document.getElementById(id); if (!el) return;
          const a = Math.max(el.offsetTop - innerHeight, 0), b = el.offsetTop;
          t.to(C, { ...pose, ease: 'none', duration: (b - a) / H }, a / H);
        });
        t.set({}, {}, 1); tl = t;
      };
      build();
      const onResize = () => { clearTimeout(timer); timer = window.setTimeout(() => ctx.add(build), 250); };
      addEventListener('resize', onResize);
      gsap.to(S, { icons: 0, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top 85%', end: 'top 35%', scrub: 1 } });
      gsap.to(S, { logo: 0, ease: 'none', scrollTrigger: { trigger: '#about', start: 'center center', end: 'bottom top', scrub: 1 } });
      return () => removeEventListener('resize', onResize);
    });
    return () => { clearTimeout(timer); ctx.revert(); };
  }, [enabled]);
}
