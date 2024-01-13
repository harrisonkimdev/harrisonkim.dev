'use client'

import React, { use, useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { FaAngleLeft } from "react-icons/fa6";

import { IBlog } from '@/interfaces';

import Comments from '../components/Comments';


const BlogShow = ({ params }: { params: { id: string } }) => {
    const [blog, setBlog] = useState<IBlog | undefined>(undefined)

    useEffect(() => {
        fetchBlog(params.id)
    }, [])
    
    const fetchBlog = async (id: string) => {
        try {
            const res = await fetch(`/api/blog/${id}?readOnly=1`)
            const data = await res.json()
            setBlog(data.blog)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <Link href='/blog' className='w-min flex justify-between'>
                <FaAngleLeft className='rounded-md text-black hover:border' />
            </Link>

            {/* image and title */}
            <div className='mt-8 relative'>
                <Image 
                    src="https://placehold.co/600x400"
                    alt="Blog Image"
                    width={600}
                    height={400}
                    className='object-cover absolute h-[200px]'
                />

                <h1 className='
                    absolute top-0 left-0 right-0 z-10
                    h-[200px] m-0 ml-12 flex items-center
                    text-stone-800
                '>{ blog?.title }</h1>
            </div>

            {/* writer and created at */}
            <div className='pt-[215px] text-stone-600'>
                <p>{ blog?.createdAt.toString() }</p>
            </div>

            {/* content */}
            { blog && (
                <div dangerouslySetInnerHTML={{ __html: blog?.content }} className='pt-4 text-stone-600' />
            )}
            {/* <div dangerouslySetInnerHTML={{ __html: blog.content }}
                className='my-2 md:my-3 text-stone-600'
            /> */}

            {/* reply section */}
            <div className='mt-12'>
                <Comments
                    blogId={blog?._id} comments={blog?.comments}
                    fetchComments={() => fetchBlog(params.id)}
                />
            </div>
        </div>
    )
}

export default BlogShow