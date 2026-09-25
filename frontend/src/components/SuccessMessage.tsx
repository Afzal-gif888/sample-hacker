import { CheckCircle2 } from 'lucide-react'

type SuccessMessageProps = {
  onReset: () => void
}

export function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <div
      className="flex flex-col items-center px-2 py-6 text-center motion-safe:animate-rise"
      role="status"
      aria-live="polite"
    >
      <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/12 text-accent">
        <CheckCircle2 size={28} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h2 className="font-display text-3xl tracking-tight text-ink">
        Registration Successful!
      </h2>
      <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-muted">
        Your student details have been submitted successfully.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex h-12 items-center justify-center rounded-[var(--radius-control)] border border-white/12 bg-white/6 px-5 text-sm font-medium text-ink transition-[transform,background-color,border-color] duration-200 hover:-translate-y-px hover:border-white/20 hover:bg-white/10 active:translate-y-px motion-reduce:hover:translate-y-0 motion-reduce:active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Register Another Student
      </button>
    </div>
  )
}
