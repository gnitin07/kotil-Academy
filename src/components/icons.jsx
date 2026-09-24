/**
 * Every icon on the site, as inline SVG.
 *
 * Inline and not an icon font / sprite sheet: there are barely twenty of them,
 * they all inherit `currentColor`, and shipping them in the JS bundle costs one
 * fewer network round trip than any alternative.
 */

const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

const Svg = ({ size = 24, children, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...base} {...rest}>{children}</svg>
)

// ---- stat icons ------------------------------------------------------------
export const STAT_ICONS = {
  years: (
    <Svg><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></Svg>
  ),
  students: (
    <Svg><path d="M3 9.2 12 5l9 4.2-9 4.2z" /><path d="M7 11.4v4.1c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.1" /><path d="M21 9.2v5" /></Svg>
  ),
  workshop: (
    <Svg><path d="M4 19V7a2 2 0 0 1 2-2h8l6 5v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" /><path d="M14 5v5h6" /><path d="M8 14h7M8 17.5h5" /></Svg>
  ),
  certificate: (
    <Svg><circle cx="12" cy="9.5" r="5" /><path d="m8.6 13.6-1.1 6 4.5-2.4 4.5 2.4-1.1-6" /></Svg>
  ),
}

// ---- "why choose us" icons -------------------------------------------------
export const WHY_ICONS = {
  trainer: (
    <Svg size={26}><circle cx="12" cy="8" r="3.4" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" /></Svg>
  ),
  certificate: (
    <Svg size={26}><circle cx="12" cy="9.5" r="5" /><path d="m8.6 13.6-1.1 6 4.5-2.4 4.5 2.4-1.1-6" /></Svg>
  ),
  hands: (
    <Svg size={26}><path d="M8.5 12.5V6a1.5 1.5 0 0 1 3 0v5" /><path d="M11.5 11V4.8a1.5 1.5 0 0 1 3 0V11" /><path d="M14.5 11.4V7.5a1.5 1.5 0 0 1 3 0v7c0 3-2.4 5.5-5.5 5.5S6.5 17.5 6.5 14.5v-2a1.5 1.5 0 0 1 3 0" /></Svg>
  ),
  placement: (
    <Svg size={26}><rect x="3" y="7.5" width="18" height="12" rx="2" /><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" /><path d="M3 12.5h18" /></Svg>
  ),
  machine: (
    <Svg size={26}><circle cx="12" cy="12" r="3" /><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" /></Svg>
  ),
}

// ---- utility icons ---------------------------------------------------------
export const IconCheck = ({ size = 16 }) => (
  <Svg size={size} strokeWidth={2.2}><path d="m4.5 12.5 4.5 4.5L19.5 6.5" /></Svg>
)
export const IconArrow = ({ size = 18 }) => (
  <Svg size={size}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
)
export const IconClock = ({ size = 16 }) => (
  <Svg size={size}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></Svg>
)
export const IconPhone = ({ size = 16 }) => (
  <Svg size={size}><path d="M5 3.8h3.3l1.6 4-2 1.3a12 12 0 0 0 5.9 5.9l1.3-2 4 1.6V18a2.2 2.2 0 0 1-2.4 2.2C9.8 19.6 4.4 14.2 3.8 6.2A2.2 2.2 0 0 1 5 3.8Z" /></Svg>
)
export const IconMail = ({ size = 16 }) => (
  <Svg size={size}><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="m3.6 7 8.4 6 8.4-6" /></Svg>
)
export const IconPin = ({ size = 18 }) => (
  <Svg size={size}><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.6" /></Svg>
)
export const IconCalendar = ({ size = 18 }) => (
  <Svg size={size}><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3.5v3M16 3.5v3" /></Svg>
)
export const IconDoc = ({ size = 18 }) => (
  <Svg size={size}><path d="M6 3.5h7l5 5V20a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5 20V5A1.5 1.5 0 0 1 6.5 3.5Z" /><path d="M13 3.5v5h5" /><path d="M8.5 13.5h7M8.5 17h5" /></Svg>
)
export const IconZoom = ({ size = 16 }) => (
  <Svg size={size}><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 4.5 4.5" /><path d="M8 10.5h5M10.5 8v5" /></Svg>
)
export const IconQuote = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9.4 5.2 7.9 7.6a4.6 4.6 0 0 0-2.3 4h3.2v7.2H2V12c0-3.2 1.5-5.7 4.3-7.6zm11.6 0-1.5 2.4a4.6 4.6 0 0 0-2.3 4h3.2v7.2h-6.8V12c0-3.2 1.5-5.7 4.3-7.6z" />
  </svg>
)

export const WhatsAppGlyph = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.82 2.42a8.19 8.19 0 0 1 2.42 5.83c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.25-8.24m-3.6 4.35c-.17 0-.44.06-.68.31s-.9.88-.9 2.15.93 2.49 1.06 2.66c.13.17 1.8 2.76 4.38 3.87.61.26 1.09.42 1.46.54.61.2 1.17.17 1.61.1.49-.07 1.5-.61 1.72-1.21s.22-1.1.15-1.21c-.06-.1-.23-.17-.48-.29s-1.5-.74-1.73-.83c-.23-.08-.4-.12-.57.13s-.65.82-.8.99c-.15.17-.29.19-.54.06s-1.07-.39-2.03-1.25c-.75-.67-1.26-1.5-1.41-1.75s-.01-.38.11-.5c.11-.11.25-.29.37-.44s.17-.25.25-.42c.08-.17.04-.31-.02-.44s-.57-1.37-.78-1.87c-.2-.49-.41-.42-.57-.43z" />
  </svg>
)

// ---- social icons ----------------------------------------------------------
export const SOCIAL_ICONS = {
  ig: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2m0 2.1c-3.1 0-3.5 0-4.8.08-1.1.05-1.7.24-2.1.4-.5.2-.9.44-1.3.84-.4.4-.64.8-.84 1.3-.16.4-.35 1-.4 2.1C2.5 8.5 2.5 8.9 2.5 12s0 3.5.08 4.8c.05 1.1.24 1.7.4 2.1.2.5.44.9.84 1.3.4.4.8.64 1.3.84.4.16 1 .35 2.1.4 1.3.08 1.7.08 4.8.08s3.5 0 4.8-.08c1.1-.05 1.7-.24 2.1-.4.5-.2.9-.44 1.3-.84.4-.4.64-.8.84-1.3.16-.4.35-1 .4-2.1.08-1.3.08-1.7.08-4.8s0-3.5-.08-4.8c-.05-1.1-.24-1.7-.4-2.1-.2-.5-.44-.9-.84-1.3-.4-.4-.8-.64-1.3-.84-.4-.16-1-.35-2.1-.4-1.3-.08-1.7-.08-4.8-.08Z" />
      <path d="M12 6.9a5.1 5.1 0 1 0 0 10.2A5.1 5.1 0 0 0 12 6.9m0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6Z" />
      <circle cx="17.3" cy="6.7" r="1.2" />
    </svg>
  ),
  fb: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 8.5V7c0-.7.5-.9.8-.9h2V3.2h-2.6C11.3 3.2 10.7 5.3 10.7 6.7v1.8H9v3h1.7v8.3H14v-8.3h2.4l.3-3H14Z" />
    </svg>
  ),
  x: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21h-3l7-8L2.6 3h6.2l4.2 5.6L17.5 3Zm-1 16.2h1.6L7.6 4.7H5.8l10.7 14.5Z" />
    </svg>
  ),
  yt: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  ),
}
