'use client'

import { useAppState } from '@/components/providers/AppStateContext'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'
import { FaBars, FaArrowUpRightFromSquare } from 'react-icons/fa6'

const NavBar = () => {
  const { dispatch } = useAppState()
  const { data: session } = useSession({ required: false })
  const pathname = usePathname()

  const [isMobile, setIsMobile] = useState(false)
  const [showAdminDropdown, setShowAdminDropdown] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    let adminDropdownHandler = (e: any) => {
      const ref = adminDropdownRef.current
      if (ref && !ref.contains(e.target)) {
        setShowAdminDropdown(false)
      }
    }
    document.addEventListener('mousedown', adminDropdownHandler)
  }, [])

  const adminDropdownRef = useRef<HTMLDivElement | null>(null)

  const checkRouteGroup = (routeGroup: String) => {
    const currRouteGroup = pathname.split('/')[1]
    return currRouteGroup === routeGroup ? true : false
  }

  return (
    <nav className='
      fixed top-0 w-full h-14 md:h-20
      backdrop-blur bg-opacity-70 bg-black
    '>
      <div className='
        grid items-center
        grid-cols-6 md:grid-cols-2
        px-4 md:px-10
        py-3 md:py-5
      '>
        {/* hamburger icon */}
        { isMobile && (
          <div onClick={() => { dispatch({ type: 'SHOW_SIDEBAR' }) }} className='col-span-1'>
            <FaBars className='w-6 h-6 text-lime-400' />
          </div>
        )}

        <Link href='/' className='
          col-span-4 md:col-span-1 md:pt-1
          text-center md:text-left text-2xl md:text-3xl
          whitespace-nowrap text-lime-400 hover:text-lime-400
        '>
          <span className='font-mono'>harrisonkim.dev</span>
          <span className='ml-1.5 cursor-animation'>|</span>
        </Link>

        { !isMobile && (
          <div className='flex justify-end gap-10'>
            <Link href='/' className={`
              hover:underline ${checkRouteGroup("") ?
                'text-lime-400 hover:text-lime-400' : 'text-white hover:text-white' }
            `}> Home </Link>

            <Link href='/projects' className={`
              hover:underline ${checkRouteGroup("projects") ?
                'text-lime-400 hover:text-lime-400' : 'text-white hover:text-white' }
            `}> Projects </Link>

            <Link href='/blogs' className={`
              hover:underline ${checkRouteGroup("blogs") ?
                'text-lime-400 hover:text-lime-400' : 'text-white hover:text-white' }
            `}> Blogs </Link>

            <a href='https://photobook-9mo4.vercel.app/' target='_blank'
              className='
                flex gap-1.5 items-center
                hover:underline text-white hover:text-white
            '>
              <span>Gallery</span>
              <FaArrowUpRightFromSquare className='text-sm' />
            </a>


            { session && (
              <div ref={adminDropdownRef} className='relative'>
                <button onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                  className='text-stone-100 hover:text-stone-50 hover:underline
                '>
                  Admin
                </button>

                { showAdminDropdown && (
                  <ul className='absolute top-10 right-0 mt-[0.05rem]'>
                    <li onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                      className='p-4 hover:bg-stone-500
                    '>
                      <Link href='/admin/blogs' className='whitespace-nowrap hover:underline'>
                        Manage Blogs
                      </Link>
                    </li>
                    <li onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                      className='p-4 hover:bg-stone-500
                    '>
                      <SignOutButton />
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar