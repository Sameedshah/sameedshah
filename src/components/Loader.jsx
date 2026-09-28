import { useEffect, useRef, useState } from 'react';
import config from '../config';

/**
 * The preloader.
 *
 * A % counter fills, the label flips to ENTER, and clicking scales the pill
 * past the edges of the viewport to reveal the page. The whole reveal is one
 * CSS transition on min-width/min-height — see loader.css.
 */
export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const [clicked, setClicked] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    // Time-based, not frame-based: a backgrounded tab throttles rAF to ~1fps,
    // and a frame-counted loader would sit at 20% until you looked at it.
    const DURATION = 2400;
    const started = performance.now();
    let raf;

    const tick = (now) => {
      const t = Math.min(1, (now - started) / DURATION);
      // decelerating curve — reads as real work finishing, not a linear timer
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t >= 1) {
        setComplete(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    /* Chrome suspends rAF entirely in a hidden tab, so someone who opens the
       site in a background tab would come back to a loader frozen mid-count.
       This timer keeps running (throttled, but running) and guarantees the
       loader always reaches ENTER. */
    const safety = setTimeout(() => {
      setProgress(100);
      setComplete(true);
      cancelAnimationFrame(raf);
    }, DURATION + 150);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
  }, []);

  // The blurred blob inside the pill follows the cursor via CSS custom props.
  const onMouseMove = (e) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    wrapRef.current.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
    wrapRef.current.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
  };

  const enter = () => {
    if (!complete || clicked) return;
    setClicked(true);
    // matches the 0.8s pill expansion in loader.css
    setTimeout(() => onComplete?.(), 900);
  };

  const roles = [...config.developer.roles, config.developer.title.toUpperCase()];

  return (
    <div className="loading-screen">
      <div className="loading-header">
        <div className="loader-title">{config.developer.fullName}</div>
        <div className="loaderGame-container">
          <div className="loaderGame-in">
            {Array.from({ length: 12 }).map((_, i) => (
              <span className="loaderGame-line" key={i} />
            ))}
            <div className="loaderGame-ball" />
          </div>
        </div>
      </div>

      {/* role marquee running behind the pill */}
      <div className="loading-marquee">
        <div className="loading-marquee-in">
          {[...roles, ...roles].map((r, i) => (
            <span key={i}>{r}</span>
          ))}
        </div>
      </div>

      <div
        ref={wrapRef}
        onMouseMove={onMouseMove}
        onClick={enter}
        className={`loading-wrap${complete ? ' loading-complete' : ''}${clicked ? ' loading-clicked' : ''}`}
      >
        <div className="loading-hover" />
        <div className="loading-button">
          <div className="loading-content">
            <div className="loading-content2">
              {/* On complete, CSS collapses this to zero width and scales the
                  ENTER label in beside it — no conditional rendering needed. */}
              <div className="loading-container">
                <span>Loading</span>
                <span className="loading-pct">
                  {progress}%
                  <i className="loading-box" />
                </span>
              </div>
              <div className="loading-icon">Enter →</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
