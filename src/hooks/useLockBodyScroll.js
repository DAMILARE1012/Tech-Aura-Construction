import { useEffect } from 'react'

/** Freezes page scroll while an overlay (mobile nav, search) is open. */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}
