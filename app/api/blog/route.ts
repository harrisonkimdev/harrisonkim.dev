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

  // Retrieve blog posts.
  try {
    const blog = await Blog.find();

    // pagination
    // const currentPage: (string | null) = req.nextUrl.searchParams.get('currentPage')
    // const query = Blog.find()
    // query.skip(10*(Number(currentPage)-1)).limit(10)
    // const blog = await query.exec()
    
    // TODO: find a way to merge the following operation into the upper one. 
    // const lengthQuery = Blog.find()
    // const lastPage = Math.ceil((await lengthQuery.estimatedDocumentCount())/10)

    // return NextResponse.json({ blog, lastPage }, { status: 200 })
    
    console.log('Retrieved blog posts.');
    return NextResponse.json({ blog }, { status: 200 });
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