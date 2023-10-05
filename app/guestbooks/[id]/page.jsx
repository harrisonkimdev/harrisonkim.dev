import React from 'react'

// component
import ControlSection from './ControlSection'

const getGuestbook = async (id) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/guestbooks/${id}?readOnly=1`, {
      cache: 'no-store'
    })
    const guestbook = await res.json()
    return guestbook
  } catch (err) {
    // 
  }
}

const GuestbookShow = async ({ params }) => {
  const guestbook = await getGuestbook(params.id)

  return (
    <>
      <div className='mt-4'>
        <h1 className='text-xl md:text-3xl font-bold text-stone-800'>{ guestbook.title }</h1>
        <ControlSection guestbook={guestbook} />
        
        <hr className='border-b border-stone-400' />
        <div dangerouslySetInnerHTML={{ __html: guestbook.content }} className='my-2 md:my-3 text-stone-600' />
      </div>
    </>
  )
}

export default GuestbookShow