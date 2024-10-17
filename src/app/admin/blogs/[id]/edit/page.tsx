'use client'

import 'react-toastify/dist/ReactToastify.css'
import 'react-quill/dist/quill.snow.css'
import '@/styles/quill-editor-custom.css'

import { getSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const BlogEditPage = () => {
  const router = useRouter()
  const params = useParams()

  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [tagTitle, setTagTitle] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])

  // Quill editor
  const QuillNoSSRWrapper = useMemo(() => {
    return dynamic(() => import('@/libs/ReactQuillWrapper'), {
      loading: () => <p>loading...</p>,
      ssr: false,
    })
  }, [])

  const notifyInvalidComment = () => toast.warn('You might have forgotten to fill in the title.', {
    position: 'bottom-right'
  })

  useEffect(() => {
    const fetchBlog = async (id: string) => {
      const session = await getSession()
      if (session) {
        try {
          const res = await fetch(`/api/blog/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
          const data = await res.json()
  
          setTitle(data.blog.title)
          setContent(data.blog.content)
          setTags(data.blog.tags)
        } catch (err) {
          console.error(err)
        }
  
      } else {
        router.push('/')
      }
    }

    fetchBlog(params.id)
  }, [params.id, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (title.length === 0) {
      notifyInvalidComment()
      return
    }

    try {
      await fetch(`/api/blog/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          tags,
        })
      })

      router.push(`/admin/blogs`)
    } catch (err) {
      console.error(err)
    }
  }

  const addTagToArray = () => {
    if (tagTitle.length > 0) {
      if (tags.length < 5) {
        let replacedString = tagTitle.split(' ').join('_')
        tags?.push(replacedString)
      } else {
        alert('Maximum number of tags you can add is five (5).')
      }
      setTagTitle('')
    }
  }
  
  return (
    <>
      <ToastContainer />
      
      {/* title */}
      <div className=''>
        <h1 className='text-3xl font-medium'>Edit Blog Post</h1>
      </div>

      {/* text editor and buttons */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='mt-8'>
          <input
            type='text' id='title' placeholder='Title...'
            value={title} onChange={(e) => setTitle(e.target.value)}
            className='w-full my-4 p-4 border'
          />

          <QuillNoSSRWrapper content={content} setContent={setContent} />

          <div className='my-4 p-4 border-2 border-dashed rounded-lg'>
            <div className='flex gap-2'>

              <input
                type='text' id='tag' placeholder=''
                value={tagTitle} onChange={(e) => setTagTitle(e.target.value)}
                className='
                  p-4 border
                '
              />
              <button type='button' onClick={() => addTagToArray()} className='p-4 border'>
                Add
              </button>
            </div>
            <div className='w-full h-16 p-4 flex flex-wrap gap-2'>
              { tags?.map((tag: string, index) => {
                return <span key={index} className='px-3 py-2 rounded-full border bg-white'>{ tag }</span>
              })}
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className='mt-4 flex gap-4 justify-end'>
          <Link href='/admin/blogs'
            className='
              p-2
              shadow-sm
              font-medium
              text-stone-800
              hover:text-stone-800
              bg-white
              hover:bg-stone-100
          '>
            Cancel
          </Link>
          <button type='submit'
            className='
              p-2
              shadow-sm
              font-medium
              text-stone-800
              hover:text-stone-800
              bg-white hover:bg-stone-100
          '>Update</button>
        </div>

      </form>
    </>
  )
}

export default BlogEditPage