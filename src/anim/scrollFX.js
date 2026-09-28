import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * The global reveal system.
 *
 * Nothing here is per-component. Any element that carries `.title` or `.para`
 * animates itself in on scroll — so adding a new section means writing markup,
 * not writing another GSAP timeline. That's the trick that keeps the whole
 * codebase small.
 *
 *   .title → per-character, with a 10° rotation that untwists as it lands
 *   .para  → per-word, straight rise (per-char on body copy is unreadable)
 *
 * Runs on desktop only. Under 900px the splits cost more than they're worth
 * and reflow badly on mobile keyboards/rotation.
 */
export function initScrollFX() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras = document.querySelectorAll('.para');
  const titles = document.querySelectorAll('.title');

  const start = window.innerWidth <= 1024 ? 'top 60%' : '20% 60%';
  const toggleActions = 'play pause resume reverse';

  paras.forEach((el) => {
    el.anim?.progress(1).kill();
    el.split?.revert();

    el.split = new SplitText(el, { type: 'lines,words', linesClass: 'split-line' });
    el.anim = gsap.fromTo(
      el.split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.02,
        scrollTrigger: { trigger: el.parentElement?.parentElement, toggleActions, start },
      }
    );
  });

  titles.forEach((el) => {
    el.anim?.progress(1).kill();
    el.split?.revert();

    el.split = new SplitText(el, { type: 'chars,lines', linesClass: 'split-line' });
    el.anim = gsap.fromTo(
      el.split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        y: 0,
        rotate: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.03,
        scrollTrigger: { trigger: el.parentElement?.parentElement, toggleActions, start },
      }
    );
  });
}

/**
 * Career timeline: the gradient line grows out of nothing as you scroll past
 * it, dragging its glowing head-dot down the section. Scrubbed, not triggered,
 * so scrolling back up rewinds it.
 */
export function initCareerFX() {
  const line = document.querySelector('.career-timeline');
  if (!line) return;

  return gsap.fromTo(
    line,
    { maxHeight: '0%' },
    {
      maxHeight: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.career-info',
        start: 'top 75%',
        end: 'bottom 60%',
        scrub: 0.8,
      },
    }
  );
}

/** Each timeline entry lifts in as the dot reaches it. */
export function initCareerEntriesFX() {
  const boxes = gsap.utils.toArray('.career-info-box');
  return boxes.map((box) =>
    gsap.fromTo(
      box,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: box, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    )
  );
}

/** Contact block, staggered column by column. */
export function initContactFX() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.contact-section',
      start: 'top 80%',
      end: 'bottom center',
      toggleActions: 'play none none none',
    },
  });

  tl.fromTo('.contact-section h3', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .fromTo(
      '.contact-box',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
      '-=0.4'
    );

  return tl;
}

/** Tech-stack tiles pop in row by row. */
export function initTechStackFX() {
  return gsap.fromTo(
    '.techstack-item',
    { autoAlpha: 0, y: 30, scale: 0.85 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.6)',
      stagger: { each: 0.02, from: 'center' },
      scrollTrigger: { trigger: '.techstack-pyramid', start: 'top 80%' },
    }
  );
}

/** Fades the navbar scrim in once you leave the hero. */
export function initNavFadeFX() {
  return gsap.fromTo(
    '.nav-fade',
    { opacity: 0 },
    {
      opacity: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.landing-section', start: 'bottom 90%', end: 'bottom 60%', scrub: true },
    }
  );
}
