"use client"

import Link from "next/link"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense } from "react"

export default function Home() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-purple-900 to-black">
      {/* Navigation Header */}
      <nav className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">VR Experience Hub</h1>
          <div className="flex gap-4">
            <Link
              href="/ball"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Ball Experience
            </Link>
            <Link
              href="/square"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Square Experience
            </Link>
            <Link
              href="/circle"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Circle Experience
            </Link>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="absolute inset-0 flex items-center justify-center z-5">
        <div className="text-center text-white">
          <h2 className="text-6xl font-bold mb-4">Welcome to VR Hub</h2>
          <p className="text-xl mb-8">Choose your geometric adventure</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            <Link href="/ball" className="group">
              <div className="bg-red-600/20 border border-red-600 rounded-lg p-6 hover:bg-red-600/30 transition-colors">
                <div className="text-4xl mb-4">🏀</div>
                <h3 className="text-2xl font-bold mb-2">Ball World</h3>
                <p className="text-gray-300">Bouncing spheres and gravity physics</p>
              </div>
            </Link>
            <Link href="/square" className="group">
              <div className="bg-blue-600/20 border border-blue-600 rounded-lg p-6 hover:bg-blue-600/30 transition-colors">
                <div className="text-4xl mb-4">⬜</div>
                <h3 className="text-2xl font-bold mb-2">Square Realm</h3>
                <p className="text-gray-300">Rotating cubes and geometric patterns</p>
              </div>
            </Link>
            <Link href="/circle" className="group">
              <div className="bg-green-600/20 border border-green-600 rounded-lg p-6 hover:bg-green-600/30 transition-colors">
                <div className="text-4xl mb-4">⭕</div>
                <h3 className="text-2xl font-bold mb-2">Circle Space</h3>
                <p className="text-gray-300">Spinning rings and orbital mechanics</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Background 3D Scene */}
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} />
          <Environment preset="night" />

          {/* Floating background elements */}
          <mesh position={[-3, 2, -5]} rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#ff6b6b" transparent opacity={0.3} />
          </mesh>
          <mesh position={[3, -1, -5]} rotation={[0.5, 0.5, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#4ecdc4" transparent opacity={0.3} />
          </mesh>
          <mesh position={[0, -2, -5]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.7, 0.2, 16, 100]} />
            <meshStandardMaterial color="#ffe66d" transparent opacity={0.3} />
          </mesh>

          <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  )
}
