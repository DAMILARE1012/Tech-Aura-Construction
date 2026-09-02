import { useEffect, useMemo, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { closeSearch, selectSearchTerm, setSearchTerm } from '@/features/ui/uiSlice'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { insights } from '@/data/insights'
import { jobs } from '@/data/careers'

/** Flat index across every content type, built once at module load. */
const searchIndex = [
  ...services.map((item) => ({
    id: item.id,
    label: item.title,
    detail: item.summary,
    group: 'Services',
    to: `/services/${item.slug}`,
  })),
  ...projects.map((item) => ({
    id: item.id,
    label: item.title,
    detail: `${item.location} · ${item.sector}`,
    group: 'Projects',
    to: `/projects/${item.slug}`,
  })),
  ...insights.map((item) => ({
    id: item.id,
    label: item.title,
    detail: item.excerpt,
    group: 'Insights',
    to: `/insights/${item.slug}`,
  })),
  ...jobs.map((item) => ({
    id: item.id,
    label: item.title,
    detail: `${item.department} · ${item.location}`,
    group: 'Careers',
    to: `/careers/${item.slug}`,
  })),
]

const search = (term) => {
  const needle = term.trim().toLowerCase()
  if (needle.length < 2) return []
  return searchIndex
    .filter(
      (entry) =>
        entry.label.toLowerCase().includes(needle) || entry.detail.toLowerCase().includes(needle),
    )
    .slice(0, 8)
}

export function SearchOverlay() {
  const dispatch = useDispatch()
  const term = useSelector(selectSearchTerm)
  const inputRef = useRef(null)

  const results = useMemo(() => search(term), [term])

  useEscapeKey(() => dispatch(closeSearch()))

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="animate-fade-in fixed inset-0 z-50 bg-ink-950/95 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-3xl px-5 pt-28 sm:px-8">
        <div className="flex items-center gap-4 border-b-2 border-aura-400 pb-4">
          <Search className="size-6 shrink-0 text-aura-500" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={term}
            onChange={(event) => dispatch(setSearchTerm(event.target.value))}
            placeholder="Search projects, services, insights…"
            aria-label="Search the site"
            className="w-full bg-transparent font-display text-xl font-bold text-white placeholder:text-ink-500 focus:outline-none sm:text-2xl"
          />
          <button
            type="button"
            onClick={() => dispatch(closeSearch())}
            aria-label="Close search"
            className="shrink-0 rounded-full p-2 text-ink-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-6 max-h-[60vh] overflow-y-auto" aria-live="polite">
          {term.trim().length < 2 && (
            <p className="py-8 text-sm text-ink-500">Type at least two characters to search.</p>
          )}

          {term.trim().length >= 2 && results.length === 0 && (
            <p className="py-8 text-sm text-ink-400">
              No matches for <span className="font-semibold text-white">{term}</span>.
            </p>
          )}

          <ul className="divide-y divide-white/10">
            {results.map((result) => (
              <li key={`${result.group}-${result.id}`}>
                <Link
                  to={result.to}
                  onClick={() => dispatch(closeSearch())}
                  className="group block py-4 transition-colors hover:bg-white/5"
                >
                  <span className="eyebrow text-aura-500">{result.group}</span>
                  <span className="mt-1.5 block font-display text-base font-bold text-white">
                    {result.label}
                  </span>
                  <span className="mt-1 line-clamp-1 block text-sm text-ink-400">
                    {result.detail}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
