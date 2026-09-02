import { ArrowRight, Briefcase, Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { formatRelative } from '@/utils/format'

export function JobCard({ job }) {
  return (
    <article className="group border border-line bg-surface-raised p-6 transition-colors hover:border-brand-border hover:bg-brand-soft/30 md:p-7">
      <Link to={`/careers/${job.slug}`} className="block">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <Badge tone="aura">{job.department}</Badge>
            <h3 className="mt-3 font-display text-xl font-bold text-content-strong transition-colors group-hover:text-brand">
              {job.title}
            </h3>
          </div>
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-content transition-colors group-hover:bg-brand-emphasis group-hover:text-white"
            aria-hidden="true"
          >
            <ArrowRight className="size-4" />
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-content-muted">{job.summary}</p>

        <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-content-muted">
          <li className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-brand" aria-hidden="true" />
            {job.location}
          </li>
          <li className="flex items-center gap-1.5">
            <Briefcase className="size-3.5 text-brand" aria-hidden="true" />
            {job.type}
          </li>
          <li className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-brand" aria-hidden="true" />
            {job.experience}
          </li>
          <li className="ml-auto text-content-faint">Posted {formatRelative(job.posted).toLowerCase()}</li>
        </ul>
      </Link>
    </article>
  )
}
