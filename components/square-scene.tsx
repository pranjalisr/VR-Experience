"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Box } from "@react-three/drei"
import type { Mesh } from "three"

export default function SquareScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[0, 10, 5]} intensity={1} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>

      {/* Title */}
      <Text position={[0, 4, -3]} fontSize={0.8} color="#4ecdc4" anchorX="center" anchorY="middle">
        Square Realm - Geometric Transformations
      </Text>

      {/* Interactive Cubes */}
      <RotatingCube position={[-3, 1, 0]} size={[1, 1, 1]} color="#e74c3c" />
      <RotatingCube position={[0, 1, 0]} size={[1.2, 0.8, 1.2]} color="#3498db" />
      <RotatingCube position={[3, 1, 0]} size={[0.8, 1.5, 0.8]} color="#2ecc71" />
      <RotatingCube position={[-1.5, 2.5, -2]} size={[0.6, 0.6, 0.6]} color="#f39c12" />
      <RotatingCube position={[1.5, 2.5, -2]} size={[1, 0.5, 1]} color="#9b59b6" />

      {/* Floating Cubes */}
      <FloatingCube position={[-4, 3, -1]} size={0.3} />
      <FloatingCube position={[4, 2, -1]} size={0.4} />
      <FloatingCube position={[0, 5, -3]} size={0.2} />
    </>
  )
}

function RotatingCube({
  position,
  size,
  color,
}: {
  position: [number, number, number]
  size: [number, number, number]
  color: string
}) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(0.01)
  const [currentColor, setCurrentColor] = useState(color)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed
      meshRef.current.rotation.y += rotationSpeed * 0.7
      meshRef.current.rotation.z += rotationSpeed * 0.3

      if (hovered) {
        meshRef.current.scale.setScalar(1.1)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  const handleClick = () => {
    setRotationSpeed(rotationSpeed === 0.01 ? 0.05 : rotationSpeed === 0.05 ? 0.1 : 0.01)
  }

  const handlePointerOver = () => {
    setHovered(true)
    setCurrentColor(hovered ? color : "#ffffff")
  }

  const handlePointerOut = () => {
    setHovered(false)
    setCurrentColor(color)
  }

  return (
    <Box
      ref={meshRef}
      position={position}
      args={size}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <meshStandardMaterial
        color={currentColor}
        emissive={hovered ? currentColor : "#000000"}
        emissiveIntensity={hovered ? 0.2 : 0}
        roughness={0.3}
        metalness={0.7}
      />
    </Box>
  )
}

function FloatingCube({ position, size }: { position: [number, number, number]; size: number }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.4
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.008
      meshRef.current.rotation.z += 0.003
    }
  })

  return (
    <Box ref={meshRef} position={position} args={[size, size, size]}>
      <meshStandardMaterial color="#ecf0f1" transparent opacity={0.7} />
    </Box>
  )
}
