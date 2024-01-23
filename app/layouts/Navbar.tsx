'use client'

import React,{ useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { FaBars } from "react-icons/fa6";

import SignOutButton from '@/components/SignOutButton'

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <SessionProvider>
      <div className='fixed top-0 w-full z-10'>
        {/* Tablets and Desktops */}
        <div className='
          hidden h-16
          px-6 py-4 md:flex justify-between items-center text-stone-200 bg-black
        '>
          <Link href="/" className='flex gap-2 items-center'> 
            <Image src='/images/logos/dev-kim-transparent.png' alt='Logo'
              width={500} height={500} className='object-contain w-28 invert'
            />
          </Link>

          <div className='flex gap-10 mt-1'>
            <Link href="/" className='
              text-stone-100 hover:text-stone-50 hover:underline
            '> Home </Link>

            <Link href="/projects" className='
              text-stone-100 hover:text-stone-50 hover:underline
            '> Projects </Link>

            <Link href="/blog" className='
              text-stone-100 hover:text-stone-50 hover:underline
            '> Blog </Link>

            <SignOutButton />
          </div>
        </div>
        
        {/* small screen devices */}
        <div className={showSidebar ? 'opacity-20' : ''}>
          <div className='
            p-4
            grid
            md:hidden
            grid-cols-3
            items-center
          bg-black
          text-stone-200
          '>
            <div onClick={() => { setShowSidebar(true) }} className='col-span-1'>
              {/* hamburger icon */}
              <FaBars className='w-6 h-6'/>
            </div>

            <Link href="/" className='col-span-1 flex justify-center'> 
              <Image src='/images/logos/dev-kim-transparent.png' alt='Dev Kim Logo'
                width={112} height={112} className='object-contain w-28 invert'
              />
            </Link>
          </div>
        </div>
      </div>
    </SessionProvider>
  )
}

export default Navbar