/**
 * Single source of truth for everything about the academy.
 * Change a phone number / address / social handle HERE and it updates every
 * link, button and prefilled WhatsApp message across the whole site.
 *
 * Mirrors the sibling clinic site (kotil skin) on purpose — same shape, same
 * helper names — so anyone who has edited one can edit the other.
 */

export const ACADEMY = {
  name: 'Kotil Aesthetic Academy',
  short: 'Kotil Academy',
  tagline: 'Crafting Skincare Experts of Tomorrow',
  // Digits only, with country code — used to build tel: and wa.me links.
  phone: '919871054183',
  phoneDisplay: '+91 98710 54183',
  email: 'kotilaestheticacademy@gmail.com',
  site: 'https://www.kotilaestheticacademy.com',
  // The training floor is the clinic itself — students practise on real
  // clients there, which is the whole pitch. Same address as Kotil Skin Science.
  clinic: { name: 'Kotil Skin Science', url: 'https://kotilskinscience.com/' },
  hours: { open: '10 AM', close: '7 PM', closedDay: 'Sunday' },
  address: {
    line1: 'Plot No. 8, Ground Floor, Shankar Vihar',
    line2: 'Preet Vihar, New Delhi 110092',
    area: 'Preet Vihar, East Delhi',
    // Used for both the embedded map and the "Get directions" link.
    query: 'Plot No-8 Shankar Vihar Preet Vihar New Delhi 110092',
  },
}

export const SOCIALS = [
  { id: 'ig', label: 'Instagram', url: 'https://www.instagram.com/kotil.aestheticacademy/' },
  { id: 'fb', label: 'Facebook', url: 'https://www.facebook.com/kotil.aestheticacademy' },
  { id: 'x', label: 'X', url: 'https://x.com/kotilacademy' },
  { id: 'yt', label: 'YouTube', url: 'https://www.youtube.com/@kotil.aestheticacademy' },
]

// ---- derived links -------------------------------------------------------

export const telLink = `tel:+${ACADEMY.phone}`
export const mailLink = `mailto:${ACADEMY.email}`

/** WhatsApp deep link with a prefilled message. */
export const waLink = (message) =>
  `https://wa.me/${ACADEMY.phone}?text=${encodeURIComponent(message)}`

/** "I want to enrol in <course>" — used by every course card on the site. */
export const applyLink = (course) =>
  waLink(
    `Hi ${ACADEMY.name}, I'd like to enrol in the ${course}. ` +
    `Please share the next batch dates, fees and eligibility details.`
  )

/** Generic admissions enquiry (nav / hero / CTA / footer). */
export const enquireLink = waLink(
  `Hi ${ACADEMY.name}, I'd like to know more about your aesthetic training courses.`
)

/** Prospectus request — the PDF is the academy's main sales asset. */
export const prospectusLink = waLink(
  `Hi ${ACADEMY.name}, please send me the course prospectus.`
)

/** "Open 10 AM – 7 PM · Closed Sundays" — one string, so hours never drift
 *  between the places that show them. */
export const hoursLine =
  `Open ${ACADEMY.hours.open} – ${ACADEMY.hours.close} · Closed ${ACADEMY.hours.closedDay}s`

const mapQuery = encodeURIComponent(ACADEMY.address.query)
export const directionsLink = `https://www.google.com/maps/search/${mapQuery}`
export const mapEmbedSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`
