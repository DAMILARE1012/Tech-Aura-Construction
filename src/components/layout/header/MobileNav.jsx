import { useState } from 'react'
import { ChevronDown, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cn } from '@/utils/cn'
import { CONTACT } from '@/constants/site'
import { primaryNav, utilityNav } from '@/data/navigation'
import { services } from '@/data/services'
import { closeMobileNav } from '@/features/ui/uiSlice'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/features/theme/components/ThemeToggle'

/** Flattens a mega menu into the link list the drawer accordion shows. */
const childLinksFor = (item) => {
  if (!item.mega) return []
  if (item.mega.dynamic === 'services') {
    return services.map((service) => ({
      label: service.title,
      to: `/services/${service.slug}`,
    }))
  }
  return item.mega.columns.flatMap((column) => column.links)
}

function NavGroup({ item, onNavigate }) {
  const [expanded, setExpanded] = useState(false)
  const children = childLinksFor(item)

  if (!children.length) {
    return (
      <li className="border-b border-ink-800">
        <Link
          to={item.to}
          onClick={onNavigate}
          className="block py-4 font-display text-lg font-bold text-white"
        >
          {item.label}
        </Link>
      </li>
    )
  }

  return (
    <li className="border-b border-ink-800">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between py-4 text-left font-display text-lg font-bold text-white"
      >
        {item.label}
        <ChevronDown
          className={cn('size-5 text-aura-500 transition-transform duration-300', expanded && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <ul className="animate-fade-in space-y-1 pb-4 pl-1">
          <li>
            <Link
              to={item.to}
              onClick={onNavigate}
              className="block py-2 text-sm font-semibold text-aura-400"
            >
              All {item.label.replace('Our ', '')}
            </Link>
          </li>
          {children.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                onClick={onNavigate}
                className="block py-2 text-sm text-ink-300 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

/** Full-screen navigation drawer for tablet and mobile. */
export function MobileNav() {
  const dispatch = useDispatch()
  const handleNavigate = () => dispatch(closeMobileNav())

  return (
    <div
      id="mobile-nav"
      className="animate-fade-in fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-ink-900 px-5 pb-12 sm:px-8 lg:hidden"
    >
      <nav aria-label="Mobile">
        <ul className="border-t border-ink-800">
          {primaryNav.map((item) => (
            <NavGroup key={item.id} item={item} onNavigate={handleNavigate} />
          ))}
          {utilityNav.map((item) => (
            <li key={item.id} className="border-b border-ink-800">
              <Link
                to={item.to}
                onClick={handleNavigate}
                className="block py-4 font-display text-lg font-bold text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Button to="/contact" onClick={handleNavigate} className="mt-8 w-full" size="lg">
        Start a project
      </Button>

      <div className="mt-8 flex items-center justify-between border-t border-ink-800 pt-6">
        <span className="font-display text-xs font-bold tracking-[0.12em] text-ink-400 uppercase">
          Appearance
        </span>
        <ThemeToggle invert />
      </div>

      <div className="mt-6 space-y-3 text-sm text-ink-400">
        <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-white">
          <Phone className="size-4 text-aura-500" aria-hidden="true" />
          {CONTACT.phone}
        </a>
        <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 hover:text-white">
          <Mail className="size-4 text-aura-500" aria-hidden="true" />
          {CONTACT.email}
        </a>
      </div>
    </div>
  )
}
