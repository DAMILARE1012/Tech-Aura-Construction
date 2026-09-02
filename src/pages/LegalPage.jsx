import { Seo } from '@/components/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { COMPANY, CONTACT } from '@/constants/site'

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    intro:
      'How Tech-Aura collects, uses and protects personal data, in line with the Nigeria Data Protection Act 2023.',
    sections: [
      {
        heading: 'What we collect',
        body: 'When you contact us, apply for a role or subscribe to our insights, we collect the details you provide — typically your name, organisation, email address and phone number, along with anything you choose to tell us about your project or application.',
      },
      {
        heading: 'How we use it',
        body: 'We use your details to respond to your enquiry, to assess job applications, and to send the insights you asked for. We do not sell personal data, and we do not share it with third parties except where a project requires it and you have been told.',
      },
      {
        heading: 'How long we keep it',
        body: 'Enquiry records are kept for three years. Unsuccessful job applications are kept for twelve months so we can consider you for future roles, unless you ask us to delete them sooner.',
      },
      {
        heading: 'Your rights',
        body: `Under the Nigeria Data Protection Act you may request a copy of the personal data we hold about you, ask us to correct it, or ask us to delete it. Write to ${CONTACT.email} and we will respond within thirty days.`,
      },
      {
        heading: 'Cookies',
        body: 'This site uses only the storage necessary to make it work. We do not run advertising trackers or sell behavioural data.',
      },
    ],
  },
  terms: {
    title: 'Terms of Use',
    intro: 'The terms governing your use of the Tech-Aura website.',
    sections: [
      {
        heading: 'About this site',
        body: `This website is operated by ${COMPANY.name} (${COMPANY.rcNumber}), a company registered in Nigeria with its head office in Victoria Island, Lagos.`,
      },
      {
        heading: 'Information accuracy',
        body: 'Project figures, capabilities and statistics on this site are provided in good faith and are accurate at the time of publication. They do not constitute a contractual commitment. Any offer of services is made only through a signed contract.',
      },
      {
        heading: 'Intellectual property',
        body: 'The content, design and marks on this site belong to Tech-Aura unless otherwise stated. You may not reproduce them commercially without written permission.',
      },
      {
        heading: 'Third-party links',
        body: 'Where we link to external sites we do so for convenience. We are not responsible for their content or their handling of your data.',
      },
      {
        heading: 'Governing law',
        body: 'These terms are governed by the laws of the Federal Republic of Nigeria, and disputes fall under the jurisdiction of the Nigerian courts.',
      },
    ],
  },
}

/** Renders a static legal document. `document` selects which one. */
export default function LegalPage({ document: documentKey }) {
  const content = CONTENT[documentKey]

  return (
    <>
      <Seo title={content.title} description={content.intro} />
      <PageHero
        eyebrow="Legal"
        title={content.title}
        intro={content.intro}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: content.title }]}
      />

      <Section tone="white" spacing="lg">
        <div className="mx-auto max-w-2xl prose-body">
          {content.sections.map((section) => (
            <div key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </div>
          ))}

          <p className="mt-12 border-t border-line pt-6 text-sm text-content-faint">
            Last updated {new Date().getFullYear()}. Questions about this document? Email{' '}
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-brand underline underline-offset-2"
            >
              {CONTACT.email}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  )
}
