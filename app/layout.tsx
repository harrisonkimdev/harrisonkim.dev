import React from 'react'
import { Inter } from 'next/font/google'
import TopNavbar from '@/layouts/TopNavbar'
import Footer from '@/layouts/Footer'
import './globals.css'
import 'semantic-ui-css/semantic.min.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Personal Website',
  description: 'My Personal Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        
      </head>
      <body className={inter.className}>
        <div className='min-w-min'>
          <TopNavbar />

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
