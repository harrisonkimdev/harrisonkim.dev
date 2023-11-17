import React from 'react'
import Link from 'next/link'
import '@/globals.css'
import { FaUser } from 'react-icons/fa6'
import { IGuestbook } from '@/interfaces'

const Guestbook = ( props: { guestbookData: IGuestbook } ) => {

  function timeSince(date: number) {
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
      <Link href={`guestbooks/${props.guestbookData._id}`}
        className='border border-stone-200 shadow rounded-xl p-1
      '>
        <div className='
          p-3 rounded-lg border border-stone-300 bg-stone-200 hover:bg-stone-300
          text-stone-500
        '>
          {/* title and content */}
          <div className='md:flex md:flex-col md:gap-6'>
            {/* title */}
            <h2 className='
              w-5/6 truncate font-semibold text-xl text-stone-800
            '>{ props.guestbookData.title }</h2>

            {/* content */}
            {/* <div id="innerHTML" dangerouslySetInnerHTML={{ __html: guestbookData.content }} /> */}
          </div>

          {/* writer and created at */}
          <div className='flex flex-row justify-between gap-6 items-end pt-1'>
            {/* writer */}
            <div className='flex flex-row gap-2 items-center'>
              <FaUser />
              <span className='whitespace-nowrap'>{ props.guestbookData.writer }</span>
            </div>

            {/* days ago */}
            <p className='whitespace-nowrap text-stone-400 text-sm'>
              { timeSince(new Date(props.guestbookData.createdAt).valueOf()) } ago
            </p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Guestbook