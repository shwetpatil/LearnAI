import { NextRequest, NextResponse } from 'next/server'

const BACKEND_API_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const contentType = request.headers.get('content-type') || ''

    let message = ''
    let conversationId: string | undefined
    let userId: string | undefined

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      message = String(formData.get('message') || '')
      conversationId = formData.get('conversationId')?.toString()
      userId = formData.get('userId')?.toString()
    } else {
      const body = await request.json()
      message = body?.message || ''
      conversationId = body?.conversationId
      userId = body?.userId
    }

    const payload = {
      message,
      conversationId,
      userId,
    }

    const response = await fetch(`${BACKEND_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    const responseContentType = response.headers.get('content-type') || ''
    if (responseContentType.includes('application/json')) {
      const data = await response.json()
      return NextResponse.json(data, { status: response.status })
    }

    const text = await response.text()
    return NextResponse.json(
      { message: text || 'Chat request failed' },
      { status: response.status }
    )
  } catch (error) {
    console.error('Chat proxy error:', error)
    return NextResponse.json(
      { message: 'Unable to reach chat service' },
      { status: 502 }
    )
  }
}
