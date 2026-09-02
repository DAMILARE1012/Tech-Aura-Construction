import { Search, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Select } from './Field'

/**
 * Search box + a row of dropdown filters.
 * `filters` is [{ key, label, value, options }]; changes bubble through onChange.
 */
export function FilterBar({
  searchValue,
  searchPlaceholder = 'Search…',
  onSearchChange,
  filters = [],
  onFilterChange,
  onReset,
  showReset = false,
  resultCount,
  className,
}) {
  return (
    <div className={cn('space-y-5', className)}>
      <div className="grid gap-3 md:grid-cols-[minmax(0,2fr)_repeat(auto-fit,minmax(140px,1fr))]">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-content-faint"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="w-full rounded-lg border border-line bg-surface-raised py-3 pr-4 pl-11 text-sm text-content-strong transition-colors placeholder:text-content-faint focus:border-brand focus:outline-none"
          />
        </div>

        {filters.map((filter) => (
          <Select
            key={filter.key}
            aria-label={filter.label}
            value={filter.value}
            onChange={(event) => onFilterChange(filter.key, event.target.value)}
          >
            <option value="All">{filter.label}: All</option>
            {filter.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4">
        {typeof resultCount === 'number' && (
          <p className="text-sm text-content-muted" aria-live="polite">
            <span className="font-display font-bold text-content-strong">{resultCount}</span>{' '}
            {resultCount === 1 ? 'result' : 'results'}
          </p>
        )}
        {showReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-content-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
          >
            <X className="size-3.5" aria-hidden="true" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
