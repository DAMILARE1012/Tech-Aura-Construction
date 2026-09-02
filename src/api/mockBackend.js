import { projects, getProjectBySlug } from '@/data/projects'
import { services, getServiceBySlug } from '@/data/services'
import { insights, getInsightBySlug } from '@/data/insights'
import { jobs, getJobBySlug } from '@/data/careers'
import { leadership } from '@/data/people'

const LATENCY_MS = 320

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const ok = (data) => ({ data })
const notFound = (what) => ({
  error: { status: 404, data: { message: `${what} not found` } },
})

/** Case-insensitive "does the record match this free-text query" check. */
const matchesSearch = (record, term) => {
  if (!term) return true
  const haystack = Object.values(record)
    .filter((value) => typeof value === 'string')
    .join(' ')
    .toLowerCase()
  return haystack.includes(term.toLowerCase())
}

/** Narrows a list by every filter whose value is set and not 'All'. */
const applyFilters = (list, filters = {}) =>
  list.filter((record) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value || value === 'All') return true
      return record[key] === value
    }),
  )

/**
 * Route table for the in-browser mock API. Each handler receives the parsed
 * request and returns an RTK Query `{ data }` or `{ error }` envelope, so the
 * shape is identical to what a real HTTP backend would produce.
 */
const routes = {
  'GET /projects': ({ params }) => {
    const { sector, state, status, search, featured, limit } = params
    let result = applyFilters(projects, { sector, state, status })
    if (featured === 'true') result = result.filter((project) => project.featured)
    result = result.filter((project) => matchesSearch(project, search))
    result = [...result].sort((a, b) => b.year - a.year)
    if (limit) result = result.slice(0, Number(limit))
    return ok({ items: result, total: result.length })
  },

  'GET /projects/:slug': ({ slug }) => {
    const project = getProjectBySlug(slug)
    if (!project) return notFound('Project')
    const related = projects
      .filter((item) => item.sector === project.sector && item.id !== project.id)
      .slice(0, 3)
    return ok({ ...project, related })
  },

  'GET /services': ({ params }) => {
    const result = params.limit ? services.slice(0, Number(params.limit)) : services
    return ok({ items: result, total: services.length })
  },

  'GET /services/:slug': ({ slug }) => {
    const service = getServiceBySlug(slug)
    if (!service) return notFound('Service')
    const relatedProjects = projects
      .filter((project) => service.sectors.includes(project.sector))
      .slice(0, 3)
    return ok({ ...service, relatedProjects })
  },

  'GET /insights': ({ params }) => {
    const { category, search, featured, limit } = params
    let result = applyFilters(insights, { category })
    if (featured === 'true') result = result.filter((insight) => insight.featured)
    result = result.filter((insight) => matchesSearch(insight, search))
    result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date))
    if (limit) result = result.slice(0, Number(limit))
    return ok({ items: result, total: result.length })
  },

  'GET /insights/:slug': ({ slug }) => {
    const insight = getInsightBySlug(slug)
    if (!insight) return notFound('Article')
    const related = insights.filter((item) => item.id !== insight.id).slice(0, 3)
    return ok({ ...insight, related })
  },

  'GET /jobs': ({ params }) => {
    const { department, location, type, search } = params
    let result = applyFilters(jobs, { department, location, type })
    result = result.filter((job) => matchesSearch(job, search))
    return ok({
      items: [...result].sort((a, b) => new Date(b.posted) - new Date(a.posted)),
      total: result.length,
    })
  },

  'GET /jobs/:slug': ({ slug }) => {
    const job = getJobBySlug(slug)
    if (!job) return notFound('Vacancy')
    return ok(job)
  },

  'GET /people': () => ok({ items: leadership, total: leadership.length }),

  'POST /enquiries': ({ body }) => {
    const required = ['name', 'email', 'message']
    const missing = required.filter((field) => !body?.[field]?.trim())
    if (missing.length) {
      return {
        error: {
          status: 422,
          data: { message: 'Please complete the required fields.', fields: missing },
        },
      }
    }
    return ok({
      reference: `TA-${Date.now().toString().slice(-6)}`,
      message: 'Thank you. Our team will respond within one business day.',
    })
  },

  'POST /subscriptions': ({ body }) => {
    if (!body?.email?.includes('@')) {
      return {
        error: { status: 422, data: { message: 'Enter a valid email address.', fields: ['email'] } },
      }
    }
    return ok({ message: 'You are subscribed to Tech-Aura insights.' })
  },

  'POST /applications': ({ body }) => {
    const required = ['name', 'email', 'phone']
    const missing = required.filter((field) => !body?.[field]?.trim())
    if (missing.length) {
      return {
        error: {
          status: 422,
          data: { message: 'Please complete the required fields.', fields: missing },
        },
      }
    }
    return ok({
      reference: `TA-JOB-${Date.now().toString().slice(-6)}`,
      message: 'Application received. We will be in touch if you are shortlisted.',
    })
  },
}

/** Finds a route handler, supporting a single `:slug` segment. */
const resolveRoute = (method, pathname) => {
  const exact = routes[`${method} ${pathname}`]
  if (exact) return { handler: exact, slug: undefined }

  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 2) {
    const handler = routes[`${method} /${segments[0]}/:slug`]
    if (handler) return { handler, slug: segments[1] }
  }
  return null
}

/**
 * Serves a request from local data. Mirrors an HTTP backend closely enough that
 * pointing VITE_API_BASE_URL at a real server is the only change needed.
 */
export async function mockBackend({ url, method = 'GET', params = {}, body }) {
  await delay(LATENCY_MS)

  const [pathname] = url.split('?')
  const match = resolveRoute(method.toUpperCase(), pathname)

  if (!match) {
    return { error: { status: 404, data: { message: `No mock route for ${method} ${pathname}` } } }
  }

  return match.handler({ params, body, slug: match.slug })
}
