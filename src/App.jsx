import { useEffect, useState, lazy, Suspense } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import SocialRail from './components/SocialRail';

import Landing from './sections/Landing';
import About from './sections/About';
import WhatIDo from './sections/WhatIDo';
import Career from './sections/Career';
import Work from './sections/Work';
import TechStack from './sections/TechStack';
import CTA from './sections/CTA';
import Contact from './sections/Contact';

import { initSmoothScroll } from './anim/smoothScroll';
import { initialFX } from './anim/initialFX';
import { initScrollFX, initNavFadeFX } from './anim/scrollFX';

// The WebGL bundle is by far the biggest chunk — keep it out of the critical
// path so the loader and hero paint immediately.
const Character = lazy(() => import('./components/Character'));

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // Lenis starts paused; the loader hands over.
  useEffect(() => {
    initSmoothScroll();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    initialFX();
    initScrollFX();
    initNavFadeFX();

    // Fonts land after first paint and shift every split-text measurement —
    // re-measure once they're in, or the reveals fire at the wrong scroll
    // positions all the way down the page.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    const onResize = () => {
      initScrollFX();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [loaded]);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <Cursor />

      <main className="main-body">
        <div className="nav-fade" />
        <Navbar />
        <SocialRail />

        <Suspense fallback={null}>{loaded && <Character />}</Suspense>

        <div className="container-main">
          <Landing />
          <About />
          <WhatIDo />
          <Career />
          <Work />
          <TechStack />
          <CTA />
          <Contact />
        </div>
      </main>
    </>
  );
}
