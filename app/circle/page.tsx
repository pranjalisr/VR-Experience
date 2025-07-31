"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense, useState } from "react"
import Link from "next/link"
import CircleScene from "@/components/circle-scene"

export default function CirclePage() {
  const [vrSupported, setVrSupported] = useState(false)

  const checkVRSupport = async () => {
    if ("xr" in navigator) {
      try {
        const supported = await (navigator as any).xr.isSessionSupported("immersive-vr")
        setVrSupported(supported)
      } catch (e) {
        setVrSupported(false)
      }
    }
  }

  if (typeof window !== "undefined") {
    checkVRSupport()
  }

  const enterVR = async () => {
    if ("xr" in navigator) {
      try {
        const session = await (navigator as any).xr.requestSession("immersive-vr")
        console.log("VR Session started:", session)
      } catch (e) {
        console.error("Failed to start VR session:", e)
      }
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-green-900 to-black">
      {/* Navigation */}
      <nav className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <Link href="/" className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
          ← Back to Hub
        </Link>
        <div className="flex gap-2">
          <Link href="/ball" className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm">
            Ball
          </Link>
          <Link href="/square" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm">
            Square
          </Link>
        </div>
        {vrSupported && (
          <button
            onClick={enterVR}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Enter VR
          </button>
        )}
      </nav>

      {/* Info Panel */}
      <div className="absolute bottom-4 left-4 z-10 text-white bg-black/50 p-4 rounded-lg max-w-sm">
        <h2 className="text-lg font-bold mb-2 text-green-400">⭕ Circle Space</h2>
        <p className="text-sm mb-2">• Click rings to change orbital patterns • Watch the mesmerizing rotations</p>
        <p className="text-sm">• Experience circular motion physics!</p>
      </div>

      <Canvas camera={{ position: [0, 2, 8], fov: 75 }}>
        <Suspense fallback={null}>
          <CircleScene />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          <Environment preset="forest" />
        </Suspense>
      </Canvas>
    </div>
  )
}
