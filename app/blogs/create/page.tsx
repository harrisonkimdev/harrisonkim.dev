'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const Page = () => {
  const [title, setTitle] =  useState('')
  const [content, setContent] = useState('')
  const [writer, setWriter] =  useState('')
  const [password, setPassword] =  useState('')
  const [disableSubmit, setDisableSubmit] = useState(true)

  const router = useRouter()

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
      await fetch('/api/blogs', {
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
      router.push('/blogs')
    } catch (err) {
      // 
    }
  }

  return (
    <>
      <form onSubmit={e => handleSubmit(e)} className='flex flex-col'>
        {/* title and content */}
        <div className='flex flex-col'>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}
            className='w-full my-2 p-2 border border-stone-300 bg-stone-100 focus:outline-none'
          />
          <div className='my-2'>
            <QuillNoSSRWrapper content={content} setContent={setContent} />
          </div>
        </div>

        <div className='
          h-full my-2 flex
          flex-col gap-5
          md:flex-row md:justify-between
        '>
          {/* your name & password */}
          <div className='
            flex flex-col gap-2
            md:flex-row md:gap-4
          '>
            <div className='flex flex-col'>
              <label htmlFor="writer"
                className='text-stone-700 font-light'
              > Your name </label>
              <input id='writer' type="text" value={writer}
                onChange={e => setWriter(e.target.value)}
                className='mt-1 p-2 border border-stone-300 bg-stone-100 focus:outline-none'
              />
            </div>
            
            <div className='flex flex-col'>
              <label htmlFor="password"
                className='text-stone-700 font-light
              '> Password </label>
              <input id='password 'type="password" value={password}
                onChange={e => setPassword(e.target.value)}
                className='mt-1 p-2 border border-stone-300 bg-stone-100 focus:outline-none'
              />
            </div>
          </div>

          {/* submit */}
          <div className='flex flex-col justify-end'>
            <button type='submit' disabled={disableSubmit}
              className={disableSubmit ?
                'hidden' :
                `
                  px-2 py-1.5 border border-stone-300 bg-stone-100 hover:bg-stone-200
                  font-medium text-lg md:text-base text-stone-600
                `
              }
            > Submit </button>
          </div>
        </div>

        <div className={disableSubmit ?
          'flex justify-center md:justify-end text-sm text-stone-400' : 'hidden'
        }>
          <p>Please fill in the required fields first: title, your name and password</p>
        </div>
        
      </form>
    </>
  )
}

export default Page