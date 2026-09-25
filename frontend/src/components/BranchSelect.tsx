import type { ChangeEvent, ReactNode } from 'react'
import { BRANCH_OPTIONS } from '../constants/form'
import { FieldFrame } from './FieldFrame'

type BranchSelectProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  icon?: ReactNode
}

export function BranchSelect({
  id,
  label,
  value,
  onChange,
  error,
  icon,
}: BranchSelectProps) {
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
        <select
          id={id}
          name={id}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            onChange(event.target.value)
          }}
          className="h-full w-full cursor-pointer appearance-none bg-transparent pr-6 text-[0.95rem] text-ink outline-none"
        >
          <option value="" className="bg-slate-900 text-slate-200">
            Select your branch
          </option>
          {BRANCH_OPTIONS.map((option) => (
            <option key={option} value={option} className="bg-slate-900 text-slate-200">
              {option}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-3.5 text-muted"
          aria-hidden="true"
        >
          ▾
        </span>
      </FieldFrame>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-rose-300">
          {error}
        </p>
      ) : null}
    </div>
  )
}
