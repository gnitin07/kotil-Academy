import { useEffect, useState } from 'react'
import { ACADEMY, enquireLink, prospectusLink, telLink } from '../config.js'
import { WhatsAppGlyph, IconPhone, IconDoc } from './icons.jsx'

/**
 * Bottom-right contact launcher.
 *
 * The three things a visitor on a course page actually wants — ask a question,
 * get the prospectus, call — behind one tap, instead of three competing
 * floating buttons stacked up the edge of the screen.
 *
 * The label auto-hides after the first scroll: it earns attention once, then
 * gets out of the way of the content it is sitting on top of.
 */
export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false)
  const [labelled, setLabelled] = useState(true)

  useEffect(() => {
    const hide = () => setLabelled(false)
    window.addEventListener('scroll', hide, { once: true, passive: true })
    return () => window.removeEventListener('scroll', hide)
  }, [])

  return (
    <div className="fwa">
      {open && (
        <div className="fwa__card">
          <div className="fwa__head">
            <span className="fwa__headico"><WhatsAppGlyph size={22} /></span>
            <div>
              <strong>{ACADEMY.short} admissions</strong>
              <p>Typically replies within the hour</p>
            </div>
          </div>
          <div className="fwa__body">
            <a className="fwa__row" href={enquireLink} target="_blank" rel="noopener noreferrer">
              <span className="fwa__rowico"><WhatsAppGlyph size={18} /></span>
              <span className="fwa__rowlabel">Chat about courses</span>
              <span className="fwa__go" aria-hidden="true">›</span>
            </a>
            <a className="fwa__row" href={prospectusLink} target="_blank" rel="noopener noreferrer">
              <span className="fwa__rowico"><IconDoc size={18} /></span>
              <span className="fwa__rowlabel">Request the prospectus</span>
              <span className="fwa__go" aria-hidden="true">›</span>
            </a>
            <a className="fwa__row" href={telLink}>
              <span className="fwa__rowico"><IconPhone size={18} /></span>
              <span className="fwa__rowlabel">Call {ACADEMY.phoneDisplay}</span>
              <span className="fwa__go" aria-hidden="true">›</span>
            </a>
          </div>
        </div>
      )}

      {labelled && !open && <span className="fwa__label">Questions? <b>Talk to us</b></span>}

      <button
        className="fwa__fab"
        aria-label={open ? 'Close contact options' : 'Open contact options'}
        aria-expanded={open}
        onClick={() => { setOpen((o) => !o); setLabelled(false) }}
      >
        {open ? <span className="fwa__x" aria-hidden="true">×</span> : <WhatsAppGlyph size={26} />}
      </button>
    </div>
  )
}
