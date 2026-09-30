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
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST_DIR = join(__dirname, '..', 'dist')
const PORT = 4173
const BASE_URL = `http://127.0.0.1:${PORT}`
const SITE_URL = 'https://techwithhussain.online'

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
  '/projects/walnutwala',
  '/projects/guru-digital-advertising',
  '/projects/gurukul-vidya-peeth',
  '/blog',
  '/blog/web-developer-in-kashmir',
  '/blog/digital-marketing-services-in-kashmir',
  '/blog/seo-expert-in-jammu-and-kashmir',
  '/blog/best-web-developer-in-jammu-and-kashmir',
  '/blog/how-to-choose-the-best-website-development-company-in-kashmir',
  '/blog/web-developer-srinagar-techwithhussain',
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
  // Block external API calls that return 502 during prerender.
  await page.route('**/api/**', r => r.abort())

  // 'load' fires after all module scripts (including the React bundle) have
  // executed. dist/index.html is the fresh 8KB Vite template (empty #root),
  // so main.jsx calls createRoot().render() — React's concurrent mode.
  await page.goto(`${BASE_URL}${route}`, { waitUntil: 'load' })

  // window.__APP_READY__ is set by usePageReady() hooks inside each page
  // component, 200ms after the component mounts. This fires only AFTER:
  //   createRoot render → loading state timer (~400ms) → Routes render →
  //   Suspense resolves lazy chunk → page mounts → usePageReady fires.
  // It is the most reliable signal that real page content is in the DOM.
  await page.waitForFunction(
    () => window.__APP_READY__ === true,
    { timeout: 25000 }
  )

  // Extra settle: __APP_READY__ fires from the loading-gate rAF in App.jsx.
  // Helmet injects route-specific canonical/title AFTER Suspense resolves and
  // the page component mounts (which happens after __APP_READY__).
  // 1500ms covers: lazy chunk download (~0ms local) + component mount + Helmet.
  await page.waitForTimeout(1500)

  const info = await page.evaluate(() => ({
    childCount: document.getElementById('root')?.childElementCount ?? -1,
    title: document.title,
    canonical: document.querySelector('link[rel="canonical"]')?.href ?? '',
  }))
  console.log(`[prerender] ${route}:`, JSON.stringify(info))

  return page.content()
}

function writeRouteHtml(route, html) {
  if (route === '/') {
    const outPath = join(DIST_DIR, 'index.html')
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, html, 'utf-8')
    return outPath
  }

  const subPath = route.replace(/^\//, '').replace(/\/$/, '')
  const dirPath = join(DIST_DIR, subPath, 'index.html')
  mkdirSync(dirname(dirPath), { recursive: true })
  writeFileSync(dirPath, html, 'utf-8')

  return dirPath
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
    [viteBin, 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
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

    // Save the fresh Vite template (empty #root). Restore it before every
    // route so main.jsx always sees hasChildNodes()=false → createRoot().
    const templatePath = join(DIST_DIR, 'index.html')
    const originalTemplate = readFileSync(templatePath, 'utf-8')

    const rendered = []
    for (const route of STATIC_ROUTES) {
      // Restore empty template so Vite preview serves a clean SPA shell.
      writeFileSync(templatePath, originalTemplate, 'utf-8')

      // Fresh page per route — no cross-route JS/React state contamination.
      const page = await browser.newPage()
      page.on('console', msg => { if (msg.type() === 'error') console.error('[browser]', msg.text()) })
      page.on('pageerror', err => console.error('[page-error]', err.message))

      const html = await renderRoute(page, route)
      await page.close()
      rendered.push([route, html])
      console.log(`[prerender] rendered ${route}`)
    }

    // Probe for 404 content
    writeFileSync(templatePath, originalTemplate, 'utf-8')
    const page404 = await browser.newPage()
    page404.on('console', msg => { if (msg.type() === 'error') console.error('[browser]', msg.text()) })
    page404.on('pageerror', err => console.error('[page-error]', err.message))
    const notFoundHtml = await renderRoute(page404, NOT_FOUND_PROBE_ROUTE)
    await page404.close()

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
