import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  category: 'All',
  search: '',
}

const insightFiltersSlice = createSlice({
  name: 'insightFilters',
  initialState,
  reducers: {
    setInsightCategory(state, action) {
      state.category = action.payload
    },
    setInsightSearch(state, action) {
      state.search = action.payload
    },
    resetInsightFilters() {
      return initialState
    },
  },
})

export const { setInsightCategory, setInsightSearch, resetInsightFilters } =
  insightFiltersSlice.actions

export const selectInsightFilters = (state) => state.insightFilters

export default insightFiltersSlice.reducer
