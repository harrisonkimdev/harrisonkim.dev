'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  
  return (
    <>
      <div className='max-w-5xl mx-auto py-20 flex flex-col'>
        {/* heading */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <h1 className='text-4xl font-semibold text-stone-800'>Guestbook</h1>
            { usePathname() === '/guestbooks' && (
              <div className='flex justify-end'>
                <Link href='/guestbooks/create'
                  className='bg-zinc-400 text-white font-normal px-2 py-1 rounded-lg'
                > Write</Link>
              </div>
            )}
            { usePathname() !== '/guestbooks' && (
              <div className='cursor-pointer' onClick={() => router.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
              </div>
            )}
          </div>
          <hr className='border-1 border-stone-800 mt-1'/>
        </div>

        <div>{ children }</div>
      </div>
    </>
  )
}

export default layout