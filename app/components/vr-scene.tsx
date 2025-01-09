'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box, Sphere, Environment } from '@react-three/drei'

export default function VRScene() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Box position={[-1.2, 0, 0]}>
          <meshStandardMaterial color="orange" />
        </Box>
        <Sphere position={[1.2, 0, 0]}>
          <meshStandardMaterial color="hotpink" />
        </Sphere>
        <Environment preset="sunset" background />
      </Canvas>
    </div>
  )
}

