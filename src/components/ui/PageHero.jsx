import { cn } from '@/utils/cn'
import { Breadcrumbs } from './Breadcrumbs'
import { Container } from './Container'

/**
 * Dark banner at the top of every inner page. Pass `image` for a photographic
 * background, otherwise it falls back to the flat ink surface.
 */
export function PageHero({ eyebrow, title, intro, image, breadcrumbs, actions, children }) {
  return (
    <header className={cn('relative overflow-hidden bg-ink-900 pt-32 pb-16 md:pt-44 md:pb-24')}>
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover opacity-35"
            loading="eager"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40"
            aria-hidden="true"
          />
        </>
      )}

      <Container className="relative">
        {breadcrumbs && <Breadcrumbs trail={breadcrumbs} invert className="mb-6" />}
        {eyebrow && <p className="eyebrow mb-4 text-aura-400">{eyebrow}</p>}
        <h1 className="text-display max-w-4xl text-4xl text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">{intro}</p>
        )}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        {children}
      </Container>
    </header>
  )
}
