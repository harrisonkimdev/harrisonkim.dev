'use client'

import { IBlog } from '@/interfaces'
import { timeSince } from '@/utils/functions'
import Link from 'next/link'
import Image from 'next/image'

const BlogComponent = ({ blog }: { blog: IBlog }) => {
  return (
    <Link href={`/blogs/${blog._id}`} className='
      flex flex-col bg-zinc-950
      text-lime-400 hover:text-lime-400 active:text-lime-400
    '>
      <Image 
        src='https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt='Blog Image'
        width={1024}
        height={786}
        className='object-cover'
      />
      <div className='p-4 flex flex-col'>
        {/* title */}
        <h2 className='truncate'>{ blog.title }</h2>

        {/* content */}
        <div dangerouslySetInnerHTML={{ __html: blog.content }}
          className='overflow-hidden line-clamp-4'
        />

        {/* tag */}
        <div className='flex flex-wrap gap-3 py-4'>
          { blog.tags.map((tag: string, index: number) => (
            <span key={index} className='
              w-min px-3 py-1 rounded-full border border-dashed border-lime-400
              whitespace-nowrap text-sm
            '> { tag } </span>
          )) }
        </div>

        {/* ... ago */}
        <div className='flex justify-end py-2 whitespace-nowrap text-zinc-500'>
          { timeSince(new Date(blog.createdAt).valueOf()) } ago
        </div>
      </div>
    </Link>
  )
}

export default BlogComponent