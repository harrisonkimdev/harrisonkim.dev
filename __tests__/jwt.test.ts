/** @jest-environment node */
import jwt from 'jsonwebtoken'
import { signJwtAccessToken, verifyJwt } from '@/lib/jwt'

describe('access tokens', () => {
  const originalSecret = process.env.ACCESS_TOKEN_SECRET

  beforeEach(() => {
    process.env.ACCESS_TOKEN_SECRET = 'test-only-access-token-secret'
  })

  afterEach(() => {
    if (originalSecret === undefined) delete process.env.ACCESS_TOKEN_SECRET
    else process.env.ACCESS_TOKEN_SECRET = originalSecret
  })

  it('signs a verifiable token that expires in 30 minutes', () => {
    const token = signJwtAccessToken({ email: 'admin@example.com' })
    expect(token).toBeDefined()
    const payload = verifyJwt(token!) as jwt.JwtPayload
    expect(payload.email).toBe('admin@example.com')
    expect(payload.exp! - payload.iat!).toBe(30 * 60)
  })

  it('honors explicit expiration options', () => {
    const token = signJwtAccessToken({ id: 'admin' }, { expiresIn: 60 })
    const payload = verifyJwt(token!) as jwt.JwtPayload
    expect(payload.exp! - payload.iat!).toBe(60)
  })

  it('does not issue a token without a configured secret', () => {
    delete process.env.ACCESS_TOKEN_SECRET
    expect(signJwtAccessToken({ id: 'admin' })).toBeUndefined()
  })
})
