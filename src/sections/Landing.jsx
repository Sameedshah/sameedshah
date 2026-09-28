import config from '../config';

export default function Landing() {
  const { greeting, fullName, roles } = config.developer;

  return (
    <div className="landing-section" id="landing">
      {/* fixed corner orbs — they rotate forever and bleed in off-screen */}
      <div className="landing-circle1" />
      <div className="landing-circle2" />

      <div className="landing-container">
        <div className="landing-intro">
          <h2>{greeting}</h2>
          <h1>
            {fullName.split(' ').map((word, i) => (
              <span key={i}>
                {word}
                <br />
              </span>
            ))}
          </h1>
        </div>

        {/* mobile-only portrait glow — the 3D canvas is disabled under 768px */}
        <div className="mobile-photo" />

        <div className="landing-info">
          <h3>I&apos;m</h3>
          {/* Two stacked lines that trade places forever. initialFX.js drives
              them; the ::after gradient dissolves letters as they exit. */}
          <div className="landing-info-h2">
            <h2 className="landing-h2-1">{roles[0]}</h2>
            <h2 className="landing-h2-2">{roles[1] ?? roles[0]}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
