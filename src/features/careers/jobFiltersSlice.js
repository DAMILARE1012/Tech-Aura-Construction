import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  department: 'All',
  location: 'All',
  type: 'All',
  search: '',
}

const jobFiltersSlice = createSlice({
  name: 'jobFilters',
  initialState,
  reducers: {
    setJobFilter(state, action) {
      const { key, value } = action.payload
      state[key] = value
    },
    setJobSearch(state, action) {
      state.search = action.payload
    },
    resetJobFilters() {
      return initialState
    },
  },
})

export const { setJobFilter, setJobSearch, resetJobFilters } = jobFiltersSlice.actions

export const selectJobFilters = (state) => state.jobFilters

export const selectHasActiveJobFilters = (state) => {
  const { department, location, type, search } = state.jobFilters
  return department !== 'All' || location !== 'All' || type !== 'All' || search !== ''
}

export default jobFiltersSlice.reducer
