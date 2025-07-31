"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Sphere } from "@react-three/drei"
import type { Mesh } from "three"

export default function BallScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[0, 10, 5]} intensity={1} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Title */}
      <Text position={[0, 4, -3]} fontSize={0.8} color="#ff6b6b" anchorX="center" anchorY="middle">
        Ball World - Physics Playground
      </Text>

      {/* Interactive Balls */}
      <BouncingBall position={[-3, 2, 0]} size={0.5} color="#ff6b6b" bounceHeight={2} />
      <BouncingBall position={[0, 3, 0]} size={0.8} color="#4ecdc4" bounceHeight={3} />
      <BouncingBall position={[3, 1.5, 0]} size={0.3} color="#ffe66d" bounceHeight={1.5} />
      <BouncingBall position={[-1.5, 2.5, -2]} size={0.6} color="#ff9ff3" bounceHeight={2.5} />
      <BouncingBall position={[1.5, 1.8, -2]} size={0.4} color="#54a0ff" bounceHeight={1.8} />

      {/* Floating Balls */}
      <FloatingBall position={[-4, 3, -1]} size={0.2} />
      <FloatingBall position={[4, 2, -1]} size={0.25} />
      <FloatingBall position={[0, 5, -3]} size={0.15} />
    </>
  )
}

function BouncingBall({
  position,
  size,
  color,
  bounceHeight,
}: {
  position: [number, number, number]
  size: number
  color: string
  bounceHeight: number
}) {
  const meshRef = useRef<Mesh>(null)
  const [isClicked, setIsClicked] = useState(false)
  const [velocity, setVelocity] = useState(0)

  useFrame((state, delta) => {
    if (meshRef.current && isClicked) {
      const newVelocity = velocity - 9.8 * delta * 2 // Gravity
      setVelocity(newVelocity)

      meshRef.current.position.y += newVelocity * delta

      // Bounce off ground
      if (meshRef.current.position.y <= position[1] - bounceHeight) {
        meshRef.current.position.y = position[1] - bounceHeight
        setVelocity(Math.abs(newVelocity) * 0.8) // Bounce with energy loss
      }

      // Reset if velocity is too low
      if (Math.abs(newVelocity) < 0.1 && meshRef.current.position.y <= position[1] - bounceHeight + 0.1) {
        setIsClicked(false)
        meshRef.current.position.y = position[1]
        setVelocity(0)
      }
    } else if (meshRef.current) {
      // Gentle floating animation when not bouncing
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1
    }
  })

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true)
      setVelocity(bounceHeight * 2) // Initial upward velocity
    }
  }

  return (
    <Sphere ref={meshRef} position={position} args={[size, 32, 32]} onClick={handleClick}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} roughness={0.1} metalness={0.1} />
    </Sphere>
  )
}

function FloatingBall({ position, size }: { position: [number, number, number]; size: number }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <Sphere ref={meshRef} position={position} args={[size, 16, 16]}>
      <meshStandardMaterial color="#ffffff" transparent opacity={0.6} />
    </Sphere>
  )
}
