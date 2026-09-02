import { apiSlice } from '@/api/apiSlice'

const cleanParams = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value && value !== 'All' && value !== ''),
  )

export const careersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (params = {}) => ({ url: '/jobs', params: cleanParams(params) }),
      providesTags: (result) =>
        result?.items
          ? [...result.items.map(({ id }) => ({ type: 'Job', id })), { type: 'Job', id: 'LIST' }]
          : [{ type: 'Job', id: 'LIST' }],
    }),

    getJobBySlug: builder.query({
      query: (slug) => ({ url: `/jobs/${slug}` }),
      providesTags: (result, error, slug) => [{ type: 'Job', id: slug }],
    }),

    submitApplication: builder.mutation({
      query: (body) => ({ url: '/applications', method: 'POST', body }),
    }),
  }),
})

export const { useGetJobsQuery, useGetJobBySlugQuery, useSubmitApplicationMutation } = careersApi
