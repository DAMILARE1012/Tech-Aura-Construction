import { Seo, JsonLd, breadcrumbSchema, articleSchema } from '@/components/seo'
import { Link, useParams } from 'react-router-dom'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorState } from '@/components/ui/StateBlocks'
import { InsightCard } from '@/features/insights/components/InsightCard'
import { CtaBanner } from '@/features/home/components/CtaBanner'
import { useGetInsightBySlugQuery } from '@/features/insights/insightsApi'
import { formatDate } from '@/utils/format'

export default function InsightDetailPage() {
  const { slug } = useParams()
  const { data: insight, isLoading, isError, error, refetch } = useGetInsightBySlugQuery(slug)

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
        <ErrorState title="Article not found" message={error?.data?.message} onRetry={refetch} />
        <p className="mt-6 text-center text-sm">
          <Link to="/insights" className="font-semibold text-brand underline underline-offset-4">
            Back to all insights
          </Link>
        </p>
      </div>
    )
  }

  return (
    <>
      <Seo
        title={insight.title}
        description={insight.excerpt}
        image={insight.image}
        type="article"
        path={`/insights/${insight.slug}`}
        publishedTime={insight.date}
        modifiedTime={insight.date}
        author={insight.author}
      />
      <JsonLd
        schema={[
          articleSchema(insight),
          breadcrumbSchema([
            { label: 'Home', to: '/' },
            { label: 'Insights', to: '/insights' },
            { label: insight.title },
          ]),
        ]}
      />
      <PageHero
        eyebrow={insight.category}
        title={insight.title}
        image={insight.image}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Insights', to: '/insights' },
          { label: insight.category },
        ]}
      >
        <p className="mt-8 text-sm text-ink-300">
          {insight.author} · {formatDate(insight.date)} · {insight.readTime}
        </p>
      </PageHero>

      <Section tone="white" spacing="lg">
        <article className="mx-auto max-w-2xl">
          <p className="mb-10 border-l-2 border-brand pl-6 text-lg leading-relaxed font-medium text-content-strong">
            {insight.excerpt}
          </p>

          <div className="prose-body">
            {insight.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <footer className="mt-12 border-t border-line pt-8">
            <p className="text-sm text-content-muted">
              Written by <span className="font-semibold text-content-strong">{insight.author}</span>
            </p>
            <Link
              to="/insights"
              className="mt-4 inline-block font-display text-xs font-bold tracking-[0.1em] text-brand uppercase underline-offset-4 hover:underline"
            >
              ← All insights
            </Link>
          </footer>
        </article>
      </Section>

      {insight.related?.length > 0 && (
        <Section tone="sand" spacing="lg" containerSize="wide">
          <SectionHeading eyebrow="Keep reading" title="More from Tech-Aura" />
          <div className="grid gap-10 md:grid-cols-3">
            {insight.related.map((related) => (
              <InsightCard key={related.id} insight={related} />
            ))}
          </div>
        </Section>
      )}

      <CtaBanner />
    </>
  )
}
