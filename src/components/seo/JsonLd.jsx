/**
 * Emits JSON-LD structured data.
 *
 * Every graph node is wrapped in a single @graph so the nodes can reference
 * each other by @id (a page's breadcrumb points at the same Organization node
 * the site-wide block defines) instead of repeating the organisation on every
 * page.
 *
 * Google reads JSON-LD from anywhere in the document, so rendering this inline
 * in the body is valid — no head hoisting required.
 */
export function JsonLd({ schema }) {
  const nodes = Array.isArray(schema) ? schema : [schema]

  const payload = {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  }

  return (
    <script
      type="application/ld+json"
      // Content is built from our own data, never user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, '\u003c'),
      }}
    />
  )
}
