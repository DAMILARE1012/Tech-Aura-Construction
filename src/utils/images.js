const IMAGE_CDN = 'images.unsplash.com'

/** Only CDN-hosted images can be resized on the fly. */
export const isResizable = (src) => typeof src === 'string' && src.includes(IMAGE_CDN)

/**
 * Rewrites the CDN width parameter to produce a srcset.
 *
 * Without this the browser downloads the authored width — a 1200px file into
 * a 380px card — for every image on the page. With it the browser picks the
 * smallest candidate that satisfies `sizes`, which is usually a quarter of
 * the bytes on a phone.
 *
 * Any `h` parameter is scaled proportionally so fixed-ratio crops (the team
 * portraits) keep their framing.
 */
export function buildSrcSet(src, widths) {
  if (!isResizable(src)) return undefined

  try {
    const base = new URL(src)
    const baseWidth = Number(base.searchParams.get('w'))
    const baseHeight = Number(base.searchParams.get('h'))

    return widths
      .map((width) => {
        const url = new URL(base)
        url.searchParams.set('w', String(width))
        if (baseHeight && baseWidth) {
          url.searchParams.set('h', String(Math.round((baseHeight * width) / baseWidth)))
        }
        return `${url.toString()} ${width}w`
      })
      .join(', ')
  } catch {
    return undefined
  }
}

/** Same rewrite, for a single fallback `src`. */
export function resizedSrc(src, width) {
  if (!isResizable(src)) return src

  try {
    const url = new URL(src)
    const baseWidth = Number(url.searchParams.get('w'))
    const baseHeight = Number(url.searchParams.get('h'))
    url.searchParams.set('w', String(width))
    if (baseHeight && baseWidth) {
      url.searchParams.set('h', String(Math.round((baseHeight * width) / baseWidth)))
    }
    return url.toString()
  } catch {
    return src
  }
}

/** Reusable `sizes` values matching the layouts we actually use. */
export const SIZES = {
  /** Three-up grid on desktop, two-up on tablet, full width on mobile. */
  card: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  /** The wide lead tile on the homepage. */
  feature: '(min-width: 1024px) 66vw, 100vw',
  /** Full-bleed page headers. */
  full: '100vw',
}
