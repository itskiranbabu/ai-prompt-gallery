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
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🍌</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Prompt Gallery</h1>
                <p className="
