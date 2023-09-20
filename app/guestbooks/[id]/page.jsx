// show
'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Loader } from 'semantic-ui-react'
import { FaPen, FaRegTrashAlt } from 'react-icons/fa'

const Page = ({ params }) => {
  const [guestbook, setGuestbook] = useState(undefined)
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [password, setPassword] = useState('')
  const [actionType, setActionType] = useState('')
  const [loaded, setLoaded] = useState(false)

  const router = useRouter()

  function timeSince(date) {
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

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/api/guestbooks/${params.id}`)
        .then(res => {
          setGuestbook(res.data)

          // increase the view count
          axios.patch(`/api/guestbooks/${res.data._id}`, {
            ...res.data,
            viewCount: res.data.viewCount + 1
          }).then(() => {
            setLoaded(true)
          })
        })
        .catch(err => {
          // 
        })

      const res = await fetch(`/api/guestbooks/${params.id}?readOnly=1`)
      const data = await res.json()
      setGuestbook(data)
    }

    fetchData()
  }, [])

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    if (password == guestbook?.password) {
      
      if (actionType == 'edit') {
        router.push(`/guestbooks/${guestbook?._id}/edit`)
      }
      else if (actionType == 'delete') {
        await axios.delete(`/api/guestbooks/${guestbook?._id}`)
          .then(res => console.log(res))
        
        router.push('/guestbooks')
      }
    }
    else {
      alert('Password doesn\'t match')

      setPassword('')
    }
  }

  if (!loaded) return (
    <>
      <div className='pt-32 flex items-center'>
        <Loader active inline='centered' />
      </div>
    </>
  )
  else return (
    <>
      <div className='mt-4'>
        <h1 className='text-xl md:text-3xl font-bold text-stone-800'>{ guestbook?.title }</h1>
        <div className={`flex flex-row ${showPasswordInput ? 'justify-end md:justify-between' : 'justify-between'} items-center h-6 my-2 md:mt-0`}>
          <div className={`${showPasswordInput ? 'hidden md:flex' : 'flex'} flex-row gap-2 text-sm text-stone-500`}>
            <p>{ guestbook?.writer ?? 'writer' }</p>
            <p>{ guestbook && timeSince(new Date(guestbook.createdAt).valueOf()) } ago</p>
          </div>

          { showPasswordInput ? (
            <form onSubmit={(e) => handlePasswordSubmit(e)} className='flex flex-row gap-2 items-center w-full md:w-auto'>
              <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}
                className='w-full p-1 md:my-1 bg-stone-100 rounded shadow focus:outline-none'
              />
              <div className='flex flex-row gap-2 md:gap-3 justify-end'>
                {/* cancel */}
                <button type='button'>
                  <div onClick={() => {setShowPasswordInput(false); setPassword('') }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </button>
                {/* check */}
                <button type='submit'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
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
        <hr className='border-b border-stone-400' />
        <div dangerouslySetInnerHTML={{ __html: guestbook ? guestbook.content : '' }} className='my-2 md:my-3 text-stone-600' />
      </div>
    </>
  )
}

export default Page