import { COMPANY, CONTACT, SOCIAL_LINKS } from './site'

/**
 * Canonical origin for the live site. Every absolute URL in meta tags,
 * structured data and the sitemap is built from this, so it must match the
 * domain you actually deploy to (no trailing slash).
 */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.tech-aura.ng').replace(
  /\/$/,
  '',
)

export const SITE_NAME = COMPANY.shortName
export const SITE_LOCALE = 'en_NG'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

export const DEFAULT_TITLE = 'Construction & Engineering Company in Lagos, Nigeria'
export const DEFAULT_DESCRIPTION =
  'Tech-Aura is a Lagos-based Nigerian construction and engineering company delivering energy-efficient buildings, roads, power, water and oil & gas infrastructure across Nigeria since 2009.'

/** Absolute URL for a route path. */
export const absoluteUrl = (path = '/') => {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Titles are capped near 60 characters before Google truncates them. The
 * brand suffix is dropped rather than the page name when space runs out.
 */
export const formatTitle = (title) => {
  if (!title) return `${SITE_NAME} | ${DEFAULT_TITLE}`
  const withBrand = `${title} | ${SITE_NAME}`
  return withBrand.length <= 65 ? withBrand : title
}

/** Descriptions want roughly 150-160 characters. */
export const truncateDescription = (text, limit = 158) => {
  if (!text) return DEFAULT_DESCRIPTION
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= limit) return clean
  return `${clean.slice(0, clean.lastIndexOf(' ', limit - 1))}…`
}

/** Profile URLs, used as `sameAs` in the Organization schema. */
export const SAME_AS = SOCIAL_LINKS.map((link) => link.href)

export const ORGANISATION_CONTACT = {
  telephone: CONTACT.phone,
  email: CONTACT.email,
  streetAddress: `${CONTACT.headOffice.street}, ${CONTACT.headOffice.area}`,
  addressLocality: CONTACT.headOffice.city,
  addressRegion: CONTACT.headOffice.state,
  addressCountry: 'NG',
  postalCode: '101241',
}

/** Approximate coordinates of the Victoria Island head office. */
export const GEO = { latitude: 6.4281, longitude: 3.4219 }
