import { NextResponse, type NextRequest } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { apiError, documentId, readJson, RequestError } from '@/lib/api'
import { markMessage } from '@/lib/messages-store'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin(request)
  if (unauthorized) return unauthorized
  try {
    const data = await readJson(request)
    if (typeof data.read !== 'boolean') throw new RequestError('Invalid read status.')
    const updated = await markMessage(documentId((await params).id), data.read)
    return updated ? NextResponse.json({ success: true }) : NextResponse.json({ message: 'Message not found.' }, { status: 404 })
  } catch (error) { return apiError(error, 'Unable to update message.') }
}
