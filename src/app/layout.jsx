import { Rubik } from 'next/font/google'
import './globals.css'
import 'semantic-ui-css/semantic.min.css'

import Providers from '@/layouts/providers/Providers'
import LayoutWrapper from '@/layouts/LayoutWrapper'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'harrisonkim.dev',
  description: 'Harrison Kim\'s Personal Website.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={rubik.className}>
        <Providers>
          <LayoutWrapper>
            { children }
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}
