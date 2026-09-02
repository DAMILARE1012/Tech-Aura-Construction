import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { fallbackServiceIcon, serviceIcons } from './serviceIcons'

/** Service tile. `variant="dark"` is used on dark section backgrounds. */
export function ServiceCard({ service, variant = 'light' }) {
  const Icon = serviceIcons[service.icon] ?? fallbackServiceIcon
  const isDark = variant === 'dark'

  return (
    <Link
      to={`/services/${service.slug}`}
      className={cn(
        'group flex flex-col justify-between gap-8 border p-7 transition-colors duration-300 md:p-8',
        isDark
          ? 'border-white/10 bg-surface-inverse-raised hover:border-brand/50 hover:brightness-125'
          : 'border-line bg-surface-raised hover:border-brand-border hover:bg-brand-soft/40',
      )}
    >
      <div>
        <span
          className={cn(
            'flex size-12 items-center justify-center rounded-lg transition-colors',
            isDark
              ? 'bg-white/10 text-aura-400 group-hover:bg-brand-emphasis group-hover:text-white'
              : 'bg-brand-soft text-brand group-hover:bg-brand-emphasis group-hover:text-white',
          )}
          aria-hidden="true"
        >
          <Icon className="size-6" strokeWidth={1.75} />
        </span>

        <h3
          className={cn(
            'mt-6 font-display text-xl font-bold transition-colors',
            isDark ? 'text-white' : 'text-content-strong group-hover:text-brand',
          )}
        >
          {service.title}
        </h3>

        <p className={cn('mt-3 text-sm leading-relaxed', isDark ? 'text-content-faint' : 'text-content-muted')}>
          {service.summary}
        </p>
      </div>

      <span
        className={cn(
          'inline-flex items-center gap-2 font-display text-xs font-bold tracking-[0.1em] uppercase',
          isDark ? 'text-aura-400' : 'text-brand',
        )}
      >
        Explore
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  )
}
