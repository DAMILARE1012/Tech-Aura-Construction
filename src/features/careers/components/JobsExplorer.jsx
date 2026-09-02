import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'
import { FilterBar } from '@/components/ui/FilterBar'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState, ErrorState } from '@/components/ui/StateBlocks'
import { jobDepartments, jobLocations, jobTypes } from '@/data/careers'
import {
  resetJobFilters,
  selectHasActiveJobFilters,
  selectJobFilters,
  setJobFilter,
  setJobSearch,
} from '../jobFiltersSlice'
import { useGetJobsQuery } from '../careersApi'
import { JobCard } from './JobCard'

/** Filterable vacancy list. */
export function JobsExplorer() {
  const dispatch = useDispatch()
  const filters = useSelector(selectJobFilters)
  const hasActiveFilters = useSelector(selectHasActiveJobFilters)
  const { data, isLoading, isFetching, isError, refetch } = useGetJobsQuery(filters)

  const items = data?.items ?? []

  return (
    <div className="space-y-10">
      <FilterBar
        searchValue={filters.search}
        searchPlaceholder="Search roles by title or keyword…"
        onSearchChange={(value) => dispatch(setJobSearch(value))}
        filters={[
          {
            key: 'department',
            label: 'Department',
            value: filters.department,
            options: jobDepartments,
          },
          { key: 'location', label: 'Location', value: filters.location, options: jobLocations },
          { key: 'type', label: 'Type', value: filters.type, options: jobTypes },
        ]}
        onFilterChange={(key, value) => dispatch(setJobFilter({ key, value }))}
        onReset={() => dispatch(resetJobFilters())}
        showReset={hasActiveFilters}
        resultCount={isLoading ? undefined : items.length}
      />

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <div className="space-y-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-44 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title="No open roles match"
          message="Nothing matches these filters right now. Clear them, or send a speculative application to our careers team."
          action={
            <Button variant="outline" size="sm" onClick={() => dispatch(resetJobFilters())}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className={cn('space-y-5 transition-opacity duration-200', isFetching && 'opacity-60')}>
          {items.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
