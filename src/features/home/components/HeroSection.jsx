import { ChevronDown } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { HeroVideo } from './HeroVideo'

/** Headline figures, kept short so the hero stays uncluttered. */
const HERO_FACTS = [
  { value: '340+', label: 'Projects delivered' },
  { value: '38 MW', label: 'Renewable capacity installed' },
  { value: '16 yrs', label: 'Building across Nigeria' },
]

/** Homepage hero: background video behind the headline and key figures. */
export function HeroSection() {
  return (
    <section className="relative flex min-h-[88svh] items-center overflow-hidden pt-28 pb-20">
      <HeroVideo />

      <Container size="wide" className="relative">
        <div className="max-w-4xl">
          <p className="eyebrow animate-fade-up mb-6 text-aura-300">
            Lagos, Nigeria · Since 2009
          </p>

          <h1 className="text-display animate-fade-up text-5xl text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl xl:text-8xl">
            We Build What
            <br />
            Nigeria Needs Next
          </h1>

          <p className="animate-fade-up mt-8 max-w-2xl text-base leading-relaxed text-white/85 drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)] sm:text-lg lg:text-xl">
            Energy-efficient homes, roads that hold through the rains, and the power and water
            infrastructure Nigerian communities and industries depend on.
          </p>

          <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ArrowLink to="/projects" label="See our projects" invert />
            <ArrowLink to="/contact" label="Start a conversation" invert />
          </div>

          <dl className="animate-fade-up mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/20 pt-8">
            {HERO_FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="text-display block text-3xl text-white lg:text-4xl">
                    {fact.value}
                  </span>
                  <span className="mt-1.5 block text-xs font-medium text-white/70">
                    {fact.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <a
        href="#what-we-do"
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors hover:text-white md:flex"
      >
        <span className="font-display text-[10px] font-bold tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
