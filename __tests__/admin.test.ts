/** @jest-environment node */
import { encode } from 'next-auth/jwt'
import { NextRequest } from 'next/server'
import { requireAdmin } from '@/lib/admin'

const originalSecret = process.env.NEXTAUTH_SECRET
const originalUrl = process.env.NEXTAUTH_URL
beforeEach(() => {
  process.env.NEXTAUTH_SECRET = 'test-only-session-secret'
  process.env.NEXTAUTH_URL = 'http://localhost:3000'
})
afterEach(() => {
  if (originalSecret === undefined) delete process.env.NEXTAUTH_SECRET
  else process.env.NEXTAUTH_SECRET = originalSecret
  if (originalUrl === undefined) delete process.env.NEXTAUTH_URL
  else process.env.NEXTAUTH_URL = originalUrl
})

it('accepts a valid encrypted owner session', async () => {
  const token = await encode({ token: { email: 'harrisonkimdev@gmail.com' }, secret: process.env.NEXTAUTH_SECRET! })
  const request = new NextRequest('http://localhost/api/blogs', { headers: { authorization: `Bearer ${token}` } })
  expect(await requireAdmin(request)).toBeUndefined()
})

it('rejects a forged session', async () => {
  const token = await encode({ token: { email: 'harrisonkimdev@gmail.com' }, secret: 'wrong-secret' })
  const request = new NextRequest('http://localhost/api/blogs', { headers: { authorization: `Bearer ${token}` } })
  expect((await requireAdmin(request))?.status).toBe(403)
})

it('accepts the owner session cookie used by the browser', async () => {
  const token = await encode({ token: { email: 'harrisonkimdev@gmail.com' }, secret: process.env.NEXTAUTH_SECRET! })
  const request = new NextRequest('http://localhost/api/blogs', { headers: { cookie: `next-auth.session-token=${token}` } })
  expect(await requireAdmin(request)).toBeUndefined()
})

it('accepts secure session cookies on HTTPS deployments', async () => {
  process.env.NEXTAUTH_URL = 'https://example.com'
  const token = await encode({ token: { email: 'harrisonkimdev@gmail.com' }, secret: process.env.NEXTAUTH_SECRET! })
  const request = new NextRequest('https://example.com/api/blogs', { headers: { cookie: `__Secure-next-auth.session-token=${token}` } })
  expect(await requireAdmin(request)).toBeUndefined()
})
