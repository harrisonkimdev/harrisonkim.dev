import { NextResponse } from 'next/server'
import { connectToDB } from '@/utils/db'
import Guestbook from '@/models/guestbook'

// index
export const GET = async (req: Request) => {
  try {
    await connectToDB()

    const guestbooks = await Guestbook.find()

    return NextResponse.json(guestbooks, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 })
  }
}

// store
export const POST = async (req: Request) => {
  const { title, content, writer, password } = await req.json()

  try {
    await connectToDB()

    // TODO: hash the password
    const newGuestbook = new Guestbook({
      title,
      content,
      writer,
      password,
    })

    const res = await newGuestbook.save()

    return NextResponse.json({ message: 'Successfully posted.' }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 })
  }
}