import { NextResponse, type NextRequest } from 'next/server';
import { getServerSession } from "next-auth/next"
import { connectToDB } from '@/utils/db';
import Blog from '@/models/blog';

export const GET = async (
    req: NextRequest, { params }: { params: { id: string } }
) => {
  // Connect to the database.
  try {
    await connectToDB();
  } catch (err: any) {
    console.log('Having a problem connecting to the database.');
    return NextResponse.json({ message: err.message }, { status: 500 });
  }

  // Retrieve the blog with a given parameter.
  try {
    const blog = await Blog.findOne({ _id: params.id });
  
    console.log('Retrieved a blog post.');
    return NextResponse.json({ blog }, { status: 200 });
  } catch (err: any) {
    console.log('Having a problem retrieving a blog post.');
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export const PATCH = async (
  req: NextRequest, { params }: { params: { id: string } }
) => {
  // Check if the user is authroized.
  const session = await getServerSession();
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
    }, { status: 400});
  }

  // Connect to the database.
  try {
    await connectToDB();
  } catch (err: any) {
    console.log('Having a problem connecting to the database.');
    return NextResponse.json({ message: err.message }, { status: 500 });
  }

  // Update the blog post within the database.
  try {
    const updatedBlog = await Blog.findByIdAndUpdate({ _id: params.id }, {
      title,
      content,
      tags,
      updatedAt: Date.now()
    });

    if (updatedBlog) {
      console.log('The blog is updated.');
      return NextResponse.json({ message: 'The blog is updated.' }, { status: 200 });
    } else {
      console.log('Blog not found.');
      return NextResponse.json({ message: 'Blog not found.' }, { status: 404 });
    }
  } catch (err: any) {
    console.log('Having a problem updating a blog post.');
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export const DELETE = async (
  req: NextRequest, { params }: { params: { id: string } }
) => {
  // Check if the user is authroized.
  const session = await getServerSession()
  if (session && session.user?.email !== 'harrisonkimdev@gmail.com') {
    console.log('Unauthroized.');
    return NextResponse.json({
      message: 'You are not allowed to post a new blog.'
    }, { status: 403 });
  }

  // Connect to the database.
  try {
    await connectToDB();
  } catch (err: any) {
    console.log('Having a problem connecting to the database.');
    return NextResponse.json({ message: err.message }, { status: 500 });
  }

  // Delete the blog post from the database.
  try {
    const deletedBlog = await Blog.deleteOne({ _id: params.id })

    if (deletedBlog) {
      console.log('The blog is deleted.');
      return NextResponse.json({ message: 'The blog is deleted.' }, { status: 200 });
    } else {
      console.log('Blog not found.');
      return NextResponse.json({ message: 'Blog not found.' }, { status: 404 });
    }
  } catch (err: any) {
    console.log('Having a problem deleting a blog post.');
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}