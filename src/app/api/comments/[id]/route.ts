import { NextResponse, type NextRequest } from 'next/server'
import { apiError, documentId, readJson, RequestError, stringField } from '@/lib/api'
import { deleteComment } from '@/lib/blogs-store'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const blogId = request.nextUrl.searchParams.get('blogId')
    if (!blogId) throw new RequestError('Missing blogId.')
    const password = stringField(await readJson(request), 'password', 72)
    const result = await deleteComment(documentId(blogId), documentId((await params).id), password)
    if (result === 'not_found') return NextResponse.json({ message: 'Comment not found.' }, { status: 404 })
    if (result === 'forbidden') return NextResponse.json({ message: 'Password does not match.' }, { status: 403 })
    return NextResponse.json({ message: 'Comment deleted successfully.' })
  } catch (error) { return apiError(error, 'Unable to delete comment.') }
}
