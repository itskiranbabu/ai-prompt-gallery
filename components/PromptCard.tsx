'use client'

import Image from 'next/image'
import Link from 'next/link'
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
  creator_username,
  likes_count
}: PromptCardProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <Link href={`/prompts/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={image_url || '/placeholder.jpg'}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Likes overlay */}
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
            {likes_count}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 space-y-3">
        <Link href={`/prompts/${id}`}>
          <h3 className="font-bold text-lg text-gray-900 hover:text-gray-600 transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <CopyButton text={prompt_text} label="Copy" />
          {creator_username && (
            <span className="text-sm text-gray-500">
              by <span className="font-medium text-gray-700">{creator_username}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
