'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { IGuestbook } from '@/interfaces'

const GuestbookEdit = ({ params }: { params: { id: string } }) => {
  const [guestbook, setGuestbook] = useState<IGuestbook | undefined>(undefined)
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
    getGuestbook(params.id)
  }, [])

  const getGuestbook = async (id: string) => {
    try {
      const res = await fetch(
        `/api/guestbooks/${id}?readOnly=0`,
        {
          cache: 'no-store'
        }
      )
      const guestbookData = await res.json()
      setGuestbook(guestbookData)
      setTitle(guestbookData.title)
      setContent(guestbookData.content)
    } catch (err) {
      // 
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await fetch(`/api/guestbooks/${guestbook?._id}`, {
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
      router.push('/guestbooks')
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
          <Link href={`/guestbooks/${guestbook?._id}`}>
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

export default GuestbookEdit