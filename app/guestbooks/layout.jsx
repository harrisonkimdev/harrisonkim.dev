'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const Layout = ({ children }) => {
  const router = useRouter()
  
  return (
    <div className='w-full pt-5 md:pt-16 bg-stone-50'>
      <div className='max-w-5xl mx-auto flex flex-col px-8'>
        {/* heading */}
        <div className='mb-2'>
          <div className='flex items-center justify-between gap-16'>
            <h1 className='text-3xl md:text-4xl font-semibold text-stone-800'>Guestbooks</h1>

            {/* write */}
            { usePathname() === '/guestbooks' && (
              <Link href='/guestbooks/create'> 
                <div className='flex flex-row gap-2 px-3 py-1 border border-stone-300 rounded-lg items-center shadow-inner bg-stone-200 hover:bg-stone-300'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-stone-800">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                  <p className='text-stone-800 font-medium text-lg'>Write</p>
                </div>
              </Link>
            )}
            {/* go back */}
            { usePathname() !== '/guestbooks' && (
              <Link href='/guestbooks'>
                <div className='cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-stone-800">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                </div>
              </Link>
            )}
          </div>
          <hr className='border-1 border-stone-800 mt-1'/>
        </div>

        <section className='pb-20'>{ children }</section>
      </div>
    </div>
  )
}

export default Layout