'use client'

import { SessionProvider } from 'next-auth/react'
import { AppStateProvider } from '@/layouts/providers/AppStateContext'

const Providers = ({
  children
} : {
  children: React.ReactNode
}) => {
  return (
    <SessionProvider>
      <AppStateProvider>
        { children }
      </AppStateProvider>
    </SessionProvider>
  )
}

export default Providers