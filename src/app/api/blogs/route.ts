import { NextResponse, type NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { connectToDB } from '@/lib/db'
import { Session } from 'next-auth'
import Blog from '@/models/blog'
import { authOptions } from '@/lib/auth'

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
  const searchQuery = searchParams.get('query')
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const tag = searchParams.get('tag')
  return { searchQuery, pageSize, page, tag }
}

const buildQuery = (searchQuery: string | null, tag: string | null) => {
  const query: any = {}
  
  if (searchQuery) {
    const regexQuery = new RegExp(searchQuery, 'i')
    query.$or = [
      { title: { $regex: regexQuery } },
      { content: { $regex: regexQuery } },
      { tags: { $in: [regexQuery] } },
    ]
  }
  
  if (tag) {
    query.tags = { $in: [tag] }
  }

  return query
}

export const GET = async (req: NextRequest) => {
  const { searchQuery, pageSize, page, tag } = parseRequestParams(req)

  try {
    await connectToDatabase()
    const query = buildQuery(searchQuery, tag)

    const totalBlogs = await Blog.countDocuments(query)
    
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean()

    const totalPages = Math.ceil(totalBlogs / pageSize)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    console.log('Retrieved blog posts.')
    return NextResponse.json({
      blogs,
      pagination: {
        total: totalBlogs,
        totalPages,
        currentPage: page,
        pageSize,
        hasNextPage,
        hasPrevPage,
      }
    }, { status: 200 })
  } catch (err: any) {
    console.error('Error retrieving blog posts:', err.message)
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions)
  checkAuthorization(session)

  try {
    const { title, content, tags } = await req.json()
    console.log('Received input:', { title, content, tags })

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    await connectToDatabase()

    const newBlog = new Blog({
      title,
      content,
      tags: tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await newBlog.save()
    console.log('New blog post created:', newBlog)
    return NextResponse.json({ message: 'Blog post created successfully', blog: newBlog }, { status: 201 })
  } catch (err: any) {
    console.error('Error creating blog post:', err.message)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}

// Cache control
export const dynamic = 'force-dynamic'
