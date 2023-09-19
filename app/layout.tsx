'use client'

import React, { useState } from 'react'
import { Rubik } from 'next/font/google'
import TopNavbar from '@/layouts/TopNavbar'
import Footer from '@/layouts/Footer'
import './globals.css'
import { usePathname } from 'next/navigation'
import 'semantic-ui-css/semantic.min.css'

const rubik = Rubik({ subsets: ['latin'] })

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
      <body className={rubik.className}>
        <div className='min-w-min'>
          <TopNavbar
            emitCloseSidebar={(value: boolean) => setToggleSidebar(value) }
          />

          <div className={`
            overflow-hidden pt-[60px]
            ${ toggleSidebar === true ? 'hidden' : '' }
          `}>
              <div className={`   
                min-h-[calc(100vh-(60px+76px))] flex flex-grow
                md:min-h-[calc(100vh-(60px+172px))]
              `}>
                { children }
              </div>

              <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
