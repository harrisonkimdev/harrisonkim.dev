// edit
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../../styles/quill-editor.css'
import Link from 'next/link'
import { IGuestbook } from '@/guestbooks/interfaces'
import { useParams, useRouter } from 'next/navigation'

const Page = () => {
  const [guestbook, setGuestbook] = useState<IGuestbook | undefined>(undefined)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const params = useParams()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={e => handleSubmit(e)}>
        <div className='flex flex-col gap-4'>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}
            className='w-full p-1 bg-stone-100 rounded shadow focus:outline-none'
          />
          <div className='h-96'>
            <ReactQuill theme='snow' value={content} onChange={setContent} />
          </div>
        </div>

        <div className='flex justify-end gap-2'>
          <button type='submit' className='border border-stone-400 text-stone-900 px-2 py-1 rounded-lg hover:bg-stone-300'>Update</button>
          <Link href={`/guestbooks/${guestbook?._id}`}>
            <button type='button' className='border border-stone-400 text-stone-900 px-2 py-1 rounded-lg hover:bg-stone-300'>Cancel</button>
          </Link>
        </div>
      </form>
    </>
  )
}

export default Page