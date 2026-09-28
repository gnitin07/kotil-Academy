import { useCallback, useEffect, useRef, useState } from 'react'
import Img, { srcSetFor } from '../components/Img.jsx'
import { UPCOMING } from '../data.js'
import { useLockScroll } from '../useLockScroll.js'
import { IconArrow, IconZoom } from '../components/icons.jsx'

/**
 * Upcoming batches: one card per programme currently enrolling, shown with the
 * academy's own campaign creative at its native 4:5 crop.
 *
 * The card is the enquiry. Tapping a programme opens the enquiry popup with
 * that course already chosen, so it lands in the counsellors' sheet saying
 * what the visitor was looking at, and "Enquire now" under the strip opens the
 * same popup for anyone still deciding.
 *
 * A creative is wall-to-wall type, and its small print does not survive being
 * a card in a strip, so the "Full size" chip on each one still opens it in the
 * viewer below. A programme whose creative has not arrived yet shows its name
 * on a plain card; see UPCOMING in data.js.
 *
 * @param {(course?: string) => void} onEnquire  opens the enquiry popup
 * @param {React.RefObject} lenisRef             stopped while the viewer is open
 */
export default function Posters({ onEnquire, lenisRef }) {
  // only the programmes with a creative can be opened in the viewer
  const art = UPCOMING.filter((b) => b.img)
  const [open, setOpen] = useState(null) // index into `art`, or null
  const touch = useRef(null)
  const closeRef = useRef(null)

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d) => setOpen((i) => (i + d + art.length) % art.length), [art.length])
  useLockScroll(open !== null, lenisRef, close)

  // arrows on a keyboard, and focus on the close button so Enter or Space exits
  useEffect(() => {
    if (open === null) return
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, step])

  const current = open !== null ? art[open] : null
  const full = current && srcSetFor(current.img)

  return (
    <section className="posters" id="batches">
      <div className="shead shead--mid">
        <span className="kicker">Upcoming batches</span>
        <h2>Next intakes in <em>Delhi.</em></h2>
        <p>Seats are limited in every batch. Tap a programme to enquire.</p>
      </div>

      <div className="posters__row" data-lenis-prevent>
        {UPCOMING.map((b) => (
          <figure className="poster" key={b.course}>
            {b.img ? (
              <div className="poster__art">
                <button className="poster__open" onClick={() => onEnquire(b.course)} aria-label={`Enquire about the ${b.course}`}>
                  <Img name={b.img} alt={b.alt} sizes="(min-width: 900px) 33vw, 82vw" />
                </button>
                <button
                  className="poster__zoom"
                  onClick={() => setOpen(art.indexOf(b))}
                  aria-label={`View the ${b.course} poster full size`}
                >
                  <IconZoom size={15} /> Full size
                </button>
              </div>
            ) : (
              <button className="poster__open poster__blank" onClick={() => onEnquire(b.course)}>
                <span className="kicker">Upcoming batch</span>
                <strong>{b.course}</strong>
                <span className="poster__blank-cta">Tap to enquire <IconArrow size={15} /></span>
              </button>
            )}
            <figcaption>
              <button className="poster__cap" onClick={() => onEnquire(b.course)} tabIndex={-1} aria-hidden="true">
                <span>{b.course}</span>
                <span className="poster__cap-go">Enquire <IconArrow size={14} /></span>
              </button>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="tour__foot">
        <button className="btn-primary" onClick={() => onEnquire()}>
          Enquire now <IconArrow size={16} />
        </button>
      </div>

      {current && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.course}
          onClick={close}
          onTouchStart={(e) => { touch.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            if (touch.current == null) return
            const dx = e.changedTouches[0].clientX - touch.current
            if (art.length > 1 && Math.abs(dx) > 45) step(dx < 0 ? 1 : -1)
            touch.current = null
          }}
          data-lenis-prevent
        >
          <button ref={closeRef} className="lightbox__close" aria-label="Close" onClick={close}>×</button>
          {art.length > 1 && <p className="lightbox__count" aria-live="polite">{open + 1} / {art.length}</p>}

          <img
            className="lightbox__img"
            src={full.src}
            srcSet={full.srcSet}
            sizes="(min-width: 760px) 720px, 100vw"
            alt={current.alt}
            onClick={(e) => e.stopPropagation()}
          />

          {art.length > 1 && (
            <>
              <button className="lightbox__nav lightbox__nav--prev" aria-label="Previous poster"
                onClick={(e) => { e.stopPropagation(); step(-1) }}>‹</button>
              <button className="lightbox__nav lightbox__nav--next" aria-label="Next poster"
                onClick={(e) => { e.stopPropagation(); step(1) }}>›</button>
            </>
          )}
        </div>
      )}
    </section>
  )
}
