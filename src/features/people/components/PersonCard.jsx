import { MapPin } from 'lucide-react'

export function PersonCard({ person }) {
  return (
    <article className="group">
      <div className="relative overflow-hidden bg-surface-sunken">
        <img
          src={person.image}
          alt={person.name}
          loading="lazy"
          className="aspect-[5/6] w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 bg-aura-500 transition-transform duration-500 group-hover:scale-x-100"
          aria-hidden="true"
        />
      </div>

      <div className="pt-5">
        <h3 className="font-display text-lg font-bold text-content-strong">{person.name}</h3>
        <p className="mt-1 font-display text-sm font-semibold text-brand">{person.role}</p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-content-faint">
          <MapPin className="size-3.5" aria-hidden="true" />
          {person.location}
          <span className="text-ink-300">·</span>
          {person.credentials}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-content-muted">{person.bio}</p>
      </div>
    </article>
  )
}
