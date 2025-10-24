import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/lib/supabase'

export async function GET() {
  try {
    const categories = await api.getCategories()
    return NextResponse.json({ success: true, data: categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}