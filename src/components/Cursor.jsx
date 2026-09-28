import { useEffect, useRef } from 'react';

/**
 * The trailing dot.
 *
 * Position is lerped on every animation frame and written to `transform`, not
 * to `top`/`left` with a CSS transition. A transition on top/left restarts from
 * scratch on every mousemove event, so the dot moves in visible 300ms steps and
 * always lags behind by a full event; it also lays out and paints each frame
 * instead of running on the compositor. Lerping toward the target gives the
 * same trailing feel, but smooth and frame-accurate.
 *
 * mix-blend-mode:difference keeps one colour legible over both the near-black
 * page and the white project screenshots, so nothing needs to swap per section.
 * Anything with data-cursor="disable" shrinks it out of the way.
 */
export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    // start off-screen so it doesn't flash in the corner before first move
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;
    let moved = false;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;

      if (!moved) {
        // jump to the pointer the first time rather than gliding in from 0,0
        pos.x = target.x;
        pos.y = target.y;
        moved = true;
        el.style.opacity = '1';
      }

      const disable = e.target?.closest?.('[data-cursor="disable"], a, button');
      el.classList.toggle('cursor-disable', Boolean(disable));
    };

    // Frame-rate independent smoothing: at 60fps this settles in ~5 frames,
    // and it behaves identically on a 144Hz display.
    const SMOOTH = 18;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const t = 1 - Math.exp(-SMOOTH * dt);
      pos.x += (target.x - pos.x) * t;
      pos.y += (target.y - pos.y) * t;

      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });

    const onLeave = () => el.classList.add('cursor-disable');
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <div className="cursor-main" ref={ref} />;
}
