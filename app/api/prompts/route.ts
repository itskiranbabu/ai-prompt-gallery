import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined
    const search = searchParams.get('search') || undefined
    const featured = searchParams.get('featured') === 'true' || undefined
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    const prompts = await api.getPrompts({
      category,
      search,
      featured,
      limit
    })

    return NextResponse.json({ success: true, data: prompts })
  } catch (error) {
    console.error('Error fetching prompts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch prompts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.prompt_text) {
      return NextResponse.json(
        { success: false, error: 'Title and prompt text are required' },
        { status: 400 }
      )
    }

    const prompt = await api.createPrompt(body)
    return NextResponse.json({ success: true, data: prompt })
  } catch (error) {
    console.error('Error creating prompt:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create prompt' },
      { status: 500 }
    )
  }
}