import React from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { FaAngleLeft } from "react-icons/fa6";

import Comments from '../components/Comments';

const getBlog = async (id: string) => {
    // try {
    //     const res = await fetch(`${process.env.BASE_URL}/api/blogs/${id}?readOnly=1`)
    //     const blog = await res.json()
    //     return blog
    // } catch (err) {
    //     // 
    // }

    return {
        _id: '1',
        title: 'first blog title',
        content: 'first blog contentfirst blog contentfirst blog contentfirst blog contentfirst blog contentfirst blog contentfirst blog contentfirst blog contentfirst blog contentfirst blog contentfirst blog contentfirst blog content',
        password: 'first blog password',
        createdAt: 'created at',
        updatedAt: 'updated at',
    }
}

const BlogShow = async ({ params }: { params: { id: string } }) => {
    const blog = await getBlog(params.id)

    return (
        <div>
            <Link href='/blogs' className='w-min flex justify-between'>
                <FaAngleLeft className='rounded-md text-black hover:border' />
            </Link>

            {/* image and title */}
            <div className='mt-8 relative'>
                <Image 
                    src="/images/girl.png"
                    alt="Blog Image"
                    width={1688}
                    height={2388}
                    className='absolute h-[200px]'
                />

                <h1 className='
                    absolute top-0 left-0 right-0 z-10
                    h-[200px] m-0 ml-12 flex items-center
                    text-stone-800
                '>{ blog.title }</h1>
            </div>

            {/* writer and created at */}
            <div className='pt-[215px] text-stone-600'>
                <p>{ blog.createdAt }</p>
            </div>

            {/* content */}
            <div className='pt-4 text-stone-600'>
                { blog.content }
            </div>
            {/* <div dangerouslySetInnerHTML={{ __html: blog.content }}
                className='my-2 md:my-3 text-stone-600'
            /> */}

            {/* reply section */}
            <div className='mt-12'>
                <Comments blogId={blog._id} />
            </div>
        </div>
    )
}

export default BlogShow