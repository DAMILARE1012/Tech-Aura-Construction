import { cn } from '@/utils/cn'
import { Container } from './Container'

const tones = {
  light: 'bg-surface text-content',
  white: 'bg-surface-raised text-content',
  sand: 'bg-surface-sunken text-content',
  dark: 'bg-surface-inverse text-ink-200',
  ink: 'bg-surface-inverse-raised text-ink-200',
}

const spacings = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-32',
}

/** Standard page band: sets the surface tone, vertical rhythm and gutter. */
export function Section({
  id,
  tone = 'light',
  spacing = 'md',
  containerSize = 'default',
  bare = false,
  className,
  children,
}) {
  return (
    <section id={id} className={cn(tones[tone], spacings[spacing], className)}>
      {bare ? children : <Container size={containerSize}>{children}</Container>}
    </section>
  )
}
