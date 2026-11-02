/** @jest-environment node */
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { createBlog, updateBlog, deleteBlog } from '@/lib/blogs-store'
import { POST } from '@/app/api/blogs/route'
import { PATCH, DELETE } from '@/app/api/blogs/[id]/route'

jest.mock('next-auth/jwt', () => ({ getToken: jest.fn() }))
jest.mock('@/lib/blogs-store', () => ({ createBlog: jest.fn(), updateBlog: jest.fn(), deleteBlog: jest.fn() }))

const token = jest.mocked(getToken)
const context = { params: Promise.resolve({ id: 'blog-id' }) }

beforeEach(() => jest.clearAllMocks())

const mutations = [
  ['POST', () => POST(new NextRequest('http://localhost/api/blogs', { method: 'POST', body: '{}' }))],
  ['PATCH', () => PATCH(new NextRequest('http://localhost/api/blogs/blog-id', { method: 'PATCH', body: '{}' }), context)],
  ['DELETE', () => DELETE(new NextRequest('http://localhost/api/blogs/blog-id', { method: 'DELETE' }), context)],
] as const

describe.each(mutations)('%s blog authorization', (_method, mutate) => {
  it('rejects anonymous requests before parsing input or accessing the database', async () => {
    token.mockResolvedValue(null)
    const response = await mutate()
    expect(response.status).toBe(403)
    expect(createBlog).not.toHaveBeenCalled()
    expect(updateBlog).not.toHaveBeenCalled()
    expect(deleteBlog).not.toHaveBeenCalled()
  })

  it('rejects authenticated users who are not the owner', async () => {
    token.mockResolvedValue({ email: 'other@example.com' })
    expect((await mutate()).status).toBe(403)
    expect(createBlog).not.toHaveBeenCalled()
    expect(updateBlog).not.toHaveBeenCalled()
    expect(deleteBlog).not.toHaveBeenCalled()
  })
})

it('allows the owner to update a blog using promised route params', async () => {
  token.mockResolvedValue({ email: 'harrisonkimdev@gmail.com' })
  jest.mocked(updateBlog).mockResolvedValue(true)
  const request = new NextRequest('http://localhost/api/blogs/blog-id', {
    method: 'PATCH', body: JSON.stringify({ title: 'Updated', content: '<p>Content</p>', tags: [] }),
  })
  expect((await PATCH(request, context)).status).toBe(200)
  expect(updateBlog).toHaveBeenCalledWith('blog-id', expect.objectContaining({ title: 'Updated' }))
})
