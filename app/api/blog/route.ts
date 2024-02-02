import { NextResponse, type NextRequest } from 'next/server'
import { getServerSession } from "next-auth/next"
import { connectToDB } from '@/utils/db'
import Blog from '@/models/blog'

export const GET = async (req: NextRequest) => {
  // Connect to the database.
  try {
    await connectToDB();
  } catch (err: any) {
    console.log('Having a problem connecting to the database.');
    return NextResponse.json({ message: err.message }, { status: 500 });
  }

  const searchParams = req.nextUrl.searchParams;
  const currentPage = searchParams.get('currentPage');
  const pageSize = searchParams.get('pageSize');
  const searchQuery = searchParams.get('searchQuery');

  // Retrieve blog posts.
  try {
    let query = {}

    // Retrieve blog posts containing the search query.
    if (searchQuery) {
      const regexQuery = new RegExp(searchQuery, 'i');
      query = {
        $or: [
          { title: { $regex: regexQuery } },
          { content: { $regex: regexQuery } },
          { tags: { $in: [regexQuery] } }
        ]
      };
    }

    const [totalDocuments, blog] = await Promise.all([
      Blog.countDocuments(query),
      Blog.find(query)
        .skip(Number(pageSize) * (Number(currentPage) - 1))
        .limit(Number(pageSize))
        .exec()
    ])

    const lastPage = Math.ceil(totalDocuments / Number(pageSize));
    
    console.log('Retrieved blog posts.');
    return NextResponse.json({ blog, lastPage }, { status: 200 });
  } catch (err: any) {
    console.log('Having a problem retrieving blog posts.');
    return NextResponse.json({ message: err.message }, { status: 500 });
  }  
}

export const POST = async (req: NextRequest) => {
  // Check if the user is authroized.
  const session = await getServerSession()
  if (session && session.user?.email !== 'harrisonkimdev@gmail.com') {
    console.log('Unauthroized.');
    return NextResponse.json({
      message: 'You are not allowed to post a new blog.'
    }, { status: 403 });
  }

  // Retrieve input parameters from the request.
  const { title, content, tags } = await req.json();

  // Vaildate input.
  if (title.length === 0) {
    return NextResponse.json({
      message: "Invalid input: missing title." 
    }, { status: 400 });
  }

  // Connect to the database.
  try {
    await connectToDB();
  } catch (err: any) {
    console.log('Having a problem connecting to the database.');
    return NextResponse.json({ message: err.message }, { status: 500 });
  }

  // Store a new blog post into the database.
  try {
    const createdBlog = Blog.create({
      title,
      content,
      tags,
    });

    console.log('A new blog post has been created.');
    return NextResponse.json({ message: 'A new blog post has been created.' }, { status: 200 });
  } catch (err: any) {
    console.log('Having a problem storing a new blog post.');
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}