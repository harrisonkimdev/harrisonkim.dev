import { NextResponse, type NextRequest } from 'next/server'
import { apiError, documentId, readJson, stringField } from '@/lib/api'
import { addComment } from '@/lib/blogs-store'

export async function POST(request: NextRequest) {
  try {
    const data = await readJson(request)
    const blogId = documentId(stringField(data, 'blogId', 128))
    const created = await addComment(blogId, {
      writer: stringField(data, 'writer', 100), comment: stringField(data, 'comment', 10000), password: stringField(data, 'password', 72),
    })
    return created ? NextResponse.json({ message: 'Your comment is added.' }) : NextResponse.json({ message: 'Blog not found.' }, { status: 404 })
  } catch (error) { return apiError(error, 'Unable to add comment.') }
}
