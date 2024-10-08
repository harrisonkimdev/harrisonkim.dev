'use client'

import 'animate.css'
import FirstRow from '@/app/_homepage/FirstRow'
import SecondRow from '@/app/_homepage/SecondRow'
import ThirdRow from '@/app/_homepage/ThirdRow'
import FourthRow from '@/app/_homepage/FourthRow'
import { FaAngleUp } from 'react-icons/fa6'

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  // This will create a smooth scrolling effect
    })
  }
  
  return (
    <>
      {/* Layout for Tablets & Desktops */}
      <div className='flex flex-col w-full items-center'>
        {/* <FirstRow /> */}

        {/* <SecondRow /> */}

        {/* <ThirdRow /> */}

        {/* <FourthRow /> */}
      </div>

      <button type='button' onClick={() => scrollToTop()}
        className='
          hidden lg:block fixed bottom-4 right-6 p-2
          rounded-xl bg-black
      '>
        <FaAngleUp className='text-lg text-white' />
      </button>
    </>
  )
}
