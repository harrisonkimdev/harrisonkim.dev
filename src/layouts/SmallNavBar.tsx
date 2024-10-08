'use client'

import { useAppState } from '@/layouts/providers/AppStateContext'
import Link from 'next/link'
import Image from 'next/image'
import { FaBars } from 'react-icons/fa6'

const SmallNavBar = () => {
  const { dispatch } = useAppState()

  return (
    <>
      <div onClick={() => { dispatch({ type: 'TOGGLE_ON' }) }} className='col-span-1'>
        {/* hamburger icon */}
        <FaBars className='w-6 h-6'/>
      </div>

      <Link href='/' className='col-span-1 flex justify-center'> 
        <Image src='/images/logos/dev-kim-transparent.png' alt='Dev Kim Logo'
          width={112} height={112} className='object-contain w-28 invert'
        />
      </Link>
    </>
  )
}

export default SmallNavBar