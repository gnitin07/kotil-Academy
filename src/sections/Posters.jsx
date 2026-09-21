import Img from '../components/Img.jsx'
import { SOCIALS } from '../config.js'
import { IconArrow } from '../components/icons.jsx'

/**
 * The academy's own campaign artwork, shown at its native square crop.
 *
 * These posters are already doing the selling on Instagram, and they carry
 * details the page states in its own words elsewhere — the accreditation
 * lockup, the treatment list, the phone number. Reproducing them as-is rather
 * than re-typesetting them keeps the site and the feed saying the same thing.
 */
const POSTERS = [
  { img: 'posters/trusted', alt: "Campaign poster: India's Trusted Aesthetic Training Academy" },
  { img: 'posters/shaping', alt: 'Campaign poster: Shaping Skill, Creating Experts' },
  { img: 'posters/diploma', alt: 'Campaign poster: Advance Diploma in Cosmetology' },
]

export default function Posters() {
  const ig = SOCIALS.find((s) => s.id === 'ig')

  return (
    <section className="posters">
      <div className="shead shead--mid">
        <span className="kicker">From our feed</span>
        <h2>What we&apos;re <em>announcing</em> right now</h2>
        <p>Current intakes, programmes and offers — straight from @kotil.aestheticacademy.</p>
      </div>

      <div className="posters__row" data-lenis-prevent>
        {POSTERS.map((p) => (
          <figure className="poster" key={p.img}>
            <Img name={p.img} alt={p.alt} sizes="(min-width: 900px) 33vw, 82vw" />
          </figure>
        ))}
      </div>

      <div className="tour__foot">
        <a className="btn-ghost" href={ig.url} target="_blank" rel="noopener noreferrer">
          Follow on Instagram <IconArrow size={16} />
        </a>
      </div>
    </section>
  )
}
