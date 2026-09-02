import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'
import { CardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState, ErrorState } from '@/components/ui/StateBlocks'
import { insightCategories } from '@/data/insights'
import {
  resetInsightFilters,
  selectInsightFilters,
  setInsightCategory,
  setInsightSearch,
} from '../insightFiltersSlice'
import { useGetInsightsQuery } from '../insightsApi'
import { InsightCard } from './InsightCard'

const tabs = ['All', ...insightCategories]

/** Category tabs + search over the insights archive. */
export function InsightsExplorer() {
  const dispatch = useDispatch()
  const filters = useSelector(selectInsightFilters)
  const { data, isLoading, isFetching, isError, refetch } = useGetInsightsQuery(filters)

  const items = data?.items ?? []
  const hasFilters = filters.category !== 'All' || filters.search !== ''

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mb-px flex gap-1 overflow-x-auto" role="tablist" aria-label="Filter by category">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={filters.category === tab}
              onClick={() => dispatch(setInsightCategory(tab))}
              className={cn(
                'shrink-0 border-b-2 px-4 py-3 font-display text-xs font-bold tracking-[0.08em] uppercase transition-colors',
                filters.category === tab
                  ? 'border-brand text-brand'
                  : 'border-transparent text-content-muted hover:text-content-strong',
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={filters.search}
          onChange={(event) => dispatch(setInsightSearch(event.target.value))}
          placeholder="Search insights…"
          aria-label="Search insights"
          className="w-full rounded-lg border border-line bg-surface-raised px-4 py-2.5 text-sm text-content-strong transition-colors placeholder:text-content-faint focus:border-brand focus:outline-none lg:w-72"
        />
      </div>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton count={6} />
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title="No articles found"
          message="Nothing matches that category or search term yet."
          action={
            hasFilters && (
              <Button variant="outline" size="sm" onClick={() => dispatch(resetInsightFilters())}>
                Clear filters
              </Button>
            )
          }
        />
      ) : (
        <div
          className={cn(
            'grid gap-10 transition-opacity duration-200 md:grid-cols-2 lg:grid-cols-3',
            isFetching && 'opacity-60',
          )}
        >
          {items.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      )}
    </div>
  )
}
