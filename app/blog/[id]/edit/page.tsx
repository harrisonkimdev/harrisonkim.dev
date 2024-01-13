'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { IBlog } from '@/interfaces'

const BlogEdit = ({ params }: { params: { id: string } }) => {
  const [blog, setBlog] = useState<IBlog | undefined>(undefined)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const router = useRouter()

  const QuillNoSSRWrapper = useMemo(() => {
    return dynamic(() => import("@/components/ReactQuillWrapper"), {
      loading: () => <p>loading...</p>,
      ssr: false,
    })
  }, [])

  useEffect(() => {
    getBlog(params.id)
  }, [])

  const getBlog = async (id: string) => {
    try {
      const res = await fetch(`/api/blog/${id}?readOnly=0`)
      const blogData = await res.json()
      setBlog(blogData)
      setTitle(blogData.title)
      setContent(blogData.content)
    } catch (err) {
      // 
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await fetch(`/api/blog/${blog?._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content
        })
      })
      router.refresh()
      router.push('/blog')
    } catch (err) {
      // 
    }
  }

  return (
    <>
      <form onSubmit={e => handleSubmit(e)} className='flex flex-col gap-2 md:my-1 mb-12'>
        {/* title and content */}
        <div className='flex flex-col gap-2 md:gap-3'>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}
            className='w-full p-1 bg-stone-100 rounded shadow focus:outline-none'
          />
          <QuillNoSSRWrapper content={content} setContent={setContent} />
        </div>

        {/* update & cancel */}
        <div className='flex justify-center md:justify-end gap-2 py-2'>
          {/* update */}
          <button type='submit'
            className='
              border
            border-stone-400
              text-sm
              md:text-base
            text-stone-700
              px-2
              py-1
              rounded-lg
            bg-stone-200
            hover:bg-stone-300
          '> Update </button>

          {/* cancel */}
          <Link href={`/blog/${blog?._id}`}>
            <button className='
              px-2
              py-1
              rounded-lg
              border
            border-stone-400
              text-sm
              md:text-base
            text-stone-700
            '> Cancel </button>
          </Link>
        </div>
      </form>
    </>
  )
}

export default BlogEdit