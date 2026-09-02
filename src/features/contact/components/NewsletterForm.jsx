import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { useSubscribeToInsightsMutation } from '../contactApi'

/** Compact email capture used in the footer. */
export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [subscribe, { isLoading, isSuccess, error }] = useSubscribeToInsightsMutation()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await subscribe({ email }).unwrap()
      setEmail('')
    } catch {
      // Error surfaces through the `error` object below.
    }
  }

  if (isSuccess) {
    return (
      <p className="flex items-center gap-2 text-sm text-aura-300">
        <Check className="size-4 shrink-0" aria-hidden="true" />
        You are subscribed. Look out for our next briefing.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="your@email.com"
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition-colors placeholder:text-ink-500 focus:border-aura-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          aria-label="Subscribe"
          className="flex shrink-0 items-center justify-center rounded-lg bg-aura-600 px-4 text-white transition-colors hover:bg-aura-700 disabled:opacity-50"
        >
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p className="mt-2 text-xs text-danger-400" role="alert">
          {error.data?.message ?? 'Subscription failed. Please try again.'}
        </p>
      )}
    </form>
  )
}
