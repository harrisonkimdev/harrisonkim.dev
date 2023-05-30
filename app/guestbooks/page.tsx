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
    <>
      {/* list of guestbooks */}
      <div className='flex flex-col gap-3 md:gap-2 mt-1'>
        { guestbooks?.map(guestbook => {
          return <Guestbook guestbookData={guestbook} key={guestbook._id} />
        })}
      </div>

      {/* pagination */}
      <div>
        
      </div>
    </>
  )
}

export default Page