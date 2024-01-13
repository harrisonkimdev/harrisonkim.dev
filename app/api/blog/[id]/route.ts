import { NextResponse, type NextRequest } from 'next/server'
import { connectToDB } from '@/utils/db'
import Blog from '@/models/blog'

export const GET = async (
    req: NextRequest, { params }: { params: { id: string } }
) => {
  try {
    await connectToDB()

    const { searchParams } = new URL(req.url)
    const readOnly = searchParams.get('readOnly')

    const blog = await Blog.findOne({ _id: params.id })

    // var viewCount

    // if (readOnly === 1) {
    //   // 
    // }

    return NextResponse.json({ blog }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 })
  }
}

export const PATCH = async (
  req: NextRequest, { params }: { params: { id: string } }
) => {
  const { title, content } = await req.json()

  try {
    await connectToDB()

    const blog = await Blog.findByIdAndUpdate({ _id:params.id }, {
      title,
      content,
      updatedAt: Date.now()
    })

    return NextResponse.json(blog, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 })
  }
}

export const DELETE = async (
  req: NextRequest, { params }: { params: { id: string} }
) => {
  try {
    await connectToDB()

    const result = await Blog.deleteOne({ _id: params.id })

    if (result.acknowledged === true) {
      return NextResponse.json({ message: 'Post deleted.' }, { status: 200 })
    } else {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 })
    }
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 })
  }
}