import { useEffect, useRef, useState } from 'react'
import { REVIEWS } from '../data.js'
import { IconQuote } from '../components/icons.jsx'

// How many reviews show before "View more", and how many each press adds.
const FIRST = 4
const STEP = 4

/**
 * Student voices.
 *
 * One track, two shapes: a swipeable horizontal strip on a phone, a grid from
 * 680px up. The "View more reviews" control is the LAST item in that track, so
 * on a phone you reach it by swiping to the end of the strip, and on desktop
 * the same element spans the full grid width and reads as a button under the
 * cards.
 *
 * Every entry in REVIEWS must be a real student's words. Invented testimonials
 * do not belong in that list.
 */
export default function Reviews() {
  const [shown, setShown] = useState(FIRST)
  const trackRef = useRef(null)
  const prevShown = useRef(FIRST)

  const visible = REVIEWS.slice(0, shown)
  const left = REVIEWS.length - shown

  // After revealing a batch on the phone strip, slide to the first new card so
  // it is obvious something arrived; the grid needs no such nudge.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const grew = shown > prevShown.current
    prevShown.current = shown
    if (!grew) return
    if (track.scrollWidth <= track.clientWidth + 4) return // grid mode
    const firstNew = track.children[shown - STEP]
    if (firstNew) track.scrollTo({ left: firstNew.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }, [shown])

  return (
    <section className="reviews" id="reviews">
      <div className="shead shead--mid">
        <span className="kicker">Real practice. Real skills.</span>
        <h2>Practice makes perfect, and our students <em>prove it daily.</em></h2>
        <p>What graduates say about training at Kotil Aesthetic Academy.</p>
      </div>

      {/* data-lenis-prevent: let the browser own the sideways swipe here
          instead of Lenis swallowing the gesture */}
      <div className="reviews__track" id="reviews-list" ref={trackRef} data-lenis-prevent>
        {visible.map((r, n) => (
          <article
            className={`review${n >= FIRST ? ' review--more' : ''}`}
            key={r.name}
            // stagger only the newly revealed batch
            style={n >= FIRST ? { animationDelay: `${((n - FIRST) % STEP) * 70}ms` } : undefined}
          >
            <span className="review__quoteico" aria-hidden="true"><IconQuote size={20} /></span>
            <div className="review__stars" aria-label={`${r.stars} out of 5`}>{'★'.repeat(r.stars)}</div>
            <p className="review__text">{r.text}</p>
            <footer className="review__foot">
              <span className="review__avatar" aria-hidden="true">{r.name[0]}</span>
              <div>
                <p className="review__name">{r.name}</p>
                <p className="review__place">{r.place}</p>
              </div>
            </footer>
          </article>
        ))}

        {(left > 0 || shown > FIRST) && (
          <div className="reviews__end">
            {left > 0 ? (
              <button className="btn-ghost" aria-controls="reviews-list" onClick={() => setShown((s) => s + STEP)}>
                View more reviews <span className="reviews__count">+{Math.min(left, STEP)}</span>
              </button>
            ) : (
              <button
                className="btn-ghost"
                aria-controls="reviews-list"
                onClick={() => {
                  setShown(FIRST)
                  prevShown.current = FIRST
                  trackRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
                }}
              >
                Show fewer reviews
              </button>
            )}
          </div>
        )}
      </div>

      <p className="reviews__hint">Swipe to read more →</p>
    </section>
  )
}
