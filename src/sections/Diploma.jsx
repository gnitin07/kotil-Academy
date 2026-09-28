import { useState } from 'react'
import Img from '../components/Img.jsx'
import { DIPLOMA } from '../data.js'
import { IconArrow } from '../components/icons.jsx'

/**
 * The one-month cosmetology diploma — the programme the academy runs its
 * Instagram campaigns on. It sits apart from the three-level ladder because it
 * is sold differently: a named list of treatments you can perform by the end,
 * rather than a syllabus you progress through.
 *
 * Its own campaign poster does the visual work here, shown at the square crop
 * it was drawn at rather than stretched into a banner.
 *
 * Each module is a pill that opens to a line or two on what it is. One is open
 * at a time, and an open one takes the full row, so the text is never squeezed
 * into half a phone's width.
 *
 * @param {(course: string) => void} onApply  opens the enrolment dialog, prefilled
 */
export default function Diploma({ onApply }) {
  const [open, setOpen] = useState(null)

  return (
    <section className="diploma" id="diploma">
      <div className="diploma__inner">
        <div className="diploma__copy">
          <span className="kicker">Fast-track programme</span>
          <h2>{DIPLOMA.title}</h2>
          <p className="diploma__dur"><span>Duration</span> {DIPLOMA.duration}</p>
          <p className="diploma__blurb">{DIPLOMA.blurb}</p>

          <ul className="diploma__mods">
            {DIPLOMA.modules.map((m, i) => {
              const info = DIPLOMA.about?.[m]
              const isOpen = open === m
              const num = <span className="diploma__modnum">{String(i + 1).padStart(2, '0')}</span>
              if (!info) return <li className="diploma__mod" key={m}><span className="diploma__modbtn">{num}{m}</span></li>
              return (
                <li className={`diploma__mod${isOpen ? ' is-open' : ''}`} key={m}>
                  <button
                    className="diploma__modbtn"
                    aria-expanded={isOpen}
                    aria-controls={`mod-${i}`}
                    onClick={() => setOpen(isOpen ? null : m)}
                  >
                    {num}
                    <span className="diploma__modname">{m}</span>
                    <span className="diploma__modsign" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                  </button>
                  <p className="diploma__modinfo" id={`mod-${i}`} hidden={!isOpen}>{info}</p>
                </li>
              )
            })}
          </ul>

          <button className="btn-primary" onClick={() => onApply(DIPLOMA.title)}>
            Enquire about this diploma <IconArrow size={16} />
          </button>
        </div>

        <figure className="diploma__poster">
          <span className="diploma__postertag">Now enrolling</span>
          <Img
            name={DIPLOMA.poster}
            alt={`${DIPLOMA.title}, course poster listing every module`}
            sizes="(min-width: 960px) 46vw, 100vw"
          />
        </figure>
      </div>
    </section>
  )
}
