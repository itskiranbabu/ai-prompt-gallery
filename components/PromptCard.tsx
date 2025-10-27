'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Bookmark, MessageCircle, Send } from 'lucide-react'
import CopyButton from './CopyButton'
import { useState } from 'react'

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
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return '1 day ago'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return `${Math.floor(diffInDays / 30)} months ago`
  }

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden card-hover border border-gray-100">
      {/* Header - Instagram Style */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full instagram-gradient p-0.5">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="text-sm font-bold instagram-gradient-text">
                {creator_username?.charAt(1).toUpperCase() || 'A'}
              </span>
            </div>
          </div>
          <div>
            <Link href={`/prompts/${id}`}>
              <p className="font-semibold text-sm hover:text-gray-600 transition-colors">
                {creator_username || '@creator'}
              </p>
            </Link>
            <p className="text-xs text-gray-500">{category}</p>
          </div>
        </div>
        <button className="text-gray-600 hover:text-gray-900">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="4" r="1.5"/>
            <circle cx="10" cy="10" r="1.5"/>
            <circle cx="10" cy="16" r="1.5"/>
          </svg>
        </button>
      </div>

      {/* Image */}
      <Link href={`/prompts/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
          <Image
            src={image_url || '/placeholder.jpg'}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </Link>

      {/* Actions - Instagram Style */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLiked(!liked)}
              className="transition-transform hover:scale-110 active:scale-95"
            >
              <Heart
                className={`w-7 h-7 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-800'}`}
              />
            </button>
            <button className="transition-transform hover:scale-110 active:scale-95">
              <MessageCircle className="w-7 h-7 text-gray-800" />
            </button>
            <button className="transition-transform hover:scale-110 active:scale-95">
              <Send className="w-7 h-7 text-gray-800" />
            </button>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className="transition-transform hover:scale-110 active:scale-95"
          >
            <Bookmark
              className={`w-6 h-6 ${saved ? 'fill-gray-800 text-gray-800' : 'text-gray-800'}`}
            />
          </button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm">
          {(likes_count + (liked ? 1 : 0)).toLocaleString()} likes
        </p>

        {/* Caption */}
        <div className="space-y-1">
          <Link href={`/prompts/${id}`}>
            <p className="text-sm">
              <span className="font-semibold mr-2">{creator_username || '@creator'}</span>
              <span className="text-gray-800">{title}</span>
            </p>
          </Link>
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        </div>

        {/* Copy Prompt Button */}
        <div className="pt-2">
          <CopyButton text={prompt_text}
