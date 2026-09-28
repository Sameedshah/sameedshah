import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight } from 'react-icons/fi';
import config from '../config';

gsap.registerPlugin(ScrollTrigger);

/** Falls back to a generated tile when a screenshot isn't in /public/images. */
function Thumb({ project }) {
  const [broken, setBroken] = useState(false);

  const media =
    !project.image || broken ? (
      <div className="work-placeholder">{project.category}</div>
    ) : (
      <img src={project.image} alt={project.name} onError={() => setBroken(true)} loading="lazy" />
    );

  if (!project.url) return <div className="work-image-in">{media}</div>;

  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer" data-cursor="disable">
      <div className="work-image-in">
        {media}
        <div className="work-link">
          <FiArrowUpRight />
        </div>
      </div>
    </a>
  );
}

export default function Work() {
  const sectionRef = useRef(null);
  const flexRef = useRef(null);

  useLayoutEffect(() => {
    // Under 768px the section un-pins and stacks vertically (see main.css).
    if (window.innerWidth <= 768) return;

    const ctx = gsap.context(() => {
      /* Measure from the cards themselves, not flex.scrollWidth — the two
         decorative rails are absolutely positioned and far wider than the
         viewport, so scrollWidth reports hundreds of thousands of pixels and
         the pin would run for the length of a small novel.
         offsetWidth is also transform-independent, so re-measuring mid-scrub
         on resize gives the same answer. */
      const getDistance = () => {
        const flex = flexRef.current;
        if (!flex) return 0;

        const boxes = [...flex.querySelectorAll('.work-box')];
        const content = boxes.reduce((sum, b) => sum + b.offsetWidth, 0);

        const cs = getComputedStyle(flex);
        const padRight = parseFloat(cs.paddingRight) || 0;
        const marLeft = parseFloat(cs.marginLeft) || 0; // negative by design

        return Math.max(0, content + padRight + marLeft - window.innerWidth);
      };

      /* Pin the section and translate the rail left by exactly the overflow.
         scrub:1 adds a beat of lag so the cards glide rather than snap;
         invalidateOnRefresh recomputes the distance on resize instead of
         leaving the last card stranded off-screen. */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          id: 'work',
          invalidateOnRefresh: true,
        },
      });

      tl.to(flexRef.current, { x: () => -getDistance(), ease: 'none' });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="work-flex" ref={flexRef}>
          {config.projects.map((project, i) => (
            <div className="work-box" key={project.name}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{String(i + 1).padStart(2, '0')}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>

              <div className="work-image">
                <Thumb project={project} />
              </div>
            </div>
          ))}

          <div className="work-box work-box-cta">
            <div className="see-all-works">
              <h3>Want to see more?</h3>
              <p>Full case studies and client work live on my Upwork profile.</p>
              <a
                className="see-all-btn"
                href={config.contact.upwork}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
              >
                See all work
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
