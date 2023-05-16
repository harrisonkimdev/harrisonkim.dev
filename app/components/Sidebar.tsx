import React from 'react'
import Link from 'next/link'

const Sidebar = (props: any) => {
  return (
    <div className='absolute top-0 left-0 bg-zinc-100 text-zinc-900 text-lg min-h-screen py-2 flex flex-col gap-6 z-10'>
      <div className='flex justify-end mr-1' onClick={props.handleClose}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div className='flex flex-col gap-10 px-6'>
        <button>
          <Link href="/resume">Resume</Link>
        </button>
        <button>
          <Link href="/projects">Projects</Link>
        </button>
        <button>
          <Link href="/guestbook">Guest Book</Link>
        </button>
        <button>
          <Link href="/about">About</Link>
        </button>
      </div>
    </div>
  )
}

export default Sidebar