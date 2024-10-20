'use client'

import { useAppState } from '@/layouts/providers/AppStateContext'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaRegTimesCircle } from 'react-icons/fa'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'

// Only visible on devices with smaller screen
const SideBar = () => {
  const { state, dispatch } = useAppState()
  const { data: session } = useSession({ required: false })
  const pathname = usePathname()

  const checkRouteGroup = (routeGroup: String) => {
    const currRouteGroup = pathname.split('/')[1]
    return currRouteGroup === routeGroup ? true : false
  }

  if (state.showSideBar) return (
    <div className='min-h-screen flex flex-col gap-6 bg-black'>
      {/* close icon */}
      <div className='flex justify-end'>
        <div onClick={() => dispatch({ type: 'HIDE_SIDEBAR' })} className='p-5'>
          <FaRegTimesCircle className='w-6 h-6 text-white active:text-lime-400' />
        </div>
      </div>

      {/* tabs */}
      <div className='flex flex-col gap-7 pl-12 font-mono'>
        <Link href='/' onClick={() => dispatch({ type: 'HIDE_SIDEBAR' })}>
          <p className={`text-3xl font-medium ${checkRouteGroup("") ?
              "text-lime-400 active:text-lime-400" : "text-white active:text-white" }
          `}> Home </p>
        </Link>
      
        <Link href='/projects' onClick={() => dispatch({ type: 'HIDE_SIDEBAR' })}>
          <p className={`text-3xl font-medium ${checkRouteGroup("projects") ?
              "text-lime-400 active:text-lime-400" : "text-white active:text-white" }
          `}> Projects </p>
        </Link>
      
        <Link href='/blogs' onClick={() => dispatch({ type: 'HIDE_SIDEBAR' })}>
          <p className={`text-3xl font-medium ${checkRouteGroup("blogs") ?
              "text-lime-400 active:text-lime-400" : "text-white active:text-white" }
          `}> Blogs </p>
        </Link>

        <a href='https://photobook-9mo4.vercel.app/' target='_blank'
          onClick={() => dispatch({ type: 'HIDE_SIDEBAR' })}
          className='
            flex gap-3 items-center
            text-3xl font-medium hover:underline 
            text-white active:text-white hover:text-white
        '>
          <span>Gallery</span>
          <FaArrowUpRightFromSquare className='text-xl' />
        </a>

        { session && (
          <>
            <Link href='/admin/blogs' onClick={() => dispatch({ type: 'HIDE_SIDEBAR' })}>
              <p className='
                text-3xl font-medium text-lime-400 active:text-lime-400
              '>Manage Blog</p>
            </Link>

            {/* TODO: replace this code with the component. */}
            <button onClick={() => signOut()}>
              <p className='
                cursor-pointer text-left text-3xl font-semibold text-lime-400 active:text-lime-400
              '>Sign out</p>
            </button>
          </>
        )}
      </div>
    </div> 
  )

  return null
}

export default SideBar