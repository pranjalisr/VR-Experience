'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface VRContent {
  id: string
  name: string
  type: 'environment' | 'object'
  url: string
}

export default function ContentManager() {
  const [contents, setContents] = useState<VRContent[]>([
    { id: '1', name: 'Beach Environment', type: 'environment', url: '/vr/beach.glb' },
    { id: '2', name: 'Chair Object', type: 'object', url: '/vr/chair.glb' },
  ])
  const [newContent, setNewContent] = useState({ name: '', type: 'environment' as const, url: '' })

  const handleAddContent = () => {
    if (newContent.name && newContent.url) {
      setContents([...contents, { ...newContent, id: Date.now().toString() }])
      setNewContent({ name: '', type: 'environment', url: '' })
    }
  }

  return (
    <div className="w-full p-4 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Content Manager</h2>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Input
              placeholder="Content Name"
              value={newContent.name}
              onChange={(e) => setNewContent({ ...newContent, name: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded"
              value={newContent.type}
              onChange={(e) => setNewContent({ ...newContent, type: e.target.value as 'environment' | 'object' })}
            >
              <option value="environment">Environment</option>
              <option value="object">Object</option>
            </select>
            <Input
              placeholder="Content URL"
              value={newContent.url}
              onChange={(e) => setNewContent({ ...newContent, url: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddContent}>Add Content</Button>
        </CardFooter>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contents.map((content) => (
          <Card key={content.id}>
            <CardHeader>
              <CardTitle>{content.name}</CardTitle>
              <CardDescription>{content.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{content.url}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Edit</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

