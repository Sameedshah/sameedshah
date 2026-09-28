import config from '../config';
import { scrollToSection } from '../anim/smoothScroll';

/**
 * The label rides up on hover while a duplicate slides in beneath it — one
 * element, two lines, pure CSS (see .hover-link in main.css).
 */
export function HoverLink({ children, ...rest }) {
  return (
    <div className="hover-link" {...rest}>
      <div className="hover-in">
        {children}
        <div>{children}</div>
      </div>
    </div>
  );
}

const LINKS = [
  { label: 'ABOUT', target: '#about' },
  { label: 'WORK', target: '#work' },
  { label: 'CONTACT', target: '#contact' },
];

export default function Navbar() {
  return (
    <header className="header">
      <div className="navbar-title" data-cursor="disable">
        <HoverLink>{config.developer.fullName}</HoverLink>
      </div>

      <a
        className="navbar-connect"
        href={`mailto:${config.contact.email}`}
        data-cursor="disable"
      >
        <HoverLink>{config.contact.email}</HoverLink>
      </a>

      <ul>
        {LINKS.map((l) => (
          <li key={l.label} data-cursor="disable" onClick={() => scrollToSection(l.target)}>
            <HoverLink>{l.label}</HoverLink>
          </li>
        ))}
      </ul>
    </header>
  );
}
