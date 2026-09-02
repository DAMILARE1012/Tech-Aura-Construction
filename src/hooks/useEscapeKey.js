import { useEffect } from 'react'

/** Runs `handler` when Escape is pressed, while `active` is true. */
export function useEscapeKey(handler, active = true) {
  useEffect(() => {
    if (!active) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') handler()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [handler, active])
}
