import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react'
import { FieldFrame } from './FieldFrame'

type FormInputProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  error?: string
  icon?: ReactNode
  type?: 'text' | 'email'
  autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete']
}

export function FormInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  icon,
  type = 'text',
  autoComplete,
}: FormInputProps) {
  const describedBy = error ? `${id}-error` : undefined

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-ink/90">
        {label}
      </label>
      <FieldFrame error={Boolean(error)}>
        {icon ? (
          <span className="shrink-0 text-muted" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.value)
          }}
          className="h-full w-full bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-muted/70"
        />
      </FieldFrame>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-rose-300">
          {error}
        </p>
      ) : null}
    </div>
  )
}
