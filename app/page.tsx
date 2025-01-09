'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import VRScene from './components/vr-scene'
import ContentManager from './components/content-manager'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showContentManager, setShowContentManager] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    if (loggedIn) {
      setIsLoggedIn(true)
    } else {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
    router.push('/login')
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">VR Experience</h1>
        <div>
          <Button 
            variant="outline" 
            onClick={() => setShowContentManager(!showContentManager)}
            className="mr-2"
          >
            {showContentManager ? 'Close Content Manager' : 'Open Content Manager'}
          </Button>
          <Button variant="destructive" onClick={handleLogout}>Logout</Button>
        </div>
      </header>
      <main className="flex-grow flex">
        {showContentManager ? (
          <ContentManager />
        ) : (
          <VRScene />
        )}
      </main>
    </div>
  )
}

