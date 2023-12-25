'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import DinosaurGame from '@/components/DinosaurGame'

const Footer = () => {
  const pathname = usePathname()

  return (
    <>
      <footer className='

        p-8 flex flex-col gap-16 justify-center bg-stone-200
      '>
        <div className='
          flex flex-row gap-8 justify-center items-center
        '>
          <Link href='/'>
            <Image src='/images/logos/dev-kim-transparent.png' alt='Dev Kim Logo'
              width={128} height={128} className='object-contain w-28 lg:w-32'
            />
          </Link>

          {/* links */}
          <Link href='https://www.linkedin.com/in/harrison-kim-b246a5175/'
            className='flex flex-row gap-2 items-center'
          >
            <Image src='/images/logos/linkedin-logo.png'
              alt='LinkedIn Logo' width={16} height={16} className='object-contain'
            />
            <p className='
              mt-0.5 font-normal text-stone-500 hover:text-stone-600
            '>LinkedIn</p>
          </Link>
          <Link href='https://github.com/hhkimmm9'
            className='flex flex-row gap-2 items-center'
          >
            <Image src='/images/logos/github-logo.png'
              alt='GitHub Logo' width={16} height={16} className='object-contain'
            />
            <p className='
              mt-0.5 font-normal text-stone-500 hover:text-stone-600
            '>GitHub</p>
          </Link>
        </div>

        {/* dinosaur game */}
        <div className='hidden md:block'>
          <DinosaurGame />
        </div>
      </footer>
    </>
  )
}

export default Footer