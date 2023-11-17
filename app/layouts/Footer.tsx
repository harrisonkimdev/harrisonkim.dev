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
          <Link href='/'>
            <Image src='/images/logos/dev-kim-transparent.png' alt='Dev Kim Logo'
              width={128} height={128} className='object-contain w-28 lg:w-32'
            />
          </Link>

          <div className='
            flex gap-4
            md:flex-col md:gap-2
          '>
            <Link href='https://www.linkedin.com/in/harrison-kim-b246a5175/'
              className='flex flex-row gap-2 items-center'
            >
              <Image src='/images/logos/linkedin-logo.png'
                alt='LinkedIn Logo' width={16} height={16} className='object-contain'
              />
              <p className='
                mt-1.5 font-medium text-stone-500 hover:text-stone-600
              '>LinkedIn</p>
            </Link>
            <Link href='https://github.com/hhkimmm9'
              className='flex flex-row gap-2 items-center'
            >
              <Image src='/images/logos/github-logo.png'
                alt='GitHub Logo' width={16} height={16} className='object-contain'
              />
              <p className='
                mt-1 font-medium text-stone-500 hover:text-stone-600
              '>GitHub</p>
            </Link>
          </div>
        </div>

        {/* sitemap */}
        <div className='
          hidden
          md:flex md:flex-row md:gap-16
          lg:gap-32
        '>
          <div className='flex flex-col gap-2'>
            <p className='text-3xl font-semibold text-stone-700'>Home</p>
            <ul className='flex flex-col gap-2'>
              <Link href="/assets/Harrison_Kim_Resume.pdf" target="_blank">
                <li className='
                  font-medium text-stone-500 hover:text-stone-600
                '> Resume </li>
              </Link>

              <Link href='/projects'>
                <li className='
                  font-medium text-stone-500 hover:text-stone-600
                '> Projects </li>
              </Link>
            </ul>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-3xl font-semibold text-stone-700'>Projects</p>
            <ul className='flex flex-col gap-2'>
              <Link href='/projects'>
                <li className='
                  font-medium text-stone-500 hover:text-stone-600
                '> dandycv </li>
              </Link>

              <Link href='/projects'>
                <li className='
                  font-medium text-stone-500 hover:text-stone-600
                '> mosPic </li>
              </Link>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer