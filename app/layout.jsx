'use client'

import React, { useState } from 'react'
import { Rubik } from 'next/font/google'
import TopNavbar from '@/layouts/TopNavbar'
import Footer from '@/layouts/Footer'
import './globals.css'
import 'semantic-ui-css/semantic.min.css'
import { FaAngleUp } from "react-icons/fa6";

const rubik = Rubik({ subsets: ['latin'] })

// export const metadata = {
//       title: 'Hey, Dev Kim!',
//       description: 'My Personal Website',
// }

export default function RootLayout({ children }) {
  const [toggleSidebar, setToggleSidebar] = useState(false)

  const scrollToTop = () => {
    console.log('first')
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  // This will create a smooth scrolling effect
    })
  }

  return (
    <html lang="en">
      <head>
          
      </head>
      <body className={rubik.className}>
        <div className='min-w-min'>
        <TopNavbar
          emitCloseSidebar={(value) => setToggleSidebar(value) }
        />

        <div className={`
          relative overflow-hidden pt-[52.5px]
          ${ toggleSidebar === true ? 'hidden' : '' }
        `}>
          <div className={`   
            min-h-[calc(100vh-(60px+76px))] flex flex-grow
            md:min-h-[calc(100vh-(60px+172px))]
          `}>
            { children }
          </div>

          <button type="button" click={scrollToTop}
            className='
            fixed bottom-0 right-0 mb-8 mr-20 p-2
            rounded-xl border-2 border-stone-800 bg-stone-200 hover:bg-stone-100
          '>
            <FaAngleUp />
          </button>

          <Footer />
        </div>
        </div>
      </body>
    </html>
  )
}
