import { Outlet, useLocation } from 'react-router-dom'
import { useApplyTheme } from '@/features/theme/useApplyTheme'
import { Footer } from './footer/Footer'
import { Header } from './header/Header'
import { ScrollToTop } from './ScrollToTop'

/** App shell: header, routed page, footer. */
export function RootLayout() {
  const { pathname } = useLocation()

  useApplyTheme()

  // Only the homepage has a full-bleed video behind the header.
  const hasTransparentHeader = pathname === '/'

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header transparent={hasTransparentHeader} />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
