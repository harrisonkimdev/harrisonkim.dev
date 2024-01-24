import React from 'react'

import { Rubik } from 'next/font/google'
import './globals.css'
import 'semantic-ui-css/semantic.min.css'

import Providers from '@/components/Providers'
import Wrapper from '@/layouts/Wrapper'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'harrisonkim.dev',
  description: 'Harrison Kim\'s Personal Website.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rubik.className}`}>
        <Providers>
          <Wrapper>
            { children }
          </Wrapper>
        </Providers>
      </body>
    </html>
  )
}
