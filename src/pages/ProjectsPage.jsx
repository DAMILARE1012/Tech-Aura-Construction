import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { ProjectsExplorer } from '@/features/projects/components/ProjectsExplorer'
import { CtaBanner } from '@/features/home/components/CtaBanner'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function ProjectsPage() {
  usePageTitle('Our Projects')

  return (
    <>
      <PageHero
        eyebrow="Our projects"
        title="What we have built across Nigeria"
        intro="Over 340 projects delivered since 2009 — commercial towers, highways, flow stations, hospitals, water schemes and power plants in nine states."
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=70"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Projects' }]}
      />

      <Section tone="white" spacing="lg" containerSize="wide">
        <ProjectsExplorer />
      </Section>

      <CtaBanner
        eyebrow="Your project next"
        title="Bring us the difficult one."
        intro="Reclaimed ground, live facilities, tight urban plots, unforgiving programmes. That is the work we are built for."
      />
    </>
  )
}
