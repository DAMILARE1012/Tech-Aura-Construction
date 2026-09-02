import { useEffect } from 'react'
import { COMPANY } from '@/constants/site'

/** Sets document.title for the current page, restoring nothing on unmount. */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${COMPANY.shortName}` : COMPANY.name
  }, [title])
}
