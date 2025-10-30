'use client'

import { useEffect, useState } from 'react'
import PromptCard from '@/components/PromptCard'
import StatsSection from '@/components/StatsSection'

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
  creator_username?: string
}

export default function HomePage() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    promptsThisWeek: 0,
    totalCreators: 0,
    totalLikes: 0
  })

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
      
      if (promptsData.success) {
        setPrompts(promptsData.data)
        
        const totalLikes = promptsData.data.reduce((sum: number, p: Prompt) => sum + p.likes_count, 0)
        const uniqueCreators = new Set(promptsData.data.map((p: Prompt) => p.creator_username).filter(Boolean))
        
        setStats({
          promptsThisWeek: promptsData.data.length,
          totalCreators: uniqueCreators.size || 6,
          totalLikes: totalLikes
        })
      }
      if (categoriesData.success) setCategories(categoriesData.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    return category?.name || 'Uncategorized'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🍌</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Prompt Gallery</h1>
                <p className="text-xs text-gray-500">Community prompt studio</p>
              </div>
            </div>
            <button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Submit Prompt
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
            Community prompt studio & gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Share the prompts behind the art.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover trending AI images and videos that inspire your next creation. Browse stunning artwork, copy the exact prompts, and learn from the community.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <StatsSection 
        promptsThisWeek={stats.promptsThisWeek}
        totalCreators={stats.totalCreators}
        totalLikes={stats.totalLikes}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            See what the community is creating and loving right now.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every image and video comes with the exact prompt that created it. Skip the guesswork and learn directly from pieces that caught
