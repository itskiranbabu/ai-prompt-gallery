'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Heart, Share2, Download } from 'lucide-react'
import CopyButton from '@/components/CopyButton'

interface Prompt {
  id: string
  title: string
  description: string
  prompt_text: string
  image_url: string
  tags: string[]
  likes_count: number
  created_at: string
  category_id: string
  creator_username?: string
}

export default function PromptDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchPrompt(params.id as string)
    }
  }, [params.id])

  const fetchPrompt = async (id: string) => {
    try {
      const response = await fetch(`/api/prompts/${id}`)
      const data = await response.json()
      
      if (data.success) {
        setPrompt(data.data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!prompt) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Prompt not found</h2>
          <button onClick={() => router.push('/')} className="text-primary-600">
            Return to gallery
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button onClick={() => router.push('/')} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-2xl">
              <Image src={prompt.image_url} alt={prompt.title} fill className="object-cover" priority />
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border rounded-lg hover:bg-gray-50">
                <Heart className="w-5 h-5" />
                {prompt.likes_count}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border rounded-lg hover:bg-gray-50">
                <Share2 className="w-5 h-5" />
                Share
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border rounded-lg hover:bg-gray-50">
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{prompt.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{prompt.description}</p>
              
              {prompt.creator_username && (
                <p className="text-gray-600 mb-4">
                  by <span className="font-semibold">{prompt.creator_username}</span>
                </p>
              )}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Prompt</h3>
                <CopyButton text={prompt.prompt_text} label="Copy" />
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{prompt.prompt_text}</p>
            </div>

            {prompt.tags && prompt.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
