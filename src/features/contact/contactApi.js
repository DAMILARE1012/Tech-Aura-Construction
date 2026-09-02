import { apiSlice } from '@/api/apiSlice'

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitEnquiry: builder.mutation({
      query: (body) => ({ url: '/enquiries', method: 'POST', body }),
    }),

    subscribeToInsights: builder.mutation({
      query: (body) => ({ url: '/subscriptions', method: 'POST', body }),
    }),
  }),
})

export const { useSubmitEnquiryMutation, useSubscribeToInsightsMutation } = contactApi
