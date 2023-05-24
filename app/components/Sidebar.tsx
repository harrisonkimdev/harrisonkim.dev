import React from 'react'
import Link from 'next/link'

const Sidebar = (props: any) => {
  return (
    <div className='bg-stone-100 text-stone-900 text-lg min-h-screen py-2 flex flex-col gap-6'>
      {/* close icon */}
      <div className='flex justify-end mr-1' onClick={props.handleClose}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      {/* tabs */}
      <div className='flex flex-col gap-8 px-6'>
        <button type='button' onClick={() => props.emitCloseSidebar()}>
          <Link href="/resume">Resume</Link>
        </button>
        <button type='button' onClick={() => props.emitCloseSidebar()}>
          <Link href="/projects">Projects</Link>
        </button>
        <button type='button' onClick={() => props.emitCloseSidebar()}>
          <Link href="/guestbooks">Guestbook</Link>
        </button>
        <button type='button' onClick={() => props.emitCloseSidebar()}>
          <Link href="/about">About</Link>
        </button>
      </div>
    </div>
  )
}

export default Sidebar