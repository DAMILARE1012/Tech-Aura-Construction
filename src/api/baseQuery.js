import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { mockBackend } from './mockBackend'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const httpBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL || '/api',
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json')
    return headers
  },
})

/**
 * Talks to a real API when VITE_API_BASE_URL is set, and otherwise serves the
 * same request shapes from the in-browser mock. Endpoint definitions never need
 * to know which one is active.
 */
export const baseQuery = async (args, api, extraOptions) => {
  if (API_BASE_URL) {
    return httpBaseQuery(args, api, extraOptions)
  }

  const request = typeof args === 'string' ? { url: args } : args
  return mockBackend(request)
}
