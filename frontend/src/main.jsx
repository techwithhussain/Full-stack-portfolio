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
  if (container.hasChildNodes()) {
    const path = window.location.pathname
    const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '')
    const loader = ROUTE_LOADERS[path] || ROUTE_LOADERS[normalizedPath]
    if (loader) await loader()
    hydrateRoot(container, appTree)
  } else {
    createRoot(container).render(appTree)
  }
}

boot()
