export type StudentRegistration = {
  fullName: string
  email: string
  collegeName: string
  branch: string
  rollNumber: string
}

export type RegistrationField = keyof StudentRegistration

export type FormErrors = Partial<Record<RegistrationField, string>>

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
