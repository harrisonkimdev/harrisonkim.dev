import React from 'react'

// components
import Guestbook from './Guestbook'
import PaginationNavigator from '@/components/PaginationNavigator'

const getGuestbooks = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/guestbooks?currentPage=${1}`, {
      cache: 'no-store'
    })
    const data = await res.json()
    return data.guestbooks
  } catch (err) {
    // 
  }
}

const Guestbooks = async () => {
  const guestbooks = await getGuestbooks()

  return (
    <>
      <div className='flex flex-col gap-3 md:gap-2 mt-1'>
        { guestbooks?.map((guestbook) => (
          <Guestbook guestbookData={guestbook} key={guestbook._id} />
        )) }
      </div>

      <PaginationNavigator />
    </>
  )
}

export default Guestbooks