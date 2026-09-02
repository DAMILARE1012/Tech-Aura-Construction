import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { InsightsExplorer } from '@/features/insights/components/InsightsExplorer'
import { CtaBanner } from '@/features/home/components/CtaBanner'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function InsightsPage() {
  usePageTitle('News & Insights')

  return (
    <>
      <PageHero
        eyebrow="News & insights"
        title="What our engineers are thinking about"
        intro="Project news, engineering notes and hard-won lessons from sites across Nigeria."
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=70"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'News & Insights' }]}
      />

      <Section tone="white" spacing="lg" containerSize="wide">
        <InsightsExplorer />
      </Section>

      <CtaBanner
        eyebrow="Work with us"
        title="Have a project that needs this kind of thinking?"
      />
    </>
  )
}
