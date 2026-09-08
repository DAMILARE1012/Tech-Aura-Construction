import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { COMPANY } from '@/constants/site'

// Served straight from public/, so these are URLs rather than bundled imports.
const MARK = '/media/logo-mark.png'
const MARK_LIGHT = '/media/logo-mark-light.png'

/**
 * Brand lockup: the real logo mark paired with the wordmark as live text.
 *
 * The supplied artwork is a stacked lockup (mark over wordmark over tagline)
 * on solid white. At header height the whole stack would be illegible and the
 * white plate would show against dark surfaces, so we use the cropped mark
 * only and set the wordmark in Archivo, which matches the logo's own
 * geometric letterforms closely.
 *
 * `invert` swaps to the knockout mark (navy ink turned white, gold kept) for
 * the transparent header over the hero and for the footer.
 */
export function Logo({ invert = false, className }) {
  return (
    <Link
      to="/"
      aria-label={`${COMPANY.shortName} — home`}
      className={cn('group inline-flex items-center gap-3', className)}
    >
      <img
        src={invert ? MARK_LIGHT : MARK}
        alt=""
        aria-hidden="true"
        width={41}
        height={44}
        className="h-11 w-auto shrink-0 transition-transform duration-500 group-hover:scale-105"
      />

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-lg font-extrabold tracking-[-0.01em]',
            invert ? 'text-white' : 'text-content-strong',
          )}
        >
          TECH<span className={invert ? 'text-solar-400' : 'text-accent'}>AURA</span>
        </span>
        <span
          className={cn(
            'mt-1 font-display text-[8px] font-semibold tracking-[0.2em]',
            invert ? 'text-white/60' : 'text-content-faint',
          )}
        >
          CONSTRUCTION &amp; ENGINEERING
        </span>
      </span>
    </Link>
  )
}
