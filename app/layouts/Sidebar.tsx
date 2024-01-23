import React from 'react'
import Link from 'next/link'
import { FaRegTimesCircle } from "react-icons/fa";

// Only visible on devices with smaller screen
const Sidebar = ({
  closeSidebar
} : {
  closeSidebar: Function
}) => {
  return (
    <div className='
      min-h-screen py-2 flex flex-col gap-6 bg-stone-100
      text-lg text-stone-900
    '>
      {/* close icon */}
      <div onClick={() => closeSidebar()} className='flex justify-end mt-1 mr-3'>
        <FaRegTimesCircle className='w-6 h-6 text-stone-600' />
      </div>

      {/* tabs */}
      <div className='flex flex-col gap-8 px-6'>
        <Link href="/" onClick={() => closeSidebar()}>
          <p className='
            font-medium text-stone-500 hover:text-stone-600
          '>Home</p>
        </Link>
      
        <Link href="/projects" onClick={() => closeSidebar()}>
          <p className='
            font-medium text-stone-500 hover:text-stone-600
          '>Projects</p>
        </Link>
      
        <Link href="/blog" onClick={() => closeSidebar()}>
          <p className='
            font-medium text-stone-500 hover:text-stone-600
          '>Blog</p>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar