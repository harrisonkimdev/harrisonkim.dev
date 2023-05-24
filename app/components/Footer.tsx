'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  const pathname = usePathname()

  return (
    <>
      { pathname !== '/' && (
        <div className='flex flex-row gap-56 py-10 px-20 bg-zinc-200'>
          <div className='flex flex-col gap-4'>
            <img
              src='https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png'
              alt='' className='object-contain w-12'
            />
            <div className='flex flex-col gap-2'>
              <Link href='https://www.linkedin.com/in/harrison-kim-b246a5175/'
                className='flex flex-row gap-2 items-center hover:underline'
              >
                <Image src='/images/logos/linkedin-logo.png'
                  alt='LinkedIn Logo' width={16} height={16} className='object-contain'
                />
                <span>LinkedIn</span>
              </Link>
              <Link href='https://www.linkedin.com/in/harrison-kim-b246a5175/'
                className='flex flex-row gap-2 items-center hover:underline'
              >
                <Image src='/images/logos/github-logo.png'
                  alt='GitHub Logo' width={16} height={16} className='object-contain'
                />
                <span>GitHub</span>
              </Link>
            </div>
          </div>

          <div className='flex flex-row gap-32'>
            <div className='flex flex-col gap-4'>
              <p className='text-3xl font-bold text-zinc-700'>Home</p>
              <ul className='flex flex-col gap-2'>
                <li className='hover:underline'><Link href='/resume'>Resume</Link></li>
                <li className='hover:underline'><Link href='/projects'>Projects</Link></li>
              </ul>
            </div>
            <div className='flex flex-col gap-4'>
              <p className='text-3xl font-bold text-zinc-700'>Projects</p>
              <ul className='flex flex-col gap-2'>
                <li className='hover:underline'><Link href='#'>mosPic</Link></li>
                <li className='hover:underline'><Link href='#'>Dashboard</Link></li>
              </ul>
            </div>
            <div className='flex flex-col gap-4'>
              <p className='text-3xl font-bold text-zinc-700'>About</p>
              <ul className='flex flex-col gap-2'>
                <li className='hover:underline'><Link href='/about?tab=myself'>Myself</Link></li>
                <li className='hover:underline'><Link href='/about?tab=website'>This website</Link></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Footer