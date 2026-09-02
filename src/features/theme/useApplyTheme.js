import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { THEME_STORAGE_KEY, selectTheme } from './themeSlice'

/**
 * Single side effect that syncs the Redux theme to the DOM and to
 * localStorage. Mounted once in RootLayout — nothing else should be
 * touching the `dark` class.
 */
export function useApplyTheme() {
  const theme = useSelector(selectTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Storage unavailable; the theme still applies for this session.
    }
  }, [theme])

  return theme
}
