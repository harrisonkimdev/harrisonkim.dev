import { NextResponse } from 'next/server'
import { connectToDB } from '@/utils/db'
import bcrypt from 'bcryptjs' // Ensure correct import
import { signJwtAccessToken } from '@/utils/jwt'

export const POST = async (req: Request) => {
  const body = await req.json()

  try {
    await connectToDB()
    const { password } = body

    // no valid password provided
    if (!password) {
      return NextResponse.json({ message: 'Missing password input.' }, { status: 400 })
    }

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 })
    }

    const salt = await bcrypt.genSalt()
    const systemPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt)

    const isMatch = await bcrypt.compare(password, systemPassword)
    if (!isMatch) return NextResponse.json({ error: 'Password doesn\'t match.' }, { status: 401 })

    const userData = {
      name: 'Harrison Kim',
      email: 'harrisonkimdev@gmail.com',
    }

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