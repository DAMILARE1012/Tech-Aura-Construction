import { fetchBaseQuery } from '@reduxjs/toolkit/query'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const httpBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL || '/api',
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json')
    return headers
  },
})

/**
 * The mock is imported dynamically, not statically.
 *
 * A static import would pull mockBackend — and through it every project
 * description, article body and job spec in src/data — into the entry chunk
 * for every visitor, even in production against a real API. Behind a dynamic
 * import the bundler can split it into its own chunk that is only fetched
 * when VITE_API_BASE_URL is unset.
 *
 * The promise is cached so concurrent first requests share one module load.
 */
let mockBackendPromise

const loadMockBackend = () => {
  mockBackendPromise ??= import('./mockBackend').then((module) => module.mockBackend)
  return mockBackendPromise
}

/**
 * Talks to a real API when VITE_API_BASE_URL is set, and otherwise serves the
 * same request shapes from the in-browser mock. Endpoint definitions never need
 * to know which one is active.
 */
export const baseQuery = async (args, api, extraOptions) => {
  if (API_BASE_URL) {
    return httpBaseQuery(args, api, extraOptions)
  }

  const mockBackend = await loadMockBackend()
  const request = typeof args === 'string' ? { url: args } : args
  return mockBackend(request)
}
