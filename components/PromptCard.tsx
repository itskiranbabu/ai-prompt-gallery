'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import CopyButton from './CopyButton'

interface PromptCardProps {
  id: string
  title: string
  description: string
  prompt_text: string
  image_url: string
  category: string
  creator_username?: string
  likes_count: number
  created_at: string
}

export default function PromptCard({
  id,
  title,
  description,
  prompt_text,
  image_url,
  category,
  creator_username,
  likes_count,
  created_at
}: PromptCardProps) {
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
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <Link href={`/prompts/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={image_url || '/placeholder.jpg'}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-medium">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              {likes_count}
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <Link href={`/prompts/${id}`}>
          <h3 className="font-bold text-lg text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
            {category}
          </span>
          {creator_username && (
            <span className="text-xs text-gray-500">
              by {creator_username}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">{getTimeAgo(created_at)}</span>
          <CopyButton text={prompt_text} label="Copy Prompt" />
        </div>
      </div>
    </div>
  )
}