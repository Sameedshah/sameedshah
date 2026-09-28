import config from '../config';

export default function CTA() {
  return (
    <div className="cta-section">
      <div className="cta-buttons">
        <a
          className="cta-btn cta-btn-alt"
          href={config.contact.resume}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="disable"
        >
          View Resume →
        </a>
        <a
          className="cta-btn cta-btn-hire"
          href={config.contact.upwork}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="disable"
        >
          Hire Me →
        </a>
      </div>
    </div>
  );
}
