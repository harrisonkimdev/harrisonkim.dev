import { NextResponse } from 'next/server'
import { connectToDB } from '@/utils/db'
import Guestbook from '@/models/guestbook'

// show
export const GET = async (req, { params }) => {
  try {
    await connectToDB()

    const { searchParams } = new URL(req.url)
    const readOnly = searchParams.get('readOnly')

    const guestbook = await Guestbook.findOne({ _id: params.id })

    // var viewCount

    // if (readOnly === 1) {
    //   // 
    // }

    return NextResponse.json(guestbook, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 })
  }
}

// update
export const PATCH = async (req, { params }) => {
  const { title, content } = await req.json()

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
export const DELETE = async (req, { params }) => {
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