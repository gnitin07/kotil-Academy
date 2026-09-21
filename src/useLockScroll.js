import { useEffect } from 'react'

/**
 * Lock the page behind an open dialog.
 *
 * Two things have to stop, not one. `overflow: hidden` on <body> handles the
 * native scroller, but Lenis drives its own rAF loop and keeps scrolling right
 * past it — so the instance has to be stopped too, and started again on close.
 *
 * @param {boolean} active            whether the dialog is open
 * @param {React.RefObject} lenisRef  the shared Lenis instance (may be null on touch)
 * @param {() => void} onEscape       called when Escape is pressed
 */
export function useLockScroll(active, lenisRef, onEscape) {
  useEffect(() => {
    if (!active) return
    const onKey = (e) => { if (e.key === 'Escape') onEscape?.() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenisRef?.current?.stop()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      lenisRef?.current?.start()
    }
  }, [active, lenisRef, onEscape])
}
