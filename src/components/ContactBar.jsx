import { enquireLink, telLink } from '../config.js'
import { IconPhone, WhatsAppGlyph } from './icons.jsx'

/**
 * The fixed contact bar along the bottom of the screen: call and WhatsApp side
 * by side, always one tap away however far down the page someone is.
 *
 * On a desktop it also carries a "Request a callback" tab at its right-hand
 * end, which opens the callback popup on demand. A phone does without it: the
 * popup is offered to phone visitors on its own timer, and two full-width
 * buttons are what a thumb can hit reliably.
 *
 * It replaces the round WhatsApp launcher that used to float in the corner,
 * which would otherwise sit on top of this bar offering the same thing twice.
 *
 * @param {() => void} onCallback  opens the callback popup
 */
export default function ContactBar({ onCallback }) {
  return (
    <div className="cbar" role="region" aria-label="Contact the academy">
      <div className="cbar__inner">
        <a className="cbar__btn cbar__btn--call" href={telLink}>
          <IconPhone size={18} /> Call Now
        </a>
        <a className="cbar__btn cbar__btn--wa" href={enquireLink} target="_blank" rel="noopener noreferrer">
          <WhatsAppGlyph size={19} /> WhatsApp
        </a>
      </div>
      <button className="cbar__tab" type="button" onClick={onCallback}>
        <IconPhone size={15} /> Request a callback
      </button>
    </div>
  )
}
