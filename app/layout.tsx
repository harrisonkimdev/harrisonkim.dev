'use client'

import React, { useState } from 'react'
import { Inter } from 'next/font/google'
import TopNavbar from './components/TopNavbar'
import Footer from './components/Footer'
import './globals.css'

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

  const addOpacity = () => {
    return toggleSidebar === true ? 'opacity-20' : ''
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <TopNavbar emitToggleSidebar={(value: boolean) => setToggleSidebar(value) } />

        <div className={addOpacity()}>
          { children }
        </div>

        <Footer />
      </body>
    </html>
  )
}
