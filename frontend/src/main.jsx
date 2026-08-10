import '@/styles/globals.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { ROUTE_LOADERS } from './routeLoaders.js'

// Static SEO fallback tags in index.html (title, meta description/OG/Twitter,
// JSON-LD) exist only for crawlers that never execute JS. react-helmet-async
// only manages tags it renders itself, so it won't remove these — strip them
// now, before Helmet mounts, so JS-executing crawlers/browsers (and the
// build-time prerender snapshot) see one clean set of tags, not both stacked.
document.querySelectorAll('[data-default-seo]').forEach((el) => el.remove())

const container = document.getElementById('root')
const appTree = (
  <StrictMode>
    <App />
  </StrictMode>
)

async function boot() {
  // Prerendered routes (see scripts/prerender.mjs) ship real markup inside
  // #root — hydrate it instead of blowing it away with a fresh client render.
  if (container.hasChildNodes()) {
    // The route component is lazy() — hydrateRoot's first render pass is
    // synchronous, but the underlying dynamic import isn't, so React would
    // otherwise race an in-flight chunk against the already-rendered static
    // markup and report a hydration mismatch. Awaiting the same import
    // specifier here first means it's already resolved by the time lazy()
    // asks for it during the real hydration pass.
    const loader = ROUTE_LOADERS[window.location.pathname]
    if (loader) await loader()
    hydrateRoot(container, appTree)
  } else {
    // Dynamic or fallback routes fall back to a normal mount.
    createRoot(container).render(appTree)
  }
}

boot()
