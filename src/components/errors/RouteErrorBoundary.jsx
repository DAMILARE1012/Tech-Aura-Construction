import { useEffect } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { isChunkLoadError, reportError } from '@/utils/reportError'
import { ErrorScreen } from './ErrorScreen'

/**
 * Rendered by React Router in place of a route that threw.
 *
 * Attached to each child route so RootLayout stays mounted and the visitor
 * keeps the header, navigation and footer, and to the root route as a
 * full-page fallback for when the layout itself is what failed.
 */
export function RouteErrorBoundary({ variant = 'inline' }) {
  const error = useRouteError()

  useEffect(() => {
    // A 404 is an expected outcome, not a fault worth reporting.
    if (isRouteErrorResponse(error) && error.status === 404) return
    reportError(error, { source: 'RouteErrorBoundary' })
  }, [error])

  // Thrown Responses (a loader calling throw new Response(...)) carry a real
  // HTTP status, so they get a status-appropriate message.
  if (isRouteErrorResponse(error)) {
    const titles = {
      404: 'Page not found',
      401: 'You need to sign in',
      403: 'You do not have access to this page',
      500: 'Server error',
    }

    return (
      <ErrorScreen
        variant={variant}
        title={titles[error.status] ?? `Error ${error.status}`}
        message={
          error.status === 404
            ? 'The page you are looking for has moved or never existed. Try our projects index, or get in touch and we will point you the right way.'
            : error.statusText || undefined
        }
      />
    )
  }

  return (
    <ErrorScreen
      variant={variant}
      error={error}
      isChunkError={isChunkLoadError(error)}
    />
  )
}
