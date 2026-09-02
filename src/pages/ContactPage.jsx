import { Seo, JsonLd, breadcrumbSchema } from '@/components/seo'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ContactForm } from '@/features/contact/components/ContactForm'
import { CONTACT } from '@/constants/site'

const telHref = (value) => `tel:${value.replace(/\s/g, '')}`

export default function ContactPage() {

  return (
    <>
      <Seo
        title="Contact Us — Lagos, Abuja, Port Harcourt & Kano"
        description="Talk to Tech-Aura about your project. Head office at 14B Adeola Odeku Street, Victoria Island, Lagos. Call +234 1 291 4470 or email info@tech-aura.ng."
      />
      <JsonLd
        schema={breadcrumbSchema([{ label: 'Home', to: '/' }, { label: 'Contact Us' }])}
      />
      <PageHero
        eyebrow="Contact us"
        title="Let us talk about what you need built"
        intro="Head office in Victoria Island, with regional teams in Abuja, Port Harcourt and Kano."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]}
      />

      <Section tone="white" spacing="lg" containerSize="wide">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <SectionHeading
              eyebrow="Send a message"
              title="Tell us about your project"
              intro="The more detail you give us, the more useful our first reply will be."
            />
            <ContactForm />
          </div>

          <aside className="h-fit space-y-8 border border-line bg-surface p-8">
            <div>
              <h2 className="font-display text-lg font-bold text-content-strong">Head office</h2>
              <address className="mt-4 flex gap-3 text-sm text-content not-italic">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                <span>
                  {CONTACT.headOffice.street}
                  <br />
                  {CONTACT.headOffice.area}
                  <br />
                  {CONTACT.headOffice.city}, {CONTACT.headOffice.country}
                </span>
              </address>
            </div>

            <hr className="border-line" />

            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={telHref(CONTACT.phone)}
                  className="flex items-center gap-3 text-content transition-colors hover:text-brand"
                >
                  <Phone className="size-4 shrink-0 text-brand" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={telHref(CONTACT.whatsapp)}
                  className="flex items-center gap-3 text-content transition-colors hover:text-brand"
                >
                  <MessageCircle className="size-4 shrink-0 text-brand" aria-hidden="true" />
                  {CONTACT.whatsapp} (WhatsApp)
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-content transition-colors hover:text-brand"
                >
                  <Mail className="size-4 shrink-0 text-brand" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-content-muted">
                <Clock className="size-4 shrink-0 text-brand" aria-hidden="true" />
                {CONTACT.hours}
              </li>
            </ul>

            <hr className="border-line" />

            <div>
              <h3 className="font-display text-sm font-bold tracking-[0.1em] text-content-strong uppercase">
                Direct lines
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-content">
                <li>
                  Tenders —{' '}
                  <a
                    href={`mailto:${CONTACT.tendersEmail}`}
                    className="text-brand underline underline-offset-2"
                  >
                    {CONTACT.tendersEmail}
                  </a>
                </li>
                <li>
                  Careers —{' '}
                  <a
                    href={`mailto:${CONTACT.careersEmail}`}
                    className="text-brand underline underline-offset-2"
                  >
                    {CONTACT.careersEmail}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section id="offices" tone="sand" spacing="lg" containerSize="wide" className="scroll-mt-20">
        <SectionHeading
          eyebrow="Our offices"
          title="Four offices, nine states of active work"
          intro="Each regional office is staffed with its own engineering and delivery team rather than run remotely from Lagos."
        />

        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT.offices.map((office) => (
            <div key={office.id} className="bg-surface p-7">
              <p className="eyebrow text-brand">{office.label}</p>
              <h3 className="mt-2 font-display text-xl font-bold text-content-strong">{office.city}</h3>
              <address className="mt-3 text-sm leading-relaxed text-content not-italic">
                {office.street}
                <br />
                {office.state}
              </address>
              <div className="mt-4 space-y-1.5 text-sm">
                <a
                  href={telHref(office.phone)}
                  className="block text-content transition-colors hover:text-brand"
                >
                  {office.phone}
                </a>
                <a
                  href={`mailto:${office.email}`}
                  className="block text-brand underline underline-offset-2"
                >
                  {office.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
