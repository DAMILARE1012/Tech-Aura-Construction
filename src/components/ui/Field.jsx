import { cn } from '@/utils/cn'

const controlBase =
  'w-full rounded-lg border bg-surface-raised px-4 py-3 text-sm text-content-strong transition-colors placeholder:text-content-faint focus:border-brand focus:outline-none disabled:bg-surface-sunken'

/** Label + control + error message wrapper shared by every form. */
export function Field({ label, htmlFor, error, required, hint, className, children }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={htmlFor} className="font-display text-xs font-bold uppercase tracking-[0.12em] text-content">
        {label}
        {required && <span className="ml-1 text-danger-600">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-content-faint">{hint}</p>}
      {error && (
        <p className="text-xs font-medium text-danger-700" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export function TextInput({ invalid, className, ...props }) {
  return (
    <input
      className={cn(controlBase, invalid ? 'border-danger-500' : 'border-line', className)}
      {...props}
    />
  )
}

export function TextArea({ invalid, className, ...props }) {
  return (
    <textarea
      rows={5}
      className={cn(
        controlBase,
        'resize-y',
        invalid ? 'border-danger-500' : 'border-line',
        className,
      )}
      {...props}
    />
  )
}

export function Select({ invalid, className, children, ...props }) {
  return (
    <select
      className={cn(
        controlBase,
        'cursor-pointer appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10',
        invalid ? 'border-danger-500' : 'border-line',
        className,
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23536780' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
      }}
      {...props}
    >
      {children}
    </select>
  )
}
