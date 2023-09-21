"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaPen, FaRegTrashAlt, FaTimes, FaCheck } from 'react-icons/fa'

// temp
import axios from 'axios'

const ControlSection = ({ guestbook }) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [password, setPassword] = useState('')
  const [actionType, setActionType] = useState('')

  // hooks
  const router = useRouter()

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    if (password == guestbook?.password) {
      
      if (actionType == 'edit') {
        router.push(`/guestbooks/${guestbook?._id}/edit`)
      }
      else if (actionType == 'delete') {
        await axios.delete(`/api/guestbooks/${guestbook?._id}`)
          .then(res => console.log(res))
        
        router.refresh()
        router.push('/guestbooks')
      }
    }
    else {
      alert('Password doesn\'t match')

      setPassword('')
    }
  }

  const timeSince = (date) => {
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

  return (
    <>
      <div className={`
        h-6
        my-2 md:mt-0
        flex
        flex-row
        ${showPasswordInput
          ? 'justify-end md:justify-between'
          : 'justify-between'
        }
        items-center
      `}>
        <div className={`
          ${showPasswordInput ? 'hidden md:flex' : 'flex'}
          flex-row
          gap-2
          text-sm
        text-stone-500
        `}>
          <p>{ guestbook?.writer ?? 'writer' }</p>
          <p>{ guestbook && timeSince(new Date(guestbook.createdAt).valueOf()) } ago</p>
        </div>

        { showPasswordInput ? (
          <form onSubmit={(e) => handlePasswordSubmit(e)}
            className='flex flex-row gap-2 items-center w-full md:w-auto'
          >
            <input type="password" placeholder='Password'
              value={password} onChange={e => setPassword(e.target.value)}
              className='w-full p-1 md:my-1 bg-stone-100 rounded shadow focus:outline-none'
            />
            <div className='flex flex-row gap-3 justify-end'>
              {/* cancel */}
              <FaTimes onClick={() => {
                  setShowPasswordInput(false); setPassword('')
                }}
                className='text-xl cursor-pointer'
              />
              {/* check */}
              <button type='submit'>
                <FaCheck className='text-xl cursor-pointer' />
              </button>
            </div>
          </form>
        ) : (
          <div className='flex flex-row gap-3' onClick={() => setShowPasswordInput(true)}>
            {/* edit */}
            <FaPen onClick={() => setActionType('edit')} className='text-xl cursor-pointer' />

            {/* delete */}
            <FaRegTrashAlt onClick={() => setActionType('delete') } className='text-xl cursor-pointer'/>
          </div>
        )}
      </div>
    </>
  )
}

export default ControlSection