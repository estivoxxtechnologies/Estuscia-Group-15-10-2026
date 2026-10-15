import gsap from 'gsap';
/** Shared, mutable animation state read every frame by the 3D scene (kept outside React to avoid re-renders). */
export const S = { intro: 0, icons: 1, logo: 1, pillars: 0, orbit: 0, focus: 0 };
export const C = { x: 0, y: 1.6, z: 9, lx: 0, ly: 0.6, lz: -8 }; // camera pose driven by scroll
export const D = { z: 7 };                                     // intro dolly offset
export const M = { x: 0, y: 0 };                               // pointer parallax
export const finalState = () => { S.intro = 1; D.z = 0; S.pillars = 5; };
/** Cinematic opening: bars rise, line draws, camera moves forward. */
export function playIntro() {
  gsap.to(S, { intro: 1, duration: 5, ease: 'power2.inOut', delay: 0.3 });
  gsap.to(D, { z: 0, duration: 6, ease: 'power3.out', delay: 0.3 });
}
