import { Seo, JsonLd, breadcrumbSchema, jobPostingSchema } from '@/components/seo'
import { Briefcase, Clock, MapPin } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorState } from '@/components/ui/StateBlocks'
import { ApplicationForm } from '@/features/careers/components/ApplicationForm'
import { useGetJobBySlugQuery } from '@/features/careers/careersApi'
import { formatDate } from '@/utils/format'

export default function JobDetailPage() {
  const { slug } = useParams()
  const { data: job, isLoading, isError, error, refetch } = useGetJobBySlugQuery(slug)

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
        <ErrorState title="Vacancy not found" message={error?.data?.message} onRetry={refetch} />
        <p className="mt-6 text-center text-sm">
          <Link to="/careers" className="font-semibold text-brand underline underline-offset-4">
            Back to all vacancies
          </Link>
        </p>
      </div>
    )
  }

  return (
    <>
      <Seo
        title={`${job.title} — ${job.location}`}
        description={job.summary}
        path={`/careers/${job.slug}`}
      />
      <JsonLd
        schema={[
          jobPostingSchema(job),
          breadcrumbSchema([
            { label: 'Home', to: '/' },
            { label: 'Careers', to: '/careers' },
            { label: job.title },
          ]),
        ]}
      />
      <PageHero
        eyebrow={job.department}
        title={job.title}
        intro={job.summary}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Careers', to: '/careers' },
          { label: job.title },
        ]}
      >
        <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-300">
          <li className="flex items-center gap-2">
            <MapPin className="size-4 text-aura-500" aria-hidden="true" />
            {job.location}
          </li>
          <li className="flex items-center gap-2">
            <Briefcase className="size-4 text-aura-500" aria-hidden="true" />
            {job.type}
          </li>
          <li className="flex items-center gap-2">
            <Clock className="size-4 text-aura-500" aria-hidden="true" />
            {job.experience}
          </li>
          <li className="text-content-faint">Posted {formatDate(job.posted)}</li>
        </ul>
      </PageHero>

      <Section tone="white" spacing="lg" containerSize="wide">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <h2 className="font-display text-2xl font-bold text-content-strong">What you will do</h2>
            <ul className="mt-6 space-y-3">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex gap-3 text-base text-content">
                  <span
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-aura-500"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-display text-2xl font-bold text-content-strong">
              What we are looking for
            </h2>
            <ul className="mt-6 space-y-3">
              {job.requirements.map((item) => (
                <li key={item} className="flex gap-3 text-base text-content">
                  <span
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-solar-500"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-12 border border-line bg-surface p-6">
              <Badge tone="aura">Equal opportunity</Badge>
              <p className="mt-4 text-sm leading-relaxed text-content">
                Tech-Aura hires on merit. We welcome applications from every part of Nigeria and
                actively encourage women engineers to apply — 38% of our professional staff are
                women and we intend to grow that number.
              </p>
            </div>
          </div>

          <aside className="h-fit border border-line bg-surface-raised p-7 lg:sticky lg:top-24">
            <h2 className="font-display text-xl font-bold text-content-strong">Apply now</h2>
            <p className="mt-2 mb-6 text-sm text-content-muted">
              Takes about two minutes. We read every application.
            </p>
            <ApplicationForm job={job} />
          </aside>
        </div>
      </Section>
    </>
  )
}
