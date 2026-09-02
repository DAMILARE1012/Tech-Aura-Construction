import { apiSlice } from '@/api/apiSlice'

export const servicesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: (params = {}) => ({ url: '/services', params }),
      providesTags: [{ type: 'Service', id: 'LIST' }],
    }),

    getServiceBySlug: builder.query({
      query: (slug) => ({ url: `/services/${slug}` }),
      providesTags: (result, error, slug) => [{ type: 'Service', id: slug }],
    }),
  }),
})

export const { useGetServicesQuery, useGetServiceBySlugQuery } = servicesApi
