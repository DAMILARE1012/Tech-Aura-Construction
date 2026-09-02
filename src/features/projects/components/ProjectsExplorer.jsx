import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/Button'
import { FilterBar } from '@/components/ui/FilterBar'
import { CardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState, ErrorState } from '@/components/ui/StateBlocks'
import { projectSectors, projectStates, projectStatuses } from '@/data/projects'
import {
  hydrateProjectFilters,
  resetProjectFilters,
  selectHasActiveProjectFilters,
  selectProjectFilters,
  setProjectFilter,
  setProjectSearch,
} from '../projectFiltersSlice'
import { useGetProjectsQuery } from '../projectsApi'
import { ProjectCard } from './ProjectCard'

/** Filterable project grid. Reads initial filters from the URL query string. */
export function ProjectsExplorer() {
  const dispatch = useDispatch()
  const filters = useSelector(selectProjectFilters)
  const hasActiveFilters = useSelector(selectHasActiveProjectFilters)
  const [searchParams] = useSearchParams()

  // Deep links such as /projects?sector=Energy land pre-filtered.
  useEffect(() => {
    const fromUrl = {}
    for (const key of ['sector', 'state', 'status']) {
      const value = searchParams.get(key)
      if (value) fromUrl[key] = value
    }
    if (Object.keys(fromUrl).length) dispatch(hydrateProjectFilters(fromUrl))
  }, [searchParams, dispatch])

  const { data, isLoading, isFetching, isError, refetch } = useGetProjectsQuery(filters)
  const items = data?.items ?? []

  return (
    <div className="space-y-10">
      <FilterBar
        searchValue={filters.search}
        searchPlaceholder="Search projects by name, client or location…"
        onSearchChange={(value) => dispatch(setProjectSearch(value))}
        filters={[
          { key: 'sector', label: 'Sector', value: filters.sector, options: projectSectors },
          { key: 'state', label: 'State', value: filters.state, options: projectStates },
          { key: 'status', label: 'Status', value: filters.status, options: projectStatuses },
        ]}
        onFilterChange={(key, value) => dispatch(setProjectFilter({ key, value }))}
        onReset={() => dispatch(resetProjectFilters())}
        showReset={hasActiveFilters}
        resultCount={isLoading ? undefined : items.length}
      />

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton count={6} />
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          message="No projects match these filters. Try widening your search."
          action={
            <Button variant="outline" size="sm" onClick={() => dispatch(resetProjectFilters())}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <div
          className={`grid gap-10 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3 ${
            isFetching ? 'opacity-60' : 'opacity-100'
          }`}
        >
          {items.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
