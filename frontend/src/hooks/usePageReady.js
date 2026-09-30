import { useEffect } from 'react'

/**
 * usePageReady — signals the prerender snapshot system that the page has
 * fully mounted and rendered its content.
 *
 * The prerender script (prerender.mjs) waits for `window.__APP_READY__ === true`
 * before capturing the page HTML. For the homepage this fires from App.jsx's
 * loading-gate effect. For every other route it MUST fire from within the page
 * component itself — after the Suspense boundary has resolved the lazy import
 * and the real page DOM is painted — otherwise the snapshot captures the
 * Suspense fallback spinner instead of the real content.
 *
 * Usage: call `usePageReady()` at the top of every page component.
 */
export function usePageReady(delay = 200) {
  useEffect(() => {
    // Small buffer so Framer Motion's entrance animation has settled
    // (avoids baking in a mid-animation inline style)
    const t = setTimeout(() => {
      window.__APP_READY__ = true
    }, delay)
    return () => clearTimeout(t)
  }, [delay])
}
