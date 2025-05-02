import { NextResponse, type NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { connectToDB } from '@/lib/db'
import { Session } from 'next-auth'
import Blog from '@/models/blog'
import { authOptions } from '@/lib/auth'

const connectToDatabase = async () => {
  try {
    await connectToDB()
    console.log('Connected to the database.')
  } catch (err: any) {
    console.error('Error connecting to the database:', err.message)
    throw new Error('Database connection error')
  }
}

const checkAuthorization = (session: Session | null) => {
  if (!session || session.user?.email !== 'harrisonkimdev@gmail.com') {
    console.error('Unauthorized access attempt.')
    return NextResponse.json({ message: 'You are not allowed to perform this action.' }, { status: 403 })
  }
}

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDatabase()
    const blog = await Blog.findOne({ _id: params.id })

    if (blog) {
      console.log('Blog post retrieved successfully.')
      return NextResponse.json({ blog }, { status: 200 })
    } else {
      console.error('Blog post not found.')
      return NextResponse.json({ message: 'Blog post not found.' }, { status: 404 })
    }
  } catch (err: any) {
    console.error('Error retrieving blog post:', err.message)
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const session = await getServerSession()
  checkAuthorization(session)

  const { title, content, tags } = await req.json()
  if (!title) {
    return NextResponse.json({ message: 'Invalid input: missing title.' }, { status: 400 })
  }

  try {
    await connectToDatabase()
    const updatedBlog = await Blog.findByIdAndUpdate(
      params.id,
      { title, content, tags, updatedAt: Date.now() },
      { new: true }
    )

    if (updatedBlog) {
      console.log('Blog post updated successfully.')
      return NextResponse.json({ message: 'Blog post updated successfully.' }, { status: 200 })
    } else {
      console.error('Blog post not found.')
      return NextResponse.json({ message: 'Blog post not found.' }, { status: 404 })
    }
  } catch (err: any) {
    console.error('Error updating blog post:', err.message)
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const session = await getServerSession()
  checkAuthorization(session)

  try {
    await connectToDatabase()
    const deletedBlog = await Blog.deleteOne({ _id: params.id })

    if (deletedBlog.deletedCount > 0) {
      console.log('Blog post deleted successfully.')
      return NextResponse.json({ message: 'Blog post deleted successfully.' }, { status: 200 })
    } else {
      console.error('Blog post not found.')
      return NextResponse.json({ message: 'Blog post not found.' }, { status: 404 })
    }
  } catch (err: any) {
    console.error('Error deleting blog post:', err.message)
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
