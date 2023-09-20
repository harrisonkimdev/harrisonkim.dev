import React from 'react'
import Link from 'next/link'

// Only visible on devices with smaller screen
const Sidebar = (props) => {
  return (
    <div className='bg-stone-100 text-stone-900 text-lg min-h-screen py-2 flex flex-col gap-6'>
      {/* close icon */}
      <div className='flex justify-end mt-1 mr-3' onClick={props.handleClose}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      {/* tabs */}
      <div className='flex flex-col gap-8 px-6'>
        
          <Link href="/" onClick={() => props.emitCloseSidebar()}>
            <p className='font-medium text-stone-500 hover:text-stone-600'>Home</p>
          </Link>

          <Link href="/assets/Resume_HarrisonKim_FullStack.pdf" target="_blank" onClick={() => props.emitCloseSidebar()}>
            <p className='font-medium text-stone-500 hover:text-stone-600'>Resume</p>
          </Link>
        
          <Link href="/projects" onClick={() => props.emitCloseSidebar()}>
            <p className='font-medium text-stone-500 hover:text-stone-600'>Projects</p>
          </Link>
        
          <Link href="/guestbooks" onClick={() => props.emitCloseSidebar()}>
            <p className='font-medium text-stone-500 hover:text-stone-600'>Guestbook</p>
          </Link>
        
          <Link href="/about" onClick={() => props.emitCloseSidebar()}>
            <p className='font-medium text-stone-500 hover:text-stone-600'>About</p>
          </Link>
      </div>
    </div>
  )
}

export default Sidebar