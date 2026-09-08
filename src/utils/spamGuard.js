/**
 * Lightweight client-side spam deterrents for public forms.
 *
 * Two signals, both invisible to real users:
 *
 *  1. A honeypot field, hidden from sight and from screen readers and removed
 *     from tab order. Humans never fill it; naive bots fill every input.
 *  2. A minimum time-on-form. Bots submit within milliseconds of the form
 *     mounting; a person cannot realistically complete these forms that fast.
 *
 * IMPORTANT: this is a deterrent, not a control. It runs in the browser and
 * is trivially bypassed by anyone who looks. The server that eventually
 * receives these submissions must do its own validation and rate limiting —
 * see the note in README under "Before wiring a real endpoint".
 */

/** Field name is deliberately plausible so bots are tempted to fill it. */
export const HONEYPOT_FIELD = 'company_website'

/** Anything submitted faster than this is not a person filling in a form. */
export const MIN_SUBMIT_MS = 2500

/** Styles that hide the field visually without display:none, which some bots skip. */
export const honeypotStyle = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
}

/**
 * Returns true when a submission looks automated.
 * Callers should silently pretend success rather than showing an error —
 * telling a bot why it failed only helps it retry.
 */
export const looksAutomated = ({ honeypot, startedAt }) => {
  if (honeypot) return true
  if (startedAt && Date.now() - startedAt < MIN_SUBMIT_MS) return true
  return false
}
