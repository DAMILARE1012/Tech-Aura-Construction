import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

/** `trail` is [{ label, to? }] — the final item renders as plain text. */
export function Breadcrumbs({ trail = [], invert = false, className }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex flex-wrap items-center gap-1.5 text-xs', className)}>
      {trail.map((crumb, index) => {
        const isLast = index === trail.length - 1
        return (
          <span key={crumb.label} className="flex items-center gap-1.5">
            {crumb.to && !isLast ? (
              <Link
                to={crumb.to}
                className={cn(
                  'font-medium underline-offset-4 transition-colors hover:underline',
                  invert ? 'text-white/70 hover:text-white' : 'text-content-muted hover:text-brand',
                )}
              >
                {crumb.label}
              </Link>
            ) : (
              <span className={cn('font-semibold', invert ? 'text-white' : 'text-content-strong')}>
                {crumb.label}
              </span>
            )}
            {!isLast && (
              <ChevronRight
                className={cn('size-3', invert ? 'text-white/40' : 'text-ink-300')}
                aria-hidden="true"
              />
            )}
          </span>
        )
      })}
    </nav>
  )
}
