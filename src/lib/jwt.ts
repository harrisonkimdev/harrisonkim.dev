import jwt, { type SignOptions } from 'jsonwebtoken'

const DEFAULT_SIGN_OPTION: SignOptions = {
  expiresIn: '30m',
}

export function signJwtAccessToken(payload: Record<string, unknown>, options: SignOptions = DEFAULT_SIGN_OPTION) {
  const secret_key = process.env.ACCESS_TOKEN_SECRET
  if (secret_key) {
    const token = jwt.sign(payload, secret_key, options)
    return token
  }
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.ACCESS_TOKEN_SECRET
    if (secret_key) {
      const decoded = jwt.verify(token, secret_key)
      return decoded
    }
  } catch (error) {
    console.log('err: ', error)
    return null
  }
}
