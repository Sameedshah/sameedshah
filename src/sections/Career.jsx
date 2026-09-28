import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import config from '../config';
import { initCareerFX, initCareerEntriesFX } from '../anim/scrollFX';

/** "2026 - Present" → NOW, "2022 - 2024" → 2022. Keeps the column narrow. */
function periodLabel(period) {
  if (period.includes('Present')) return 'NOW';
  if (period.includes(' - ')) return period.split(' - ')[0];
  return period;
}

export default function Career() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      initCareerFX();
      initCareerEntriesFX();
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&amp;</span>
          <br /> experience
        </h2>

        <div className="career-info">
          {/* The line grows 0 → 100% on scrub, dragging its glowing head-dot
              down the section as you read. */}
          <div className="career-timeline">
            <div className="career-dot" />
          </div>

          {config.experiences.map((exp) => (
            <div className="career-info-box" key={`${exp.position}-${exp.period}`}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{exp.position}</h4>
                  <h5>{exp.company}</h5>
                </div>
                <h3>{periodLabel(exp.period)}</h3>
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
