import { Container } from '@/components/ui/Container'
import { companyStats } from '@/data/company'

/** Dark numeric band that sits directly beneath the hero. */
export function StatsBand() {
  return (
    <section className="bg-surface-inverse py-12 md:py-16">
      <Container size="wide">
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {companyStats.map((stat) => (
            <div key={stat.id} className="border-l-2 border-brand pl-5">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="text-display block text-4xl text-white lg:text-5xl">
                  {stat.value}
                  <span className="text-aura-500">{stat.suffix}</span>
                </span>
                <span className="mt-2 block text-sm text-content-faint">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
