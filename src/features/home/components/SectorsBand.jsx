import { Container } from '@/components/ui/Container'
import { CREDENTIALS } from '@/constants/site'
import { sectorsServed } from '@/data/company'

/** Sectors served plus the compliance credentials strip. */
export function SectorsBand() {
  return (
    <section className="border-y border-line bg-surface-sunken py-14 md:py-16">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <p className="eyebrow mb-5 text-brand">Sectors we serve</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {sectorsServed.map((sector) => (
                <li
                  key={sector}
                  className="font-display text-base font-bold text-content-strong md:text-lg"
                >
                  {sector}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5 text-brand">Registered & certified</p>
            <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {CREDENTIALS.map((credential) => (
                <li key={credential.id} className="border-l-2 border-brand pl-4">
                  <span className="block font-display text-sm font-bold text-content-strong">
                    {credential.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-content-muted">{credential.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
