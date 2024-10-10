import { NextResponse, type NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { connectToDB } from '@/utils/db'
import { Session } from 'next-auth'
import Blog from '@/models/blog'

let isConnected = false

const connectToDatabase = async () => {
  if (!isConnected) {
    try {
      await connectToDB()
      isConnected = true
      console.log('Connected to the database.')
    } catch (err: any) {
      console.error('Error connecting to the database:', err.message)
      throw new Error('Database connection error')
    }
  }
}

const checkAuthorization = (session: Session | null) => {
  if (!session || session.user?.email !== 'harrisonkimdev@gmail.com') {
    console.error('Unauthorized access attempt.')
    return NextResponse.json({ message: 'You are not allowed to perform this action.' }, { status: 403 })
  }
}

const parseRequestParams = (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const searchQuery = searchParams.get('searchQuery')
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
  const currentPage = parseInt(searchParams.get('currentPage') || '1', 10)
  return { searchQuery, pageSize, currentPage }
}

const buildQuery = (searchQuery: string | null) => {
  if (!searchQuery) return {}
  const regexQuery = new RegExp(searchQuery, 'i')
  return {
    $or: [
      { title: { $regex: regexQuery } },
      { content: { $regex: regexQuery } },
      { tags: { $in: [regexQuery] } },
    ],
  }
}

export const GET = async (req: NextRequest) => {
  const { searchQuery, pageSize, currentPage } = parseRequestParams(req)

  try {
    await connectToDatabase()
    const query = buildQuery(searchQuery)

    const [totalDocuments, blog] = await Promise.all([
      Blog.countDocuments(query),
      Blog.find(query)
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .exec(),
    ])

    const lastPage = Math.ceil(totalDocuments / pageSize)
    console.log('Retrieved blog posts.')
    return NextResponse.json({ blog, lastPage }, { status: 200 })
  } catch (err: any) {
    console.error('Error retrieving blog post:', err.message)
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  const session = await getServerSession()
  checkAuthorization(session)

  try {
    const { title, content, tags } = await req.json()
    console.log('Received input:', { title, content, tags })

    if (!title || title.length === 0) {
      return NextResponse.json(
        { message: 'Invalid input: missing title.' },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const newBlog = new Blog({
      title,
      content,
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await newBlog.save()
    console.log('New blog post created:', newBlog)
    return NextResponse.json({ message: 'New blog post created.' }, { status: 201 })
  } catch (err: any) {
    console.error('Error posting blog post:', err.message)
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
