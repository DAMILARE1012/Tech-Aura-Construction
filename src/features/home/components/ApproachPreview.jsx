import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { approachPillars } from '@/data/company'

/** Dark editorial band summarising the first four approach pillars. */
export function ApproachPreview() {
  return (
    <Section tone="dark" spacing="lg" containerSize="wide">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <SectionHeading
            eyebrow="Our approach"
            title="How we work is why clients come back"
            intro="Safety that people actually believe in, drawings that match the ground, and a programme we can hold to. Nothing exotic — just done properly, every time."
            invert
            className="mb-8"
          />
          <Link
            to="/approach"
            className="group inline-flex items-center gap-3 font-display text-sm font-bold tracking-[0.1em] text-aura-400 uppercase"
          >
            Read our approach
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <ul className="grid gap-px bg-white/10 sm:grid-cols-2">
          {approachPillars.slice(0, 4).map((pillar) => (
            <li key={pillar.id} className="bg-surface-inverse p-7 md:p-8">
              <p className="eyebrow text-aura-500">{pillar.title}</p>
              <h3 className="mt-3 font-display text-lg font-bold text-white">{pillar.headline}</h3>
              <p className="mt-3 text-sm leading-relaxed text-content-faint">{pillar.body}</p>
              <p className="mt-5 font-display text-2xl font-extrabold text-white">
                {pillar.stats[0].value}
                <span className="mt-1 block text-[11px] font-semibold tracking-[0.1em] text-content-muted uppercase">
                  {pillar.stats[0].label}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
