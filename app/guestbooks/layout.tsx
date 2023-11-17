'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaPen, FaRegArrowAltCircleLeft } from 'react-icons/fa'

const Layout = ({ children }: { children: React.ReactNode }) => {
  
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
                <div className='
                  flex
                  flex-row
                  gap-2
                  items-center
                  px-3
                  py-1
                  rounded-lg
                  shadow-inner
                  border
                border-stone-300
                bg-stone-200
                hover:bg-stone-300
                '>
                  <FaPen className='text-stone-800' />
                  <span className='text-stone-800 font-medium text-lg'>Write</span>
                </div>
              </Link>
            )}
            {/* go back */}
            { usePathname() !== '/guestbooks' && (
              <Link href='/guestbooks'>
                <FaRegArrowAltCircleLeft className='cursor-pointer text-2xl text-stone-800' />
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