import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sector: 'All',
  state: 'All',
  status: 'All',
  search: '',
}

const projectFiltersSlice = createSlice({
  name: 'projectFilters',
  initialState,
  reducers: {
    setProjectFilter(state, action) {
      const { key, value } = action.payload
      state[key] = value
    },
    setProjectSearch(state, action) {
      state.search = action.payload
    },
    resetProjectFilters() {
      return initialState
    },
    /** Hydrates filters from the URL query string on first render. */
    hydrateProjectFilters(state, action) {
      return { ...initialState, ...action.payload }
    },
  },
})

export const {
  setProjectFilter,
  setProjectSearch,
  resetProjectFilters,
  hydrateProjectFilters,
} = projectFiltersSlice.actions

export const selectProjectFilters = (state) => state.projectFilters

export const selectHasActiveProjectFilters = (state) => {
  const { sector, state: location, status, search } = state.projectFilters
  return sector !== 'All' || location !== 'All' || status !== 'All' || search !== ''
}

export default projectFiltersSlice.reducer
