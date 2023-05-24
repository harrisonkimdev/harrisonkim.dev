// index
'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IGuestbook } from './interfaces'
import Guestbook from './components/Guestbook'

const Page = () => {
  const [guestbooks, setGuestbooks] = useState<IGuestbook[] | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    const fetchGuestbooks = async () => {
      await axios.get('/api/guestbooks')
        .then((res) => {
          setGuestbooks(res.data)
        })
        
    }

    fetchGuestbooks()
  }, [])

  return (
    <section className='flex flex-col gap-4'>
      <div className='p-4 flex flex-col gap-6'>
        { guestbooks?.map(guestbook => {
          return <Guestbook guestbookData={guestbook} key={guestbook._id} />
        })}
      </div>

      {/* pagination */}
      <div></div>
    </section>
  )
}

export default Page