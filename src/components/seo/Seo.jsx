import { useLocation } from 'react-router-dom'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_LOCALE,
  SITE_NAME,
  absoluteUrl,
  formatTitle,
  truncateDescription,
} from '@/constants/seo'

/**
 * Per-page document metadata.
 *
 * React 19 hoists <title>, <meta> and <link> into <head> from anywhere in the
 * tree, so no head-manager library is needed. Render one <Seo> per page,
 * above the fold of that page's JSX.
 *
 * `noIndex` is for pages that should never appear in search results — the 404
 * and any thin or duplicate route.
 */
export function Seo({
  title,
  description,
  image,
  type = 'website',
  path,
  noIndex = false,
  publishedTime,
  modifiedTime,
  author,
  children,
}) {
  const location = useLocation()
  const url = absoluteUrl(path ?? location.pathname)
  const resolvedTitle = formatTitle(title)
  const resolvedDescription = truncateDescription(description ?? DEFAULT_DESCRIPTION)
  const resolvedImage = image ?? DEFAULT_OG_IMAGE

  return (
    <>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <link rel="canonical" href={url} />

      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Open Graph — Facebook, LinkedIn, WhatsApp, Slack */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={SITE_LOCALE} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={resolvedTitle} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />

      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && <meta property="article:author" content={author} />}

      {children}
    </>
  )
}
