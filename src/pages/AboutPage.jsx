import { Seo, JsonLd, breadcrumbSchema } from '@/components/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { StatGrid } from '@/components/ui/StatGrid'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { CtaBanner } from '@/features/home/components/CtaBanner'
import { companyStats, milestones } from '@/data/company'
import { CREDENTIALS, CONTACT } from '@/constants/site'

export default function AboutPage() {

  return (
    <>
      <Seo
        title="About Us"
        description="Founded in Lagos in 2009, Tech-Aura is a Nigerian construction and engineering company with 1,400 staff across four offices, delivering in nine states."
      />
      <JsonLd
        schema={breadcrumbSchema([{ label: 'Home', to: '/' }, { label: 'About Us' }])}
      />
      <PageHero
        eyebrow="About us"
        title="A Nigerian firm, building for Nigeria"
        intro="Founded in Lagos in 2009 with nine staff and a drainage contract. Today, 1,400 people across four offices and nine states."
        image="https://images.unsplash.com/photo-1590986815253-9d1f8b4b8b0c?auto=format&fit=crop&w=1600&q=70"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
      />

      <Section tone="white" spacing="lg" containerSize="wide">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <p className="eyebrow mb-5 text-brand">Who we are</p>
            <h2 className="text-display text-3xl sm:text-4xl">
              We took on the jobs other contractors would not.
            </h2>
          </div>

          <div className="prose-body text-base">
            <p>
              Tech-Aura started in a single Ikeja office in 2009, doing drainage and small civil
              packages for Lagos State. The work nobody wanted — tight sites, difficult ground,
              programmes that had already slipped before we arrived.
            </p>
            <p>
              That is still, more or less, what we are known for. Sixteen years later the projects
              are larger — a 14-storey tower on reclaimed Lekki land, a flow station upgraded
              without shutting production down, 64km of water mains under Kano — but the reason
              clients call has not changed. We take the difficult brief and we finish it.
            </p>
            <p>
              We are Nigerian owned, Nigerian staffed and Nigerian supplied. Over ninety per cent of
              our workforce is Nigerian, our engineers are COREN-registered, and our apprenticeship
              programme has trained 210 young people in the trades since 2019. The capability we
              build stays in the country.
            </p>
            <ArrowLink to="/approach" label="How we work" className="mt-8" />
          </div>
        </div>
      </Section>

      <Section tone="dark" spacing="md" containerSize="wide">
        <StatGrid stats={companyStats} invert />
      </Section>

      <Section tone="sand" spacing="lg" containerSize="wide">
        <SectionHeading
          eyebrow="Our story"
          title="Sixteen years, one direction"
          intro="From a nine-person civil contractor to a multi-discipline engineering business operating in nine states."
        />

        <ol className="relative border-l-2 border-line pl-8 md:pl-12">
          {milestones.map((milestone) => (
            <li key={milestone.year} className="relative pb-12 last:pb-0">
              <span
                className="absolute top-1.5 -left-[41px] flex size-4 items-center justify-center rounded-full border-4 border-surface-sunken bg-aura-500 md:-left-[57px]"
                aria-hidden="true"
              />
              <p className="text-display text-2xl text-brand">{milestone.year}</p>
              <h3 className="mt-1 font-display text-xl font-bold text-content-strong">
                {milestone.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-content">
                {milestone.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="credentials" tone="white" spacing="lg" containerSize="wide">
        <SectionHeading
          eyebrow="Compliance"
          title="Registered, certified, auditable"
          intro="Every certification below is current and available for inspection during prequalification."
        />

        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {CREDENTIALS.map((credential) => (
            <div key={credential.id} className="bg-surface-raised p-7">
              <h3 className="font-display text-lg font-bold text-content-strong">{credential.label}</h3>
              <p className="mt-2 text-sm text-content-muted">{credential.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border border-line bg-surface p-7">
          <h3 className="font-display text-base font-bold text-content-strong">
            Prequalification documents
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-content">
            Company profile, CAC certificate, tax clearance, COREN practice licence, ISO
            certificates and audited accounts are supplied on request. Email{' '}
            <a
              href={`mailto:${CONTACT.tendersEmail}`}
              className="font-semibold text-brand underline underline-offset-2"
            >
              {CONTACT.tendersEmail}
            </a>{' '}
            with your prequalification reference.
          </p>
        </div>
      </Section>

      <CtaBanner />
    </>
  )
}
