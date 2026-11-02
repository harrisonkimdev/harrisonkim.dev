/** @jest-environment node */
import { authenticateAdmin } from '@/lib/admin-credentials'

const originalPassword = process.env.ADMIN_PASSWORD
beforeEach(() => { process.env.ADMIN_PASSWORD = 'test-only-admin-password' })
afterEach(() => {
  if (originalPassword === undefined) delete process.env.ADMIN_PASSWORD
  else process.env.ADMIN_PASSWORD = originalPassword
})

it('accepts the configured owner password without a network request', async () => {
  expect(await authenticateAdmin('test-only-admin-password')).toEqual({
    id: '1', name: 'Harrison Kim', email: 'harrisonkimdev@gmail.com',
  })
})

it.each(['wrong-password', '', undefined, { password: 'test-only-admin-password' }])('rejects invalid credentials %p', async password => {
  expect(await authenticateAdmin(password)).toBeNull()
})

it('fails closed when the server password is missing', async () => {
  delete process.env.ADMIN_PASSWORD
  expect(await authenticateAdmin('test-only-admin-password')).toBeNull()
})
