/** @jest-environment node */
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { listMessages, saveMessage, markMessage } from '@/lib/messages-store'
import { GET, POST } from '@/app/api/contact/route'
import { PATCH } from '@/app/api/contact/[id]/route'

jest.mock('next-auth/jwt', () => ({ getToken: jest.fn() }))
jest.mock('@/lib/messages-store', () => ({ listMessages: jest.fn(), saveMessage: jest.fn(), markMessage: jest.fn() }))
beforeEach(() => jest.clearAllMocks())
const request = (body: unknown) => new NextRequest('http://localhost/api/contact', { method: 'POST', body: JSON.stringify(body) })

it.each([{}, { name: 'Visitor', email: 'not-email', message: 'Hello' }, { name: {}, email: 'valid@example.com', message: 'Hello' }])('rejects invalid contact input before storing data', async body => {
  expect((await POST(request(body))).status).toBe(400)
  expect(saveMessage).not.toHaveBeenCalled()
})

it('stores contact messages without sending an email', async () => {
  jest.mocked(saveMessage).mockResolvedValue('message-id')
  const body = { name: 'Visitor', email: 'visitor@example.com', message: 'A question' }
  const response = await POST(request(body))
  expect(response.status).toBe(201)
  expect(await response.json()).toEqual({ success: true, id: 'message-id' })
  expect(saveMessage).toHaveBeenCalledWith(body)
})

it('does not expose the inbox to anonymous visitors', async () => {
  jest.mocked(getToken).mockResolvedValue(null)
  expect((await GET(new NextRequest('http://localhost/api/contact'))).status).toBe(403)
  expect(listMessages).not.toHaveBeenCalled()
})

it('does not allow an anonymous caller to change read status', async () => {
  jest.mocked(getToken).mockResolvedValue(null)
  expect((await PATCH(request({ read: true }), { params: Promise.resolve({ id: 'message-id' }) })).status).toBe(403)
  expect(markMessage).not.toHaveBeenCalled()
})
