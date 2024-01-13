'use client'

import React, { useState } from 'react'
import { IComment } from '@/interfaces/index'
import { FaRegTrashCan, FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";

const ReadComments = (
  {
    blogId,
    comments,
    fetchComments
  } :
  {
    blogId: string | undefined,
    comments: IComment[] | undefined,
    fetchComments: any
  }
) => {
  const [showPasswordInput, setShowPasswordInput] = useState(true)

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

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      await fetch(`/api/blog/${blogId}`, {
        method: 'DELETE',
      })

      setShowPasswordInput(false)
      fetchComments()
    } catch (err) {
      console.error(err)
    }

  }

  return (
    <>
      { comments?.map((reply: IComment) => (
        <div
          key={reply._id}
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
                <span>{ reply.writer }</span>
                <span>·</span>
                <span className='whitespace-nowrap'>{ timeSince(new Date(reply.createdAt).valueOf()) } ago</span>
              </div>
              { showPasswordInput ? (
                <>
                  <form
                    onSubmit={(e) => handleDelete(e)}
                    className='flex gap-2 items-center'
                  >
                    <input type="text" className='p-2 rounded-md'/>

                    <FaRegCircleXmark onClick={() => setShowPasswordInput(false)} className='text-2xl cursor-pointer' />
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

            <span>{ reply.comment }</span>
          </div>
        </div>
      )) }
    </>
  )
}

export default ReadComments