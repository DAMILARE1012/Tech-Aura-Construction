import { createSlice } from '@reduxjs/toolkit'

export const THEME_STORAGE_KEY = 'tech-aura-theme'

/**
 * Resolves the theme to boot with: an explicit past choice wins, otherwise
 * fall back to the OS preference. Mirrors the inline script in index.html,
 * which runs the same logic before first paint to avoid a flash.
 */
export const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light'

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // Private mode or blocked storage — fall through to the OS preference.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
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
