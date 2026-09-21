import Img from '../components/Img.jsx'
import { TEAM } from '../data.js'

/**
 * Meet the trainers — a fanned deck of cards, the same move as the Devriz
 * doctors section.
 *
 * On desktop the three cards overlap and tilt into a fan that rises from below
 * as the section scrolls in; on a phone they stack, each laying slightly over
 * the one above, and ease up one at a time. All of that motion lives in
 * animations.js. The hover lift is on `.trainer__card` (the inner element) so
 * it never fights the rotation GSAP writes onto `.trainer`.
 */
export default function Team() {
  return (
    <section className="team" id="team">
      <div className="team__inner">
        <div className="shead shead--mid team__head">
          <span className="kicker">Meet our team</span>
          <h2>Trained by people who still <em>treat.</em></h2>
          <p>
            Every trainer here runs clinical work alongside teaching, so the protocols you
            learn are the ones being used this week.
          </p>
        </div>

        <div className="team__deck">
          {TEAM.map((t) => (
            <article className={`trainer trainer--${t.tint}`} key={t.name}>
              <div className="trainer__card">
                <div className="trainer__media">
                  <span className="trainer__tag">{t.tag}</span>
                  <Img name={t.img} alt={t.name} sizes="(min-width: 768px) 19rem, 85vw" />
                </div>

                <div className="trainer__body">
                  <h3>{t.name}</h3>
                  <p className="trainer__role">{t.qualification}</p>

                  <div className="trainer__stats">
                    <div className="trainer__stat">
                      <strong>{t.years}</strong>
                      <small>years experience</small>
                    </div>
                    <div className="trainer__stat">
                      <strong>{t.trained}</strong>
                      <small>students trained</small>
                    </div>
                  </div>

                  <p className="trainer__spec"><span>Specialises in</span>{t.specialization}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
