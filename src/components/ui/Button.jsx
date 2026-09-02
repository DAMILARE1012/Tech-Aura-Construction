import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

const variants = {
  primary: 'bg-brand-emphasis text-white hover:bg-brand-hover',
  dark: 'bg-surface-inverse text-white hover:opacity-90',
  // `light` and `outlineLight` always sit on a dark surface (CTA banner,
  // 404 page), so they stay literal white in both themes.
  light: 'bg-white text-ink-900 hover:bg-ink-100 active:bg-ink-200',
  outlineLight: 'border border-white/40 text-white hover:border-white hover:bg-white hover:text-ink-900',
  outline:
    'border border-line-strong text-content-strong hover:border-brand hover:bg-brand-emphasis hover:text-white',
  ghost: 'text-content-strong hover:bg-surface-sunken',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm',
}

const base =
  'inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-[0.1em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50'

/**
 * Renders as a router <Link> when given `to`, an <a> when given `href`,
 * and a <button> otherwise — so callers never have to pick the element.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  className,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
