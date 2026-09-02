/**
 * Single funnel for unexpected errors.
 *
 * Today it only logs. When a monitoring service is added (Sentry, Bugsnag,
 * Highlight), wire it in here and every boundary reports through it without
 * further changes.
 *
 * Note that React error boundaries only catch errors thrown during render,
 * in lifecycle methods, and in constructors. Errors inside event handlers,
 * `setTimeout`, or unawaited promises never reach a boundary — call this
 * directly from those paths when you need them recorded.
 */
export function reportError(error, context = {}) {
  const payload = {
    message: error?.message ?? String(error),
    stack: error?.stack,
    ...context,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    timestamp: new Date().toISOString(),
  }

  // Kept in production too: a console trace is often the only diagnostic
  // available when a user reports a blank page.
  console.error('[Tech-Aura]', payload.message, payload)

  // e.g. Sentry.captureException(error, { extra: context })
}

/**
 * True when a lazily loaded route chunk failed to download.
 *
 * This is the common one in production: the visitor is holding HTML from a
 * previous deploy and the hashed chunk it points at no longer exists. A
 * reload fetches the current HTML and fixes it, so the UI offers that first.
 */
export function isChunkLoadError(error) {
  const message = `${error?.message ?? ''} ${error?.name ?? ''}`
  return /dynamically imported module|Loading chunk|ChunkLoadError|Importing a module script failed|Failed to fetch/i.test(
    message,
  )
}
