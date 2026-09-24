import { useState } from 'react'
import Img from '../components/Img.jsx'
import { COURSES } from '../data.js'
import { prospectusLink } from '../config.js'
import { IconCheck, IconArrow, IconDoc } from '../components/icons.jsx'

/**
 * About Us, and the three plans it is really selling.
 *
 * A dark band between two light ones, so the page breathes, and the only place
 * on the site the courses are set out: the three stack one above another under
 * the heading, and each opens to its own syllabus rather than sending anyone to
 * a second section further down.
 *
 * Folded, a plan is what a visitor needs to choose between levels: the photo of
 * the treatment that level unlocks, the length, and one sentence. "Read the
 * full plan" opens the rest, so the module lists cost nothing until someone has
 * decided they want them. The detail is always in the DOM, only ever hidden by
 * CSS, so all three syllabuses are indexed and read by screen readers whether
 * or not they are open.
 *
 * @param {(course: string) => void} onApply  opens the enrolment dialog, prefilled
 */
export default function About({ onApply }) {
  const [open, setOpen] = useState(null)

  return (
    <section className="about" id="courses">
      <div className="about__inner">
        <div className="shead shead--mid">
          <span className="kicker">About the academy</span>
          <h2>Beauty is not about appearance. It is about <em>confidence, skill and transformation.</em></h2>
          <p>
            We train industry-ready skincare professionals in aesthetic sciences, skin
            treatments and advanced cosmetology. We don&apos;t just teach treatments,
            we build careers.
          </p>
        </div>

        {/* Not a heading: the section already has one, and the plan titles are
            the subheadings under it. This is a label, so the nav's "Courses"
            lands on something that names itself. One line, because what the
            levels are is the cards' job to say, not this line's. */}
        <p className="plans__head">
          <span className="kicker">Our plans</span>
          Three levels, one career path. Start where you stand.
        </p>

        <div className="plans">
          {COURSES.map((c, n) => {
            const isOpen = open === c.id
            return (
              <article className={`plan${isOpen ? ' is-open' : ''}${c.featured ? ' plan--featured' : ''}`} key={c.id}>
                <div className="plan__media">
                  <Img name={c.img} alt={c.imgAlt} sizes="(min-width: 880px) 360px, 100vw" />
                  {c.featured && <span className="plan__flag">Most enrolled</span>}
                </div>

                <div className="plan__body">
                  <span className="plan__num">{String(n + 1).padStart(2, '0')}</span>
                  <h3>{c.tier}: {c.title}</h3>
                  <p className="plan__meta">{c.duration} &middot; {c.daily}</p>
                  <p className="plan__summary">{c.summary}</p>

                  <button
                    className="plan__toggle"
                    aria-expanded={isOpen}
                    aria-controls={`plan-${c.id}`}
                    onClick={() => setOpen(isOpen ? null : c.id)}
                  >
                    {isOpen ? 'Show less' : 'Read the full plan'}
                    <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                  </button>

                  <div className="plan__more" id={`plan-${c.id}`}>
                    <h4>What the {c.duration.toLowerCase()} cover</h4>
                    <ul className="plan__list">
                      {c.topics.map((t) => (
                        <li key={t}><span className="plan__tick"><IconCheck size={12} /></span>{t}</li>
                      ))}
                    </ul>

                    <p className="plan__elig"><span>Open to</span>{c.eligibility}</p>
                    <p className="plan__award"><span>You graduate with</span><strong>{c.award}</strong></p>

                    <div className="plan__cta">
                      <button
                        className="btn-primary plan__btn"
                        onClick={() => onApply(`${c.tier}: ${c.title}`)}
                      >
                        Apply for {c.tier} <IconArrow size={16} />
                      </button>
                      <a className="plan__doc" href={prospectusLink} target="_blank" rel="noopener noreferrer">
                        <IconDoc size={14} /> Prospectus
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <p className="plans__note">
          Batches are kept small so every student gets machine time. Fees and next start
          dates are shared on enquiry.
        </p>
      </div>
    </section>
  )
}
