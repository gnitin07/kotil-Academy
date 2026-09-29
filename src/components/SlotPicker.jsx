import { useEffect, useId, useMemo, useRef } from 'react'
import { ACADEMY } from '../config.js'

/** Height of one row on a reel, in px. The window shows three. */
const ROW = 32
/** How many days ahead a visitor can book. */
const DAYS_AHEAD = 7
/** A slot starting sooner than this is too soon to promise. */
const LEAD_MINUTES = 30

export const ANY_TIME = 'Any time'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "10 AM" -> 10, "7 PM" -> 19 */
const toHour = (s) => {
  const [, h, ap] = s.match(/(\d+)\s*(AM|PM)/i)
  return (Number(h) % 12) + (/pm/i.test(ap) ? 12 : 0)
}
/** 10 -> "10 AM", 12 -> "12 PM", 13 -> "1 PM" */
const hourLabel = (h) => `${h % 12 || 12} ${h < 12 ? 'AM' : 'PM'}`

/**
 * The days and hourly slots a counsellor can call in: opening hours from
 * config.js, the closed day skipped, and today only while it still has a slot
 * at least half an hour away.
 */
export function callSlots(now = new Date()) {
  const open = toHour(ACADEMY.hours.open)
  const close = toHour(ACADEMY.hours.close)
  const closed = WEEKDAYS.indexOf(ACADEMY.hours.closedDay)
  const hours = Array.from({ length: close - open }, (_, i) => open + i)
  const days = []

  for (let n = 0; days.length < DAYS_AHEAD && n < DAYS_AHEAD + 7; n++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + n)
    if (d.getDay() === closed) continue
    const earliest = n === 0 ? now.getHours() * 60 + now.getMinutes() + LEAD_MINUTES : -1
    const slots = hours.filter((h) => h * 60 >= earliest)
    if (!slots.length) continue
    // the reel says "Today" and "Tomorrow"; the sheet always gets the date
    const date = `${WEEKDAYS[d.getDay()].slice(0, 3)} ${d.getDate()} ${MONTHS[d.getMonth()]}`
    days.push({
      label: n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : date,
      date,
      times: [ANY_TIME, ...slots.map(hourLabel)],
    })
  }
  return days
}

/**
 * One reel: a short scrolling column that snaps a row into the window in the
 * middle. Spun with a swipe or the mouse wheel, stepped with the arrow keys,
 * or set by tapping a row.
 */
function Reel({ label, items, index, onChange }) {
  const id = useId()
  const ref = useRef(null)
  const settle = useRef(null)
  const moved = useRef(false)

  // Keep the reel on the chosen row when it is set from outside (a tap, a key,
  // or the other reel changing this one's list). The first placement jumps;
  // after that it glides, which is the spin.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const top = index * ROW
    if (Math.abs(el.scrollTop - top) > 1) el.scrollTo({ top, behavior: moved.current ? 'smooth' : 'auto' })
    moved.current = true
  }, [index, items.length])

  // read the row under the window once the scroll has come to rest
  const onScroll = () => {
    clearTimeout(settle.current)
    settle.current = setTimeout(() => {
      const el = ref.current
      if (!el) return
      const i = Math.max(0, Math.min(items.length - 1, Math.round(el.scrollTop / ROW)))
      if (i !== index) onChange(i)
      else if (Math.abs(el.scrollTop - i * ROW) > 1) el.scrollTo({ top: i * ROW, behavior: 'smooth' })
    }, 90)
  }
  useEffect(() => () => clearTimeout(settle.current), [])

  const onKeyDown = (e) => {
    const step = { ArrowDown: 1, ArrowUp: -1 }[e.key]
    if (!step) return
    e.preventDefault()
    onChange(Math.max(0, Math.min(items.length - 1, index + step)))
  }

  return (
    <div className="reel">
      <span className="reel__label" id={`${id}-label`}>{label}</span>
      <div
        className="reel__track"
        ref={ref}
        role="listbox"
        tabIndex={0}
        aria-labelledby={`${id}-label`}
        aria-activedescendant={`${id}-${index}`}
        onScroll={onScroll}
        onKeyDown={onKeyDown}
        data-lenis-prevent
      >
        {items.map((it, i) => (
          <div
            key={it}
            id={`${id}-${i}`}
            role="option"
            aria-selected={i === index}
            className={`reel__row${i === index ? ' is-on' : ''}`}
            onClick={() => onChange(i)}
          >
            {it}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * "Best time to call": a day reel and a time reel side by side, the chosen pair
 * lined up in a gold window across the middle, like the payline on a slot
 * machine.
 *
 * @param {object[]} days   from callSlots()
 * @param {number} day      index into days
 * @param {number} time     index into days[day].times
 * @param {(day: number, time: number) => void} onChange
 */
export default function SlotPicker({ days, day, time, onChange }) {
  const times = days[day]?.times ?? [ANY_TIME]

  // Moving to a day with fewer slots keeps the same hour if it still exists
  // there, and otherwise the nearest one.
  const pickDay = (d) => {
    const current = times[time]
    const next = days[d].times
    const same = next.indexOf(current)
    onChange(d, same !== -1 ? same : Math.min(time, next.length - 1))
  }

  const dayLabels = useMemo(() => days.map((d) => d.label), [days])

  return (
    <div className="slot">
      <div className="slot__machine">
        <Reel label="Day" items={dayLabels} index={day} onChange={pickDay} />
        <Reel label="Time" items={times} index={time} onChange={(t) => onChange(day, t)} />
        <span className="slot__payline" aria-hidden="true" />
      </div>
    </div>
  )
}
