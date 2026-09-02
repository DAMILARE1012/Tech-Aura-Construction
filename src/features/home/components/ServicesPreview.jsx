import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { CardSkeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/StateBlocks'
import { ServiceCard } from '@/features/services/components/ServiceCard'
import { useGetServicesQuery } from '@/features/services/servicesApi'

export function ServicesPreview() {
  const { data, isLoading, isError, refetch } = useGetServicesQuery({ limit: 6 })

  return (
    <Section id="what-we-do" tone="sand" spacing="lg" containerSize="wide">
      <SectionHeading
        eyebrow="What we do"
        title="Eight service lines. One accountable partner."
        intro="Design, build, power, water and maintain — delivered by in-house teams rather than passed down a chain of subcontractors."
        align="between"
        action={<ArrowLink to="/services" label="All services" />}
      />

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <div className="grid gap-px bg-ink-200 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full grid gap-8 bg-surface-sunken sm:grid-cols-2 lg:grid-cols-3">
              <CardSkeleton count={6} />
            </div>
          ) : (
            data?.items.map((service) => <ServiceCard key={service.id} service={service} />)
          )}
        </div>
      )}
    </Section>
  )
}
