import { NextResponse } from 'next/server'
import { connectToDB } from '@/utils/db'
import Guestbook from '@/models/guestbook'
import { IGuestbook } from '@/guestbooks/interfaces';

// show
export const GET = async (req: Request, { params } : { params: { id: string }; }) => {
  try {
    await connectToDB()

    const query = Guestbook.where({ _id: params.id })
    const guestbook = await query.findOne()

    return NextResponse.json(guestbook, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 })
  }
}

// update
export const PATCH = async (req: Request, { params }: { params: { id: string }}) => {
  const { title, content, updatedAt } = await req.json()

  try {
    await connectToDB()

    const guestbook = await Guestbook.findByIdAndUpdate({ _id:params.id }, {
      title,
      content,
      updatedAt: Date.now()
    })

    return NextResponse.json(guestbook, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 })
  }
}

// delete
export const DELETE = async (req: Request, { params }: { params: { id: string }} ) => {
  try {
    await connectToDB()

    const result = await Guestbook.deleteOne({ _id: params.id })

    if (result.acknowledged === true) {
      return NextResponse.json({ message: 'Post deleted.' }, { status: 200 })
    } else {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 })
    }
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 })
  }
}