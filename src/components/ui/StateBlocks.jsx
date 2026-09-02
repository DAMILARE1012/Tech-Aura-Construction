import { AlertTriangle, SearchX } from 'lucide-react'
import { Button } from './Button'

/** Shown when a query rejects. */
export function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-line bg-surface-raised px-6 py-16 text-center">
      <AlertTriangle className="mb-4 size-8 text-danger-500" strokeWidth={1.5} />
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-content-muted">
        {message ?? 'We could not load this content. Please try again.'}
      </p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}

/** Shown when filters return nothing. */
export function EmptyState({ title = 'No results found', message, action }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line px-6 py-16 text-center">
      <SearchX className="mb-4 size-8 text-content-faint" strokeWidth={1.5} />
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-content-muted">
        {message ?? 'Try adjusting or clearing your filters.'}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
