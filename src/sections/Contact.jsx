import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import config from '../config';
import { initContactFX } from '../anim/scrollFX';

const SOCIALS = [
  { key: 'github', label: 'Github' },
  { key: 'linkedin', label: 'Linkedin' },
  { key: 'upwork', label: 'Upwork' },
  { key: 'x', label: 'X' },
];

export default function Contact() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => initContactFX());
    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>{config.developer.fullName}</h3>

        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <a className="contact-social" href={`mailto:${config.contact.email}`} data-cursor="disable">
              {config.contact.email}
            </a>
            <h4>Location</h4>
            <p>{config.contact.location}</p>
          </div>

          <div className="contact-box">
            <h4>Social</h4>
            {SOCIALS.map((s) => (
              <a
                key={s.key}
                className="contact-social"
                href={config.contact[s.key]}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="contact-box">
            <h2>
              Designed and Developed
              <br />
              by <span>{config.developer.fullName}</span>
            </h2>
            <h5>{year}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
