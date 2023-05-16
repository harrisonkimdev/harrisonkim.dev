import React from 'react'
import { Inter } from 'next/font/google'
import TopNavbar from './components/TopNavbar'
import Footer from './components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hey, Dev Kim!',
  description: 'My Personal Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopNavbar />

        { children }

        <Footer />
      </body>
    </html>
  )
}
