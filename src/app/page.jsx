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

        {/* first row */}
        <FirstRow />

        {/* second row */}
        <SecondRow />

        {/* third row */}
        <ThirdRow />

        {/* TODO: add some text here */}
        <FourthRow />
      </div>

      <button type='button' onClick={() => scrollToTop()}
        className='
          hidden md:block fixed bottom-0 right-0 mb-8 mr-12 p-2
          rounded-xl border-2 border-stone-800 bg-stone-100 hover:bg-stone-100
      '>
        <FaAngleUp />
      </button>
    </>
  )
}
