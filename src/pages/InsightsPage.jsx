import { Seo, JsonLd, breadcrumbSchema } from '@/components/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { InsightsExplorer } from '@/features/insights/components/InsightsExplorer'
import { CtaBanner } from '@/features/home/components/CtaBanner'

export default function InsightsPage() {

  return (
    <>
      <Seo
        title="News & Engineering Insights"
        description="Project news and engineering notes from Tech-Aura teams across Nigeria — drainage design, solar hybrid economics, site safety and building on reclaimed land."
      />
      <JsonLd
        schema={breadcrumbSchema([{ label: 'Home', to: '/' }, { label: 'News & Insights' }])}
      />
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
