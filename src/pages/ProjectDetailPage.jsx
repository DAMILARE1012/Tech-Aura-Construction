import { Seo, JsonLd, breadcrumbSchema, projectSchema } from '@/components/seo'
import { Link, useParams } from 'react-router-dom'
import { Building2, Calendar, MapPin, Timer, Wallet } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { StatGrid } from '@/components/ui/StatGrid'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorState } from '@/components/ui/StateBlocks'
import { ProjectCard } from '@/features/projects/components/ProjectCard'
import { CtaBanner } from '@/features/home/components/CtaBanner'
import { useGetProjectBySlugQuery } from '@/features/projects/projectsApi'

const facts = (project) => [
  { icon: Building2, label: 'Client', value: project.client },
  { icon: MapPin, label: 'Location', value: project.location },
  { icon: Wallet, label: 'Contract value', value: project.value },
  { icon: Timer, label: 'Duration', value: project.duration },
  { icon: Calendar, label: 'Completion', value: String(project.year) },
]

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const { data: project, isLoading, isError, error, refetch } = useGetProjectBySlugQuery(slug)

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
        <ErrorState
          title="Project not found"
          message={error?.data?.message ?? 'This project may have been moved or renamed.'}
          onRetry={refetch}
        />
        <p className="mt-6 text-center text-sm">
          <Link to="/projects" className="font-semibold text-brand underline underline-offset-4">
            Back to all projects
          </Link>
        </p>
      </div>
    )
  }

  return (
    <>
      <Seo
        title={`${project.title} — ${project.location}`}
        description={project.summary}
        image={project.image}
        path={`/projects/${project.slug}`}
      />
      <JsonLd
        schema={[
          projectSchema(project),
          breadcrumbSchema([
            { label: 'Home', to: '/' },
            { label: 'Projects', to: '/projects' },
            { label: project.title },
          ]),
        ]}
      />
      <PageHero
        eyebrow={project.sector}
        title={project.title}
        intro={project.summary}
        image={project.image}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Projects', to: '/projects' },
          { label: project.title },
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          <Badge tone="dark">{project.status}</Badge>
          <Badge tone="onDark">{project.state}</Badge>
          <Badge tone="onDark">{project.year}</Badge>
        </div>
      </PageHero>

      <Section tone="white" spacing="md" containerSize="wide">
        <dl className="grid gap-8 border-b border-line pb-12 sm:grid-cols-2 lg:grid-cols-5">
          {facts(project).map((fact) => (
            <div key={fact.label}>
              <dt className="flex items-center gap-2 text-xs font-semibold tracking-[0.1em] text-content-faint uppercase">
                <fact.icon className="size-3.5 text-brand" aria-hidden="true" />
                {fact.label}
              </dt>
              <dd className="mt-2 font-display text-base font-bold text-content-strong">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-14 pt-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="prose-body">
            <h2>The challenge</h2>
            <p>{project.challenge}</p>
            <h2>What we did</h2>
            <p>{project.solution}</p>
            <h2>The outcome</h2>
            <p>{project.outcome}</p>
          </div>

          <aside>
            <h2 className="font-display text-lg font-bold text-content-strong">Scope of works</h2>
            <ul className="mt-5 space-y-3">
              {project.scope.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-content">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-aura-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <Section tone="dark" spacing="md" containerSize="wide">
        <SectionHeading eyebrow="By the numbers" title="Project at a glance" invert />
        <StatGrid stats={project.stats} invert />
      </Section>

      {project.related?.length > 0 && (
        <Section tone="white" spacing="lg" containerSize="wide">
          <SectionHeading eyebrow="Related work" title={`More ${project.sector.toLowerCase()} projects`} />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {project.related.map((related) => (
              <ProjectCard key={related.id} project={related} />
            ))}
          </div>
        </Section>
      )}

      <CtaBanner />
    </>
  )
}
