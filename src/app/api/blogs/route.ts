import { NextResponse, type NextRequest } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { apiError, blogInput, readJson, RequestError } from '@/lib/api'
import { createBlog, listBlogs } from '@/lib/blogs-store'

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams
    const query = params.get('query') ?? ''
    const tag = params.get('tag') ?? ''
    const page = Number(params.get('page') ?? '1')
    const pageSize = Number(params.get('pageSize') ?? '10')
    if (!Number.isInteger(page) || page < 1 || page > 10000 || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 50 || query.length > 200 || tag.length > 100) {
      throw new RequestError('Invalid pagination or search parameters.')
    }
    return NextResponse.json(await listBlogs({ query, tag, page, pageSize }))
  } catch (error) { return apiError(error, 'Unable to load blog posts.') }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request)
  if (unauthorized) return unauthorized
  try {
    const blog = await createBlog(blogInput(await readJson(request)))
    return NextResponse.json({ message: 'Blog post created successfully.', blog }, { status: 201 })
  } catch (error) { return apiError(error, 'Unable to create blog post.') }
}

export const dynamic = 'force-dynamic'
