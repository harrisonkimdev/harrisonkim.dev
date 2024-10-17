'use client'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'

type TAddCommentProps = {
  blogId: string | undefined,
  fetchComments: () => void
}

/**
 * AddComment component allows users to add comments to a blog post.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.blogId - The ID of the blog post to which the comment is being added
 * @param {Function} props.fetchComments - Function to fetch the updated list of comments after a new comment is added
 * 
 * @returns {JSX.Element} The rendered AddComment component
 * 
 * @example
 * <AddComment blogId="123" fetchComments={fetchCommentsFunction} />
 * 
 * @remarks
 * This component uses the `react-toastify` library to display notifications for different states of the comment submission process.
 * It also includes form validation to ensure all input fields are filled before submission.
 */

const AddComment = ({ blogId, fetchComments } : TAddCommentProps) => {
  const [writer, setWriter] = useState('')
  const [comment, setComment] = useState('')
  const [password, setPassword] = useState('')

  const notifyCommentAdded = () => toast.success('You just added a comment!', {
    position: 'bottom-right'
  })
  const notifyCommentFailed = (err: any) => toast.error(err, {
    position: 'bottom-right'
  })
  const notifyInvalidComment = () => toast.warn('Please fill all the input fields.', {
    position: 'bottom-right'
  })

  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!writer || !comment || !password) {
      notifyInvalidComment()
      return
    }

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blogId, writer, comment, password })
      })
  
      if (res.ok) {
        setWriter('')
        setComment('')
        setPassword('')
        
        fetchComments()
        notifyCommentAdded()
      } else {
        const errorText = await res.text()
        notifyCommentFailed(errorText)
      }
    } catch (err: any) {
      notifyCommentFailed(err.message || 'An error occurred')
    }
  }

  return (
    <>
      <ToastContainer />
    
      <form onSubmit={(e) => addComment(e)} className='mb-8 p-4'>
        <div className='grid grid-cols-5 gap-4'>
          <div className='col-span-3 flex flex-col gap-1'>
            <label htmlFor='writer' className='text-lime-400'>Writer</label>
            <input type='text' id='writer'
              value={writer} onChange={(e) => setWriter(e.target.value)}
              className='p-2 rounded-md'
            />
          </div>
          <div className='col-span-2 flex flex-col gap-1'>
            <label htmlFor='password' className='text-lime-400'>Password</label>
            <input type='password' id='password'
              value={password} onChange={(e) => setPassword(e.target.value)}
              className='p-2 rounded-md'
            />
          </div>
        </div>
        
        <div className='mt-5 flex flex-col gap-1'>
          <label htmlFor='content' className='text-lime-400'>Comment</label>
          <textarea id='content' value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='w-full h-28 p-2 rounded-md resize-none overflow-auto'
          />
        </div>

        <button type='submit' className='
          w-full mt-8 py-3
          rounded-md border border-dashed border-lime-400 bg-black
          text-lime-400
          hover:
        '>Add</button>
      </form>
    </>
  )
}

export default AddComment