import React from 'react'
import { IGuestbook } from '../interfaces'
import Link from 'next/link'
import '../styles/styles.css'

const Guestbook = ( props: { guestbookData: IGuestbook } ) => {
    var aDay = 24*60*60*1000;

    function timeSince(date: any) {
      var seconds = Math.floor((new Date() - date) / 1000);
    
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
      <Link href={`guestbooks/${props.guestbookData._id}`} className='border border-stone-200 shadow rounded-xl p-1'>
        <div className='border border-stone-300 p-3 bg-stone-200 rounded-lg text-stone-500 hover:bg-stone-300'>
          {/* title and content */}
          <div className='md:flex md:flex-col md:gap-6'>
            {/* title */}
            <h2 className='text-xl font-semibold truncate w-5/6 text-stone-800'>{ props.guestbookData.title }</h2>

            {/* content */}
            {/* <div id="innerHTML" dangerouslySetInnerHTML={{ __html: props.guestbookData.content }} /> */}
          </div>

          {/* writer and created at */}
          <div className='flex flex-row justify-between gap-6 items-end pt-1'>
            {/* writer */}
            <div className='flex flex-row gap-1 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className='whitespace-nowrap'>{ props.guestbookData.writer }</p>
            </div>

            {/* days ago */}
            <p className='whitespace-nowrap text-stone-400 text-sm'>{ timeSince(new Date(props.guestbookData.createdAt)-aDay) } ago</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Guestbook