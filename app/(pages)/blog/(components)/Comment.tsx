import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { IComment } from '@/interfaces'
import { FaRegTrashCan, FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";

const Comment = ({
  blogId,
  fetchComments,
  comment
} : {
  blogId: string | undefined,
  fetchComments: any
  comment: IComment
}) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')

  const notifyCommentFailed = (err: any) => toast.error(err, {
    position: 'bottom-right'
  })
  const notifyInvalidComment = () => toast.warn('Please fill all the input fields.', {
    position: 'bottom-right'
  })

  const timeSince = (date: number) => {
    var seconds = Math.floor((new Date().valueOf() - date) / 1000);

    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }

    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }

    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }

    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }

    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }

    return Math.floor(seconds) + " seconds";
  }

  const handleDelete = async (
    e: React.FormEvent<HTMLFormElement>,
    password: string
  ) => {
    e.preventDefault();

    if (passwordInput.length === 0) {
      var inputTag = document.getElementById('passwordInputTag');
      if (inputTag) inputTag.focus()
      notifyInvalidComment()
      return
    }

    if (password !== passwordInput) {
      setPasswordInput('')
      notifyCommentFailed("Password doesn't match. Please try again")
      return
    }

    try {
      await fetch(`/api/comments/${comment._id}/?blogId=${blogId}`, {
        method: 'DELETE',
      })

      fetchComments()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <ToastContainer />

      <div
        key={comment._id}
        className='
          m-4
          pb-2
          flex
          gap-6
          justify-between
          items-start
          border-b
      '>
        <div className='flex flex-col gap-4'>
          <div className='h-8 flex gap-4 justify-between items-center'>
            <div className='flex gap-2'>
              <span>{ comment.writer }</span>
              <span>·</span>
              <span className='whitespace-nowrap'>
                { timeSince(new Date(comment.createdAt).valueOf()) } ago
              </span>
            </div>
            { showPasswordInput ? (
              <>
                <form
                  onSubmit={(e) => handleDelete(e, comment.password)}
                  className='flex gap-2 items-center'
                >
                  <input
                    id='passwordInputTag'
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className='p-2 rounded-md'
                  />

                  {/* cancel button */}
                  <FaRegCircleXmark
                    onClick={() => setShowPasswordInput(false)}
                    className='text-2xl cursor-pointer'
                  />

                  {/* submit button */}
                  <button type="submit">
                    <FaRegCircleCheck className='text-2xl cursor-pointer' />
                  </button>
                </form>
              </>
            ) : (
              <div onClick={() => {}} className='cursor-pointer'>
                <FaRegTrashCan onClick={() => setShowPasswordInput(true)} />
              </div>
            )}
          </div>

          <span>{ comment.comment }</span>
        </div>
      </div>
    </>
  )
}

export default Comment