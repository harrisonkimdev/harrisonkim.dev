'use client'

import React,{ useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Sidebar from './Sidebar'

const TopNavbar = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [toggleSidebar, setToggleSidebar] = useState(false)

  const currentUrl = () => {
    return usePathname() == '/' ? false : true
  }

  return (
    <>
      { currentUrl() && (
        <div className='relative'>
          {/* Tablets and Desktops */}
          <div className='hidden md:flex justify-between p-4 items-center bg-black text-zinc-200'>
            <div>
              <Link href="/home" className='flex gap-2 items-center'> 
                {/* <Image src='' alt='' className='' /> */}
                <img src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png" alt="Logo placeholder" className='w-10'/>

                <p>Harrison Kim</p>
              </Link>
            </div>

            <div className='flex gap-10 mr-10'>
              <button>
                <a href="/resume" className='hover:underline'>Resume</a>
              </button>
              <button>
                <a href="/projects" className='hover:underline'>Projects</a>
              </button>
              <button>
                <a href="/guestbook" className='hover:underline'>Guest Book</a>
              </button>
              <button>
                <a href="/about" className='hover:underline'>About</a>
              </button>
            </div>
          </div>

          {/* Smartphones */}
          <div className={toggleSidebar ? 'opacity-20' : ''}>
            <div className='flex md:hidden justify-between p-4 items-center bg-black text-zinc-200'>
              <div onClick={() => { setToggleSidebar(true)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </div>

              <Link href="/home"> 
                {/* <Image src='' alt='' className='' /> */}
                <img src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png" alt="Logo placeholder" className='w-10'/>
              </Link>

              {/* dark mode toggle */}
              <div onClick={() => {}}>
                { !darkMode ?
                  (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                  )
                }

              </div>
            </div>
          </div>

          { toggleSidebar && <Sidebar handleClose={() => setToggleSidebar(false)} /> }
        </div>
      )}
    </>
  )
}

export default TopNavbar