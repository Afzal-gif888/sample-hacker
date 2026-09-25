import type { StudentRegistration } from '../types/registration'

export const BRANCH_OPTIONS = [
  'Computer Science Engineering',
  'Information Technology',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Other',
] as const

export type BranchOption = (typeof BRANCH_OPTIONS)[number]

export const EMPTY_REGISTRATION: StudentRegistration = {
  fullName: '',
  email: '',
  collegeName: '',
  branch: '',
  rollNumber: '',
}

export const SUBMIT_DELAY_MS = 900

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
