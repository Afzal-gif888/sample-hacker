import { SUBMIT_DELAY_MS } from '../constants/form'
import type { StudentRegistration } from '../types/registration'

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

/**
 * Simulated registration request.
 * Replace the body with `fetch('/api/registrations', { method: 'POST', ... })`
 * when a backend becomes available.
 */
export async function submitRegistration(
  payload: StudentRegistration,
): Promise<StudentRegistration> {
  await wait(SUBMIT_DELAY_MS)
  return payload
}
