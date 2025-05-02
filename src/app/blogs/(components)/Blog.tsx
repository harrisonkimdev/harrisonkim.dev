'use client'

import { IBlog } from '@/interfaces'
import { timeSince } from '@/lib/functions'
import Link from 'next/link'
import Image from 'next/image'

const BlogComponent = ({ blog }: { blog: IBlog }) => {
  return (
    <Link href={`/blogs/${blog._id}`} className='
      flex flex-col bg-zinc-950 font-mono
    '>
      <Image 
        src='https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt='Blog Thumbnail' width={1024} height={786}
        className='h-full object-cover'
      />
      <div className='p-4'>
        {/* title */}
        <h2 className='font-mono font-light truncate text-lime-400'>{ blog.title }</h2>

        {/* content */}
        <div dangerouslySetInnerHTML={{ __html: blog.content }}
          className='overflow-hidden line-clamp-4 text-zinc-400'
        />

        {/* tag */}
        <div className='flex flex-wrap gap-3 pt-4'>
          { blog.tags.map((tag: string, index: number) => (
            <span key={index} className='
              w-min px-3 py-1 rounded-lg
              border border-dashed border-zinc-500
              whitespace-nowrap text-sm text-zinc-400
            '> { tag } </span>
          )) }
        </div>

        {/* ... ago */}
        <div className='flex justify-end pt-2 whitespace-nowrap text-zinc-500'>
          { timeSince(new Date(blog.createdAt).valueOf()) } ago
        </div>
      </div>
    </Link>
  )
}

export default BlogComponent