import { useEffect, useState } from 'react'

/**
 * Course pages without a router or a server rule.
 *
 * A course page is the same index.html with `?course=<slug>` on the address,
 * so it deploys to Hostinger as it is: the server only ever serves one file,
 * the link can be shared, and back and forward work because navigation goes
 * through the browser's own history. A query string rather than a path also
 * leaves the relative asset URLs (base './' in vite.config.js) untouched.
 */

const read = () => new URLSearchParams(window.location.search).get('course')

/** The slug of the course page being shown, or null on the home page. */
export function useCourseSlug() {
  const [slug, setSlug] = useState(read)
  useEffect(() => {
    const onPop = () => setSlug(read())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return slug
}

export const courseHref = (slug) => `?course=${encodeURIComponent(slug)}`
export const homeHref = () => window.location.pathname

/** Go to a page inside the site without a reload, the way a link would. */
export function goTo(href) {
  window.history.pushState(null, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

/**
 * onClick for an <a> that should navigate inside the site. A ctrl-, cmd- or
 * shift-click, or a middle click, is left alone, so "open in new tab" still
 * does exactly that.
 */
export function follow(e) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  e.preventDefault()
  goTo(e.currentTarget.getAttribute('href'))
}

/** ₹70,000 / ₹1,20,000: rupees, grouped the Indian way. */
export const formatFee = (n) => `₹${n.toLocaleString('en-IN')}`
