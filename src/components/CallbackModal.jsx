import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ACADEMY, CALLBACK } from '../config.js'
import { useLockScroll } from '../useLockScroll.js'
import SlotPicker, { ANY_TIME, callSlots } from './SlotPicker.jsx'
import { IconArrow, IconCheck, IconPhone, WhatsAppGlyph } from './icons.jsx'

/**
 * How long a visitor is on the page before the offer appears. It comes up on
 * every page load, a refresh included: the academy wants it seen, so nothing
 * is remembered between loads.
 */
const DELAY_MS = 6000

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
]

/**
 * A 10-digit Indian mobile, whatever the visitor typed around it: spaces,
 * dashes, a +91 or a leading 0. Returns null for anything that is not one.
 */
export function normaliseMobile(raw) {
  let d = raw.replace(/\D/g, '')
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2)
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1)
  return /^[6-9]\d{9}$/.test(d) ? d : null
}

const waHref = (lead) => {
  const text = [
    `Hi ${ACADEMY.name}, please call me back.`,
    '',
    `Name: ${lead.name}`,
    `Mobile: ${lead.phone}`,
    `State: ${lead.state}`,
    lead.course && `Course: ${lead.course}`,
    `Best time to call: ${lead.slot}`,
  ].filter(Boolean).join('\n')
  return `https://wa.me/${CALLBACK.whatsapp}?text=${encodeURIComponent(text)}`
}

/**
 * "Request a callback": name, mobile, state and the time the visitor is free
 * to take the call, offered once they have been reading for a few seconds.
 *
 * Every request goes to CALLBACK in config.js. With a sheet URL set, it is
 * posted to the Google Apps Script in scripts/callback-sheet.gs and lands as a
 * row the counsellors work down; without one, it opens WhatsApp prefilled, so
 * the form is useful before the sheet exists.
 *
 * It is offered six seconds into every page load, a refresh included, and it
 * stands aside if the visitor is already in the apply dialog —
 * someone filling in an application does not need a second form on top of it.
 * The "Request a callback" tab in the contact bar opens it on demand; once a
 * visitor has opened it themselves, the timed offer does not come round again on that load.
 *
 * The name field is not focused when it appears: on a phone that would throw
 * the keyboard up over a dialog the visitor did not ask for.
 *
 * Opened from a programme in the "Upcoming batches" strip, it names that course
 * in its heading and sends it with the request. There is no course question
 * otherwise: the counsellor works that out on the call. What the form asks
 * instead is when to make the call, on a day reel and a time reel (see
 * SlotPicker), so the call lands when the visitor is free to take it. The
 * sheet always gets a real date, "Wed 1 Oct, 3 PM", never "Tomorrow".
 *
 * @param {boolean} open                whether the dialog is showing
 * @param {string}  course              the programme it was opened from, if any
 * @param {() => void} onOpen          raised by the timed offer
 * @param {() => void} onClose
 * @param {React.RefObject} lenisRef    the shared Lenis instance
 * @param {boolean} suppressed          true while the apply dialog is open
 */
export default function CallbackModal({ open, course, onOpen, onClose, lenisRef, suppressed }) {
  const [status, setStatus] = useState('idle') // idle | sending | done | failed
  const [error, setError] = useState('')
  const [lead, setLead] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', state: '', website: '' })
  // which day and time on the reels; the slots are worked out afresh each time
  // it opens, so a popup left open past an hour does not offer a slot gone by
  const [slot, setSlot] = useState({ day: 0, time: 0 })
  const days = useMemo(() => (open ? callSlots() : []), [open])
  const sheetRef = useRef(null)
  // read inside the timer, which is set once and must see current values
  const suppressedRef = useRef(suppressed)
  suppressedRef.current = suppressed
  const onOpenRef = useRef(onOpen)
  onOpenRef.current = onOpen
  const openedRef = useRef(false)

  useEffect(() => {
    const t = setTimeout(() => {
      // Already applying, or already opened it from the tab: this load's offer
      // is spent rather than deferred, or it would land the moment they close
      // whatever they were in.
      if (!suppressedRef.current && !openedRef.current) onOpenRef.current()
    // counted from when the page started loading, not from when this mounted,
    // so it lands six seconds after arrival however long the scripts took
    }, Math.max(0, DELAY_MS - performance.now()))
    return () => clearTimeout(t)
  }, [])

  const close = useCallback(() => onClose(), [onClose])
  useLockScroll(open, lenisRef, close)

  useEffect(() => {
    if (!open) return
    openedRef.current = true
    // opened again after a request went in: show the form, not the thank-you
    setStatus((s) => (s === 'done' || s === 'failed' ? 'idle' : s))
    setSlot({ day: 0, time: 0 })
    sheetRef.current?.focus()
  }, [open, course])

  if (!open) return null

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (k === 'phone') setError('')
  }

  const submit = async (e) => {
    e.preventDefault()
    // a field no person can see: anything that fills it in is a bot
    if (form.website) { setStatus('done'); return }

    const digits = normaliseMobile(form.phone)
    if (!digits) {
      setError('Please enter a 10-digit mobile number.')
      return
    }
    const d = days[slot.day]
    const t = d?.times[slot.time] ?? ANY_TIME
    const next = {
      name: form.name.trim(),
      phone: `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`,
      state: form.state,
      course: course || '',
      slot: d ? (t === ANY_TIME ? `${d.date}, any time` : `${d.date}, ${t}`) : ANY_TIME,
      page: window.location.href,
    }
    setLead(next)

    if (!CALLBACK.sheetUrl) {
      // opened inside the tap itself, so no popup blocker stands in the way
      window.open(waHref(next), '_blank', 'noopener,noreferrer')
      setStatus('done')
      return
    }

    setStatus('sending')
    try {
      // no-cors: Apps Script does not answer a browser's preflight, so the
      // request goes as a simple form post and its reply is unreadable. A
      // network failure still throws, and that is the case that matters.
      await fetch(CALLBACK.sheetUrl, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(next) })
      setStatus('done')
    } catch {
      setStatus('failed')
    }
  }

  const firstName = lead?.name.split(/\s+/)[0]

  return (
    <div className="modal modal--callback" role="dialog" aria-modal="true" aria-labelledby="callback-title" onClick={close}>
      <div className="modal__sheet" ref={sheetRef} tabIndex={-1} onClick={(e) => e.stopPropagation()} data-lenis-prevent>
        <button className="modal__close" aria-label="Close" onClick={close}>×</button>

        {status === 'done' ? (
          <div className="modal__done" role="status">
            <span className="modal__done-ico"><IconCheck size={26} /></span>
            <h3 id="callback-title">Thank you{firstName ? `, ${firstName}` : ''}</h3>
            <p>
              {CALLBACK.sheetUrl
                ? <>A counsellor will call you on <strong>{lead?.phone}</strong>, <strong>{lead?.slot}</strong>.</>
                : <>Send the WhatsApp message that just opened, and a counsellor will call you on <strong>{lead?.phone}</strong>.</>}
            </p>
            <button className="btn-dark modal__submit" onClick={close}>Back to the site</button>
          </div>
        ) : (
          <>
            <header className="modal__head">
              <span className="kicker">{course ? 'Enquire now' : 'Free counselling'}</span>
              <h3 id="callback-title">{course || 'Request a callback'}</h3>
              <p>
                {course
                  ? 'We\u2019ll call you with the batch dates, fees and eligibility.'
                  : 'Leave your details and a counsellor will call you back.'}
              </p>
            </header>

            <form className="modal__form" onSubmit={submit}>
              <label className="field">
                <span>Full name</span>
                <input required autoComplete="name" value={form.name} onChange={set('name')} placeholder="Your name" />
              </label>

              <label className="field">
                <span>Mobile number</span>
                <input
                  required type="tel" inputMode="numeric" autoComplete="tel-national"
                  value={form.phone} onChange={set('phone')} placeholder="10-digit mobile"
                  aria-invalid={!!error} aria-describedby={error ? 'callback-phone-error' : undefined} />
                {error && <em className="field__error" id="callback-phone-error">{error}</em>}
              </label>

              <label className="field field--wideonphone">
                <span>State</span>
                <select required value={form.state} onChange={set('state')}>
                  <option value="" disabled>Select your state</option>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>

              <div className="field field--wideonphone">
                <span>Best time to call</span>
                {days.length > 0 && (
                  <SlotPicker
                    days={days}
                    day={slot.day}
                    time={slot.time}
                    onChange={(day, time) => setSlot({ day, time })}
                  />
                )}
              </div>

              {/* honeypot: off-screen and out of the tab order, so only a bot fills it */}
              <label className="modal__hp" aria-hidden="true">
                Website
                <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
              </label>

              <div className="modal__foot">
                <button className="btn-primary modal__submit" type="submit" disabled={status === 'sending'}>
                  {CALLBACK.sheetUrl ? <IconPhone size={17} /> : <WhatsAppGlyph size={18} />}
                  {status === 'sending' ? 'Sending…' : 'Call me back'}
                  <IconArrow size={16} />
                </button>
                {status === 'failed' && (
                  <p className="field__error modal__fail">
                    That didn&apos;t go through.{' '}
                    <a href={waHref(lead)} target="_blank" rel="noopener noreferrer">Send it on WhatsApp instead</a>.
                  </p>
                )}
                <p className="modal__note">We use your number only to call you about your enquiry.</p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
