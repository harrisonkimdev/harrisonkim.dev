import { NextResponse, type NextRequest } from 'next/server'
import blog from '@/models/blog'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    if (!data.writer || !data.comment || !data.password) {
      return NextResponse.json({ message: 'Invalid input.' }, { status: 400 })
    }

    const updatedDocument = await blog.findOneAndUpdate(
      { _id: data.blogId },
      {
        $push: {
          comments: {
            writer: data.writer,
            comment: data.comment,
            password: data.password,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        }
      },
      { new: true }
    )

    if (updatedDocument) {
      console.log('A new comment is added to a blog:', updatedDocument)
      return NextResponse.json({ message: 'Your comment is added.' }, { status: 200 })
    } else {
      console.log('Blog not found with the given ID.')
      return NextResponse.json({ message: 'Blog not found.' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error adding a new comment - ', error)
    return NextResponse.json({ message: 'Internal Server Error ...' }, { status: 500 })
  }
}