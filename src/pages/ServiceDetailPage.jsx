import { Check } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorState } from '@/components/ui/StateBlocks'
import { ProjectCard } from '@/features/projects/components/ProjectCard'
import { ServiceCard } from '@/features/services/components/ServiceCard'
import { CtaBanner } from '@/features/home/components/CtaBanner'
import { useGetServiceBySlugQuery, useGetServicesQuery } from '@/features/services/servicesApi'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const { data: service, isLoading, isError, error, refetch } = useGetServiceBySlugQuery(slug)
  const { data: allServices } = useGetServicesQuery()

  usePageTitle(service?.title)

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-16">
        <Spinner className="size-10" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-40 pb-24">
        <ErrorState title="Service not found" message={error?.data?.message} onRetry={refetch} />
        <p className="mt-6 text-center text-sm">
          <Link to="/services" className="font-semibold text-brand underline underline-offset-4">
            Back to all services
          </Link>
        </p>
      </div>
    )
  }

  const otherServices = (allServices?.items ?? [])
    .filter((item) => item.id !== service.id)
    .slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        intro={service.heroLine}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.title },
        ]}
      />

      <Section tone="white" spacing="lg" containerSize="wide">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <p className="text-lg leading-relaxed text-content">{service.summary}</p>

            <h2 className="mt-12 font-display text-2xl font-bold text-content-strong">What we deliver</h2>
            <ul className="mt-6 space-y-4">
              {service.capabilities.map((capability) => (
                <li key={capability} className="flex gap-4">
                  <span
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"
                    aria-hidden="true"
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-base text-content">{capability}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit border border-line bg-surface p-8">
            <p className="text-display text-5xl text-brand">{service.stat.value}</p>
            <p className="mt-2 text-sm font-semibold text-content">{service.stat.label}</p>

            <hr className="my-8 border-line" />

            <h3 className="font-display text-sm font-bold tracking-[0.1em] text-content-strong uppercase">
              Sectors served
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.sectors.map((sector) => (
                <Badge key={sector} tone="outline">
                  {sector}
                </Badge>
              ))}
            </div>

            <Button to="/contact" className="mt-8 w-full">
              Enquire about this service
            </Button>
          </aside>
        </div>
      </Section>

      {service.relatedProjects?.length > 0 && (
        <Section tone="sand" spacing="lg" containerSize="wide">
          <SectionHeading eyebrow="In practice" title="Projects from this service line" />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {service.relatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Section>
      )}

      {otherServices.length > 0 && (
        <Section tone="white" spacing="lg" containerSize="wide">
          <SectionHeading eyebrow="Also from Tech-Aura" title="Other service lines" />
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((item) => (
              <ServiceCard key={item.id} service={item} />
            ))}
          </div>
        </Section>
      )}

      <CtaBanner />
    </>
  )
}
