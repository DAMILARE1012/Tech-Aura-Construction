import { COMPANY, CONTACT } from '@/constants/site'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  GEO,
  ORGANISATION_CONTACT,
  SAME_AS,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from '@/constants/seo'

const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: ORGANISATION_CONTACT.streetAddress,
  addressLocality: ORGANISATION_CONTACT.addressLocality,
  addressRegion: ORGANISATION_CONTACT.addressRegion,
  postalCode: ORGANISATION_CONTACT.postalCode,
  addressCountry: ORGANISATION_CONTACT.addressCountry,
}

/**
 * Site-wide identity. `GeneralContractor` is a LocalBusiness subtype, which is
 * what earns the knowledge panel and map treatment for a construction firm.
 */
export const organisationSchema = () => ({
  '@type': ['Organization', 'GeneralContractor'],
  '@id': ORG_ID,
  name: COMPANY.name,
  alternateName: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630,
  },
  image: DEFAULT_OG_IMAGE,
  description: DEFAULT_DESCRIPTION,
  foundingDate: String(COMPANY.founded),
  address: postalAddress,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  },
  telephone: ORGANISATION_CONTACT.telephone,
  email: ORGANISATION_CONTACT.email,
  areaServed: {
    '@type': 'Country',
    name: 'Nigeria',
  },
  knowsLanguage: ['en-NG', 'en'],
  sameAs: SAME_AS,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: CONTACT.phone,
      contactType: 'customer service',
      email: CONTACT.email,
      areaServed: 'NG',
      availableLanguage: 'English',
    },
    {
      '@type': 'ContactPoint',
      telephone: CONTACT.phone,
      contactType: 'sales',
      email: CONTACT.tendersEmail,
      areaServed: 'NG',
      availableLanguage: 'English',
    },
  ],
  location: CONTACT.offices.map((office) => ({
    '@type': 'Place',
    name: `${SITE_NAME} — ${office.city}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: office.street,
      addressLocality: office.city,
      addressRegion: office.state,
      addressCountry: 'NG',
    },
    telephone: office.phone,
  })),
})

/** Enables the sitelinks search box in Google results. */
export const webSiteSchema = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-NG',
})

/** `trail` matches the Breadcrumbs component: [{ label, to }]. */
export const breadcrumbSchema = (trail = []) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.label,
    ...(crumb.to ? { item: absoluteUrl(crumb.to) } : {}),
  })),
})

export const articleSchema = (insight) => ({
  '@type': 'Article',
  headline: insight.title,
  description: insight.excerpt,
  image: [insight.image],
  datePublished: insight.date,
  dateModified: insight.date,
  articleSection: insight.category,
  inLanguage: 'en-NG',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': absoluteUrl(`/insights/${insight.slug}`),
  },
  author: {
    '@type': 'Person',
    name: insight.author,
  },
  publisher: { '@id': ORG_ID },
})

export const serviceSchema = (service) => ({
  '@type': 'Service',
  name: service.title,
  description: service.summary,
  serviceType: service.title,
  url: absoluteUrl(`/services/${service.slug}`),
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'Nigeria' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${service.title} capabilities`,
    itemListElement: service.capabilities.map((capability) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: capability },
    })),
  },
})

/**
 * Feeds Google Jobs. `validThrough` is required for the listing to stay
 * eligible, so it is derived as 90 days after the posting date.
 */
export const jobPostingSchema = (job) => {
  const posted = new Date(job.posted)
  const validThrough = new Date(posted)
  validThrough.setDate(validThrough.getDate() + 90)

  const employmentType = {
    'Full-time': 'FULL_TIME',
    Contract: 'CONTRACTOR',
    'Graduate Programme': 'FULL_TIME',
  }

  const office = CONTACT.offices.find((item) => item.city === job.location)

  return {
    '@type': 'JobPosting',
    title: job.title,
    description: [
      `<p>${job.summary}</p>`,
      '<h3>Responsibilities</h3><ul>',
      ...job.responsibilities.map((item) => `<li>${item}</li>`),
      '</ul><h3>Requirements</h3><ul>',
      ...job.requirements.map((item) => `<li>${item}</li>`),
      '</ul>',
    ].join(''),
    identifier: {
      '@type': 'PropertyValue',
      name: SITE_NAME,
      value: job.id,
    },
    datePosted: job.posted,
    validThrough: validThrough.toISOString().slice(0, 10),
    employmentType: employmentType[job.type] ?? 'FULL_TIME',
    hiringOrganization: { '@id': ORG_ID },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: office?.street ?? '',
        addressLocality: job.location,
        addressRegion: office?.state ?? job.location,
        addressCountry: 'NG',
      },
    },
    employerOverview: DEFAULT_DESCRIPTION,
    industry: 'Construction and Engineering',
    url: absoluteUrl(`/careers/${job.slug}`),
  }
}

/**
 * Projects are portfolio entries rather than products, so CreativeWork is the
 * honest type — it avoids claiming review or offer data we do not have.
 */
export const projectSchema = (project) => ({
  '@type': 'CreativeWork',
  name: project.title,
  description: project.summary,
  image: [project.image],
  url: absoluteUrl(`/projects/${project.slug}`),
  dateCreated: String(project.year),
  creator: { '@id': ORG_ID },
  locationCreated: {
    '@type': 'Place',
    name: project.location,
    address: {
      '@type': 'PostalAddress',
      addressLocality: project.location,
      addressRegion: project.state,
      addressCountry: 'NG',
    },
  },
  about: project.sector,
})

export const collectionPageSchema = ({ name, description, path, items = [] }) => ({
  '@type': 'CollectionPage',
  name,
  description,
  url: absoluteUrl(path),
  isPartOf: { '@id': WEBSITE_ID },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: item.url,
      name: item.name,
    })),
  },
})

export const faqSchema = (faqs = []) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
})
