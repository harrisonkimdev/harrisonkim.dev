import { NextResponse, type NextRequest } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { apiError, readJson, RequestError, stringField } from '@/lib/api'
import { listMessages, saveMessage } from '@/lib/messages-store'

export async function POST(request: Request) {
  try {
    const data = await readJson(request)
    const name = stringField(data, 'name', 200)
    const email = stringField(data, 'email', 254)
    const message = stringField(data, 'message', 10000)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new RequestError('Please enter a valid email address.')
    const id = await saveMessage({ name, email, message })
    return NextResponse.json({ success: true, id }, { status: 201 })
  } catch (error) { return apiError(error, 'Unable to save message. Please try again later.') }
}

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request)
  if (unauthorized) return unauthorized
  try {
    return NextResponse.json({ messages: await listMessages() })
  } catch (error) { return apiError(error, 'Unable to load messages.') }
}
