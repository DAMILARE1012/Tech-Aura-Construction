import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function NotFoundPage() {
  usePageTitle('Page not found')

  return (
    <section className="bg-ink-900 py-32 md:py-44">
      <Container className="text-center">
        <p className="text-display text-7xl text-aura-500 md:text-9xl">404</p>
        <h1 className="text-display mt-6 text-3xl text-white md:text-5xl">
          This page is not on our plans
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base text-ink-400">
          The page you are looking for has moved or never existed. Try the projects index or get in
          touch and we will point you the right way.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button to="/" size="lg">
            Back to home
          </Button>
          <Button to="/projects" variant="outlineLight" size="lg">
            View projects
          </Button>
        </div>
      </Container>
    </section>
  )
}
