/**
 * The official KOTIL · Aesthetic Academy lockup.
 *
 * Two pre-built variants from `npm run assets:logo`: the artwork as supplied
 * (black KOTIL, gold "Aesthetic Academy") for light backgrounds, and one with
 * the black lettering turned white — gold untouched — for the black footer.
 *
 * width/height are the trimmed artwork's own proportions (5607 x 2065), so the
 * browser reserves the right box before the file arrives; CSS sets the real
 * height and the width follows.
 *
 * @param {'light'|'dark'} tone  which background the logo sits on:
 *                               'dark' = dark lettering, for light surfaces;
 *                               'light' = white lettering, for dark surfaces
 */
const BASE = import.meta.env.BASE_URL
const RATIO_W = 5607
const RATIO_H = 2065

export default function Wordmark({ tone = 'dark', className = '', eager = false }) {
  const file = tone === 'light' ? 'logo-light' : 'logo-dark'
  const src = (w) => `${BASE}media/brand/${file}-${w}.webp`

  return (
    <img
      className={`wm wm--${tone} ${className}`.trim()}
      src={src(480)}
      srcSet={`${src(480)} 480w, ${src(960)} 960w`}
      sizes="175px"
      width={RATIO_W}
      height={RATIO_H}
      alt="Kotil Aesthetic Academy"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
