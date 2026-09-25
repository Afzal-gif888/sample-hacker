import { lazy, Suspense } from 'react'
import { RegistrationForm } from './components/RegistrationForm'

const Background3D = lazy(() => import('./components/Background3D'))

export default function App() {
  return (
    <div className="relative isolate min-h-dvh overflow-x-hidden">
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>

      <main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-8 max-w-xl text-center motion-safe:animate-fade">
          <p className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.22em] text-accent-strong">
            STUDENT REGISTRATION
          </p>
          <h1
            id="registration-heading"
            className="mt-5 font-display text-[2.05rem] leading-tight tracking-tight text-ink sm:text-5xl"
          >
            Build Your Academic Profile
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            Enter your details to create your student profile.
          </p>
        </header>

        <RegistrationForm />
      </main>
    </div>
  )
}
