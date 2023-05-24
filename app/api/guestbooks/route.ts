import { connectToDB } from '@/utils/db'
import Guestbook from '@/models/guestbook'

// index
export const GET = async (req: Request) => {
  try {
    await connectToDB()

    const guestbooks = await Guestbook.find()

    return new Response(JSON.stringify(guestbooks), {
      status: 200,
    })
  } catch (err) {
    // 
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

    return new Response(JSON.stringify(res), { status: 200 })
  } catch (err) {
    // 
  }
}