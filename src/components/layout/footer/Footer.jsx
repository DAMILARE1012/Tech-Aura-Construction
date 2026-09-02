import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/ui/SocialIcons'
import { NewsletterForm } from '@/features/contact/components/NewsletterForm'
import { COMPANY, CONTACT, SOCIAL_LINKS } from '@/constants/site'
import { footerNav, legalNav } from '@/data/navigation'
import { Logo } from '../header/Logo'

/** Keyed by the ids used in SOCIAL_LINKS. */
const socialIcons = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  x: XIcon,
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink-950 text-ink-400">
      <Container size="wide" className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <Logo invert />
            <p className="mt-6 max-w-sm text-sm leading-relaxed">{COMPANY.description}</p>

            <div className="mt-8">
              <h3 className="font-display text-sm font-bold text-white">Insights to your inbox</h3>
              <p className="mt-1.5 mb-4 text-xs">
                Engineering notes and project news from our teams across Nigeria.
              </p>
              <NewsletterForm />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((column) => (
              <nav key={column.id} aria-label={column.title}>
                <h3 className="font-display text-xs font-bold tracking-[0.14em] text-white uppercase">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm underline-offset-4 transition-colors hover:text-white hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-aura-500" aria-hidden="true" />
            <address className="text-sm not-italic">
              <span className="block font-semibold text-white">{CONTACT.headOffice.label}</span>
              {CONTACT.headOffice.street}
              <br />
              {CONTACT.headOffice.area}, {CONTACT.headOffice.city}
              <br />
              {CONTACT.headOffice.country}
            </address>
          </div>

          <div className="space-y-2.5 text-sm">
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 transition-colors hover:text-white"
            >
              <Phone className="size-4 shrink-0 text-aura-500" aria-hidden="true" />
              {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3 transition-colors hover:text-white"
            >
              <Mail className="size-4 shrink-0 text-aura-500" aria-hidden="true" />
              {CONTACT.email}
            </a>
            <p className="pl-7 text-xs text-ink-500">{CONTACT.hours}</p>
          </div>

          <div className="flex items-start gap-2 sm:col-span-2 lg:col-span-1 lg:justify-end">
            {SOCIAL_LINKS.map((social) => {
              const Icon = socialIcons[social.id]
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="rounded-full border border-white/15 p-2.5 transition-colors hover:border-aura-500 hover:bg-aura-600 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              )
            })}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container size="wide" className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs">
            © {year} {COMPANY.name} · {COMPANY.rcNumber} · Lagos, Nigeria
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-xs underline-offset-4 transition-colors hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  )
}
