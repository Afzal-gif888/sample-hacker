import type { ReactNode } from 'react'

type FieldFrameProps = {
  children: ReactNode
  error?: boolean
}

export function FieldFrame({ children, error = false }: FieldFrameProps) {
  return (
    <div
      className={`field-shell relative ${error ? 'field-shell-error' : 'field-shell-idle'}`}
    >
      {children}
    </div>
  )
}
