import { Suspense } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { routes } from '@/app/routes'
import { Spinner } from '@/components/ui/Spinner'

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
    <Provider store={store}>
      <Suspense fallback={<RouteFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  )
}
