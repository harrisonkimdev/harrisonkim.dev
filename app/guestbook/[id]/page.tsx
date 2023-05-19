// show

'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const page = ({ params }: { params: { id: String } }) => {
  const [data, setData] = useState({})
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [password, setPassword] = useState('')
  const [actionType, setActionType] = useState('')

  const router = useRouter()

  const handleAction = async () => {
    // console.log(actionType)
    if (password == data.password) {
      
      if (actionType == 'edit') {
        router.push(`/guestbooks/${data._id}/edit`)
      }
      else if (actionType == 'delete') {
        
        router.push('/guestbook')
      }
    }
    else {
      // 
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/api/guestbooks/${params.id}`)
        .then(res => {
          setData(res.data)

          // increase the view count
          axios.patch(`/api/guestbooks/${res.data._id}`, {
            ...res.data,
            viewCount: res.data.viewCount + 1
          }).then(() => {
            // 
          })
        })
        .catch(err => {
          // 
        })
    }

    fetchData()
  }, [])

  return (
    <>
      <section>
        <div>
          <h1 className='text-3xl font-bold text-stone-800'>{ data.title }</h1>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-col text-sm text-stone-500'>
              <p>{ data.writer ?? 'writer' }</p>
              <p>{ data.created_at ?? 'created_at' }</p>
            </div>

            { showPasswordInput ? (
              <div className='flex flex-row gap-2 items-center'>
                <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}
                  className='w-full p-1 bg-stone-100 rounded shadow focus:outline-none'
                />
                <div className='flex flex-row gap-3 justify-end'>
                  {/* cancel */}
                  <button type='button'>
                    <div onClick={() => setShowPasswordInput(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </button>
                  {/* check */}
                  <button type='button' onClick={handleAction}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className='flex flex-row gap-2 mr-2 mb-1'>
                {/* edit */}
                <div onClick={() => { setShowPasswordInput(true); setActionType('edit'); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </div>

                {/* delete */}
                <div onClick={() => { setShowPasswordInput(true); setActionType('delete'); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
        <hr className='border-b border-stone-400' />
        <div dangerouslySetInnerHTML={{ __html: data.content }} className='mt-6 text-stone-600' />
      </section>
    </>
  )
}

export default page