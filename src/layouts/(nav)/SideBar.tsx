'use client'

import { useAppState } from '@/layouts/providers/AppStateContext'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { FaRegTimesCircle } from 'react-icons/fa'

// Only visible on devices with smaller screen
const SideBar = () => {
  const { state, dispatch } = useAppState()
  const { data: session } = useSession({ required: false })

  if (state.showSideBar) return (
    <div className='min-h-screen flex flex-col gap-6 bg-black'>
      {/* close icon */}
      <div className='flex justify-end'>
        <div onClick={() => dispatch({ type: 'TOGGLE_OFF' })} className='p-5'>
          <FaRegTimesCircle className='w-6 h-6 text-lime-400' />
        </div>
      </div>

      {/* tabs */}
      <div className='flex flex-col gap-7 pl-12 font-mono'>
        <Link href='/' onClick={() => dispatch({ type: 'TOGGLE_OFF' })}>
          <p className='
            text-3xl font-medium text-lime-400 hover:text-lime-400
          '>Home</p>
        </Link>
      
        <Link href='/projects' onClick={() => dispatch({ type: 'TOGGLE_OFF' })}>
          <p className='
            text-3xl font-medium text-lime-400 hover:text-lime-400
          '>Projects</p>
        </Link>
      
        <Link href='/blog' onClick={() => dispatch({ type: 'TOGGLE_OFF' })}>
          <p className='
            text-3xl font-medium text-lime-400 hover:text-lime-400
          '>Blogs</p>
        </Link>

        { session && (
          <>
            <Link href='/admin/blog' onClick={() => dispatch({ type: 'TOGGLE_OFF' })}>
              <p className='
                text-3xl font-medium text-lime-400 hover:text-lime-400
              '>Manage Blog</p>
            </Link>

            {/* TODO: replace this code with the component. */}
            <button onClick={() => signOut()}>
              <p className='
                cursor-pointer text-left text-3xl font-semibold text-lime-400 hover:text-lime-400
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