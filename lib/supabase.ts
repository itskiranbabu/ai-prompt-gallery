import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Category {
  id: string
  name: string
  description?: string
  color: string
  created_at: string
  updated_at: string
}

export interface Prompt {
  id: string
  title: string
  description?: string
  prompt_text: string
  image_url?: string
  image_alt?: string
  category_id?: string
  user_id?: string
  tags: string[]
  is_featured: boolean
  is_public: boolean
  likes_count: number
  views_count: number
  created_at: string
  updated_at: string
  category?: Category
}

export interface UserProfile {
  id: string
  username?: string
  full_name?: string
  avatar_url?: string
  bio?: string
  website?: string
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface Like {
  id: string
  user_id: string
  prompt_id: string
  created_at: string
}

export interface Collection {
  id: string
  name: string
  description?: string
  user_id: string
  is_public: boolean
  created_at: string
  updated_at: string
}

// API functions
export const api = {
  // Categories
  getCategories: async (): Promise<Category[]> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data || []
  },

  // Prompts
  getPrompts: async (filters?: {
    category?: string
    search?: string
    featured?: boolean
    limit?: number
  }): Promise<Prompt[]> => {
    let query = supabase
      .from('prompts')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (filters?.category) {
      query = query.eq('category_id', filters.category)
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,prompt_text.ilike.%${filters.search}%`)
    }

    if (filters?.featured) {
      query = query.eq('is_featured', true)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  getPromptById: async (id: string): Promise<Prompt | null> => {
    const { data, error } = await supabase
      .from('prompts')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  createPrompt: async (prompt: Omit<Prompt, 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'views_count'>): Promise<Prompt> => {
    const { data, error } = await supabase
      .from('prompts')
      .insert(prompt)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // User profiles
  getUserProfile: async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  },

  updateUserProfile: async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Likes
  toggleLike: async (userId: string, promptId: string): Promise<boolean> => {
    // Check if like exists
    const { data: existingLike } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', userId)
      .eq('prompt_id', promptId)
      .single()

    if (existingLike) {
      // Remove like
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', userId)
        .eq('prompt_id', promptId)
      
      if (error) throw error
      return false
    } else {
      // Add like
      const { error } = await supabase
        .from('likes')
        .insert({ user_id: userId, prompt_id: promptId })
      
      if (error) throw error
      return true
    }
  },

  getUserLikes: async (userId: string): Promise<string[]> => {
    const { data, error } = await supabase
      .from('likes')
      .select('prompt_id')
      .eq('user_id', userId)

    if (error) throw error
    return data?.map(like => like.prompt_id) || []
  }
}