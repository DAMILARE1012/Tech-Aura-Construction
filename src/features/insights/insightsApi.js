import { apiSlice } from '@/api/apiSlice'

const cleanParams = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value && value !== 'All' && value !== ''),
  )

export const insightsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInsights: builder.query({
      query: (params = {}) => ({ url: '/insights', params: cleanParams(params) }),
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map(({ id }) => ({ type: 'Insight', id })),
              { type: 'Insight', id: 'LIST' },
            ]
          : [{ type: 'Insight', id: 'LIST' }],
    }),

    getInsightBySlug: builder.query({
      query: (slug) => ({ url: `/insights/${slug}` }),
      providesTags: (result, error, slug) => [{ type: 'Insight', id: slug }],
    }),
  }),
})

export const { useGetInsightsQuery, useGetInsightBySlugQuery } = insightsApi
