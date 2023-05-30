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
    <Link href={`guestbooks/${props.guestbookData._id}`}
      className='border border-stone-200 shadow rounded-xl p-1'
    >
      <div className='border border-stone-300 p-3 bg-stone-200 rounded-lg text-stone-500 hover:bg-stone-200'>

        <div className='flex flex-row gap-6'>
          {/* title */}
          <h2 className='text-xl font-semibold truncate w-5/6 text-stone-800'>{ props.guestbookData.title }</h2>

          {/* content */}
          {/* <div id="innerHTML" dangerouslySetInnerHTML={{ __html: props.guestbookData.content }} /> */}
        </div>


        <div className='flex flex-row justify-between gap-6 items-end'>
          {/* writer */}
          <div className='flex flex-row gap-2 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            <p className='whitespace-nowrap'>{ props.guestbookData.writer }</p>
          </div>

          {/* days ago */}
          <p className='whitespace-nowrap text-stone-400 text-sm'>{ timeSince(new Date(props.guestbookData.createdAt)-aDay) }</p>
        </div>
      </div>
    </Link>
  )
}

export default Guestbook