import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    
    const { data: prompt, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', params.id)
      .eq('is_public', true)
      .single()

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: prompt })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch prompt' },
      { status: 500 }
    )
  }
}
