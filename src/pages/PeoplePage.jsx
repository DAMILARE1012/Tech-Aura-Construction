import { Seo, JsonLd, breadcrumbSchema } from '@/components/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { StatGrid } from '@/components/ui/StatGrid'
import { CardSkeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/StateBlocks'
import { Button } from '@/components/ui/Button'
import { PersonCard } from '@/features/people/components/PersonCard'
import { useGetLeadershipQuery } from '@/features/people/peopleApi'
import { CtaBanner } from '@/features/home/components/CtaBanner'
import { cultureValues, workforceStats } from '@/data/people'

export default function PeoplePage() {
  const { data, isLoading, isError, refetch } = useGetLeadershipQuery()

  return (
    <>
      <Seo
        title="Our People & Leadership"
        description="Meet the COREN-registered engineers and executives leading Tech-Aura across Lagos, Abuja, Port Harcourt and Kano — 1,400 people, 92% Nigerian."
      />
      <JsonLd
        schema={breadcrumbSchema([{ label: 'Home', to: '/' }, { label: 'Our People' }])}
      />
      <PageHero
        eyebrow="Our people"
        title="The engineers behind the work"
        intro="Tech-Aura is 1,400 people — designers, site engineers, supervisors, welders, surveyors and safety officers, almost all of them Nigerian."
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=70"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Our People' }]}
      />

      <Section tone="white" spacing="md" containerSize="wide">
        <StatGrid stats={workforceStats} />
      </Section>

      <Section tone="sand" spacing="lg" containerSize="wide">
        <SectionHeading
          eyebrow="Leadership"
          title="Who runs Tech-Aura"
          intro="An executive team with a combined century of Nigerian construction experience, most of it earned on site rather than behind a desk."
        />

        {isError ? (
          <ErrorState onRetry={refetch} />
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <CardSkeleton count={6} />
            ) : (
              data?.items.map((person) => <PersonCard key={person.id} person={person} />)
            )}
          </div>
        )}
      </Section>

      <Section tone="dark" spacing="lg" containerSize="wide">
        <SectionHeading
          eyebrow="Our culture"
          title="What we hold ourselves to"
          invert
        />
        <div className="grid gap-px bg-white/10 sm:grid-cols-2">
          {cultureValues.map((value) => (
            <div key={value.id} className="bg-surface-inverse p-8 md:p-10">
              <h3 className="font-display text-xl font-bold text-white">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-content-faint">{value.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Button to="/careers" variant="primary" size="lg">
            See open roles
          </Button>
          <Button to="/careers#academy" variant="outlineLight" size="lg">
            Tech-Aura Academy
          </Button>
        </div>
      </Section>

      <CtaBanner />
    </>
  )
}
