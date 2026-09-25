import { Building2, GraduationCap, Hash, LoaderCircle, Mail, User } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { EMPTY_REGISTRATION } from '../constants/form'
import { submitRegistration } from '../lib/registrationApi'
import { validateRegistration } from '../lib/validate'
import type {
  FormErrors,
  FormStatus,
  StudentRegistration,
} from '../types/registration'
import { BranchSelect } from './BranchSelect'
import { FormInput } from './FormInput'
import { SuccessMessage } from './SuccessMessage'

const iconSize = 18

export function RegistrationForm() {
  const [values, setValues] = useState<StudentRegistration>(EMPTY_REGISTRATION)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [submitted, setSubmitted] = useState<StudentRegistration | null>(null)

  const isSubmitting = status === 'submitting'

  function updateField<K extends keyof StudentRegistration>(
    field: K,
    value: StudentRegistration[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateRegistration(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      const firstErrorField = Object.keys(nextErrors)[0]
      document.getElementById(firstErrorField)?.focus()
      return
    }

    setStatus('submitting')

    try {
      const payload: StudentRegistration = {
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        collegeName: values.collegeName.trim(),
        branch: values.branch,
        rollNumber: values.rollNumber.trim(),
      }
      const result = await submitRegistration(payload)
      setSubmitted(result)
      setStatus('success')
    } catch {
      setStatus('error')
      setErrors({
        rollNumber: 'Something went wrong. Please try again.',
      })
    }
  }

  function handleReset() {
    setValues(EMPTY_REGISTRATION)
    setErrors({})
    setSubmitted(null)
    setStatus('idle')
  }

  return (
    <section
      aria-labelledby="registration-heading"
      className="glass-panel w-full max-w-[32.5rem] p-6 sm:p-8 motion-safe:animate-rise"
    >
      {status === 'success' ? (
        <SuccessMessage onReset={handleReset} />
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="sr-only" aria-live="polite">
            {isSubmitting ? 'Submitting registration' : null}
            {submitted ? 'Registration successful' : null}
          </div>

          <FormInput
            id="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            value={values.fullName}
            onChange={(value) => updateField('fullName', value)}
            error={errors.fullName}
            autoComplete="name"
            icon={<User size={iconSize} strokeWidth={1.75} />}
          />

          <FormInput
            id="email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(value) => updateField('email', value)}
            error={errors.email}
            autoComplete="email"
            icon={<Mail size={iconSize} strokeWidth={1.75} />}
          />

          <FormInput
            id="collegeName"
            label="College Name"
            placeholder="Enter your college name"
            value={values.collegeName}
            onChange={(value) => updateField('collegeName', value)}
            error={errors.collegeName}
            autoComplete="organization"
            icon={<Building2 size={iconSize} strokeWidth={1.75} />}
          />

          <BranchSelect
            id="branch"
            label="Branch"
            value={values.branch}
            onChange={(value) => updateField('branch', value)}
            error={errors.branch}
            icon={<GraduationCap size={iconSize} strokeWidth={1.75} />}
          />

          <FormInput
            id="rollNumber"
            label="Roll Number"
            placeholder="Enter your roll number"
            value={values.rollNumber}
            onChange={(value) => updateField('rollNumber', value)}
            error={errors.rollNumber}
            autoComplete="off"
            icon={<Hash size={iconSize} strokeWidth={1.75} />}
          />

          {status === 'error' ? (
            <p role="alert" className="text-sm text-rose-300">
              Submission failed. Please try again.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-control)] bg-ink text-sm font-semibold tracking-wide text-slate-950 transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-px hover:bg-white hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)] active:translate-y-px motion-reduce:hover:translate-y-0 motion-reduce:active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-ink disabled:hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle
                  size={18}
                  className="motion-safe:animate-spin"
                  aria-hidden="true"
                />
                Submitting...
              </>
            ) : (
              'Submit Registration'
            )}
          </button>
        </form>
      )}
    </section>
  )
}
