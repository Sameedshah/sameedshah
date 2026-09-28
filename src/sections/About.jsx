import config from '../config';

export default function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        {/* .title and .para hook into the global reveal system in scrollFX.js —
            no per-section animation code needed. */}
        <h3 className="title">{config.about.title}</h3>
        <p className="para">{config.about.description}</p>
      </div>
    </div>
  );
}
