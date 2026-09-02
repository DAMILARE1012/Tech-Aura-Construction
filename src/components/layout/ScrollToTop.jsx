import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { closeAllOverlays } from '@/features/ui/uiSlice'

/**
 * Resets scroll on navigation and dismisses any open overlay. Honours in-page
 * hash links by scrolling to the target element instead of the top.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(closeAllOverlays())

    if (hash) {
      // Wait a frame so the target section has mounted.
      const id = requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return () => cancelAnimationFrame(id)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    return undefined
  }, [pathname, hash, dispatch])

  return null
}
