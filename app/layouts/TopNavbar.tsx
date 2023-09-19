'use client'

import React,{ useState } from 'react'
import Link from 'next/link'
import Sidebar from './Sidebar'
import Image from 'next/image'

const TopNavbar = ( props: any ) => {
  const [toggleSidebar, setToggleSidebar] = useState(false)

  return (
    <>
      <nav>
        { toggleSidebar ? (
          <div className='absolute top-0 left-0 right-0'>
            <Sidebar
              handleClose={() => {
                setToggleSidebar(false); props.emitCloseSidebar(false);
              }}
              emitCloseSidebar={() => {
                setToggleSidebar(false); props.emitCloseSidebar(false);
              }}
            />
          </div>
        ) : (
          <nav className='fixed w-full'>
            {/* Tablets and Desktops */}
            <div className='hidden md:flex justify-between px-6 py-4 items-center bg-black text-stone-200 md:h-[60px]'>
              <Link href="/" className='flex gap-2 items-center'> 
                <Image src='/images/logos/dev-kim-transparent.png' alt='Dev Kim Logo'
                  width={500} height={500} className='object-contain w-28 invert'
                />
              </Link>
  
              <div className='flex gap-10 mt-1'>
                <Link href="/">
                  <p className='text-stone-100 hover:text-stone-50 hover:underline'> Home </p>
                </Link>

                <Link href="/assets/Resume_HarrisonKim_FullStack.pdf" target="_blank">
                  <p className='text-stone-100 hover:text-stone-50 hover:underline'> Resume </p>
                </Link>

                <Link href="/projects">
                  <p className='text-stone-100 hover:text-stone-50 hover:underline'> Projects </p>
                </Link>

                <Link href="/guestbooks">
                  <p className='text-stone-100 hover:text-stone-50 hover:underline'> Guestbook </p>
                </Link>

                <Link href="/about">
                  <p className='text-stone-100 hover:text-stone-50 hover:underline'> About </p>
                </Link>
              </div>
            </div>
            
            {/* Smartphones */}
            <div className={toggleSidebar ? 'opacity-20' : ''}>
              <div className='grid md:hidden grid-cols-3 p-4 items-center bg-black text-stone-200'>
                <div onClick={() => { setToggleSidebar(true); props.emitCloseSidebar(true); }} className='col-span-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </div>
  
                <Link href="/" className='col-span-1 flex justify-center'> 
                  <Image src='/images/logos/dev-kim-transparent.png' alt='Dev Kim Logo'
                    width={112} height={112} className='object-contain w-28 invert'
                  />
                </Link>
              </div>
            </div>
          </nav>
        )}
      </nav>
    </>
  )
}

export default TopNavbar