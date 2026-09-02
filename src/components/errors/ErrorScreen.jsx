import { RefreshCw, TriangleAlert } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { CONTACT } from '@/constants/site'

/**
 * Shared fallback UI for every error path.
 *
 * Deliberately uses plain anchors (`Button href`) rather than router `Link`s.
 * This screen has to render when the router itself is the thing that broke, so
 * it cannot depend on router context — and a full page load is the right
 * behaviour anyway, since it discards whatever bad state caused the error.
 *
 * `variant="page"` stands alone (no header or footer around it).
 * `variant="inline"` renders inside the app shell, so the chrome survives.
 */
export function ErrorScreen({
  variant = 'page',
  title = 'Something went wrong',
  message,
  error,
  onRetry,
  isChunkError = false,
}) {
  const isPage = variant === 'page'

  const body =
    message ??
    (isChunkError
      ? 'The site was updated while this page was open, so part of it could not load. Reloading will pick up the latest version.'
      : 'An unexpected error stopped this page from loading. Our team has been notified.')

  return (
    <section
      role="alert"
      aria-live="assertive"
      className={cn(
        isPage
          ? 'flex min-h-screen items-center bg-ink-900 py-24'
          : 'bg-surface py-24 md:py-32',
      )}
    >
      <Container className="text-center">
        <span
          className={cn(
            'mx-auto mb-8 flex size-16 items-center justify-center rounded-full',
            isPage ? 'bg-white/10 text-aura-400' : 'bg-brand-soft text-brand',
          )}
          aria-hidden="true"
        >
          <TriangleAlert className="size-8" strokeWidth={1.5} />
        </span>

        <h1
          className={cn(
            'text-display text-3xl sm:text-4xl lg:text-5xl',
            isPage && 'text-white',
          )}
        >
          {title}
        </h1>

        <p
          className={cn(
            'mx-auto mt-5 max-w-xl text-base leading-relaxed',
            isPage ? 'text-ink-300' : 'text-content-muted',
          )}
        >
          {body}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {isChunkError || !onRetry ? (
            <Button
              onClick={() => window.location.reload()}
              size="lg"
              variant={isPage ? 'primary' : 'primary'}
            >
              <RefreshCw className="size-4" aria-hidden="true" />
              Reload page
            </Button>
          ) : (
            <Button onClick={onRetry} size="lg">
              <RefreshCw className="size-4" aria-hidden="true" />
              Try again
            </Button>
          )}

          <Button href="/" variant={isPage ? 'outlineLight' : 'outline'} size="lg">
            Back to home
          </Button>

          <Button
            href={`mailto:${CONTACT.email}`}
            variant={isPage ? 'outlineLight' : 'outline'}
            size="lg"
          >
            Report this
          </Button>
        </div>

        {/* Diagnostics are development-only: in production this would leak
            internal paths and module names to visitors. */}
        {import.meta.env.DEV && error && (
          <details
            className={cn(
              'mx-auto mt-12 max-w-2xl rounded-lg border p-4 text-left',
              isPage ? 'border-white/15 bg-white/5' : 'border-line bg-surface-sunken',
            )}
          >
            <summary
              className={cn(
                'cursor-pointer font-display text-xs font-bold tracking-[0.1em] uppercase',
                isPage ? 'text-aura-400' : 'text-brand',
              )}
            >
              Developer details
            </summary>
            <pre
              className={cn(
                'mt-4 overflow-x-auto text-xs leading-relaxed whitespace-pre-wrap',
                isPage ? 'text-ink-300' : 'text-content-muted',
              )}
            >
              {error.stack ?? error.message ?? String(error)}
            </pre>
          </details>
        )}
      </Container>
    </section>
  )
}
