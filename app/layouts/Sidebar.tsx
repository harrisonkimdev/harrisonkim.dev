import React from 'react'
import Link from 'next/link'
import { FaRegTimesCircle } from "react-icons/fa";

// Only visible on devices with smaller screen
const SideBar = ({
  closeSidebar
} : {
  closeSidebar: Function
}) => {
  return (
    <div className='
      min-h-screen flex flex-col gap-6 bg-stone-100
      text-lg text-stone-900
    '>
      {/* close icon */}
      <div onClick={() => closeSidebar()} className='m-5 flex justify-end'>
        <FaRegTimesCircle className='w-6 h-6 text-stone-600' />
      </div>

      {/* tabs */}
      <div className='flex flex-col gap-8 pl-12'>
        <Link href="/" onClick={() => closeSidebar()}>
          <p className='
            text-3xl font-medium text-stone-500 hover:text-stone-600
          '>Home</p>
        </Link>
      
        <Link href="/projects" onClick={() => closeSidebar()}>
          <p className='
            text-3xl font-medium text-stone-500 hover:text-stone-600
          '>Projects</p>
        </Link>
      
        <Link href="/blog" onClick={() => closeSidebar()}>
          <p className='
            text-3xl font-medium text-stone-500 hover:text-stone-600
          '>Blog</p>
        </Link>
      </div>
    </div>
  )
}

export default SideBar