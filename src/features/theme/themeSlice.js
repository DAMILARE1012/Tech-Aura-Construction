import { createSlice } from '@reduxjs/toolkit'

export const THEME_STORAGE_KEY = 'tech-aura-theme'

/**
 * Resolves the theme to boot with.
 *
 * An explicit past choice always wins. Otherwise the site defaults to LIGHT
 * regardless of the OS setting — this is a marketing site whose photography
 * and brand palette are designed light-first, so a visitor whose laptop is in
 * dark mode should still land on the intended presentation. Dark remains one
 * click away in the header, and their choice is then remembered.
 *
 * Mirrors the inline script in index.html, which runs the same logic before
 * first paint to avoid a flash. Change one, change the other.
 */
export const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light'

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // Private mode or blocked storage — fall through to the light default.
  }

  return 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: getInitialTheme() },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
    setTheme(state, action) {
      state.mode = action.payload
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions

export const selectTheme = (state) => state.theme.mode
export const selectIsDark = (state) => state.theme.mode === 'dark'

export default themeSlice.reducer
