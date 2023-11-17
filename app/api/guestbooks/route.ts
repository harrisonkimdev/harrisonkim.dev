import { NextResponse, type NextRequest } from 'next/server'
import { connectToDB } from '@/utils/db'
import Guestbook from '@/models/guestbook'

// index
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()

    const currentPage: (string | null) = req.nextUrl.searchParams.get('currentPage')

    const query = Guestbook.find()
    query.skip(10*(Number(currentPage)-1)).limit(10)
    const guestbooks = await query.exec()
    
    // TODO: find a way to merge the following operation into the upper one. 
    const lengthQuery = Guestbook.find()
    const lastPage = Math.ceil((await lengthQuery.estimatedDocumentCount())/10)
    
    return NextResponse.json({ guestbooks, lastPage }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 })
  }
}

// store
export const POST = async (req: NextRequest) => {
  const { title, content, writer, password } = await req.json()

  try {
    await connectToDB()

    // TODO: hash the password
    await Guestbook.create({
      title,
      content,
      writer,
      password,
    })

    return NextResponse.json({ message: 'Successfully Posted.' }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 })
  }
}