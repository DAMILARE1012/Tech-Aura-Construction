import { cn } from '@/utils/cn'

/**
 * Eyebrow + title + intro block used at the top of most sections.
 * `align="between"` pushes an action (e.g. "View all") to the right on desktop.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  invert = false,
  align = 'left',
  className,
}) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14',
        align === 'center' && 'mx-auto max-w-3xl text-center',
        align === 'between' && 'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn(align === 'between' && 'max-w-2xl')}>
        {eyebrow && (
          <p className={cn('eyebrow mb-4', invert ? 'text-aura-400' : 'text-brand')}>
            {eyebrow}
          </p>
        )}
        {title && (
          <h2
            className={cn(
              'text-display text-3xl sm:text-4xl lg:text-5xl',
              invert && 'text-white',
            )}
          >
            {title}
          </h2>
        )}
        {intro && (
          <p
            className={cn(
              'mt-5 max-w-2xl text-base leading-relaxed sm:text-lg',
              invert ? 'text-ink-300' : 'text-content-muted',
              align === 'center' && 'mx-auto',
            )}
          >
            {intro}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
