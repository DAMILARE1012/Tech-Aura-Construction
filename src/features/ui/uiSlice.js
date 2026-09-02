import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  /** id of the primary-nav item whose mega menu is open, or null */
  openMegaMenu: null,
  mobileNavOpen: false,
  searchOpen: false,
  searchTerm: '',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openMegaMenu(state, action) {
      state.openMegaMenu = action.payload
    },
    closeMegaMenu(state) {
      state.openMegaMenu = null
    },
    toggleMobileNav(state) {
      state.mobileNavOpen = !state.mobileNavOpen
      if (state.mobileNavOpen) state.searchOpen = false
    },
    closeMobileNav(state) {
      state.mobileNavOpen = false
    },
    toggleSearch(state) {
      state.searchOpen = !state.searchOpen
      if (state.searchOpen) state.mobileNavOpen = false
      else state.searchTerm = ''
    },
    closeSearch(state) {
      state.searchOpen = false
      state.searchTerm = ''
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload
    },
    /** Called on every route change so no overlay survives navigation. */
    closeAllOverlays(state) {
      state.openMegaMenu = null
      state.mobileNavOpen = false
      state.searchOpen = false
      state.searchTerm = ''
    },
  },
})

export const {
  openMegaMenu,
  closeMegaMenu,
  toggleMobileNav,
  closeMobileNav,
  toggleSearch,
  closeSearch,
  setSearchTerm,
  closeAllOverlays,
} = uiSlice.actions

export const selectOpenMegaMenu = (state) => state.ui.openMegaMenu
export const selectMobileNavOpen = (state) => state.ui.mobileNavOpen
export const selectSearchOpen = (state) => state.ui.searchOpen
export const selectSearchTerm = (state) => state.ui.searchTerm

export default uiSlice.reducer
