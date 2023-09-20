import { NextResponse } from 'next/server'
import { connectToDB } from '@/utils/db'
import Guestbook from '@/models/guestbook'

// index
export const GET = async (req) => {
  try {
    await connectToDB()

    const { searchParams } = new URL(req.url)
    const currentPage = searchParams.get('currentPage')

    const query = Guestbook.find()
    query.skip(10*(currentPage-1)).limit(10)
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
export const POST = async (req) => {
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