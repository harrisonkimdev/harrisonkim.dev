// edit
'use client'

import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import '../../styles/quill-editor.css'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

const Page = () => {
  const [guestbook, setGuestbook] = useState(undefined)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const params = useParams()
  const router = useRouter()

  const QuillNoSSRWrapper = useMemo(() => {
    return dynamic(() => import("react-quill"), {
      loading: () => <p>loading...</p>,
      ssr: false,
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.patch(`/api/guestbooks/${guestbook?._id}`, {
      title,
      content
    })
      .then((res) => {
        router.push('/guestbooks')
      })
  }

  useEffect(() => {
    axios.get(`/api/guestbooks/${params.id}`)
      .then(res => {
        setGuestbook(res.data)
        setTitle(res.data.title)
        setContent(res.data.content)
      })
  }, [])

  return (
    <>
      <form onSubmit={e => handleSubmit(e)} className='flex flex-col gap-2 md:gap-0 md:my-1 mb-12'>
        {/* title and content */}
        <div className='flex flex-col gap-2 md:gap-3'>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}
            className='w-full p-1 bg-stone-100 rounded shadow focus:outline-none'
          />
          <div className='h-full'>
            <QuillNoSSRWrapper placeholder='' theme='snow' value={content} onChange={setContent} />
          </div>
        </div>

        {/* update & cancel */}
        <div className='flex justify-center md:justify-end gap-2 py-2'>
          <button type='submit'
            className='border border-stone-400 text-sm md:text-base text-stone-700 px-2 py-1 rounded-lg bg-stone-200 hover:bg-stone-300'
          >Update</button>
          <Link href={`/guestbooks/${guestbook?._id}`}>
            <button className='border border-stone-400 text-sm md:text-base text-stone-700 px-2 py-1 rounded-lg'>Cancel</button>
          </Link>
        </div>
      </form>
    </>
  )
}

export default Page