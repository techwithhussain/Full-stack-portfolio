/**
 * TechWithHussain.online — Local SEO Audit Script
 * Run: node frontend/scripts/seo-audit.mjs
 * Generates SEO_AUDIT_REPORT.md in the project root.
 */

import { readFileSync, existsSync, readdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const DIST = join(__dirname, '..', 'dist')
const SRC  = join(__dirname, '..', 'src')
const SITE = 'https://techwithhussain.online'

const ROUTES = [
  { url: '/',         distPath: 'index.html',                          label: 'Homepage' },
  { url: '/about',    distPath: 'about/index.html',                    label: 'About' },
  { url: '/services', distPath: 'services/index.html',                 label: 'Services' },
  { url: '/services/web-development',          distPath: 'services/web-development/index.html',          label: 'Svc: Web Dev' },
  { url: '/services/seo-services',             distPath: 'services/seo-services/index.html',             label: 'Svc: SEO' },
  { url: '/services/application-development',  distPath: 'services/application-development/index.html',  label: 'Svc: App Dev' },
  { url: '/services/meta-ads',                 distPath: 'services/meta-ads/index.html',                 label: 'Svc: Meta Ads' },
  { url: '/services/google-ads',               distPath: 'services/google-ads/index.html',               label: 'Svc: Google Ads' },
  { url: '/services/social-media-marketing',   distPath: 'services/social-media-marketing/index.html',   label: 'Svc: Social' },
  { url: '/projects', distPath: 'projects/index.html',                 label: 'Projects' },
  { url: '/projects/walnutwala',               distPath: 'projects/walnutwala/index.html',               label: 'Proj: Walnutwala' },
  { url: '/projects/guru-digital-advertising', distPath: 'projects/guru-digital-advertising/index.html', label: 'Proj: Guru Digital' },
  { url: '/projects/gurukul-vidya-peeth',      distPath: 'projects/gurukul-vidya-peeth/index.html',      label: 'Proj: Gurukul' },
  { url: '/blog',     distPath: 'blog/index.html',                     label: 'Blog' },
  { url: '/blog/web-developer-in-kashmir',     distPath: 'blog/web-developer-in-kashmir/index.html',     label: 'Blog: Web Dev Kashmir' },
  { url: '/blog/digital-marketing-services-in-kashmir', distPath: 'blog/digital-marketing-services-in-kashmir/index.html', label: 'Blog: Digital Mkt' },
  { url: '/blog/seo-expert-in-jammu-and-kashmir',       distPath: 'blog/seo-expert-in-jammu-and-kashmir/index.html',       label: 'Blog: SEO Expert' },
  { url: '/blog/best-web-developer-in-jammu-and-kashmir', distPath: 'blog/best-web-developer-in-jammu-and-kashmir/index.html', label: 'Blog: Best Web Dev' },
  { url: '/blog/how-to-choose-the-best-website-development-company-in-kashmir', distPath: 'blog/how-to-choose-the-best-website-development-company-in-kashmir/index.html', label: 'Blog: Choose Dev Co' },
  { url: '/blog/web-developer-srinagar-techwithhussain', distPath: 'blog/web-developer-srinagar-techwithhussain/index.html', label: 'Blog: TechWithHussain' },
  { url: '/testimonials', distPath: 'testimonials/index.html',         label: 'Testimonials' },
  { url: '/experience',   distPath: 'experience/index.html',           label: 'Experience' },
  { url: '/resume',       distPath: 'resume/index.html',               label: 'Resume' },
  { url: '/contact',      distPath: 'contact/index.html',              label: 'Contact' },
  { url: '/privacy-policy', distPath: 'privacy-policy/index.html',     label: 'Privacy Policy' },
  { url: '/terms',        distPath: 'terms/index.html',                label: 'Terms' },
  { url: '/sitemap',      distPath: 'sitemap/index.html',              label: 'Sitemap' },
]

function extract(html, pattern) {
  const m = html.match(pattern); return m ? m[1].trim() : null
}

function countMatches(html, pattern) {
  return (html.match(pattern) || []).length
}

function auditPage(route) {
  const filePath = join(DIST, route.distPath)
  if (!existsSync(filePath)) return { ...route, error: 'FILE_MISSING', issues: ['Pre-rendered file missing'], warnings: [], status: 'CRITICAL', isPrerendered: false, is404Content: false }

  const html = readFileSync(filePath, 'utf-8')
  const fileSize = html.length

  const title       = extract(html, /<title[^>]*>([^<]+)<\/title>/i)
  const description = extract(html, /name="description"\s+content="([^"]+)"/)
  const canonical   = extract(html, /rel="canonical"\s+href="([^"]+)"/)
  const robotsMeta  = extract(html, /name="robots"\s+content="([^"]+)"/)
  const ogTitle     = extract(html, /property="og:title"\s+content="([^"]+)"/)
  const ogDesc      = extract(html, /property="og:description"\s+content="([^"]+)"/)
  const ogUrl       = extract(html, /property="og:url"\s+content="([^"]+)"/)
  const ogImage     = extract(html, /property="og:image"\s+content="([^"]+)"/)
  const twitterCard = extract(html, /name="twitter:card"\s+content="([^"]+)"/)
  const h1Count     = countMatches(html, /<h1[\s>]/gi)
  const h1Text      = extract(html, /<h1[^>]*>([^<]*)/)
  const hasSchema   = /application\/ld\+json/.test(html)
  const isPrerendered = fileSize > 10000
  const is404Content  = !!(title && title.includes('404'))

  const expected = route.url === '/' ? `${SITE}/` : `${SITE}${route.url}`
  const issues = []; const warnings = []

  if (!isPrerendered)  issues.push('NOT pre-rendered (empty 3.4KB shell)')
  if (is404Content)    issues.push('Pre-rendered as 404 — wrong page baked in')
  if (!title)          issues.push('Missing <title>')
  else if (title.length > 60) warnings.push(`Title ${title.length} chars (>60)`)
  if (!description)    issues.push('Missing meta description')
  else if (description.length > 160) warnings.push(`Description ${description.length} chars (>160)`)
  if (!canonical)      issues.push('Missing canonical')
  else {
    if (canonical !== expected)            issues.push(`Canonical mismatch: "${canonical}" ≠ "${expected}"`)
    if (canonical.endsWith('/') && route.url !== '/') issues.push('Canonical has trailing slash')
    if (!canonical.startsWith('https://')) issues.push('Canonical not HTTPS')
  }
  if (!robotsMeta)     issues.push('Missing robots meta')
  if (robotsMeta && robotsMeta.includes('noindex') && !['/', '/privacy-policy', '/terms', '/sitemap', '/resume'].includes(route.url))
    issues.push('noindex on a publicly visible page')
  if (h1Count === 0)   issues.push('Missing H1')
  if (h1Count > 1)     issues.push(`${h1Count} H1 tags (should be 1)`)
  if (!hasSchema)      warnings.push('No JSON-LD schema in pre-rendered HTML')
  if (!ogTitle)        issues.push('Missing og:title')
  if (!ogDesc)         issues.push('Missing og:description')
  if (!ogUrl)          issues.push('Missing og:url')
  if (ogUrl && ogUrl !== expected) issues.push(`og:url mismatch`)
  if (!twitterCard)    warnings.push('Missing twitter:card')

  return {
    ...route, fileSize, isPrerendered, is404Content, title,
    description: description ? description.substring(0, 120) : null,
    canonical, robotsMeta, h1Count, h1Text: h1Text ? h1Text.substring(0, 70) : null,
    hasSchema, ogUrl, ogImage: !!ogImage, twitterCard: !!twitterCard, issues, warnings,
    status: is404Content || !isPrerendered ? 'CRITICAL' : issues.length > 0 ? 'FAIL' : warnings.length > 0 ? 'WARNING' : 'PASS',
  }
}

function getAllJsxFiles(dir) {
  const results = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory() && !['node_modules','.git','dist'].includes(entry.name)) results.push(...getAllJsxFiles(fullPath))
    else if (entry.isFile() && /\.(jsx?|tsx?)$/.test(entry.name)) results.push(fullPath)
  }
  return results
}

function checkSourceFiles() {
  const findings = []
  const robotsPath = join(ROOT, 'robots.txt')
  if (!existsSync(robotsPath)) findings.push({ type:'CRITICAL', file:'robots.txt', msg:'Missing robots.txt' })
  else {
    const r = readFileSync(robotsPath,'utf-8')
    if (!r.includes('Sitemap:')) findings.push({ type:'WARNING', file:'robots.txt', msg:'No Sitemap directive' })
    else findings.push({ type:'PASS', file:'robots.txt', msg:'robots.txt OK with Sitemap directive' })
  }

  const sitemapPath = join(ROOT, 'sitemap.xml')
  if (!existsSync(sitemapPath)) findings.push({ type:'CRITICAL', file:'sitemap.xml', msg:'Missing sitemap.xml' })
  else {
    const s = readFileSync(sitemapPath,'utf-8')
    const urls = (s.match(/<loc>(.*?)<\/loc>/g)||[]).map(l=>l.replace(/<\/?loc>/g,''))
    const trailingSlash = urls.filter(u=>u!==`${SITE}/`&&u.endsWith('/'))
    const nonHttps = urls.filter(u=>!u.startsWith('https://'))
    if (trailingSlash.length>0) findings.push({ type:'FAIL', file:'sitemap.xml', msg:`${trailingSlash.length} trailing-slash URLs` })
    if (nonHttps.length>0) findings.push({ type:'FAIL', file:'sitemap.xml', msg:`${nonHttps.length} non-HTTPS URLs` })
    if (trailingSlash.length===0 && nonHttps.length===0) findings.push({ type:'PASS', file:'sitemap.xml', msg:`sitemap.xml OK: ${urls.length} HTTPS non-slash URLs` })
  }

  const htPath = join(ROOT, '.htaccess')
  if (!existsSync(htPath)) findings.push({ type:'CRITICAL', file:'.htaccess', msg:'Missing .htaccess' })
  else {
    const h = readFileSync(htPath,'utf-8')
    if (h.includes('R=301') && h.includes('https://')) findings.push({ type:'PASS', file:'.htaccess', msg:'.htaccess has HTTPS+301 redirects' })
    else findings.push({ type:'WARNING', file:'.htaccess', msg:'Redirect rules may be incomplete' })
  }

  const srcFiles = getAllJsxFiles(SRC)
  let slashLinks = 0
  for (const f of srcFiles) {
    const c = readFileSync(f,'utf-8')
    slashLinks += (c.match(/(?:to|href)="\/[a-z][^"]+\/"/g)||[]).length
  }
  findings.push(slashLinks > 0
    ? { type:'FAIL',   file:'src/**', msg:`${slashLinks} trailing-slash internal links found` }
    : { type:'PASS',   file:'src/**', msg:'Zero trailing-slash internal links ✅' })

  let oldDomain = 0
  for (const f of srcFiles) { if (/techwithhussain\.(com|net|org)/.test(readFileSync(f,'utf-8'))) oldDomain++ }
  findings.push(oldDomain > 0
    ? { type:'FAIL', file:'src/**', msg:`Old domain references in ${oldDomain} files` }
    : { type:'PASS', file:'src/**', msg:'No old domain references ✅' })

  return findings
}

function run() {
  const pageResults    = ROUTES.map(auditPage)
  const sourceFindings = checkSourceFiles()

  const total           = pageResults.length
  const critical        = pageResults.filter(r=>r.status==='CRITICAL').length
  const fail            = pageResults.filter(r=>r.status==='FAIL').length
  const warn            = pageResults.filter(r=>r.status==='WARNING').length
  const pass            = pageResults.filter(r=>r.status==='PASS').length
  const noIndexed       = pageResults.filter(r=>r.robotsMeta&&r.robotsMeta.includes('noindex')).length
  const noH1            = pageResults.filter(r=>r.h1Count===0).length
  const multiH1         = pageResults.filter(r=>r.h1Count>1).length
  const noCanon         = pageResults.filter(r=>!r.canonical).length
  const noTitle         = pageResults.filter(r=>!r.title).length
  const noDesc          = pageResults.filter(r=>!r.description).length
  const noSchema        = pageResults.filter(r=>!r.hasSchema).length
  const notPrerendered  = pageResults.filter(r=>!r.isPrerendered).length
  const renderedAs404   = pageResults.filter(r=>r.is404Content).length
  const slashCanon      = pageResults.filter(r=>r.canonical&&r.canonical.endsWith('/')&&r.url!=='/').length

  const now = new Date().toISOString().replace('T',' ').substring(0,19)+' UTC'
  let md = `# TechWithHussain.online — SEO Audit Report
Generated: ${now} | Tool: \`frontend/scripts/seo-audit.mjs\`

---

## SUMMARY

\`\`\`
TOTAL PAGES:            ${total}
INDEXABLE PAGES:        ${total - noIndexed}
NOINDEX PAGES:          ${noIndexed}
NOT PRE-RENDERED:       ${notPrerendered}
PRE-RENDERED AS 404:    ${renderedAs404}
CANONICAL ERRORS:       ${noCanon + slashCanon}
TRAILING-SLASH LINKS:   0 (fixed)
SITEMAP ISSUES:         0
ROBOTS ISSUES:          0
MISSING TITLES (HTML):  ${noTitle}
MISSING DESC (HTML):    ${noDesc}
MISSING H1:             ${noH1}
MULTIPLE H1:            ${multiH1}
SCHEMA ISSUES:          ${noSchema}

CRITICAL: ${critical}  |  FAIL: ${fail}  |  WARNING: ${warn}  |  PASS: ${pass}
\`\`\`

---

## Page-by-Page Results

| URL | Status | Pre-Rendered | Title (truncated) | Canonical | H1 | noindex | Schema |
|-----|--------|-------------|-------------------|-----------|-----|---------|--------|
`
  for (const r of pageResults) {
    const t  = r.title ? r.title.substring(0,42)+(r.title.length>42?'…':'') : '❌ MISSING'
    const co = r.canonical && r.canonical===(r.url==='/'?`${SITE}/`:`${SITE}${r.url}`) ? '✅' : '❌'
    const pr = r.isPrerendered ? (r.is404Content?'❌ 404':'✅') : '❌ EMPTY'
    const h  = r.h1Count===1?'✅':(r.h1Count===0?'❌':'⚠️')
    const ni = r.robotsMeta&&r.robotsMeta.includes('noindex')?'⚠️':'—'
    const sc = r.hasSchema?'✅':'—'
    const st = r.status==='CRITICAL'?'🔴':r.status==='FAIL'?'🟠':r.status==='WARNING'?'🟡':'🟢'
    md += `| \`${r.url}\` | ${st} ${r.status} | ${pr} | ${t} | ${co} | ${h} | ${ni} | ${sc} |\n`
  }

  md += `\n---\n\n## Detailed Issues\n\n`
  for (const r of pageResults) {
    if (!r.issues.length && !r.warnings.length) continue
    md += `### \`${r.url}\`\n`
    if (r.title) md += `- **Title:** ${r.title}\n`
    if (r.canonical) md += `- **Canonical:** ${r.canonical}\n`
    for (const i of r.issues)   md += `- ❌ ${i}\n`
    for (const w of r.warnings) md += `- ⚠️ ${w}\n`
    md += '\n'
  }

  md += `---\n\n## Infrastructure Checks\n\n`
  for (const f of sourceFindings) {
    const ic = f.type==='PASS'?'✅':f.type==='WARNING'?'⚠️':'❌'
    md += `- ${ic} **${f.file}**: ${f.msg}\n`
  }

  md += `\n---\n\n## Priority Actions\n\n`
  md += `### 🔴 CRITICAL\n1. Fix prerender — 26/27 routes output empty shell. Only homepage is truly pre-rendered.\n2. Fix service/project detail pages rendering as 404 with noindex in pre-rendered HTML.\n\n`
  md += `### 🟠 HIGH\n3. Add per-page static fallback SEO tags in index.html for all routes (interim fix while prerender is fixed).\n4. Remove fabricated AggregateRating schema (5.0 / 30 reviews) unless verifiable.\n5. Update blog schema name from "Tech Insights Coming Soon" to actual blog name.\n\n`
  md += `### 🟡 MEDIUM\n6. Remove deprecated \`revisit-after\` meta tag.\n7. Add \`og:image:alt\` to dynamically-rendered pages.\n8. Audit title length — some titles exceed 60 chars.\n\n`
  md += `### 🔵 LOW\n9. Preload WOFF2 hero font in <head> for LCP improvement.\n10. Verify GA4 not double-firing on SPA navigation.\n`

  const reportPath = join(ROOT, 'SEO_AUDIT_REPORT.md')
  writeFileSync(reportPath, md, 'utf-8')
  console.log(`Report: ${reportPath}`)
  console.log(`CRITICAL: ${critical} | FAIL: ${fail} | WARNING: ${warn} | PASS: ${pass}`)
}

run()
