import { useState } from 'react'
import Img from '../components/Img.jsx'
import { FOUNDER } from '../data.js'
import { IconQuote } from '../components/icons.jsx'

/**
 * A word from our co-founder — the prospectus's welcome page.
 *
 * Two layouts off one piece of markup:
 *
 *  - Phone: compact. The portrait shrinks to a small arch beside her name, the
 *    lead paragraph shows, and the rest of the letter sits behind "Read the
 *    full letter", so the section costs about one screen instead of three.
 *  - Desktop (>= 900px): aligned two-column spread. The cut-out stands in a
 *    tall gold arch on the left; the full letter reads on the right. The toggle
 *    is hidden and the letter is always open.
 *
 * The toggle only changes a class; the full text is always in the DOM, so it
 * is indexed and read by screen readers either way.
 */
export default function Founder() {
  const [open, setOpen] = useState(false)
  const f = FOUNDER

  return (
    <section className="founder" id="founder">
      <div className="founder__inner">
        {/* portrait column */}
        <figure className="founder__figure">
          <div className="founder__arch">
            <Img name={f.img} alt={`${f.name}, ${f.title}`} sizes="(min-width: 900px) 34vw, 120px" />
          </div>
          <figcaption className="founder__plate">
            <strong>{f.name}</strong>
            <span>{f.title}</span>
          </figcaption>
        </figure>

        {/* letter column */}
        <div className="founder__letter">
          <span className="kicker">A word from our co-founder</span>
          <h2 className="founder__title">
            {f.headline[0]} {f.headline[1]} <em>{f.headline[2]}</em>
          </h2>

          <p className="founder__lead">
            <span className="founder__quote" aria-hidden="true"><IconQuote size={22} /></span>
            {f.lead}
          </p>

          <div className={`founder__more${open ? ' is-open' : ''}`} id="founder-more">
            {f.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>

          <button
            className="founder__toggle"
            aria-expanded={open}
            aria-controls="founder-more"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Show less' : 'Read the full letter'}
            <span aria-hidden="true">{open ? '−' : '+'}</span>
          </button>

          <footer className="founder__sign">
            <p>{f.signoff[0]}</p>
            <p className="founder__sign-line">{f.signoff[1]}</p>
            <p className="founder__by">— {f.name}, {f.title}</p>
          </footer>

          <ul className="founder__facts">
            {f.facts.map((x) => (
              <li key={x.k}><strong>{x.k}</strong><span>{x.v}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
