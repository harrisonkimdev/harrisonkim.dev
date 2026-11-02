import { NextResponse, type NextRequest } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { apiError, blogInput, documentId, readJson } from '@/lib/api'
import { deleteBlog, getBlog, updateBlog } from '@/lib/blogs-store'

type Context = { params: Promise<{ id: string }> }
const notFound = () => NextResponse.json({ message: 'Blog post not found.' }, { status: 404 })

export async function GET(_request: NextRequest, { params }: Context) {
  try {
    const blog = await getBlog(documentId((await params).id))
    return blog ? NextResponse.json({ blog }) : notFound()
  } catch (error) { return apiError(error, 'Unable to load blog post.') }
}

export async function PATCH(request: NextRequest, { params }: Context) {
  const unauthorized = await requireAdmin(request)
  if (unauthorized) return unauthorized
  try {
    const updated = await updateBlog(documentId((await params).id), blogInput(await readJson(request)))
    return updated ? NextResponse.json({ message: 'Blog post updated successfully.' }) : notFound()
  } catch (error) { return apiError(error, 'Unable to update blog post.') }
}

export async function DELETE(request: NextRequest, { params }: Context) {
  const unauthorized = await requireAdmin(request)
  if (unauthorized) return unauthorized
  try {
    const deleted = await deleteBlog(documentId((await params).id))
    return deleted ? NextResponse.json({ message: 'Blog post deleted successfully.' }) : notFound()
  } catch (error) { return apiError(error, 'Unable to delete blog post.') }
}
