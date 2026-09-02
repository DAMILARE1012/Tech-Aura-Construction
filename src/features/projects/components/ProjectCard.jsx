import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { Badge } from '@/components/ui/Badge'

const statusTone = {
  Completed: 'aura',
  Ongoing: 'solar',
  'Handed Over': 'default',
}

/**
 * Project tile. `featured` renders the taller editorial variant used in the
 * homepage lead slot.
 */
export function ProjectCard({ project, featured = false }) {
  return (
    <article className={cn('group', featured && 'lg:col-span-2 lg:row-span-2')}>
      <Link to={`/projects/${project.slug}`} className="block">
        <div className="relative overflow-hidden bg-surface-sunken">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className={cn(
              'w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105',
              featured ? 'aspect-[16/10]' : 'aspect-[4/3]',
            )}
          />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <Badge tone={statusTone[project.status] ?? 'default'}>{project.status}</Badge>
            <Badge tone="onDark">{project.sector}</Badge>
          </div>
        </div>

        <div className="pt-5">
          <p className="flex items-center gap-1.5 text-xs font-medium text-content-muted">
            <MapPin className="size-3.5 text-brand" aria-hidden="true" />
            {project.location}
            <span className="text-ink-300">·</span>
            {project.year}
          </p>

          <h3
            className={cn(
              'mt-2 font-display font-bold text-content-strong transition-colors group-hover:text-brand',
              featured ? 'text-2xl md:text-3xl' : 'text-lg',
            )}
          >
            {project.title}
          </h3>

          <p
            className={cn(
              'mt-2.5 leading-relaxed text-content-muted',
              featured ? 'text-base' : 'line-clamp-2 text-sm',
            )}
          >
            {project.summary}
          </p>

          <p className="mt-4 flex items-center gap-4 font-display text-xs font-bold tracking-[0.08em] text-content-faint uppercase">
            <span>{project.value}</span>
            <span className="text-ink-200">|</span>
            <span>{project.duration}</span>
          </p>
        </div>
      </Link>
    </article>
  )
}
