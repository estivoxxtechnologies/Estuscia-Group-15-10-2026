import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import FinanceScene from './scene/FinanceScene';
import { finalState, playIntro } from './scene/state';
import Loader from './components/layout/Loader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import WhyUs from './sections/WhyUs';
import Ecosystem from './sections/Ecosystem';
import Leadership from './sections/Leadership';
import ContactSection from './sections/contact/ContactSection';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useJourney } from './hooks/useJourney';
import { SECTIONS } from './config/sections';
import { clearHash } from './utils/scroll';

const IDS = SECTIONS.map(s => s.id);

export default function App() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false), [glFail, setGlFail] = useState(false);
  const [active, setActive] = useScrollSpy(IDS);
  const onFail = useCallback(() => setGlFail(true), []);
  const onLoaded = useCallback(() => { setReady(true); if (!reduce) playIntro(); }, [reduce]);

  useEffect(() => { clearHash(); if (reduce) finalState(); }, [reduce]);
  useLayoutEffect(() => { document.documentElement.classList.toggle('rm', reduce); document.documentElement.classList.toggle('nogl', glFail); }, [reduce, glFail]);
  useJourney(ready && !reduce);

  return (
    <>
      {!glFail && <FinanceScene reduce={reduce} onFail={onFail} />}
      {!ready && <Loader onDone={onLoaded} />}
      <Navbar active={active} onNavigate={setActive} reduce={reduce} />
      <main id="story">
        <Hero ready={ready || reduce} reduce={reduce} />
        <About />
        <WhyUs reduce={reduce} />
        <Ecosystem />
        <Leadership />
        <ContactSection />
      </main>
      <Footer reduce={reduce} />
    </>
  );
}
