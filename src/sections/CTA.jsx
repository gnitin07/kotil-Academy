import { telLink, enquireLink, hoursLine, ACADEMY } from '../config.js'
import { IconPhone, IconClock, WhatsAppGlyph } from '../components/icons.jsx'

/**
 * The booking prompt, placed right after the testimonials — the proof earns
 * the click, so the click should be within reach of the proof.
 *
 * @param {() => void} onApply  opens the enrolment dialog
 */
export default function CTA({ onApply }) {
  return (
    <section className="cta">
      <div className="cta__inner">
        <span className="kicker">Next batch, now enrolling</span>
        <h2>Your new beginning starts with <em>one call.</em></h2>
        <p className="cta__sub">
          Tell us where you are in your career and we will tell you honestly which level to
          start at — Basic, Advanced, Advanced Plus or the one-month diploma.
        </p>

        <div className="cta__btns">
          <button className="btn-dark" onClick={onApply}>Apply for a seat</button>
          <a className="btn-ghost" href={telLink}><IconPhone /> {ACADEMY.phoneDisplay}</a>
          <a className="btn-ghost" href={enquireLink} target="_blank" rel="noopener noreferrer">
            <WhatsAppGlyph size={16} /> WhatsApp us
          </a>
        </div>

        <p className="cta__hours"><IconClock /> {hoursLine}</p>
      </div>
    </section>
  )
}
