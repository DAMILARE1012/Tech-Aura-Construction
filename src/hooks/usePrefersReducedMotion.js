import { useMediaQuery } from './useMediaQuery'

/** True when the visitor has asked the OS for reduced motion. */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
