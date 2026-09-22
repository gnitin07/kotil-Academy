import Img from '../components/Img.jsx'
import { WHY, TEAM, PARTNERS } from '../data.js'
import { WHY_ICONS } from '../components/icons.jsx'

/**
 * Why Choose Us — five promises, each shown rather than just claimed.
 *
 * Every card opens on a visual that IS the evidence for its line: the actual
 * trainers' faces, the actual accreditation marks, the actual treatment room.
 * The line icon now sits in a solid gold badge that overlaps the visual's
 * edge, instead of a faint outline in a pale square.
 */
export default function Why() {
  return (
    <section className="why" id="why">
      <div className="why__inner">
        <div className="shead shead--mid">
          <span className="kicker">Why choose us</span>
          <h2>Five reasons students travel from across India to <em>train here.</em></h2>
        </div>

        <div className="why__grid">
          {WHY.map((w) => (
            <article className={`why__card why__card--${w.icon}`} key={w.title}>
              <div className="why__visual">
                <Visual kind={w.icon} />
              </div>
              <span className="why__badge" aria-hidden="true">{WHY_ICONS[w.icon]}</span>
              <div className="why__text">
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** The evidence panel at the top of each card. */
function Visual({ kind }) {
  switch (kind) {
    case 'trainer':
      return (
        <div className="wv-faces">
          {TEAM.map((t) => (
            <span className="wv-face" key={t.name}>
              <Img name={t.img} alt="" sizes="96px" />
            </span>
          ))}
          <span className="wv-faces__note">Senior trainers who still practise</span>
        </div>
      )
    case 'certificate':
      return (
        <ul className="wv-logos">
          {PARTNERS.map((p) => (
            <li key={p.name}><Img name={`partners/${p.logo}`} alt={p.name} sizes="110px" /></li>
          ))}
        </ul>
      )
    case 'hands':
      return <Img className="wv-photo" name="academy/practical" alt="Students practising on a client under supervision" sizes="(min-width: 1040px) 30vw, 100vw" />
    case 'machine':
      return <Img className="wv-photo" name="academy/machine-room" alt="A treatment room fitted with clinical equipment" sizes="(min-width: 1040px) 45vw, 100vw" />
    case 'placement':
      return (
        <ul className="wv-paths">
          <li><b>01</b>Top clinics</li>
          <li><b>02</b>Your own setup</li>
          <li><b>03</b>Opportunities abroad</li>
        </ul>
      )
    default:
      return null
  }
}
