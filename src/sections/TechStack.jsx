import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import config from '../config';
import { initTechStackFX } from '../anim/scrollFX';

export default function TechStack() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => initTechStackFX());
    return () => ctx.revert();
  }, []);

  return (
    <div className="techstack-new" id="stack">
      {/* Animated aurora rather than a background video — same atmosphere,
          none of the download. */}
      <div className="techstack-bg" />

      <div className="techstack-content">
        <h2>Tech Stack</h2>
        <div className="techstack-pyramid">
          {config.techStack.map((row, i) => (
            <div className="techstack-row" key={i}>
              {row.map((tech) => (
                <div className="techstack-item" key={tech.name} title={tech.name} data-cursor="disable">
                  <img src={tech.icon} alt={tech.name} loading="lazy" decoding="async" />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
