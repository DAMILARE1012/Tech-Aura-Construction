import { cn } from '@/utils/cn'

const tones = {
  default: 'bg-surface-sunken text-content',
  aura: 'bg-brand-soft text-brand',
  solar: 'bg-solar-50 text-solar-800',
  dark: 'bg-surface-inverse text-white',
  outline: 'border border-line text-content-muted',
  // Used over photography, so it stays glassy white in both themes.
  onDark: 'bg-white/10 text-white backdrop-blur-sm',
}

export function Badge({ tone = 'default', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.12em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
