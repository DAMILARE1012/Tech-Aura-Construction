import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { COMPANY } from '@/constants/site'

/**
 * Wordmark with the arc motif. `invert` switches it to white for use over the
 * transparent header on the video hero.
 */
export function Logo({ invert = false, className }) {
  return (
    <Link
      to="/"
      aria-label={`${COMPANY.shortName} — home`}
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <span className="relative flex size-9 items-center justify-center">
        <svg viewBox="0 0 40 40" className="size-9" aria-hidden="true">
          <circle
            cx="20"
            cy="20"
            r="17"
            fill="none"
            stroke="var(--color-aura-500)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="80 27"
            transform="rotate(-45 20 20)"
            className="origin-center transition-transform duration-500 group-hover:rotate-[135deg]"
          />
          <path
            d="M12 25 L20 11 L28 25"
            fill="none"
            stroke={invert ? '#ffffff' : 'var(--color-content-strong)'}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-lg font-extrabold tracking-[-0.02em]',
            invert ? 'text-white' : 'text-content-strong',
          )}
        >
          TECH-AURA
        </span>
        <span
          className={cn(
            'mt-0.5 font-display text-[9px] font-semibold tracking-[0.22em]',
            invert ? 'text-white/60' : 'text-content-faint',
          )}
        >
          CONSTRUCTION &amp; ENGINEERING
        </span>
      </span>
    </Link>
  )
}
