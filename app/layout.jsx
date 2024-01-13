import './globals.css'
import 'semantic-ui-css/semantic.min.css'
import { Rubik } from 'next/font/google'

import React from 'react'

import TopNavbar from '@/layouts/TopNavbar'
import MainComponent from '@/layouts/MainComponent'
import Footer from '@/layouts/Footer'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'harrisonkim.dev',
  description: 'Harrison Kim\'s Personal Website.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`
        ${rubik.className}
        flex flex-col
      `}>
        <TopNavbar />

        <div className='mt-8 flex-grow'>
          <MainComponent>
            { children }
          </MainComponent>
        </div>
        
        <Footer />
      </body>
    </html>
  )
}
