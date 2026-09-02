import { Suspense } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { routes } from '@/app/routes'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorBoundary } from '@/components/errors'

const router = createBrowserRouter(routes)

/** Shown while a lazily loaded page chunk is in flight. */
function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <Spinner className="size-10" />
    </div>
  )
}

export default function App() {
  return (
    // Outermost net: the router has its own errorElement per route, but this
    // catches anything thrown above or by the router itself, which would
    // otherwise unmount the entire app to a blank page.
    <ErrorBoundary source="App">
      <Provider store={store}>
        <Suspense fallback={<RouteFallback />}>
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </ErrorBoundary>
  )
}
