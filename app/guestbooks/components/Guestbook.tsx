import React from 'react'
import { IGuestbook } from '../interfaces'
import Link from 'next/link'
import '../styles/styles.css'

const Guestbook = ( props: { guestbookData: IGuestbook } ) => {
  return (
    <Link href={`guestbooks/${props.guestbookData._id}`}>
      <div className='grid grid-cols-6 bg-stone-300 shadow-xl rounded-2xl p-6 text-stone-800 hover:bg-stone-200'>
        <div className='col-start-1 col-span-4 border-r-2 border-stone-50 pr-5'>
          <h2 className='text-2xl font-semibold w-full truncate'>{ props.guestbookData.title }</h2>
          <div id="innerHTML" dangerouslySetInnerHTML={{ __html: props.guestbookData.content }} />
        </div>
        <div className='col-start-5 col-end-7 col-span-2 flex flex-col justify-between pl-5'>
          <p className=''>{ props.guestbookData.writer}</p>
          <p>{ props.guestbookData.createdAt}</p>
        </div>
      </div>
    </Link>
  )
}

export default Guestbook