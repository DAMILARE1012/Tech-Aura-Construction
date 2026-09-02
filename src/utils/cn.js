import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Conditional className helper used across every component.
 *
 * twMerge resolves Tailwind conflicts by last-wins, so a `className` prop
 * passed into a component reliably overrides that component's own defaults
 * (e.g. `className="mb-0"` beating a built-in `mb-10 md:mb-14`).
 */
export const cn = (...inputs) => twMerge(clsx(inputs))
