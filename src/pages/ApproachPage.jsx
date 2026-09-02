import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CtaBanner } from '@/features/home/components/CtaBanner'
import { approachPillars } from '@/data/company'
import { cn } from '@/utils/cn'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function ApproachPage() {
  usePageTitle('Our Approach')

  return (
    <>
      <PageHero
        eyebrow="Our approach"
        title="Six commitments we can show evidence for"
        intro="Safety, quality, sustainability, Nigerian content, community and ethics — with the numbers behind each one."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=70"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Our Approach' }]}
      />

      <Section tone="white" spacing="md" containerSize="wide">
        <nav aria-label="Jump to section" className="flex flex-wrap gap-2">
          {approachPillars.map((pillar) => (
            <a
              key={pillar.id}
              href={`#${pillar.id}`}
              className="border border-line px-4 py-2 font-display text-xs font-bold tracking-[0.08em] text-content uppercase transition-colors hover:border-brand hover:bg-brand-emphasis hover:text-white"
            >
              {pillar.title}
            </a>
          ))}
        </nav>
      </Section>

      {approachPillars.map((pillar, index) => (
        <Section
          key={pillar.id}
          id={pillar.id}
          tone={index % 2 === 0 ? 'sand' : 'white'}
          spacing="lg"
          containerSize="wide"
          className="scroll-mt-20"
        >
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div>
              <SectionHeading
                eyebrow={pillar.title}
                title={pillar.headline}
                className="mb-0"
              />
            </div>

            <div>
              <p className="text-base leading-relaxed text-content md:text-lg">{pillar.body}</p>

              <dl className="mt-10 grid gap-px bg-line sm:grid-cols-3">
                {pillar.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={cn(
                      'px-5 py-7',
                      index % 2 === 0 ? 'bg-surface-sunken' : 'bg-surface-raised',
                    )}
                  >
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="text-display block text-2xl text-brand lg:text-3xl">
                        {stat.value}
                      </span>
                      <span className="mt-2 block text-xs leading-snug text-content-muted">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Section>
      ))}

      <CtaBanner
        eyebrow="Prequalifying us?"
        title="Ask us for the evidence."
        intro="Safety statistics, ISO certificates, community agreements and audited accounts are available on request."
      />
    </>
  )
}
