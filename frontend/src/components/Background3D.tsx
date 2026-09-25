import {
  Component,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group, InstancedMesh } from 'three'
import { Color, Object3D } from 'three'
import { useIsMobile } from '../hooks/useIsMobile'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const COLORS = {
  ivory: '#d8e2ec',
  slate: '#8ea3b8',
  teal: '#7daba0',
  gold: '#c9b48a',
}

type PointerRef = { x: number; y: number }

function FloatingGeometry({
  compact,
  pointer,
}: {
  compact: boolean
  pointer: RefObject<PointerRef>
}) {
  const group = useRef<Group>(null)
  const particles = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])
  const particleCount = compact ? 12 : 22
  const offsets = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, index) => ({
        x: Math.sin(index * 1.7) * (compact ? 3.2 : 4.4),
        y: Math.cos(index * 1.1) * (compact ? 2.1 : 2.6),
        z: Math.sin(index * 0.8) * (compact ? 1.6 : 2.2),
        scale: compact ? 0.04 : 0.055,
        speed: 0.25 + (index % 5) * 0.05,
      })),
    [compact, particleCount],
  )

  useFrame((state, delta) => {
    const root = group.current
    if (root) {
      root.rotation.y += delta * 0.07
      root.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.07
      const targetX = (pointer.current?.x ?? 0) * (compact ? 0.22 : 0.42)
      const targetY = (pointer.current?.y ?? 0) * (compact ? 0.12 : 0.22)
      root.position.x += (targetX - root.position.x) * 0.045
      root.position.y += (targetY - root.position.y) * 0.045
    }

    const mesh = particles.current
    if (!mesh) return
    const time = state.clock.elapsedTime
    offsets.forEach((offset, index) => {
      dummy.position.set(
        offset.x,
        offset.y + Math.sin(time * offset.speed + index) * 0.18,
        offset.z,
      )
      dummy.scale.setScalar(offset.scale)
      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={group}>
      <mesh position={[0, 0.2, -0.4]}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshStandardMaterial
          color={COLORS.ivory}
          roughness={0.28}
          metalness={0.18}
          transparent
          opacity={0.22}
          wireframe
        />
      </mesh>

      <mesh position={[-2.4, 1.1, -0.8]} rotation={[0.4, 0.6, 0.2]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial
          color={COLORS.slate}
          roughness={0.35}
          metalness={0.25}
          transparent
          opacity={0.28}
        />
      </mesh>

      <mesh position={[2.2, -1.15, 0.2]} rotation={[0.8, -0.4, 0.3]}>
        <boxGeometry args={[0.48, 0.48, 0.48]} />
        <meshStandardMaterial
          color={COLORS.gold}
          roughness={0.4}
          metalness={0.2}
          transparent
          opacity={0.32}
        />
      </mesh>

      {!compact ? (
        <mesh position={[1.7, 1.45, -1.1]} rotation={[0.2, 0.9, 0]}>
          <boxGeometry args={[0.32, 0.32, 0.32]} />
          <meshStandardMaterial
            color={COLORS.teal}
            roughness={0.3}
            metalness={0.22}
            transparent
            opacity={0.3}
          />
        </mesh>
      ) : null}

      <mesh position={[-1.6, -1.3, 0.4]} rotation={[Math.PI / 2, 0.2, 0]}>
        <torusGeometry args={[0.72, 0.035, 12, 48]} />
        <meshStandardMaterial
          color={COLORS.teal}
          roughness={0.25}
          metalness={0.4}
          transparent
          opacity={0.45}
        />
      </mesh>

      {!compact ? (
        <mesh position={[0.4, -0.2, -1.6]} rotation={[0.6, 0.3, 0.8]}>
          <torusGeometry args={[1.05, 0.025, 10, 56]} />
          <meshStandardMaterial
            color={COLORS.ivory}
            roughness={0.2}
            metalness={0.35}
            transparent
            opacity={0.2}
          />
        </mesh>
      ) : null}

      <mesh position={[2.6, 0.5, -0.6]} rotation={[0.5, 0.2, 0.4]}>
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color={COLORS.gold}
          roughness={0.25}
          metalness={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>

      <instancedMesh ref={particles} args={[undefined, undefined, particleCount]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          color={new Color(COLORS.ivory)}
          roughness={0.4}
          metalness={0.1}
          transparent
          opacity={0.35}
        />
      </instancedMesh>
    </group>
  )
}

function Scene({
  compact,
  pointer,
}: {
  compact: boolean
  pointer: RefObject<PointerRef>
}) {
  return (
    <>
      <fog attach="fog" args={['#0b1018', 8, 16]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 7, 6]} intensity={1.05} color="#f4f0e6" />
      <pointLight position={[-5, -2, 3]} intensity={0.35} color="#7daba0" />
      <FloatingGeometry compact={compact} pointer={pointer} />
    </>
  )
}

class SceneErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

function AmbientBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-24 top-[-12%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(125,171,160,0.16),transparent_68%)]" />
      <div className="absolute -right-16 top-[18%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(201,180,138,0.12),transparent_70%)]" />
      <div className="absolute bottom-[-10%] left-1/2 h-[22rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(142,163,184,0.12),transparent_72%)]" />
    </div>
  )
}

export default function Background3D() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const pointer = useRef<PointerRef>({ x: 0, y: 0 })

  useEffect(() => {
    if (prefersReducedMotion) return

    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [prefersReducedMotion])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <AmbientBackdrop />
      {prefersReducedMotion ? null : (
        <SceneErrorBoundary fallback={null}>
          <Canvas
            className="pointer-events-none h-full w-full"
            dpr={isMobile ? 1 : [1, 1.5]}
            camera={{ position: [0, 0, 8.2], fov: 42 }}
            gl={{
              antialias: !isMobile,
              alpha: true,
              powerPreference: 'low-power',
              stencil: false,
              depth: true,
            }}
            style={{ pointerEvents: 'none' }}
          >
            <Scene compact={isMobile} pointer={pointer} />
          </Canvas>
        </SceneErrorBoundary>
      )}
    </div>
  )
}
