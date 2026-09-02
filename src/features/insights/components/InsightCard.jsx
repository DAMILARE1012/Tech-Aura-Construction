import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/format'

/** Article tile. `layout="row"` is the horizontal variant used in sidebars. */
export function InsightCard({ insight, layout = 'stack' }) {
  const isRow = layout === 'row'

  return (
    <article className={cn('group', isRow && 'flex gap-5')}>
      <Link
        to={`/insights/${insight.slug}`}
        className={cn(isRow ? 'flex w-full gap-5' : 'block')}
      >
        <div
          className={cn(
            'overflow-hidden bg-surface-sunken',
            isRow ? 'aspect-square w-28 shrink-0' : 'aspect-[16/10] w-full',
          )}
        >
          <img
            src={insight.image}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        <div className={cn(isRow ? 'min-w-0' : 'pt-5')}>
          <p className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-display font-bold tracking-[0.1em] text-brand uppercase">
              {insight.category}
            </span>
            <span className="text-ink-300">·</span>
            <span className="text-content-muted">{formatDate(insight.date)}</span>
          </p>

          <h3
            className={cn(
              'mt-2 font-display font-bold text-content-strong transition-colors group-hover:text-brand',
              isRow ? 'line-clamp-2 text-sm leading-snug' : 'text-xl leading-snug',
            )}
          >
            {insight.title}
          </h3>

          {!isRow && (
            <>
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-content-muted">
                {insight.excerpt}
              </p>
              <p className="mt-4 text-xs text-content-faint">
                {insight.author} · {insight.readTime}
              </p>
            </>
          )}
        </div>
      </Link>
    </article>
  )
}
