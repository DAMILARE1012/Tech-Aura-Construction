import { Seo, JsonLd, breadcrumbSchema, collectionPageSchema } from '@/components/seo'
import { absoluteUrl } from '@/constants/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { StatGrid } from '@/components/ui/StatGrid'
import { CardSkeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/StateBlocks'
import { ServiceCard } from '@/features/services/components/ServiceCard'
import { useGetServicesQuery } from '@/features/services/servicesApi'
import { CtaBanner } from '@/features/home/components/CtaBanner'

const capabilityStats = [
  { value: '8', label: 'Service lines under one roof' },
  { value: '340+', label: 'Projects delivered' },
  { value: '9', label: 'States with active sites' },
  { value: '1,400+', label: 'People on our payroll' },
]

export default function ServicesPage() {
  const { data, isLoading, isError, refetch } = useGetServicesQuery()

  return (
    <>
      <Seo
        title="Construction & Engineering Services in Nigeria"
        description="Eight service lines: building construction, civil works, oil & gas, power, water, MEP, engineering design and project management — delivered nationwide."
      />
      <JsonLd
        schema={[
          breadcrumbSchema([{ label: 'Home', to: '/' }, { label: 'Services' }]),
          collectionPageSchema({
            name: 'Construction and engineering services',
            description: 'Tech-Aura service lines across Nigeria.',
            path: '/services',
            items: (data?.items ?? []).map((service) => ({
              name: service.title,
              url: absoluteUrl(`/services/${service.slug}`),
            })),
          }),
        ]}
      />
      <PageHero
        eyebrow="Our services"
        title="Everything a project needs, under one contract"
        intro="Design through construction, commissioning and long-term maintenance — delivered by in-house Nigerian teams rather than handed down a chain of intermediaries."
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=70"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />

      <Section tone="white" spacing="lg" containerSize="wide">
        <SectionHeading
          eyebrow="Capabilities"
          title="Eight service lines"
          intro="Each one staffed by permanent engineers and supervisors, with plant we own rather than hire on the day."
        />

        {isError ? (
          <ErrorState onRetry={refetch} />
        ) : (
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div className="col-span-full grid gap-8 bg-surface-raised sm:grid-cols-2 lg:grid-cols-3">
                <CardSkeleton count={8} />
              </div>
            ) : (
              data?.items.map((service) => <ServiceCard key={service.id} service={service} />)
            )}
          </div>
        )}
      </Section>

      <Section tone="sand" spacing="md" containerSize="wide">
        <StatGrid stats={capabilityStats} />
      </Section>

      <CtaBanner
        eyebrow="Not sure which line you need?"
        title="Describe the problem. We will scope it."
        intro="Most of our work starts as a question rather than a specification. Tell us what you are trying to achieve and we will tell you what it takes."
      />
    </>
  )
}
