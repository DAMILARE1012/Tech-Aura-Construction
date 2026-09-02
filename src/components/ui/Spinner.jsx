import { cn } from '@/utils/cn'

export function Spinner({ className }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block size-6 animate-spin rounded-full border-2 border-line border-t-aura-600',
        className,
      )}
    />
  )
}
