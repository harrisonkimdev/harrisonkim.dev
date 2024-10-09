import { NextResponse, type NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { connectToDB } from '@/utils/db'
import Blog from '@/models/blog'

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get('searchQuery');
  const pageSize = searchParams.get('pageSize') || '10';
  const currentPage = searchParams.get('currentPage') || '1';

  console.log('GET request received with searchQuery:', searchQuery);

  // Connect to the database.
  try {
    await connectToDB();
    console.log('Connected to the database.');
  } catch (err: any) {
    console.error('Error connecting to the database:', err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }

  // Retrieve blog posts.
  try {
    let query = {}

    // Retrieve blog posts containing the search query.
    if (searchQuery) {
      const regexQuery = new RegExp(searchQuery, 'i')
      query = {
        $or: [
          { title: { $regex: regexQuery } },
          { content: { $regex: regexQuery } },
          { tags: { $in: [regexQuery] } }
        ]
      }
    }

    const [totalDocuments, blog] = await Promise.all([
      Blog.countDocuments(query),
      Blog.find(query)
        .skip(Number(pageSize) * (Number(currentPage) - 1))
        .limit(Number(pageSize))
        .exec()
    ])

    const lastPage = Math.ceil(totalDocuments / Number(pageSize))
    
    console.log('Retrieved blog posts.')
    return NextResponse.json({ blog, lastPage }, { status: 200 })
  } catch (err: any) {
    console.log('Having a problem retrieving blog posts.')
    return NextResponse.json({ message: err.message }, { status: 500 })
  }  
}

export const POST = async (req: NextRequest) => {
  // Check if the user is authroized.
  const session = await getServerSession()
  if (session && session.user?.email !== 'harrisonkimdev@gmail.com') {
    console.log('Unauthroized.')
    return NextResponse.json({
      message: 'You are not allowed to post a new blog.'
    }, { status: 403 })
  }

  // Retrieve input parameters from the request.
  let title, content, tags;
  try {
    ({ title, content, tags } = await req.json());
    console.log('Received input:', { title, content, tags });
  } catch (err: any) {
    console.error('Error parsing request body:', err.message);
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  // Validate input.
  if (!title || title.length === 0) {
    return NextResponse.json({
      message: 'Invalid input: missing title.'
    }, { status: 400 });
  }

  // Connect to the database.
  try {
    await connectToDB();
    console.log('Connected to the database.');
  } catch (err: any) {
    console.error('Error connecting to the database:', err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }

  // Create a new blog post.
  try {
    const newBlog = new Blog({
      title,
      content,
      tags,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await newBlog.save();
    console.log('New blog post created:', newBlog);
    return NextResponse.json({ message: 'New blog post created.' }, { status: 201 });
  } catch (err: any) {
    console.error('Error creating a new blog post:', err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}