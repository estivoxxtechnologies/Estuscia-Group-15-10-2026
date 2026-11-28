import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { playIntro, finalState } from './scene/state';
import Loader from './components/layout/Loader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero';
import WhatWeDo from './sections/WhatWeDo';
import About from './sections/About';
import WhyUs from './sections/WhyUs';
import Ecosystem from './sections/Ecosystem';
import Sectors from './sections/Sectors';
import Leadership from './sections/Leadership';
import Faq from './sections/Faq';
import LatestPosts from './sections/LatestPosts';
import ContactSection from './sections/contact/ContactSection';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useJourney } from './hooks/useJourney';
import { SECTIONS } from './config/sections';
import { clearHash, scrollToSection } from './utils/scroll';

// Three.js lives in its own chunk: the text + loader paint first, the 3D scene is fetched right after.
const FinanceScene = lazy(() => import('./scene/FinanceScene'));
const IDS = SECTIONS.map(s => s.id);

/** Slow / data-saver connections skip the 3D scene (the existing no-WebGL look is used instead). */
const saveData = () => { const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection; return !!c && (!!c.saveData || /2g$/.test(c.effectiveType || '')); };

/** Everything except the 3D canvas. Rendered by the browser (App) and at build time (pre-render), so the HTML that crawlers get is the same page. */
export function Layout({ ready, reduce, active, onNavigate, loader }: { ready: boolean; reduce: boolean; active: string; onNavigate: (id: string) => void; loader: ReactNode }) {
  return (
    <>
      {loader}
      <Navbar active={active} onNavigate={onNavigate} reduce={reduce} />
      <main id="story">
        <Hero ready={ready || reduce} reduce={reduce} />
        <WhatWeDo />
        <About />
        <WhyUs reduce={reduce} />
        <Ecosystem />
        <Sectors />
        <Leadership />
        <LatestPosts />
        <Faq />
        <ContactSection />
      </main>
      <Footer reduce={reduce} />
    </>
  );
}

export default function App() {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false), [ready, setReady] = useState(false);
  const [glFail, setGlFail] = useState(saveData), [sceneOn, setSceneOn] = useState(false), [sceneUp, setSceneUp] = useState(false);
  const [active, setActive] = useScrollSpy(IDS);
  const target = useRef(typeof location === 'undefined' ? '' : location.hash.slice(1));   // /#contact etc.: remembered, then scrolled to once the page is ready
  const onFail = useCallback(() => setGlFail(true), []);
  const onSceneReady = useCallback(() => setSceneUp(true), []);
  const onLoaded = useCallback(() => setLoaded(true), []);

  // fetch the 3D chunk right after the first paint
  useEffect(() => { if (glFail) return; const id = requestAnimationFrame(() => setSceneOn(true)); return () => cancelAnimationFrame(id); }, [glFail]);
  // the cinematic intro starts once the loader has faded AND the scene is up (or unavailable); never wait longer than 2.5 s
  useEffect(() => {
    if (!loaded || ready) return;
    const start = () => { setReady(true); if (!reduce) playIntro(); };
    if (sceneUp || glFail) { start(); return; }
    const t = setTimeout(start, 2500); return () => clearTimeout(t);
  }, [loaded, ready, sceneUp, glFail, reduce]);

  useEffect(() => { clearHash(); if (reduce) finalState(); }, [reduce]);
  useEffect(() => { if (ready && IDS.includes(target.current)) { const id = target.current; target.current = ''; setTimeout(() => scrollToSection(id, reduce), 120); } }, [ready, reduce]);
  useLayoutEffect(() => { document.documentElement.classList.toggle('rm', reduce); document.documentElement.classList.toggle('nogl', glFail); }, [reduce, glFail]);
  useEffect(() => { document.documentElement.classList.toggle('past', active !== 'hero'); }, [active]);
  useJourney(ready && !reduce);

  return (
    <>
      {!glFail && sceneOn && <Suspense fallback={null}><FinanceScene reduce={reduce} onFail={onFail} onReady={onSceneReady} /></Suspense>}
      <Layout ready={ready} reduce={reduce} active={active} onNavigate={setActive} loader={!ready && <Loader onDone={onLoaded} />} />
    </>
  );
}
