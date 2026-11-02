import { NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/admin-credentials'
import { signJwtAccessToken } from '@/lib/jwt'

export const POST = async (req: Request) => {
  const body = await req.json()

  try {
    const { password } = body

    // no valid password provided
    if (!password) {
      return NextResponse.json({ message: 'Missing password input.' }, { status: 400 })
    }

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 })
    }

    const userData = await authenticateAdmin(password)
    if (!userData) return NextResponse.json({ error: 'Password does not match.' }, { status: 401 })

    // No user data available at the moment.
    const accessToken = signJwtAccessToken(userData)

    return NextResponse.json({
      accessToken,
      ...userData
    }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}