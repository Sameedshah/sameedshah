import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { lenis } from './smoothScroll';
import config from '../config';

gsap.registerPlugin(SplitText);

/**
 * Fires the moment the preloader clears.
 *
 * Everything lands on the same curve: chars rise 80px out of a blur, on
 * power3.inOut with a 0.025s stagger. Slow enough to read as deliberate,
 * fast enough that the whole hero is settled inside 1.5s.
 */
export function initialFX() {
  document.body.style.overflowY = 'auto';
  lenis?.start();
  document.getElementsByTagName('main')[0]?.classList.add('main-active');

  // the page floor warms from pure black to the blue-tinted near-black
  gsap.to('body', { backgroundColor: '#080a0f', duration: 0.5, delay: 1 });

  const introTargets = ['.landing-info h3', '.landing-intro h2', '.landing-intro h1'].flatMap((s) =>
    Array.from(document.querySelectorAll(s))
  );

  const intro = new SplitText(introTargets, { type: 'chars,lines', linesClass: 'split-line' });
  gsap.fromTo(
    intro.chars,
    { opacity: 0, y: 80, filter: 'blur(5px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power3.inOut',
      stagger: 0.025,
      delay: 0.3,
    }
  );

  // chrome fades in underneath the text
  gsap.fromTo(
    ['.header', '.icons-section', '.nav-fade'],
    { opacity: 0 },
    { opacity: 1, duration: 1.2, ease: 'power1.inOut', delay: 0.1 }
  );
  gsap.fromTo(
    '.landing-info-h2',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1.2, ease: 'power1.inOut', delay: 0.8 }
  );

  startRoleCarousel();
}

const HOLD = 2.6; // seconds a role stays on screen
const SWAP = 0.7; // seconds for one line to replace another
const CHAR_STAGGER = 0.025;

/**
 * The infinite role carousel.
 *
 * Two absolutely-stacked lines trade places: the outgoing one rides up out of
 * the container while the incoming one comes up from below, and the line that
 * just left is refilled with the *next* role and parked underneath. That's what
 * lets three or more roles cycle through only two DOM nodes.
 *
 * Two things this gets right that the naive version didn't:
 *
 *  - The incoming line is parked off-stage with gsap.set() up front. A fromTo()
 *    with a delay doesn't apply its "from" values until the tween actually
 *    starts, so both roles sat on top of each other, half-faded, until the
 *    first swap fired.
 *  - Letters are clipped by the container rather than faded out under a
 *    gradient. The gradient dimmed the leading characters of whichever role was
 *    on screen, which read as the first word or two being broken.
 */
function startRoleCarousel() {
  const slots = [document.querySelector('.landing-h2-1'), document.querySelector('.landing-h2-2')];
  const roles = config.developer.roles.filter(Boolean);

  if (!slots[0] || !slots[1] || roles.length < 2) return;

  const split = (el) => new SplitText(el, { type: 'chars', charsClass: 'role-char' });

  let index = 0; // role currently on screen
  let front = 0; // slot holding it

  slots[0].textContent = roles[0];
  slots[1].textContent = roles[1];

  let showing = split(slots[0]);
  let incoming = split(slots[1]);

  gsap.set(showing.chars, { yPercent: 0 });
  gsap.set(incoming.chars, { yPercent: 115 });

  const step = () => {
    const leaving = showing;
    const arriving = incoming;
    const leavingEl = slots[front];

    gsap
      .timeline({
        onComplete: () => {
          index = (index + 1) % roles.length;
          front = 1 - front;

          // recycle the line that just left into the next role, parked below
          leaving.revert();
          leavingEl.textContent = roles[(index + 1) % roles.length];

          showing = arriving;
          incoming = split(leavingEl);
          gsap.set(incoming.chars, { yPercent: 115 });

          gsap.delayedCall(HOLD, step);
        },
      })
      .to(
        leaving.chars,
        { yPercent: -115, duration: SWAP, ease: 'power3.inOut', stagger: CHAR_STAGGER },
        0
      )
      .to(
        arriving.chars,
        { yPercent: 0, duration: SWAP, ease: 'power3.inOut', stagger: CHAR_STAGGER },
        0.05
      );
  };

  gsap.delayedCall(HOLD, step);
}
