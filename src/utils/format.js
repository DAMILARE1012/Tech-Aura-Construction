/** Formats an ISO date as e.g. "18 August 2026". */
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

/** Short form, e.g. "18 Aug 2026". */
export const formatDateShort = (iso) =>
  new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

/** Naira amounts with thousands separators. */
export const formatNaira = (amount) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount)

/** "Posted 3 days ago" style relative label, falling back to a date. */
export const formatRelative = (iso) => {
  const days = Math.floor((Date.now() - new Date(iso)) / 86_400_000)
  if (days < 1) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days} days ago`
  if (days < 60) return 'Last month'
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  return formatDateShort(iso)
}
