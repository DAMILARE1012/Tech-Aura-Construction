import { cn } from '@/utils/cn'
import { SIZES, buildSrcSet, resizedSrc } from '@/utils/images'

const DEFAULT_WIDTHS = [400, 600, 900, 1200]

/**
 * Responsive image wrapper.
 *
 * Emits a srcset so the browser downloads a file matched to the rendered box
 * rather than the authored width, and always sets `decoding="async"` plus
 * explicit dimensions to keep layout stable while images arrive.
 *
 * `priority` marks the one image that is likely the LCP element on a page —
 * it loads eagerly at high fetch priority. Everything else is lazy.
 */
export function SmartImage({
  src,
  alt = '',
  sizes = SIZES.card,
  widths = DEFAULT_WIDTHS,
  priority = false,
  width,
  height,
  className,
  ...props
}) {
  const largest = widths[widths.length - 1]

  return (
    <img
      src={resizedSrc(src, largest)}
      srcSet={buildSrcSet(src, widths)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={cn(className)}
      {...props}
    />
  )
}
