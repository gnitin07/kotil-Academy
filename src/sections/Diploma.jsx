import { useCallback, useEffect, useRef, useState } from 'react'
import Img, { srcSetFor } from '../components/Img.jsx'
import { useLockScroll } from '../useLockScroll.js'
import { DIPLOMA } from '../data.js'
import { IconArrow, IconZoom } from '../components/icons.jsx'

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
 * The poster behaves like the ones in the Upcoming batches strip: tapping it
 * opens the enquiry popup with this diploma chosen, and its "Full size" chip
 * opens it in the same viewer, with a close button.
 *
 * @param {(course: string) => void} onApply    opens the enrolment dialog, prefilled
 * @param {(course: string) => void} onEnquire  opens the enquiry popup, prefilled
 * @param {React.RefObject} lenisRef            stopped while the viewer is open
 */
export default function Diploma({ onApply, onEnquire, lenisRef }) {
  const [open, setOpen] = useState(null)
  const [viewing, setViewing] = useState(false)
  const closeRef = useRef(null)
  const closeViewer = useCallback(() => setViewing(false), [])
  useLockScroll(viewing, lenisRef, closeViewer)
  useEffect(() => { if (viewing) closeRef.current?.focus() }, [viewing])
  const full = srcSetFor(DIPLOMA.poster)

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
          <button
            className="diploma__open"
            onClick={() => onEnquire(DIPLOMA.title)}
            aria-label={`Enquire about the ${DIPLOMA.title}`}
          >
            <Img
              name={DIPLOMA.poster}
              alt={`${DIPLOMA.title}, course poster listing every module`}
              sizes="(min-width: 960px) 46vw, 100vw"
            />
          </button>
          <button
            className="poster__zoom"
            onClick={() => setViewing(true)}
            aria-label={`View the ${DIPLOMA.title} poster full size`}
          >
            <IconZoom size={15} /> Full size
          </button>
        </figure>
      </div>

      {viewing && full && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={DIPLOMA.title} onClick={closeViewer} data-lenis-prevent>
          <button ref={closeRef} className="lightbox__close" aria-label="Close" onClick={closeViewer}>×</button>
          <img
            className="lightbox__img"
            src={full.src}
            srcSet={full.srcSet}
            sizes="(min-width: 760px) 720px, 100vw"
            alt={`${DIPLOMA.title}, course poster listing every module`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
