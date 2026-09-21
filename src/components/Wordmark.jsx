/**
 * The KOTIL lockup, set in type rather than shipped as an image.
 *
 * The academy's printed logo is the word KOTIL in wide caps over a hairline
 * rule, with "Aesthetic Academy" beneath it. Drawing it with the site's own
 * font keeps it crisp at every size, costs no image request, and means the
 * header logo can recolour itself on scroll with a single CSS custom property.
 *
 * Swap in the real artwork later by replacing this component's body with an
 * <img> — every caller passes only `tone` and `className`, so nothing else
 * needs to change.
 *
 * @param {'light'|'dark'} tone  light = cream on dark backgrounds (default)
 */
export default function Wordmark({ tone = 'light', className = '', ...rest }) {
  return (
    <span className={`wm wm--${tone} ${className}`.trim()} {...rest}>
      <span className="wm__name">Kotil</span>
      <span className="wm__rule" aria-hidden="true" />
      <span className="wm__sub">Aesthetic Academy</span>
    </span>
  )
}
