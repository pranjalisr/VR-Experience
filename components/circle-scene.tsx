"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Torus } from "@react-three/drei"
import type { Mesh } from "three"

export default function CircleScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[0, 10, 5]} intensity={1} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a5490" />
      </mesh>

      {/* Title */}
      <Text position={[0, 4, -3]} fontSize={0.8} color="#2ecc71" anchorX="center" anchorY="middle">
        Circle Space - Orbital Mechanics
      </Text>

      {/* Interactive Rings */}
      <OrbitingRing position={[-3, 1, 0]} radius={0.8} tubeRadius={0.1} color="#e74c3c" />
      <OrbitingRing position={[0, 1.5, 0]} radius={1.2} tubeRadius={0.15} color="#3498db" />
      <OrbitingRing position={[3, 1, 0]} radius={0.6} tubeRadius={0.08} color="#f39c12" />
      <OrbitingRing position={[-1.5, 2.5, -2]} radius={0.5} tubeRadius={0.06} color="#9b59b6" />
      <OrbitingRing position={[1.5, 2.5, -2]} radius={0.9} tubeRadius={0.12} color="#1abc9c" />

      {/* Floating Rings */}
      <FloatingRing position={[-4, 3, -1]} radius={0.3} />
      <FloatingRing position={[4, 2, -1]} radius={0.4} />
      <FloatingRing position={[0, 5, -3]} radius={0.2} />

      {/* Central Orbital System */}
      <OrbitalSystem position={[0, 0, -4]} />
    </>
  )
}

function OrbitingRing({
  position,
  radius,
  tubeRadius,
  color,
}: {
  position: [number, number, number]
  radius: number
  tubeRadius: number
  color: string
}) {
  const meshRef = useRef<Mesh>(null)
  const [rotationSpeed, setRotationSpeed] = useState(0.02)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed
      meshRef.current.rotation.y += rotationSpeed * 0.5
      meshRef.current.rotation.z += rotationSpeed * 0.3

      // Floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }
  })

  const handleClick = () => {
    setRotationSpeed(rotationSpeed === 0.02 ? 0.08 : rotationSpeed === 0.08 ? 0.15 : 0.02)
  }

  return (
    <Torus
      ref={meshRef}
      position={position}
      args={[radius, tubeRadius, 16, 100]}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={color}
        emissive={hovered ? color : "#000000"}
        emissiveIntensity={hovered ? 0.3 : 0.1}
        roughness={0.2}
        metalness={0.8}
      />
    </Torus>
  )
}

function FloatingRing({ position, radius }: { position: [number, number, number]; radius: number }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.5
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.z += 0.015
    }
  })

  return (
    <Torus ref={meshRef} position={position} args={[radius, 0.05, 8, 50]}>
      <meshStandardMaterial color="#ecf0f1" transparent opacity={0.6} />
    </Torus>
  )
}

function OrbitalSystem({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<any>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Central core */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>

      {/* Orbiting rings */}
      <Torus position={[0, 0, 0]} args={[1, 0.05, 8, 50]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#e74c3c" transparent opacity={0.8} />
      </Torus>
      <Torus position={[0, 0, 0]} args={[1.5, 0.03, 8, 50]} rotation={[0, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#3498db" transparent opacity={0.6} />
      </Torus>
      <Torus position={[0, 0, 0]} args={[2, 0.02, 8, 50]} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <meshStandardMaterial color="#2ecc71" transparent opacity={0.4} />
      </Torus>
    </group>
  )
}
