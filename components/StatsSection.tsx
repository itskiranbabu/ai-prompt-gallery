'use client'

import { TrendingUp, Users, Heart } from 'lucide-react'

interface StatsProps {
  promptsThisWeek: number
  totalCreators: number
  totalLikes: number
}

export default function StatsSection({ promptsThisWeek, totalCreators, totalLikes }: StatsProps) {
  return (
    <div className="bg-white border-y border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-gray-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-1">{promptsThisWeek}+</div>
            <div className="text-sm text-gray-600">Prompts this week</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-gray-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-1">{totalCreators}+</div>
            <div className="text-sm text-gray-600">Creators</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Heart className="w-6 h-6 text-gray-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-1">{totalLikes.toLocaleString()}+</div>
            <div className="text-sm text-gray-600">Likes</div>
          </div>
        </div>
      </div>
    </div>
  )
}