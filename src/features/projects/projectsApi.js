import { apiSlice } from '@/api/apiSlice'
import { cleanParams } from '@/api/params'

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (params = {}) => ({ url: '/projects', params: cleanParams(params) }),
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map(({ id }) => ({ type: 'Project', id })),
              { type: 'Project', id: 'LIST' },
            ]
          : [{ type: 'Project', id: 'LIST' }],
    }),

    getProjectBySlug: builder.query({
      query: (slug) => ({ url: `/projects/${slug}` }),
      providesTags: (result, error, slug) => [{ type: 'Project', id: slug }],
    }),
  }),
})

export const { useGetProjectsQuery, useGetProjectBySlugQuery } = projectsApi
