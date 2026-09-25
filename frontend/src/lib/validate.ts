import { EMAIL_PATTERN } from '../constants/form'
import type { FormErrors, StudentRegistration } from '../types/registration'

export function validateRegistration(
  values: StudentRegistration,
): FormErrors {
  const errors: FormErrors = {}

  if (values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.'
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (values.collegeName.trim().length < 2) {
    errors.collegeName = 'Please enter your college name.'
  }

  if (!values.branch) {
    errors.branch = 'Please select your branch.'
  }

  if (!values.rollNumber.trim()) {
    errors.rollNumber = 'Please enter your roll number.'
  }

  return errors
}
