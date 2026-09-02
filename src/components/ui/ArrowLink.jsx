import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

/** Text link with the circled arrow motif used throughout the site. */
export function ArrowLink({ to, href, label, invert = false, className, children }) {
  const content = (
    <>
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45',
          invert ? 'bg-aura-500 text-white' : 'bg-brand-emphasis text-white',
        )}
        aria-hidden="true"
      >
        <ArrowUpRight className="size-4" strokeWidth={2.5} />
      </span>
      <span
        className={cn(
          'font-display text-sm font-bold tracking-tight',
          invert ? 'text-white' : 'text-content-strong',
        )}
      >
        {label ?? children}
      </span>
    </>
  )

  const classes = cn('group inline-flex items-center gap-3', className)

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <Link to={to} className={classes}>
      {content}
    </Link>
  )
}
