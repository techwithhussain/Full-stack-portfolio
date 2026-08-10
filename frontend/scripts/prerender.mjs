// Build-time static prerendering.
//
// Runs after `vite build` (see package.json "build" script). Boots the built
// dist/ under `vite preview`, visits each public route in a headless
// browser, waits for the real app to finish rendering (not a guessed
// timeout), and writes the fully-rendered HTML to dist/<route>/index.html.
// React then hydrates on top of this markup in the browser (see
// src/main.jsx). This is what lets Hostinger's static Apache hosting serve
// real content to crawlers/LLMs/Lighthouse instead of an empty <div id="root">.
//
// Scope (Phase 2b): the 12 static public routes + a real 404.html.
// Dynamic routes (/services/:slug, /projects/:slug) are a deliberate
// follow-up once this lands cleanly — see the plan doc.
//
// Reversible: delete the generated dist/<route>/index.html files (or drop
// this script from package.json's "build") and the site falls back to
// today's pure-CSR behavior — .htaccess still serves index.html for any
// route without a matching static file.

import { chromium } from 'playwright'
import { spawn, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST_DIR = join(__dirname, '..', 'dist')
const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`

const STATIC_ROUTES = [
  '/',
  '/about',
  '/services',
  '/services/web-development',
  '/services/seo-services',
  '/services/application-development',
  '/services/meta-ads',
  '/services/google-ads',
  '/services/social-media-marketing',
  '/projects',
  '/blog',
  '/blog/best-web-developer-in-jammu-and-kashmir',
  '/testimonials',
  '/experience',
  '/resume',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/sitemap',
]

// Any nonexistent path hits App.jsx's catch-all `*` route (NotFoundPage).
const NOT_FOUND_PROBE_ROUTE = '/__prerender_404_probe__'

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      fetch(url)
        .then(() => resolve())
        .catch((err) => {
          if (Date.now() - start > timeoutMs) {
            reject(new Error(`vite preview never became reachable at ${url}: ${err.message}`))
          } else {
            setTimeout(tryOnce, 300)
          }
        })
    }
    tryOnce()
  })
}

async function renderRoute(page, route) {
  await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' })
  // Wait for App.jsx's readiness flag (set once the loading gate clears and
  // the route has actually rendered) instead of guessing a fixed delay.
  await page.waitForFunction(() => window.__APP_READY__ === true, { timeout: 15000 })
  // Small buffer so the page-transition entrance animation (framer-motion,
  // ~350ms) has settled before we snapshot — avoids baking in a mid-animation
  // inline `style` (opacity/transform) that would mismatch on client hydration.
  await page.waitForTimeout(600)
  return page.content()
}

function writeRouteHtml(route, html) {
  const outPath = route === '/'
    ? join(DIST_DIR, 'index.html')
    : join(DIST_DIR, route.replace(/^\//, ''), 'index.html')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, html, 'utf-8')
  return outPath
}

async function main() {
  if (!existsSync(DIST_DIR)) {
    throw new Error('dist/ not found — run `vite build` before prerendering.')
  }

  console.log(`[prerender] starting vite preview on port ${PORT}...`)
  // Spawn Vite's JS entry directly with the same node executable (rather than
  // going through `npm`/a shell) so there's exactly one child process to
  // manage — no orphaned grandchild left listening on the port if this
  // script exits early.
  const viteBin = join(__dirname, '..', 'node_modules', 'vite', 'bin', 'vite.js')
  const previewProcess = spawn(
    process.execPath,
    [viteBin, 'preview', '--port', String(PORT), '--strictPort'],
    { cwd: join(__dirname, '..'), stdio: 'pipe' },
  )
  previewProcess.on('error', (err) => {
    console.error('[prerender] failed to start vite preview:', err)
  })

  let browser
  try {
    await waitForServer(BASE_URL)
    console.log('[prerender] preview server ready')

    browser = await chromium.launch()
    const page = await browser.newPage()
    // Make this capture pass render through the exact same branch a real
    // hydration of the resulting static file will use (see App.jsx's
    // isPrerenderedLoad) — same code path, not just an equivalent one, so
    // there's nothing for hydration to mismatch on (e.g. framer-motion's
    // entrance animation is skipped consistently on both sides instead of
    // settling into two subtly different inline-style outcomes).
    await page.addInitScript(() => {
      window.__FORCE_STATIC_RENDER__ = true
    })

    // Render every route first and hold the results in memory — vite preview
    // is serving straight from dist/, so writing a route's output to disk
    // before the loop finishes would corrupt later routes: vite's SPA
    // fallback would start serving that already-React-rendered file (with
    // its own baked-in <title>/head tags) instead of the original CSR
    // template, and the next route's Helmet tags would stack on top of it
    // instead of replacing it.
    const rendered = []
    for (const route of STATIC_ROUTES) {
      const html = await renderRoute(page, route)
      rendered.push([route, html])
      console.log(`[prerender] rendered ${route}`)
    }
    const notFoundHtml = await renderRoute(page, NOT_FOUND_PROBE_ROUTE)

    await browser.close()

    for (const [route, html] of rendered) {
      const outPath = writeRouteHtml(route, html)
      console.log(`[prerender] wrote ${outPath.replace(DIST_DIR, 'dist')}`)
    }
    writeFileSync(join(DIST_DIR, '404.html'), notFoundHtml, 'utf-8')
    console.log('[prerender] wrote dist/404.html')
  } finally {
    killProcessTree(previewProcess.pid)
  }

  console.log(`[prerender] done — ${STATIC_ROUTES.length} routes + 404.html`)
  process.exit(0)
}

function killProcessTree(pid) {
  if (!pid) return
  if (process.platform === 'win32') {
    // plain .kill() only signals the immediate process; on Windows that can
    // leave the actual vite preview server (and its held port) running.
    spawnSync('taskkill', ['/pid', String(pid), '/T', '/F'])
  } else {
    process.kill(pid)
  }
}

main().catch((err) => {
  console.error('[prerender] failed:', err)
  // Non-fatal by design: a partial/failed prerender pass should not block a
  // deploy — the site still works as pure CSR via the SPA fallback in
  // .htaccess. Exit 0 so `npm run build` still succeeds.
  process.exit(0)
})
