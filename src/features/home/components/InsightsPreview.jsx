import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { CardSkeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/StateBlocks'
import { InsightCard } from '@/features/insights/components/InsightCard'
import { useGetInsightsQuery } from '@/features/insights/insightsApi'

export function InsightsPreview() {
  const { data, isLoading, isError, refetch } = useGetInsightsQuery({ limit: 3 })

  return (
    <Section tone="white" spacing="lg" containerSize="wide">
      <SectionHeading
        eyebrow="News & insights"
        title="From our engineers and our sites"
        align="between"
        action={<ArrowLink to="/insights" label="All insights" />}
      />

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <div className="grid gap-10 md:grid-cols-3">
          {isLoading ? (
            <CardSkeleton count={3} />
          ) : (
            data?.items.map((insight) => <InsightCard key={insight.id} insight={insight} />)
          )}
        </div>
      )}
    </Section>
  )
}
