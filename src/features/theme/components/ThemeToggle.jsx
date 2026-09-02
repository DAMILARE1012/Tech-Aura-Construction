import { Moon, Sun } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { cn } from '@/utils/cn'
import { selectIsDark, toggleTheme } from '../themeSlice'

/**
 * Light/dark switch. `invert` styles it for the transparent header over
 * the homepage hero, where the surrounding type is white regardless of theme.
 */
export function ThemeToggle({ invert = false, className }) {
  const dispatch = useDispatch()
  const isDark = useSelector(selectIsDark)

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={cn(
        'relative flex size-10 items-center justify-center rounded-full transition-colors',
        invert
          ? 'text-white hover:bg-white/10'
          : 'text-content hover:bg-surface-sunken hover:text-brand',
        className,
      )}
    >
      {/* Both icons render; they cross-fade so the button never reflows. */}
      <Sun
        className={cn(
          'absolute size-5 transition-all duration-300',
          isDark ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100',
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          'absolute size-5 transition-all duration-300',
          isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0',
        )}
        aria-hidden="true"
      />
    </button>
  )
}
