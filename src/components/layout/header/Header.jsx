import { useCallback, useEffect, useRef } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@/utils/cn'
import { primaryNav, utilityNav } from '@/data/navigation'
import {
  closeMegaMenu,
  openMegaMenu,
  selectMobileNavOpen,
  selectOpenMegaMenu,
  selectSearchOpen,
  toggleMobileNav,
  toggleSearch,
} from '@/features/ui/uiSlice'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { useScrolled } from '@/hooks/useScrolled'
import { ThemeToggle } from '@/features/theme/components/ThemeToggle'
import { Logo } from './Logo'
import { MegaMenu } from './MegaMenu'
import { MobileNav } from './MobileNav'
import { SearchOverlay } from './SearchOverlay'

const CLOSE_DELAY_MS = 140

/**
 * Site header. Over the homepage video it starts transparent with white type
 * and turns solid on scroll; on every other page it is solid from the start.
 */
export function Header({ transparent = false }) {
  const dispatch = useDispatch()
  const activeMega = useSelector(selectOpenMegaMenu)
  const mobileNavOpen = useSelector(selectMobileNavOpen)
  const searchOpen = useSelector(selectSearchOpen)
  const scrolled = useScrolled(80)
  const closeTimer = useRef(null)

  // Transparent only while over the hero, with nothing open on top of it.
  const isTransparent = transparent && !scrolled && !activeMega && !mobileNavOpen
  const invert = isTransparent

  useLockBodyScroll(mobileNavOpen || searchOpen)
  useEscapeKey(() => dispatch(closeMegaMenu()), Boolean(activeMega))

  // A short close delay keeps the panel open while the pointer crosses the gap
  // between the trigger and the panel itself.
  const scheduleClose = useCallback(() => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => dispatch(closeMegaMenu()), CLOSE_DELAY_MS)
  }, [dispatch])

  const cancelClose = useCallback(() => clearTimeout(closeTimer.current), [])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  const openPanel = (item) => {
    cancelClose()
    dispatch(openMegaMenu(item.mega ? item.id : null))
  }

  const navLinkClass = ({ isActive }) =>
    cn(
      'relative flex h-16 items-center font-display text-[13px] font-bold tracking-[0.08em] uppercase transition-colors',
      invert ? 'text-white/90 hover:text-white' : 'text-content hover:text-brand',
      isActive && (invert ? 'text-white' : 'text-brand'),
    )

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-brand-emphasis focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>

      <header
        onMouseLeave={scheduleClose}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
          isTransparent ? 'bg-transparent' : 'border-b border-line-soft bg-surface-raised shadow-sm',
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1560px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Logo invert={invert} />

          <nav aria-label="Primary" className="hidden h-16 items-center gap-8 lg:flex">
            {primaryNav.map((item) => (
              <div key={item.id} className="h-16" onMouseEnter={() => openPanel(item)}>
                <NavLink
                  to={item.to}
                  className={navLinkClass}
                  aria-expanded={item.mega ? activeMega === item.id : undefined}
                  aria-controls={item.mega ? `megamenu-${item.id}` : undefined}
                  onFocus={() => openPanel(item)}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-aura-500 transition-transform duration-300',
                      activeMega === item.id && 'scale-x-100',
                    )}
                    aria-hidden="true"
                  />
                </NavLink>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle invert={invert} />

            <button
              type="button"
              onClick={() => dispatch(toggleSearch())}
              aria-label="Search"
              className={cn(
                'rounded-full p-2.5 transition-colors',
                invert ? 'text-white hover:bg-white/10' : 'text-content hover:bg-surface-sunken',
              )}
            >
              <Search className="size-5" />
            </button>

            {utilityNav.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                onMouseEnter={() => dispatch(closeMegaMenu())}
                className={cn(
                  'ml-1 hidden bg-brand-emphasis px-5 py-2.5 font-display text-[13px] font-bold tracking-[0.08em] text-white uppercase transition-colors hover:bg-brand-hover lg:inline-flex',
                )}
              >
                {item.label}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={() => dispatch(toggleMobileNav())}
              aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav"
              className={cn(
                'rounded-full p-2.5 transition-colors lg:hidden',
                invert ? 'text-white hover:bg-white/10' : 'text-content hover:bg-surface-sunken',
              )}
            >
              {mobileNavOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {primaryNav
          .filter((item) => item.mega && activeMega === item.id)
          .map((item) => (
            <MegaMenu
              key={item.id}
              item={item}
              onNavigate={() => dispatch(closeMegaMenu())}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            />
          ))}
      </header>

      {mobileNavOpen && <MobileNav />}
      {searchOpen && <SearchOverlay />}
    </>
  )
}
