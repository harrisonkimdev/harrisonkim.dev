'use client'

import { IBlog } from '@/interfaces'
import Link from 'next/link'
import Image from 'next/image'

const BlogComponent = ({ blogData }: { blogData: IBlog }) => {
  const timeSince = (date: number) => {
    var seconds = Math.floor((new Date().valueOf() - date) / 1000)

    var interval = seconds / 31536000
    if (interval > 1) {
      return Math.floor(interval) + ' years'
    }

    interval = seconds / 2592000
    if (interval > 1) {
      return Math.floor(interval) + ' months'
    }

    interval = seconds / 86400
    if (interval > 1) {
      return Math.floor(interval) + ' days'
    }

    interval = seconds / 3600
    if (interval > 1) {
      return Math.floor(interval) + ' hours'
    }

    interval = seconds / 60
    if (interval > 1) {
      return Math.floor(interval) + ' minutes'
    }

    return Math.floor(seconds) + ' seconds'
  }

  return (
    <Link href={`/blogs/${blogData._id}`} className='
      flex flex-col bg-zinc-950
      text-lime-400 hover:text-lime-400 active:text-lime-400
    '>
      <Image 
        src='https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt='Blog Image'
        width={1470}
        height={980}
        className='object-cover'
      />
      <div className='p-4 flex flex-col'>
        {/* title */}
        <h2 className='truncate'>{ blogData.title }</h2>

        {/* content */}
        <div dangerouslySetInnerHTML={{ __html: blogData.content }}
          className='overflow-hidden line-clamp-4'
        />

        {/* tag */}
        <div className='flex flex-wrap gap-3 py-4'>
          { blogData.tags.map((tag: string, index: number) => (
            <span key={index} className='
              w-min px-3 py-1 rounded-full border border-dashed border-lime-400
              whitespace-nowrap text-sm
            '> { tag } </span>
          )) }
        </div>

        {/* ... ago */}
        <div className='flex justify-end py-2 whitespace-nowrap text-zinc-500'>
          { timeSince(new Date(blogData.createdAt).valueOf()) } ago
        </div>
      </div>
    </Link>
  )
}

export default BlogComponent