'use client'

import React, { ReactNode } from 'react'
import { FaAngleUp } from "react-icons/fa6";

const MainComponent = ({ children }: { children: ReactNode }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  // This will create a smooth scrolling effect
    })
  }

  return (
    <div className="relative">
      { children }

      <button type="button" onClick={() => scrollToTop()}
        className='
          fixed bottom-0 right-0 mb-8 mr-20 p-2
          rounded-xl border-2 border-stone-800 bg-stone-200 hover:bg-stone-100
      '>
        <FaAngleUp />
      </button>
    </div>
  )
}

export default MainComponent