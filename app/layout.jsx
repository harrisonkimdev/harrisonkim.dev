import './globals.css'
import 'semantic-ui-css/semantic.min.css'
import { Rubik } from 'next/font/google'

import React from 'react'

import TopNavbar from '@/layouts/TopNavbar'
import Main from '@/layouts/Main'
import Footer from '@/layouts/Footer'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
    title: 'harrisonkim.dev',
    description: 'Harrison Kim\'s Personal Website.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                
            </head>
            <body className={`${rubik.className} min-w-min`}>
                <TopNavbar />

                <Main children={children} />
                
                <Footer />
            </body>
        </html>
    )
}
