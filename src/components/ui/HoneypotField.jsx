import { HONEYPOT_FIELD, honeypotStyle } from '@/utils/spamGuard'

/**
 * Invisible decoy input. Hidden from sight, from screen readers and from tab
 * order, so no real user ever sees or reaches it — but naive bots fill every
 * field they find, which is exactly the signal we want.
 */
export function HoneypotField({ value, onChange }) {
  return (
    <div style={honeypotStyle} aria-hidden="true">
      <label htmlFor={HONEYPOT_FIELD}>Company website (leave blank)</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
