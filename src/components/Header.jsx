import { useState } from 'react'
import Wordmark from './Wordmark.jsx'
import { ACADEMY, telLink, mailLink, enquireLink, hoursLine } from '../config.js'
import { IconClock, IconPhone, IconMail, WhatsAppGlyph } from './icons.jsx'

/**
 * Six, not nine. The nav has to sit beside a wordmark and a CTA on one line,
 * and every extra link squeezes the set until it reads as a wall. Why us,
 * student reviews and the FAQ are all reachable from the footer and from the
 * page itself — they don't need to compete up here.
 */
const LINKS = [
  ['#courses', 'Courses'],
  ['#diploma', 'Diploma'],
  ['#tour', 'Campus'],
  ['#team', 'Trainers'],
  ['#admissions', 'Admissions'],
  ['#contact', 'Contact'],
]

/**
 * Utility strip + nav, fixed together.
 *
 * The strip is solid and always dark; the nav below it starts transparent over
 * the hero and turns solid on scroll (animations.js toggles `.scrolled`).
 *
 * @param {() => void} onApply  opens the enrolment dialog
 */
export default function Header({ onApply }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="topbar">
        <p className="topbar__hours"><IconClock /> {hoursLine}</p>
        <div className="topbar__actions">
          <a className="topbar__link" href={telLink} aria-label={`Call ${ACADEMY.phoneDisplay}`}>
            <IconPhone /> <span className="topbar__num">{ACADEMY.phoneDisplay}</span>
          </a>
          <a className="topbar__link topbar__link--wa" href={enquireLink} target="_blank" rel="noopener noreferrer">
            <WhatsAppGlyph size={15} /> WhatsApp
          </a>
          <a className="topbar__link topbar__link--mail" href={mailLink} aria-label={`Email ${ACADEMY.email}`}>
            <IconMail /> <span className="topbar__mail">Mail</span>
          </a>
        </div>
      </div>

      <nav className="nav">
        <a className="nav__logo" href="#top" aria-label={`${ACADEMY.name} home`}>
          <Wordmark tone="dark" />
        </a>

        <div className={`nav__links${menuOpen ? ' is-open' : ''}`} onClick={() => setMenuOpen(false)}>
          {LINKS.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </div>

        <div className="nav__right">
          <button className="nav__cta" onClick={onApply}>Apply Now</button>
          <button
            className={`nav__burger${menuOpen ? ' is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          ><span /><span /><span /></button>
        </div>
      </nav>
    </header>
  )
}
