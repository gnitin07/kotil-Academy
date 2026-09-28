import Img from '../components/Img.jsx'
import { COURSES } from '../data.js'
import { courseHref, follow, formatFee } from '../courseRoute.js'
import { IconArrow } from '../components/icons.jsx'

/**
 * Our plans: one card per course, each opening its own page.
 *
 * A card carries only what a visitor chooses between (the photo of the
 * treatment that level unlocks, the subject, the fee, one sentence and the
 * length) and everything else is on the course page, so the section stays
 * short. Courses without a fee set in data.js stay off it until they have one.
 */
export default function About() {
  const priced = COURSES.filter((c) => c.fee && c.slug)

  return (
    <section className="plans-sec" id="courses">
      <div className="shead shead--mid">
        <span className="kicker">Our plans</span>
        <h2>Three levels, one <em>career path.</em></h2>
      </div>

      <div className="pcards">
        {priced.map((c) => (
          <a className="pcard" key={c.id} href={courseHref(c.slug)} onClick={follow}>
            <div className="pcard__media">
              <Img name={c.img} alt={c.imgAlt} sizes="(min-width: 980px) 33vw, (min-width: 640px) 50vw, 100vw" />
              <span className="pcard__cat">{c.category}</span>
              <span className="pcard__fee">{formatFee(c.fee)}</span>
            </div>
            <div className="pcard__body">
              <h3>{c.tier}: {c.title}</h3>
              <p>{c.summary}</p>
              <span className="pcard__more">
                <span>{c.duration}</span>
                <span className="pcard__go">View course <IconArrow size={15} /></span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
