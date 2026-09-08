import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '@/data/services'

/** Renders the services grid variant, driven by the services dataset. */
function ServicesPanel({ intro, onNavigate }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
      <IntroPanel intro={intro} onNavigate={onNavigate} />
      <div className="grid gap-x-8 gap-y-5 py-10 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.id}
            to={`/services/${service.slug}`}
            onClick={onNavigate}
            className="group rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-sunken"
          >
            <span className="block font-display text-sm font-bold text-content-strong transition-colors group-hover:text-brand">
              {service.title}
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-content-muted">
              {service.heroLine}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

/** Blue-block intro used on the left edge of every panel. */
function IntroPanel({ intro, onNavigate }) {
  return (
    <div className="bg-brand-emphasis px-8 py-10 text-white lg:-ml-12 lg:pl-12">
      <h2 className="font-display text-2xl font-bold">{intro.title}</h2>
      <p className="mt-4 text-sm leading-relaxed text-white/85">{intro.body}</p>
      <Link
        to={intro.ctaTo}
        onClick={onNavigate}
        className="group mt-6 inline-flex items-center gap-3 font-display text-xs font-bold tracking-[0.14em] uppercase"
      >
        {intro.ctaLabel}
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </div>
  )
}

/** Column-and-feature variant used by "Our Company". */
function ColumnsPanel({ mega, onNavigate }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)_280px]">
      <IntroPanel intro={mega.intro} onNavigate={onNavigate} />

      <div className="grid gap-8 py-10 sm:grid-cols-3">
        {mega.columns.map((column) => (
          <div key={column.id}>
            <h3 className="font-display text-base font-bold text-content-strong">{column.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    onClick={onNavigate}
                    className="text-sm text-content underline-offset-4 transition-colors hover:text-brand hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {mega.feature && (
        <div className="hidden py-10 lg:block">
          <p className="eyebrow text-brand">{mega.feature.eyebrow}</p>
          <img
            src={mega.feature.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="mt-4 aspect-[4/3] w-full rounded-lg object-cover"
          />
          <h3 className="mt-4 font-display text-base font-bold text-content-strong">
            {mega.feature.title}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-content-muted">{mega.feature.body}</p>
          <Link
            to={mega.feature.ctaTo}
            onClick={onNavigate}
            className="group mt-4 inline-flex items-center gap-2 font-display text-xs font-bold text-brand"
          >
            {mega.feature.ctaLabel}
            <ArrowRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      )}
    </div>
  )
}

/** Full-width dropdown panel beneath the header. */
export function MegaMenu({ item, onNavigate, onMouseEnter, onMouseLeave }) {
  const { mega } = item

  return (
    <div
      id={`megamenu-${item.id}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute inset-x-0 top-full hidden border-t border-line-soft bg-surface-raised shadow-[0_24px_48px_-24px_rgba(11,15,20,0.35)] lg:block"
    >
      <div className="mx-auto w-full max-w-[1560px] px-5 sm:px-8 lg:px-12">
        {mega.dynamic === 'services' ? (
          <ServicesPanel intro={mega.intro} onNavigate={onNavigate} />
        ) : (
          <ColumnsPanel mega={mega} onNavigate={onNavigate} />
        )}
      </div>
    </div>
  )
}
