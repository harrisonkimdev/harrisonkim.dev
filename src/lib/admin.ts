import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'

export async function requireAdmin(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  if (token?.email !== 'harrisonkimdev@gmail.com') {
    return NextResponse.json(
      { message: 'You are not allowed to perform this action.' },
      { status: 403 },
    )
  }
}
