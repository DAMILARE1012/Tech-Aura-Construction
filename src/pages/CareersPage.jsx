import { Seo, JsonLd, breadcrumbSchema } from '@/components/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { StatGrid } from '@/components/ui/StatGrid'
import { JobsExplorer } from '@/features/careers/components/JobsExplorer'
import { CtaBanner } from '@/features/home/components/CtaBanner'
import { benefits } from '@/data/careers'
import { cultureValues, workforceStats } from '@/data/people'

export default function CareersPage() {

  return (
    <>
      <Seo
        title="Careers & Jobs in Nigeria"
        description="Engineering, HSE, quantity surveying and graduate roles across Lagos, Abuja, Port Harcourt, Kano and Ibadan. HMO, COREN sponsorship and site allowances."
      />
      <JsonLd
        schema={breadcrumbSchema([{ label: 'Home', to: '/' }, { label: 'Careers' }])}
      />
      <PageHero
        eyebrow="Careers"
        title="Build a career on work that stays standing"
        intro="We are hiring engineers, supervisors, surveyors and graduates across Lagos, Abuja, Port Harcourt, Kano and Ibadan."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=70"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Careers' }]}
      />

      <Section tone="white" spacing="md" containerSize="wide">
        <StatGrid stats={workforceStats} />
      </Section>

      <Section tone="sand" spacing="lg" containerSize="wide">
        <SectionHeading
          eyebrow="What it is like here"
          title="Four things we actually hold ourselves to"
          intro="Every construction company says it values safety and quality. These are the versions we can point at evidence for."
        />
        <div className="grid gap-px bg-line sm:grid-cols-2">
          {cultureValues.map((value) => (
            <div key={value.id} className="bg-surface p-8 md:p-10">
              <h3 className="font-display text-xl font-bold text-content-strong">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-content">{value.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="academy" tone="dark" spacing="lg" containerSize="wide">
        <SectionHeading
          eyebrow="Benefits"
          title="What we offer in return"
          invert
        />
        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="bg-surface-inverse p-7 md:p-8">
              <h3 className="font-display text-base font-bold text-white">{benefit.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-content-faint">{benefit.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="vacancies" tone="white" spacing="lg" containerSize="wide">
        <SectionHeading
          eyebrow="Open roles"
          title="Current vacancies"
          intro="If nothing here fits, send a speculative application — we keep good CVs on file and most of our hires come from that pool."
        />
        <JobsExplorer />
      </Section>

      <CtaBanner
        eyebrow="Questions about working here?"
        title="Talk to our people team."
        intro="Ask about a role, the graduate programme, or the apprenticeship intake. We answer every enquiry."
      />
    </>
  )
}
