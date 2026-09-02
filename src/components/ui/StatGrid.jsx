import { cn } from '@/utils/cn'

/** `stats` is [{ value, suffix?, label }]. */
export function StatGrid({ stats = [], invert = false, columns = 4, className }) {
  const columnClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  }[columns]

  return (
    <dl className={cn('grid gap-px overflow-hidden rounded-2xl', columnClass, invert ? 'bg-white/10' : 'bg-line', className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn('px-5 py-8 text-center md:px-6 md:py-10', invert ? 'bg-surface-inverse' : 'bg-surface-raised')}
        >
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span
              className={cn(
                'text-display block text-3xl md:text-4xl lg:text-5xl',
                invert ? 'text-white' : 'text-content-strong',
              )}
            >
              {stat.value}
              {stat.suffix && <span className="text-aura-500">{stat.suffix}</span>}
            </span>
            <span
              className={cn(
                'mt-3 block text-xs leading-snug font-medium',
                invert ? 'text-content-faint' : 'text-content-muted',
              )}
            >
              {stat.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  )
}
