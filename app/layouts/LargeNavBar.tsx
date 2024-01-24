import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import SignOutButton from '@/components/SignOutButton'

const LargeNavBar = () => {
  return (
    <>
      <Link href="/" className='flex gap-2 items-center'> 
        <Image src='/images/logos/dev-kim-transparent.png' alt='Logo'
          width={500} height={500} className='object-contain w-28 invert'
        />
      </Link>

      <div className='flex gap-10 mt-1'>
        <Link href="/" className='
          text-stone-100 hover:text-stone-50 hover:underline
        '> Home </Link>

        <Link href="/projects" className='
          text-stone-100 hover:text-stone-50 hover:underline
        '> Projects </Link>

        <Link href="/blog" className='
          text-stone-100 hover:text-stone-50 hover:underline
        '> Blog </Link>

        <SignOutButton />
      </div>
    </>
  )
}

export default LargeNavBar