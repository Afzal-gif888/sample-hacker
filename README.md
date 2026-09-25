# Student Registration 3D

A single-page student registration experience with a glassmorphism form and a lightweight decorative 3D background. The form is the product; the 3D layer is atmosphere only.

## Features

- Five-field registration: name, email, college, branch, and roll number
- Client-side validation with inline field errors
- Loading, success, and reset states (no backend)
- Keyboard-accessible, labeled controls with visible focus
- Responsive layout from 320px-wide phones to desktop
- Decorative React Three Fiber scene with reduced-motion and mobile fallbacks

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Three.js + React Three Fiber
- Lucide React for field icons

## Folder structure

```text
student-registration-3d/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Background3D.tsx
│   │   │   ├── RegistrationForm.tsx
│   │   │   ├── FormInput.tsx
│   │   │   ├── BranchSelect.tsx
│   │   │   └── SuccessMessage.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── README.md
```

The frontend is self-contained. Run everything from `frontend/`.

## Installation

```bash
cd frontend
npm install
```

## Development

```bash
cd frontend
npm run dev
```

Open the local URL Vite prints (typically `http://localhost:5173`).

## Build

```bash
cd frontend
npm run build
```

Preview the production build with `npm run preview`.

## 3D implementation

`Background3D.tsx` renders a small Three.js scene behind the form: a low-poly icosahedron, a few cubes and rings, and an instanced particle field. Objects rotate slowly; pointer movement on the window eases the group for a light parallax effect.

The canvas is `pointer-events: none`, so it never captures clicks, typing, or scrolling. It is lazy-loaded, uses a low device-pixel ratio on phones, drops extra meshes on small screens, and unmounts entirely when `prefers-reduced-motion` is enabled. If WebGL fails, a CSS gradient backdrop remains.

Submission is simulated in `src/lib/registrationApi.ts` so a REST endpoint can replace the delay later without changing the form UI.
