'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  const pathname = usePathname()

  return (
    <>
      <footer className='
        px-8 py-6
        md:flex md:flex-row md:gap-32 md:py-8 md:justify-center
        lg:h-[172px] lg:gap-56 lg:py-8 bg-stone-200
      '>
        {/* logo, linkedin & github */}
        <div className='
          flex flex-row justify-between gap-6 items-center
          md:flex-col
        '>
          <Link href='/home'>
            <Image src='/images/logos/dev-kim-transparent.png' alt='Dev Kim Logo'
              width={128} height={128} className='object-contain w-28 lg:w-32'
            />
          </Link>

          <div className='
            flex gap-4
            md:flex-col md:gap-2
          '>
            <Link href='https://www.linkedin.com/in/harrison-kim-b246a5175/'
              className='flex flex-row gap-2 items-center hover:underline'
            >
              <Image src='/images/logos/linkedin-logo.png'
                alt='LinkedIn Logo' width={16} height={16} className='object-contain'
              />
              <p>LinkedIn</p>
            </Link>
            <Link href='https://github.com/hhkimmm9'
              className='flex flex-row gap-2 items-center hover:underline'
            >
              <Image src='/images/logos/github-logo.png'
                alt='GitHub Logo' width={16} height={16} className='object-contain'
              />
              <p>GitHub</p>
            </Link>
          </div>
        </div>

        {/* sitemap */}
        <div className='
          hidden
          md:flex md:flex-row md:gap-16
          lg:gap-32
        '>
          <div className='flex flex-col gap-4'>
            <p className='text-3xl font-bold text-stone-700'>Home</p>
            <ul className='flex flex-col gap-2'>
              <li className='hover:underline'><Link href='/resume'>Resume</Link></li>
              <li className='hover:underline'><Link href='/projects'>Projects</Link></li>
            </ul>
          </div>
          <div className='flex flex-col gap-4'>
            <p className='text-3xl font-bold text-stone-700'>Projects</p>
            <ul className='flex flex-col gap-2'>
              <li className='hover:underline'><Link href='#'>mosPic</Link></li>
              <li className='hover:underline'><Link href='#'>Dashboard</Link></li>
            </ul>
          </div>
          <div className='flex flex-col gap-4'>
            <p className='text-3xl font-bold text-stone-700'>About</p>
            <ul className='flex flex-col gap-2'>
              <li className='hover:underline'><Link href='/about?tab=myself'>Myself</Link></li>
              <li className='hover:underline'><Link href='/about?tab=website'>This website</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer