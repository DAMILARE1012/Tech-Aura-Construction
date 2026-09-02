import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Field, Select, TextArea, TextInput } from '@/components/ui/Field'
import { services } from '@/data/services'
import { useSubmitEnquiryMutation } from '../contactApi'

const ENQUIRY_TYPES = [
  { value: 'project', label: 'New project enquiry' },
  { value: 'tender', label: 'Tender or prequalification' },
  { value: 'maintenance', label: 'Maintenance or facility management' },
  { value: 'careers', label: 'Careers question' },
  { value: 'general', label: 'General enquiry' },
]

const emptyForm = {
  name: '',
  company: '',
  email: '',
  phone: '',
  topic: 'project',
  service: '',
  message: '',
}

/** Validates locally so the visitor gets feedback before a round trip. */
const validate = (values) => {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please tell us your name.'
  if (!values.email.trim()) errors.email = 'We need an email address to reply to.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = 'That email address does not look right.'
  if (values.phone && !/^[\d\s+()-]{7,}$/.test(values.phone))
    errors.phone = 'Use digits, spaces and + only.'
  if (!values.message.trim()) errors.message = 'Tell us a little about what you need.'
  else if (values.message.trim().length < 20)
    errors.message = 'A sentence or two more would help us route this properly.'
  return errors
}

export function ContactForm() {
  const [searchParams] = useSearchParams()
  const [values, setValues] = useState({
    ...emptyForm,
    topic: searchParams.get('topic') ?? 'project',
  })
  const [errors, setErrors] = useState({})
  const [submitEnquiry, { isLoading, isSuccess, data, error, reset }] = useSubmitEnquiryMutation()

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
      await submitEnquiry(values).unwrap()
    } catch {
      // Server-side failure renders through `error` below.
    }
  }

  if (isSuccess) {
    return (
      <div className="border border-brand-border bg-brand-soft p-8 text-center md:p-12">
        <CheckCircle2 className="mx-auto size-10 text-brand" strokeWidth={1.5} />
        <h3 className="mt-5 font-display text-2xl font-bold text-content-strong">Message received</h3>
        <p className="mt-3 text-sm text-content">{data.message}</p>
        <p className="mt-4 font-display text-xs font-bold tracking-[0.12em] text-brand uppercase">
          Reference {data.reference}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-8"
          onClick={() => {
            reset()
            setValues(emptyForm)
          }}
        >
          Send another enquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required error={errors.name}>
          <TextInput
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={setField('name')}
            invalid={Boolean(errors.name)}
            placeholder="Adaeze Nwosu"
          />
        </Field>

        <Field label="Company or organisation" htmlFor="company">
          <TextInput
            id="company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={setField('company')}
            placeholder="Optional"
          />
        </Field>

        <Field label="Email" htmlFor="email" required error={errors.email}>
          <TextInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={setField('email')}
            invalid={Boolean(errors.email)}
            placeholder="you@company.com"
          />
        </Field>

        <Field label="Phone" htmlFor="phone" error={errors.phone} hint="Include the country code">
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={setField('phone')}
            invalid={Boolean(errors.phone)}
            placeholder="+234 803 000 0000"
          />
        </Field>

        <Field label="What is this about?" htmlFor="topic">
          <Select id="topic" name="topic" value={values.topic} onChange={setField('topic')}>
            {ENQUIRY_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Service line" htmlFor="service" hint="If you already know">
          <Select id="service" name="service" value={values.service} onChange={setField('service')}>
            <option value="">Not sure yet</option>
            {services.map((service) => (
              <option key={service.id} value={service.slug}>
                {service.title}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        label="Tell us about the project"
        htmlFor="message"
        required
        error={errors.message}
        hint="Location, scope, timeline — whatever you have so far."
      >
        <TextArea
          id="message"
          name="message"
          value={values.message}
          onChange={setField('message')}
          invalid={Boolean(errors.message)}
          placeholder="We are planning a 40-unit residential development in Ajah and need a contractor for substructure and superstructure…"
        />
      </Field>

      {error && (
        <p className="text-sm font-medium text-danger-700" role="alert">
          {error.data?.message ?? 'We could not send that. Please try again in a moment.'}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? 'Sending…' : 'Send enquiry'}
        </Button>
        <p className="text-xs text-content-faint">We reply to most enquiries within one business day.</p>
      </div>
    </form>
  )
}
