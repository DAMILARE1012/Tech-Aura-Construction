import { useEffect, useState } from 'react'

/** Subscribes to a CSS media query, e.g. useMediaQuery('(min-width: 1024px)'). */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const list = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)

    // Re-sync in case `query` changed, or the match flipped between the
    // initial render and this subscription. Bails out when nothing moved.
    setMatches((current) => (current === list.matches ? current : list.matches))

    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }, [query])

  return matches
}
