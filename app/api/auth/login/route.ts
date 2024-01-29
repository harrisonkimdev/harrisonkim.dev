import { NextResponse } from 'next/server'
import { connectToDB } from '@/utils/db'
import * as bcrypt from "bcryptjs"
import { signJwtAccessToken } from '@/utils/jwt'

export const POST = async (req: Request) => {
  const body = await req.json()

  try {
    await connectToDB()
    const { password } = body

    console.log("password: ", password)

    // no valid password provided
    if (!password) {
      return NextResponse.json({ message: 'Missing password input.' }, { status: 400 })
    }

    const salt = await bcrypt.genSalt()
    
    if (process.env.ADMIN_PASSWORD) {
      const systemPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt)

      const isMatch = await bcrypt.compare(password, systemPassword)
      if (!isMatch) return NextResponse.json({ error: "Password doesn't match." }, { status: 401 })

      // No user data available at the moment.
      const accessToken = signJwtAccessToken({})
      console.log("token: ", accessToken)

      return NextResponse.json({ accessToken }, { status: 200 })
    }
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}