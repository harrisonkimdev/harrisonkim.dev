'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const Page = () => {
  const [title, setTitle] =  useState('')
  const [content, setContent] = useState('')
  const [writer, setWriter] =  useState('')
  const [password, setPassword] =  useState('')
  const [disableSubmit, setDisableSubmit] = useState(true)

  const router = useRouter()

  const submitButtonStyle = disableSubmit ?
    'hidden' : 'bg-stone-400 text-stone-900  px-2 py-1 rounded-lg hover:bg-stone-300'

  const QuillNoSSRWrapper = useMemo(() => {
    return dynamic(() => import("@/components/ReactQuillWrapper"), {
      loading: () => <p>loading...</p>,
      ssr: false,
    })
  }, [])

  useEffect(() => {
    if (
      title.length != 0
      && writer.length != 0
      && password.length != 0
    ) setDisableSubmit(false)

    if (
      title.length == 0
      || writer.length == 0
      || password.length == 0
    ) setDisableSubmit(true)
  }, [title, writer, password])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await fetch('/api/guestbooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          writer,
          password
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
      <form onSubmit={e => handleSubmit(e)} className='flex flex-col gap-2'>
        {/* title and content */}
        <div className='flex flex-col gap-2 md:gap-3'>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}
            className='w-full p-1 bg-stone-100 rounded shadow focus:outline-none'
          />
          <QuillNoSSRWrapper content={content} setContent={setContent} />
        </div>

        <div className='
          flex flex-col gap-3 md:gap-6 my-2 md:mb-4
          md:flex-row md:items-end md:justify-between
        '>
          {/* your name & password */}
          <div className='
            flex flex-col gap-2
            md:flex-row md:gap-4
          '>
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

          {/* submit & cancel */}
          <div className='flex justify-center md:justify-end gap-2 py-4 md:py-0'>
            <button type='submit' disabled={disableSubmit} className={submitButtonStyle}> Submit </button>
            <Link href='/guestbooks'>
              <p className='border border-stone-400 text-stone-900 px-2 py-1 rounded-lg hover:bg-stone-300'> Cancel </p>
            </Link>
          </div>
        </div>

        <div className={disableSubmit ? 'flex justify-center md:justify-end text-sm text-stone-400' : 'hidden'}>
          <p className=''>Please fill in the required fields first: title, your name and password</p>
        </div>
        
      </form>
    </>
  )
}

export default Page