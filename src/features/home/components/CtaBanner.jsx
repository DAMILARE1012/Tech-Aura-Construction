import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { CONTACT } from '@/constants/site'

/** Closing call to action shared by the homepage and several inner pages. */
export function CtaBanner({
  eyebrow = 'Ready to build?',
  title = 'Tell us what you need built.',
  intro = 'Send us the scope and we will come back with the team, the method and an indicative programme. Most enquiries get a response within one business day.',
}) {
  return (
    <section className="relative overflow-hidden bg-brand-emphasis py-20 md:py-28">
      <div
        className="absolute -top-24 -right-24 size-96 rounded-full border-[40px] border-white/10"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-16 size-80 rounded-full border-[32px] border-white/10"
        aria-hidden="true"
      />

      <Container className="relative text-center">
        <p className="eyebrow mb-5 text-white/70">{eyebrow}</p>
        <h2 className="text-display mx-auto max-w-3xl text-4xl text-white sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          {intro}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button to="/contact" variant="light" size="lg">
            Start a conversation
          </Button>
          <Button href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} variant="outlineLight" size="lg">
            {CONTACT.phone}
          </Button>
        </div>
      </Container>
    </section>
  )
}
