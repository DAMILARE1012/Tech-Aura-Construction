import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Field, TextArea, TextInput } from '@/components/ui/Field'
import { useSubmitApplicationMutation } from '../careersApi'

const emptyForm = { name: '', email: '', phone: '', linkedin: '', note: '' }

const validate = (values) => {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your full name.'
  if (!values.email.trim()) errors.email = 'We need an email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = 'That email address does not look right.'
  if (!values.phone.trim()) errors.phone = 'A phone number helps us reach you quickly.'
  else if (!/^[\d\s+()-]{7,}$/.test(values.phone)) errors.phone = 'Use digits, spaces and + only.'
  return errors
}

/** Application form shown on each vacancy page. */
export function ApplicationForm({ job }) {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitApplication, { isLoading, isSuccess, data, error }] = useSubmitApplicationMutation()

  const setField = (key) => (event) => {
    setValues((current) => ({ ...current, [key]: event.target.value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    try {
      await submitApplication({ ...values, jobId: job.id, jobTitle: job.title }).unwrap()
    } catch {
      // Server-side failure renders through `error` below.
    }
  }

  if (isSuccess) {
    return (
      <div className="border border-brand-border bg-brand-soft p-8 text-center">
        <CheckCircle2 className="mx-auto size-9 text-brand" strokeWidth={1.5} />
        <h3 className="mt-4 font-display text-xl font-bold text-content-strong">Application received</h3>
        <p className="mt-2 text-sm text-content">{data.message}</p>
        <p className="mt-3 font-display text-xs font-bold tracking-[0.12em] text-brand uppercase">
          Reference {data.reference}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field label="Full name" htmlFor="app-name" required error={errors.name}>
        <TextInput
          id="app-name"
          autoComplete="name"
          value={values.name}
          onChange={setField('name')}
          invalid={Boolean(errors.name)}
        />
      </Field>

      <Field label="Email" htmlFor="app-email" required error={errors.email}>
        <TextInput
          id="app-email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={setField('email')}
          invalid={Boolean(errors.email)}
        />
      </Field>

      <Field label="Phone" htmlFor="app-phone" required error={errors.phone}>
        <TextInput
          id="app-phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={setField('phone')}
          invalid={Boolean(errors.phone)}
          placeholder="+234 803 000 0000"
        />
      </Field>

      <Field label="LinkedIn or portfolio" htmlFor="app-linkedin">
        <TextInput
          id="app-linkedin"
          type="url"
          value={values.linkedin}
          onChange={setField('linkedin')}
          placeholder="https://linkedin.com/in/…"
        />
      </Field>

      <Field
        label="Why this role?"
        htmlFor="app-note"
        hint="A short note goes further than a long CV."
      >
        <TextArea id="app-note" rows={4} value={values.note} onChange={setField('note')} />
      </Field>

      {error && (
        <p className="text-sm font-medium text-danger-700" role="alert">
          {error.data?.message ?? 'We could not submit that. Please try again.'}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Submitting…' : 'Apply for this role'}
      </Button>

      <p className="text-xs text-content-faint">
        Prefer email? Send your CV to{' '}
        <a href="mailto:careers@tech-aura.ng" className="text-brand underline underline-offset-2">
          careers@tech-aura.ng
        </a>{' '}
        quoting the role title.
      </p>
    </form>
  )
}
