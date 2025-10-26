'use client'

import { TrendingUp, Users, Heart } from 'lucide-react'

interface StatsProps {
  promptsThisWeek: number
  totalCreators: number
  totalLikes: number
}

export default function StatsSection({ promptsThisWeek, totalCreators, totalLikes }: StatsProps) {
  return (
    <div className="bg-gradient-to-br from-primary-600 to-purple-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Share the prompts behind the art
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Discover trending AI images and videos that inspire your next creation. 
            Browse stunning artwork, copy the exact prompts, and learn from the community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="text-5xl font-bold mb-2">{promptsThisWeek}+</div>
            <div className="text-lg text-white/80">Prompts shared this week</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Users className="w-8 h-8" />
            </div>
            <div className="text-5xl font-bold mb-2">{totalCreators}+</div>
            <div className="text-lg text-white/80">Creators contributing</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Heart className="w-8 h-8" />
            </div>
            <div className="text-5xl font-bold mb-2">{totalLikes.toLocaleString()}+</div>
            <div className="text-lg text-white/80">Total likes given</div>
          </div>
        </div>
      </div>
    </div>
  )
}