'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IBlog } from '@/interfaces'
import { FaCircleUser } from "react-icons/fa6";

const BlogComponent = ({ blogData }: { blogData: IBlog }) => {
    const timeSince = (date: number) => {
        var seconds = Math.floor((new Date().valueOf() - date) / 1000);
    
        var interval = seconds / 31536000;
        if (interval > 1) {
            return Math.floor(interval) + " years";
        }

        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }

        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }

        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }

        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }

        return Math.floor(seconds) + " seconds";
    }

    return (
        <Link href={`/blog/${blogData._id}`} className='text-black hover:text-black'>
            <div className='flex flex-col border shadow-md hover:shadow-lg'>
                <div className=''>
                    <Image
                        src="https://placehold.co/600x400"
                        alt="Blog Image"
                        width={600}
                        height={400}
                        className='object-cover'
                    />
                </div>
                <div className='min-h-[5.5rem] h-full p-4 flex flex-col justify-between'>
                    <div className='flex flex-col justify-between'>
                        {/* tag */}
                        {/* <div className='flex gap-1'>
                            { blogData.tags.map((tag: string) => (
                                <></>
                            ))}
                        </div> */}

                        {/* title */}
                        <div className='mt-4'>
                            <p className='
                                text-xl font-semibold truncate
                            '>{ blogData.title }</p>
                        </div>

                        {/* content */}
                        {/* className='truncate' */}
                        <div dangerouslySetInnerHTML={{ __html: blogData.content }}
                            className='h-[5.5rem] overflow-hidden line-clamp-4'
                        />
                    </div>

                    <div className='mt-4 flex justify-between text-neutral-400'>
                        <div className='flex gap-1 items-center'>
                            <FaCircleUser />
                            <p>Harrison</p>
                        </div>
                        <span>{ timeSince(new Date(blogData.createdAt).valueOf()) } ago</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BlogComponent