import { useState } from 'react';
import config from '../config';

/** The dashed rectangle that draws itself open behind the panels. */
function HudBorder() {
  return (
    <>
      <div className="what-border1">
        <svg height="100%" width="450" xmlns="http://www.w3.org/2000/svg">
          <rect
            width="100%"
            height="100%"
            fill="none"
            stroke="#fff"
            strokeWidth="1"
            strokeDasharray="6 8"
          />
        </svg>
      </div>
      <div className="what-border2">
        <svg width="100%" height="500" xmlns="http://www.w3.org/2000/svg">
          <rect
            width="100%"
            height="100%"
            fill="none"
            stroke="#fff"
            strokeWidth="1"
            strokeDasharray="6 8"
          />
        </svg>
      </div>
    </>
  );
}

/**
 * HUD accordion.
 *
 * The chevron is a real control, not decoration: clicking it (or anywhere on
 * the panel) expands that panel and collapses its sibling, on desktop as well
 * as touch. Hover still opens a panel on a fine pointer, so the section stays
 * explorable without clicking — but a visitor who reads the arrow as a button
 * and clicks it now gets what they expected, and keyboard users can reach it.
 */
export default function WhatIDo() {
  const [active, setActive] = useState(0);

  return (
    <div className="whatIDO" id="services">
      <div className="what-box">
        <h2>
          W<span className="hat-h2">hat</span> I<br />
          <span className="do-h2">do</span>
        </h2>
      </div>

      <div className="what-box">
        <div className="what-box-in">
          <HudBorder />

          {config.whatIDo.map((item, i) => {
            const isActive = active === i;
            return (
              <div
                key={item.title}
                className={[
                  'what-content',
                  'what-corner',
                  isActive ? 'what-content-active' : 'what-sibling',
                ].join(' ')}
                onClick={() => setActive(i)}
              >
                <div className="what-content-in">
                  <h3>{item.title}</h3>
                  <h4>{item.subtitle}</h4>
                  <p>{item.description}</p>
                  <h5>Skillset &amp; tools</h5>
                  <div className="what-content-flex">
                    {item.tags.map((t) => (
                      <span className="what-tags" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="what-arrow"
                  aria-expanded={isActive}
                  aria-label={`${isActive ? 'Collapse' : 'Expand'} ${item.title}`}
                  data-cursor="disable"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(isActive ? -1 : i);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
