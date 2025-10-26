'use client'

import { useEffect, useState } from 'react'
import { Search, Plus, Filter, Grid, List } from 'lucide-react'
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
  const [searchTerm, setSearchTerm] = useState('')
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

  const filteredPrompts = prompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    return category?.name || 'Uncategorized'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">AI Prompt Gallery</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Submit Prompt
              </button>
            </div>
          </div>
        </div>
      </header>

      <StatsSection 
        promptsThisWeek={stats.promptsThisWeek}
        totalCreators={stats.totalCreators}
        totalLikes={stats.totalLikes}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            See what the community is creating and loving right now
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every image comes with the exact prompt that created it. Skip the guesswork and learn directly from pieces that caught the community's attention.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Grid className="w-4 h-4" />
            </button>
            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading amazing prompts...</p>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                id={prompt.id}
                title={prompt.title}
                description={prompt.description}
                prompt_text={prompt.prompt_text}
                image_url={prompt.image_url}
                category={getCategoryName(prompt.category_id)}
                creator_username={prompt.creator_username}
                likes_count={prompt.likes_count}
                created_at={prompt.created_at}
              />
            ))}
          </div>
        )}

        {!loading && filteredPrompts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No prompts found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  )
}
