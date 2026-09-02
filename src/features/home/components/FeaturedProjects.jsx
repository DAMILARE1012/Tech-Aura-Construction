import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { CardSkeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/StateBlocks'
import { ProjectCard } from '@/features/projects/components/ProjectCard'
import { useGetProjectsQuery } from '@/features/projects/projectsApi'

export function FeaturedProjects() {
  const { data, isLoading, isError, refetch } = useGetProjectsQuery({
    featured: 'true',
    limit: 4,
  })

  const [lead, ...rest] = data?.items ?? []

  return (
    <Section tone="white" spacing="lg" containerSize="wide">
      <SectionHeading
        eyebrow="Selected work"
        title="Projects across Nigeria"
        intro="Towers on reclaimed Lekki land, roads that hold through the rains, flow stations upgraded without shutting production down."
        align="between"
        action={<ArrowLink to="/projects" label="All projects" />}
      />

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <div className="grid gap-8 md:grid-cols-3">
          <CardSkeleton count={3} />
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-3">
          {lead && (
            <div className="lg:col-span-2">
              <ProjectCard project={lead} featured />
            </div>
          )}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
            {rest.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}
