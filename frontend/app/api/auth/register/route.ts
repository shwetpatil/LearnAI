import { NextRequest, NextResponse } from 'next/server'

const BACKEND_API_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch(`${BACKEND_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    })

    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const data = await response.json()
      return NextResponse.json(data, { status: response.status })
    }

    const text = await response.text()
    return NextResponse.json(
      { message: text || 'Registration request failed' },
      { status: response.status }
    )
  } catch (error) {
    console.error('Auth register proxy error:', error)
    return NextResponse.json(
      { message: 'Unable to reach authentication service' },
      { status: 502 }
    )
  }
}
