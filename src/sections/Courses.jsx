import Img from '../components/Img.jsx'
import { COURSES } from '../data.js'
import { IconCheck, IconCalendar, IconClock, IconArrow } from '../components/icons.jsx'

/**
 * The three course levels, side by side.
 *
 * Every card carries the same rows in the same order — photo, duration,
 * eligibility, syllabus, award — because the comparison IS the sales pitch: a
 * visitor is choosing a level, not a subject. Each photo shows the treatment
 * that level unlocks, so the ladder reads at a glance before a word is read.
 *
 * @param {(course: string) => void} onApply  opens the enrolment dialog, prefilled
 */
export default function Courses({ onApply }) {
  return (
    <section className="courses" id="courses">
      <div className="shead shead--mid">
        <span className="kicker">Courses we offer</span>
        <h2>Three levels. One <em>career path.</em></h2>
        <p>
          Start where you stand. Each level is a complete qualification on its own and a
          clean step up to the next: same treatment rooms, same trainers, more depth.
        </p>
      </div>

      <div className="courses__grid">
        {COURSES.map((c) => (
          <article className={`course${c.featured ? ' course--featured' : ''}`} key={c.id}>
            <div className="course__media">
              <Img name={c.img} alt={c.imgAlt} sizes="(min-width: 1040px) 33vw, 100vw" />
              {c.featured && <span className="course__flag">Most enrolled</span>}
              <span className="course__tier">{c.tier}</span>
            </div>

            <div className="course__body">
              <h3>{c.title}</h3>
              <p className="course__summary">{c.summary}</p>

              <dl className="course__facts">
                <div>
                  <dt><IconCalendar size={14} /> Duration</dt>
                  <dd>{c.duration}</dd>
                </div>
                <div>
                  <dt><IconClock size={14} /> Schedule</dt>
                  <dd>{c.daily}</dd>
                </div>
              </dl>

              <p className="course__elig">
                <span>Eligibility</span>
                {c.eligibility}
              </p>

              <div className="course__topics">
                <h4>Key topics</h4>
                <ul>
                  {c.topics.map((t) => (
                    <li key={t}><span className="course__tick"><IconCheck size={13} /></span>{t}</li>
                  ))}
                </ul>
              </div>

              <footer className="course__foot">
                <p className="course__award">
                  <span>You graduate with</span>
                  <strong>{c.award}</strong>
                </p>
                <button
                  className={`${c.featured ? 'btn-primary' : 'btn-dark'} course__btn`}
                  onClick={() => onApply(`${c.tier}: ${c.title}`)}
                >
                  Apply for {c.tier} <IconArrow size={16} />
                </button>
              </footer>
            </div>
          </article>
        ))}
      </div>

      <p className="courses__note">
        Batches are kept small so every student gets machine time. Fees and next start
        dates are shared on enquiry.
      </p>
    </section>
  )
}
