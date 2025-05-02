import { NextResponse, type NextRequest } from 'next/server'
import { connectToDB } from '@/lib/db'
import Blog from '@/models/blog'
import { IComment } from '@/interfaces'

export async function DELETE(
  req: NextRequest, { params }: { params: { id: string } }
) {
  const searchParams = req.nextUrl.searchParams
  const blogId = searchParams.get('blogId')

  if (params.id && blogId) {
    try {
      await connectToDB()

      const blog = await Blog.findOne({ _id: blogId })

      if (!blog) {
        console.log('Blog not found.')
        return NextResponse.json({ message: 'Blog not found.' }, { status: 404 })
      }

      const commentIndex = blog.comments.findIndex((comment: IComment) => {
        return comment._id.toString() === params.id
      })
     
      if (commentIndex === -1) {
        console.log('Comment not found.')
        return NextResponse.json({ message: 'Comment not found.' }, { status: 404 })
      }

      blog.comments.splice(commentIndex, 1)

      await blog.save()

      console.log('Comment deleted successfully.')
      return NextResponse.json({ message: 'Comment deleted successfully.' }, { status: 200 })
    } catch (err: any) {
      return NextResponse.json(err.message, { status: 500 })
    }
  }
}