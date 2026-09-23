import { ACADEMY, directionsLink, enquireLink, mapEmbedSrc } from '../config.js'
import { IconPin, IconCalendar, IconPhone } from '../components/icons.jsx'

/** Visit us — address, what to expect, and the map. Last stop before the footer. */
export default function Visit() {
  return (
    <section className="visit" id="contact">
      <div className="visit__inner">
        <div className="visit__copy">
          <span className="kicker">Visit the academy</span>
          <h2>Come and see the <em>training floor.</em></h2>
          <p>
            We train inside {ACADEMY.clinic.name}, a working skin, hair and body clinic in
            East Delhi. Walk in, meet the trainers, see the machines you&apos;ll be using and
            watch a live session before you decide.
          </p>

          <ul className="visit__points">
            <li>
              <span className="visit__ico"><IconPin /></span>
              <div>
                <strong>{ACADEMY.address.line1}, {ACADEMY.address.line2}</strong>
                <p>Near Nirman Vihar &amp; Laxmi Nagar, a short walk from the Metro.</p>
              </div>
            </li>
            <li>
              <span className="visit__ico"><IconCalendar /></span>
              <div>
                <strong>Campus visits by appointment</strong>
                <p>Book a slot and a counsellor will take you through the course and the floor.</p>
              </div>
            </li>
            <li>
              <span className="visit__ico"><IconPhone /></span>
              <div>
                <strong>Call or WhatsApp {ACADEMY.phoneDisplay}</strong>
                <p>Batch dates, fees, eligibility and hostel guidance for outstation students.</p>
              </div>
            </li>
          </ul>

          <div className="visit__btns">
            <a className="btn-primary" href={directionsLink} target="_blank" rel="noopener noreferrer">Get directions ↗</a>
            <a className="btn-ghost" href={enquireLink} target="_blank" rel="noopener noreferrer">Book a campus visit</a>
          </div>
        </div>

        <div className="visit__map">
          <iframe
            title={`${ACADEMY.name} location`}
            src={mapEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  )
}
