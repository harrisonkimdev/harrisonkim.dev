'use client'

import { useAppState } from '@/layouts/providers/AppStateContext'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'
import { FaBars } from 'react-icons/fa6'

const NavBar = () => {
  const { dispatch } = useAppState()
  const { data: session } = useSession({ required: false })
  const pathname = usePathname()

  const [isMobile, setIsMobile] = useState(false)
  const [showAdminMenuDropdown, setShowAdminMenuDropdown] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    let adminMenuDropdownHandler = (e: any) => {
      if (adminMenuDropdownRef.current && !adminMenuDropdownRef.current.contains(e.target)) {
        setShowAdminMenuDropdown(false)
      }
    }
    document.addEventListener('mousedown', adminMenuDropdownHandler)
  }, [])

  const adminMenuDropdownRef = useRef<HTMLDivElement | null>(null)

  return (
    <nav className='
      fixed top-0 w-full h-14 md:h-20 backdrop-blur bg-opacity-70 bg-black
    '>      
      <div className='
        grid items-center
        grid-cols-6 md:grid-cols-2
        px-4 md:px-10
        py-3 md:py-5
      '>
        {/* hamburger icon */}
        { isMobile && (
          <div className='col-span-1'>
            <div onClick={() => { dispatch({ type: 'SHOW_SIDEBAR' }) }}>
              <FaBars className='w-6 h-6 text-lime-400' />
            </div>
          </div>
        )}

        <div className='
          col-span-4 md:col-span-1
          md:pt-1 text-center md:text-left
        '>
          <Link href='/'>
            <div className='
              text-2xl md:text-3xl whitespace-nowrap
              text-lime-400 hover:text-lime-400
            '>
              <span className='font-mono'>harrisonkim.dev</span>
              <span className='ml-1.5 cursor-animation'>|</span>
            </div>
          </Link>
        </div>

        <div className='flex justify-end'>
          { !isMobile && (
            <div className='flex gap-10'>
              <Link href='/' className={`
                ${pathname === '/' ?
                  'text-lime-400 hover:text-lime-400' : 'text-white hover:text-white'}
                hover:underline
              `}> Home </Link>

              <Link href='/projects' className={`
                ${pathname === '/projects' ?
                  'text-lime-400 hover:text-lime-400' : 'text-white hover:text-white'}
                hover:underline
              `}> Projects </Link>

              <Link href='/blog' className={`
                ${pathname === '/blog' ?
                  'text-lime-400 hover:text-lime-400' : 'text-white hover:text-white'}
                hover:underline
              `}> Blog </Link>


              { session && (
                <>
                  <div ref={adminMenuDropdownRef} className='relative'>
                    <button onClick={() => setShowAdminMenuDropdown(!showAdminMenuDropdown)}
                      className='text-stone-100 hover:text-stone-50 hover:underline
                    '>
                      Admin
                    </button>

                    { showAdminMenuDropdown && (
                      <div className='absolute top-10 right-0 mt-[0.05rem]'>
                        <ul>
                          <li onClick={() => setShowAdminMenuDropdown(!showAdminMenuDropdown)}
                            className='p-4 hover:bg-stone-500
                          '>
                            <Link href='/admin/blog' className='whitespace-nowrap hover:underline'>
                              Manage Blog
                            </Link>
                          </li>
                          <li onClick={() => setShowAdminMenuDropdown(!showAdminMenuDropdown)}
                            className='p-4 hover:bg-stone-500
                          '>
                            <SignOutButton />
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar