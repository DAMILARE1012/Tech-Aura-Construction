import { SmartImage } from '@/components/ui/SmartImage'
import { SIZES } from '@/utils/images'
import { cn } from '@/utils/cn'
import { Breadcrumbs } from './Breadcrumbs'
import { Container } from './Container'

/**
 * Dark banner at the top of every inner page. Pass `image` for a photographic
 * background, otherwise it falls back to the flat ink surface.
 */
export function PageHero({ eyebrow, title, intro, image, breadcrumbs, actions, children }) {
  return (
    <header className={cn('relative overflow-hidden bg-navy-900 pt-32 pb-16 md:pt-44 md:pb-24')}>
      {image && (
        <>
          <SmartImage
            src={image}
            alt=""
            aria-hidden="true"
            priority
            sizes={SIZES.full}
            widths={[640, 1024, 1440, 1920]}
            className="absolute inset-0 size-full object-cover opacity-60"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/55 to-navy-950/20"
            aria-hidden="true"
          />
        </>
      )}

      <Container className="relative">
        {breadcrumbs && <Breadcrumbs trail={breadcrumbs} invert className="mb-6" />}
        {eyebrow && <p className="eyebrow mb-4 text-aura-400">{eyebrow}</p>}
        <h1 className="text-display max-w-4xl text-4xl text-white drop-shadow-[0_2px_16px_rgba(1,21,47,0.6)] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 drop-shadow-[0_1px_10px_rgba(1,21,47,0.6)] sm:text-lg">{intro}</p>
        )}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        {children}
      </Container>
    </header>
  )
}
