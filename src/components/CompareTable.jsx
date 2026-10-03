import { COURSES } from '../data.js'
import { courseHref, follow, formatFee } from '../courseRoute.js'

// The three levels side by side, as in the prospectus. Used on every course
// page and as a slide in the home page banner. Each row reads the course data,
// so a change there shows in both places.
const LEVELS = COURSES.filter((o) => o.fee && o.slug)

const has = (c, topic) => (c.topics.some((t) => t.startsWith(topic)) ? 'Yes' : '—')

// The Treatments row leads, in a colour of its own: it is the headline
// difference between the levels.
const ROWS = [
  ['Treatments', (c) => c.treatments, 'is-key'],
  ['Duration', (c) => c.duration],
  ['Hours a day', (c) => c.daily.replace(' a day', '')],
  ['Fee', (c) => formatFee(c.fee)],
  ['Hands-on practice', (c) => c.handsOn],
  ['Internship & live project', (c) => has(c, 'Internship')],
  ['Marketing & business support', (c) => (c.support ? `Yes, ${c.support}` : has(c, 'Marketing'))],
  ['Machinery setup guidance', (c) => has(c, 'Low-cost machinery')],
  ['Placement & lifetime support', (c) => has(c, 'Placement')],
  ['You graduate with', (c) => c.award],
]

/**
 * @param {string} [current]    slug of the level to highlight; it is not linked
 * @param {string} [className]  extra class for the placement (course page, banner)
 */
export default function CompareTable({ current, className = '' }) {
  const on = (o) => (o.slug === current ? 'is-current' : undefined)
  return (
    <table className={`compare ${className}`.trim()}>
      <thead>
        <tr>
          <th scope="col"><span className="sr-only">Detail</span></th>
          {LEVELS.map((o) => (
            <th scope="col" key={o.id} className={on(o)}>
              {o.slug === current ? o.tier : <a href={courseHref(o.slug)} onClick={follow}>{o.tier}</a>}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ROWS.map(([label, get, rowClass]) => (
          <tr key={label} className={rowClass}>
            <th scope="row">{label}</th>
            {LEVELS.map((o) => <td key={o.id} className={on(o)}>{get(o)}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
