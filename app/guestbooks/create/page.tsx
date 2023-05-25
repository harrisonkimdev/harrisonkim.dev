// create
'use client'

import React, { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import Link from 'next/link'
import '../styles/quill-editor.css'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Page = () => {
  const [title, setTitle] =  useState('')
  const [content, setContent] = useState('')
  const [writer, setWriter] =  useState('')
  const [password, setPassword] =  useState('')
  const [disableSubmit, setDisableSubmit] = useState(true)

  const router = useRouter()
  
  const QuillNoSSRWrapper = useMemo(() => {
    return dynamic(() => import("react-quill"), {
      loading: () => <p>loading...</p>,
      ssr: false,
    })
  }, [])

  const submitButtonStyle = disableSubmit ?
    'hidden' : 'bg-stone-400 text-stone-900  px-2 py-1 rounded-lg hover:bg-stone-300'

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios.post('/api/guestbooks', {
      title,
      content,
      writer,
      password
    })
    .then((res) => {
      // 
    })
    .catch((err) => {
      // 
    })
    .finally(() => {
      // 
    })
    
    router.push('/guestbooks')
  }

  useEffect(() => {
    if (
      title.length != 0
      && writer.length != 0
      && password.length != 0
    ) {
      setDisableSubmit(false)
    }
  }, [title, writer, password])

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>

        {/* title and content */}
        <div className='flex flex-col gap-4'>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}
            className='w-full p-1 bg-stone-100 rounded shadow focus:outline-none'
          />
          <div className='h-96'>
            <QuillNoSSRWrapper
              placeholder=''
              value={content}
              onChange={setContent}
            />
          </div>
        </div>

        <div className='flex flex-row items-end justify-between'>
          {/* writer and pwd */}
          <div className='flex flex-row gap-8'>
            <div className='flex flex-col gap-0.5'>
              <label htmlFor="writer" className='text-stone-700 font-light'>Your name</label>
              <input id='writer' type="text" value={writer}
                onChange={e => setWriter(e.target.value)}
                className='p-1 bg-stone-100 rounded shadow focus:outline-none'
              />
            </div>
            <div className='flex flex-col gap-0.5'>
              <label htmlFor="password" className='text-stone-700 font-light'>Password</label>
              <input id='password 'type="password" value={password}
                onChange={e => setPassword(e.target.value)}
                className='p-1 bg-stone-100 rounded shadow focus:outline-none'
              />
            </div>
          </div>

          {/* buttons */}
          <div className='flex justify-end gap-2'>
            <button type='submit' disabled={disableSubmit} className={submitButtonStyle}> Submit </button>
            <Link href='/guestbooks'>
              <button type='button' className='border border-stone-400 text-stone-900 px-2 py-1 rounded-lg hover:bg-stone-300'> Cancel </button>
            </Link>
          </div>
        </div>
        <div className={disableSubmit ? 'text-end mt-2 text-sm text-stone-400' : 'hidden'}>
          <p>Please fill in the required fields first: title, your name and password</p>
        </div>
      </form>
    </>
  )
}

export default Page