import React from 'react'
import { Loader } from 'semantic-ui-react'
import axios from 'axios'

// components
import Guestbook from './Guestbook'
import PaginationNavigator from '@/components/PaginationNavigator'

async function getGuestbooks() {
  const res = await axios.get(`${process.env.BASE_URL}/api/guestbooks?currentPage=${1}`)
  return res.data.guestbooks
}

export default async function GuestbookList() {
  const guestbooks = await getGuestbooks()

  return (
    <>
      <div className='flex flex-col gap-3 md:gap-2 mt-1'>
        {guestbooks.map((guestbook) => (
          <Guestbook guestbookData={guestbook} key={guestbook._id} />
        ))}
      </div>

      <PaginationNavigator />
    </>
  )
}

// export default GuestbookList