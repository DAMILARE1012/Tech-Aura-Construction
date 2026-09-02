import { apiSlice } from '@/api/apiSlice'

export const peopleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeadership: builder.query({
      query: () => ({ url: '/people' }),
      providesTags: [{ type: 'Person', id: 'LIST' }],
    }),
  }),
})

export const { useGetLeadershipQuery } = peopleApi
