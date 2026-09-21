import Wordmark from '../components/Wordmark.jsx'
import { ACADEMY, SOCIALS, telLink, mailLink } from '../config.js'
import { SOCIAL_ICONS } from '../components/icons.jsx'
import { COURSES } from '../data.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__brand">
          <Wordmark tone="light" className="footer__wm" />
          <p>
            Hands-on aesthetic and cosmetology training in Preet Vihar, East Delhi.
            Certified courses, real clients, lifetime support.
          </p>
          <a className="footer__clinic" href={ACADEMY.clinic.url} target="_blank" rel="noopener noreferrer">
            Our clinic: {ACADEMY.clinic.name} ↗
          </a>
        </div>

        <nav className="footer__col" aria-label="Courses">
          <h4>Courses</h4>
          {COURSES.map((c) => <a key={c.id} href="#courses">{c.tier} — {c.duration}</a>)}
          <a href="#diploma">Advance Diploma in Cosmetology</a>
        </nav>

        <nav className="footer__col" aria-label="Quick links">
          <h4>Academy</h4>
          <a href="#about">About us</a>
          <a href="#why">Why choose us</a>
          <a href="#tour">Campus tour</a>
          <a href="#team">Our trainers</a>
          <a href="#admissions">Admissions</a>
          <a href="#reviews">Student reviews</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="footer__col footer__contact">
          <h4>Contact</h4>
          <p className="footer__addr">{ACADEMY.address.line1},<br />{ACADEMY.address.line2}</p>
          <a href={telLink}>{ACADEMY.phoneDisplay}</a>
          <a href={mailLink}>{ACADEMY.email}</a>
        </div>
      </div>

      <div className="footer__social">
        <span>Follow us</span>
        <div className="footer__icons">
          {SOCIALS.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer"
               aria-label={`${ACADEMY.name} on ${s.label}`} className={`soc soc--${s.id}`}>
              {SOCIAL_ICONS[s.id]}
            </a>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {year} {ACADEMY.name}. All rights reserved.</span>
        <span>Accredited with MSME · Skill India · NSDC · Startup India</span>
      </div>
    </footer>
  )
}
