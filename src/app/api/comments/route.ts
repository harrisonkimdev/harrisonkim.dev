import { NextResponse, type NextRequest } from 'next/server'
import blog from '@/models/blog'

export async function POST(req: NextRequest) {
  const data = await req.json()

  if (data.wrtier.length === 0 ||
      data.comments.length === 0 ||
      data.password.length === 0
  ) {
    return NextResponse.json({ message: 'Invalid input.' }, { status: 400 })
  }

  await blog.findOneAndUpdate(
    { _id: data.blogId },
    { $push: {
      comments: {
        writer: data.writer,
        comment: data.comment,
        password: data.password,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
    }},
    { new: true }
  )
  .then(updatedDocument => {
    if (updatedDocument) {
      console.log('A new comment is added to a blog:', updatedDocument)
    } else {
      console.log('Blog not found.')
    }
  })
  .catch(error => {
    console.error('Error updating mainDocument:', error)
  })
  
  return NextResponse.json({ message: 'Your comment is added.' }, { status: 200 })
}