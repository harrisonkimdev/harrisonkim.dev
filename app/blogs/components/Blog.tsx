import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IBlog } from '@/interfaces'

const Blog = ({ blogData }: { blogData: IBlog }) => {

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
        <div className='flex flex-col border shadow-md'>
            <div className=''>
                <Image
                    src="/images/girl.png"
                    alt="Blog Image"
                    width={1688}
                    height={2388}
                    className='object-cover'
                />
            </div>
            <div className='min-h-[10vh] h-full p-4 flex flex-col justify-between'>
                <div className='w-72 flex flex-col justify-between'>
                    {/* category / tag */}
                    <div className=''>
                        <p className='text-stone-400'>{ blogData.writer }</p>
                    </div>

                    {/* title */}
                    <div className='mt-4'>
                        <p className='
                            text-xl font-semibold truncate
                        '>{ blogData.title }</p>
                    </div>

                    {/* content */}
                    <div className=''>
                        <p className='truncate'>{ blogData.content }</p>
                    </div>
                </div>

                {/* read more */}
                <div className='mt-4 flex justify-end'>
                    <Link href={`/blogs/${blogData._id}`}>
                        <p className='
                            w-min px-3 py-2 rounded-full whitespace-nowrap text-lg text-stone-800
                            bg-gradient-to-br from-amber-400 hover:from-amber-300
                        '>Read More</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Blog