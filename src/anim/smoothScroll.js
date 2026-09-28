import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export let lenis = null;

/**
 * Smooth scroll, wired into GSAP's ticker so ScrollTrigger and Lenis advance
 * on the same frame. Without this they drift and pinned sections judder.
 *
 * These numbers are the entire "feel" of the site — duration 1.7 with an
 * exponential ease gives a long, heavy glide rather than a snappy one.
 */
export function initSmoothScroll() {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.7,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.7,
    touchMultiplier: 2,
    infinite: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // held until the preloader hands over
  lenis.stop();

  return lenis;
}

export function scrollToSection(target) {
  if (lenis) lenis.scrollTo(target, { offset: 0 });
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}
