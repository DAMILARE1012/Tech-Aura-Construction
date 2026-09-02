/**
 * Generates public/sitemap.xml and public/robots.txt from the real content
 * data, so a new project, service, article or vacancy is discoverable without
 * anybody remembering to hand-edit a list of URLs.
 *
 * Runs automatically before `npm run build` (see the `prebuild` script).
 * Override the domain with SITE_URL when building for a different host.
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { projects } from '../src/data/projects.js'
import { services } from '../src/data/services.js'
import { insights } from '../src/data/insights.js'
import { jobs } from '../src/data/careers.js'

const here = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(here, '../public')

const SITE_URL = (process.env.SITE_URL || 'https://www.tech-aura.ng').replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)

/**
 * changefreq/priority are advisory only — Google ignores them — but lastmod
 * is genuinely used, so it is derived from real dates where we have them.
 */
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/approach', priority: '0.7', changefreq: 'monthly' },
  { path: '/people', priority: '0.6', changefreq: 'monthly' },
  { path: '/insights', priority: '0.8', changefreq: 'weekly' },
  { path: '/careers', priority: '0.8', changefreq: 'daily' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.2', changefreq: 'yearly' },
  { path: '/terms', priority: '0.2', changefreq: 'yearly' },
]

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case "'":
        return '&apos;'
      default:
        return '&quot;'
    }
  })

const urls = [
  ...staticRoutes.map((route) => ({ ...route, lastmod: today })),

  ...services.map((service) => ({
    path: `/services/${service.slug}`,
    lastmod: today,
    priority: '0.8',
    changefreq: 'monthly',
  })),

  ...projects.map((project) => ({
    path: `/projects/${project.slug}`,
    lastmod: today,
    priority: '0.7',
    changefreq: 'monthly',
  })),

  ...insights.map((insight) => ({
    path: `/insights/${insight.slug}`,
    lastmod: insight.date,
    priority: '0.6',
    changefreq: 'yearly',
  })),

  ...jobs.map((job) => ({
    path: `/careers/${job.slug}`,
    lastmod: job.posted,
    priority: '0.7',
    changefreq: 'weekly',
  })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(SITE_URL + url.path)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# No value in crawling the SPA asset bundles.
Disallow: /assets/

# AI crawlers are allowed — visibility in AI answers matters as much as
# classic search for a firm being researched before a tender.
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

mkdirSync(publicDir, { recursive: true })
writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap, 'utf8')
writeFileSync(resolve(publicDir, 'robots.txt'), robots, 'utf8')

console.log(`sitemap.xml  ${urls.length} URLs -> ${SITE_URL}`)
console.log('robots.txt   written')
