import Img, { srcSetFor } from '../components/Img.jsx'
import { SOCIALS } from '../config.js'
import { IconArrow, IconZoom } from '../components/icons.jsx'

/**
 * The academy's own campaign artwork, shown at its native 4:5 crop.
 *
 * These posters are already doing the selling on Instagram, and they carry
 * details the page states in its own words elsewhere — the accreditation
 * lockup, the treatment list, the dates. Reproducing them as-is rather than
 * re-typesetting them keeps the site and the feed saying the same thing.
 *
 * Each one opens at full size in a new tab, because a poster is wall-to-wall
 * type: the headline reads in the strip, the twelve course highlights under it
 * do not, and cropping or shrinking that list would be the same as deleting it.
 */
const POSTERS = [
  {
    img: 'posters/pg-diploma-batch',
    label: 'PG Diploma in Clinical Cosmetology',
    alt: 'Campaign poster: PG Diploma in Clinical Cosmetology, five days hands-on with six months of online learning, admissions open for the new Delhi batch',
  },
  {
    img: 'posters/pg-diploma-dates',
    label: 'Next batch: 1 to 5 October',
    alt: 'Campaign poster: PG Diploma in Clinical Cosmetology in Delhi, 1st to 5th October 2026, limited seats, with the twelve course highlights listed',
  },
  {
    img: 'posters/why-kotil',
    label: 'Why students choose Kotil',
    alt: 'Campaign poster: why choose Kotil Aesthetic Academy for clinical cosmetology, listing hands-on practical training, advanced techniques, industry-focused learning and career support',
  },
]

export default function Posters() {
  const ig = SOCIALS.find((s) => s.id === 'ig')

  return (
    <section className="posters">
      <div className="shead shead--mid">
        <span className="kicker">From our feed</span>
        <h2>What we&apos;re <em>announcing</em> right now</h2>
        <p>Current intakes, programmes and offers, straight from @kotil.aestheticacademy.</p>
      </div>

      <div className="posters__row" data-lenis-prevent>
        {POSTERS.map((p) => (
          <figure className="poster" key={p.img}>
            <a
              className="poster__open"
              href={srcSetFor(p.img)?.src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the full poster: ${p.label}`}
            >
              <Img name={p.img} alt={p.alt} sizes="(min-width: 900px) 33vw, 82vw" />
              <span className="poster__zoom" aria-hidden="true"><IconZoom size={15} /> Full size</span>
            </a>
            <figcaption className="poster__cap">{p.label}</figcaption>
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
