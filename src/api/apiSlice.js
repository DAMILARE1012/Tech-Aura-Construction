import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'

/**
 * The single RTK Query API. Feature folders extend it with
 * `apiSlice.injectEndpoints(...)` so each feature owns its own endpoints
 * without this file growing.
 */
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Project', 'Service', 'Insight', 'Job', 'Person'],
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: false,
  endpoints: () => ({}),
})
