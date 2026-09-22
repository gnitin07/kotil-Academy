import { useState } from 'react'
import { REVIEWS } from '../data.js'
import { IconQuote } from '../components/icons.jsx'

// How many reviews show before "View more", and how many each press adds.
const FIRST = 4
const STEP = 4

/**
 * Student voices.
 *
 * A grid that opens on four reviews and reveals the rest four at a time. The
 * "View more reviews" button only renders when there is something left to
 * show, so with four reviews in data.js it simply isn't there — add a fifth
 * and it appears on its own.
 *
 * Every entry in REVIEWS must be a real student's words. Placeholder or
 * invented testimonials do not belong in that list.
 */
export default function Reviews() {
  const [shown, setShown] = useState(FIRST)
  const visible = REVIEWS.slice(0, shown)
  const left = REVIEWS.length - shown

  return (
    <section className="reviews" id="reviews">
      <div className="shead shead--mid">
        <span className="kicker">Real practice. Real skills.</span>
        <h2>Practice makes perfect — and our students <em>prove it daily.</em></h2>
        <p>What graduates say about training at Kotil Aesthetic Academy.</p>
      </div>

      <div className="reviews__grid" id="reviews-list">
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
      </div>

      {(left > 0 || shown > FIRST) && (
        <div className="reviews__more">
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
                document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              Show fewer reviews
            </button>
          )}
        </div>
      )}
    </section>
  )
}
