'use client'

import { useEffect, useState } from 'react'
import { Search, Plus, Filter, Grid, List, Heart } from 'lucide-react'
import Image from 'next/image'

interface Category {
  id: string
  name: string
  color: string
}

interface Prompt {
  id: string
  title: string
  description: string
  prompt_text: string
  image_url: string
  tags: string[]
  is_featured: boolean
  likes_count: number
  created_at: string
  category_id: string
}

export default function HomePage() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [promptsRes, categoriesRes] = await Promise.all([
        fetch('/api/prompts'),
        fetch('/api/categories')
      ])
      
      const promptsData = await promptsRes.json()
      const categoriesData = await categoriesRes.json()
      
      if (promptsData.success) setPrompts(promptsData.data)
      if (categoriesData.success) setCategories(categoriesData.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPrompts = prompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    return category?.name || 'Uncategorized'
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">AI Prompt Gallery</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Prompt
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Grid className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Loading prompts...</p>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrompts.map((prompt) => (
              <div key={prompt.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={prompt.image_url || '/placeholder.jpg'}
                    alt={prompt.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{prompt.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{prompt.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                      {getCategoryName(prompt.category_id)}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {prompt.likes_count}
                      </span>
                      <span>{getTimeAgo(prompt.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPrompts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No prompts found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  )
}
