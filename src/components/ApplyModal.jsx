import { useEffect, useRef, useState } from 'react'
import { ACADEMY, waLink } from '../config.js'
import { COURSES, DIPLOMA } from '../data.js'
import { useLockScroll } from '../useLockScroll.js'
import { WhatsAppGlyph, IconArrow } from './icons.jsx'

const OPTIONS = [
  ...COURSES.map((c) => `${c.tier}: ${c.title}`),
  DIPLOMA.title,
  'Not sure yet, please advise',
]

/**
 * Enrolment form.
 *
 * Deliberately has no backend. The form composes a WhatsApp message and hands
 * the visitor off to the number the academy already answers all day — which
 * means the site stays a pure static build (deployable to GitHub Pages or
 * Vercel with nothing to run), no enquiry can be lost to a broken mail relay,
 * and the counsellor gets the conversation in the app they actually work in.
 *
 * Swap in a real POST later by replacing `submit()` — the form state is already
 * the shape an API would want.
 *
 * @param {boolean} open
 * @param {string}  course     preselected course, set by whichever card opened this
 * @param {() => void} onClose
 * @param {React.RefObject} lenisRef
 */
export default function ApplyModal({ open, course, onClose, lenisRef }) {
  const [form, setForm] = useState({ name: '', phone: '', city: '', course: OPTIONS[1], note: '' })
  const nameRef = useRef(null)

  // The course a card asked for wins over whatever was left in state.
  useEffect(() => {
    if (open && course) setForm((f) => ({ ...f, course }))
  }, [open, course])

  useLockScroll(open, lenisRef, onClose)

  useEffect(() => {
    if (open) nameRef.current?.focus()
  }, [open])

  if (!open) return null

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const lines = [
      `Hi ${ACADEMY.name}, I'd like to apply for a seat.`,
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.city && `City: ${form.city}`,
      `Course: ${form.course}`,
      form.note && `Background / question: ${form.note}`,
      '',
      'Please share the next batch dates and fees.',
    ].filter(Boolean)
    window.open(waLink(lines.join('\n')), '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="apply-title" onClick={onClose}>
      <div className="modal__sheet" onClick={(e) => e.stopPropagation()} data-lenis-prevent>
        <button className="modal__close" aria-label="Close" onClick={onClose}>×</button>

        <header className="modal__head">
          <span className="kicker">Admissions {new Date().getFullYear()}</span>
          <h3 id="apply-title">Apply for a seat</h3>
          <p>
            Fill this in and we&apos;ll open WhatsApp with your details ready to send. A
            counsellor usually replies the same day.
          </p>
        </header>

        <form className="modal__form" onSubmit={submit}>
          <label className="field">
            <span>Your name</span>
            <input ref={nameRef} required value={form.name} onChange={set('name')} placeholder="e.g. Priya Sharma" />
          </label>

          <label className="field">
            <span>Phone / WhatsApp</span>
            <input
              required type="tel" inputMode="tel" pattern="[0-9+\s-]{8,}"
              value={form.phone} onChange={set('phone')} placeholder="e.g. 98765 43210" />
          </label>

          <label className="field">
            <span>City <i>optional</i></span>
            <input value={form.city} onChange={set('city')} placeholder="e.g. Jaipur" />
          </label>

          <label className="field">
            <span>Course you&apos;re interested in</span>
            <select value={form.course} onChange={set('course')}>
              {OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </label>

          <label className="field field--wide">
            <span>Your background or a question <i>optional</i></span>
            <textarea
              rows={3} value={form.note} onChange={set('note')}
              placeholder="e.g. BAMS graduate, two years in a salon. Which level should I start at?" />
          </label>

          <div className="modal__foot">
            <button className="btn-primary modal__submit" type="submit">
              <WhatsAppGlyph size={18} /> Send on WhatsApp <IconArrow size={16} />
            </button>
            <p className="modal__note">
              We use your details only to answer your enquiry. Nothing is stored on this site.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
