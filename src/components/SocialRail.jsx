import { useRef } from 'react';
import { FiFileText } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaXTwitter, FaUpwork } from 'react-icons/fa6';
import config from '../config';

const ICONS = [
  { key: 'github', Icon: FaGithub, label: 'GitHub' },
  { key: 'linkedin', Icon: FaLinkedinIn, label: 'LinkedIn' },
  { key: 'upwork', Icon: FaUpwork, label: 'Upwork' },
  { key: 'x', Icon: FaXTwitter, label: 'X' },
];

/**
 * Fixed left rail + rotated resume link.
 *
 * The icons are magnetic: each one drifts toward the cursor while it's near,
 * then springs back. It's a two-line effect but it's the difference between
 * a rail that feels inert and one that feels responsive.
 */
export default function SocialRail() {
  const railRef = useRef(null);

  const onMove = (e) => {
    const anchors = railRef.current?.querySelectorAll('a');
    anchors?.forEach((a) => {
      const r = a.parentElement.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const pull = dist < 120 ? (1 - dist / 120) * 0.45 : 0;
      a.style.setProperty('--siLeft', `calc(50% + ${dx * pull}px)`);
      a.style.setProperty('--siTop', `calc(50% + ${dy * pull}px)`);
    });
  };

  const onLeave = () => {
    railRef.current?.querySelectorAll('a').forEach((a) => {
      a.style.setProperty('--siLeft', '50%');
      a.style.setProperty('--siTop', '50%');
    });
  };

  return (
    <div className="icons-section">
      <div className="social-icons" ref={railRef} onMouseMove={onMove} onMouseLeave={onLeave}>
        {ICONS.map(({ key, Icon, label }) => (
          <span key={key}>
            <a
              href={config.contact[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              data-cursor="disable"
            >
              <Icon />
            </a>
          </span>
        ))}
      </div>

      <a
        className="resume-button"
        href={config.contact.resume}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="disable"
      >
        RESUME
        <span><FiFileText /></span>
      </a>
    </div>
  );
}
