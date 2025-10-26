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
  is_featured: boolean
  likes_count: number
  views_count: number
  created_at: string
  category_id: string
  creator_username?: string
}

interface Category {
  id: string
  name: string
  color: string
}

export default function PromptDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
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
        
        if (data.data.category_id) {
          const categoryRes = await fetch('/api/categories')
          const categoryData = await categoryRes.json()
          if (categoryData.success) {
            const cat = categoryData.data.find((c: Category) => c.id === data.data.category_id)
            setCategory(cat)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching prompt:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return '1 day ago'
    return `${diffInDays} days ago`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!prompt) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Prompt not found</h2>
          <button
            onClick={() => router.push('/')}
            className="text-primary-600 hover:text-primary-700"
          >
            Return to gallery
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Gallery
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-2xl">
              <Image
                src={prompt.image_url || '/placeholder.jpg'}
                alt={prompt.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="font-medium">{prompt.likes_count}</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="w-5 h-5" />
                Share
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{prompt.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{prompt.description}</p>
              
              <div className="flex items-center gap-4 mb-6">
                {category && (
                  <span 
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: `${category.color}20`,
                      color: category.color 
                    }}
                  >
                    {category.name}
                  </span>
                )}
                {prompt.creator_username && (
                  <span className="text-gray-600">
                    by <span className="font-medium text-gray-900">{prompt.creator_username}</span>
                  </span>
                )}
                <span className="text-gray-500 text-sm">{getTimeAgo(prompt.created_at)}</span>
              </div>
            </div>

            {/* Prompt Text */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Prompt</h3>
                <CopyButton text={prompt.prompt_text} label="Copy Prompt" />
              
