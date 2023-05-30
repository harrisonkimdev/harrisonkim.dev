'use client'

import React, { useState } from 'react'
import { Inter } from 'next/font/google'
import TopNavbar from './components/TopNavbar'
import Footer from './components/Footer'
import './globals.css'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Hey, Dev Kim!',
//   description: 'My Personal Website',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [toggleSidebar, setToggleSidebar] = useState(false)

  const pathname = usePathname()

  return (
    <html lang="en">
      <head>
        
      </head>
      <body className={inter.className}>
        <div className='min-w-min'>
          <TopNavbar
            emitCloseSidebar={(value: boolean) => setToggleSidebar(value) }
          />



          {/* <section className={`
            overflow-hidden
            min-h-[calc(100vh-(60px+76px))]
            md:min-h-[calc(100vh-(60px+172px))]
            ${ pathname !== '/' ? 'pt-[60px] flex flex-grow' : '' }
            ${ toggleSidebar === true ? 'hidden' : 'block' }
          `}>
            { children }
          </section>
          
          <Footer /> */}

          <div className={`
            overflow-hidden
            overflow-y-auto
            ${ pathname !== '/' ? 'pt-[60px]' : ''}
            ${ toggleSidebar === true ? 'hidden' : '' }
          `}>
              <section className={`   
                min-h-[calc(100vh-(60px+76px))]
                md:min-h-[calc(100vh-(60px+172px))]
                ${pathname != '/' ? 'flex flex-grow' : ''}
              `}>
                { children }
              </section>

              <Footer />
          </div>



        </div>
      </body>
    </html>
  )
}
